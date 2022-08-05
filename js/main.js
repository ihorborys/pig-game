import { initCube, rotateCube } from "./cube.js";
import { initSettings, toggleSettings } from "./settings.js";

const players = document.querySelectorAll(".player");
const playerNames = document.querySelectorAll(".player-name");
const cubeContainer = document.querySelector(".cube-container");
const newGameButton = document.querySelector(".new-game");
const rollDiceButton = document.querySelector(".roll-dice");
const holdButton = document.querySelector(".hold");
const settingsForm = document.querySelector(".settings-content form");
const radioButtons = document.querySelectorAll(".total-score-toggle input");
const textInputs = document.querySelectorAll(".name-input");
const errorMessages = document.querySelectorAll(".error-message");
const audio = document.querySelector("audio");


let winScore = 100;
let currentScore = 0;
let cubeSide = 1;
let activePlayer;

const specialSymbols = "!?@#$_%;,.";
const messages = {
    min: "Entered name is too short. Minimum 3 symbols required",
    max: "Entered name is too long. Maximum 30 symbols required",
    empty: "Empty names are not allowed",
    special: "Symbols like:  " + specialSymbols + "  are not allowed",
}

const cube = initCube();
const settings = initSettings();
initListeners();

function initListeners() {
    newGameButton.addEventListener("click", onStartNewGameBtnClicked);
    rollDiceButton.addEventListener("click", onRollDiceBtnClicked);
    holdButton.addEventListener("click", onHoldBtnClicked);
    settingsForm.addEventListener("submit", onSettingsFormSubmited);
    newGameButton.addEventListener("mouseenter", onMouseEntered);
    rollDiceButton.addEventListener("mouseenter", onMouseEntered);
    holdButton.addEventListener("mouseenter", onMouseEntered);
    audio.addEventListener("mouseenter", onMouseEntered);
    cube.addEventListener("transitionend", onTransitionEnd);
    radioButtons.forEach((button) => {
        button.addEventListener("change", onRadioButtonChanged);
    })
}

function onStartNewGameBtnClicked() {
    players[0].classList.add("active");
    players[1].classList.remove("active");
    activePlayer = players[0];
    togglePlayableUI(true);
    resetPlayers();
    resetTotalScore();
    resetCurrentScore();
    showHideSetings();
    playSound("../assets/sounds/new-game-sound.mp3");
}

function onRollDiceBtnClicked() {  
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

function onRadioButtonChanged(event) {
    const id = event.target.id;
    winScore = parseInt(id);
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

function onMouseEntered() {
    playSound("../assets/sounds/hover-button-sound.mp3");
}

// function onButtonSoundClick() {
//     let buttonSound = `./assets/sounds/roll-dice-sound.mp3`;
//     buttonSound.play();
// }

function onHoldBtnClicked() {
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

function showHideSetings() {
    toggleSettings(settings.settingsContainer, settings.settingsContent);
    playSound("../assets/sounds/settings-sound.mp3");
}

function onSettingsFormSubmited(e) {
    e.preventDefault();
    const formData = new FormData(settingsForm);
    const inputValues = formData.getAll("player-name"); // ["@##", "sdfvsdfvsdv"]
    let inputsValidated = [false, false];
    playerNames.forEach((name, i) => {
        const validated = validateInputs(inputValues[i], i);
        inputsValidated[i] = validated; // 1: false 2: true
        if (validated) {
            name.innerHTML = inputValues[i];
            textInputs[i].value = "";
        }
    });
    if (inputsValidated[0] && inputsValidated[1]) {
        showHideSetings();
    }
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

function validateInputs(inputText, inputIndex) {
    const specialSymbolsArray = specialSymbols.split("");
    const inputTextArray = inputText.split("");

    if (inputText === "") {
        errorMessages[inputIndex].innerHTML = messages.empty;  
        return false;
    }
    if (inputText.length < 3) {
        errorMessages[inputIndex].innerHTML = messages.min;  
        return false;
    }
    if (inputText.length > 30) {
        errorMessages[inputIndex].innerHTML = messages.max;  
        return false;
    }
    for (let i = 0; i < inputTextArray.length; i++) {
        for (let j = 0; j < specialSymbolsArray.length; j++) {
            if (inputTextArray[i] === specialSymbolsArray[j]) {
                errorMessages[inputIndex].innerHTML = messages.special;  
                return false;
            }
        }       
    }
    
    errorMessages[inputIndex].innerHTML = "";
    return true;
}