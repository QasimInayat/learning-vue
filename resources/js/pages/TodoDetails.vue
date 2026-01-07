<template>
  <div>
    <h1 class="text-2xl font-bold">Todo Details</h1>
    <p>Todo ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>
