const playButton = document.getElementsByClassName("play-button")[0]
const taylor = document.getElementById("taylor-cornelia")
console.log(taylor)

playButton.addEventListener("click", e=>{
    if(taylor.paused) {
        taylor.play();
        playButton.textContent = "Pause";
    } else {
        taylor.pause();
        playButton.textContent = "Play";
    }
})