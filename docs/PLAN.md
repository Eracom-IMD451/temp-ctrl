# Plan d'implémentation

## Architecture

```
temp-ctrl/
├── index.html          # Page unique, layout responsive portrait
├── style.css           # Layout neutre, gros boutons tactiles
├── js/
│   ├── sketch.js       # Setup p5.js instance mode, boucle draw, rendu courbes
│   ├── game.js         # Logique : état T/H, dérive, contrôles, clignotement
│   └── history.js      # Buffer circulaire pour historique (~30s)
├── docs/
│   ├── PLAN.md
│   └── TODO.md
└── spec.md
```

## Modules

### game.js — Logique du jeu

Objet `Game` qui encapsule tout l'état :
- `T` (int, 0–40), `H` (int, 10–90)
- `controlSpeedT`, `controlSpeedH` (int, -5 à +5)
- `update(dt)` : applique la dérive naturelle + la vitesse de contrôle, clamp aux bornes
- `pressT(dir)` / `pressH(dir)` : ajoute ±1 à la vitesse de contrôle (plafond ±5)
- `isIdealT()` / `isIdealH()` : retourne true si T==20 / H==42

Dérive naturelle : chaque seconde, si T > 20 → T += 1, si T < 20 → T -= 1. Pareil pour H autour de 42.

Contrôle joueur : chaque seconde, T += controlSpeedT, H += controlSpeedH.

Les deux s'additionnent. Valeurs clampées aux bornes (T: 0–40, H: 10–90).

### history.js — Buffer d'historique

Buffer circulaire de taille fixe. À ~30 fps sur 30 secondes = ~900 samples.
- `push(value)` : ajoute une valeur
- `getAll()` : retourne le tableau ordonné pour le dessin

Deux instances : une pour T, une pour H.

### sketch.js — Rendu p5.js

p5.js en mode instance, attaché au conteneur `#game-canvas`.
- `setup()` : crée le canvas responsive (largeur du conteneur, hauteur proportionnelle)
- `draw()` : appelle `game.update(dt)`, pousse T et H dans les historiques, dessine les courbes
- Deux courbes superposées ou empilées (T et H)
- Ligne de référence pour les valeurs idéales (20°C, 42%)
- Clignotement : quand `isIdealT()` ou `isIdealH()`, le curseur/point courant clignote (2 flash en boucle, ~300ms on / 300ms off, 2 fois, puis pause)

### index.html + style.css — Layout

Structure portrait pour mobile/tablette :
1. Affichage T (valeur numérique)
2. Affichage H (valeur numérique)
3. Canvas p5.js (courbes)
4. Boutons T : [−] [+]
5. Boutons H : [−] [+]

Boutons gros (min 48px touch target), layout flexbox vertical, viewport units.

## Ordre d'exécution

1. `game.js` + `history.js` (indépendants, en parallèle)
2. `index.html` + `style.css` (indépendant)
3. `sketch.js` (dépend de 1 et 2)
4. Intégration : brancher boutons → Game, affichage texte, test tactile
