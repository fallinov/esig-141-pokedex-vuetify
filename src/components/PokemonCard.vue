<template>
  <v-card
    class="pokemon-card"
    :to="`/pokemon/${pokemon.id}`"
    hover
  >
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

    <v-card-title>{{ pokemon.name }}</v-card-title>
    <v-card-subtitle>Niveau {{ pokemon.level }}</v-card-subtitle>

    <v-card-actions>
      <v-spacer />
      <v-btn
        :icon="pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline'"
        :color="pokemonStore.isFavorite(pokemon) ? 'red' : ''"
        variant="text"
        @click.stop.prevent="handleToggleFavorite()"
      />
    </v-card-actions>

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

const { pokemon } = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

const pokemonStore = usePokemonStore()

const showSnackbar = ref(false)
const snackbarMessage = ref('')

function handleToggleFavorite() {
  const wasFavorite = pokemonStore.isFavorite(pokemon)
  pokemonStore.toggleFavorite(pokemon)
  snackbarMessage.value = wasFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris'
  showSnackbar.value = true
}
</script>
