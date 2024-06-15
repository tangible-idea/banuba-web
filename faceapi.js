import * as faceapi from 'face-api.js';
const MODEL_URL = '/models';

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

  const imageUpload = document.getElementById('imageUpload');
  imageUpload.addEventListener('change', handleImageUpload);
});

async function handleImageUpload(event) {
  const image = document.getElementById('inputImage');
  image.src = URL.createObjectURL(event.target.files[0]);
  image.onload = async () => {
    console.log('Image loaded successfully');
    await analyzeImage(image);
  };
}

async function analyzeImage(image) {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = 'Analyzing...';

  try {
    console.log('Starting face detection');

    const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender();
    console.log('Detections:', detections);

    if (detections.length > 0) {
      const { age, gender, genderProbability } = detections[0];
      const roundedAge = Math.round(age);
      const resultText=  `Estimated Age: ${roundedAge} years, Gender: ${gender} (${(genderProbability * 100).toFixed(2)}%)`;
      console.log(resultText)
    } else {
      resultDiv.textContent = 'No face detected. Please try another image.';
    }
  } catch (error) {
    console.error('Error detecting faces:', error);
    resultDiv.textContent = 'Error detecting faces. Please try again.';
  }
}