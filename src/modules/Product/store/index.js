import { createStore } from 'vuex'

const state = {
  productItems:[],
}
const mutations ={
  updateProductItems(state, payload) {
    state.productItems = payload;
  },
}


const actions= {
  getProductItems ({ commit }) {
    axios.get(`/api/products`).then((response) => {
      commit('updateProductItems', response.data)
    });
  },
}

const getters ={
  getProduct: state=> (code)=>{
    return state.productItems.find(product=> product.code == code)
  },
  getProductByCategory: state=> (category)=>{
    return state.productItems.filter(product=>product.category.name == category)
  },
  getOfferProducts: state=> {
    return state.productItems.filter(product=> product.is_on_offer)
  },
  getSuperOfferProduct: state=>{
    return state.productItems.find(product=> product.is_super_offer)
  },

}



export default createStore({
  state,
  mutations,
  actions,
  getters

 
  
})
