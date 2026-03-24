<template>
  <!--
  Conteneur principal de l'application utilisant Vuetify
    * <v-app> est l'enveloppe principale pour l'intégration des composants Vuetify
  -->
  <v-app>
    <!--
    Menu principal
      * Affiche la barre de navigation principale (header)
      * Inclut le composant personnalisé AppHeader créé dans le fichier `src/components/AppHeader.vue`
    -->
    <app-header />

    <!--
    Section principale de l'application
      * <v-main> définit le conteneur principal pour afficher le contenu de l'application
      * <router-view> est une zone de rendu dynamique utilisée par Vue Router
        pour afficher les composants des routes actuelles
    -->
    <v-main>
      <router-view />
    </v-main>

    <!--
    Pied de page de l'application
      * Composant AppFooter réutilisable avec un slot par défaut
    -->
    <app-footer />
  </v-app>
</template>

<script setup>
// Importation des composants de layout
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
// Importation du lifecycle hook `onMounted` pour exécuter du code après que le composant a été monté
import { onMounted } from 'vue'
// Importation des magasins d'état pour l'authentification et les Pokémon
import { useAuthStore } from '@/stores/authStore'
import { usePokemonStore } from '@/stores/pokemonStore'

// Actions à effectuer après le montage du composant (onMounted)
onMounted(async () => {
  // Récupération du magasin d'Authentification
  const authStore = useAuthStore()
  // Récupération du token d'authentification depuis le localStorage
  authStore.loadToken()

  // Récupération du magasin des Pokémon
  const pokemonStore = usePokemonStore()
  await pokemonStore.init()
})
</script>
