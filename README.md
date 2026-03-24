# Exercice Pokédex Vuetify

Exercice fil rouge pour le cours **C141** (ESIG) : construire un Pokédex interactif avec **Vue.js 3**, **Vuetify 3**, **Pinia** et **Axios**.

## Branches

| Branche | Contenu |
|---------|---------|
| `main` | Squelette de départ (ce que l'élève reçoit) |
| `solution` | Version finale complète (référence prof) |

## Mise en place

### 1. Installer les dépendances

```bash
npm install
```

### 2. Démarrer l'API Pokédex

L'API doit tourner en parallèle (dépôt séparé) :

```bash
cd ~/WebstormProjects/2025-sfa-pokedex-api
npm run dev
```

L'API sera accessible sur `http://localhost:3535`.

### 3. Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`.

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (port 3000) |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualiser le build |
| `npm run lint` | Linter ESLint |

## Stack technique

- **Vue.js 3** — Framework (Composition API, `<script setup>`)
- **Vuetify 3** — Composants UI Material Design
- **Pinia** — State management (Options API)
- **Vue Router 4** — Routing automatique (file-based depuis `src/pages/`)
- **Axios** — Client HTTP
- **@mdi/font** — Icônes Material Design
- **@fontsource/roboto** — Police self-hosted (pas de CDN)

## Pages à construire

L'application complète contient les pages suivantes :

- **Accueil** — Liste des Pokémon avec recherche, filtre par type et tri
- **Favoris** — Liste des Pokémon marqués comme favoris
- **À propos** — Page statique avec dialogue carte Kanto
- **Détail Pokémon** — Fiche complète (stats, types, description)
- **Ajouter** — Formulaire pour créer un nouveau Pokémon (protégé par auth)
- **Connexion** — Formulaire de login (auth factice)

## Solution en ligne

Version déployée (frontend uniquement, sans API) :
https://fallinov.github.io/esig-141-pokedex-vuetify/

## API Pokédex

- **URL** : `http://localhost:3535`
- **Endpoints** : GET/POST/PUT/DELETE `/pokemons`, GET `/types`, POST `/login`
- **Auth** : `sacha@pokemon.com` / `pika`
- **Données** : 12 Pokémon, 14 types

## Documentation du cours

Les étapes détaillées de construction sont disponibles sur [devjs.ch](https://github.com/fallinov/2025-sfa-devjs).
