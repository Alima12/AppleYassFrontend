import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import userRoutes from '@/modules/User/routes'
import cartRoutes from '@/modules/Cart/routes'
import productRoutes from '@/modules/Product/routes'
import panel from '@/modules/Panel/routes'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/category/:code',
    name: 'SingleCategory',
    component: Category
  },
  ...cartRoutes,
  ...productRoutes,
  ...userRoutes,
  ...panel,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
