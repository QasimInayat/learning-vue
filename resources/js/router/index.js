
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Todos from '../pages/Todos.vue'
import About from '../pages/About.vue'
import TodoDetails from '../pages/TodoDetails.vue'
import Profile from '../pages/Profile.vue'
import { isAuthenticated } from '../auth'



const routes = [
  { path: '/', component: Home },
  { path: '/todos', component: Todos },
  { path: '/todos/:id', component: TodoDetails },
  { path: '/about', component: About },
  { path: '/profile/:username', component: Profile }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/todos') && !isAuthenticated()) {
    next('/')
  } else {
    next()
  }
})
