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
} 