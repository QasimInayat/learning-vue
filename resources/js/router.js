import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';

const routes = [
    {
        path: '/',
        component: () => import('./layouts/PublicLayout.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: Home
            },
            {
                path: 'about',
                name: 'About',
                component: About
            },
            {
                path: 'blogs',
                name: 'BlogList',
                component: () => import('./components/blog/BlogList.vue')
            },
            {
                path: 'blogs/:slug',
                name: 'BlogDetail',
                component: () => import('./components/blog/BlogDetail.vue')
            },
            {
                path: 'featured',
                name: 'FeaturedPosts',
                component: () => import('./components/blog/FeaturedPosts.vue')
            },
            {
                path: 'latest',
                name: 'LatestPosts',
                component: () => import('./components/blog/LatestPosts.vue')
            },
            {
                path: 'login',
                name: 'Login',
                component: () => import('./components/auth/Login.vue')
            },
            {
                path: 'register',
                name: 'Register',
                component: () => import('./components/auth/Register.vue')
            }
        ]
    },
    {
        path: '/admin',
        component: () => import('./layouts/AdminLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('./components/admin/Dashboard.vue')
            },
            {
                path: 'users',
                name: 'UserList',
                component: () => import('./components/admin/users/UserList.vue')
            },
            {
                path: 'categories',
                name: 'CategoryList',
                component: () => import('./components/admin/categories/CategoryList.vue')
            },
            {
                path: 'posts',
                name: 'PostList',
                component: () => import('./components/admin/posts/PostList.vue')
            },
            {
                path: 'posts/create',
                name: 'PostCreate',
                component: () => import('./components/admin/posts/PostForm.vue')
            },
            {
                path: 'posts/:id/edit',
                name: 'PostEdit',
                component: () => import('./components/admin/posts/PostForm.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

import useAuth from './composables/useAuth';

router.beforeEach(async (to, from, next) => {
    const { user, getUser } = useAuth();
    
    if (to.meta.requiresAuth) {
        if (!user.value) {
            await getUser();
        }
        if (!user.value) {
            return next({ name: 'Login' });
        }

        // Check for Admin Access
        if (to.path.startsWith('/admin') && !user.value.is_admin) {
            alert('Access Denied: You are not an Admin.');
            return next({ name: 'Home' }); // Or Redirect to Home
        }
    }
    next();
});

export default router;
