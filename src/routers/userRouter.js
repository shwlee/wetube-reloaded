import express from "express";
import { logout, remove, edit, profile } from "../controllers/userController";

const userRouter = express.Router();
userRouter.get("/:id", profile);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);

// sub router?
const profileRouter = express.Router();
profileRouter.get("/overview", profile);

userRouter.use("/profile", profileRouter);

export default userRouter;