import express from "express";
import { logout, remove, getEdit, postEdit, profile, getChangePassword, postChangePassword, getAvatar } from "../controllers/userController";
import { protectorMiddleware, uploadAvatarMiddleware } from "../middlewares/localsMiddleware";

const userRouter = express.Router();
userRouter.get("/:id([0-9a-f]{24})", profile);

userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadAvatarMiddleware.single("avatar"), postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);

//userRouter.get("/store/:file", protectorMiddleware, getAvatar);
userRouter.use("/store", protectorMiddleware, express.static("store/avatars"));

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/delete", remove);

// sub router?
// const profileRouter = express.Router();
// profileRouter.get("/overview", profile);

userRouter.get("/profile/:id([0-9a-f]{24})", profile);

export default userRouter;