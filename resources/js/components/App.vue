<template>
  <div class="container mt-5">
    <div class="card border-primary">
      <div class="card-body">

        <h1>Hello {{ name }} 👋</h1>
        <input v-model="name" class="form-control mb-3" placeholder="Enter your name" />

            <TodoList
                :todos="todos"
                @remove="removeTask"
                @update="updateTask"
            />

            <AddTodoForm
                @add="addTask"
                @clear="clearAllTasks"
            />

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TodoList from './TodoList.vue'
import AddTodoForm from './AddTodoForm.vue'

const todos = ref([
  { id: 1, text: 'Arrive office at 10:00 AM', done: true },
  { id: 2, text: 'Import data to new Database', done: false },
  { id: 3, text: 'Contact Us Form', done: true }
])

function addTask(text) {
  todos.value.push({
    id: Date.now(),
    text,
    done: false
  })
}

function removeTask(index) {
  todos.value.splice(index, 1)
}

function updateTask(index, newText) {
  todos.value[index].text = newText
}

function clearAllTasks() {
  todos.value = []
}
</script>
