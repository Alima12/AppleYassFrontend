import { createStore } from 'vuex'
const state= {
  cartItems:[]
}
const mutations= {
  updateCartItems(state,payload){
    state.cartItems = payload
  },
  cartItemsAdd(state,item){
    state.cartItems.push(item)
  },
  addNumber(state,items){
    let product = state.cartItems.find(i=> i.code == items[0] && i.color == items[2])
    product.count = items[1];
  }

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
  },
  addItem({commit},item){
    commit('cartItemsAdd',item);
  },
  updateItem({commit},items){
    commit('addNumber',items)
    
  }
}

const getters = {
  getCartItems: state => state.cartItems,
  getCartTotalPrice: state=>{
    let totalPrice = 0;
    state.cartItems.forEach(item => {
      totalPrice += (item.price * item.count);
    });
    return totalPrice;
  },
  getCartQuantity: state=>{
    let totalItems = 0;
    state.cartItems.forEach(item => {
      totalItems += item.count;
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
