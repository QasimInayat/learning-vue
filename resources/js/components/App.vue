<template>
  <div class="container mt-5">
    <div class="card border-primary">
      <div class="card-body">

        <h1>Hello {{ username  }} 👋</h1>
        <h5> Role: <strong>{{ role }}</strong></h5>
         <!-- <input v-model="name" class="form-control mb-3" placeholder="Enter your name" /> -->

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
import { ref, watch  } from 'vue'
import TodoList from './TodoList.vue'
import AddTodoForm from './AddTodoForm.vue'


const props = defineProps({
  username: String,
  role : String,
  tasks: Array
})


// Convert props → reactive state
const todos = ref([...props.tasks])
const username = ref(props.username)
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


watch(
  todos,
  (newTodos, oldTodos) => {
    console.log('Todos changed:', newTodos)
  },
  { deep: true }
)
</script>
