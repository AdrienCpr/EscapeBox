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

const key1 = document.getElementById('key1');
const key2 = document.getElementById('key2');
const key3 = document.getElementById('key3');
const validateBtn = document.getElementById('validateBtn');

const correctCombination = ['V', '2', 'B', '△']; // Exemple de combinaison correcte
let foundKeys = [false, false, false]; // Tableaux des clés trouvées

function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning && !isPaused) return;

    if (!isRunning || isPaused) {
        const userMinutes = parseInt(timeInput.value, 10);
        if (!isNaN(userMinutes) && userMinutes > 0) {
            initialSeconds = userMinutes * 60;
            totalSeconds = isPaused ? totalSeconds : initialSeconds;
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

function resetTimer() {
    clearInterval(countdown);
    totalSeconds = initialSeconds;
    updateDisplay();
    isRunning = false;
    isPaused = false;
    pauseBtn.textContent = "Pause";
}

function runOut() {
    const audio = new Audio('assets/beep.mp3');
    audio.play();
}

// Validation de la combinaison
validateBtn.addEventListener('click', () => {
    const select1 = document.getElementById('select1').value;
    const select2 = document.getElementById('select2').value;
    const select3 = document.getElementById('select3').value;
    const select4 = document.getElementById('select4').value;

    const userCombination = [select1, select2, select3, select4];

    if (JSON.stringify(userCombination) === JSON.stringify(correctCombination)) {
        alert('Combinaison correcte !');
        foundKeys[0] = true; // Marque la première clé comme trouvée
        key1.style.backgroundColor = 'green'; // Change la couleur de la clé
    } else {
        alert('Mauvaise combinaison !');
    }
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
