function showSection(id) {
  document.querySelectorAll(".submenu").forEach(el => el.classList.add("hidden"));
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("welcome-text").classList.add("hidden");
  document.getElementById("category-title").classList.remove("hidden");
  document.getElementById(id).classList.remove("hidden");
}

function goBack() {
  const visible = [...document.querySelectorAll(".submenu")].find(el => !el.classList.contains("hidden"));
  if (!visible) return;

  if (visible.id === "wordmatch-section") {
    visible.classList.add("hidden");
    document.getElementById("game-section").classList.remove("hidden");
  } else {
    visible.classList.add("hidden");
    document.getElementById("main-menu").classList.remove("hidden");
    document.getElementById("welcome-text").classList.remove("hidden");
    document.getElementById("category-title").classList.add("hidden");
  }
}


function goToGame(path) {
  window.location.href = path;
}

function goToLearn(path) {
  window.location.href = path;
}


// Handling clicks under LEARN
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#learn-section .submenu-block").forEach(block => {
    block.addEventListener("click", () => {
      const label = block.textContent.trim();

      if (label === "FRUITS") {
        window.location.href = "../FRUITS/fruits_index.html";
      } else if (label === "COLORS") {
        window.location.href = "../COLORS/colors_index.html";
      } else if (label === "ANIMALS") {
        window.location.href = "../ANIMALS/animals_index.html";
      }
    });
  });
});

