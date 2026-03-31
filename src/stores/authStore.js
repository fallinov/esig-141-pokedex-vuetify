import { defineStore } from 'pinia'
import { setAuthToken } from '@/plugins/axios'

const utilisateurFactice = {
  email: 'sacha@pokemon.com',
  name: 'Sacha Ketchum',
}

const passwordFactice = 'pika'
const tokenFactice = '0b042934e5df02c9786efb364d946e64'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    login (email, password) {
      if (email === utilisateurFactice.email && password === passwordFactice) {
        this.user = utilisateurFactice
        this.token = tokenFactice
        setAuthToken(this.token)
        localStorage.setItem('token', this.token)
        return { success: true, message: 'Connexion réussie' }
      } else {
        this.user = null
        this.token = null
        setAuthToken(null)
        localStorage.removeItem('token')
        return { success: false, message: 'Mauvais email ou mot de passe !' }
      }
    },

    logout () {
      this.user = null
      this.token = null
      setAuthToken(null)
      localStorage.removeItem('token')
      return { success: true, message: 'Déconnexion réussie' }
    },

    loadToken () {
      const token = localStorage.getItem('token')
      if (token) {
        this.user = utilisateurFactice
        this.token = token
        setAuthToken(token)
      }
    },
  },

  getters: {
    isAuthenticated: state => !!state.token,
  },
})
