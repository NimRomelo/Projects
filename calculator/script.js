const num1 = document.querySelector(".num1");
const num2 = document.querySelector(".num2");
const num3 = document.querySelector(".num3");
const num4 = document.querySelector(".num4");
const num5 = document.querySelector(".num5");
const num6 = document.querySelector(".num6");
const num7 = document.querySelector(".num7");
const num8 = document.querySelector(".num8");
const num9 = document.querySelector(".num9");
const zero = document.querySelector(".zero");
const multiply = document.querySelector(".multiply");
const plus = document.querySelector(".plus");
const divide = document.querySelector(".divide");
const minus = document.querySelector(".minus");
const equals = document.querySelector(".equals");
const dot = document.querySelector(".dot");
const firstLine = document.querySelector(".entry-value-1");
const operator = document.querySelector(".operator");
const secondLine = document.querySelector(".entry-value-2");
const resultLine = document.querySelector(".result");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const numKeyArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
const operatorKeyArray = ["*","/","+","-"]
const firstOperandArray = [];
const secondOperandArray = [];
const currentResult = [];
const buttonArray = [".num1",".num2",".num3",".num4",".num5",".num6",".num7",".num8",
".num9",".dot",];
const operatorArray = [".multiply",".divide",".plus",".minus"]

let operatorClicked = false

function globalEventListener(type, selector, callback) {
    document.addEventListener(type, e=>{
        if(e.target.matches(selector)) {
            callback(e)
        }
    })
}

globalEventListener("click", buttonArray, e=>{
    let key = e.target.textContent
    console.log(key)
    displayValues(key);
})

document.addEventListener("keydown", e=>{
    let key = e.key
    console.log(key)

    if (numKeyArray.includes(key)) {
        displayValues(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        deleteValues();
    } else if (operatorKeyArray.includes(key)) {
        displayOperator(key);
    } else if (key === "Backspace") {
        deleteValues();
    } 
    else if (key === "Delete") {
        clearEverything();
    }
})

globalEventListener("click", operatorArray, e=>{
    let key = e.target.textContent
    displayOperator(key);
    console.log(key)

})
globalEventListener("click", ".clear", clearEverything);

globalEventListener("click", ".delete", deleteValues);

globalEventListener("click", ".equals", e=>{
        calculateResult();
})


//FUNCTIONS


function displayValues(key) {

    if(operatorClicked === false && secondOperandArray.length === 0) {
        firstOperandArray.push(key)
        firstLine.textContent = firstOperandArray.join("");

    } else if (operatorClicked===true) {
        secondOperandArray.push(key)
        secondLine.textContent = secondOperandArray.join("");

        console.log("secondLine Updated")
    }
    console.log("displayValues")
}

function displayOperator(key) {

    if (operatorClicked === false && firstLine.textContent !== "") {
        operator.textContent = key
        operatorClicked = true;
    }

    else if (operatorClicked === true && firstLine.textContent !== "") {
        calculateResult();
        continueCalc();
        operator.textContent = key
    }

    console.log("displayOperator")
}

function calculateResult() {
    const topValue = parseFloat(firstOperandArray.join(""));
    const bottomValue = parseFloat(secondOperandArray.join(""));
    const operatorValue = operator.textContent
    let result = 0

    if (secondLine.textContent !== "" && operator.textContent !== "") {

        if (operatorValue==="+") {
            result = topValue + bottomValue
        }

        else if (operatorValue==="-") {
            result = topValue - bottomValue
        }

        else if (operatorValue==="x" || operatorValue==="*") {
            result = topValue*bottomValue
        }

        else if (operatorValue==="/" || operatorValue==="÷") {
            result = topValue/bottomValue
        }

        resultLine.textContent = parseFloat(result.toFixed(4));

        let resultArray = Array.from(String(result))

        currentResult.splice(0, currentResult.length, ...resultArray)

        console.log(currentResult)
        console.log("calculateResult")  

    } 
}

function continueCalc() {
    clearDisplay();
    firstOperandArray.splice(0, firstOperandArray.length, ...currentResult)
    secondOperandArray.length = 0
    firstLine.textContent = currentResult.join("")
    resultLine.textContent = currentResult.join("");
    operatorClicked = true;

    console.log("continueCalc", currentResult, firstOperandArray)
}

function clearEverything() {
    clearDisplay();
    clearData();
    console.log("clearEverything")
}

function clearDisplay() {
    firstLine.textContent = "";
    secondLine.textContent = "";
    operator.textContent = "";
    resultLine.textContent = "";
    console.log("clearDisplay")
}

function clearData() {
    firstOperandArray.length = 0
    secondOperandArray.length = 0
    currentResult.length = 0
    operatorClicked = false
    console.log("clearData", firstOperandArray, secondOperandArray, currentResult)
}


function deleteValues() {

    let secondArray = secondOperandArray.length;
    let firstArray = firstOperandArray.length;

    if (secondArray > 0) {
        secondOperandArray.splice(secondArray-1,1)
        secondLine.textContent = secondOperandArray.join("");
    }

    else if (secondArray === 0 && operatorClicked === true) {
        operator.textContent = "";
        operatorClicked = false;
        console.log(operatorClicked)
    }

    else if (operator.textContent === "") {
        console.log(firstArray)
        firstOperandArray.splice(firstArray-1,1)
        firstLine.textContent = firstOperandArray.join("");
        if (firstArray === 1) {
            clearEverything();

        }
    }

    console.log("deleteValues")
}