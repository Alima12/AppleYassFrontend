<template>
  <nav>
    <div class="nav-right">
        <router-link to="/"><i class="fa fa-home"></i></router-link>
        <router-link to="/cart" class="cart-icon">
            <i class="fa fa-shopping-cart"></i>
            <span class="badge badge-danger">{{$store.getters.getCartQuantity}}</span>
        </router-link>

        <router-link to="/search" class="search-box-input">
            <input type="text" class="searchInput form-control"/>
            <i class="fa fa-search"></i>
        </router-link>
    </div>
    <div class="nav-left">
        <div class="register-login">
            <i class="fa fa-user"></i>
            <router-link to="/auth/login">
            ثبت نام / ورود
            </router-link>
            
        </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Navbar',
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
