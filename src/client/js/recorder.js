import "./main.js";

const video = document.getElementById("recorder");
const recorderButton = document.getElementById("recordButton");

let toggleOn;
let mediaStream;
let mediaRecorder;

const recordingOption = {
    mimeType: "video/webm"
}

const init = async () => {
    toggleOn = false;
    recorderButton.innerText = "Pause";
    video.volume = 0;
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (mediaStream) {
        console.log(mediaStream);
        video.srcObject = mediaStream;
        video.play();
    }
}

const handleDataAvailable = (event) => {
    console.log("data-available");

    if (event.data.size > 0) {

        console.log(event.data);
        download(event.data);
    } else {

    }
}

const download = (data) => {

    const url = URL.createObjectURL(data);

    const a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = "record.webm";
    document.body.appendChild(a);

    a.click();

    window.URL.revokeObjectURL(url);
}

const recordUserVideoHandler = async () => {
    if (!video) {
        return;
    }

    toggleOn = !toggleOn;
    recorderButton.innerText = toggleOn ? "Pause" : "Recording";

    if (!mediaRecorder) {
        mediaRecorder = new MediaRecorder(mediaStream, recordingOption);
        mediaRecorder.ondataavailable = handleDataAvailable;
    }

    const action = toggleOn ? () => mediaRecorder.start() : () => mediaRecorder.stop();

    action();
}

init();

recorderButton.addEventListener("click", recordUserVideoHandler);