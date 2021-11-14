<template>

  <div class="main-content">
    <form action="" @submit.prevent="saveProfile()">
       <div class="profile__info border cursor-pointer text-center">
          <div class="avatar__img">
            <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg" class="avatar___img">
            <input type="file" accept="image/*" class="hidden avatar-img__input">
            <div class="v-dialog__container" style="display: block;"></div>
            <div class="box__camera default__avatar"></div>
          </div>
          <span class="profile__name">کاربر : علی مهدوی</span>
        </div>
      <div class="row p-1">
        <div class="col-lg-6 col-md-6 col-sm-6">  
          <label for="fullname" class="mb-2">نام و نام خانوادگی:</label>
          <input name="fullname" v-model="fullname" type="text" class="text font-size-13" placeholder="نام و نام خانوادگی">
        </div>
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
        <div class="col-lg-10 col-md-8 col-sm-12">  
          <label for="number" class="mb-2">شماره موبایل:</label>
          <input name="number" v-model="phoneNumber" type="text" class="text font-size-13 text-end" placeholder="مثال: 09123456789">
          <button class="btn btn-info" v-if="!changeMode" @click.prevent="changeNumber()">عوض کردن</button>
          <button class="btn btn-warning" v-else @click.prevent="confirmChange()">تایید</button>
          
        </div>
        <div class="col-lg-2 col-md-4 col-sm-12" v-if="changeMode">  
          <label for="email" class="mb-2">کد:</label>
          <input name="email" type="text" class="text font-size-13 text-end" placeholder="کد تایید">
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
                {{add}}
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
  export default {
    name: "Profile",
    components:{},
    data(){
      return{
        fullname:"",
        changeMode:false,
        phoneNumber:'',
        phoneNumberE:false,
        address:[
            "فارس/شیراز/گلستان/خیابان رایحه/مجتمع فرهنگیان/بلوک 2/ طبقه اول /واحد 412",
            "کهگیلویه و بویر احمد/دهدشت/گلزار شهدا/گلزار هشتم"
        ],
        email:"aliali.ali1378@yahoo.com",
        newAddress:'',
        fileImg:"",
        imageChanged:false
      }
    },
    methods:{
      confirmChange(){
        // do ajax
      },
      changeNumber(){
        if (/^0\d{10}$/.test(this.phoneNumber)){
          this.changeMode = true;
          // do ajax
        }else{
          this.phoneNumberE = true
        }

      },
      deleteAddress(address){
        Swal.fire({
          title: '<h5>حذف آدرس</h5>',
          html: `<p class="text-danger">آیا از حذف آدرس زیر اطمینان دارید؟</p>
          <p class="fw-bold">${address}</p>`,
          icon: 'warning',
          confirmButtonText: 'حذف کن',
          confirmButtonColor:"#e74c3c",
          CancelButtonColor:"#95a5a6",
          cancelButtonText:"انصراف",
          confirmButtonText: 'حذف',
          showCancelButton: true,
        }).then(result=>{
          if (result.isConfirmed) {
              this.address = this.address.filter(ad=> ad != address);
              Swal.fire({
                  title: 'حذف با موفقیت انجام شد',
                  text:'حذف آدرس با موفقیت انجام شد',
                  icon:'success',
                  confirmButtonColor:"#27ae60",
                  confirmButtonText: 'متوجه شدم',
              })
          }
        });
      },
      addAdress(){
        Swal.fire({
          title: '<h5>افزودن آدرس</h5>',
          html: `<input type="text" name="addresstoadd" v-model="newAddress" class="form-control new-address-form" />`,
          icon: 'info',
          confirmButtonText: 'اضافه کن',
          confirmButtonColor:"#009432",
          CancelButtonColor:"#95a5a6",
          cancelButtonText:"انصراف",
          showCancelButton: true,
        }).then(result=>{
          this.newAddress = document.querySelector(".new-address-form").value
          if (result.isConfirmed && this.newAddress != '') {

              this.address.push(this.newAddress);
              Swal.fire({
                  title: 'موفق',
                  text:'آدرس با موفقیت اضافه شد',
                  icon:'success',
                  confirmButtonColor:"#27ae60",
                  confirmButtonText: 'متوجه شدم',
              })
              this.newAddress = "";
          }
        });
      },
      saveProfile(){

      },
      
      
    },
    mounted(){
      setTimeout(()=>{
        let fileInput= document.querySelector(".avatar-img__input")
        $(".avatar-img__input").on('change', (e)=> {
          this.fileImg = e.target.files[0];
        });
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