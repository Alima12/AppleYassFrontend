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
import SuperOffer from "../pages/SuperOffer.vue"





export default [
  {
    path: '/panel',
    name: 'Panel',
    component: HomePanel,
    title:"پنل",
    meta: {
      Authenticated: true,
    },
    children: [
      {
        path: '',
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
        meta: {
          Authenticated: true,
          AdminRequiered: true
        },
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
        meta: {
          Authenticated: true,
          AdminRequiered: true
        },
        children:[
          {
            path: 'add',
            name: 'افزودن اسلاید',
            component: SlideShow,
            adminPermission:true,
          },
          {
            path: 'edit/:id',
            name: 'ویرایش اسلاید',
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
        meta: {
          Authenticated: true,
          AdminRequiered: true
        },
        title:"محصولات",
        children:[
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
        path: 'superoffer',
        name: 'پیشنهاد',
        component: SuperOffer,
        meta: {
          Authenticated: true,
          AdminRequiered: true
        },
        title:"پیشنهاد شگفت انگیز",
        children:[
          {
            path: 'add',
            name: 'پیشنهاد جدید',
            component: SuperOffer,
          },
          {
            path: ':code',
            name: 'ویرایش پیشنهاد',
            component: SuperOffer,
          },
        ]

      },
      {
        path: 'charts',
        name: 'آمار',
        component: Charts,
        meta: {
          Authenticated: true,
          AdminRequiered: true
        },

      },
      {
        path: 'discount',
        name: 'تخفیفات',
        component: Discount,
        meta: {
          Authenticated: true,
          AdminRequiered: true
        },

      },
      {
        path: 'comments',
        name: 'نظرات',
        component: Comments,
        meta: {
          Authenticated: true,
          AdminRequiered: true
        },

      },
      {
        path: 'transactions',
        name: 'تراکنش ها',
        component: Transactions,
        meta: {
          Authenticated: true,
          AdminRequiered: true
        },

      },
      {
        path: 'orders',
        name: 'سفارشات',
        component: Orders,
        meta: {
          Authenticated: true,
          AdminRequiered: true
        },

      },
      {
        path: 'setting',
        name: 'تنظیمات',
        component: Setting,
        meta: {
          Authenticated: true,
          AdminRequiered: true
        },

      },
    ]
  },
  
]
