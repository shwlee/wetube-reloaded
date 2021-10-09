const fakeUser = {
    user: "Greg",
    loggedIn: true
}

const videos = [{
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 0,
        id: 0
    },
    {
        title: "#2 Video",
        rating: 4,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 9,
        id: 1
    },
    {
        title: "3rd Video",
        rating: 6,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 9,
        id: 2
    },
];
export const trending = (req, res) => res.render("home", {
    pageTitle: "Home",
    fakeUser,
    videos
});

export const watch = (req, res) => {
    const id = req.params.id;
    const video = videos.find(v => v.id === parseInt(id, 10));
    const info = {
        pageTitle: `Watching ${id}`,
        fakeUser,
        video
    }
    res.render("watch", info);
};

export const search = (req, res) => res.send("VIDEO SEARCH");

export const getEdit = (req, res) => {
    const id = req.params.id;
    const video = videos.find(v => v.id === parseInt(id, 10));
    const info = {
        pageTitle: `Editing ${id}`,
        fakeUser,
        video
    }

    res.render("edit", info)
};

export const postEdit = (req, res) => {
    console.log(req.body);
    console.log(req.params)
    const id = req.params.id;
    const video = videos.find(v => v.id === parseInt(id, 10));

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

export const postUpload = (req, res) => {
    //console.log(req.params);
    console.log(req.body);

    // const { title } = req.body;
    // const newVideo = {
    //     title,
    //     rating: 0,
    //     comments: 0,
    //     createdAt: "just now",
    //     views: 0,
    //     id: 3
    // }

    const info = {
        pageTitle: `Upload`,
        fakeUser,
    }
    res.redirect("/");
}