import "./db";
import "./models/Video";
import app from "./server";

const port = 4000;
const handleListening = () => console.log(`::Server listening on port ${port} the server is running`);
app.listen(port, handleListening);