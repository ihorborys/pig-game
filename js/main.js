const newGameButton = document.querySelector(".new-game");
const players = document.querySelectorAll(".player");
const dice = document.querySelector(".dice");
const diceImg = dice.children[0];
const rollDiceButton = document.querySelector(".roll-dice");
const holdButton = document.querySelector(".hold");
let activePlayer;
let currentScore = 0;

function getRandomNumber(topValue) {
    return Math.floor(Math.random() * topValue) + 1;
}

function onStartNewGameBtnClick() {
    players[0].classList.add("active");
    activePlayer = players[0];
    dice.style.display = "block";
    rollDiceButton.style.display = "flex";
    holdButton.style.display = "flex";
}

function onRollDiceBtnClick() {
    const imgNumber = getRandomNumber(6);

    // const srcValue = "./assets/images/dice-" + imgNumber + ".png";
    const srcValue = `./assets/images/dice-${imgNumber}.png`;
    diceImg.setAttribute("src", srcValue);
    
    if (imgNumber === 1) {
        currentScore = 0;
        updateCurrentScore();
        toggleActivePlayer();
    } else {
        // currentScore = currentScore + imgNumber;
        currentScore += imgNumber;
        updateCurrentScore();
    }
}

function updateCurrentScore() {
    const currentScoreValue = activePlayer.querySelector(".score");
    currentScoreValue.innerHTML = currentScore;
}

function toggleActivePlayer() {
    players.forEach((player) => {
        if (player.classList.contains("active")) {
            player.classList.remove("active");
        } else {
            player.classList.add("active");
            activePlayer = player;
        }       
    });
}

newGameButton.addEventListener("click", onStartNewGameBtnClick);
rollDiceButton.addEventListener("click", onRollDiceBtnClick);
