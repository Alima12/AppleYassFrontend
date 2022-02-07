<template>

       <form action="" @submit.prevent="saveOffer()">

        <div class="row p-1">
            <div class="col-lg-12 col-md-12 col-sm-12">  
            <label for="name" class="mb-2">کد محصول:</label>
            <input  name="name" @blur="getProduct()" v-model="code" type="text" class="text font-size-13" placeholder="نام محصول">
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12" v-if="product_error != null">
                <p class="alert alert-danger text-center">{{product_error}}</p>
            </div>
        </div>

        <div class="row p-1 d-flex justify-content-between align-items-center" v-if="product != null">
            <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                <div :class="{'active':offer.product.id == color.id}" class="color-item" v-for="color in product.colors" @click="setColor(color)">
                    <p>رنگ  <i class="fa fa-circle" :style="`color: ${color.color}`" ></i></p>
                    <p>قیمت {{color.price.toLocaleString()}}</p>
                    <p>تعداد {{color.inventory}}</p>
                </div>
            </div>

        </div>


        <div class="row p-1">
            <div class="col-lg-12 col-md-12 col-sm-12 image-wrapper">  
                <div class="image-exact" v-if="offer.image != null">
                    <div class="img">
                        <img :src="offer.image" alt="">
                    </div>
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">  
            <label for="image" class="mb-2">تصویر محصول:</label>
            <input @change="setImage()" id="product-image"  name="image" type="file" accept=".jpg, .png, .jpeg, .gif" class="font-size-13" placeholder="تصویر محصول">
            </div>
        </div>



        <div class="row p-1">
            <div class="col-lg-12 col-md-12 col-sm-12">  
            <label for="title" class="mb-2">عنوان تخفیف:</label>
            <input  name="title" v-model="offer.title" type="text" class="text font-size-13" placeholder="عنوان تخفیف">
            </div>
        </div>
        <div class="row p-1">
            <div class="col-lg-12 col-md-12 col-sm-12">  
            <label for="percent" class="mb-2">درصد تخفیف:</label>
            <input  name="percent" v-model="offer.percent" type="number" max="99" min="1" class="text font-size-13" placeholder="درصد تخفیف">
            </div>
        </div>
        
        <div class="row p-1">
            <div class="col-lg-12 col-md-12 col-sm-12 image-wrapper">  
                <div class="image-exact" v-if="offer.percent_image != null">
                    <div class="img">
                        <img :src="offer.percent_image" alt="">
                    </div>

                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">  
            <label for="percent_image" class="mb-2">تصویر تخفیف:</label>
            <input @change="setPercent()" id="percent-image"  name="percent_image" type="file" accept=".jpg, .png, .jpeg, .gif" class="font-size-13" placeholder="تصویر تخفیف">
            </div>
        </div>


        <div class="row p-1 mt-3">
            <div class="col-lg-12 col-md-12 col-sm-12">  
            <label for="name" class="m-2">اعتبار تا:</label>
                <custom-date-picker v-model="offer.till"></custom-date-picker>
            </div>
        </div>



        <div class="row p-1">
            <div class="col-lg-12 col-md-12 col-sm-12 notification__box"> 
                <div class="notificationGroup">
                    <input id="option2" v-model="offer.limited" name="reuseable" type="checkbox" />
                    <label for="option2">استفاده چند باره</label>
                </div>
            </div>
        </div>



        

        <div class="row p-1 my-3">
            <div class="col-lg-4 col-md-8 col-sm-12 mx-auto p-2">
            <button class="w-100 btn btn-primary p-3">
                <span>
                ذخیره
                </span> 
            </button>
            </div>
        </div>



    </form>
      <loading 
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
      />
</template>
<script>
    import Swal from 'sweetalert2'
    import DatePicker from 'vue3-persian-datetime-picker'
    import Loading from 'vue-loading-overlay';
    import axios from 'axios'

  export default {
    name: "AddOffer",
    components:{DatePicker, loading:Loading},
    data(){
      return{
          isLoading: false,
          fullPage: false,
          offer:{product:{}},
          product:null,
          product_error:null,
          code:""
          
      }
    },
    methods:{
        isActive(date){
            let before = new Date(date);
            let now = new Date();
            let dif = now - before;
            if(dif < 0){
                return true
            }
            return false
        },
        saveOffer(){
            let data = new FormData()
            let image = document.querySelector("#product-image");
            let percent = document.querySelector("#percent-image");
            
            data.append("title", this.offer.title)
            data.append("image", image.files[0])
            data.append("percent", this.offer.percent)
            data.append("percent_image", percent.files[0])
            data.append("color_id", this.offer.product.id)
            data.append("limited", !this.offer.limited)
            data.append("till", this.offer.till)
            axios.post("config/super-offer/list/", data).then(response=>{
                Swal.fire({
                    title: 'موفق',
                        text:'با موفقیت اضافه شد',
                        icon:'success',
                        confirmButtonColor:"#27ae60",
                        confirmButtonText: 'باشه!',
                }).then((e)=>{
                    this.$router.push("/panel/superoffer/")
                })
            })
            

        },
        setImage(){
            let image = document.querySelector("#product-image");
            this.offer.image = URL.createObjectURL(image.files[0])
        },
        setPercent(){
            let image = document.querySelector("#percent-image");
            this.offer.percent_image = URL.createObjectURL(image.files[0])
        },
        getProduct(){
            axios.get(`${this.code}/`).then(response=>{
                this.product = response.data;
                this.product_error = null;

            }).catch(err=>{
                this.product_error = "محصولی با این کد پیدا نشد"
                this.product = null;

            })
        },
        setColor(color){
            this.offer.product = color;
        }
    }
    
  }

</script>
<style>
.color-item{
    background-color: rgb(226, 221, 221);
    padding: 10px;
    border: 1px inset #555;
    margin: 4px 2px;
    cursor: pointer;
}
.color-item.active{
    background-color: #3498db;
    border: 1px inset #111;
}
.color-item.active p{
    color: white;
    padding: 2px;
}
.color-item p{
    color: #2c3e50;
    padding: 2px;
}
</style>