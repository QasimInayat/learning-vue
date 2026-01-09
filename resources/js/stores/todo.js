
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [
            { id: 1, text: 'Learn Vue', done: false },
            { id: 2, text: 'Learn Pinia', done: true }
        ]
    }),

    getters: {
        completedCount: (state) =>
            state.todos.filter(todo => todo.done).length
    },

    actions: {
        addTodo(text) {
            this.todos.push({
                id: Date.now(),
                text,
                done: false
            })
        },

        removeTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id)
        },

        toggleTodo(id) {
            const todo = this.todos.find(t => t.id === id)
            if (todo) todo.done = !todo.done
        }
    }
})
