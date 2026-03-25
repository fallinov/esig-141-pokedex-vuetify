<template>
  <!--
  Carte d'un Pokémon
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
      * Le template #placeholder affiche un loader pendant le chargement
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
      * v-spacer pousse le bouton à droite
      * Le bouton coeur toggle le favori
    -->
    <v-card-actions>
      <v-spacer />
      <!--
      Bouton pour ajouter/retirer des favoris
        * @click.stop.prevent empêche la navigation vers la page de détail
        * .stop arrête la propagation de l'événement (ne remonte pas à v-card)
        * .prevent empêche le comportement par défaut du router-link
        * L'icône change selon l'état favori (coeur plein ou vide)
        * La couleur change : rouge si favori, grise sinon
      -->
      <v-btn
        :icon="pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline'"
        :color="pokemonStore.isFavorite(pokemon) ? 'red' : ''"
        variant="text"
        @click.stop.prevent="handleToggleFavorite()"
      />
    </v-card-actions>

    <!--
    Snackbar de confirmation
      * v-model contrôle l'affichage
      * timeout="2000" masque automatiquement après 2 secondes
      * Le message change selon l'action (ajout ou retrait)
    -->
    <v-snackbar
      v-model="showSnackbar"
      :timeout="2000"
      color="primary"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-card>
</template>

<script setup>
import { getImageUrl } from '@/utils/imageUrl'
import { usePokemonStore } from '@/stores/pokemonStore'
import PokemonTypesChips from '@/components/PokemonTypesChips.vue'

/**
 * Props du composant PokemonCard
 * @property {Object} pokemon - Objet Pokémon avec id, name, level, img, etc.
 */
const { pokemon } = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

const pokemonStore = usePokemonStore()

// Snackbar de confirmation
const showSnackbar = ref(false)
const snackbarMessage = ref('')

/**
 * Toggle le favori et affiche un snackbar de confirmation
 */
function handleToggleFavorite () {
  const wasFavorite = pokemonStore.isFavorite(pokemon)
  pokemonStore.toggleFavorite(pokemon)
  snackbarMessage.value = wasFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris'
  showSnackbar.value = true
}
</script>
