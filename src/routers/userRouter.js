import express from "express";
import { logout, remove, getEdit, postEdit, profile, getChangePassword, postChangePassword } from "../controllers/userController";
import { protectorMiddleware } from "../middlewares/localsMiddleware";

const userRouter = express.Router();
userRouter.get("/:id([0-9a-f]{24})", profile);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/delete", remove);

// sub router?
const profileRouter = express.Router();
profileRouter.get("/overview", profile);

userRouter.use("/profile", profileRouter);

export default userRouter;