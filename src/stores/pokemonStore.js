import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    isLoading: false,
    types: [],
    pokemons: [],
    favorites: [],
  }),

  getters: {
    totalPokemons: state => {
      return state.pokemons.length
    },

    totalFavorites: state => {
      return state.favorites.length
    },

    getTypeById: state => {
      return typeId => {
        return state.types.find(type => type.id === typeId)
      }
    },

    getPokemonById: state => {
      return pokemonId => {
        return state.pokemons.find(pokemon => pokemon.id === pokemonId)
      }
    },

    isFavorite: state => {
      return pokemon => {
        return state.favorites.includes(pokemon.id)
      }
    },

    getFavorites: state => {
      const favoritePokemons = state.favorites.map(favoriteId => {
        return state.pokemons.find(pokemon => pokemon.id === favoriteId)
      })
      return favoritePokemons.filter(pokemon => pokemon !== undefined)
    },
  },

  actions: {
    async init () {
      this.isLoading = true
      try {
        await Promise.all([
          this.fetchTypes({ withLoader: false }),
          this.fetchPokemons({ withLoader: false }),
        ])
        this.loadFavorites()
        console.log('Store initialisé')
      } catch (error) {
        console.error('Erreur lors de l\'initialisation :', error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchTypes ({ withLoader = true } = {}) {
      if (withLoader) this.isLoading = true
      try {
        const response = await api.get('/types')
        if (response.data && response.data.data) {
          this.types = response.data.data
        } else if (response.data) {
          this.types = response.data
        } else {
          this.types = []
        }
      } catch (error) {
        console.error('Erreur lors du chargement des types:', error.message)
        this.types = []
      } finally {
        if (withLoader) this.isLoading = false
      }
    },

    async fetchPokemons ({ withLoader = true } = {}) {
      if (withLoader) this.isLoading = true
      try {
        const response = await api.get('/pokemons')
        if (response.data && response.data.data) {
          this.pokemons = response.data.data
        } else if (response.data) {
          this.pokemons = response.data
        } else {
          this.pokemons = []
        }
        this.cleanupFavorites()
      } catch (error) {
        console.error('Erreur lors du chargement des Pokémon:', error.message)
        this.pokemons = []
      } finally {
        if (withLoader) this.isLoading = false
      }
    },

    loadFavorites () {
      try {
        const savedFavorites = localStorage.getItem('pokemon_favorites')
        if (savedFavorites) {
          this.favorites = JSON.parse(savedFavorites)
          console.log('Favoris chargés :', this.favorites.length, 'éléments')
        } else {
          this.favorites = []
        }
      } catch (error) {
        console.error('Erreur lors du chargement des favoris :', error)
        this.favorites = []
      }
    },

    saveFavorites () {
      try {
        localStorage.setItem('pokemon_favorites', JSON.stringify(this.favorites))
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des favoris :', error)
      }
    },

    toggleFavorite (pokemon) {
      const favoriteIndex = this.favorites.findIndex(
        favoriteId => favoriteId === pokemon.id,
      )
      if (favoriteIndex === -1) {
        this.favorites.push(pokemon.id)
      } else {
        this.favorites.splice(favoriteIndex, 1)
      }
      this.saveFavorites()
    },

    cleanupFavorites () {
      const initialCount = this.favorites.length
      this.favorites = this.favorites.filter(favoriteId => {
        return this.pokemons.some(pokemon => pokemon.id === favoriteId)
      })
      const removedCount = initialCount - this.favorites.length
      if (removedCount > 0) {
        console.log('Nettoyage :', removedCount, 'favoris obsolètes supprimés')
        this.saveFavorites()
      }
    },
  },
})
