const x_class = "x";
const o_class = "o";
const win_combo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const board = document.getElementById("board");
const cellElements = document.querySelectorAll('[data-cell]');
const winMessage = document.getElementById("winMessage");
const restartButton = document.getElementById("restart-button");
const winMessagetextElement = document.querySelector('[data-win-message]');
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame)

function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(x_class)
    cell.classList.remove(o_class)
    cell.removeEventListener("click", handleClick)
    cell.addEventListener("click", handleClick, {once: true})
  })
  setBoardHoverClass();
  winMessage.classList.remove("show")
}

function handleClick(e) {
  const cell = e.target
  const currentclass = circleTurn ? o_class : x_class
  placeMark(cell, currentclass)
  if(checkWin(currentclass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if(draw) {
    winMessagetextElement.innerText = "Draw"
  }else {
    winMessagetextElement.innerText = `${circleTurn ? "O's" : "X's"} wins`
  }
  winMessage.classList.add("show")
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(x_class) ||
    cell.classList.contains(o_class)
  })
}

function placeMark(cell, currentclass) {
  cell.classList.add(currentclass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(x_class)
  board.classList.remove(o_class)
  if (circleTurn) {
    board.classList.add(o_class)
  } else {
    board.classList.add(x_class)
  }
}

function checkWin(currentclass) {
  return win_combo.some(combination => {
    return combination.every(index => {
       return cellElements[index].classList.contains(currentclass)
    })
  })
}