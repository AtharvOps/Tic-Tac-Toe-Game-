const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const resultText = document.getElementById('result');

const WIN_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

let oTurn=false;

function startGame() {
  oTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o','highlight');
    cell.innerText = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.style.display = 'none';
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? 'o' : 'x';
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    oTurn = !oTurn;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerText = currentClass.toUpperCase();
}

function checkWin(currentClass) {
  return WIN_COMBINATIONS.some(comb => {
    return comb.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell =>{
    return cell.classList.contains('x') || cell.classList.contains('o')
  });
}

function endGame(draw) {
  if (draw) {
    resultText.innerText = "It's a Draw!";
  } else {
    resultText.innerText = `💐 Congratulations,\n 🏆 Winner is ${oTurn ? 'O' : 'X'}  👑
`;
  }
  message.style.display = 'block';

}