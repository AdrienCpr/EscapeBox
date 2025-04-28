let countdown;
let isRunning = false;
let initialSeconds = 60 * 60;
let totalSeconds = initialSeconds;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
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

    countdown = setInterval(() => {
        updateDisplay();
        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(countdown);
            isRunning = false;
            alert("Temps écoulé !");
        }
    }, 1000);

    updateDisplay();
}

function resetTimer() {
    clearInterval(countdown);
    totalSeconds = initialSeconds;
    updateDisplay();
    isRunning = false;
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
