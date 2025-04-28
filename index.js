let totalSeconds = 10 * 1; // 60 minutes en secondes
let countdown;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return; // Empêcher plusieurs démarrages
    isRunning = true;

    countdown = setInterval(() => {
        updateDisplay();
        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(countdown);
            totalSeconds = 0;
            updateDisplay();
            runOut();
            isRunning = false;
        }
    }, 1000);
}

function runOut()
{
    var audio = new Audio('assets/beep.mp3');
        audio.play();
}

function resetTimer() {

    clearInterval(countdown);
    totalSeconds = 60 * 60;
    updateDisplay();
    isRunning = false;
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialiser l'affichage
updateDisplay();
