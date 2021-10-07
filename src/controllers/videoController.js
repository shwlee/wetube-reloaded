const fakeUser = {
    user: "Greg",
    loggedIn: true
}
const videos = [
    { title: "Hello", rating:5, comments:2, createdAt:"2 minutes ago", views:9, id:1 },
    { title: "#2", rating: 4, comments: 2, createdAt: "2 minutes ago", views: 9, id: 2 },
    { title: "Sorry", rating: 6, comments: 2, createdAt: "2 minutes ago", views: 9, id: 3 },
];
export const trending = (req, res) => res.render("home", { pageTitle: "Home", fakeUser, videos });

export const watch = (req, res) => res.render("watch", { pageTitle: "Watch", fakeUser, videos });

export const search = (req, res) => res.send("VIDEO SEARCH");

export const edit = (req, res) => res.render("edit", { pageTitle: "Edit", fakeUser, videos });

export const remove = (req, res) => res.send(`VIDEO DELETE! Do you really delete ${req.params.id} video`);

export const upload = (req, res) => res.send("VIDEO UPLOAD!");