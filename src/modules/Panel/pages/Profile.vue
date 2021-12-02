<template>
    <loading 
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
      />
  <div class="main-content">
    <form action="" @submit.prevent="saveProfile()">
       <div class="profile__info border cursor-pointer text-center" style="margin-bottom: 90px;">
          <div class="avatar__img">
            <img :src="image_address" class="avatar___img">
            <input type="file" accept="image/*" class="hidden avatar-img__input">
            <div class="v-dialog__container" style="display: block;"></div>
            <div class="box__camera default__avatar"></div>
          </div>
          <span class="profile__name">کاربر : {{fullname}}</span>
        </div>
      <div class="row p-1">
        <div class="col-lg-6 col-md-6 col-sm-6">  
          <label for="fullname" class="mb-2">نام:</label>
          <input name="fullname" v-model="first_name" type="text" class="text font-size-13" placeholder="نام و نام خانوادگی">
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6">  
          <label for="fullname" class="mb-2">نام خانوادگی:</label>
          <input name="fullname" v-model="last_name" type="text" class="text font-size-13" placeholder="نام و نام خانوادگی">
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6"> </div>
        <div class="col-lg-6 col-md-6 col-sm-6 d-flex align-items-center justify-content-end">  
          <router-link to="/panel" class="btn btn-my-styles">تغییر رمز</router-link>
        </div>
      </div>


      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="email" class="mb-2">ایمیل:</label>
          <input disabled name="email" v-model="email" type="text" class="text font-size-13 text-end" placeholder="ایمیل">
        </div>
      </div>

      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="nationalCode" class="mb-2">شماره ملی:</label>
          <input  name="nationalCode" v-model="national_code" type="text" class="text font-size-13 text-end" placeholder="کد ملی">
        </div>
      </div>

      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="username" class="mb-2">نام کاربری:</label>
          <input disabled name="username" v-model="username" type="text" class="text font-size-13 text-end" placeholder="نام کاربری">
        </div>
      </div>


      <div class="row p-1">
        <div class="col-lg-10 col-md-8 col-sm-12">  
          <label for="number" class="mb-2">شماره موبایل:</label>
          <input name="number" disabled v-model="phoneNumber" type="text" class="text font-size-13 text-end phone-number-input" placeholder="مثال: 09123456789">
          <button class="btn btn-info change-number-btn" v-if="!changeMode" @click.prevent="changeNumber()">عوض کردن</button>
          <button class="btn btn-primary mx-1 send-code-btn" v-if="changeMode" @click.prevent="sendConfirmCode()">ارسال کد</button>
          <button disabled class="btn btn-warning confirm-code-button" v-if="changeMode" @click.prevent="confirmChange()">تایید</button>

          
        </div>
        <div class="col-lg-2 col-md-4 col-sm-12" v-if="changeMode">  
          <label for="confirm-code" class="mb-2">کد:</label>
          <input disabled name="confirm-code" type="text" class="text font-size-13 text-end confirm-code-input" v-model="confirmCode" placeholder="کد تایید">
        </div>
        <div class="alert alert-danger mt-2 text-center" v-if="phoneNumberE">
          فرمت وارد شده اشتباه است
          <br>
          <p class="text-dark mt-1">
            شماره باید کاملا با اعداد انگلیسی نوشته شود و با 0 شروع شود
          </p>
        </div>
      </div>



      <div class="row p-1 my-3">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="current-address">
            <h4>آدرس ها</h4>
            <p class="user-address" v-for="add in address">
              <span>
                {{add.address}}
              </span>
              <i class="fa fa-trash fa-2x text-danger" @click="deleteAddress(add)"></i>
            </p>
          </div> 
          <button class="btn btn-success d-flex align-items-center" @click.prevent="addAdress()"><i class="fa fa-plus-circle fa-2x"></i></button>
        </div>
      </div>

      <div class="row p-1 my-3">
        <div class="col-lg-4 col-md-8 col-sm-12 mx-auto">
          <button class="w-100 btn btn-primary p-3">
            <span>
              ذخیره
            </span> 
          </button>
        </div>
      </div>



    </form>
  </div>
</template>
<script>
  import Swal from 'sweetalert2'
  import Loading from 'vue-loading-overlay';
import axios from 'axios';

  export default {
    name: "Profile",
    components:{Loading},
    data(){
      return{
        user:{},
        fullname:"",
        username:"",
        changeMode:false,
        phoneNumber:'',
        phoneNumberE:false,
        first_name:"",
        last_name:"",
        national_code:"",
        address:[],
        email:"aliali.ali1378@yahoo.com",
        newAddress:'',
        fileImg:"",
        imageChanged:false,
        isLoading:true,
        image_address:"",

      }
    },
    methods:{
      sendConfirmCode(){
        if (/^0\d{10}$/.test(this.phoneNumber)){
          // do ajax
          document.querySelector(".confirm-code-input").disabled = false;
          document.querySelector(".confirm-code-button").disabled = false;
          document.querySelector(".send-code-btn").disabled = true;
          document.querySelector(".phone-number-input").disabled = true;

        }else{
          this.phoneNumberE = true
        }
      },
      confirmChange(){
        //do ajax
      },
      changeNumber(){
        this.changeMode = true;
        let pni = document.querySelector(".phone-number-input");
        pni.disabled = false;
      },
      deleteAddress(address){
        Swal.fire({
          title: '<h5>حذف آدرس</h5>',
          html: `<p class="text-danger">آیا از حذف آدرس زیر اطمینان دارید؟</p>
          <p class="fw-bold">${address.address}</p>`,
          icon: 'warning',
          confirmButtonText: 'حذف کن',
          confirmButtonColor:"#e74c3c",
          CancelButtonColor:"#95a5a6",
          cancelButtonText:"انصراف",
          confirmButtonText: 'حذف',
          showCancelButton: true,
        }).then(result=>{
          if (result.isConfirmed) {
              this.address = this.address.filter(ad=> ad.id != address.id);

              axios.delete("users/address/delete/"+address.id+"/",).then(response=>{
                Swal.fire({
                  title: 'حذف با موفقیت انجام شد',
                  text:'حذف آدرس با موفقیت انجام شد',
                  icon:'success',
                  confirmButtonColor:"#27ae60",
                  confirmButtonText: 'متوجه شدم',
                })
              }).catch(err=>{
                let error = err.response.message
                Swal.fire({
                  title: 'خطا',
                  text: error,
                  icon:'error',
                  confirmButtonColor:"#c0392b",
                  confirmButtonText: 'متوجه شدم',
                })
              });

              
          }
        });
      },
      addAdress(){
        Swal.fire({
          title: '<h5>افزودن آدرس</h5>',
          html: `
          <label>شهر:</label>
          <input type="text" class="new-address-city form-control mb-2" />
          <label>ادامه آدرس: </label>
          <input type="text"
          name="addresstoadd"
          class="form-control new-address-form" />
          `,
          icon: 'info',
          confirmButtonText: 'اضافه کن',
          confirmButtonColor:"#009432",
          CancelButtonColor:"#95a5a6",
          cancelButtonText:"انصراف",
          showCancelButton: true,
        }).then(result=>{
          let city = document.querySelector(".new-address-city").value;
          let rest_of = document.querySelector(".new-address-form").value;
          if (result.isConfirmed && this.rest_of != '' && this.city != '') {
              let formData = new FormData();
              formData.append('owner', this.user.id);
              formData.append('city', city);
              formData.append('rest_of', rest_of);

              axios.post('users/address/new/', formData).then(response=>{
                Swal.fire({
                  title: 'موفق',
                  text:'آدرس با موفقیت اضافه شد',
                  icon:'success',
                  confirmButtonColor:"#27ae60",
                  confirmButtonText: 'متوجه شدم',
                })
                this.$router.push("/panel/profile/");
              }).catch(err=>{
                Swal.fire({
                  title: 'ناموفق',
                  text:err.response.data,
                  icon:'error',
                  confirmButtonColor:"#27ae60",
                  confirmButtonText: 'متوجه شدم',
                })
              });
             
              this.newAddress = "";
          }
        });
      },
      saveProfile(){

      },
      setUser(u){
        this.phoneNumber = u.phone_number;
        this.email = u.email;
        this.fullname = u.get_full_name;
        this.first_name = u.first_name;
        this.last_name = u.last_name;
        this.username = u.username;
        this.national_code = u.national_code;
        u.address.forEach(ad => {
          this.address.push({
            id:ad.id,
            address:`${ad.city}/${ad.rest_of}`
          })
        });
        if (u.images.length > 0){

          this.image_address = u.images[0].image
        }
        


      }
      
      
    },
    mounted(){
      setTimeout(()=>{
        let fileInput= document.querySelector(".avatar-img__input")
        $(".avatar-img__input").on('change', (e)=> {
          this.fileImg = e.target.files[0];
        });
        this.user = this.$store.getters.getMe;
        this.setUser(this.user)
        this.isLoading = false;
      },1000);

    },
    watch:{
      fileImg(){
        this.imageChanged = true; 
      },
      phoneNumber(){
        this.changeMode = false;
        this.phoneNumberE = false;
      }
    }

  }

</script>

<style >
.current-address{
  margin: 5px 10px;
}

.current-address h4{
  color: #333;
  font-weight: bold;
  padding-bottom: 5px;
  margin-bottom: 15px;

  border-bottom: 2px solid #d63031 ;

}

.current-address .user-address{
  padding: 5px 10px;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px outset #777;
  border-radius: 10px;
}


.current-address .user-address span{
  font-weight: bold;
  font-size: .8em;

}
.current-address .user-address i{
  cursor: pointer;
  
}
</style>