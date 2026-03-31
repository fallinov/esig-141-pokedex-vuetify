<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Pokédex
      <span class="text-subtitle-1">({{ pokemonStore.totalPokemons }})</span>
    </h1>

    <v-row class="mb-4">
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

      <v-col
        cols="12"
        md="4"
        class="d-flex align-center"
      >
        <v-btn
          variant="outlined"
          :prepend-icon="sortOrder === 'asc'
            ? 'mdi-sort-alphabetical-ascending'
            : 'mdi-sort-alphabetical-descending'"
          @click="toggleSort"
        >
          Tri {{ sortOrder === 'asc' ? 'A → Z' : 'Z → A' }}
        </v-btn>
      </v-col>
    </v-row>

    <v-alert
      v-if="sortedPokemons.length === 0"
      type="info"
      variant="tonal"
      class="mb-6"
    >
      Aucun Pokémon ne correspond à votre recherche.
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="pokemon in sortedPokemons"
        :key="pokemon.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <pokemon-card :pokemon="pokemon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { usePokemonStore } from '@/stores/pokemonStore'
import PokemonCard from '@/components/PokemonCard.vue'

const pokemonStore = usePokemonStore()

const searchQuery = ref('')
const selectedType = ref(null)
const sortOrder = ref('asc')

const filteredByType = computed(() => {
  if (!selectedType.value) return pokemonStore.pokemons
  return pokemonStore.pokemons.filter(pokemon =>
    pokemon.types.includes(selectedType.value),
  )
})

const filteredBySearch = computed(() => {
  if (!searchQuery.value) return filteredByType.value
  const query = searchQuery.value.toLowerCase()
  return filteredByType.value.filter(pokemon =>
    pokemon.name.toLowerCase().includes(query),
  )
})

const sortedPokemons = computed(() => {
  return [...filteredBySearch.value].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name, 'fr')
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

function toggleSort() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>
