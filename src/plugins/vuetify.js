/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

/**
 * Configuration Vuetify avec thème personnalisé Pokémon
 *
 * Le thème 'dark' est défini par défaut avec des couleurs inspirées de l'univers Pokémon :
 * - primary : rouge Pokéball
 * - secondary : bleu nuit
 * - accent : jaune Pikachu
 * - error : rouge vif
 * - success : vert Bulbizarre
 */
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#E53935',
          secondary: '#1A237E',
          accent: '#FFD600',
          error: '#FF5252',
          success: '#4CAF50',
          warning: '#FB8C00',
          info: '#2196F3',
        },
      },
    },
  },
})
