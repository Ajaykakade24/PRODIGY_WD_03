const board = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');
const statusDisplay = document.getElementById('status');
let boardState = ['', '', '', '', '', '', '', '', '']; // Tracks the state of the board
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
];

function handleSquareClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] !== '' || !gameActive) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        statusDisplay.textContent = `${currentPlayer} wins!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    statusDisplay.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return boardState.every(square => square !== '') ? 'tie' : false;
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `${currentPlayer}'s turn`;
    document.querySelectorAll('.square').forEach(square => square.textContent = '');
}

function initializeGame() {
    board.addEventListener('click', handleSquareClick);
    resetBtn.addEventListener('click', resetGame);
    statusDisplay.textContent = `${currentPlayer}'s turn`;
}

initializeGame();
