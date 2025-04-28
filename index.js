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
    if (isRunning && !isPaused) return; // Empêche de démarrer un deuxième compte à rebours si un est déjà en cours

    // Si le chronomètre a été réinitialisé ou a été mis en pause, ajuster le temps
    if (!isRunning || isPaused) {
        const userMinutes = parseInt(timeInput.value, 10);
        if (!isNaN(userMinutes) && userMinutes > 0) {
            initialSeconds = userMinutes * 60;
            totalSeconds = isPaused ? totalSeconds : initialSeconds; // Si en pause, on garde le temps restant
        }

    timerDisplay.style.color = "#f5deb3";
    isRunning = true;
    isPaused = false;

        countdown = setInterval(() => {
            updateDisplay();
            totalSeconds--; // Décrémente le temps restant

        if (totalSeconds < 0) {
            clearInterval(countdown);
            totalSeconds = 0;
            timerDisplay.style.color = 'red';
            updateDisplay();
            runOut();
            isRunning = false;
        }
    }, 1000);

        updateDisplay();
    }
}

function pauseTimer() {
    if (isRunning && !isPaused) {
        clearInterval(countdown); // Met en pause le chronomètre
        isPaused = true;
        timerDisplay.style.color = 'gray';
        pauseBtn.textContent = "Reprendre";
    } else if (isRunning && isPaused) {
        startTimer();
        timerDisplay.style.color = "#f5deb3";
        pauseBtn.textContent = "Pause";
    }
}

function runOut() // Audio quand la partie est perdue
{
    var audio = new Audio('assets/beep.mp3');
    audio.play();
}

function resetTimer() {
    clearInterval(countdown);
    totalSeconds = initialSeconds;
    updateDisplay();
    isRunning = false;
    timerDisplay.style.color = "#f5deb3";
    isPaused = false;
    pauseBtn.textContent = "Pause"; // Réinitialise le texte du bouton
}

function runOut() {
    const audio = new Audio('assets/beep.mp3');
    audio.play();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
