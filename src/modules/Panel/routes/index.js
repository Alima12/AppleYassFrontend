import HomePanel from "../pages/Main.vue"
import Dashboard from "../pages/Home.vue"
import Profile from "../pages/Profile.vue"
import Users from "../pages/Users.vue"


export default [
  {
    path: '/panel',
    name: 'پنل',
    component: HomePanel,
    loginRequired:true,
    children: [
      {
        path: 'dashboard',
        name: 'پیشخوان',
        component: Dashboard,

      },
      {
        path: 'profile',
        name: 'پروفایل',
        component: Profile,

      },
      {
        path: 'users',
        name: 'کاربران',
        component: Users,

      },
    ]
  },
  
]