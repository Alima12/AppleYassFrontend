import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
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
    component: Home,
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
  {
    path: '/search',
    name: 'SearchPage',
    component: Search
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


 
router.beforeEach(async (to, from, next) => {
  let isAdmin = await store.getters.isAdmin;
  if (to.matched.some(record => record.meta.Authenticated)) {
    if (!localStorage.getItem("token")) {
      next({
        path: '/auth/login',
      })
    } else {
      if (to.matched.some(record => record.meta.AdminRequiered)) {
        if (isAdmin) {
          next()
        } else {
          next({ path: '/panel' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.NotAuthenticated)) {
    if (localStorage.getItem('token') == null) {
      next()
    } else {
      next({ name: 'Panel' })
    }
  } else{
    next()
  }
})


export default router
