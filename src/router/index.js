import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import userRoutes from '@/modules/User/routes'
import cartRoutes from '@/modules/Cart/routes'
import productRoutes from '@/modules/Product/routes'
import panel from '@/modules/Panel/routes'
import store from '../store'

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


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.loginRequired)) {
    if (store.state.user.isAuthenticated) {
      next()
    } else {
      next("/login")
    }
  } else if (to.matched.some(record => record.meta.loginRedirect)) {
    if (!store.state.user.isAuthenticated) {
      next()
    } else {
      next("/profile")
    }
  } else {
    
    next()
  }
})
export default router
