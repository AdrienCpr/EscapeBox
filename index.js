let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let running = false;

function updateDisplay() {
    const display = document.getElementById('timer');
    let hrs = hours < 10 ? "0" + hours : hours;
    let mins = minutes < 10 ? "0" + minutes : minutes;
    let secs = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = `${hrs}:${mins}:${secs}`;
}

function startTimer() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
            updateDisplay();
        }, 1000);
    }
}

function stopTimer() {
    running = false;
    clearInterval(timer);
}

function resetTimer() {
    running = false;
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
}

// Ajoute cette partie tout à la fin :
if (typeof module !== 'undefined') {
    module.exports = { startTimer, stopTimer, resetTimer, updateDisplay };
}
