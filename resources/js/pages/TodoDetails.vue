<script setup>
import { useRoute } from 'vue-router'
import { useTodoStore } from '../stores/todo'

const route = useRoute()
const todoStore = useTodoStore()

const todoId = Number(route.params.id)
const todo = todoStore.todos.find(t => t.id === todoId)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Todo Details</h1>

    <p v-if="todo">
      <strong>Task:</strong> {{ todo.text }} <br />
      <strong>Status:</strong> {{ todo.done ? 'Done' : 'Pending' }}
    </p>

    <p v-else class="text-red-500">
      Todo not found
    </p>
  </div>
</template>
