
<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const newTodo = ref('')
</script>

<template>
  <div class="container">
    <div class="card">
        <div class="card-header">
            Todo
        </div>
        <div class="card-body">
            <h1 class="text-2xl font-bold mb-4">Todos</h1>
    <div class="row">
        <div class="col-md-5">
            <input
              v-model="newTodo"
              placeholder="New todo"
              class="border p-2 form-control"
            />
        </div>
        <div class="col-md-2">
            <button
              class="btn btn-success ml-2 px-3 py-1 bg-blue-500 text-white"
              @click="todoStore.addTodo(newTodo); newTodo = ''"
            >
              Add
            </button>
        </div>
    </div>


    <ul class="mt-4">
      <li
        v-for="todo in todoStore.todos"
        :key="todo.id"
        class="flex items-center gap-2"
      >
        <input
          type="checkbox"
          :checked="todo.done"
          @change="todoStore.toggleTodo(todo.id)"
        />
        <span :class="{ 'line-through text-gray-500': todo.done }">
          {{ todo.text }}
        </span>
        <button
          class="btn btn-sm btn-warning text-red-500 "
          @click="todoStore.removeTodo(todo.id)"
        >
          ❌
        </button>
      </li>
    </ul>

    <div class="alert alert-success mt-4 text-purple-600">
      Completed: {{ todoStore.completedCount }}
    </div>
        </div>
    </div>

  </div>
</template>
`
