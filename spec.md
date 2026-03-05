## Préambule

Préfère le feedback direct et honnête plutôt que l'approbation. Corrige-moi si j'ai tort, souligne les faiblesses et les alternatives plutôt que de valider mon approche.

Pas d'anthropomorphisation : je sais que t'es un ordinateur, je sais comment les ordinateurs et les LLM fonctionnent.

Réponses concises, mais complètes là où ça compte. Tout n'a pas besoin d'être une liste à puces, utilise-les uniquement quand c'est justifié.

Pour le contenu markdown, affiche-le en tant que code et non en texte formaté.

Tabs plutôt qu'espaces.

Pas de trucs de syntaxe fantaisistes ni de démonstrations, n'écris pas du code trop compact ou inutilement optimisé : le code doit être simple. Même si c'est verbeux et basique, du code lisible c'est mieux.

Le code doit inclure des instructions clé en main.

## Instructions

Interviewe-moi avant de faire quoi que ce soit d'autre. Creuse en profondeur :
- Les décisions d'implémentation technique que la spec ne couvre pas
- Les hypothèses UI/UX qui nécessitent validation
- Les ambiguïtés ou contradictions dans la spec
- Les compromis dont je devrais être conscient

Ne pose pas de questions évidentes. Continue l'interview jusqu'à ce qu'on ait tout couvert, une série de questions à la fois.

Pose-moi les questions les unes après les autres, à choix multiple.

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

On va faire un jeu avec p5.js.

Nous aurions une page web, avec les éléments suivants :

- Affichage de la température T : affiche la valeur de la température, entre 0 et 40 °C
- Affichage de l'humidité H : affiche la valeur de l'humidité, entre 10 % et 90 %
- Zone de dessin du jeu (p5.js)
- Contrôles de la température T : deux boutons, augmenter la température, diminuer la température
- Contrôles de l'humidité H : deux boutons, augmenter l'humidité, diminuer l'humidité

La zone d'affichage du jeu (p5.js) affiche les curseurs des valeurs T et H, avec leur historique.

Si on appuie sur les contrôles T ou H +/−, les valeurs augmentent ou descendent lentement (1 °C ou % par 500 ms).

Si on réappuie sur les contrôles, les valeurs augmentent ou descendent plus rapidement, ou se stabilisent.

La température idéale est de 20 °C, et l'humidité idéale est de 42 %.

Le jeu commence avec une température élevée de 25 °C, qui monte lentement, et une humidité faible, à 25 %, qui descend légèrement.

Si la T est supérieure à l'idéale, elle sera instable et augmentera lentement (1 °C par 100 ms), et vice versa.
Pareil pour l'humidité : le seul % où H est stable est 42 %.

Le jeu est de trouver l'équilibre, donc de régler T et H vers les valeurs idéales, et de les garder là.

Comme indice, quand le curseur de T ou de H est sur la bonne valeur, il clignote 2 fois.