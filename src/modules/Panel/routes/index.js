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
    meta: {
      Authenticated: true,
      title:"پنل",
    },
    children: [
      {
        path: '',
        name: 'پیشخوان',
        component: Dashboard,
        meta: {
          Authenticated: true,
          title:"پیشخوان",
        },
      },
      {
        path: 'profile',
        name: 'پروفایل',
        component: Profile,
        meta: {
          Authenticated: true,
          title:"ویرایش پروفایل",
        },
      },
      {
        path: 'users',
        name: 'کاربران',
        component: Users,
        meta: {
          Authenticated: true,
          AdminRequiered: true,
          title:"لیست کاربران",

        },
        children:[
          {
            path: 'new',
            name: 'افزودن کاربر جدید',
            component: Users,
            meta:{
              title:"افزودن کاربر جدید"
            }
          },
          {
            path: ':id',
            name: 'edit-user',
            component: Users,
            meta:{
              title:"ویرایش کاربر"
            }
          },
        ]
      },
      {
        path: 'slideshow',
        name: 'مدیریت اسلاید ها',
        component: SlideShow,
        meta: {
          Authenticated: true,
          AdminRequiered: true,
          title:"مدیریت اسلاید ها"

        },
        children:[
          {
            path: 'add',
            name: 'افزودن اسلاید',
            component: SlideShow,
            meta:{
              title:"افزودن اسلاید"
            }
          },
          {
            path: 'edit/:id',
            name: 'ویرایش اسلاید',
            component: SlideShow,
            meta:{
              title:"ویرایش اسلاید"
            }
          },
        ]
      },

      {
        path: 'mytransactions',
        name: 'تراکنش های من',
        component: MyTransactions,
        meta:{
          Authenticated: true,
          title:"تراکنش های من"
        }
      },
      {
        path: 'myorders',
        name: 'سفارشات من',
        component: MyOrders,
        meta:{
          Authenticated: true,
          title:"سفارشات من"
        }
      },
      {
        path: 'category',
        name: 'دسته بندی',
        component: Category,
        meta: {
          Authenticated: true,
          AdminRequiered: true,
          title:"مدیریت دسته بندی"

        },
      },

      {
        path: 'products',
        name: 'محصولات',
        component: Products,
        meta: {
          Authenticated: true,
          AdminRequiered: true,
          title:"مدیریت محصولات"
        },
        title:"محصولات",
        children:[
          {
            path: 'new',
            name: 'محصول جدید',
            component: Products,
            meta: {
              title:"افزودن محصول جدید"
            },
          },
          {
            path: 'edit/:code',
            name: 'ویرایش محصول',
            component: Products,
            meta: {
              title:"ویرایش محصول"
            },
          },
        ]

      },

      {
        path: 'superoffer',
        name: 'پیشنهاد',
        component: SuperOffer,
        meta: {
          Authenticated: true,
          AdminRequiered: true,
          title:"پیشنهاد شگفت انگیز"
        },
        children:[
          {
            path: 'add',
            name: 'پیشنهاد جدید',
            component: SuperOffer,
            meta: {
              title:"پیشنهاد جدید"
            },
          },
          {
            path: ':code',
            name: 'ویرایش پیشنهاد',
            component: SuperOffer,
            meta: {
              title:"ویرایش پیشنهاد"
            },
          },
        ]

      },
      {
        path: 'charts',
        name: 'آمار',
        component: Charts,
        meta: {
          Authenticated: true,
          AdminRequiered: true,
          meta: {
            title:"آمار"
          },
        },

      },
      {
        path: 'discount',
        name: 'تخفیفات',
        component: Discount,
        meta: {
          Authenticated: true,
          AdminRequiered: true,
          title:"تخفیفات"

        },

      },
      {
        path: 'comments',
        name: 'نظرات',
        component: Comments,
        meta: {
          Authenticated: true,
          AdminRequiered: true,
          title:"نظرات"

        },

      },
      {
        path: 'transactions',
        name: 'تراکنش ها',
        component: Transactions,
        meta: {
          Authenticated: true,
          AdminRequiered: true,
          title:"تراکنش ها"

        },

      },
      {
        path: 'orders',
        name: 'سفارشات',
        component: Orders,
        meta: {
          Authenticated: true,
          AdminRequiered: true,
          title:"سفارشات"

        },

      },
      {
        path: 'setting',
        name: 'تنظیمات',
        component: Setting,
        meta: {
          Authenticated: true,
          AdminRequiered: true,
          title:"تنظیمات"

        },

      },
    ]
  },
  
]
