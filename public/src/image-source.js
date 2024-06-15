import { fps, getSource, startPlayer } from "../BanubaPlayer.js";
import { startScreen, overlay, fpsBlock } from "./elements.js";

const onSourceSelect = () => {
  //startScreen.classList.add("hidden");
  overlay.classList.add("hidden");
  setInterval(() => {
    fpsBlock.querySelectorAll("span").forEach((el) => {
      el.innerText = fps[el.id].toFixed(1);
    });
  });
};

// Automatically select the webcam source and start the player
const startWithWebcam = () => {
  const source = getSource("webcam");
  startPlayer(source);
  onSourceSelect();
};

// Start the player immediately with webcam on page load
//window.addEventListener("load", startWithWebcam);
startWithWebcam();