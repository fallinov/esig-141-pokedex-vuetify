<template>
  <!-- Conteneur principal pour structurer la disposition de la page -->
  <v-container>
    <!--
    Titre de la page
      * text-h3 applique le style titre de niveau 3
      * text-center centre le texte horizontalement
      * my-6 ajoute une marge verticale de 6 unités
    -->
    <h1 class="text-h3 text-center my-6">
      Pokédex
      <span class="text-subtitle-1">({{ pokemonStore.totalPokemons }})</span>
    </h1>

    <!--
    Barre de recherche, filtre et tri
      * v-row avec 3 colonnes pour les contrôles
    -->
    <v-row class="mb-4">
      <!--
      Champ de recherche par nom
        * v-model lie la valeur au ref searchQuery
        * clearable ajoute un bouton pour vider le champ
        * prepend-inner-icon ajoute une icône de recherche à l'intérieur
      -->
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-text-field
          v-model="searchQuery"
          label="Rechercher un Pokémon"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          variant="outlined"
          density="compact"
        />
      </v-col>

      <!--
      Filtre par type
        * v-select affiche un menu déroulant avec les types disponibles
        * :items utilise les types chargés depuis l'API
        * item-title et item-value définissent quelles propriétés afficher/utiliser
      -->
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-select
          v-model="selectedType"
          :items="pokemonStore.types"
          item-title="name"
          item-value="id"
          label="Filtrer par type"
          prepend-inner-icon="mdi-filter"
          clearable
          hide-details
          variant="outlined"
          density="compact"
        />
      </v-col>

      <!--
      Bouton de tri
        * Alterne entre tri ascendant (A→Z) et descendant (Z→A)
        * L'icône change selon l'ordre actuel
      -->
      <v-col
        cols="12"
        md="4"
        class="d-flex align-center"
      >
        <v-btn
          variant="outlined"
          :prepend-icon="sortOrder === 'asc' ? 'mdi-sort-alphabetical-ascending' : 'mdi-sort-alphabetical-descending'"
          @click="toggleSort"
        >
          Tri {{ sortOrder === 'asc' ? 'A → Z' : 'Z → A' }}
        </v-btn>
      </v-col>
    </v-row>

    <!--
    Skeleton loaders pendant le chargement
      * Simule la grille de cartes avec des placeholders animés
      * Offre une meilleure UX qu'un simple spinner
    -->
    <v-row v-if="pokemonStore.isLoading">
      <v-col
        v-for="n in 8"
        :key="n"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-skeleton-loader
          type="image, article"
          height="350"
        />
      </v-col>
    </v-row>

    <!--
    Message si aucun résultat
      * Affiché si la recherche ou le filtre ne donne aucun résultat
    -->
    <v-alert
      v-else-if="sortedPokemons.length === 0"
      type="info"
      variant="tonal"
      class="mb-6"
    >
      Aucun Pokémon ne correspond à votre recherche.
    </v-alert>

    <!--
    Grille de cartes Pokémon
      * v-row et v-col forment le système de grille Vuetify (basé sur flexbox)
      * cols="12" : 1 carte par ligne sur mobile
      * sm="6" : 2 cartes par ligne sur tablette
      * md="4" : 3 cartes par ligne sur écran moyen
      * lg="3" : 4 cartes par ligne sur grand écran
    -->
    <v-row v-else>
      <v-col
        v-for="pokemon in sortedPokemons"
        :key="pokemon.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <!--
        Composant PokemonCard
          * Affiche les informations d'un Pokémon sous forme de carte
          * :pokemon passe l'objet Pokémon en prop
        -->
        <pokemon-card :pokemon="pokemon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { usePokemonStore } from '@/stores/pokemonStore'
import PokemonCard from '@/components/PokemonCard.vue'

/**
 * Récupération du store Pokémon
 * Les données sont déjà chargées par App.vue (pokemonStore.init())
 */
const pokemonStore = usePokemonStore()

/**
 * Variables réactives pour la recherche, le filtre et le tri
 * ref() est auto-importé grâce à unplugin-auto-import
 */
const searchQuery = ref('')
const selectedType = ref(null)
const sortOrder = ref('asc')

/**
 * COMPUTED CHAÎNÉS : Chaque étape filtre ou transforme le résultat de la précédente
 * pokemons → filteredByType → filteredBySearch → sortedPokemons
 */

/**
 * Étape 1 : Filtrer par type
 * Si un type est sélectionné, ne garder que les Pokémon qui possèdent ce type
 */
const filteredByType = computed(() => {
  if (!selectedType.value) return pokemonStore.pokemons
  return pokemonStore.pokemons.filter(pokemon =>
    pokemon.types.includes(selectedType.value),
  )
})

/**
 * Étape 2 : Filtrer par recherche
 * Si un texte est saisi, ne garder que les Pokémon dont le nom contient le texte
 * La recherche est insensible à la casse (toLowerCase)
 */
const filteredBySearch = computed(() => {
  if (!searchQuery.value) return filteredByType.value
  const query = searchQuery.value.toLowerCase()
  return filteredByType.value.filter(pokemon =>
    pokemon.name.toLowerCase().includes(query),
  )
})

/**
 * Étape 3 : Trier par nom
 * Trie les Pokémon filtrés par ordre alphabétique (ascendant ou descendant)
 * localeCompare() gère correctement les accents et caractères spéciaux
 */
const sortedPokemons = computed(() => {
  return [...filteredBySearch.value].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name, 'fr')
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

/**
 * Inverse l'ordre de tri entre ascendant et descendant
 */
function toggleSort () {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>
