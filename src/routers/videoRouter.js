import express from "express";
import { watch, getEdit, postEdit, remove, getUpload, postUpload } from "../controllers/videoController";
import { protectorMiddleware, uploadVideoMiddleware } from "../middlewares/localsMiddleware";

const videoRouter = express.Router();
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit); // id 는 24길이의 hex 값
videoRouter.get("/:id([0-9a-f]{24})", watch); // : 는 parameter 로 인식.

videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(uploadVideoMiddleware.single("video"), postUpload);
videoRouter.use("/store", protectorMiddleware, express.static("store/videos"));

videoRouter.route("/delete/:id([0-9a-f]{24})").all(protectorMiddleware).get(remove); // 변수 형식을 정규식으로 강제 가능.

export default videoRouter;