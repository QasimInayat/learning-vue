<template>
    <div class="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="mb-4">
                <label class="block text-gray-700">Email</label>
                <input v-model="form.email" type="email" class="w-full border p-2 rounded" required>
                <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email[0] }}</span>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Password</label>
                <input v-model="form.password" type="password" class="w-full border p-2 rounded" required>
                <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password[0] }}</span>
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import useAuth from '../../composables/useAuth';

const form = reactive({
    email: '',
    password: ''
});

const { login, errors } = useAuth();

const handleLogin = async () => {
    await login({ ...form });
};
</script>
