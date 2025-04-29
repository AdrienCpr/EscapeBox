import { Timer } from './modules/timer.js';
import { CombinationManager } from './modules/combination.js';
import { KeyManager } from './modules/keys.js';
import { PasswordPopup } from './modules/password-popup.js';
import { Menu } from './modules/menu.js';
import { CONFIG } from '../config/config.js';

class EscapeBoxApp {
    constructor() {
        this.timer = new Timer(CONFIG.defaultTime);
        this.combinationManager = new CombinationManager();
        this.keyManager = new KeyManager();
        this.passwordPopup = new PasswordPopup();
        this.menu = new Menu();
        this.initializeApp();
    }

    async initializeApp() {
        try {
            // Attendre que le menu soit chargé
            const menuLoaded = await this.menu.loadMenu();
            if (!menuLoaded) {
                console.error('Le menu n\'a pas pu être chargé');
                return;
            }

            // Initialiser les composants
            this.combinationManager.initializeSelects();
            this.keyManager.initializeKeys();

<<<<<<< Updated upstream
            // Gérer les événements des boutons
            document.getElementById('startBtn').addEventListener('click', () => this.timer.start());
            document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
            document.getElementById('pauseBtn').addEventListener('click', () => this.timer.stop());
            document.getElementById('validateBtn').addEventListener('click', () => this.validateCombination());

            // Gérer les événements du menu
            const menuToggle = document.getElementById('menuToggle');
            const closeMenu = document.getElementById('closeMenu');
            const applyTimeBtn = document.getElementById('applyTimeBtn');

            if (menuToggle) {
                menuToggle.addEventListener('click', () => this.handleMenuToggle());
            }
            if (closeMenu) {
                closeMenu.addEventListener('click', () => this.toggleMenu());
            }
            if (applyTimeBtn) {
                applyTimeBtn.addEventListener('click', () => this.applyTime());
            }
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de l\'application:', error);
        }
=======
        // Gérer les événements du menu
        document.getElementById('menuToggle').addEventListener('click', () => this.handleMenuToggle());
        document.getElementById('closeMenu').addEventListener('click', () => this.toggleMenu());
        document.getElementById('applyTimeBtn').addEventListener('click', () => this.applyTime());

        // 🔥 Gérer les événements des boutons Démo / 60 min
        document.getElementById('Btn15').addEventListener('click', () => this.setDemoMode());
        document.getElementById('Btn60').addEventListener('click', () => this.setStandardMode());
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
        if (menu) {
            menu.classList.toggle('hidden');
        }
    }

    applyTime() {
        const timeInput = document.getElementById('timeInput');
        const newTime = parseInt(timeInput.value) || CONFIG.defaultTime;
        this.timer.reset(newTime);
        this.toggleMenu();
    }

    setDemoMode() {
        this.timer.reset(15); // 15 minutes
        this.showAdminCombinations(1); // 1 clé
        this.keyManager.setActiveKeys(1); // 1 clé affichée
    }

    setStandardMode() {
        this.timer.reset(60); // 60 minutes
        this.showAdminCombinations(3); // 3 clés
        this.keyManager.setActiveKeys(3); // 3 clés affichées
    }

    showAdminCombinations(numberOfLines) {
        const allCombinations = document.querySelectorAll('.admin-combination');

        allCombinations.forEach((combo, index) => {
            if (index < numberOfLines) {
                combo.style.display = 'block';
            } else {
                combo.style.display = 'none';
            }
        });
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    new EscapeBoxApp();
});
