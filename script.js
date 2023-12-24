let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function cellClick(index) {
    if (!gameActive) {
        alert("Please start a new game!");
        return;
    }

    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        document.getElementById('board').children[index].innerText = currentPlayer;
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            displayWinner(board[a]);
            return;
        }
    }

    if (board.every(cell => cell !== '')) {
        displayWinner('Draw');
    }
}

function displayWinner(winner) {
    gameActive = false;
    const popup = document.getElementById('winner-popup');
    const message = document.getElementById('winner-message');

    if (winner === 'Draw') {
        message.innerText = "It's a draw!";
    } else {
        message.innerText = `Player ${winner} wins!`;
    }

    popup.style.display = 'block';
}

function closePopup() {
    document.getElementById('winner-popup').style.display = 'none';
}
//Audio Function

function playAudio() {
    var audio = document.getElementById("myAudio");

    // Check if the audio is paused or not playing
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}


// Function to restart the game
function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Clear the board
    const cells = document.getElementById('board').children;
    for (const cell of cells) {
        cell.innerText = '';
    }

    // Hide the start button and show the restart button
    document.getElementById('start-button').classList.add('hide');
    document.getElementById('restart-button').classList.remove('hide');

    // Hide the popup
    document.getElementById('winner-popup').style.display = 'none';
}

// Function to start a new game (works the same as restartGame)
function newGame() {
    restartGame();
}

// Function to start the game
function startGame() {
    newGame();

    // Hide the start button and show the restart button
    document.getElementById('start-button').classList.add('hide');
    document.getElementById('restart-button').classList.remove('hide');
}

// Dynamically create the Tic-Tac-Toe board
function createBoard() {
    const boardElement = document.getElementById('board');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('onclick', `cellClick(${i})`);
        boardElement.appendChild(cell);
    }
}

// Initialize the board
createBoard();


