import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" });
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
        const video = await Video.findOne({ _id: id });
        if (video === null) {
            res.render("404", { pageTitle: "Video not found", fakeUser });
            return;
        }

        const info = {
            pageTitle: video.title,
            video
        }
        res.render("watch", info);
    } catch (error) {
        res.render("watch", info);
    }
};

export const search = async (req, res) => {
    const { keyword } = req.query;
    const videos = !keyword ? [] : await Video.find({ title: { $regex: new RegExp(keyword, "i") } });

    const info = {
        pageTitle: "Search",
        videos
    }
    res.render("search", info);
}

export const getEdit = async (req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id);
    if (video === null) {
        res.status(404).render("404", { pageTitle: "Video not found", fakeUser });
        return;
    }

    const info = {
        pageTitle: `Editing ${id}`,
        fakeUser,
        video
    }

    res.render("edit", info)
};

export const postEdit = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params);

        const { title, description, hashtags } = req.body;
        const id = req.params.id;
        const isExist = await Video.exists({ _id: id });
        if (isExist === false) {
            res.render("404", { pageTitle: "Video not found" });
            return;
        }

        await Video.findByIdAndUpdate(id, { title, description, hashtags: Video.formatHashtags(hashtags) });

        res.redirect(`/videos/${id}`);
    } catch (error) {
        res.render("server-error", error);
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
        const { title, description, hashtags } = req.body;
        console.log(title, description, hashtags);
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        });
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
        const { id } = req.params;
        await Video.findByIdAndDelete(id);

        return res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}