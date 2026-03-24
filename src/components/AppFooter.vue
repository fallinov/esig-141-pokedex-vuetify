<template>
  <!--
  Pied de page de l'application
    * <v-footer> : Composant Vuetify pour un pied de page stylisé
    * <slot> : Permet de personnaliser le contenu depuis le composant parent
  -->
  <v-footer>
    <div class="px-4 text-center w-100">
      <slot>{{ new Date().getFullYear() }} - Pokédex</slot>
    </div>
  </v-footer>
</template>

<script setup>
// Aucune logique nécessaire, le composant utilise un slot pour le contenu
</script>
