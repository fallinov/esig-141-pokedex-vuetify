<template>
  <div>
    <div
      v-for="(value, key) in stats"
      :key="key"
      class="mb-2"
    >
      <div class="d-flex justify-space-between text-caption mb-1">
        <span>{{ labels[key] || key }}</span>
        <span>{{ value }}</span>
      </div>

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
defineProps({
  stats: {
    type: Object,
    required: true,
  },
})

const labels = {
  hp: 'Points de vie',
  attack: 'Attaque',
  defense: 'Défense',
  speed: 'Vitesse',
}

function getStatColor (value) {
  if (value >= 100) return 'green'
  if (value >= 60) return 'orange'
  return 'red'
}
</script>
