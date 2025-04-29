export class Timer {
    constructor(initialTime = 60) {
        this.time = initialTime * 60; // Convert to seconds
        this.isRunning = false;
        this.timerId = null;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                if (this.time > 0) {
                    this.time--;
                    this.updateDisplay();
                } else {
                    this.stop();
                }
            }, 1000);
        }
    }

    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timerId);
        }
    }

    reset(newTime = 60) {
        this.stop();
        this.time = newTime * 60;
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer').textContent = display;
    }
} 