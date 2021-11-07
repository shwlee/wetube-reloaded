const video = document.querySelector("video");
const container = document.getElementById("videoContainer");
const playPause = document.getElementById("playPause");
const mute = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTimeText = document.getElementById("currentTime");
const totalTimeText = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreen = document.getElementById("fullscreen");

const defaultVolume = 0.5;
let lastVolume = 0.5;

// metadata loaded
const videoMetedataLoaded = (event) => {
    const { target: { duration } } = event;
    const endTime = Math.floor(duration);

    timeline.max = endTime;
    currentTimeText.innerText = "00:00:00";
    totalTimeText.innerText = `${getUpperTimeFormatText(endTime, 3600)}:${getUpperTimeFormatText(endTime, 60)}:${endTime % 60}`;

    playPause.innerText = "Play";
    mute.innerText = "MUTE";
    video.volume = defaultVolume;
    volumeRange.value = defaultVolume;
    fullScreen.innerText = "FULL SCREEN";
}

function getUpperTimeFormatText(totalMillisecond, unit, useTwoSize = true) {
    const time = Math.floor(totalMillisecond / unit);
    return useTwoSize ? (time < 9 ? `0${time}` : time) : time;
}

const getSecondFormatText = (totalMillisecond, useTwoSize = true) => {
    const time = Math.floor(totalMillisecond % 60);
    return useTwoSize ? (time < 9 ? `0${time}` : time) : time;
}

// play / pause
const playPauseHandler = () => {
    const isPaused = video.paused;
    const goToState = isPaused ? () => video.play() : () => video.pause();

    playPause.innerText = isPaused ? "PAUSE" : "PLAY";
    goToState();
}

// mute
const setMuteText = (isMuted) => mute.innerText = isMuted ? "UNMUTE" : "MUTE";

const muteHandler = () => {
    video.muted = !video.muted;
    const isMuted = video.muted;
    setMuteText(isMuted);

    // set volume range    
    const preVolume = volumeRange.value;
    const lastOrDefault = lastVolume <= 0 ? defaultVolume : lastVolume;
    const volume = isMuted ? 0 : lastOrDefault;

    volumeRange.value = volume;
    video.volume = volume;

    lastVolume = isMuted ? preVolume : lastOrDefault;
}

// volume
const setVolume = (event) => {
    const { target: { value } } = event;
    const isMute = value <= 0;

    video.volume = value;
    video.muted = isMute;

    // 0 일 때 mute 처리.
    setMuteText(isMute);
}

const videoTimeUpdateHandler = (event) => {
    const { target: { currentTime } } = event;
    const currentTimeForSec = Math.floor(currentTime);

    // currentTime innertext
    const time = `${getUpperTimeFormatText(currentTimeForSec, 3600)}:${getUpperTimeFormatText(currentTimeForSec, 60)}:${getSecondFormatText(currentTimeForSec)}`;

    currentTimeText.innerText = time;

    // slider
    timeline.value = currentTimeForSec;
}

const timelineHandler = (event) => {
    const { target: { value } } = event;
    video.currentTime = value;
}

const fullscreenHandler = () => {
    const fullscreenElement = document.fullscreenElement;
    const screenAction = fullscreenElement ? () => document.exitFullscreen() : () => container.requestFullscreen();
    screenAction();
}

document.onfullscreenchange = () => {
    const currentFullscreenElement = document.fullscreenElement;
    fullScreen.innerText = currentFullscreenElement ? "EXIT FULL SCREEN" : "FULL SCREEN";
}

video.addEventListener("loadedmetadata", videoMetedataLoaded);
video.addEventListener("timeupdate", videoTimeUpdateHandler);

playPause.addEventListener("click", playPauseHandler);
mute.addEventListener("click", muteHandler);
volumeRange.addEventListener("input", setVolume);
timeline.addEventListener("input", timelineHandler);
fullScreen.addEventListener("click", fullscreenHandler);