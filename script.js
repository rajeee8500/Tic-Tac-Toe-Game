const ContainerEl = document.querySelector(".container");
const modal = document.querySelector(".modal");
const message = modal.querySelector(".message");
let restart = document.getElementById("restartbtn");
let boxes = document.querySelectorAll(".box");

const O_TXT = "O";
const X_TXT = "X";

let currentPlayer = O_TXT;
let spaces = Array(9).fill(null);

const winingCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

function playerHasWon() {
    for (const condition of winingCombination) {
        let [a, b, c] = condition;
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}

function isDraw() {
    return spaces.every(space => space !== null);
}

function boxClicked(e) {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon()) {
            message.innerHTML = `<h2>Congratulations Player ${currentPlayer}!</h2><p>You've Won the Game!</p>`;
            modal.style.display = 'block';
            return;
        } else if (isDraw()) {
            message.innerHTML = `<h2>It's a Draw!</h2><p>No one won this round.</p>`;
            modal.style.display = 'block';
            return;
        }

        currentPlayer = currentPlayer === X_TXT ? O_TXT : X_TXT;
    }
}

function restartGame() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = "";
    });
    currentPlayer = O_TXT;
    modal.style.display = 'none';
}

restart.addEventListener("click", restartGame);

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked));
};

startGame();
