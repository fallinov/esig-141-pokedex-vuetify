<template>
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

defineProps({
  types: {
    type: Array,
    required: true,
  },
})

const pokemonStore = usePokemonStore()
</script>
