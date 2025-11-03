// --- VARIABLES ---
let randomNumber;
let attemptsLeft;
let levelIndex = 0; // 0 = Easy, 1 = Medium, 2 = Hard
const levels = [
  { name: "Easy", attempts: 15 },
  { name: "Medium", attempts: 10 },
  { name: "Hard", attempts: 5 }
];
let guessedNumbers = new Set();

const guessField = document.getElementById("guessField");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const levelDisplay = document.getElementById("level");
const restartBtn = document.getElementById("restart");

// --- FUNCTIONS ---
function startLevel() {
  const currentLevel = levels[levelIndex];
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = currentLevel.attempts;
  guessedNumbers.clear();
  levelDisplay.textContent = `Level: ${currentLevel.name}`;
  message.textContent = "";
  attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;
  guessField.disabled = false;
  restartBtn.style.display = "none";
  guessField.value = "";
}

function endGame(text, color) {
  message.textContent = text;
  message.style.color = color;
  guessField.disabled = true;
  restartBtn.style.display = "inline-block";
}

document.getElementById("submitguess").onclick = function () {
  const userGuess = parseInt(guessField.value);
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    message.textContent = "⚠️ Please enter a valid number between 1 and 100!";
    message.style.color = "red";
    return;
  }

  // Check if the number was already guessed
  if (guessedNumbers.has(userGuess)) {
    message.textContent = "🔁 You already guessed that number! Try something else.";
    message.style.color = "#ff9800";
    return;
  }

  guessedNumbers.add(userGuess);
  attemptsLeft--;
  attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;

  if (userGuess === randomNumber) {
    if (levelIndex < levels.length - 1) {
      message.textContent = `🎉 You cleared ${levels[levelIndex].name} Level! Moving to next...`;
      message.style.color = "green";
      levelIndex++;
      setTimeout(startLevel, 2000);
    } else {
      endGame("🏆 Congratulations! You completed all levels!", "green");
    }
  } else if (attemptsLeft === 0) {
    endGame(`💀 Game Over! The number was ${randomNumber}.`, "red");
  } else if (userGuess < randomNumber) {
    message.textContent = "📉 Number is higher";
    message.style.color = "#ff9800";
  } else {
    message.textContent = "📈 Number is lower";
    message.style.color = "#ff9800";
  }
};

restartBtn.onclick = function () {
  levelIndex = 0;
  startLevel();
};

// Start game initially
startLevel();
