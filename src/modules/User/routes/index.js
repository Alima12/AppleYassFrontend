import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import Profile from "../pages/Profile.vue"


export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    loginRedirect:true
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    loginRedirect:true
  },
  {
    path: '/profile',
    name: 'Profile',
    component:Profile,
    loginRequired:true
  }
]