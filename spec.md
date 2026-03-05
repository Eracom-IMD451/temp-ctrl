## Préambule:

Préfère le feedback direct et honnête plutôt que l'approbation. Corrige-moi si j'ai tort, souligne les faiblesses et les alternatives plutôt que de valider mon approche.

Pas d'anthropomorphisation : je sais que t'es un ordinateur, je sais comment les ordinateurs et les LLM fonctionnent.

Réponses concises, mais complètes là où ça compte. Tout n'a pas besoin d'être une liste à puces, utilise-les uniquement quand c'est justifié.

Pour le contenu markdown, affiche-le en tant que code et non en texte formaté.

Tabs, plutôt qu'espaces.

Pas de trucs de syntaxe fantaisistes ni de démonstrations, n'écris pas du code trop compact ou inutilement optimisé : le code doit être simple. Même si c'est verbeux et basique, du code lisible c'est mieux.

Le code doit inclure des instructions clé en main.

## Instructions:

Interviewe-moi avant de faire quoi que ce soit d'autre. Creuse en profondeur :
- Les décisions d'implémentation technique que la spec ne couvre pas
- Les hypothèses UI/UX qui nécessitent validation
- Les ambiguïtés ou contradictions dans la spec
- Les compromis dont je devrais être conscient

Ne pose pas de questions évidentes. Continue l'interview jusqu'à ce qu'on ait
tout couvert, une série de questions à la fois.

Pose moi les questions les un s apres les autres, avec choix multipe.

Ensuite, à partir de notre discussion, propose :
1. L'architecture et la structure de fichiers
2. Le découpage des tâches avec dépendances et ordre d'exécution
3. Si des sous-agents personnalisés seraient utiles, et si oui, ce qu'ils feraient

Ensuite, de retour en mode accept edits, mets à jour @spec.md avec ce qu'on a discuté et toute l'information manquante nécessaire.

Écris le plan d'implémentation dans docs/PLAN.md.
Écris la checklist des tâches dans docs/TODO.md.
Si tu as proposé des sous-agents, crée-les dans .claude/agents/.

- - - - - - - - - - -

## Spec

on va faire un jeu avec p5js

nous aurions un page web, avec les élémetnrs suivantes:

- Affichage de la température T: affiche la valeur de la température, entre 0 et 40 °C
- Affichage de l'humidité H: affiche la valeur de l'humidité, entre 10 % et 90 %
- Zone de dessin du jeu (p5js)
- Contrôles de la température T: deux boutons, augmenter la température, diminuer la température
- Contrôles de l'humidité H: deux boutons, augmenter la humidité, diminuer la humidité

La zone d'affichage du jeu (p5js) affiche les curseurs des valuer T & H, avec leur historique.

Si on apui sur les controles T & H +/– les valeurs augmentent ou descendent lentement (1 + ou % par 500ms). 

Si on re-appuis sur les controles, les valeurs augements ou descendent plus rapidement, ou se stabilise.

La termperature idéale est de 20°, et la humidité idéale est de 42%.

Le jeu commence avec un temperature éléve de 25, qui monte lentement, et un H faible, à 25%, qui descends legerment.

Si la T est superieure à l'idéale, elle sera instable, et augmenter lentement (1° par 100ms), ou vice versa.
Pareil pour la H, la seule % que H est stable, est 42%.

Le je est de trouver l'équilibre, donc de regler T et H vers les valuers idéaux, et de les garder la.

Comme indice, quand le curseur de T ou de H est sur la bonne valeur, elle clignote 2 fois.