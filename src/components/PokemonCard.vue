<template>
  <!--
  Carte d'un Pokémon
    * Composant réutilisable qui affiche les informations principales d'un Pokémon
    * Utilisé dans la grille de la page d'accueil et la page favoris
    * :to crée un lien vers la page de détail du Pokémon
    * hover ajoute un effet d'élévation au survol
  -->
  <v-card
    class="pokemon-card"
    :to="`/pokemon/${pokemon.id}`"
    hover
  >
    <!--
    Image du Pokémon
      * height="200" fixe la hauteur de l'image
      * cover remplit l'espace disponible en gardant les proportions
    -->
    <!--
    Image du Pokémon
      * height="200" fixe la hauteur de l'image
      * cover remplit l'espace disponible en gardant les proportions
      * Le template #placeholder affiche un skeleton loader pendant le chargement
    -->
    <v-img
      :src="getImageUrl(pokemon.img)"
      :alt="pokemon.name"
      height="200"
      cover
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            indeterminate
            color="grey-lighten-4"
          />
        </div>
      </template>
    </v-img>

    <!-- Nom du Pokémon -->
    <v-card-title>{{ pokemon.name }}</v-card-title>

    <!-- Niveau du Pokémon -->
    <v-card-subtitle>Niveau {{ pokemon.level }}</v-card-subtitle>

    <!--
    Types du Pokémon (chips colorés)
      * Affiché sous le sous-titre avec un padding
    -->
    <v-card-text
      v-if="pokemon.types && pokemon.types.length"
      class="pb-0"
    >
      <pokemon-types-chips :types="pokemon.types" />
    </v-card-text>

    <!--
    Actions de la carte
      * Bouton favori avec icône cœur
    -->
    <v-card-actions>
      <v-spacer />
      <!--
      Bouton pour ajouter/retirer des favoris
        * @click.stop.prevent empêche la navigation vers la page de détail
        * .stop arrête la propagation de l'événement
        * .prevent empêche le comportement par défaut du router-link
        * L'icône change selon l'état favori (cœur plein ou vide)
        * La couleur change : rouge si favori, grise sinon
        * La classe 'favorite-active' déclenche l'animation heartbeat
      -->
      <v-btn
        :icon="pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline'"
        :color="pokemonStore.isFavorite(pokemon) ? 'red' : ''"
        :class="{ 'favorite-active': pokemonStore.isFavorite(pokemon) }"
        variant="text"
        @click.stop.prevent="pokemonStore.toggleFavorite(pokemon)"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { getImageUrl } from '@/utils/imageUrl'
import { usePokemonStore } from '@/stores/pokemonStore'
import PokemonTypesChips from '@/components/PokemonTypesChips.vue'

/**
 * Props du composant PokemonCard
 * @property {Object} pokemon - Objet Pokémon avec id, name, level, img, types, etc.
 */
defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

const pokemonStore = usePokemonStore()
</script>

<style scoped>
/* Animation du cœur quand un Pokémon est ajouté aux favoris */
.favorite-active {
  animation: heartbeat 0.6s ease-in-out;
}
</style>
