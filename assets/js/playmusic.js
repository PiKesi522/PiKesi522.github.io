function openWindow() {
    var window = document.getElementById("myWindow");
    window.style.display = "block";
    setTimeout(function () {
        window.style.transform = "translateX(0%)";
    }, 0);
}

function closeWindow() {
    var window = document.getElementById("myWindow");
    window.style.transform = "translateX(-100%)";
    setTimeout(function () {
        window.style.display = "none";
    }, 500);
}

var audio = document.getElementById("myAudio");

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}