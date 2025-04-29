export class KeyManager {
    constructor() {
        this.keys = {
            key1: false,
            key2: false,
            key3: false
        };
    }

    initializeKeys() {
        Object.keys(this.keys).forEach(keyId => {
            const keyElement = document.getElementById(keyId);
            if (keyElement) {
                keyElement.classList.add('key');
                keyElement.textContent = keyId.replace('key', 'Clé ');
            }
        });
    }

    unlockKey(keyId) {
        if (this.keys.hasOwnProperty(keyId)) {
            this.keys[keyId] = true;
            const keyElement = document.getElementById(keyId);
            if (keyElement) {
                keyElement.classList.add('unlocked');
            }
        }
    }

    resetKeys() {
        Object.keys(this.keys).forEach(keyId => {
            this.keys[keyId] = false;
            const keyElement = document.getElementById(keyId);
            if (keyElement) {
                keyElement.classList.remove('unlocked');
            }
        });
    }

    areAllKeysUnlocked() {
        return Object.values(this.keys).every(key => key === true);
    }

    setActiveKeys(count) {
        const keyIds = Object.keys(this.keys);
    
        keyIds.forEach((keyId, index) => {
            const keyElement = document.getElementById(keyId);
            if (keyElement) {
                if (index < count) {
                    keyElement.style.display = 'block'; // Affiche
                } else {
                    keyElement.style.display = 'none';  // Cache
                }
            }
        });
    }    

    saveAdminCombinations() {
        const combinations = [];
    
        for (let i = 0; i < 3; i++) { // Pour 3 clés maximum
            const keyCombination = [];
            for (let j = 0; j < 4; j++) { // 4 select par clé
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