// Sample data for sentences used
let data = [
  { sentence: "I like food", missingIndex: 1, options: ["like", "build", "church"] },
  { sentence: "The cat is small", missingIndex: 1, options: ["cat", "people", "hairstyle"] },
  { sentence: "I can see the sun", missingIndex: 2, options: ["paint", "see", "eat"] },
  { sentence: "She is happy", missingIndex: 1, options: ["chicken", "are", "is"] }
];

let currentQuestion = 0;
let selectedOption = null;

const gameArea = document.querySelector(".game-area");
const progressBar = document.getElementById("progress-bar");
const nextBtn = document.getElementById("next-btn");

//This shuffles the items in the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Sentences and options will be shuffled whenever page opens/refreshes
function shuffleQuestions() {
  shuffleArray(data);
  data.forEach(q => shuffleArray(q.options));
}


function loadQuestion() {
  gameArea.innerHTML = "";
  selectedOption = null;
  nextBtn.disabled = true;
  nextBtn.classList.remove("active");

  const q = data[currentQuestion];

  // Sentences will include missing value
  const sentenceParts = q.sentence.split(" ");
  sentenceParts[q.missingIndex] = "____";
  const sentenceBox = document.createElement("div");
  sentenceBox.className = "sentence-box";
  sentenceBox.textContent = sentenceParts.join(" ");
  gameArea.appendChild(sentenceBox);


  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectOption(btn, opt));
    gameArea.appendChild(btn);
  });

  updateProgress();
}

// This allows the user to select an option
function selectOption(btn, option) {
  selectedOption = option;

  //This removes any previous highlighted answer (green/red)
  document.querySelectorAll(".option-btn").forEach(b => {
    b.classList.remove("correct", "incorrect");
  });

  // Indicating if answer is right or wrong
  const correctWord = data[currentQuestion].sentence.split(" ")[data[currentQuestion].missingIndex];
  if (option === correctWord) {
    btn.classList.add("correct");
    nextBtn.disabled = false;
    nextBtn.classList.add("active");
  } else {
    btn.classList.add("incorrect");
    nextBtn.disabled = true;
    nextBtn.classList.remove("active");
  }
}

//Next button taking you to the following page
nextBtn.addEventListener("click", () => {
  if (!nextBtn.classList.contains("active")) return; // Button will not be highlighted unless answer is right
  currentQuestion++;
  if (currentQuestion < data.length) {
    loadQuestion();
  } else {
    showEndScreen();
  }
});

//Screen that shows at the end of the game
function showEndScreen() {

  progressBar.style.width = "100%";

  gameArea.innerHTML = `<h2>You completed all sentences!⭐</h2>
                        <button id="retry-btn">RETRY</button>`;
  nextBtn.style.display = "none";

  document.getElementById("retry-btn").addEventListener("click", () => {
    currentQuestion = 0;
    nextBtn.style.display = "inline-block";
    nextBtn.disabled = true;
    nextBtn.classList.remove("active");
    shuffleQuestions(); // Questions and options will be reshuffled again
    progressBar.style.width = "0%"; // Progress bar will reset to 0 at the start of new game
    loadQuestion();
  });
}


// Progress bar to update as the user progresses
function updateProgress() {
  const percent = (currentQuestion / data.length) * 100;
  progressBar.style.width = `${percent}%`;
}

function goBack() {
  window.location.href = "../HOMEPAGE/";
}

// Questions are shuffled at the start of game
shuffleQuestions();

// This initializes the game
loadQuestion();
