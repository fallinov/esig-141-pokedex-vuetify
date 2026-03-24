<template>
  <!--
  Barre d'application plate
    * flat supprime l'ombre sous la barre
  -->
  <v-app-bar flat>
    <!--
    Conteneur de la barre d'application
      * class="d-flex align-center" aligne les éléments verticalement au centre
    -->
    <v-container class="d-flex align-center">
      <!--
      Bouton hamburger pour le tiroir de navigation (mobile)
        * Visible uniquement sur les petits écrans grâce à d-md-none
      -->
      <v-app-bar-nav-icon
        class="d-md-none"
        @click="drawer = !drawer"
      />

      <!--
      Logo de l'application cliquable
        * image définit le chemin vers le logo (Pokeball) de l'application
        * size="64" définit la taille de l'avatar
        * @click redirige vers la page d'accueil
      -->
      <v-avatar
        class="mr-4 pa-0 cursor-pointer"
        image="@/assets/pokeball.svg"
        size="64"
        @click="$router.push('/')"
      />

      <!-- Titre de l'application affiché dans la barre -->
      <v-toolbar-title>Pokédex</v-toolbar-title>

      <!--
      Liens de navigation générés dynamiquement (desktop)
        * d-none d-md-flex : cachés sur mobile, affichés à partir de md
        * v-for parcourt chaque élément dans menuItems
      -->
      <v-btn
        v-for="link in menuItems"
        :key="link.title"
        :icon="link.icon"
        :to="link.path"
        class="d-none d-md-flex"
      />

      <!--
      Lien Ajouter (visible uniquement si connecté)
        * v-if="authStore.isAuthenticated" conditionne l'affichage
      -->
      <v-btn
        v-if="authStore.isAuthenticated"
        icon="mdi-plus-circle"
        to="/ajouter"
        class="d-none d-md-flex"
      />

      <!--
      Bouton Connexion / Déconnexion
        * Si connecté : bouton déconnexion
        * Si non connecté : bouton connexion
      -->
      <v-btn
        v-if="authStore.isAuthenticated"
        icon="mdi-logout"
        class="d-none d-md-flex"
        @click="handleLogout"
      />
      <v-btn
        v-else
        icon="mdi-login"
        to="/login"
        class="d-none d-md-flex"
      />
    </v-container>
  </v-app-bar>

  <!--
  Tiroir de navigation (mobile)
    * v-model contrôle l'ouverture/fermeture
    * temporary : le tiroir se ferme automatiquement quand on clique ailleurs
  -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
  >
    <v-list nav>
      <v-list-item
        v-for="link in menuItems"
        :key="link.title"
        :prepend-icon="link.icon"
        :title="link.title"
        :to="link.path"
        @click="drawer = false"
      />

      <!-- Lien Ajouter (mobile, si connecté) -->
      <v-list-item
        v-if="authStore.isAuthenticated"
        prepend-icon="mdi-plus-circle"
        title="Ajouter"
        to="/ajouter"
        @click="drawer = false"
      />

      <v-divider class="my-2" />

      <!-- Connexion / Déconnexion (mobile) -->
      <v-list-item
        v-if="authStore.isAuthenticated"
        prepend-icon="mdi-logout"
        title="Déconnexion"
        @click="handleLogout(); drawer = false"
      />
      <v-list-item
        v-else
        prepend-icon="mdi-login"
        title="Connexion"
        to="/login"
        @click="drawer = false"
      />
    </v-list>
  </v-navigation-drawer>

  <!--
  Snackbar de confirmation de déconnexion
  -->
  <v-snackbar
    v-model="snackbar"
    :timeout="2000"
    color="info"
  >
    Déconnexion réussie
  </v-snackbar>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

/*
Définition des éléments de menu pour la navigation
  - Chaque élément contient :
    * title : le titre du lien
    * path : le chemin de la route
    * icon : l'icône du lien
    Vous trouverez des icônes sur https://pictogrammers.com/library/mdi/
    N'oubliez pas d'ajouter le préfixe 'mdi-' devant le nom de l'icône.
*/
const menuItems = [
  { title: 'Accueil', path: '/', icon: 'mdi-pokeball' },
  { title: 'Favoris', path: '/favoris', icon: 'mdi-heart' },
  { title: 'À propos', path: '/a-propos', icon: 'mdi-information' },
]

/**
 * État du tiroir de navigation mobile
 */
const drawer = ref(false)

/**
 * État du snackbar de déconnexion
 */
const snackbar = ref(false)

/**
 * Gère la déconnexion de l'utilisateur
 * 1. Appelle authStore.logout()
 * 2. Affiche un message de confirmation
 * 3. Redirige vers la page d'accueil
 */
function handleLogout () {
  authStore.logout()
  snackbar.value = true
  router.push('/')
}
</script>
