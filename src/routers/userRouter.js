import express from "express";

const userRouter = express.Router();
userRouter.get("/edit", (req, res) => res.send("<h1>user/edit</h1>"))

export default userRouter;