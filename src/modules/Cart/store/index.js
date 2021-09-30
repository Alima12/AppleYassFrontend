import { createStore } from 'vuex'
const state= {
  cartItems:[{name:"df"}]
}
const mutations= {
  updateCartItems(state,payload){
    state.cartItems = payload
  },
}
const actions = {
  getCartItems({ commit }) {
    // axios.get('/api/cart').then((response) => {
    //   commit('updateProductItems', response.data)
    // });
  },
  addCartItem ({ commit }, cartItem) {
    // axios.post('/api/cart', cartItem).then((response) => {
    //   commit('updateProductItems', response.data)
    // });
  },
  removeCartItem ({ commit }, cartItem) {
    // axios.delete('/api/cart/delete', cartItem).then((response) => {
    //   commit('updateProductItems', response.data)
    // });
  },
  removeAllCartItems ({ commit }) {
    // axios.delete('/api/cart/delete/all').then((response) => {
    //   commit('updateProductItems', response.data)
    // });
  }
}

const getters = {
  getCartItems: state => state.cartItems,
  getCartTotalPrice: state=>{
    let totalPrice = 0;
    state.cartItems.reduce(item=>{
      totalPrice += (item.price * item.quantity);
    });
    return totalPrice;
  },
  getCartQuantity: state=>{
    let totalItems = 0;
    state.cartItems.reduce(item=>{
      totalItems += item.quantity;
    });
    return totalItems
  }

}


export default {
  state,
  mutations,
  actions,
  getters
}
