import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import userRoutes from '@/modules/User/routes'
import cartRoutes from '@/modules/Cart/routes'
import productRoutes from '@/modules/Product/routes'

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
  ...cartRoutes,
  ...productRoutes,
  ...userRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
