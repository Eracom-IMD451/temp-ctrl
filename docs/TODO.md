# Checklist

## 1. game.js — Logique du jeu
- [ ] Créer l'objet Game avec état initial (T=25, H=25)
- [ ] Implémenter update(dt) avec dérive naturelle (1/s, s'éloigne de l'idéal)
- [ ] Implémenter pressT(dir) / pressH(dir) avec cumul ±1/s, plafond ±5/s
- [ ] Clamp T à [0, 40] et H à [10, 90]
- [ ] Détection idéal : isIdealT(), isIdealH()

## 2. history.js — Buffer d'historique
- [ ] Buffer circulaire taille fixe (~900 samples)
- [ ] push(value), getAll()

## 3. index.html + style.css — Layout
- [ ] Structure HTML portrait (affichages T/H, canvas, boutons)
- [ ] CSS responsive tactile (gros boutons, flexbox vertical)
- [ ] Conteneur #game-canvas pour p5.js
- [ ] Inclure p5.js (CDN)
- [ ] Inclure game.js, history.js, sketch.js

## 4. sketch.js — Rendu p5.js
- [ ] Setup p5 instance mode dans #game-canvas
- [ ] Canvas responsive (largeur conteneur)
- [ ] Boucle draw : game.update(dt), push dans historiques
- [ ] Dessiner courbes T et H défilantes (~30s visible)
- [ ] Lignes de référence pour valeurs idéales
- [ ] Clignotement quand valeur == idéal (2 flash en boucle)

## 5. Intégration
- [ ] Brancher boutons HTML → game.pressT / game.pressH
- [ ] Mettre à jour affichage textuel T/H chaque frame
- [ ] Test sur mobile/tablette
