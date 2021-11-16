import express from "express";
import { updateView, postComments } from "../controllers/videoController";

const apiRouter = express.Router();
apiRouter.post("/videos/:id/views", updateView);
apiRouter.post("/videos/:id/comments", postComments);

export default apiRouter;