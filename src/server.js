import express from "express";
import logger from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const port = 4000;
const app = express();

// set pug enviornment
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger("common")); // apply all routers.

// 이게 없으면  req.body 가 undefined 로 뜬다.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () => console.log(`::Server listening on port ${port} the server is running`);

app.listen(port, handleListening);