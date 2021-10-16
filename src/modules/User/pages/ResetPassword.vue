<template>
  <div class="title">
    <p>بازیابی رمز عبور</p>
  </div>
  <form action="" class="needs-validation" novalidate @submit.prevent="formvalid()">
    <div>
      <label for="username" class="form-label"> نام کاربری:</label>
      <input class="form-control" :class="{'is-valid':emailE==false,'is-invalid':emailE==true}"  v-model="email" name="username" required/>
      <div class="invalid-feedback">
        {{emailEM}}
      </div>
    </div>
    <div class="link-to mt-1">
        <span><i class="fa fa-user"></i></span>
       <router-link to="/auth/login">ورود</router-link>
    </div>
    <div>
      <button class="btn btn-danger w-25 float-end">بازیابی</button>
    </div>
  </form>
  
    
</template>
<script>
  export default {
    name: "ResetPassword",
    data(){
      return{
        email:"",
        emailE: null,
        emailEM:""
      }
    },
    methods:{
      formvalid(){
        let mailregex = /.*@.{3,8}.(\w{3})/
        this.emailE = true;
        this.emailEM="ایمیل خود را با فرمت مناسب وارد کنید"
        if(mailregex.test(this.email)){
          this.emailE = false;
          this.emailEM="";
        }
      }
    },
    watch:{
      email(){
        this.emailE = null;
        this.emailEM="";
      }
    }

  }
</script>