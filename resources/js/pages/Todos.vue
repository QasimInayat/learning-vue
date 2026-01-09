<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const newTodo = ref('')

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<template>
  <div class="container">
    <div class="card">
        <div class="card-head">
            <h1 class="text-2xl font-bold p-5">Todos</h1>
        </div>
        <div class="card-body p-5">
            <p v-if="todoStore.loading">Loading...</p>
            <p v-if="todoStore.error" class="text-red-500">
            {{ todoStore.error }}
            </p>

            <ul>
                <li v-for="todo in todoStore.todos" :key="todo.id">
                    {{ todo.text }}
                </li>
            </ul>
            <div class="row">
                <div class="col-md-5">
                    <input v-model="newTodo" class="form-control" />
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary" @click="todoStore.addTodo(newTodo)">
                    Add
                    </button>
                </div>
            </div>
        </div>
    </div>


  </div>
</template>
