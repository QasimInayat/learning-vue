<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Latest Blog Posts</h1>
        
        <div v-if="loading" class="text-center text-gray-500">Loading posts...</div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div class="p-4">
                    <h2 class="text-xl font-semibold mb-2">
                        <router-link :to="{ name: 'BlogDetail', params: { slug: post.slug } }" class="text-blue-600 hover:text-blue-800">
                            {{ post.title }}
                        </router-link>
                    </h2>
                    <p class="text-gray-600 text-sm mb-4">By {{ post.user?.name }} • {{ formatDate(post.created_at) }}</p>
                    <p class="text-gray-700 line-clamp-3">{{ post.content }}</p>
                    <div class="mt-4">
                         <router-link :to="{ name: 'BlogDetail', params: { slug: post.slug } }" class="text-blue-500 hover:underline">Read More &rarr;</router-link>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="posts.length === 0 && !loading" class="text-center text-gray-500">No posts found.</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref([]);
const loading = ref(true);

const fetchPosts = async () => {
    try {
        const response = await axios.get('/api/posts');
        posts.value = response.data.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
    fetchPosts();
});
</script>
