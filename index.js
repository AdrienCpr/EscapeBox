let countdown;
let isRunning = false;
let isPaused = false;
let initialSeconds = 60 * 60;
let totalSeconds = initialSeconds;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const pauseBtn = document.getElementById('pauseBtn');
const timeInput = document.getElementById('timeInput');

function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;

    const userMinutes = parseInt(timeInput.value, 10);
    if (!isNaN(userMinutes) && userMinutes > 0) {
        initialSeconds = userMinutes * 60;
        totalSeconds = initialSeconds;
    }

    isRunning = true;
    isPaused = false;

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

    updateDisplay();
}

function pauseTimer() {
    if (isRunning && !isPaused) {
        clearInterval(countdown);
        isPaused = true;
        pauseBtn.textContent = "Reprendre";
    } else if (isRunning && isPaused) {
        startTimer();
        pauseBtn.textContent = "Pause";
    }
}

function runOut()
{
    var audio = new Audio('assets/beep.mp3');
    audio.play();
    timerDisplay.style.color = 'red';
}

function resetTimer() {

    clearInterval(countdown);
    totalSeconds = initialSeconds;
    updateDisplay();
    isRunning = false;
    timerDisplay.style.color = "#d4af37";
    isPaused = false;
    pauseBtn.textContent = "Pause";
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
