<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Categories</h1>
            <button @click="openModal()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                + Add Category
            </button>
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Slug</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category in categories" :key="category.id">
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ category.name }}</td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ category.slug }}</td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <button @click="openModal(category)" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                            <button @click="deleteCategory(category.id)" class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="categories.length === 0" class="p-5 text-center text-gray-500">No categories found.</div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div class="bg-white p-5 rounded-lg shadow-xl w-96">
                <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Category' : 'New Category' }}</h2>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input v-model="form.name" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Slug</label>
                    <input v-model="form.slug" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="flex justify-end">
                    <button @click="closeModal" class="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button @click="saveCategory" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const categories = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const form = ref({ id: null, name: '', slug: '' });

const fetchCategories = async () => {
    try {
        const response = await axios.get('/api/admin/categories');
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const openModal = (category = null) => {
    if (category) {
        isEditing.value = true;
        form.value = { ...category };
    } else {
        isEditing.value = false;
        form.value = { id: null, name: '', slug: '' };
    }
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const saveCategory = async () => {
    try {
        if (isEditing.value) {
            await axios.put(`/api/admin/categories/${form.value.id}`, form.value);
        } else {
            await axios.post('/api/admin/categories', form.value);
        }
        closeModal();
        fetchCategories();
    } catch (error) {
        console.error('Error saving category:', error);
        alert('Failed to save category.');
    }
};

const deleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
        await axios.delete(`/api/admin/categories/${id}`);
        fetchCategories();
    } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category.');
    }
};


onMounted(() => {
    fetchCategories();
});
</script>
