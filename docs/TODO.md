# Checklist

## 1. game.js — Logique du jeu
- [x] Créer l'objet Game avec état initial (T=25, H=25)
- [x] Implémenter update(dt) avec dérive naturelle (1/s, s'éloigne de l'idéal)
- [x] Implémenter pressT(dir) / pressH(dir) avec cumul ±1/s, plafond ±5/s
- [x] Clamp T à [0, 40] et H à [10, 90]
- [x] Détection idéal : isIdealT(), isIdealH()

## 2. history.js — Buffer d'historique
- [x] Buffer circulaire taille fixe (~900 samples)
- [x] push(value), getAll()

## 3. index.html + style.css — Layout
- [x] Structure HTML portrait (affichages T/H, canvas, boutons)
- [x] CSS responsive tactile (gros boutons, flexbox vertical)
- [x] Conteneur #game-canvas pour p5.js
- [x] Inclure p5.js (CDN)
- [x] Inclure game.js, history.js, sketch.js

## 4. sketch.js — Rendu p5.js
- [x] Setup p5 instance mode dans #game-canvas
- [x] Canvas responsive (largeur conteneur)
- [x] Boucle draw : game.update(dt), push dans historiques
- [x] Dessiner courbes T et H défilantes (~30s visible)
- [x] Lignes de référence pour valeurs idéales
- [x] Clignotement quand valeur == idéal (2 flash en boucle)

## 5. Intégration
- [x] Brancher boutons HTML → game.pressT / game.pressH
- [x] Mettre à jour affichage textuel T/H chaque frame
- [ ] Test sur mobile/tablette
