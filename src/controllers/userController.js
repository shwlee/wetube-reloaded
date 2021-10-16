import User from "../models/User";
import bcrypt from "bcrypt";

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

        const user = await User.findOne({ username });
        if (!user) {
            info.errorMessage = "An account with this user name doesn't exist";
            return res.status(400).render("login", info);
        }

        console.log(user.password);

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
        ;

        console.log(error);
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: error.message
        });
    }
}

export const logout = (req, res) => res.send("LOGOUT");

export const edit = (req, res) => res.send("EDIT");

export const remove = (req, res) => res.send("DELETE");

export const profile = (req, res) => res.send("PROFILE");