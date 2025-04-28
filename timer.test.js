/**
 * @jest-environment jsdom
 */

const { startTimer, stopTimer, resetTimer, updateDisplay } = require('./index.js');

// Simuler un timer DOM
document.body.innerHTML = `
  <h1 id="timer">00:00:00</h1>
`;

jest.useFakeTimers();

describe('Timer', () => {
    beforeEach(() => {
        resetTimer();
        jest.clearAllTimers();
        jest.spyOn(global, 'setInterval');
        jest.spyOn(global, 'clearInterval');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Le timer démarre correctement', () => {
        startTimer();
        expect(setInterval).toHaveBeenCalledTimes(1);
    });

    test('Le timer s\'arrête correctement', () => {
        startTimer();
        stopTimer();
        expect(clearInterval).toHaveBeenCalledTimes(1);
    });

    test('Le timer se réinitialise correctement', () => {
        startTimer();
        resetTimer();
        const display = document.getElementById('timer').textContent;
        expect(display).toBe('00:00:00');
    });

    test('Le timer affiche correctement après quelques secondes', () => {
        startTimer();
        jest.advanceTimersByTime(3000); // 3 secondes
        const display = document.getElementById('timer').textContent;
        expect(display).toBe('00:00:03');
    });
});
