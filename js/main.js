import { initCube, rotateCube } from "./cube.js";

const newGameButton = document.querySelector(".new-game");
const players = document.querySelectorAll(".player");
const cubeContainer = document.querySelector(".cube-container");
const rollDiceButton = document.querySelector(".roll-dice");
const holdButton = document.querySelector(".hold");
const winScore = 10;
let currentScore = 0;
let cubeSide = 1;
let activePlayer;

const cube = initCube();

newGameButton.addEventListener("click", onStartNewGameBtnClick);
rollDiceButton.addEventListener("click", onRollDiceBtnClick);
holdButton.addEventListener("click", onHoldBtnClick);
cube.addEventListener("transitionend", onTransitionEnd);

// const bgSound = new Audio("../assets/sounds/background-sound.mp3");
// bgSound.autoplay = true;
// bgSound.addEventListener("load", function() {
//     bgSound.play()
// }, true)

// playSound("../assets/sounds/background-sound.mp3", true);

function onStartNewGameBtnClick() {
    players[0].classList.add("active");
    players[1].classList.remove("active");
    activePlayer = players[0];
    togglePlayableUI(true);
    resetPlayers();
    resetTotalScore();
    resetCurrentScore();
    playSound("../assets/sounds/new-game-sound.mp3");
}

function onRollDiceBtnClick() {  
    cubeSide = rotateCube(cube);
        
    playSound("../assets/sounds/roll-dice-sound.mp3");
}

function onTransitionEnd() {
    if (cubeSide === 1) {
        resetCurrentScore();
        toggleActivePlayer();
    } else {
        updateCurrentScore(cubeSide);
    }
}

function playSound(url, loop = false) {
    const buttonAudio = new Audio(url);
    buttonAudio.play();

    if (loop) {
        buttonAudio.autoplay = true;
        buttonAudio.addEventListener("ended", function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
}

// function onButtonSoundClick() {
//     let buttonSound = `./assets/sounds/roll-dice-sound.mp3`;
//     buttonSound.play();
// }

function onHoldBtnClick() {
    const totalScore = updateTotalScore();
    if (totalScore >= winScore) {      
        togglePlayableUI(false);        
        setWinner();
    } else {
        toggleActivePlayer();
    }
    resetCurrentScore();
    playSound("../assets/sounds/hold-sound.mp3");
}

function updateCurrentScore(randomNumber) {
    const currentScoreValue = activePlayer.querySelector(".score");
    // currentScore = currentScore + randomNumber;
    currentScore += randomNumber;
    currentScoreValue.innerHTML = currentScore;
}

function resetCurrentScore() {
    currentScore = 0;
    players.forEach((player) => {
        const currentScoreValue = player.querySelector(".score");
        currentScoreValue.innerHTML = 0;
    });
}

function updateTotalScore() {
    const totalScoreValue = activePlayer.querySelector(".totalscore");
    let totalScore = Number(totalScoreValue.innerHTML);
    totalScore += currentScore;
    totalScoreValue.innerHTML = totalScore;
    return totalScore;
}

function resetTotalScore() {
    players.forEach((player) => {
        const totalScoreValue = player.querySelector(".totalscore");
        totalScoreValue.innerHTML = 0;
    });
}

function togglePlayableUI(showUI) {
    if (showUI) {
        cubeContainer.style.display = "block";
        rollDiceButton.style.display = "flex";
        holdButton.style.display = "flex";
    } else {
        cubeContainer.style.display = "none";
        rollDiceButton.style.display = "none";
        holdButton.style.display = "none";
    };
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

function setWinner() {
    activePlayer.classList.add("winner");

    const playerName = activePlayer.querySelector(".player-name");
    playerName.innerHTML = "WINNER !";

    players.forEach((player) => {
        const playerScoreBlock = player.querySelector(".playerscore");
        const currentScoreBlock = player.querySelector(".currentscore");

        currentScoreBlock.style.display = "none";
        playerScoreBlock.style.transform = "translateY(60px)"; 
    });
    playSound("../assets/sounds/winner-sound.mp3");
}

function resetPlayers() {
    players.forEach((player, i) => {
        if (player.classList.contains("winner")) {
            player.classList.remove("winner");
        };
        
        const playerName = player.querySelector(".player-name");
        const playerScoreBlock = player.querySelector(".playerscore");
        const currentScoreBlock = player.querySelector(".currentscore");

        playerName.innerHTML = `Player ${i + 1}`;
        currentScoreBlock.style.display = "flex";
        playerScoreBlock.style.transform = "translateY(0px)"; 
    });
}

