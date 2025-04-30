#!/bin/bash

set -e  # Stop on error

echo "🧹 Nettoyage et création du dossier dist..."
rm -rf dist
mkdir -p dist

# -------- Lire index.html --------
echo "📄 Lecture de index.html"
html=$(cat index.html)

# -------- Lecture et nettoyage de main.css --------
echo "🧼 Nettoyage de main.css (suppression des @import)..."
main_css=$(grep -v '^@import' src/styles/main.css)

# -------- Concaténation CSS --------
echo "🎨 Concaténation CSS..."
css=$(cat \
  src/styles/base.css \
  <(echo "$main_css") \
  src/styles/components/*.css)

# -------- Concaténation JS --------
echo "🧠 Concaténation JS..."
js=$(cat \
  src/config/config.js \
  src/js/modules/*.js \
  src/js/app.js)

# -------- Injection CSS/JS --------
echo "🧪 Injection CSS dans <head>..."
html=$(echo "$html" | sed "/<\/head>/i <style>$css</style>")

echo "🧪 Injection JS avant </body>..."
html=$(echo "$html" | sed "/<\/body>/i <script>$js</script>")

# -------- Sauvegarde du HTML final --------
echo "💾 Sauvegarde du fichier final dans dist/index.html"
echo "$html" > dist/index.html

# -------- Copie de menu.html --------
echo "📁 Copie de src/components/menu.html → dist/menu.html"
cp src/components/menu.html dist/menu.html

# -------- Copie des assets --------
echo "📂 Copie de src/assets → dist/assets"
cp -r src/assets dist/assets

echo "✅ Build terminé avec succès !"
