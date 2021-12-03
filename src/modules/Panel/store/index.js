import axios from 'axios'


const state = {
  categories: [],
  products:[]
}



const mutations = {
  setItems(state, data){
    state.categories = data;
  },
  setProductP(state, data){
    state.products= data
  }

}

const actions = {
  getCategory(context){
    axios.get("category/").then(response=>{
      context.commit('setItems',response.data)
    });
  },
  getProductP(context, page){
    console.log(page)
    axios.get(`?${page}/`).then(response=>{
      console.log(response.data)
      context.commit('setProductP',response.data)
    });
  },

}

const getters ={
  getCategories: state => state.categories,
  getProductsP: state => state.products.results,
  getNextpage: state => state.products.next,
  getPreviouspage: state => state.products.previous,

}


export default{
  state,
  mutations,
  actions,
  getters
}
