const questions = [
  {
    title: "Your go-to weekend activity is:",
    options: [
      { label: "Exploring a new city or trying a trendy cafe ☕", icon: "assets/icons/hand_gestures/Like.svg" },
      { label: "Relaxing at home with a good book or movie 📚🎬", icon: "assets/icons/hand_gestures/Ok.svg" },
      { label: "Catching up with friends or trying a new workout class 🤸‍♀️", icon: "assets/icons/hand_gestures/Ok.svg" },
    ],
  },
  {
    title: "Your ideal outfit usually involves",
    options: [
      { label: "A statement piece that makes me feel confident ✨", icon: "assets/icons/hand_gestures/Like.svg" },
      { label: "Effortless basics that are comfortable and chic 😎", icon: "assets/icons/hand_gestures/Ok.svg" },
      { label: "A mix of both, depending on my mood! 😉", icon: "assets/icons/hand_gestures/Ok.svg" },
    ],
  },
  {
    title: "Shine bright like a...",
    options: [
      { label: "Golden hour sunset 🌅", icon: "assets/icons/hand_gestures/Like.svg" },
      { label: "Crisp winter sky ❄️", icon: "assets/icons/hand_gestures/Ok.svg" },
      { label: "Sparkling night sky ✨", icon: "assets/icons/hand_gestures/Ok.svg" },
    ],
  },
];

let currentQuestionIndex = 0;
let selectedAnswers = [];

function renderQuestion() {
  const question = questions[currentQuestionIndex];

  document.querySelector('.popup-tips__title').innerText = question.title;
  document.querySelector('.popup-tips__subtitle').innerText = `(${currentQuestionIndex + 1}/${questions.length})`;
  
  const content = document.querySelector('.popup-tips__content');
  content.innerHTML = ''; // Clear previous content

  question.options.forEach(option => {
    const item = document.createElement('div');
    item.className = 'popup-tips__content-item';
    item.onclick = () => selectItem(item, option.label);

    const img = document.createElement('img');
    img.src = option.icon;
    img.alt = option.label;

    const label = document.createElement('label');
    label.innerText = option.label;

    item.appendChild(img);
    item.appendChild(label);
    content.appendChild(item);
  });
}

function selectItem(element, label) {
  // Remove 'selected' class from all items
  document.querySelectorAll('.popup-tips__content-item').forEach(item => {
    item.classList.remove('selected');
  });

  // Add 'selected' class to the clicked item
  element.classList.add('selected');

  // Save the selected answer
  selectedAnswers[currentQuestionIndex] = label;
}

function selectNext(element) {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    console.log('User selections:', selectedAnswers);
    alert('Thank you for completing the survey!');
  }
}

// Initial render
renderQuestion();