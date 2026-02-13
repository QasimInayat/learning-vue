import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/blogs',
        name: 'BlogList',
        component: () => import('./components/blog/BlogList.vue')
    },
    {
        path: '/blogs/:slug',
        name: 'BlogDetail',
        component: () => import('./components/blog/BlogDetail.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./components/auth/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./components/auth/Register.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
