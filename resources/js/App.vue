<template>
    <div class="container mx-auto p-4">
        <nav class="mb-4">
            <router-link to="/" class="mr-4 text-blue-500 hover:text-blue-700">Home</router-link>
            <router-link to="/about" class="text-blue-500 hover:text-blue-700">About</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script setup>
// Composition API script setup
</script>
