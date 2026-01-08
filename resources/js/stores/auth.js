import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loggedIn: false
  }),

  getters: {
    username: (state) => state.user?.name ?? 'Guest'
  },

  actions: {
    login(user) {
      this.user = user
      this.loggedIn = true
    },

    logout() {
      this.user = null
      this.loggedIn = false
    }
  }
})
