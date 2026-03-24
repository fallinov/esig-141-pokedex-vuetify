<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Ajouter un Pokémon
    </h1>

    <!--
    Formulaire d'ajout de Pokémon
      * v-form avec ref pour accéder à la méthode validate()
      * @submit.prevent empêche le rechargement de la page lors de la soumission
      * max-width="600" et mx-auto centrent le formulaire
    -->
    <v-card
      max-width="600"
      class="mx-auto pa-6"
    >
      <v-form
        ref="formRef"
        @submit.prevent="submitForm"
      >
        <!--
        Champ nom du Pokémon
          * :rules applique les règles de validation
          * Le champ est obligatoire et doit contenir au moins 2 caractères
        -->
        <v-text-field
          v-model="form.name"
          label="Nom du Pokémon"
          :rules="nameRules"
          variant="outlined"
          class="mb-2"
        />

        <!--
        Champ niveau du Pokémon
          * type="number" restreint la saisie aux chiffres
          * min="1" et max="100" définissent la plage autorisée
        -->
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

        <!--
        Sélection des types
          * multiple permet de sélectionner plusieurs types
          * chips affiche les types sélectionnés sous forme de puces
        -->
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

        <!--
        Champ description
          * v-textarea permet une saisie multiligne
          * rows="3" définit la hauteur initiale
        -->
        <v-textarea
          v-model="form.description"
          label="Description"
          rows="3"
          variant="outlined"
          class="mb-2"
        />

        <!--
        Boutons d'action
          * Annuler ramène à la page d'accueil
          * Ajouter soumet le formulaire
        -->
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

    <!--
    Snackbar de confirmation
      * Affiche un message de succès ou d'erreur après la soumission
      * timeout="3000" ferme automatiquement après 3 secondes
    -->
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

/**
 * Référence vers le composant v-form
 * Permet d'appeler formRef.validate() pour vérifier les règles
 */
const formRef = ref(null)

/**
 * Données du formulaire
 * Chaque propriété correspond à un champ du formulaire
 */
const form = ref({
  name: '',
  level: 1,
  types: [],
  description: '',
})

/**
 * État du snackbar (message de confirmation)
 */
const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
})

/**
 * Règles de validation pour le champ nom
 * Chaque règle est une fonction qui retourne true (valide) ou un message d'erreur
 */
const nameRules = [
  v => !!v || 'Le nom est obligatoire',
  v => v.length >= 2 || 'Le nom doit contenir au moins 2 caractères',
]

/**
 * Règles de validation pour le champ niveau
 */
const levelRules = [
  v => !!v || 'Le niveau est obligatoire',
  v => (v >= 1 && v <= 100) || 'Le niveau doit être entre 1 et 100',
]

/**
 * Règles de validation pour la sélection des types
 */
const typesRules = [
  v => v.length > 0 || 'Sélectionnez au moins un type',
]

/**
 * Soumission du formulaire
 * 1. Valide le formulaire avec les règles définies
 * 2. Envoie les données au store (qui fait la requête POST)
 * 3. Affiche un message de confirmation
 * 4. Redirige vers la page d'accueil si succès
 */
async function submitForm () {
  // Étape 1 : Valider le formulaire
  const { valid } = await formRef.value.validate()
  if (!valid) return

  // Étape 2 : Envoyer les données au store
  const result = await pokemonStore.addPokemon(form.value)

  // Étape 3 : Afficher le résultat
  snackbar.value = {
    show: true,
    message: result.message,
    color: result.success ? 'success' : 'error',
  }

  // Étape 4 : Rediriger si succès
  if (result.success) {
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
}
</script>
