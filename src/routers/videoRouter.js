import express from "express";

const videoRouter = express.Router();
videoRouter.get("/watch", (req, res) => res.send("<h1>video/watch</h1>"));

export default videoRouter;