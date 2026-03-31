<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Ajouter un Pokémon
    </h1>

    <v-card
      max-width="600"
      class="mx-auto pa-6"
    >
      <v-form
        ref="formRef"
        @submit.prevent="submitForm"
      >
        <v-text-field
          v-model="form.name"
          label="Nom du Pokémon"
          :rules="nameRules"
          variant="outlined"
          class="mb-2"
        />

        <v-text-field
          v-model.number="form.level"
          label="Niveau"
          type="number"
          :rules="levelRules"
          min="1"
          max="100"
          variant="outlined"
          class="mb-2"
        />

        <v-select
          v-model="form.types"
          :items="pokemonStore.types"
          item-title="name"
          item-value="id"
          label="Types"
          :rules="typesRules"
          multiple
          chips
          variant="outlined"
          class="mb-2"
        />

        <v-textarea
          v-model="form.description"
          label="Description"
          rows="3"
          variant="outlined"
          class="mb-2"
        />

        <div class="d-flex justify-end ga-2">
          <v-btn
            variant="text"
            to="/"
          >
            Annuler
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            :loading="pokemonStore.isLoading"
          >
            Ajouter
          </v-btn>
        </div>
      </v-form>
    </v-card>

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

const pokemonStore = usePokemonStore()
const router = useRouter()

const formRef = ref(null)

const form = ref({
  name: '',
  level: 1,
  types: [],
  description: '',
})

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
})

const nameRules = [
  v => !!v || 'Le nom est obligatoire',
  v => v.length >= 2 || 'Le nom doit contenir au moins 2 caractères',
]

const levelRules = [
  v => !!v || 'Le niveau est obligatoire',
  v => (v >= 1 && v <= 100) || 'Le niveau doit être entre 1 et 100',
]

const typesRules = [
  v => v.length > 0 || 'Sélectionnez au moins un type',
]

async function submitForm () {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  const result = await pokemonStore.addPokemon(form.value)

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
