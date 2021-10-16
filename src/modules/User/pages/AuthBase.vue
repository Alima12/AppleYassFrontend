<template>
<div class="Loginroot">
  <div class="container-fluid">
    <div class="row p-4">
      <div class="col-lg-7 col-md-9 col-sm-12 mt-5 auth-container">
        <div class="auth-form">
          <router-view></router-view>
        </div>
      </div>
    </div>








          <!-- <router-link to="/auth/login">login</router-link>  -->
  
  </div>
</div>





</template>
<script>
import '@/assets/css/auth.css'
  export default {
    name: "AuthBase",
  }
</script>