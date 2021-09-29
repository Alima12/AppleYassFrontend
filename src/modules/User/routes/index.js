import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import Profile from "../pages/Profile.vue"


export default [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component:Profile 
  }
]