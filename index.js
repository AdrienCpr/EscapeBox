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

        isRunning = true;
        isPaused = false;

        countdown = setInterval(() => {
            updateDisplay();
            totalSeconds--; // Décrémente le temps restant

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
}

function pauseTimer() {
    if (isRunning && !isPaused) {
        clearInterval(countdown); // Met en pause le chronomètre
        isPaused = true;
        pauseBtn.textContent = "Reprendre"; // Change le texte du bouton pour "Reprendre"
    } else if (isRunning && isPaused) {
        startTimer();  // Redémarre le chronomètre à partir du temps restant
        pauseBtn.textContent = "Pause"; // Change le texte du bouton pour "Pause"
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
