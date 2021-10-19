import express from "express";
import { githubLogin, githubAccess } from "../controllers/userController";
import { publicOnlyMiddleware } from "../middlewares/localsMiddleware";

const authRouter = express.Router();
authRouter.get("/github", publicOnlyMiddleware, githubLogin);
authRouter.get("/github/access", publicOnlyMiddleware, githubAccess);

export default authRouter;