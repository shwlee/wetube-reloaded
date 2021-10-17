import express from "express";
import { githubLogin, githubAccess } from "../controllers/userController";

const authRouter = express.Router();
authRouter.get("/github", githubLogin);
authRouter.get("/github/access", githubAccess);

export default authRouter;