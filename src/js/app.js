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

            // Gérer les événements des boutons
            document.getElementById('startBtn')?.addEventListener('click', () => this.timer.start());
            document.getElementById('resetBtn')?.addEventListener('click', () => this.resetGame());
            document.getElementById('pauseBtn')?.addEventListener('click', () => this.timer.stop());
            document.getElementById('validateBtn')?.addEventListener('click', () => this.validateCombination());

            // Gérer les événements du menu
            document.getElementById('menuToggle')?.addEventListener('click', () => this.handleMenuToggle());
            document.getElementById('closeMenu')?.addEventListener('click', () => this.toggleMenu());
            document.getElementById('applyTimeBtn')?.addEventListener('click', () => {
                this.saveAdminCombinations();
                this.applyTime();
            });

            // Gérer les événements des boutons Démo / 60 min
            document.getElementById('Btn15')?.addEventListener('click', () => this.setDemoMode());
            document.getElementById('Btn60')?.addEventListener('click', () => this.setStandardMode());
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de l\'application:', error);
        }
    }

    handleMenuToggle() {
        this.passwordPopup.showPopup();
    }

    resetGame() {
        this.timer.reset(CONFIG.defaultTime);
        this.combinationManager.resetCombination();
        this.keyManager.resetKeys();
    }

    validateCombination() {
        const storedCombinations = JSON.parse(localStorage.getItem('escapeBoxCombinations'));
    
        if (!storedCombinations) {
            alert('Aucune combinaison enregistrée.');
            return;
        }
    
        const keyOrder = ['key1', 'key2', 'key3'];
        const nextKey = keyOrder.find(keyId => !this.keyManager.keys[keyId]);
    
        if (!nextKey) {
            alert('Toutes les clés ont déjà été trouvées !');
            return;
        }
    
        const keyIndex = keyOrder.indexOf(nextKey);
    
        const playerCombination = [
            document.getElementById('playerSelect1')?.value,
            document.getElementById('playerSelect2')?.value,
            document.getElementById('playerSelect3')?.value,
            document.getElementById('playerSelect4')?.value
        ];
    
        const expectedCombination = storedCombinations[keyIndex];
    
        const isCorrect = expectedCombination.every((val, index) => val === playerCombination[index]);
    
        if (isCorrect) {
            alert('Bravo ! Vous avez trouvé la bonne combinaison.');
            this.keyManager.unlockKey(nextKey);
        } else {
            alert('Mauvaise combinaison, réessayez.');
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
        const newTime = parseInt(timeInput?.value) || CONFIG.defaultTime;
        this.timer.reset(newTime);
        this.toggleMenu();
    }

    setDemoMode() {
        this.timer.reset(15); // 15 minutes
        this.showAdminCombinations(1); // ❗ 1 ligne de combinaison MJ
        this.keyManager.setActiveKeys(1); // ❗ 1 clé visible côté joueurs
    }
    
    setStandardMode() {
        this.timer.reset(60); // 60 minutes
        this.showAdminCombinations(3); // ❗ 3 lignes de combinaisons MJ
        this.keyManager.setActiveKeys(3);
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

    saveAdminCombinations() {
        const combinations = [];
    
        for (let i = 0; i < 3; i++) { // Pour 3 clés maximum
            const keyCombination = [];
            for (let j = 0; j < 4; j++) { // 4 selects par clé
                const selectId = `adminSelect${i * 4 + j + 1}`;
                const select = document.getElementById(selectId);
                if (!select || select.value === '') {
                    alert('Veuillez renseigner toutes les clés.');
                    return;
                }
                keyCombination.push(select.value);
            }
            combinations.push(keyCombination);
        }
    
        localStorage.setItem('escapeBoxCombinations', JSON.stringify(combinations));
        console.log('Combinaisons sauvegardées:', combinations);
    }    
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    new EscapeBoxApp();
});
