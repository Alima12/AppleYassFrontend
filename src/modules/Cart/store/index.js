import axios from 'axios'

const state= {
  cart:{}
}
const mutations= {
  updateCartItems(state,payload){
    state.cart = payload;
  },
}
const actions = {
  getCartItems({ commit }) {
    axios.get('transaction/order/cart/').then((response) => {
      commit('updateCartItems', response.data[0])
    });
  },
  addCartItem ({ commit }, cartItem) {
    axios.post('transaction/order/cart/', cartItem).then((response) => {
      commit('updateCartItems', response.data)
    });
  },
  removeCartItem ({ commit }, id) {
    axios.delete(`transaction/order/cart/destroy/${id}/`);
  },
  removeAllCartItems ({ commit }) {
    // axios.delete('/api/cart/delete/all').then((response) => {
    //   commit('updateProductItems', response.data)
    // });
  },
  
}

const getters = {
  CartItems: state => state.cart,
  getCartTotalPrice: state=> state.cart.total_price,
}


export default {
  state,
  mutations,
  actions,
  getters
}
