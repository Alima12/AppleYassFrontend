<template>

  <div class="main-content">
    <form action="" @submit.prevent="saveSetting()">
       <div class="profile__info border cursor-pointer text-center">
          <div class="avatar__img">
            <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg" class="avatar___img">
            <input type="file" accept="image/*" class="hidden avatar-img__input">
            <div class="v-dialog__container" style="display: block;"></div>
            <div class="box__camera default__avatar"></div>
          </div>
        </div>
      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="fullname" class="mb-2">عنوان سایت:</label>
          <input name="fullname" v-model="webTitle" type="text" class="text font-size-13" placeholder="این متن در تب مرورگر نمایش داده میشود">
        </div>
       
      </div>


      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="email" class="mb-2">تلفن تماس:</label>
          <input  name="email" v-model="phoneNumber" type="text" class="text font-size-13 text-end" placeholder="تلفن تماس">
        </div>
      </div>
      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="number" class="mb-2">آدرس:</label>
          <input name="number" v-model="address" type="text" class="text font-size-13 text-end" placeholder="آدرس">
        </div>
       
        
      </div>


      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="number" class="mb-2">درباره ما:</label>
          <textarea name="aboutUs" v-model="aboutUs" class="form-control" placeholder="درباره ما"></textarea>
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
              <img :src="certificate.img" alt="" />
            </div>
            <div class="certi-body">
              <label class="custom-file-upload">
                  <input type="file" class="file-input" @change="changeCertificate(certificate.id)" :class="`file-input-${certificate.id}`" />
                  <i class="fas fa-upload"></i>
              </label>
              <i class="fa fa-times" @click="removeCertificate(certificate.id)"></i>
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






      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="number" class="mb-2">متن کپی رایت:</label>
          <input name="aboutUs" v-model="copyRights" class="form-control" placeholder="متن کپی رایت" />
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
  export default {
    name: "Setting",
    components:{},
    created(){
       
    },
    data(){
      return{
        certificates:[
          {id:0,img:"https://www.digikala.com/static/files/6e2d6b38.png"},
        ],
        copyRights:"",
        aboutUs:"",
        webTitle:"",
        address:"",
        phoneNumber:"",

      }
    },
    methods:{
      addCertificate(){
        this.certificates.push({id:this.certificates.length,img:"https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png"})
      },
      removeCertificate(id){
        this.certificates = this.certificates.filter(c=> c.id != id);
      },
      changeCertificate(id){
        let file = document.querySelector(`.file-input-${id}`);
        this.certificates.find(c=> c.id == id).img = URL.createObjectURL(file.files[0])
      },
      saveSetting(){
        // do ajax
        
      }
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