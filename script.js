const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
let isXNext = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] !== '' || checkWinner()) {
        return;
    }

    boardState[index] = isXNext ? 'X' : 'O';
    cell.textContent = boardState[index];
    isXNext = !isXNext;

    if (checkWinner()) {
        setTimeout(() => {
            alert(`Player ${isXNext ? 'O' : 'X'} wins!`);
        }, 10);
    } else if (boardState.every(cell => cell !== '')) {
        setTimeout(() => {
            alert('Draw!');
        }, 10);
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === (isXNext ? 'O' : 'X');
        });
    });
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    isXNext = true;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);