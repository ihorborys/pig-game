const newGameButton = document.querySelector(".new-game");
const player1 = document.querySelector("#player1");
const dice = document.querySelector(".dice");
const rollDiceButton = document.querySelector(".roll-dice");
const holdButton = document.querySelector(".hold");

function startNewGame() {
    player1.style.backgroundColor = "#EAECEE";
    player1.style.opacity = 1;
    dice.style.display = "block";
    rollDiceButton.style.display = "flex";
    holdButton.style.display = "flex";
}

newGameButton.addEventListener("click", startNewGame);




