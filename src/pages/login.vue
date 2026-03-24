<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Connexion
    </h1>

    <!--
    Formulaire de connexion
      * Centré avec max-width et mx-auto
      * @submit.prevent empêche le rechargement de la page
    -->
    <v-card
      max-width="400"
      class="mx-auto pa-6"
    >
      <v-form
        ref="formRef"
        @submit.prevent="submitLogin"
      >
        <!--
        Champ email
          * type="email" active la validation HTML5 du navigateur
          * :rules applique les règles de validation Vue
        -->
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          :rules="emailRules"
          prepend-inner-icon="mdi-email"
          variant="outlined"
          class="mb-2"
        />

        <!--
        Champ mot de passe
          * :type bascule entre "password" (caché) et "text" (visible)
          * Le bouton oeil permet de montrer/cacher le mot de passe
        -->
        <v-text-field
          v-model="password"
          label="Mot de passe"
          :type="showPassword ? 'text' : 'password'"
          :rules="passwordRules"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          variant="outlined"
          class="mb-2"
          @click:append-inner="showPassword = !showPassword"
        />

        <!--
        Message d'erreur si la connexion échoue
        -->
        <v-alert
          v-if="errorMessage"
          type="error"
          variant="tonal"
          class="mb-4"
        >
          {{ errorMessage }}
        </v-alert>

        <!--
        Bouton de connexion
          * type="submit" soumet le formulaire
          * block prend toute la largeur
        -->
        <v-btn
          type="submit"
          color="primary"
          block
          size="large"
        >
          Se connecter
        </v-btn>
      </v-form>

      <!--
      Aide pour l'utilisateur (credentials de test)
        * Affiché en petit sous le formulaire
      -->
      <v-card-text class="text-center text-caption mt-4">
        <strong>Compte de test :</strong><br>
        sacha@pokemon.com / pika
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const formRef = ref(null)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

/**
 * Règles de validation pour l'email
 */
const emailRules = [
  v => !!v || 'L\'email est obligatoire',
  v => /.+@.+\..+/.test(v) || 'L\'email doit être valide',
]

/**
 * Règles de validation pour le mot de passe
 */
const passwordRules = [
  v => !!v || 'Le mot de passe est obligatoire',
]

/**
 * Soumission du formulaire de connexion
 * 1. Valide le formulaire
 * 2. Tente la connexion via authStore.login()
 * 3. Redirige vers l'accueil si succès, affiche l'erreur sinon
 */
async function submitLogin () {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  errorMessage.value = ''

  const result = authStore.login(email.value, password.value)

  if (result.success) {
    router.push('/')
  } else {
    errorMessage.value = result.message
  }
}
</script>
