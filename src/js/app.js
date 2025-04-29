import { Timer } from './modules/timer.js';
import { CombinationManager } from './modules/combination.js';
import { KeyManager } from './modules/keys.js';
import { PasswordPopup } from './modules/password-popup.js';
import { CONFIG } from '../config/config.js';

class EscapeBoxApp {
    constructor() {
        this.timer = new Timer(CONFIG.defaultTime);
        this.combinationManager = new CombinationManager();
        this.keyManager = new KeyManager();
        this.passwordPopup = new PasswordPopup();
        this.initializeApp();
    }

    initializeApp() {
        // Initialiser les composants
        this.combinationManager.initializeSelects();
        this.keyManager.initializeKeys();

        // Gérer les événements des boutons
        document.getElementById('startBtn').addEventListener('click', () => this.timer.start());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.timer.stop());
        document.getElementById('validateBtn').addEventListener('click', () => this.validateCombination());

        // Gérer les événements du menu
        document.getElementById('menuToggle').addEventListener('click', () => this.handleMenuToggle());
        document.getElementById('closeMenu').addEventListener('click', () => this.toggleMenu());
        document.getElementById('applyTimeBtn').addEventListener('click', () => this.applyTime());
    }

    handleMenuToggle() {
        // Toujours afficher le popup de mot de passe
        this.passwordPopup.showPopup();
    }

    resetGame() {
        this.timer.reset(CONFIG.defaultTime);
        this.combinationManager.resetCombination();
        this.keyManager.resetKeys();
    }

    validateCombination() {
        if (this.combinationManager.validateCombination()) {
            // Logique de validation réussie
            console.log('Combinaison correcte !');
        }
    }

    toggleMenu() {
        const menu = document.getElementById('dropdownMenu');
        menu.classList.toggle('hidden');
    }

    applyTime() {
        const timeInput = document.getElementById('timeInput');
        const newTime = parseInt(timeInput.value) || CONFIG.defaultTime;
        this.timer.reset(newTime);
        this.toggleMenu();
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    new EscapeBoxApp();
}); 