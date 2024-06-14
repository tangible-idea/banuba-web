import * as faceapi from 'face-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  // try {
  //   // 모델을 로드합니다.
  //   await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
  //   await faceapi.nets.ageGenderNet.loadFromUri('/models');

  //   const imageUpload = document.getElementById('imageUpload');
  //   imageUpload.addEventListener('change', handleImageUpload);
  // } catch (error) {
  //   console.error('Error loading models:', error);
  // }
});

const handleImageUpload = async (event) => {
  const image = document.getElementById('inputImage');
  image.src = URL.createObjectURL(event.target.files[0]);
  image.style.display = 'block';

  const resultDiv = document.getElementById('result');
  resultDiv.textContent = 'Analyzing...';

  try {
    // 얼굴 인식 및 나이, 성별 추측
    const detections = await faceapi.detectAllFaces(image).withAgeAndGender();
    if (detections.length > 0) {
      const { age, gender, genderProbability } = detections[0];
      const roundedAge = Math.round(age);
      resultDiv.textContent = `Estimated Age: ${roundedAge} years, Gender: ${gender} (${(genderProbability * 100).toFixed(2)}%)`;
    } else {
      resultDiv.textContent = 'No face detected. Please try another image.';
    }
  } catch (error) {
    console.error('Error detecting faces:', error);
    resultDiv.textContent = 'Error detecting faces. Please try again.';
  }
};