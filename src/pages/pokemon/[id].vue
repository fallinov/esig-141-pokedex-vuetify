<template>
  <v-container>
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-4"
      @click="$router.back()"
    >
      Retour
    </v-btn>

    <v-skeleton-loader
      v-if="pokemonStore.isLoading"
      type="card, article"
      max-width="800"
      class="mx-auto"
    />

    <v-alert
      v-else-if="!pokemon"
      type="error"
      variant="tonal"
    >
      Pokémon non trouvé.
    </v-alert>

    <v-card
      v-else-if="pokemon"
      max-width="800"
      class="mx-auto"
    >
      <v-img
        :src="getImageUrl(pokemon.img)"
        :alt="pokemon.name"
        height="300"
        cover
      />

      <v-card-title class="text-h4">
        {{ pokemon.name }}
      </v-card-title>

      <v-card-subtitle>
        Niveau {{ pokemon.level }}
      </v-card-subtitle>

      <v-card-text>
        <p
          v-if="pokemon.description"
          class="text-body-1 mb-4"
        >
          {{ pokemon.description }}
        </p>

        <div
          v-if="pokemon.types && pokemon.types.length"
          class="mb-4"
        >
          <strong class="mr-2">Types :</strong>
          <pokemon-types-chips :types="pokemon.types" />
        </div>

        <div v-if="pokemon.stats">
          <strong class="d-block mb-2">Statistiques :</strong>
          <pokemon-stats :stats="pokemon.stats" />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          :icon="pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline'"
          :color="pokemonStore.isFavorite(pokemon) ? 'red' : ''"
          variant="text"
          @click="pokemonStore.toggleFavorite(pokemon)"
        />

        <v-spacer />

        <v-btn
          v-if="authStore.isAuthenticated && !pokemon.official"
          color="error"
          variant="text"
          prepend-icon="mdi-delete"
          @click="showDeleteDialog = true"
        >
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog
      v-model="showDeleteDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title>Confirmer la suppression</v-card-title>
        <v-card-text>
          Êtes-vous sûr de vouloir supprimer <strong>{{ pokemon?.name }}</strong> ?
          Cette action est irréversible.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="showDeleteDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            :loading="pokemonStore.isLoading"
            @click="handleDelete"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { usePokemonStore } from '@/stores/pokemonStore'
import { useAuthStore } from '@/stores/authStore'
import { getImageUrl } from '@/utils/imageUrl'
import PokemonTypesChips from '@/components/PokemonTypesChips.vue'
import PokemonStats from '@/components/PokemonStats.vue'

const route = useRoute()
const router = useRouter()
const pokemonStore = usePokemonStore()
const authStore = useAuthStore()

const pokemon = computed(() => {
  return pokemonStore.getPokemonById(route.params.id)
})

const showDeleteDialog = ref(false)

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
})

async function handleDelete () {
  const result = await pokemonStore.deletePokemon(route.params.id)

  showDeleteDialog.value = false

  snackbar.value = {
    show: true,
    message: result.message,
    color: result.success ? 'success' : 'error',
  }

  if (result.success) {
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
}
</script>
