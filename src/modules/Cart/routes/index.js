import CartContainer from "../pages/CartContainer.vue"
import ConfirmPage from "../pages/ConfirmPage.vue"
import ShoppingCart from "../pages/ShoppingCart.vue"
import Payment from "../pages/Payment.vue"
import Result from "../pages/Result.vue"



export default [
  {
    path: '/cart',
    name: 'MainCart',
    component: CartContainer,
    children:[
      {
        path: '',
        name: 'ShoppingCart',
        component: ShoppingCart,
        meta: {
          title:"سبد خرید"
        }
      },
      {
        path: 'confirm',
        name: 'ConfirmCart',
        component: ConfirmPage,
        meta: {
          Authenticated: true,
          title:"تایید خرید"

        },
      },
      {
        path: 'payment',
        name: 'Payment',
        component: Payment,
        meta: {
          Authenticated: true,
          title:"انتقال به درگاه پرداخت"

        },
      },
      {
        path: 'result/:code',
        name: 'Result',
        component: Result,
        meta: {
          Authenticated: true,
          title:"رسید"

        },
      },
   
    ]
  },

]