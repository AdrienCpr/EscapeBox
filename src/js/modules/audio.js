const audio = document.getElementById('myAudio');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volUpBtn = document.getElementById('volUpBtn');
const volDownBtn = document.getElementById('volDownBtn');

playBtn.addEventListener('click', () => audio.play());
pauseBtn.addEventListener('click', () => audio.pause());
volUpBtn.addEventListener('click', () => audio.volume = Math.min(audio.volume + 0.1, 1));
volDownBtn.addEventListener('click', () => audio.volume = Math.max(audio.volume - 0.1, 0));