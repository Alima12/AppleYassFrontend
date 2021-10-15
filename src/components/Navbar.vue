<template>
  <nav>
    <div class="nav-right">
        <router-link to="/"><i class="fa fa-home"></i></router-link>
        <router-link to="/cart" class="cart-icon">
            <i class="fa fa-shopping-cart"></i>
            <span class="badge badge-danger">{{$store.getters.getCartQuantity}}</span>
        </router-link>

        <router-link to="/about" class="search-box-input">
            <input type="text" class="searchInput form-control" :class="{'active':active==true}"/>
            <i class="fa fa-search" @click="toggleSearchBox()"></i>
        </router-link>
    </div>
    <div class="nav-left">
        <div class="register-login">
            <i class="fa fa-user"></i>
            <router-link to="/register">
            ثبت نام / ورود
            </router-link>
            
        </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Navbar',
  data(){
    return {
        active: false
    }
  },
  components: {
  },
  methods:{
    toggleSearchBox(){
        this.active = !this.active;
    }
  }
}
</script>
<style>
  .cart-icon{
    position: relative;
  }
  .cart-icon span{
    position: absolute;
    font-size: .8em;
    color: white;
    right: -5px;
    background: #e74c3c;
    padding: 2px 4px;
    border-radius: 10px;
  }
</style>
