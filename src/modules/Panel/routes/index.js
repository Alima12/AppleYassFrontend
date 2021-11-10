import HomePanel from "../pages/Main.vue"
import Dashboard from "../pages/Home.vue"
import Profile from "../pages/Profile.vue"



export default [
  {
    path: '/panel',
    name: 'homePanel',
    component: HomePanel,
    loginRequired:true,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
      },
    ]
  },
  
]