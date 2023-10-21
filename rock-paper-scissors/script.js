const buttonChoice = document.getElementsByClassName("button-choice")
const resultText = document.getElementsByClassName("result-text")[0]
const playerText = document.getElementsByClassName("player-text")[0]
const computerText = document.getElementsByClassName("computer-text")[0]
const playerScore = document.getElementById("player-score")
const computerScore = document.getElementById("computer-score")
let resultBackground = document.getElementById("result")

let player;
let computer;
let result;

for (let i=0; i<buttonChoice.length; i++) {
    buttonChoice[i].addEventListener("click", choiceClicked)
}

function delayFunction(callback, delayTime) {
    setTimeout(callback, delayTime);
}

function choiceClicked (event) {
    player = event.target.textContent
    console.log(player)
    computerChoice()
    let result = displayResult()
    resultText.innerText = `Result: ${result}`
    playerText.innerText = `Player: ${player}`
    updateScores(result)
    delayFunction(checkWinner, 2000)
}


function computerChoice () {
    computer = Math.floor(Math.random()*buttonChoice.length)
    
    switch(computer) {
        case 0: 
            computer = "Rock ✊";
            break;
        case 1:
            computer = "Paper ✋";
            break;
        case 2:
            computer = "Scissors ✌️"  
    }
    console.log(computer);
    computerText.innerText = `Computer: ${computer}`
}

function displayResult() {
    if (player===computer) {
        return "Draw!";
    }
    else if(computer == "Paper ✋") {
        return(player == "Rock ✊") ? "You Lose!" : "You Win!";
    }
    else if(computer == "Rock ✊") {
        return(player == "Scissors ✌️") ? "You Lose!" : "You Win!";
    }
    else if(computer == "Scissors ✌️") {
        return(player == "Paper ✋") ? "You Lose!" : "You Win!";
    }
    
}

function changeResultBackground(result) {

    if (result === "You Win!") {
        resultBackground.style.backgroundColor = "rgba(52, 180, 84, 0.687)";
    } else if (result === "You Lose!") {
        resultBackground.style.backgroundColor = "rgba(169, 17, 17, 0.687)";
    } else {
        resultBackground.style.backgroundColor = "rgba(85,85,85, 0.687)";
    }
}


function updateScores(result) {
    let playerScoreValue = parseInt(playerScore.textContent)
    let computerScoreValue = parseInt(computerScore.textContent)

    if (result==="You Win!") {
        playerScoreValue += 1
        playerScore.textContent = playerScoreValue
    } else if(result==="You Lose!"){
        computerScoreValue += 1
        computerScore.textContent = computerScoreValue
    }
}

function checkWinner() {
    if (playerScore.textContent === "5") {
        alert("Player Wins! Game Restart")
        restartGame()
    } else if(computerScore.textContent === "5") {
        alert("Computer Wins! Game Restart")
        restartGame()
    }
}

function restartGame() {
    playerScore.textContent = "0"
    computerScore.textContent = "0"
    resultText.innerText = `Result: `
    playerText.innerText = `Player: `
    computerText.innerText = `Computer: `
}

