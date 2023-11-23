const playMusic = document.getElementById("musicButton");
const audio = document.getElementById("myAudio");
const slash = document.querySelector("#musicButton .slash");

audio.volume = 0.5;

playMusic.addEventListener("click", function () {
  if (audio.paused) {
    playAudio();
  }
  else {
    pauseAudio();
  }
});

// 从localStorage中获取上一次播放的位置

const storedPosition = sessionStorage.getItem('musicPosition');
if (storedPosition) {
  audio.currentTime = parseInt(storedPosition);
}

// 检查localStorage中是否保存了播放状态
if (sessionStorage.getItem('musicPlaying') === 'true') {
  playAudio();
}
else {
  pauseAudio();
}

function playAudio() {
  audio.play();
  playMusic.classList.remove('paused');
  slash.style.visibility = "hidden";

  // 将播放状态保存到localStorage
  sessionStorage.setItem('musicPlaying', 'true');
}

function pauseAudio() {
  audio.pause();
  playMusic.classList.add('paused');
  slash.style.visibility = "visible";

  // 将播放状态从localStorage中移除
  sessionStorage.removeItem('musicPlaying');
}

// 在页面卸载时保存播放位置到localStorage
window.addEventListener('beforeunload', function() {
  sessionStorage.setItem('musicPosition', audio.currentTime);
});
