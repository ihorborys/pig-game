const newGameButton = document.querySelector(".new-game");
const players = document.querySelectorAll(".player");
const dice = document.querySelector(".dice");
const diceImg = dice.children[0];
const rollDiceButton = document.querySelector(".roll-dice");
const holdButton = document.querySelector(".hold");
let currentScore = 0;
let activePlayer;

newGameButton.addEventListener("click", onStartNewGameBtnClick);
rollDiceButton.addEventListener("click", onRollDiceBtnClick);
holdButton.addEventListener("click", onHoldBtnClick);

function getRandomNumber(topValue) {
    return Math.floor(Math.random() * topValue) + 1;
}

function onStartNewGameBtnClick() {
    resetTotalScore();
    players[0].classList.add("active");
    players[1].classList.remove("active");
    activePlayer = players[0];
    dice.style.display = "block";
    rollDiceButton.style.display = "flex";
    holdButton.style.display = "flex";
}

function onRollDiceBtnClick() {
    const randomNumber = getRandomNumber(6);
    
    // const srcValue = "./assets/images/dice-" + imgNumber + ".png";
    const srcValue = `./assets/images/dice-${randomNumber}.png`;
    diceImg.setAttribute("src", srcValue);
    
    if (randomNumber === 1) {
        resetCurrentScore();
    } else {
        updateCurrentScore(randomNumber);
    }
}

function onHoldBtnClick() {
    updateTotalScore();
    resetCurrentScore();
}

function updateCurrentScore(randomNumber) {
    const currentScoreValue = activePlayer.querySelector(".score");
    // currentScore = currentScore + randomNumber;
    currentScore += randomNumber;
    currentScoreValue.innerHTML = currentScore;
}

function resetCurrentScore() {
    currentScore = 0;
    updateCurrentScore(0);
    toggleActivePlayer();
}

function updateTotalScore() {
    const totalScoreValue = activePlayer.querySelector(".totalscore");
    let totalScore = Number(totalScoreValue.innerHTML);
    totalScore += currentScore;
    totalScoreValue.innerHTML = totalScore;
}

function resetTotalScore() {
    players.forEach((player) => {
        const totalScoreValue = player.querySelector(".totalscore");
        totalScoreValue.innerHTML = 0;
    });
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

