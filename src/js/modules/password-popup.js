export class PasswordPopup {
    constructor() {
        this.password = 'escape'; // Mot de passe par défaut
        this.popup = null;
        this.createPopup();
    }

    createPopup() {
        this.popup = document.createElement('div');
        this.popup.className = 'password-popup hidden';
        this.popup.innerHTML = `
            <h2>Accès aux paramètres</h2>
            <input type="password" id="passwordInput" placeholder="Entrez le mot de passe">
            <div class="error-message">Mot de passe incorrect</div>
            <div class="buttons">
                <button id="validatePassword">Valider</button>
                <button id="cancelPassword">Annuler</button>
            </div>
        `;
        document.body.appendChild(this.popup);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const validateBtn = this.popup.querySelector('#validatePassword');
        const cancelBtn = this.popup.querySelector('#cancelPassword');
        const passwordInput = this.popup.querySelector('#passwordInput');
        const errorMessage = this.popup.querySelector('.error-message');

        validateBtn.addEventListener('click', () => {
            if (passwordInput.value === this.password) {
                this.hidePopup();
                document.getElementById('dropdownMenu').classList.remove('hidden');
            } else {
                errorMessage.classList.add('show');
                passwordInput.value = '';
            }
        });

        cancelBtn.addEventListener('click', () => {
            this.hidePopup();
        });

        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                validateBtn.click();
            }
        });
    }

    showPopup() {
        this.popup.classList.remove('hidden');
        this.popup.querySelector('#passwordInput').focus();
    }

    hidePopup() {
        this.popup.classList.add('hidden');
        this.popup.querySelector('#passwordInput').value = '';
        this.popup.querySelector('.error-message').classList.remove('show');
    }
} 