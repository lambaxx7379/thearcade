const status = $('.status')

let gameActive = true
let currentPlayer = "X"
let gameState = ["", "", "", "", "", "", "", "", ""]

const winMess = function() {return `Player ${currentPlayer} has won!`}
const drawMess = function() {return `Game ended in a draw!`}
const playerTurn = function() {return `It's ${currentPlayer}'s turn`}

status.html(playerTurn());

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playedCell(cellClicked, cellClickedI) {
    gameState[cellClickedI] = currentPlayer;
    cellClicked.innerHTML = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.html(playerTurn());
}

function resultCheck() {
    let win = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            win = true;
            break
        }
    }

    if (win) {
        status.html(winMess());
        gameActive = false;
        return;
    }

    let draw = !gameState.includes("");
    if (draw) {
        status.html(drawMess());
        gameActive = false;
        return;
    }

    changePlayer();
}

function selectCell(event) {
    const selectedCell = event.target;
    const selectedI = parseInt(selectedCell.getAttribute('data-cell-index'));

    if (gameState[selectedI] !== "" || !gameActive) {
        return;
    }

    playedCell(selectedCell, selectedI);
    resultCheck();
}

function restart() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    status.html(playerTurn());
    $('.cell').html("");
}

$('.cell').click(selectCell)
// document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', selectCell));
// document.querySelector('.restart').addEventListener('click', restart);
$('.restart').click(restart)