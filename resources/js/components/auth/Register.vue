<template>
    <div class="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
        <form @submit.prevent="handleRegister">
            <div class="mb-4">
                <label class="block text-gray-700">Name</label>
                <input v-model="form.name" type="text" class="w-full border p-2 rounded" required>
                <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name[0] }}</span>
            </div>
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
            <div class="mb-4">
                <label class="block text-gray-700">Confirm Password</label>
                <input v-model="form.password_confirmation" type="password" class="w-full border p-2 rounded" required>
            </div>
            <button type="submit" class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Register</button>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import useAuth from '../../composables/useAuth';

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const { register, errors } = useAuth();

const handleRegister = async () => {
    await register({ ...form });
};
</script>
