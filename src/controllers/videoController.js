export const starting = (req, res) => res.send("Let's start!");

export const search = (req, res) => res.send("VIDEO SEARCH");

export const watch = (req, res) => res.send(`VIDEO SEEEEEEEEEEEEEEEEEEE!Now you watching ${req.params.id}`);

export const edit = (req, res) => res.send(`VIDEO EDIT! this video id is ${req.params.id}`);

export const remove = (req, res) => res.send(`VIDEO DELETE! Do you really delete ${req.params.id} video`);

export const upload = (req, res) => res.send("VIDEO UPLOAD!");