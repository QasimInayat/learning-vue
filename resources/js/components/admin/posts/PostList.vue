<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Posts</h1>
            <router-link to="/admin/posts/create" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                + Create Post
            </router-link>
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts.data" :key="post.id">
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <img v-if="post.image" :src="post.image" alt="Post Image" class="h-10 w-10 object-cover rounded">
                            <span v-else class="text-gray-400">No Image</span>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ post.title }}</td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span v-if="post.category" class="bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs">{{ post.category.name }}</span>
                            <span v-else class="text-gray-500">Uncategorized</span>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ post.user.name }}</td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <router-link :to="`/admin/posts/${post.id}/edit`" class="text-blue-600 hover:text-blue-900 mr-3">Edit</router-link>
                            <button @click="deletePost(post.id)" class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div v-if="posts.data && posts.data.length === 0" class="p-5 text-center text-gray-500">No posts found.</div>

            <!-- Pagination -->
            <div v-if="posts.links" class="px-5 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <div class="inline-flex mt-2 xs:mt-0">
                    <button 
                        v-for="link in posts.links" 
                        :key="link.label" 
                        @click="fetchPosts(link.url)" 
                        :disabled="!link.url"
                        v-html="link.label"
                        class="px-4 py-2 mx-1 border rounded"
                        :class="{ 'bg-blue-500 text-white': link.active, 'bg-white text-gray-700': !link.active, 'opacity-50 cursor-not-allowed': !link.url }"
                    ></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref({});

const fetchPosts = async (url = '/api/admin/posts') => {
    try {
        const response = await axios.get(url);
        posts.value = response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

const deletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
        await axios.delete(`/api/admin/posts/${id}`);
        fetchPosts();
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post.');
    }
};

onMounted(() => {
    fetchPosts();
});
</script>
