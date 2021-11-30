<template>
  <div class="title">
    <p>ورود به حساب کاربری</p>
  </div>
  <form action="" class="needs-validation" novalidate @submit.prevent="Login()">
    <div>
      <label for="username" class="form-label">  شماره تلفن:</label>
      <input class="form-control" :class="{'is-valid':usernameE==false,'is-invalid':usernameE==true}" type="text"  v-model="username" name="username" required/>
      <div class="invalid-feedback">
        {{usernameEM}}
      </div>
    </div>
    <div>
      <label for="password" class="form-label" required>رمز عبور:</label>
      <input class="form-control" :class="{'is-valid':passwordE==false,'is-invalid':passwordE==true}" type="password" name="password" v-model="password"/>
      <div class="invalid-feedback">
        {{passwordEM}}
      </div>
    </div>
    <div class="link-to">
      <span><i class="fa fa-user"></i></span>
      <span>حساب کاربری ندارید؟ </span>
       <router-link to="/auth/register">ثبت نام</router-link>
    </div>
    <div class="link-to">
      <span><i class="fa fa-key"></i></span>
      <span>رمز عبور خود را فراموش کرده اید؟</span>
       <router-link to="/auth/reset_password">بازیابی</router-link>
    </div>
    <div> 
      <button class="btn btn-primary w-25 float-end">ورود</button>
    </div>
  </form>
  
    
</template>
<script>
  import axios from 'axios';
  export default {
    name: "Login",
    data(){
      return{
        username:"",
        usernameE:null,
        usernameEM:"",
        password:"",
        passwordE:null,
        passwordEM:"", 
      }
    },
    methods:{
      Login(){
        if(this.formvalid()){
          let formData = new FormData()
          formData.append("phone_number",this.username);
          formData.append("password",this.password);

          axios.post("api/token/",formData).then(response=>{
            if(response.status == 200){
              localStorage.setItem("token",response.data.access);
              this.$router.push("/panel")
            }
          });


        }
      },
      formvalid(){
        let english = /^[A-Za-z0-9]*$/;
        this.usernameE = false;
        this.usernameEM=""
        if(this.username.length< 5){
          this.usernameE = true;
          this.usernameEM="نام کاربری شما باید بزرگتر از 4 کاراکتر باشد";
        }else if(!english.test(this.username)){
          this.usernameE = true;
          this.usernameEM="نام کاربری شما میتواند تنها از حروف انگلیسی و اعداد انگلیسی استفاده تشکیل شود";
        }

        this.passwordE = false;
        this.passwordEM="";

        if(this.password.length< 4){
          this.passwordE = true;
          this.passwordEM=" رمز عبور شما باید بزرگتر از 8  کاراکتر باشد";
        }
        if(!this.passwordE&& !this.usernameE){
          return true;
        }else{
          return false;
        }
      }
    },
    watch:{
      username(){
        this.usernameE = null;
        this.usernameEM=""
      },
      password(){
        this.passwordE = null;
        this.passwordEM="";
      }
    }

  }
</script>