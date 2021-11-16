import HomePanel from "../pages/Main.vue"
import Dashboard from "../pages/Home.vue"
import Profile from "../pages/Profile.vue"
import Users from "../pages/Users.vue"
import SlideShow from "../pages/SlideShow.vue"
import MyTransactions from "../pages/MyTransactions.vue"
import MyOrders from "../pages/MyOrders.vue"
import Category from "../pages/Category.vue"
import Products from "../pages/Products.vue"
import Charts from "../pages/Charts.vue"
import Discount from "../pages/Discount.vue"
import Comments from "../pages/Comments.vue"
import Transactions from "../pages/Transactions.vue"
import Orders from "../pages/Orders.vue"
import Setting from "../pages/Setting.vue"




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
        adminPermission:true,

      },
      {
        path: 'users',
        name: 'کاربران',
        component: Users,
        adminPermission:true,
        children:[
          {
            path: 'new',
            name: 'افزودن کاربر جدید',
            component: Users,
          },
          {
            path: ':id',
            name: 'edit-user',
            component: Users,
          },
        ]
      },
      {
        path: 'slideshow',
        name: 'مدیریت اسلاید ها',
        component: SlideShow,
        adminPermission:true,
        children:[
          {
            path: 'add',
            name: 'افزودن اسلاید',
            component: SlideShow,
            adminPermission:true,
          },
        ]
      },

      {
        path: 'mytransactions',
        name: 'تراکنش های من',
        component: MyTransactions,
      },
      {
        path: 'myorders',
        name: 'سفارشات من',
        component: MyOrders,
      },
      {
        path: 'category',
        name: 'دسته بندی',
        component: Category,
        adminPermission:true,
      },

      {
        path: 'products',
        name: 'محصولات',
        component: Products,
        adminPermission:true,
        children:[
          {
            path: ':id',
            name: 'صفحه بندی',
            component: Products,
          },
          {
            path: 'new',
            name: 'محصول جدید',
            component: Products,
          },
          {
            path: 'edit/:code',
            name: 'ویرایش محصول',
            component: Products,
          },
        ]

      },
      {
        path: 'charts',
        name: 'آمار',
        component: Charts,
        adminPermission:true,

      },
      {
        path: 'discount',
        name: 'تخفیفات',
        component: Discount,
        adminPermission:true,

      },
      {
        path: 'comments',
        name: 'نظرات',
        component: Comments,
        adminPermission:true,

      },
      {
        path: 'transactions',
        name: 'تراکنش ها',
        component: Transactions,
        adminPermission:true,

      },
      {
        path: 'orders',
        name: 'سفارشات',
        component: Orders,
        adminPermission:true,

      },
      {
        path: 'setting',
        name: 'تنظیمات',
        component: Setting,
        adminPermission:true,

      },
    ]
  },
  
]
