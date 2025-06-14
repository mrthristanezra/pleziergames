const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updateStatus(message) {
  statusText.textContent = message;
}

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      isGameActive = false;
      updateStatus(`Player ${currentPlayer} Wins! 🎉`);
      return;
    }
  }

  if (!gameBoard.includes("")) {
    isGameActive = false;
    updateStatus("It's a Draw! 🤝");
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameBoard[index] !== "" || !isGameActive) {
    return;
  }

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  checkWinner();

  if (isGameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`Player ${currentPlayer}'s Turn`);
  }
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });

  updateStatus(`Player ${currentPlayer}'s Turn`);
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

updateStatus(`Player ${currentPlayer}'s Turn`);
