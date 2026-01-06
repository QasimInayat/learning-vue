<template>
  <div class="row align-items-center mb-4 mt-5">
    <div class="col-md-1">
      <input
        type="checkbox"
        class="form-check-input"
        v-model="todo.done"
        :disabled="isEditing"
      />
    </div>

    <div class="col-md-7">
      <!-- VIEW MODE -->
      <span
        v-if="!isEditing"
        class="alert"
        :class="todo.done ? 'alert-success' : 'alert-danger'"
      >
        {{ todo.text }}
      </span>

      <!-- EDIT MODE -->
      <input
        v-else
        v-model="editedText"
        class="form-control"
        @keyup.enter="save"
        @keyup.esc="cancel"
      />
    </div>

    <div class="col-md-4">
      <!-- VIEW BUTTONS -->
      <template v-if="!isEditing">
        <button
          class="btn btn-primary btn-sm me-2"
          :disabled="todo.done"
          @click="startEdit"
        >
          Edit
        </button>

        <button
          class="btn btn-danger btn-sm"
          :disabled="todo.done"
          @click="$emit('remove')"
        >
          Remove
        </button>
      </template>

      <!-- EDIT BUTTONS -->
      <template v-else>
        <button class="btn btn-success btn-sm me-2" @click="save">
          Save
        </button>
        <button class="btn btn-secondary btn-sm" @click="cancel">
          Cancel
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'remove'])

const isEditing = ref(false)
const editedText = ref('')

function startEdit() {
  isEditing.value = true
  editedText.value = props.todo.text
}

function save() {
  if (!editedText.value.trim()) return
  emit('update', editedText.value)
  isEditing.value = false
}

function cancel() {
  isEditing.value = false
  editedText.value = props.todo.text
}
</script>
