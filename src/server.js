import express from "express";

const port = 4000;
const app = express();

app.get("/", (req, res) => {
    //console.log(req);
    //return res.end();
    return res.send("ss");
});

app.get("/login", (req, res) => {
    return res.send("login here.");
})




const handleListening = () => console.log(`::Server listening on port ${port} the server is running` );

app.listen(port, handleListening);