# Leçons apprises — Pokédex Vuetify

## 2026-03-24 — ESLint config incompatible avec eslint-config-vuetify

**Contexte** : Construction de la solution, premier lint des fichiers .vue
**Erreur** : `eslint-config-vuetify` requiert `@vue/eslint-config-typescript` qui requiert `typescript`, et la version installée utilise le format flat config incompatible avec ESLint 8
**Correction** : Remplacé `extends: ['vuetify']` par `extends: ['plugin:vue/vue3-recommended', 'eslint:recommended']`
**Règle** : Pour un projet JS (pas TS) avec ESLint 8, utiliser directement `plugin:vue/vue3-recommended` plutôt que `eslint-config-vuetify`

## 2026-03-24 — @click.stop insuffisant sur v-card avec :to

**Contexte** : Bouton favori (cœur) sur PokemonCard qui est un `<v-card :to="...">`
**Erreur** : `@click.stop` seul ne suffit pas — le clic sur le cœur navigue quand même vers la page de détail
**Correction** : Utiliser `@click.stop.prevent` pour stopper la propagation ET empêcher le comportement par défaut du router-link
**Règle** : Sur un élément interactif à l'intérieur d'un `<v-card :to="">` ou `<router-link>`, toujours utiliser `.stop.prevent`

## 2026-03-24 — package-lock.json désynchronisé après npm uninstall sur autre branche

**Contexte** : `npm uninstall axios` sur main, puis `npm install` sur solution pour regen lockfile
**Erreur** : `npm ci` en CI échoue avec "Missing from lock file" pour plusieurs paquets ESLint
**Correction** : Relancer `npm install` sur solution pour regénérer un lockfile propre, puis commit
**Règle** : Après un changement de branche avec des dépendances différentes, toujours `npm install` et vérifier le lockfile avant de push

## 2026-03-24 — GitHub Pages environment protection bloque le déploiement

**Contexte** : Workflow deploy.yml configuré pour se déclencher sur push vers `solution`
**Erreur** : "Branch solution is not allowed to deploy to github-pages due to environment protection rules"
**Correction** : Ajouter une deployment branch policy via `gh api repos/.../environments/github-pages/deployment-branch-policies -X POST -f name=solution`
**Règle** : Quand GitHub Pages est activé, seule la branche par défaut (main) est autorisée. Il faut explicitement ajouter les autres branches via l'API ou le dashboard

## 2026-03-25 — SPA fallback nécessaire sur GitHub Pages

**Contexte** : Routes dynamiques (`/pokemon/:id`) sur GitHub Pages
**Erreur** : GitHub Pages retourne 404 pour toutes les URLs qui ne correspondent pas à un fichier statique
**Correction** : Ajouter `cp dist/index.html dist/404.html` dans le workflow CI après le build
**Règle** : Tout SPA déployé sur GitHub Pages nécessite un `404.html` identique à `index.html` pour que le routing côté client fonctionne

## 2026-03-25 — Express sur Vercel : filesystem read-only

**Contexte** : Déploiement de l'API Express sur Vercel (serverless)
**Erreur** : `fs.writeFileSync()` échoue en serverless car le filesystem est read-only
**Correction** : Store en mémoire avec try/catch sur l'écriture fichier. Les mutations persistent pendant la session mais reviennent à l'état initial au cold start
**Règle** : En serverless, ne jamais compter sur l'écriture fichier pour persister des données. Utiliser un cache mémoire ou une BDD externe
