<template>

  <div class="main-content">
    <form action="" @submit.prevent="saveSetting()" id="settingForm">
       <div class="profile__info border cursor-pointer text-center">
          <div class="avatar__img">
            <img :src="'http://127.0.0.1:8000'+setting.logo" :class="'avatar___img-'+setting.id">
            <input type="file" accept="image/*" name="logo" :class="'hidden avatar-img__input-'+setting.id" @change="changeLogo()" />
            <div class="v-dialog__container" style="display: block;"></div>
            <div class="box__camera default__avatar"></div>
          </div>
        </div>
      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="browser_title" class="mb-2">عنوان مرورگر:</label>
          <input name="browser_title" v-model="setting.browser_title" type="text" class="text font-size-13" placeholder="این متن در تب مرورگر نمایش داده میشود">
          <small style="font-size:12px">*اسمی که در بالای مرورگر نشان داده میشود</small>
        </div>
      </div>

      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="web_name" class="mb-2">عنوان سایت:</label>
          <input name="web_name" v-model="setting.web_name" type="text" class="text font-size-13" placeholder="این متن در تب مرورگر نمایش داده میشود">
        </div>
      </div>


      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="contact_us" class="mb-2">تلفن تماس:</label>
          <input  name="contact_us" v-model="setting.contact_us" type="text" class="text font-size-13 text-end" placeholder="تلفن تماس">
        </div>
      </div>
      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="our_address" class="mb-2">آدرس:</label>
          <input name="our_address" v-model="setting.our_address" type="text" class="text font-size-13 text-end" placeholder="آدرس">
        </div>
       
        
      </div>

      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="seo_key_words" class="mb-2">کلمات کلیدی برای سئو:</label>
          <small style="margin-right:5px; font-size:12px">عبارات را بویسه ویرگول از هم جدا کنید => ,</small>
          <textarea name="seo_key_words" v-model="setting.seo_key_words" class="form-control" placeholder="درباره ما"></textarea>
        
        </div>
      </div>



      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="about_us" class="mb-2">درباره ما:</label>
          <textarea name="about_us" v-model="setting.about_us" class="form-control" placeholder="درباره ما"></textarea>
        </div>
      </div>


      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="copy_rights" class="mb-2">متن کپی رایت:</label>
          <input name="copy_rights" v-model="setting.copy_rights" class="form-control" placeholder="متن کپی رایت" />
        </div>
      </div>

      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="number" class="mb-2">مجوز ها:</label>
            <div class="row p-1">
              <hr>
            </div>
        </div>


        <div class="col-lg-4 col-md-6 col-sm-12 my-2" v-for="certificate in certificates">  
          <div class="certi-wrapper">
            <div class="certi-image">
              <img :src="certificate.image" alt="" />
              <input type="text" class="form-control" v-model="certificate.title" @blur="updatetext(certificate)">
            </div>
            <div class="certi-body">
              <label class="custom-file-upload">
                  <input type="file" class="file-input" @change="changeCertificate(certificate)" :class="`file-input-${certificate.id}`" />
                  <i class="fas fa-upload"></i>
              </label>
              <i class="fa fa-times" @click="removeCertificate(certificate)"></i>
            </div>
          </div>
        </div>


      </div>

      <div class="row p-1">
        <div class="col-4 mx-auto text-center">
          <button class="btn btn-outline-success w-100" style="padding:10px 60px" @click="addCertificate()">
            <i class="fa fa-plus"></i>
          </button>
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
import axios from 'axios'
  import Swal from 'sweetalert2'

  export default {
    name: "Setting",
    components:{},
    created(){
       
    },
    mounted(){
      axios.get("config/").then(response=>{
        this.setting = response.data
      })
      axios.get("config/certificates/").then(response=>{
        this.certificates = response.data
      })
    },
    data(){
      return{
        certificates:[],
        setting:{},
        logoChanged:false,
        logoFile:""

      }
    },
    methods:{
      updatetext(cer){
        let data = new FormData()
        data.append("title", cer.title)
        axios.put(`config/certificates/${cer.id}/update/`, data).then(response=>{
            this.setAlert("مجوز مورد نظر با موفقیت بروزرسانی شد", "success")
        })
      },
      addCertificate(){
        axios.post(`config/certificates/add/`).then(response=>{
            this.certificates.push(response.data)
        })
      },
      removeCertificate(cer){
        Swal.fire({
          title: 'از حذف این مجوز اطمینان دارید؟',
          html: `${cer.title}`,
          icon: 'warning',
          confirmButtonText: 'حذف کن',
          confirmButtonColor:"#e74c3c",
          CancelButtonColor:"#95a5a6",
          cancelButtonText:"انصراف",
          confirmButtonText: 'حذف',
          showCancelButton: true,
        }).then(result=>{
          if (result.isConfirmed) {
            axios.delete(`config/certificates/${cer.id}/destroy/`).then(response=>{
              this.setAlert("مجوز مورد نظر با موفقیت حذف شد", "error")
              this.certificates = this.certificates.filter(c=> c.id != cer.id)
            })
          }
        });
      },
      changeCertificate(cer){
        let file = document.querySelector(`.file-input-${cer.id}`);
        cer.image = URL.createObjectURL(file.files[0])
        let data = new FormData()
        data.append("image", file.files[0])
        axios.put(`config/certificates/${cer.id}/update/`, data).then(response=>{
            this.setAlert("مجوز مورد نظر با موفقیت بروزرسانی شد", "success")
        })
      },
      changeLogo(){
        let file = document.querySelector(`.avatar-img__input-${this.setting.id}` );
        this.logoChanged = true;
        this.logoFile = file.files[0];
        let image = document.querySelector(`.avatar___img-${this.setting.id}`);
        image.src = URL.createObjectURL(file.files[0])
      },
      saveSetting(){
        let data = new FormData(document.querySelector("#settingForm"))
        if(this.logoChanged){
          data.append("logo", this.logoFile);
        }
        axios.put(`config/setting/${this.setting.id}/update/`, data).then(response=>{
          this.setAlert("تنظیمات با موفقتی بروز شد", "success")
        })

        console.log(data)

        
      },
      setAlert(message, type){
        this.$toast.open({
            message:message,
            type:type,
            duration:5000,
            position: 'top'

        })
      },
    }
  }

</script>
<style>
  .certi-wrapper{
    position: relative;
    border: 1px solid #555;
    padding: 10px 30px;
  }

  .certi-wrapper .certi-image{
    padding: 10px 20px;
    
  }

  .certi-wrapper .certi-image img{
    width: 100%;
  }

  .certi-wrapper .certi-body{
    position: absolute;
    top: 10px;
    left: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    
  }
  
  .certi-wrapper .certi-body i.fa-times{
    color: red;
    font-size: 25px;
    cursor: pointer;
  }

  .certi-wrapper .certi-body i.fa-pencil{
    color: orangered;
    font-size: 25px;
    cursor: pointer;
  }

 .file-input {
    display: none;
    
  }
  .file-input::before{
    content: "/f382";
    
  }
  .custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }

</style>