<template>
  <div class="title">
    <p>ثبت نام</p>
  </div>
  <form action="" class="needs-validation" novalidate @submit.prevent="formvalid()">
    <div>
      <label for="username"> شماره تلفن:</label>
      <input v-model="phone_number" :class="{'is-valid':phone_numberE==false,'is-invalid':phone_numberE==true}" class="form-control" type="text" name="phone_number"/>
      <div class="invalid-feedback">
        {{phone_numberEM}}
      </div>
    </div>

    <div>
      <label for="username"> نام کاربری:</label>
      <input v-model="username" :class="{'is-valid':usernameE==false,'is-invalid':usernameE==true}" class="form-control" type="text" name="username"/>
      <div class="invalid-feedback">
        {{usernameEM}}
      </div>
    </div>

    <div>
      <label for="email">ایمیل:</label>
      <input v-model="email" :class="{'is-valid':emailE==false,'is-invalid':emailE==true}" class="form-control" type="email" name="email"/>
      <div class="invalid-feedback">
        {{emailEM}}
      </div>
    </div>

    <div>
      <label for="password1">رمز عبور:</label>
      <input v-model="password" :class="{'is-valid':passwordE==false,'is-invalid':passwordE==true}" class="form-control" type="password" name="password1"/>
      <div class="invalid-feedback">
        {{passwordEM}}
      </div>
    </div>
    <div>
      <label for="password2">تکرار رمز عبور:</label>
      <input v-model="password2" :class="{'is-valid':password2E==false,'is-invalid':password2E==true}" class="form-control" type="password" name="password2"/>
      <div class="invalid-feedback">
        {{password2EM}}
      </div>
      
    </div>


    <div> 
      <button class="btn btn-success w-25 float-end">ثبت نام</button>
    </div>

    <div class="link-to mt-1">
      <span><i class="fa fa-user"></i></span>
       <router-link to="/auth/login">ورود</router-link>
    </div>


  </form>
</template>
<script>
import axios from 'axios';
  export default {
    name: "Register",
    data(){
      return{
        phone_number:"",
        phone_numberE:null,
        phone_numberEM:"",

        email:"",
        emailE:null,
        emailEM:"",

        username:"",
        usernameE:null,
        usernameEM:"",

        password2:"",
        password2E:null,
        password2EM:"", 

        password:"",
        passwordE:null,
        passwordEM:"", 
      }
    },
    methods:{
      formvalid(){
        let access = true;
        let english = /^[A-Za-z0-9]*$/;
        let mailregex = /.*@.{3,8}.(\w{3})/

        this.usernameE = false;
        this.usernameEM=""

        if(this.username.length< 5){
          this.usernameE = true;
          this.usernameEM="نام کاربری شما باید بزرگتر از 4 کاراکتر باشد";
          access = false;
        }else if(!english.test(this.username)){
          this.usernameE = true;
          this.usernameEM="نام کاربری شما میتواند تنها از حروف انگلیسی و اعداد انگلیسی استفاده تشکیل شود";
          access = false;
        }


        this.phone_numberE = false;
        this.phone_numberEM=""

        if(this.phone_number.length !== 11){
          this.phone_numberE = true;
          this.phone_numberEM=" تلفن همراه شما باید بزرگتر از دقیقا 11 کاراکتر باشد";
          access = false;
        }else if(!/^09\d{9}$/.test(this.phone_number)){
          this.phone_numberE = true;
          this.phone_numberEM="فرمت شما اشتباه است- تنها از اعداد انگلیسی میتوانید استفاده کنید و شماره شما باید با 0 شروع شود";
          access = false;
        }


        this.emailE = true;
        this.emailEM="ایمیل خود را با فرمت مناسب وارد کنید"
        if(mailregex.test(this.email)){
          this.emailE = false;
          this.emailEM="";
        }


        this.passwordE = false;
        this.passwordEM="";

        if(this.password.length< 8){
          this.passwordE = true;
          this.passwordEM=" رمز عبور شما باید بزرگتر از 8  کاراکتر باشد";
          access = false;

        }



        this.password2E = false;
        this.password2EM="";
        if (this.password !==this.password2){
          this.password2E = true;
          this.password2EM="رمز عبور شما مطابقت ندارد";
          access = false;
        }


        if(access && !this.emialE){
          let formData = new FormData();
          formData.append('phone_number',this.phone_number);
          formData.append('email',this.email);
          formData.append('password',this.password);
          formData.append('password2',this.password2);
          formData.append('username',this.username);
          axios.post("users/register/", formData).then(response=>{
            this.$router.push("/auth/login/")
          }).catch(err=>{
            console.log(err.message);
            let res = err.response.data;
            if(res.phone_number){
              this.phone_numberEM = res.phone_number[0]
              this.phone_numberE = true;
            }
            if(res.email){
              this.emailEM = res.email[0]
              this.emailE = true;
            }
            if(res.username){
              this.usernameEM = res.username[0]
              this.usernameE = true;
            }



          })
        }


      }
    },
    watch:{
      username(){
        this.phone_numberE = null;
        this.phone_numberEM=""
      },
      password(){
        this.passwordE = null;
        this.passwordEM="";
      },
      password2(){
        this.password2E = null;
        this.password2EM="";
      },
      email(){
        this.emailE = null;
        this.emailEM="";
      }
    },
    mounted(){
      if(this.$store.getters.isLogined){
        this.$router.push("/panel/profile");
      }
      
    }
  }
</script>