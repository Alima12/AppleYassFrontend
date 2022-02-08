import AuthBase from "../pages/AuthBase.vue"
import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import ResetPassword from "../pages/ResetPassword.vue"

import Profile from "../pages/Profile.vue"


export default [
  {
    path: '/auth',
    name: 'AuthBase',
    component: AuthBase,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: {
          NotAuthenticated: true,
        },
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
        meta: {
          NotAuthenticated: true,
        },
      },
      {
        path: 'reset_password',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: {
          Authenticated: true,
        },
      },

    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component:Profile,
    loginRequired:true
  }
 
]