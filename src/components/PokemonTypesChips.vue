<template>
  <!--
  Puces colorées des types d'un Pokémon
    * Composant réutilisable qui affiche les types sous forme de chips
    * Chaque chip a la couleur associée au type
  -->
  <div class="d-inline-flex ga-1 flex-wrap">
    <v-chip
      v-for="typeId in types"
      :key="typeId"
      :color="pokemonStore.getTypeById(typeId)?.color"
      size="small"
    >
      {{ pokemonStore.getTypeById(typeId)?.name || 'Inconnu' }}
    </v-chip>
  </div>
</template>

<script setup>
import { usePokemonStore } from '@/stores/pokemonStore'

/**
 * Props du composant PokemonTypesChips
 * @property {Array<number>} types - Liste des IDs de types du Pokémon
 */
defineProps({
  types: {
    type: Array,
    required: true,
  },
})

const pokemonStore = usePokemonStore()
</script>
