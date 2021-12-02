import axios from 'axios'


const state = {
  categories: []
}



const mutations = {
  setItems(state, data){
    state.categories = data;
  }

}

const actions = {
  getCategory(context){
    axios.get("category/").then(response=>{
      context.commit('setItems',response.data)
    });
  },

}

const getters ={
  getCategories: state => state.categories,
}


export default{
  state,
  mutations,
  actions,
  getters
}
