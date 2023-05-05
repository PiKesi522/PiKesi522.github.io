// function openWindow() {
//     var window = document.getElementById("myWindow");
//     window.style.display = "block";
//     setTimeout(function () {
//         window.style.transform = "translateX(0%)";
//     }, 0);
// }

// function closeWindow() {
//     var window = document.getElementById("myWindow");
//     window.style.transform = "translateX(-100%)";
//     setTimeout(function () {
//         window.style.display = "none";
//     }, 500);
// }


const playMusic = document.getElementById("musicButton");
const audio = document.getElementById("myAudio");
const slash = document.querySelector("#musicButton .slash");

audio.volume = 0.3;
// slash.style.visibility = "hidden";

playMusic.addEventListener("click", function(){
    if(audio.paused){
        playAudio();
    }
    else{
        pauseAudio();
    }
})

playAudio();

function playAudio() {
  audio.play();
  playMusic.classList.remove('paused');
  slash.style.visibility = "hidden";
}

function pauseAudio() {
  audio.pause();
  playMusic.classList.add('paused');
  slash.style.visibility = "visible";
}