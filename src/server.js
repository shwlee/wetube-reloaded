import express from "express";
import logger from "morgan";
import rootRouter from "./routers/rootRouter";
import authRouter from "./routers/authRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares/localsMiddleware";
import apiRouter from "./routers/apiRouter";

const app = express();

// set pug enviornment
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger("common")); // apply all routers.

// 이게 없으면  req.body 가 undefined 로 뜬다.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session 미들웨어를 사용해야 브라우저 요청 시 sid 를 내려준다.
app.use(session({
    secret: process.env.COOKKIE_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (30 * 24 * 60 * 60 * 1000)
    }
}));

app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/static", express.static("assets"));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;