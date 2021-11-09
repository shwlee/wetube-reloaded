import express from "express";
import { updateView } from "../controllers/videoController";

const apiRouter = express.Router();
apiRouter.post("/videos/:id/views", updateView);

export default apiRouter;