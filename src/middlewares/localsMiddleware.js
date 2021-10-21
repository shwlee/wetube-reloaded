import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};

    next();
}

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    }

    res.redirect("/login");
}

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    }

    res.redirect("/");
}

export const uploadAvatarMiddleware = multer({
    dest: "store/avatars",
    limits: {
        fieldSize: 1024 * 1024 * 10
    }
});

export const uploadVideoMiddleware = multer({
    dest: "store/videos",
    limits: {
        fieldSize: 1024 * 1024 * 100
    }
});