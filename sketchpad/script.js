//global variables
const sketchArea = document.querySelector(".sketch-area-container");
const eraserButton = document.querySelector(".eraser");
const gridSubmit = document.querySelector(".grid-submit");
const gridNumber = document.querySelector(".grid-number");
const clearButton = document.querySelector(".clear-button");
const colorPicker = document.querySelector(".color-select");
const gridInput = document.querySelector(".grid-number");
const undoButton = document.querySelector(".undo-button");
const redoButton = document.querySelector(".redo");
const gridHistory = [];

//event listeners
sketchArea.addEventListener("click", changeColor);
sketchArea.addEventListener("mouseover", changeColor);
sketchArea.addEventListener("mousedown", () => {isMouseDown = true;})
sketchArea.addEventListener("mouseup", () => {isMouseDown = false;})
gridSubmit.addEventListener("click", function() {changeGrid(); resetEraser();});
clearButton.addEventListener("click", clearSketch);
eraserButton.addEventListener("click", eraseSketch);
undoButton.addEventListener("click", undoChanges);
redoButton.addEventListener("click", redoChanges);
gridInput.addEventListener("keydown", e=> {if (e.key === "Enter") {changeGrid();}})


//initial variable values
gridNumber.value = 50;
let sketchPadSize = 50;
let isMouseDown = false;
let eraserClicked = false;
let currentGridIndex = -1;

//initialize default sketchpad
createSketchPad(sketchPadSize)

function createSketchPad(sketchPadSize) {
    sketchArea.style.gridTemplateColumns = `repeat(${sketchPadSize}, 1fr)`
    sketchArea.style.gridTemplateRows = `repeat(${sketchPadSize}, 1fr)`

    for(let i=0; i < sketchPadSize*sketchPadSize; i++) {
        const sketchGrid = document.createElement("div")
        sketchGrid.classList.add("grid-cell")
        sketchArea.appendChild(sketchGrid)
    }
}
function changeColor(event) {
    if ((isMouseDown || event.type === "click") && eraserClicked === false) {
        event.target.style.backgroundColor = `${colorPicker.value}`;
        storeGridHistory();

    } else if((isMouseDown || event.type === "click") && eraserClicked === true) {
        event.target.style.backgroundColor ="white"
    }
}

function storeGridHistory() {
    if(isMouseDown === false) {
    gridHistory.push(Array.from(sketchArea.children).map((grid)=>grid.style.backgroundColor));
    currentGridIndex++;
    console.log(currentGridIndex);
    }
}

function undoChanges() {
    if(currentGridIndex > 0)  {
        currentGridIndex--;
        console.log(currentGridIndex)
        const previousGridState = gridHistory[currentGridIndex];
        const gridCells = sketchArea.children

    for(let i=0; i<gridCells.length; i++) {
        gridCells[i].style.backgroundColor = previousGridState[i]
    }
    } else {
        clearSketch();
    }
}

function redoChanges() {
    console.log(gridHistory.length)
    if(currentGridIndex >= 0 && currentGridIndex<gridHistory.length-1) {
        currentGridIndex++;
        console.log(currentGridIndex)
        const previousGridState = gridHistory[currentGridIndex];

        if(previousGridState) {
            const gridCells = sketchArea.children

            for(let i=0; i<gridCells.length; i++) {
            gridCells[i].style.backgroundColor = previousGridState[i]
            }
    }
    }
}


function clearSketch() {
    const gridCell = document.querySelectorAll(".grid-cell")
        for(let i=0; i<gridCell.length; i++) {
            gridCell[i].style.backgroundColor = "white";
        }
    gridHistory.length = 0;
    currentGridIndex = -1;
    resetEraser()
}
function changeGrid() {
        const sketchGrid = document.querySelector(".sketch-area-container")
        sketchGrid.innerHTML = "";
        sketchPadSize = Math.abs(gridNumber.value)
        if (gridNumber.value <= 100) {
        gridNumber.value = sketchPadSize
        createSketchPad(sketchPadSize)
        updateGridLabel()
        resetEraser()
        } else {
            alert("Grid cannot be more than 100x100")
        }
}

function eraseSketch() {
        if(eraserClicked === false) {
        eraserClicked = true
        eraserButton.style.backgroundColor = "rgb(11, 136, 109)"
        eraserButton.style.color = "white"
        } else {
        eraserClicked = false
        eraserButton.style.backgroundColor = "white"
        eraserButton.style.color = "black"
        }
    }
function resetEraser() {
    if (eraserClicked === true) {
        eraserClicked = false;
        eraserButton.style.backgroundColor = "white"
        eraserButton.style.color = "black"
        console.log(eraserClicked)
    }
}

function updateGridLabel() {
    const label = document.querySelector(".grid-label")
    label.textContent = `${sketchPadSize}x${sketchPadSize}`
}