import express from "express";
import { starting, search } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router();
globalRouter.get("/", starting);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;