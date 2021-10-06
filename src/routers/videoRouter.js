import express from "express";
import { watch, edit, remove, upload } from "../controllers/videoController";

const videoRouter = express.Router();
videoRouter.get("/:id", watch);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", remove);
videoRouter.get("/upload", upload);

export default videoRouter;