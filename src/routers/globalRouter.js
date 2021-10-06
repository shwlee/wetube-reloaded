import express from "express";

const globalRouter = express.Router();
globalRouter.get("/", (req, res) => res.send("<h1>HOME</h1>"));

export default globalRouter;