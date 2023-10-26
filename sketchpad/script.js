const sketchArea = document.querySelector(".sketch-area-container")
const sketchPadSize = 10
let isMouseDown = false
let eraserCliked = false

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
    if ((isMouseDown || event.type === "click") && eraserCliked === false) {
    event.target.style.backgroundColor = "black"
    } else if((isMouseDown || event.type === "click") && eraserCliked === true) {
    event.target.style.backgroundColor ="white"
    }
}

function clearSketch() {
    const clearButton = document.querySelector(".clear-button");
    const gridCell = document.querySelectorAll(".grid-cell")
    clearButton.addEventListener("click", e=> {
        for(let i=0; i<gridCell.length; i++) {
            gridCell[i].style.backgroundColor = "white";
        }
    })
}

function eraseSketch() {
    const eraserButton = document.querySelector(".eraser");
    eraserButton.addEventListener("click", e=>{
        if(eraserCliked === false) {
        eraserCliked = true
        eraserButton.style.backgroundColor = "grey"
        } else {
        eraserCliked = false
        eraserButton.style.backgroundColor = "white"
        }
    })

}
createSketchPad(sketchPadSize);
    sketchArea.addEventListener("click", changeColor);
    sketchArea.addEventListener("mouseover", changeColor);
    sketchArea.addEventListener("mousedown", event => {
        isMouseDown = true;
    })
    sketchArea.addEventListener("mouseup", event => {
        isMouseDown = false;
})

clearSketch()
eraseSketch()