import Video from "../models/Video";

const fakeUser = {
    user: "Greg",
    loggedIn: true
}

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.render("home", {
            pageTitle: "Home",
            fakeUser,
            videos
        });
    } catch (error) {
        res.render("server-error", error);
    }
};

export const watch = async (req, res) => {
    try {
        const id = req.params.id;
        const video = await Video.findOne({ _id: id });
        const info = {
            pageTitle: video.title,
            fakeUser,
            video
        }
        res.render("watch", info);
    } catch (error) {
        res.render("watch", info);
    }

};

export const search = (req, res) => res.send("VIDEO SEARCH");

export const getEdit = (req, res) => {
    const id = req.params.id;
    const info = {
        pageTitle: `Editing ${id}`,
        fakeUser
    }

    res.render("edit", info)
};

export const postEdit = (req, res) => {
    console.log(req.body);
    console.log(req.params)
    const id = req.params.id;

    res.redirect(`/videos/${id}`);
}

export const remove = (req, res) => res.send(`VIDEO DELETE! Do you really delete ${req.params.id} video`);

export const getUpload = (req, res) => {

    const info = {
        pageTitle: `Upload`,
        fakeUser,
    }
    res.render("upload", info);
}

export const postUpload = async (req, res) => {
    try {
        const { title, description, hashtags } = req.body;
        await Video.create({
            title,
            description,
            hashtags: hashtags.split(",").map((word) => `#${word.trim()}`),
        });
        res.redirect("/");
    } catch (error) {
        console.log(error);
        const info = {
            pageTitle: `Upload`,
            fakeUser,
            errorMessage: error._message
        }
        res.render("upload", info);
    }
}