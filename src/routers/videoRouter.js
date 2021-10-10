import express from "express";
import { watch, getEdit, postEdit, remove, getUpload, postUpload } from "../controllers/videoController";

const videoRouter = express.Router();
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit); // id 는 24길이의 hex 값
videoRouter.get("/:id([0-9a-f]{24})", watch); // : 는 parameter 로 인식.
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id/delete", remove); // 변수 형식을 정규식으로 강제 가능.

export default videoRouter;