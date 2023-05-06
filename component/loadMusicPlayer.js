const scriptId = 'playMusic';
const existingScript = document.getElementById(scriptId);

if (!existingScript) {
    // 创建新的script元素
    const playMusic = document.createElement('script');
    playMusic.src = "/assets/js/playmusic.js";
    playMusic.id = scriptId;

    // 向sidebar元素中添加新元素
    fetch('/component/musicPlayer.html')
        .then(response => response.text())
        .then(data => {
            const musicDOM = document.createElement('div');
            musicDOM.innerHTML = data;
            musicDOM.appendChild(playMusic);
            document.getElementById('sidebar').appendChild(musicDOM);
            // document.getElementById('sidebar').appendChild(playMusic);
        });
} else {
    console.log(`Script with id ${scriptId} already exists.`);
}