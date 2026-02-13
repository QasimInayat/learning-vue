<template>
    <div class="container mx-auto p-6 max-w-4xl">
        <div v-if="loading" class="text-center text-gray-500">Loading post...</div>

        <div v-else-if="post" class="bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
            
            <div class="flex items-center text-gray-600 text-sm mb-6 pb-6 border-b">
                <span>By {{ post.user?.name }}</span>
                <span class="mx-2">•</span>
                <span>{{ formatDate(post.created_at) }}</span>
            </div>

            <div class="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
                {{ post.content }}
            </div>

            <div class="mt-8 pt-6 border-t">
                <router-link to="/blogs" class="text-blue-500 hover:text-blue-700">&larr; Back to Blogs</router-link>
            </div>
        </div>

        <div v-else class="text-center text-red-500">Post not found.</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const post = ref(null);
const loading = ref(true);

const fetchPost = async () => {
    try {
        const response = await axios.get(`/api/posts/${route.params.slug}`);
        post.value = response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
    fetchPost();
});
</script>
