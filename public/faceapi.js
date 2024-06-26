import * as faceapi from 'face-api.js';
const MODEL_URL = '/models';

// load image processing models
async function loadModels() {
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
    console.log('Models loaded successfully');
  } catch (error) {
    console.error('Error loading models:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadModels();
});

const showAnalyzingPopup=(content) => {
  const popup = document.createElement("div");
    popup.classList.add("popup", "popup__hidden");
    popup.innerHTML = `<span class="popup__bold">${content}</span> <span id="screenshot-link"></span>`;
    popups.prepend(popup);

    setTimeout(() => {
      popup.classList.remove("popup__hidden");
    }, 20);

    setTimeout(() => {
      //onFaceTrackingSelect();
      //location.reload();
      popup.classList.add("popup__hidden");
      
      setTimeout(() => {
        popup.remove();
      }, 5500);

    }, 5000);
}

export var estimatedAge= 30;
export var estimatedGender= "Male";

// Analzye Image
export const analyzeImage = async(image) => {
  showAnalyzingPopup("Analzying your face...");

  try {
    console.log('Starting face detection');

    const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender();
    console.log('Detections:', detections);

    if (detections.length > 0) {
      const { age, gender, genderProbability } = detections[0];
      const roundedAge = Math.round(age);
      const resultString=  `Estimated Age: ${roundedAge} years<br>Gender: ${gender} (${(genderProbability * 100).toFixed(2)}%)`;
      
      estimatedGender= gender;
      estimatedAge= age;

      console.log(resultString)
      return { resultString, roundedAge, gender };
    } else {
      //resultDiv.textContent = 'No face detected. Please try another image.';
      return "";
    }
  } catch (error) {
    console.error('Error detecting faces:', error);
    showAnalyzingPopup("Error detecting faces. Please try again.");
  }
}