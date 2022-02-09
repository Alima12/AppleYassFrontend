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
    meta:{
      title:"حساب کاربری"
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: {
          NotAuthenticated: true,
          title:"ورود به حساب"

        },
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
        meta: {
          NotAuthenticated: true,
          title:"ثبت نام"

        },
      },
      {
        path: 'reset_password',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: {
          Authenticated: true,
          title:"بازیابی رمزعبور"

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