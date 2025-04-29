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
        this.isDemoMode = false;
        this.initializeApp();
        this.keyOrder = [];
        
    }

    async initializeApp() {
        try {
            // Attendre que le menu soit chargé
            const menuLoaded = await this.menu.loadMenu();
            if (!menuLoaded) {
                console.error('Le menu n\'a pas pu être chargé');
                return;
            }
            localStorage.clear();
            //Disable buttons if keys are empties
            // Wait until the DOM has rendered all necessary elements
            const startBtn = document.getElementById('startBtn');
            const resetBtn = document.getElementById('resetBtn');

            if (startBtn && resetBtn) {
                const savedCombinations = localStorage.getItem('escapeBoxCombinations');
        

                if (!savedCombinations || JSON.parse(savedCombinations).length === 0) {
                    startBtn.disabled = true;
                    resetBtn.disabled = true;
                
                }
            } else {
                console.warn('Buttons not found in DOM when checking combinations');
            }

            // Initialiser les composants
            this.combinationManager.initializeSelects();
            this.keyManager.initializeKeys();

            // Gérer les événements des boutons
            document.getElementById('startBtn')?.addEventListener('click', () => {
                this.timer.start();
                document.querySelector('.game-content').classList.add('visible');
                document.getElementById('startBtn').classList.add('hidden');
            });
            document.getElementById('resetBtn')?.addEventListener('click', () => this.resetGame());
            document.getElementById('pauseBtn')?.addEventListener('click', () => this.timer.stop());
            document.getElementById('validateBtn')?.addEventListener('click', () => this.validateCombination());

            // Gérer les événements du menu
            document.getElementById('menuToggle')?.addEventListener('click', () => this.handleMenuToggle());
            document.getElementById('closeMenu')?.addEventListener('click', () => this.toggleMenu());
            document.getElementById('applyTimeBtn')?.addEventListener('click', () => {
                this.saveAdminCombinations();
                this.applyTime();
                this.toggleMenu();
            });

            // Gérer les événements des boutons Démo / 60 min
            document.getElementById('Btn15')?.addEventListener('click', () => this.setDemoMode());
            document.getElementById('Btn60')?.addEventListener('click', () => this.setStandardMode());

            document.getElementById('Btn15')?.addEventListener('click', () => this.selectMode('Btn15'));
            document.getElementById('Btn60')?.addEventListener('click', () => this.selectMode('Btn60'));
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de l\'application:', error);
        }
    }

    handleMenuToggle() {
        this.passwordPopup.showPopup();
    }

    //alert custom
    showToast(message, type = 'error') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
    
        document.body.appendChild(toast);
    
        setTimeout(() => toast.classList.add('show'), 100);
    
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 400);
        }, 3000);
    }
    
    resetGame() {
        this.timer.reset();
        this.combinationManager.resetCombination();
        this.keyManager.resetKeys();
        document.querySelector('.game-content').classList.remove('visible');
        document.getElementById('startBtn').classList.remove('hidden');
    }

    validateCombination() {
        const storedCombinations = JSON.parse(localStorage.getItem('escapeBoxCombinations'));

        if (!storedCombinations) {
            alert('Aucune combinaison enregistrée.');
            return;
        }

        
        const nextKey = this.keyOrder.find(keyId => !this.keyManager.keys[keyId]);

        // Vérifier si toutes les clés ont été trouvées
        const allKeysFound = this.keyOrder.every(keyId => this.keyManager.keys[keyId]);
        if (allKeysFound) {
            let audio = new Audio('./src/assets/victory.mp3');
            audio.play();
            this.showToast('Félicitations ! Vous avez trouvé toutes les clés !', 'success');
            this.timer.stop();
            return;
        }

        if (!nextKey) {
            alert('Toutes les clés ont déjà été trouvées !');
            return;
        }

        const keyIndex = this.keyOrder.indexOf(nextKey);

        const playerCombination = [
            document.getElementById('playerSelect1')?.value,
            document.getElementById('playerSelect2')?.value,
            document.getElementById('playerSelect3')?.value,
            document.getElementById('playerSelect4')?.value
        ];

        // Vérifier si la combinaison actuelle est correcte
        const expectedCombination = storedCombinations[keyIndex];
        const isCorrect = expectedCombination.every((val, index) => val === playerCombination[index]);

        if (isCorrect) {
            let audio = new Audio('./src/assets/correct_answer.mp3');
            audio.play();
            this.showToast('Bravo ! Vous avez trouvé la bonne combinaison.', 'success');
            this.keyManager.unlockKey(nextKey);

            // Vérifier si toutes les combinaisons sont maintenant validées
            const allCombinationsValidated = this.keyOrder.every(keyId => this.keyManager.keys[keyId]);
            if (allCombinationsValidated) {
                let audio = new Audio('./src/assets/victory.mp3');
                audio.play();
                this.showToast('Félicitations ! Vous avez trouvé toutes les clés !', 'success');
                this.timer.stop();
            }
        } else {
            let audio = new Audio('./src/assets/wrong_answer.mp3');
            audio.play();
            this.showToast('Mauvaise combinaison, réessayez.');
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
        if (timeInput) {
            const newTime = parseInt(timeInput.value);
            if (!isNaN(newTime) && newTime > 0) {
                this.timer.reset(newTime);
            }
        }
    }

    setDemoMode() {
        this.isDemoMode = true;
        this.timer.reset(15);
        this.showAdminCombinations(1);
        this.keyManager.setActiveKeys(1);
        this.keyOrder = ['key1'];
    }

    setStandardMode() {
        this.isDemoMode = false;
        this.timer.reset(60);
        this.showAdminCombinations(3);
        this.keyManager.setActiveKeys(3);
        this.keyOrder = ['key1', 'key2', 'key3'];
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
        const maxCombinations = this.isDemoMode ? 1 : 3;
    
        for (let i = 0; i < maxCombinations; i++) {
            const keyCombination = [];
            for (let j = 0; j < 4; j++) {
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
       
        this.updateButtonStates();
    }    

    updateButtonStates() {
        const startBtn = document.getElementById('startBtn');
        const resetBtn = document.getElementById('resetBtn');
        
        if (startBtn && resetBtn) {
            const savedCombinations = localStorage.getItem('escapeBoxCombinations');
            
            if (!savedCombinations || JSON.parse(savedCombinations).length === 0) {
                startBtn.disabled = true;
                resetBtn.disabled = true;
            } else {
                startBtn.disabled = false;
                resetBtn.disabled = false;
            }
        }
    }

    // Toggle the selected state on demo/60 min buttons
    selectMode(selectedButtonId) {
        const btn15 = document.getElementById('Btn15');
        const btn60 = document.getElementById('Btn60');

        // Remove 'selected' class from both buttons
        btn15.classList.remove('selected');
        btn60.classList.remove('selected');

        // Add 'selected' class to the clicked button
        const selectedButton = document.getElementById(selectedButtonId);
        selectedButton.classList.add('selected');

        // You can add other logic here to set the timer mode
        if (selectedButtonId === 'Btn15') {
            this.setDemoMode(); // Example: Switch to demo mode
        } else {
            this.setStandardMode(); // Example: Switch to 60 min mode
        }
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    new EscapeBoxApp();
});