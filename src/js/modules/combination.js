import { CONFIG } from '../../config/config.js';

export class CombinationManager {
    constructor() {
        this.combinations = [];
        this.currentCombination = [];
    }

    initializeSelects() {
        const selects = document.querySelectorAll('select[id^="playerSelect"], select[id^="adminSelect"]');
        selects.forEach(select => {
            CONFIG.symbols.forEach(symbol => {
                const option = document.createElement('option');
                option.value = symbol.value;
                option.textContent = symbol.label;
                select.appendChild(option);
            });
        });
    }

    validateCombination() {
        const selects = document.querySelectorAll('select[id^="playerSelect"]');
        const currentCombination = Array.from(selects).map(select => select.value);
        
        // Vérifier si la combinaison est correcte
        // TODO: Implémenter la logique de validation
        console.log('Combinaison actuelle:', currentCombination);
        
        return false; // À modifier selon la logique de validation
    }

    resetCombination() {
        const selects = document.querySelectorAll('select[id^="playerSelect"]');
        selects.forEach(select => {
            select.selectedIndex = 0;
        });
    }
} 