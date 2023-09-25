const buttonChoice = document.getElementsByClassName("button-choice")
const resultText = document.getElementsByClassName("result-text")[0]
const playerText = document.getElementsByClassName("player-text")[0]
const computerText = document.getElementsByClassName("computer-text")[0]

let player;
let computer;





for (let i=0; i<buttonChoice.length; i++) {
    buttonChoice[i].addEventListener("click", choiceClicked)
}

function choiceClicked (event) {
    player = event.target.textContent
    console.log(player)
    computerChoice()
    displayResult()
    let result = displayResult()
    console.log(result)
    resultText.innerText = `Result: ${result}`
    playerText.innerText = `Player: ${player}`
    
}


function computerChoice () {
    computer = Math.floor(Math.random()*buttonChoice.length)
    // console.log(choice)

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
