//Sample data for the fruits displayed 
const data = [
  [
    { word: "Apple", image: "../images/fruits/apple.jpg" },
    { word: "Banana", image: "../images/fruits/banana.jpg" },
    { word: "Pear", image: "../images/fruits/pear.jpg" }
  ],
  [
    { word: "Grapes", image: "../images/fruits/grapes.jpg" },
    { word: "Strawberry", image: "../images/fruits/strawberry.jpg" },
    { word: "Orange", image: "../images/fruits/orange.jpg" }
  ],
  [
    { word: "Watermelon", image: "../images/fruits/watermelon.jpg" },
    { word: "Pineapple", image: "../images/fruits/pineapple.jpg" },
    { word: "Mango", image: "../images/fruits/mango.jpg" }
  ]
];


let currentLevel = 0;
let currentIndex = 0;
let shuffledData = [];
let currentSet = [];
const gameArea = document.querySelector(".game-area");
const progressBar = document.getElementById("progress-bar");
const nextBtn = document.getElementById("next-btn");

//This shuffles the levels after the page is opened or refreshed
function shuffleLevels() {
  shuffledData = [...data];
  for (let i = shuffledData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
  }
}

function loadLevel(level) {
  currentSet = [...shuffledData[level]];
  shuffleArray(currentSet);
  currentIndex = 0;
  progressBar.style.width = `${(level / shuffledData.length) * 100}%`;
  showCurrentImage();
}

// This displays only one picture and type box 
function showCurrentImage() {
  gameArea.innerHTML = "";

  if (currentIndex >= currentSet.length) {
    nextBtn.disabled = false;
    nextBtn.classList.add("active");
    return;
  }

  //This deals with the image container where the picture is displayed
  const imageBox = document.createElement("div");
  imageBox.className = "image-box-single";

  const img = document.createElement("img");
  img.src = currentSet[currentIndex].image;
  imageBox.appendChild(img);

  gameArea.appendChild(imageBox);

  //This deals with the input box
  const inputBox = document.createElement("input");
  inputBox.type = "text";
  inputBox.id = "user-input";
  inputBox.placeholder = "Type here";
  gameArea.appendChild(inputBox);

  //This deals with the feedback
  const feedback = document.createElement("div");
  feedback.id = "feedback";
  gameArea.appendChild(feedback);

  inputBox.focus();

  inputBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      checkAnswer(inputBox.value.trim(), feedback);
    }
  });
}

//This checks if the answer typed by the user is right or wrong
function checkAnswer(answer, feedbackEl) {
  const correctAnswer = currentSet[currentIndex].word.toLowerCase();
  if (answer.toLowerCase() === correctAnswer) {
    feedbackEl.textContent = "CORRECT";
    feedbackEl.style.color = "#4caf50";
    currentIndex++;
    updateProgress();
    setTimeout(showCurrentImage, 500);
  } else {
    feedbackEl.textContent = "TRY AGAIN";
    feedbackEl.style.color = "#e53935";
  }
}

//This deals with the progress bar
function updateProgress(){
  const totalItems = shuffledData.reduce((sum, set) => sum + set.length, 0);
  const completedItems = currentLevel* shuffledData[0].length + currentIndex;
  progressBar.style.width = '${completedItems / totalItems) * 100}%';
 }


//This allows the user to go to the next page
nextBtn.addEventListener("click", () => {
  currentLevel++;
  if (currentLevel < shuffledData.length) {
    loadLevel(currentLevel);
    nextBtn.disabled = true;
    nextBtn.classList.remove("active");
  } else {
    showEndScreen();
  }
});

//This shows the feedback at the end of the game
function showEndScreen() {
  progressBar.style.width = '100%';

  gameArea.innerHTML = `
    <h2>You got all the fruits right!⭐</h2>
    <button id="retry-btn" class="centered-btn"><b>RETRY</b></button>
  `;
  nextBtn.style.display = "none";

  const retryBtn = document.getElementById("retry-btn").addEventListener("click", () => {
    currentLevel = 0;
    shuffleLevels();
    nextBtn.style.display = "inline-block";
    nextBtn.disabled = true;
    nextBtn.classList.remove("active");
    loadLevel(currentLevel);
  });
}

function goBack() {
  window.location.href = "../HOMEPAGE/";
}

//This shuffles the items in the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//This initializes the game
shuffleLevels();
loadLevel(currentLevel);