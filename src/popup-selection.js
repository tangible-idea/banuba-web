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
      { src: "assets/images/chunky_gold_chain_necklace.png", alt: "Chunky Gold Chain Necklace" },
      { src: "assets/images/gold_watch_leather_band.png", alt: "Gold Watch with Leather Band" },
    ],
  },
  B: {
    title: "The Minimalist",
    description: "You value simplicity and quality. Your jewelry is an extension of your understated style, with clean lines and timeless designs.",
    recommendations: [
      { src: "assets/images/silver_chain_unique_clasp.png", alt: "Silver Chain with Unique Clasp" },
      { src: "assets/images/gold_pendant_small_design.png", alt: "Gold Pendant with Small Design" },
    ],
  },
  C: {
    title: "The Eclectic Mixologist",
    description: "You love to play with different styles and create unique combinations. You're drawn to pieces that are versatile and can be dressed up or down.",
    recommendations: [
      { src: "assets/images/silver_watch_leather_band.png", alt: "Silver Watch with Leather Band" },
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
  BC: {
    title: "The Timeless Sparkler",
    description: "You gravitate towards timeless pieces with a touch of sparkle and personality.",
    recommendations: [
      { src: "assets/images/gold_pendant_small_design.png", alt: "Gold Pendant with Small Design" },
      { src: "assets/images/silver_chain_unique_clasp.png", alt: "Silver Chain with Unique Clasp" },
    ],
  },
};

let currentQuestionIndex = 0;
let selectedAnswers = [];

const selectionCounts = { A: 0, B: 0, C: 0 };

function renderQuestion() {
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

function spinWheel() {
}

function selectNext() {
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
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  // Determine the most selected tag
  const maxCount = Math.max(selectionCounts.A, selectionCounts.B, selectionCounts.C);
  const mostSelectedTags = Object.keys(selectionCounts).filter(tag => selectionCounts[tag] === maxCount);

  let resultCategory;
  if (mostSelectedTags.length === 1) {
    resultCategory = mostSelectedTags[0];
  } else if (mostSelectedTags.includes('A') && mostSelectedTags.includes('B')) {
    resultCategory = 'AB';
  } else if (mostSelectedTags.includes('B') && mostSelectedTags.includes('C')) {
    resultCategory = 'BC';
  } else {
    resultCategory = mostSelectedTags[0]; // Fallback to the first tag in case of a tie
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
  document.querySelector('.popup-tips__button').innerText = 'Go to shop';
  document.querySelector('.popup-tips__button').onclick= spinWheel;
}
// Initialize the first question on page load
renderQuestion();