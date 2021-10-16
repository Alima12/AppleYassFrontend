<template>
  <div class="title">
    <p>ورود به حساب کاربری</p>
  </div>
  <form action="" class="form">
    <div>
      <label for="username"> نام کاربری:</label>
      <input class="form-control" type="text" name="username"/>
    </div>
    <div>
      <label for="password">رمز عبور:</label>
      <input class="form-control" type="text" name="password"/>
      
    </div>
    <div class="link-to">
      <span><i class="fa fa-user"></i></span>
      <span>حساب کاربری ندارید؟ </span>
       <router-link to="/auth/register">ثبت نام</router-link>
    </div>
    <div> 
      <button class="btn btn-primary w-25 float-end">ورود</button>
    </div>
  </form>
  
    
</template>
<script>
  export default {
    name: "Login",
  }
</script>