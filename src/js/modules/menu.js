export class Menu {
    constructor() {
        this.menuContainer = null;
    }

    async loadMenu() {
        try {
            const response = await fetch('./src/components/menu.html');
            const html = await response.text();
            this.menuContainer = document.createElement('div');
            this.menuContainer.innerHTML = html;
            document.body.insertBefore(this.menuContainer.firstElementChild, document.body.firstChild);
            return true;
        } catch (error) {
            console.error('Erreur lors du chargement du menu:', error);
            return false;
        }
    }

    getMenuContainer() {
        return this.menuContainer;
    }
} 