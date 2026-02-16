<template>
    <div>
        <h1 class="text-2xl font-bold mb-6">{{ isEditing ? 'Edit Post' : 'Create Post' }}</h1>

        <div class="bg-white rounded-lg shadow p-6">
            <form @submit.prevent="savePost" class="space-y-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input v-model="form.title" @input="generateSlug" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>

                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Slug</label>
                    <input v-model="form.slug" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>

                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select v-model="form.category_id" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">Select Category</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>

                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Current Image</label>
                     <img v-if="currentImage" :src="currentImage" class="mb-2 h-32 w-32 object-cover rounded">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
                    <input @change="handleImagePayload" type="file" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>

                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Content</label>
                    <textarea v-model="form.content" rows="10" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
                </div>

                <div class="flex justify-end gap-2">
                    <router-link to="/admin/posts" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</router-link>
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const isEditing = ref(false);
const categories = ref([]);
const currentImage = ref(null);

const form = ref({
    title: '',
    slug: '',
    category_id: '',
    content: '',
    image: null
});

const generateSlug = () => {
    form.value.slug = form.value.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const handleImagePayload = (e) => {
    form.value.image = e.target.files[0];
};

const fetchCategories = async () => {
    try {
        const response = await axios.get('/api/admin/categories');
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const fetchPost = async (id) => {
    try {
        const response = await axios.get(`/api/admin/posts/${id}`);
        const post = response.data;
        form.value.title = post.title;
        form.value.slug = post.slug;
        form.value.category_id = post.category_id;
        form.value.content = post.content;
        currentImage.value = post.image;
    } catch (error) {
        console.error('Error fetching post:', error);
    }
};

const savePost = async () => {
    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('slug', form.value.slug);
    formData.append('content', form.value.content);
    if (form.value.category_id) formData.append('category_id', form.value.category_id);
    if (form.value.image instanceof File) formData.append('image', form.value.image);

    try {
        if (isEditing.value) {
            formData.append('_method', 'PUT'); // Laravel requirement for form-data PUT
            await axios.post(`/api/admin/posts/${route.params.id}`, formData);
        } else {
            await axios.post('/api/admin/posts', formData);
        }
        router.push('/admin/posts');
    } catch (error) {
        console.error('Error saving post:', error);
        alert('Failed to save post.');
    }
};

onMounted(() => {
    fetchCategories();
    if (route.params.id) {
        isEditing.value = true;
        fetchPost(route.params.id);
    }
});
</script>
