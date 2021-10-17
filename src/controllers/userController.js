import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

const errorJoinIfNotAllGreen = async (...param) => {
    const [email, username] = param;
    const isEmailExists = await User.exists({ email });
    if (isEmailExists) {
        return Promise.reject(new Error("This email is already taken"));
    }

    const isUsernameExists = await User.exists({ username });
    if (isUsernameExists) {
        throw new Error("This username is already taken");
    }

    console.log("All Green!", email, username);
}

export const postJoin = async (req, res) => {
    try {
        const { email, name, username, password, confirmPassword, location } = req.body;

        //await errorJoinIfNotAllGreen(email, username);

        if (password !== confirmPassword) {
            console.log("exists", exists);
            throw new Error("The password is not matched confirm password");
        }

        // const exists = await User.exists({ $or: [{ email }, { username }] });
        const exists = await User.exists({ $or: [{ email }, { password }] });
        if (exists) {
            console.log("exists", exists);
            throw new Error("This email/username is already taken");
        }

        await User.create({
            email,
            name,
            username,
            password,
            location
        });

        res.redirect("/login");
    } catch (error) {
        console.log("CATCHED Error!", error);
        res.status(400).render("join", { pageTitle: "Join", errorMessage: error.message });
    }
}



export const getLogin = (req, res) => {
    console.log("login session:", req.session);

    const info = {
        pageTitle: "Login",
        session: req.session
    }


    res.render("login", info);
}

export const postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const info = {
            pageTitle: "Login"
        }

        //const encryptPassword = await User.encryptPassword(password);
        //const exists = await User.exists({ $and: [{ username }, { password: encryptPassword }] });

        // if (exists) {
        //     return res.status(400).render("login", {
        //         pageTitle: "Login",
        //         errorMessage: "An account with this user name doesn't exist or incorrected password."
        //     });
        // }

        const user = await User.findOne({ username, socialOnly: false });
        if (!user) {
            info.errorMessage = "An account with this user name doesn't exist";
            return res.status(400).render("login", info);
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            info.errorMessage = "incorrected password.";;

            return res.status(400).render("login", info);;
        }

        console.log("User logged in");
        req.session.loggedIn = true;
        req.session.user = user;

        return res.redirect("/");
    } catch (error) {

        console.log(error);
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: error.message
        });
    }
}

const requestUrlGenerateWithParams = (url, params) => {
    const queryStrings = new URLSearchParams(params).toString();
    const requestUrl = `${url}?${queryStrings}`;
    return requestUrl;
}

export const githubLogin = (req, res) => {
    const githubUrl = process.env.GITHUB_AUTH;
    const params = {
        client_id: process.env.GITHUB_CLIENT_ID,
        allow_signup: false,
        scope: "read:user user:email"
    }

    const githubAuth = requestUrlGenerateWithParams(githubUrl, params);;
    return res.redirect(githubAuth);
}

export const githubAccess = async (req, res) => {
    try {
        const accessTokenUrl = process.env.GITHUB_ACCESS_TOKEN_URL;
        const params = {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_ACCESS_SCERET,
            code: req.query.code
        }

        const url = requestUrlGenerateWithParams(accessTokenUrl, params);

        console.log("token url : ", url);

        const accessResponse = await fetch(url, {
            method: 'POST',
            headers: { Accept: "application/json" }
        });

        const githubResponse = await accessResponse;
        const json = await githubResponse.json();

        console.log(json);

        const headerSet = {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `token ${json.access_token}`
            }
        }

        const userUrl = process.env.GITHUB_GET_USER_URL;
        const userResponse = await fetch(userUrl, headerSet);
        const user = await userResponse.json();

        console.log(user);

        // find email
        const emailUrl = process.env.GITHUB_GET_EMAIL_URL;
        const emailResposne = await fetch(emailUrl, headerSet);
        const emails = await emailResposne.json();

        console.log(emails);

        const validatedEmail = emails.find(email => email.primary === true && email.verified === true);
        if (!validatedEmail) {
            console.log("There is no email that primary or verified.");
            return res.redirect("/");
        }

        // check already signed user
        let existsUser = await User.findOne({ email: validatedEmail.email });
        if (!existsUser) {
            // new user
            // 여기서 선택지.
            // 새 유저를 자동 생성할 것인가/ join 시킬 것인가.

            // auto signup
            existsUser = await User.create({
                email: validatedEmail.email,
                username: user.login,
                name: user.login,
                password: "",
                socialOnly: true,
                location: user.loaction
            });

            // to join
            //return res.redirect("/join");
        }

        // already signed user            

        req.session.loggedIn = true;
        req.session.user = existsUser;

        return res.redirect("/");
    } catch (error) {
        console.log("github auth error : ", error);
        return res.send(error.message);
    }
}

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};

export const edit = (req, res) => res.send("EDIT");

export const remove = (req, res) => res.send("DELETE");

export const profile = (req, res) => res.send("PROFILE");