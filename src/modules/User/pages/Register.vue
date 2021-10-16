<template>
  <div class="title">
    <p>ثبت نام</p>
  </div>
  <form action="" class="form">
    <div>
      <label for="username"> نام کاربری:</label>
      <input class="form-control" type="text" name="username"/>
    </div>

    <div>
      <label for="username">ایمیل:</label>
      <input class="form-control" type="text" name="username"/>
    </div>

    <div>
      <label for="username">رمز عبور:</label>
      <input class="form-control" type="text" name="username"/>
    </div>
    <div>
      <label for="password">تکرار رمز عبور:</label>
      <input class="form-control" type="text" name="password"/>
      
    </div>


    <div class="link-to">
      <span><i class="fa fa-user"></i></span>
       <router-link to="/auth/login">ورود</router-link>
    </div>

    <div> 
      <button class="btn btn-success w-25 float-end">ثبت نام</button>
    </div>


  </form>
</template>
<script>
  export default {
    name: "Register",
  }
</script>