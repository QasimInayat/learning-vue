<template>
  <div class="mt-4">
    <h3 class="text-primary">
      <strong><u>MY TODO LIST</u></strong>
    </h3>

    <TodoItem
      v-for="(todo, index) in todos"
      :key="todo.id"
      :todo="todo"
      @remove="emit('remove', index)"
      @update="emit('update', index, $event)"
    />

    <div class="alert alert-warning mt-4">
      Completed Tasks : {{ completedCount }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TodoItem from './TodoItem.vue'

const props = defineProps({
  todos: Array
})

const emit = defineEmits(['remove', 'update'])

const completedCount = computed(() =>
  props.todos.filter(todo => todo.done).length
)
</script>
