<template>
  <v-app-bar flat>
    <v-container class="d-flex align-center">
      <v-app-bar-nav-icon
        class="d-md-none"
        @click="drawer = !drawer"
      />

      <v-avatar
        class="mr-4 pa-0 cursor-pointer"
        image="@/assets/pokeball.svg"
        size="64"
        @click="$router.push('/')"
      />

      <v-toolbar-title>Pokédex</v-toolbar-title>

      <v-btn
        v-for="link in menuItems"
        :key="link.title"
        :icon="link.icon"
        :to="link.path"
        class="d-none d-md-flex"
      />

      <v-btn
        v-if="authStore.isAuthenticated"
        icon="mdi-plus-circle"
        to="/ajouter"
        class="d-none d-md-flex"
      />

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

      <v-list-item
        v-if="authStore.isAuthenticated"
        prepend-icon="mdi-plus-circle"
        title="Ajouter"
        to="/ajouter"
        @click="drawer = false"
      />

      <v-divider class="my-2" />

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

const menuItems = [
  { title: 'Accueil', path: '/', icon: 'mdi-pokeball' },
  { title: 'Favoris', path: '/favoris', icon: 'mdi-heart' },
  { title: 'À propos', path: '/a-propos', icon: 'mdi-information' },
]

const drawer = ref(false)
const snackbar = ref(false)

function handleLogout () {
  authStore.logout()
  snackbar.value = true
  router.push('/')
}
</script>
