import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Category from '../views/Category.vue'
import userRoutes from '@/modules/User/routes'
import cartRoutes from '@/modules/Cart/routes'
import productRoutes from '@/modules/Product/routes'
import panel from '@/modules/Panel/routes'
import store from '../store'
import axios from 'axios'


const routes = [
  {
    path: '',
    name: 'Home',
    component: Home,
    meta: {
      title: `خانه`,
      metaTags: [
        {
          name: 'فروشگاه اپل یاس',
          content: 'ارزان ترین قیمت آیفون'
        },
        {
          property: 'og:description',
          content: 'ارزان ترین ها را از ما بخواهید'
        }
      ]
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta:{
      title:"دسته بندی"
    }
  },
  {
    path: '/category/:code',
    name: 'SingleCategory',
    component: Category,
    meta:{
      title:"دسته بندی"
    }
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: Search,
    meta:{
      title:"جستجو"
    }
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

router.beforeEach(async (to, from, next) => {
  let response = await axios.get("http://127.0.0.1:8000/config/")
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  if(nearestWithTitle) {
    document.title = `${response.data.browser_title} - ` + nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = `${response.data.browser_title} - ` + previousNearestWithMeta.meta.title;
  }

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  if(!nearestWithMeta) return next();


  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });
    tag.setAttribute('data-vue-router-controlled', '');
    return tag;
  })
  .forEach(tag => document.head.appendChild(tag));
  let data = response.data.seo_key_words.split(",")
  data.forEach(t=>{
    let d = t.split(":")
    let tag = document.createElement('meta');
    tag.setAttribute("name",d[0])
    tag.setAttribute("content",d[1])
    document.head.appendChild(tag);
  })

  next();
});
export default router
