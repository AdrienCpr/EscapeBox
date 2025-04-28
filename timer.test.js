/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Charger le HTML avant de tester
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let script;

describe('Timer Test', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        script = require('./index.js'); // Charger ton script
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.resetModules();
    });

    test('Affiche 60:00 au démarrage', () => {
        const timer = document.getElementById('timer');
        expect(timer.textContent).toBe('60:00');
    });

    test('Démarre le timer et décrémente les secondes', () => {
        const startBtn = document.getElementById('startBtn');
        startBtn.click();

        jest.advanceTimersByTime(1000); // 1 seconde passe

        const timer = document.getElementById('timer');
        expect(timer.textContent).toBe('59:59');
    });

    test('Reset ramène à 60:00', () => {
        const startBtn = document.getElementById('startBtn');
        const resetBtn = document.getElementById('resetBtn');

        startBtn.click();
        jest.advanceTimersByTime(5000); // 5 secondes passent

        resetBtn.click();

        const timer = document.getElementById('timer');
        expect(timer.textContent).toBe('60:00');
    });

    test('Timer reset automatiquement à 60:00 après expiration', () => {
        const startBtn = document.getElementById('startBtn');
        startBtn.click();

        // Simuler l'expiration complète (3600 secondes)
        jest.advanceTimersByTime(3600 * 1000 + 1000); // 1h + 1s

        const timer = document.getElementById('timer');
        expect(timer.textContent).toBe('60:00');
    });
});
