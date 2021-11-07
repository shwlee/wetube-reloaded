const video = document.querySelector("video");
const container = document.getElementById("videoContainer");
const controller = document.getElementById("videoController");
const playPause = document.getElementById("play");
const playPauseIcon = playPause.querySelector("i");
const mute = document.getElementById("mute");
const muteButtonIcon = mute.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTimeText = document.getElementById("currentTime");
const totalTimeText = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreen = document.getElementById("fullScreen");
const fullScreenButtonIcon = fullScreen.querySelector("i");

const playIcon = "fa-solid fa-circle-play";
const pauseIcon = "fa-solid fa-circle-pause";
const muteIcon = "fa-solid fa-volume-xmark";
const volumeIcon = "fa-solid fa-volume-up";
const zeroTime = "00:00:00";
const fullscreenIcon = "fa-solid fa-expand";
const normalscreenIcon = "fa-solid fa-compress";

const defaultVolume = 0.5;
let lastVolume = 0.5;
let controllerShowing = null;

container.focus();

// metadata loaded
const videoMetedataLoaded = (event) => {
    const { target: { duration } } = event;
    const endTime = Math.floor(duration);

    timeline.max = endTime;
    currentTimeText.innerText = zeroTime;
    totalTimeText.innerText = `${getUpperTimeFormatText(endTime, 3600)}:${getUpperTimeFormatText(endTime, 60)}:${endTime % 60}`;

    video.volume = defaultVolume;
    volumeRange.value = defaultVolume;
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
const playPauseHandler = (event) => {

    console.log(event);

    const isPaused = video.paused;
    const goToState = isPaused ? () => video.play() : () => video.pause();

    playPauseIcon.className = isPaused ? pauseIcon : playIcon;
    goToState();
}

// mute
const setMuteIconClassName = (isMuted) => muteButtonIcon.className = isMuted ? muteIcon : volumeIcon;

const muteHandler = (event) => {
    video.muted = !video.muted;
    const isMuted = video.muted;
    setMuteIconClassName(isMuted);

    // set volume range    
    const preVolume = volumeRange.value;
    const lastOrDefault = lastVolume <= 0 ? defaultVolume : lastVolume;
    const volume = isMuted ? 0 : lastOrDefault;

    volumeRange.value = volume;
    video.volume = volume;

    lastVolume = isMuted ? preVolume : lastOrDefault;

    event.preventDefault();
}

// volume
const setVolumeHandler = (event) => {
    const { target: { value } } = event;
    handleVolumeChanged(value);

    event.preventDefault();
}

const handleVolumeChanged = (value) => {
    const isMute = value <= 0;

    video.volume = value;
    video.muted = isMute;

    // 0 일 때 mute 처리.
    setMuteIconClassName(isMute);
}

const setVolume = (volumeValue) => {
    let currentVolume = Number(volumeRange.value);
    currentVolume += volumeValue;
    currentVolume = currentVolume < 0 ? 0 : currentVolume;
    volumeRange.value = currentVolume;

    handleVolumeChanged(Number(volumeRange.value));
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

const moveTimeline = (time) => {
    video.currentTime += time;
}

const fullscreenHandler = () => {
    const fullscreenElement = document.fullscreenElement;
    const screenAction = fullscreenElement ? () => document.exitFullscreen() : () => container.requestFullscreen();
    screenAction();
}

const setFullscreenText = () => {
    const currentFullscreenElement = document.fullscreenElement;
    fullScreenButtonIcon.className = currentFullscreenElement ? normalscreenIcon : fullscreenIcon;
}

const videoShowingHandler = () => {
    if (controllerShowing) {
        clearTimeout(controllerShowing);
        controllerShowing = null;
    }

    controller.classList.add("showing");
    controllerShowing = setTimeout(() => {
        controller.classList.remove("showing");
    }, 3000);
}

const keyInputHandler = (event) => {
    const { keyCode } = event;
    switch (keyCode) {
        case 32: // space
            playPauseHandler();
            break;
        case 39: // right arrow
            moveTimeline(5);
            break;
        case 37: // left arrow
            moveTimeline(-5);
            break;
        case 38: //up
            setVolume(0.1);
            break;
        case 40: //down
            setVolume(-0.1);
            break;
        case 116: // F5
            window.location.reload();
    }

    event.preventDefault();
}

document.addEventListener("fullscreenchange", setFullscreenText);

video.addEventListener("loadedmetadata", videoMetedataLoaded);
video.addEventListener("timeupdate", videoTimeUpdateHandler);
video.addEventListener("click", playPauseHandler);

container.addEventListener("mousemove", videoShowingHandler);

// key 관련 이벤트를 받으려면 tabIndex=0 세팅해야함. 
container.addEventListener("keydown", keyInputHandler);

playPause.addEventListener("click", playPauseHandler);
mute.addEventListener("click", muteHandler);
volumeRange.addEventListener("input", setVolumeHandler);
volumeRange.addEventListener("change", setVolumeHandler);
timeline.addEventListener("input", timelineHandler);
fullScreen.addEventListener("click", fullscreenHandler);