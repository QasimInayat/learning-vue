<template>
    <div class="container mx-auto p-4">
        <nav class="mb-4 flex justify-between items-center">
            <div>
                <router-link to="/" class="mr-4 text-blue-500 hover:text-blue-700">Home</router-link>
                <router-link to="/about" class="text-blue-500 hover:text-blue-700">About</router-link>
            </div>
            <div v-if="user" class="flex items-center gap-4">
                <span class="text-gray-700">Welcome, {{ user.name }}</span>
                <button @click="logout" class="text-red-500 hover:text-red-700">Logout</button>
            </div>
            <div v-else>
                <router-link to="/login" class="mr-4 text-blue-500 hover:text-blue-700">Login</router-link>
                <router-link to="/register" class="text-blue-500 hover:text-blue-700">Register</router-link>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import useAuth from './composables/useAuth';

const { user, getUser, logout } = useAuth();

onMounted(() => {
    getUser();
});
</script>
