import express from "express";
import logger from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const port = 4000;
const app = express();

console.log(process.cwd());

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger("common")); // apply all routers.

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () => console.log(`::Server listening on port ${port} the server is running` );

app.listen(port, handleListening);