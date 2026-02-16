<template>
    <div class="p-6">
        <h1 class="text-3xl font-bold mb-4">Welcome to Your Vue 3 + Laravel App</h1>
        <p class="text-gray-600 mb-8">This is the Home component.</p>
        
        <!-- Here we are using FeaturedPosts as an embedded component (Widget approach) -->
        <LatestPosts />
        <FeaturedPosts />

    </div>
</template>

<script setup>
import FeaturedPosts from './blog/FeaturedPosts.vue';
import LatestPosts from './blog/LatestPosts.vue';

</script>

