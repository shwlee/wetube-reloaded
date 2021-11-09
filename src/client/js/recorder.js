import "./main.js";

const recorder = document.getElementById("recorder");

const recordUserVideoHandler = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    console.log(stream);
}

recorder.addEventListener("click", recordUserVideoHandler);