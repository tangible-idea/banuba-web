const questions = [
  {
    title: "Your go-to weekend activity is:",
    options: [
      { tag: 'A', label: "Exploring a new city or trying a trendy cafe ☕", icon: "assets/icons/hand_gestures/Like.svg" },
      { tag: 'B', label: "Relaxing at home with a good book or movie 📚🎬", icon: "assets/icons/hand_gestures/Ok.svg" },
      { tag: 'C', label: "Catching up with friends or trying a new workout class 🤸‍♀️", icon: "assets/icons/hand_gestures/Ok.svg" },
    ],
  },
  {
    title: "Your ideal outfit usually involves",
    options: [
      { tag: 'A', label: "A statement piece that makes me feel confident ✨", icon: "assets/icons/hand_gestures/Like.svg" },
      { tag: 'B', label: "Effortless basics that are comfortable and chic 😎", icon: "assets/icons/hand_gestures/Ok.svg" },
      { tag: 'C', label: "A mix of both, depending on my mood! 😉", icon: "assets/icons/hand_gestures/Ok.svg" },
    ],
  },
  {
    title: "Shine bright like a...",
    options: [
      { tag: 'A', label: "Golden hour sunset 🌅", icon: "assets/icons/hand_gestures/Like.svg" },
      { tag: 'B', label: "Crisp winter sky ❄️", icon: "assets/icons/hand_gestures/Ok.svg" },
      { tag: 'C', label: "Sparkling night sky ✨", icon: "assets/icons/hand_gestures/Ok.svg" },
    ],
  },
];
const results = {
  A: {
    title: "The Trendsetter",
    description: "You love to be ahead of the curve and aren't afraid to experiment with your style. You gravitate towards bold pieces that make a statement.",
    recommendations: [
      { src: "assets/images/gold_bird_pendant.png", alt: "From ciel neckless" },
      { src: "assets/images/gold_pendant_small_design.png", alt: "Gold Watch with Leather Band" },
    ],
  },
  B: {
    title: "The Minimalist",
    description: "You value simplicity and quality. Your jewelry is an extension of your understated style, with clean lines and timeless designs.",
    recommendations: [
      { src: "assets/images/silver_chain_unique_clasp.png", alt: "Silver Chain with Unique Clasp" },
      { src: "assets/images/fromciel_neckless.png", alt: "fromciel_neckless" },
    ],
  },
  C: {
    title: "The Eclectic Mixologist",
    description: "You love to play with different styles and create unique combinations. You're drawn to pieces that are versatile and can be dressed up or down.",
    recommendations: [
      { src: "assets/images/silver_bird_pendant.png", alt: "Silver Bird Pendant" },
      { src: "assets/images/gold_bird_pendant.png", alt: "Gold Bird Pendant" },
    ],
  },
  AB: {
    title: "The Balanced Aesthetic",
    description: "You appreciate both bold and minimalist aesthetics, finding a balance between statement-making and understated elegance.",
    recommendations: [
      { src: "assets/images/gold_bird_pendant.png", alt: "Gold Bird Pendant" },
      { src: "assets/images/silver_watch_metal_band.png", alt: "Silver Watch with Metal Band" },
    ],
  },
  fromciel: {
    title: "The Timeless Sparkler",
    description: "You gravitate towards timeless pieces with a touch of sparkle and personality.",
    recommendations: [
      { src: "assets/images/fromciel_neckless.png", alt: "formciel neckless" },
      { src: "assets/images/silver_bird_pendant.png", alt: "Silver Bird" },
    ],
  },
};

let currentQuestionIndex = 0;
let selectedAnswers = [];

const selectionCounts = { A: 0, B: 0, C: 0 };

import { estimatedAge, estimatedGender } from '../faceapi.js';

// 얼굴 검사 팝업
export const openFacePopup = (image, resultString, roundedAge, gender) => {
  const facePopup= document.querySelector('#face-popup')
  const faceImage= document.querySelector('#face-popup-image');
  const faceText= document.querySelector('#face-popup-text');
  const nextButton= document.querySelector('#face-popup-next-button');
  const retakeButton= document.querySelector('#face-popup-retake-button');
  
  faceImage.src= image.src;

  if(resultString === undefined) // no face detected.
    resultString = "";

  faceText.innerHTML = `${resultString}<br><span class="smalltext">Would you like to receive recommendations based on your face type?</span>`;
  
  facePopup.classList.remove('hidden');
  nextButton.onclick = () => {
    facePopup.classList.add('hidden');
    openQuestion();
  };
  retakeButton.onclick = () => {
    location.reload();
  }
  
}


import { popupNextButton } from './elements.js';
var isShowResult= false;

// open question (다음 질문 또는 처음 질문.)
export const openQuestion = () => {

  document.querySelector('.popup-tips').classList.remove('hidden');

  const question = questions[currentQuestionIndex];

  document.querySelector('.popup-tips__title').innerText = question.title;
  document.querySelector('.popup-tips__subtitle').innerText = `(${currentQuestionIndex + 1}/${questions.length})`;

  const content = document.querySelector('.popup-tips__content');
  content.innerHTML = ''; // Clear previous content

  question.options.forEach(option => {
    const item = document.createElement('div');
    item.className = 'popup-tips__content-item';
    item.onclick = () => selectItem(item, option.tag);

    const img = document.createElement('img');
    img.src = option.icon;
    item.appendChild(img);

    const label = document.createElement('span');
    label.innerText = option.label;
    item.appendChild(label);

    content.appendChild(item);
  });
}

function selectItem(item, tag) {
  // Deselect all items first
  const items = document.querySelectorAll('.popup-tips__content-item');
  items.forEach(i => i.classList.remove('selected'));

  // Select the clicked item
  item.classList.add('selected');

  // Save the selection
  selectedAnswers[currentQuestionIndex] = tag;
}

// 다음 질문
export const selectNext = () => {
  
  if(isShowResult) {
    freeLuckyDraw();
    return;
  }

  // Check if an item is selected
  if (selectedAnswers[currentQuestionIndex] === undefined) {
    alert('Please select an option before proceeding.');
    return;
  }

  // Count the selection
  const selectedTag = selectedAnswers[currentQuestionIndex];
  selectionCounts[selectedTag]++;

  // Move to the next question or finish
  currentQuestionIndex++;
  console.log(`currentQuestionIndex : ${currentQuestionIndex}`)
  if (currentQuestionIndex < questions.length) {
    openQuestion();
  } else {
    showResults();
  }
}

function showResults() {

  // check flag.
  isShowResult= true;

  // Determine the most selected tag
  const maxCount = Math.max(selectionCounts.A, selectionCounts.B, selectionCounts.C);
  const mostSelectedTags = Object.keys(selectionCounts).filter(tag => selectionCounts[tag] === maxCount);

  let resultCategory;
  if (mostSelectedTags.length === 1) {
    resultCategory = mostSelectedTags[0];
  } else if (mostSelectedTags.includes('A') && mostSelectedTags.includes('B')) {
    resultCategory = 'AB';
  }
    else {
    resultCategory = mostSelectedTags[0]; // Fallback to the first tag in case of a tie
  }


  // fromciel target 
  if(resultCategory == "B" && estimatedAge <= 30 && estimatedGender == "female") {
    resultCategory= "fromciel"
  }

  const result = results[resultCategory];

  // Display the results
  const content = document.querySelector('.popup-tips__content');
  content.innerHTML = `<h2>${result.title}</h2><p>${result.description}</p>`;
  
  const recommendationsContainer = document.createElement('div');
  recommendationsContainer.className = 'recommendations-container';
  
  result.recommendations.forEach(rec => {
    const img = document.createElement('img');
    img.src = rec.src;
    img.alt = rec.alt;
    img.className = 'recommendation-image';
    recommendationsContainer.appendChild(img);
  });
  
  content.appendChild(recommendationsContainer);

  document.querySelector('.popup-tips__title').innerText = '';
  document.querySelector('.popup-tips__subtitle').innerText = '';
  //document.querySelector('.popup-tips__button').style.display = 'none';
  popupNextButton.innerText = 'Win a Free Accessory Lucky Draw!';
}

function onDiscard() {
  location.reload();
}

import { saveUserResult } from '../dataServer.js';

function freeLuckyDraw() {

  // Get elements
  const popup = document.getElementById("myPopup");
  const closeButton = document.getElementsByClassName("close")[0];
  const imageContainer = document.querySelector(".image-container");
  const submitButton = document.getElementById("submitButton");
  let selectedImage = null;

  popup.style.display = "block";

  // Close popup
  closeButton.onclick = () => {
    popup.style.display = "none";
  };

  // Handle image clicks
  imageContainer.addEventListener("click", (event) => {
    const clickedDiv = event.target.closest("div"); // Get the parent div

    if (clickedDiv) {
      // Remove 'selected' class from previously selected image
      if (selectedImage) {
        selectedImage.classList.remove("selected");
      }
      selectedImage = clickedDiv;
      clickedDiv.classList.add("selected");
    }
  });

  // Handle submit button click
  submitButton.onclick = () => {
    const emailInput = document.getElementById('emailInput').value;
    if (!selectedImage) {
      alert('Please select an accessory to win!');
      event.preventDefault();
    } else if (!emailInput) {
      alert('Please enter your email to get your prize.');
      event.preventDefault();
    } else {
      // submit result
      const imageSrc= selectedImage.getElementsByTagName('img')[0].src;
      console.log(imageSrc);
      saveUserResult(emailInput, imageSrc);
    }
  };
}