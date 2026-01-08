<template>
  <div>
    <h1 class="text-2xl font-bold">Profile</h1>
    <p>Hello: {{ username }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const username = route.params.username
</script>
