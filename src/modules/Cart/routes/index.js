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
      },
      {
        path: 'confirm',
        name: 'ConfirmCart',
        component: ConfirmPage,
      },
      {
        path: 'payment',
        name: 'Payment',
        component: Payment,
      },
      {
        path: 'result/:code',
        name: 'Result',
        component: Result,
      },
   
    ]
  },

]