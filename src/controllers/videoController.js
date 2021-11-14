import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" });
        req.flash("error", "TEST error");
        res.render("home", {
            pageTitle: "Home",
            videos
        });
    } catch (error) {
        res.render("server-error", error); // TODO : implement
    }
};

export const watch = async (req, res) => {
    try {
        const id = req.params.id;
        const video = await Video.findOne({ _id: id }).populate("owner");
        if (!video) {
            res.render("404", { pageTitle: "Video not found" });
            return;
        }

        const info = {
            pageTitle: video.title,
            video,
            owner: video.owner
        }
        res.render("watch", info);
    } catch (error) {
        console.log("Watch Error: ", error)
        res.status(400).redirect("/");
    }
};

export const search = async (req, res) => {
    const { keyword } = req.query;
    const videos = !keyword ? [] : await Video.find({ title: { $regex: new RegExp(keyword, "i") } });

    const info = {
        videos
    }
    res.render("search", info);
}

export const getEdit = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id }
        }
    } = req;

    const video = await Video.findById(id);
    if (!video) {
        res.status(404).render("404", { pageTitle: "Video not found", fakeUser });
        return;
    }

    if (_id !== req.session.user._id) {
        res.status(404).redirect("/");
        return;
    }

    const info = {
        video
    }

    res.render("edit", info)
};

export const postEdit = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params);

        const {
            params: { id },
            file: { filename },
            body: { title, description, hashtags },
            session: {
                user: { _id }
            }
        } = req;

        const existsVideo = await Video.findOne({ _id: id });
        if (!existsVideo) {
            res.status(404).render("404", { pageTitle: "Video not found" });
            return;
        }

        if (existsVideo.owner.toString !== _id) {
            res.status(403).render("/");
            return;
        }

        existsVideo.title = title;
        existsVideo.description = description;
        existsVideo.hashtags = Video.formatHashtags(hashtags);
        existsVideo.file = filename ? filename : existsVideo.file || "";

        existsVideo.save();

        res.redirect(`/videos/${id}`);
    } catch (error) {
        res.status(400).render("server-error", error);
    }
}

export const getUpload = (req, res) => {

    const info = {
        pageTitle: `Upload`,
    }
    res.render("upload", info);
}

export const postUpload = async (req, res) => {
    try {
        const {
            session: {
                user: { _id }
            },
            file: { filename },
            body: { title, description, hashtags }
        } = req;

        const newVideo = await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
            file: filename,
            owner: _id
        });

        // upload user update
        const uploadUser = await User.findById(_id);
        uploadUser.videos.push(newVideo._id);
        await uploadUser.save();

        res.redirect("/");
    } catch (error) {
        console.log(error);
        const info = {
            pageTitle: `Upload`,
            errorMessage: error._message
        }
        res.render("upload", info);
    }
}

export const remove = async (req, res) => {
    try {
        const {
            params: { id },
            session: {
                user: { _id }
            }
        } = req;
        const video = await Video.findById(id);
        if (!video) {
            res.status(404).render("404", { pageTitle: "Video not found" });
            return;
        }

        if (video.owner.toString() !== _id) {
            res.status(403).redirect("/");
            return;
        }

        await Video.findByIdAndDelete(id);

        return res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

export const updateView = async (req, res) => {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
        return req.sendStatus(404);
    }

    video.meta.views++;

    await video.save();

    return res.sendStatus(200);
}