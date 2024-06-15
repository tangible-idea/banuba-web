import {
  getScreenshot,
  muteToggle,
  startRecord,
  stopRecord,
} from "../BanubaPlayer.js";

import {
  muteButton,
  screenshotButton,
  popupNextButton,
  popups,
  recDurationBlock,
  recButton,
} from "./elements.js";

import {
  onResetButtonClick,
 // onFaceTrackingSelect
} from "./toolbar.js";

import { 
  openQuestion,
  selectNext
} from './popupSelection.js'
import { uploadImage } from '../dataServer.js'

import { analyzeImage } from '../faceapi.js'


let isSoundOn = 0;
let recDurationInterval;
let recDuration;
let isRecording = 0;

const onMuteButtonClick = () => {
  muteButton.src = !!isSoundOn
    ? "assets/icons/controls/icon-sound.svg"
    : "assets/icons/controls/icon-sound-active.svg";
  isSoundOn = 1 - isSoundOn;
  muteToggle(isSoundOn);
};

const onScreenshotButtonClick = async (e) => {
  if (e.type === "mousedown") {
    onResetButtonClick(); // show without filter.
    screenshotButton.src = "assets/icons/controls/icon-screenshot-active.svg";
  } else {
    screenshotButton.src = "assets/icons/controls/icon-screenshot.svg";
    
    const imageDOM = document.getElementById('inputImage');
    const screenShotData= await getScreenshot();
    imageDOM.src = URL.createObjectURL(screenShotData);
    console.log(`Image url: ${imageDOM.src}`);

    imageDOM.onload = async () => {
      console.log('Image loaded successfully');
      uploadImage(screenShotData, "face");
      await analyzeImage(imageDOM);
      openQuestion();
    };
  }
};

const renderRecDuration = () => {
  const str_pad_left = (string) => {
    return (new Array(3).join("0") + string).slice(-2);
  };

  const minutes = Math.floor(recDuration / 60);
  const seconds = recDuration - minutes * 60;

  recDurationBlock.innerText =
    str_pad_left(minutes) + ":" + str_pad_left(seconds);
  recDuration += 1;
};

const onRecButtonClick = async () => {
  if (!!isRecording) {
    recButton.src = "assets/icons/controls/icon-record.svg";
    recDurationBlock.classList.add("hidden");
    clearInterval(recDurationInterval);

    const url = URL.createObjectURL(await stopRecord());
    const popup = document.createElement("div");

    popup.classList.add("popup", "popup__hidden");
    popup.innerHTML = `<span class="popup__bold">Video is ready</span> Check the <span id="rec-link"><a href="${url}" target="_blank">link</a</span>`;
    popups.prepend(popup);

    setTimeout(() => {
      popup.classList.remove("popup__hidden");
    }, 20);
    setTimeout(() => {
      popup.classList.add("popup__hidden");
      setTimeout(() => {
        popup.remove();
      }, 5500);
    }, 5000);
  } else {
    recButton.src = "assets/icons/controls/icon-record-active.svg";
    recDurationBlock.classList.remove("hidden");
    recDurationBlock.innerText = "00:00";

    startRecord();

    recDuration = 0;
    renderRecDuration();

    recDurationInterval = setInterval(renderRecDuration, 1000);
  }
  isRecording = 1 - isRecording;
};

const onPopupNextClick=()=> {
  selectNext();
};

muteButton.addEventListener("click", onMuteButtonClick);
popupNextButton.addEventListener("click", onPopupNextClick);
screenshotButton.addEventListener("mousedown", onScreenshotButtonClick);
screenshotButton.addEventListener("mouseup", onScreenshotButtonClick);
recButton.addEventListener("click", onRecButtonClick);
