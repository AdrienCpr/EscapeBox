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

    // Si le chronomètre a été réinitialisé ou a été mis en pause, ajuster le temps
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
        clearInterval(countdown);
        isPaused = true;
        timerDisplay.style.color = 'gray';
        pauseBtn.textContent = "Reprendre";
    } else if (isRunning && isPaused) {
        startTimer();
        timerDisplay.style.color = "#f5deb3";
        pauseBtn.textContent = "Pause";
    }
}

function runOut() // Audio lorsque le timer expire
{
    var audio = new Audio('assets/beep.mp3');
    audio.play();
    timerDisplay.style.color = 'red';
}

function rightGuess() // Si la clé est correcte
{
    var audio = new Audio('assets/correct.mp3');
    audio.play();
}

function wrongGuess() // Si la clé est incorrecte
{
    var audio = new Audio('assets/incorrect.mp3');
    audio.play();
}

function resetTimer() {
    clearInterval(countdown);
    totalSeconds = initialSeconds;
    updateDisplay();
    isRunning = false;
    timerDisplay.style.color = "#f5deb3";
    isPaused = false;
    pauseBtn.textContent = "Pause";
}

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
        rightGuess();
    } else {
        alert('Mauvaise combinaison !');
        wrongGuess();
    }
});

// Gestion de l'affichage du menu
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('dropdownMenu').classList.toggle('hidden');
});

// Mise à jour du timer via le bouton "Valider" du menu
document.getElementById('Btn15').addEventListener('click', () => {
    document.getElementById('timer').textContent = `${15}:00`;
});

// Mise à jour du timer via le bouton "Valider" du menu
document.getElementById('Btn60').addEventListener('click', () => {
    document.getElementById('timer').textContent = `${60}:00`;
});

const correctPassword = "escape";
let menuUnlocked = false;
let menuOpen = false;

const menuToggle = document.getElementById("menuToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

menuToggle.addEventListener("click", () => {
    if (!menuUnlocked) {
        const userPassword = prompt("Entrez le mot de passe pour accéder au menu :");
        if (userPassword === correctPassword) {
            menuUnlocked = true;
            dropdownMenu.classList.remove("hidden");
            menuOpen = true;
        } else if (userPassword !== null) {
            alert("Mot de passe incorrect.");
        }
    } else {
        // Si déjà déverrouillé, basculer l'affichage du menu
        menuOpen = !menuOpen;
        dropdownMenu.classList.toggle("hidden", !menuOpen);
        menuUnlocked = !menuUnlocked
    }
});


startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
