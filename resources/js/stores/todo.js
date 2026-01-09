import { defineStore } from 'pinia'
import http from '../services/http'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchTodos() {
      this.loading = true
      try {
        const res = await http.get('/todos')
        this.todos = res.data
      } catch (e) {
        this.error = 'Failed to load todos'
      } finally {
        this.loading = false
      }
    },

    async addTodo(text) {
      try {
        const res = await http.post('/todos', { text })
        this.todos.push(res.data)
      } catch (e) {
        this.error = 'Failed to add todo'
      }
    }
  }
})
