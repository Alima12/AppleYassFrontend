import axios from 'axios'


const state = {
  toekn:"",
  user:"",
  isAuthenticated:false
}



const mutations = {
  login(state, token) {
    state.isAuthenticated = true
    state.token = token;
    axios.defaults.headers.common['Authorization'] = "Bearer " + token
  },
  logout(state) {
    state.isAuthenticated = false;
    state.token = '';
    state.user = null;
    axios.defaults.headers.common['Authorization'] = "";
    localStorage.removeItem("token");
  },
  setUser(state, user) {
    state.user = user;
  },
}

const actions = {
  onStart(context) {
    let token = localStorage.getItem("token")
    if (token) {
      context.commit('login', token)
      axios.get(`users/${1}/`).then(response=>{
        context.commit('setUser',response.data);
        let _tmp = JSON.stringify(response.data)
        localStorage.setItem("user",_tmp);
      }).catch(err=>{
        context.commit('logout')
      });

    } else {
      context.commit('logout')
    }
  }
}

const getters ={
  getMe:state =>{
    console.log(state.user)
    return state.user
  },
  isLogined:state => state.isAuthenticated,
  

}


export default{
  state,
  mutations,
  actions,
  getters
}
