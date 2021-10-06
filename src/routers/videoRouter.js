import express from "express";
import { watch, edit, remove, upload } from "../controllers/videoController";

const videoRouter = express.Router();
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", watch); // : 는 parameter 로 인식.
videoRouter.get("/:id(\\d+)/edit", edit); // : 뒤에 변수명 지정.
videoRouter.get("/:id(\\d+)/delete", remove); // 변수 형식을 정규식으로 강제 가능.

export default videoRouter;