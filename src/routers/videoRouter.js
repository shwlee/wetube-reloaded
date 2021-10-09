import express from "express";
import { watch, getEdit, postEdit, remove, getUpload, postUpload } from "../controllers/videoController";

const videoRouter = express.Router();
videoRouter.get("/:id(\\d+)", watch); // : 는 parameter 로 인식.

videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

videoRouter.get("/:id(\\d+)/delete", remove); // 변수 형식을 정규식으로 강제 가능.




export default videoRouter;