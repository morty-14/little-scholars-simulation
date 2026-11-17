//Sample data for fruits displayed
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
let correctMatches = 0;
let shuffledData = [];

let wordsContainer = document.getElementById("words-container");
let imagesContainer = document.getElementById("images-container");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const gameArea = document.querySelector(".game-area");

//This shuffles the levels each time the page is opened or refreshed
function shuffleLevels() {
  shuffledData = [...data];
  for (let i = shuffledData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
  }
}


function loadLevel(level) {
  wordsContainer.innerHTML = "";
  imagesContainer.innerHTML = "";
  correctMatches = 0;

  nextBtn.disabled = true;
  nextBtn.classList.remove("active");

  const words = [...shuffledData[level]];
  const images = [...shuffledData[level]];

  shuffleArray(words);
  shuffleArray(images);

  words.forEach(item => {
    const wordCard = document.createElement("div");
    wordCard.className = "word-card";
    wordCard.textContent = item.word;
    wordCard.draggable = true;
    wordCard.dataset.word = item.word;
    wordCard.addEventListener("dragstart", handleDragStart);
    wordsContainer.appendChild(wordCard);
  });

  images.forEach(item => {
    const box = document.createElement("div");
    box.className = "image-box";
    box.dataset.word = item.word;

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.word;
    box.appendChild(img);

    box.addEventListener("dragover", handleDragOver);
    box.addEventListener("drop", handleDrop);

    imagesContainer.appendChild(box);
  });

  updateProgress();
}

//This handles the drag and drop feature
function handleDragStart(e) {
  e.dataTransfer.setData("text", e.target.dataset.word);
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const draggedWord = e.dataTransfer.getData("text");
  const targetWord = e.currentTarget.dataset.word;
  const draggedElement = document.querySelector(`[data-word="${draggedWord}"]`);

  if (draggedWord === targetWord) {
    e.currentTarget.classList.add("correct");
    e.currentTarget.classList.remove("incorrect");
    e.currentTarget.removeEventListener("drop", handleDrop);
    e.currentTarget.removeEventListener("dragover", handleDragOver);
    draggedElement.draggable = false;
    draggedElement.style.opacity = "0.6";
    correctMatches++;

    if (correctMatches === shuffledData[currentLevel].length) {
      nextBtn.disabled = false;
      nextBtn.classList.add("active");
    }
  } else {
    e.currentTarget.classList.add("incorrect");
    setTimeout(() => e.currentTarget.classList.remove("incorrect"), 800);
    wordsContainer.appendChild(draggedElement);
  }
}


function updateProgress() {
  const progressPercent = (currentLevel / shuffledData.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

//This allows the user to go to the next page
nextBtn.addEventListener("click", () => {
  currentLevel++;
  if (currentLevel < shuffledData.length) {
    loadLevel(currentLevel);
  } else {
    showEndScreen();
  }
});

//This shows the feedback at the end of the game
function showEndScreen() {
  progressBar.style.transition = 'none';
  progressBar.style.width = '100%';
  setTimeout(() => { progressBar.style.transition = 'width 0.4s ease'; }, 50);

  nextBtn.style.display = "none";

  gameArea.innerHTML = `
    <h2>You matched all the fruits correctly!⭐</h2>
    <button id="retry-btn" class="centered-btn"><b>RETRY</b></button>
  `;

  const retryBtn = document.getElementById("retry-btn");
  retryBtn.addEventListener("click", () => {
    gameArea.innerHTML = `
      <div id="words-container" class="words-container"></div>
      <div id="images-container" class="images-container"></div>
    `;

    wordsContainer = document.getElementById("words-container");
    imagesContainer = document.getElementById("images-container");

    currentLevel = 0;
    shuffleLevels();
    progressBar.style.width = "0%";

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
