<template>
    <div>
        <h1 class="text-2xl font-bold mb-6">Users Management</h1>
        
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Joined At
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users.data" :key="user.id">
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{{ user.name }}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{{ user.email }}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{{ new Date(user.created_at).toLocaleDateString() }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <!-- Pagination Controls (Simple) -->
            <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <div class="inline-flex mt-2 xs:mt-0">
                    <button 
                        @click="fetchUsers(users.prev_page_url)" 
                        :disabled="!users.prev_page_url"
                        class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l disabled:opacity-50">
                        Prev
                    </button>
                    <button 
                        @click="fetchUsers(users.next_page_url)" 
                        :disabled="!users.next_page_url"
                        class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r disabled:opacity-50">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref({});

const fetchUsers = async (url = '/api/admin/users') => {
    if (!url) return;
    try {
        const response = await axios.get(url);
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

onMounted(() => {
    fetchUsers();
});
</script>
