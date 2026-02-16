<template>
    <div class="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 class="text-2xl font-bold mb-4 text-blue-800">Featured Posts</h2>
        
        <div v-if="loading" class="text-center text-gray-500">Loading featured posts...</div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="post in posts" :key="post.id" class="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
                <h3 class="font-bold text-lg mb-2">
                    <router-link :to="{ name: 'BlogDetail', params: { slug: post.slug } }" class="text-blue-600 hover:text-blue-800">
                        {{ post.title }}
                    </router-link>
                </h3>
                <p class="text-sm text-gray-600 mb-2">By {{ post.user?.name }}</p>
                <p class="text-gray-500 text-sm line-clamp-2">{{ post.content }}</p>
                
                <router-link :to="{ name: 'BlogDetail', params: { slug: post.slug } }" class="text-xs text-blue-500 hover:underline mt-2 inline-block">
                    Read Article &rarr;
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref([]);
const loading = ref(true);

const fetchFeaturedPosts = async () => {
    try {
        const response = await axios.get('/api/posts/featured');
        posts.value = response.data;
    } catch (error) {
        console.error('Error fetching featured posts:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchFeaturedPosts();
});
</script>
