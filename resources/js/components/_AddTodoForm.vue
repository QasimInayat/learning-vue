<template>
  <div class="row mt-4">
    <div class="col-md-8">
      <input
        v-model="task"
        @keyup.enter="submit"
        type="text"
        class="form-control"
        placeholder="Please enter a new task"
      />
    </div>

    <div class="col-md-4">
      <button @click="submit" class="btn btn-success btn-sm">
        ADD NEW TASK
      </button>
      &nbsp;
      <button @click="$emit('clear')" class="btn btn-danger btn-sm">
        CLEAR ALL TASKS
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const task = ref('')

const emit = defineEmits(['add', 'clear'])

function submit() {
  if (!task.value.trim()) return
  emit('add', task.value)
  task.value = ''
}
</script>
