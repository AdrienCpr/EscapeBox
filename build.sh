#!/bin/bash

set -e

echo "🧹 Nettoyage du dossier dist..."
rm -rf dist
mkdir -p dist

# -------- Lire index.html --------
echo "📄 Lecture de index.html"
html=$(cat index.html)

# -------- Concaténation JS --------
echo "🧠 Concaténation JS..."

# Lire le contenu HTML du menu et l’échapper pour JS
echo "📥 Lecture et échappement de menu.html"
menu_html=$(cat src/components/menu.html | tr -d '\n' | sed 's/"/\\"/g')

# Remplacer dans Menu.js la fonction fetch par une version inline
echo "🔧 Injection du menu HTML dans Menu.js"
modified_menu_js=$(sed "/async loadMenu()/,/^    }/c\
    async loadMenu() {\n\
        try {\n\
            const html = \"$menu_html\";\n\
            this.menuContainer = document.createElement('div');\n\
            this.menuContainer.innerHTML = html;\n\
            document.body.insertBefore(this.menuContainer.firstElementChild, document.body.firstChild);\n\
            return true;\n\
        } catch (error) {\n\
            console.error('Erreur lors du chargement du menu:', error);\n\
            return false;\n\
        }\n\
    }" src/js/modules/Menu.js)

# Concaténation des JS avec Menu modifié
js=$(cat \
  src/config/config.js \
  <(echo "$modified_menu_js") \
  src/js/modules/*.js \
  src/js/app.js)

# Injection du JS dans index.html
echo "📥 Injection du JS dans index.html"
html=$(echo "$html" | sed "/<\/body>/i <script>$js</script>")

# Sauvegarde du HTML final
echo "💾 Écriture de dist/index.html"
echo "$html" > dist/index.html

# Copie de tout le reste
echo "📁 Copie des fichiers de src/ vers dist/"
cp -r src/* dist/

echo "✅ Build terminé avec succès !"