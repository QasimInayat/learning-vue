<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <div class="w-64 bg-gray-800 text-white flex flex-col">
            <div class="p-4 text-2xl font-bold border-b border-gray-700">Admin Panel</div>
            <nav class="flex-1 p-4 space-y-2">
                <router-link to="/admin/dashboard" class="block py-2 px-4 rounded hover:bg-gray-700 transition">Dashboard</router-link>
                <router-link to="/admin/users" class="block py-2 px-4 rounded hover:bg-gray-700 transition">Users</router-link>
                <router-link to="/admin/categories" class="block py-2 px-4 rounded hover:bg-gray-700 transition">Categories</router-link>
                <router-link to="/admin/posts" class="block py-2 px-4 rounded hover:bg-gray-700 transition">Posts</router-link>
            </nav>
            <div class="p-4 border-t border-gray-700">
                <router-link to="/" class="block py-2 px-4 text-gray-400 hover:text-white transition">&larr; Back to Site</router-link>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <header class="bg-white shadow p-4 flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-800">
                    {{ $route.name }}
                </h2>
                <div class="flex items-center gap-4">
                    <span class="text-gray-600">{{ user?.name }}</span>
                    <button @click="logout" class="text-red-500 hover:text-red-700 font-medium">Logout</button>
                </div>
            </header>
            <main class="flex-1 overflow-auto p-6">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import useAuth from '../composables/useAuth';

const { user, getUser, logout } = useAuth();

onMounted(() => {
    getUser();
});
</script>
