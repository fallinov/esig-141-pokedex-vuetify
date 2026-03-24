/**
 * Configuration du routeur
 *
 * Routes automatiques depuis `./src/pages/*.vue`
 * Guards d'authentification pour protéger certaines routes
 */
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/**
 * Routes qui nécessitent d'être authentifié
 * Si l'utilisateur n'est pas connecté, il est redirigé vers /login
 */
const protectedRoutes = ['/ajouter']

/**
 * Guard de navigation globale
 * Vérifie l'authentification avant chaque changement de route
 *
 * @param {Object} to - La route de destination
 * @param {Object} from - La route d'origine
 */
router.beforeEach((to) => {
  const authStore = useAuthStore()

  // Vérifier si la route nécessite une authentification
  if (protectedRoutes.includes(to.path) && !authStore.isAuthenticated) {
    // Rediriger vers la page de connexion
    return { path: '/login' }
  }
})

// Workaround pour https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
