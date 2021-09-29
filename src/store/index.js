import { createStore } from 'vuex'
import cart from '@/modules/Cart/store'
import user from '@/modules/User/store'
import products from '@/modules/Product/store'

export default createStore({
  modules: {
    cart,
    user,
    products
  }
})
