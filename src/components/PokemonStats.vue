<template>
  <!--
  Barres de progression pour les statistiques d'un Pokémon
    * Affiche HP, Attaque, Défense et Vitesse avec des couleurs dynamiques
    * La couleur change selon la valeur de la statistique
  -->
  <div>
    <div
      v-for="(value, key) in stats"
      :key="key"
      class="mb-2"
    >
      <!--
      Label et valeur de la statistique
        * justify-space-between place le nom à gauche et la valeur à droite
      -->
      <div class="d-flex justify-space-between text-caption mb-1">
        <span>{{ labels[key] || key }}</span>
        <span>{{ value }}</span>
      </div>

      <!--
      Barre de progression
        * :model-value définit la valeur actuelle
        * :max="150" définit la valeur maximale (les stats Pokémon montent rarement au-dessus)
        * :color change selon la valeur
        * height="8" et rounded pour un style arrondi
      -->
      <v-progress-linear
        :model-value="value"
        :max="150"
        :color="getStatColor(value)"
        height="8"
        rounded
      />
    </div>
  </div>
</template>

<script setup>
/**
 * Props du composant PokemonStats
 * @property {Object} stats - Objet { hp, attack, defense, speed }
 */
defineProps({
  stats: {
    type: Object,
    required: true,
  },
})

/**
 * Labels lisibles pour chaque statistique
 */
const labels = {
  hp: 'Points de vie',
  attack: 'Attaque',
  defense: 'Défense',
  speed: 'Vitesse',
}

/**
 * Retourne une couleur selon la valeur de la statistique
 * - Vert si >= 100 (excellent)
 * - Orange si >= 60 (moyen)
 * - Rouge si < 60 (faible)
 * @param {number} value - Valeur de la statistique
 * @returns {string} Nom de couleur Vuetify
 */
function getStatColor (value) {
  if (value >= 100) return 'green'
  if (value >= 60) return 'orange'
  return 'red'
}
</script>
