import { createApp } from 'vue'
import './bootstrap';

import App from './components/App.vue';

const appElement = document.getElementById('app')

createApp(App, {
    username: JSON.parse(appElement.dataset.username),
    role: JSON.parse(appElement.dataset.role),
    tasks: JSON.parse(appElement.dataset.tasks),
}).mount('#app')
