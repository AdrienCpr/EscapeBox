function genererCombinaisons() {
    const combinaisons = [];

    for (let i = 0; i < 4; i++) {
        const nombre = Math.floor(Math.random() * 6) + 1;
        combinaisons.push(nombre);
    }

    return combinaisons;
}

// Exemple d'utilisation
const mesCombinaisons = genererCombinaisons();
console.log(mesCombinaisons);