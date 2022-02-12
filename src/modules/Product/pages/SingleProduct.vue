<template>
<div class="container-fluid single-product">
  <div class="row mb-3">
    <h3 class="text-center">{{product.name}}</h3>
    <div class="col-lg-5 col-md-12 col-sm-12">
      <div class="image-container">
        <img :src="image" alt="" class="active-image">
        <div class="actions">
          <a href="#" class="add-fav"><i @click="addFavorite()" class="fa fa-heart" :class="{'active':product.isUserFavorite == true}"></i></a>
        </div>
        <div class="other-images">
          <div class="preview-container">
            <span v-for="item in product.images">
              <img @click="setImage(item.id)" :src="item.image" alt="">
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-md-12 col-sm-12">
      <div class="detial-container">
        <p class="title">{{product.title}}</p>
        <div class="stars">
          <p>امتیاز: &nbsp; &nbsp;</p>
          <i v-for="item in product.rate" class="fa fa-star"></i>
          <i v-for="item in (5 - product.rate)" class="fa fa-star empty"></i>

        </div>
        <div class="clearfix">
          <small>تنها خریداران حق ثبت امتیاز دارند</small>
        </div>
        <div class="colors">
          <span v-for="color in product.colors">
            <div :class="{'active':activeColor == color.color}" :style="`background-color: ${color.color}`" @click="setPrice(color)"> </div>
          </span>
        </div>
        <div class="mt-4">
          <p>ویژگی ها:</p>
          <div class="attributes">
            <ul>
              <li v-for="attribute in product.attributes">{{attribute.text}}</li>
            </ul>
           
          </div>
        </div>



      </div>
    </div>
    <div class="col-lg-3 col-md-12 col-sm-12">
      <div class="buy-box">
        <div class="guarantee">
          <i class="fa fa-certificate"></i>
          <span>{{product.guarantee}}</span>
        </div>
        <div class="buy">
          <div class="counts">
            <label for="number-product">تعداد:</label>
            <input type="number" v-model="count" class="form-control" :max="inventory" />
          </div>
          <div class="existance" v-if="inventory<=5" :class="{'zero':inventory <= 0}">
            <span class="count" v-if="inventory > 0">فقط {{inventory}} عدد باقی مانده</span>
            <span v-else>موجود نیست</span>
          </div>
          <div class="cost" v-if="inventory > 0">
            <span>{{price.toLocaleString()}} تومان</span>
          </div>
          <button @click="addToCart()" class="btn btn-success text-center" :class="{'disabled':inventory == 0}">افزودن به سبد خرید</button>
        </div>
      </div>
    </div>

  </div>
  <div class="row">
    <section class="dragable-list">
      <div class="title">
        <h3 class="title-new-product">
          <span>
            محصولات مشابه
          </span>
        </h3>
      </div>
      <div id="owl-product-likely" class="owl-carousel owl-theme">
        <div class="item" v-for="product in relatedProduct">
          <Product :product="product" />
        </div>
      </div>
    </section>
  </div>
  
  <div class="row" style="margin: 70px 0px;">

    <div class="" style="paddingl-right:20px">
      <h4 style="font-wright:bold; color:#555; padding-right:30px; border-bottom: 2.5px solid #e74c3c; width:120px; padding-bottom:15px;font-weight:bold;">بررسی</h4>
    </div>
    <div class="col-12 mt-2">
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed collapse-title" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              مشخصات فنی
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              <div class="detail-section">
                <ul>
                  <i class="item" v-for="tech in product.technical">
                    <spna class="title">{{tech.name}}</spna>
                    <spna class="content">{{tech.text}}</spna>
                  </i>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button class="accordion-button collapsed collapse-title" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              نقد و بررسی
            </button>
          </h2>
          <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              <div class="detail-section" style="text-align:justify;">
                {{product.detail}}
              </div>
            </div>
          </div>
        </div>
       
    </div>
    
    </div>
  </div>

      <loading 
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
      />
  <div class="row">
    <Comments :code="code" />
  </div>

</div>
</template>
<script>
  import "@/assets/css/product.css";
  import Product from '../components/Product';
  import Comments from '../components/Comments';

  import Loading from 'vue-loading-overlay';
  import axios from 'axios'

 
  export default {
    name: "SingleProduct",
    components:{
      Product,
      Comments,
      loading:Loading
    },

    data(){
      return{
        image:"",
        product:{},
        products:[],
        price:0,
        activeColor:"white",
        inventory:0,
        count:1,
        isLoading: true,
        fullPage: true,
        colorId:0,
        relatedProduct:[],
        code:""
      }
    },
    created(){
      let code = this.$route.params.code;
      this.code = code
      axios.get(`${code}/`).then(response=>{
        let product = response.data
        this.isLoading = false;
        axios.get(`${code}/colors/`).then(response=>{
          product.colors = response.data;
          this.setProduct(product)
        })
      })
      axios.get(`${code}/related/`).then(response=>{
        this.relatedProduct = response.data
        
      })
    },
    mounted(){
      window.scrollTo({top:0,behavior:"smooth"})
      setTimeout(()=>{
        let responsive = {
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:4
          }
        }
        $("#owl-product-likely").owlCarousel({
            rtl:true,
            margin:10,
            responsive
          
        })
      },2000);
    },
    methods:{
      setImage(imageId){
        this.image = this.product.images.find(img=> img.id == imageId).image
      },
      addFavorite(){
        this.product.isUserFavorite = !this.product.isUserFavorite;
      },
      setactive(color){
        if (color == '#f1c40f'){
          return 'active'
        }
        return ''
      },
      setPrice(color){
        console.log(color.price)
        this.price = color.get_price;
        this.activeColor = color.color;
        this.inventory = color.inventory;
        this.colorId = color.id;
        this.count = 1;
      },
      setProduct(product){
        if(product.hasOwnProperty('colors') && product.colors.length>0){
          let price = product.colors[0].get_price;
          let activeColor= product.colors[0].color;
          let inventory= product.colors[0].inventory;
          this.colorId = product.colors[0].id;
          this.price = price;
          this.activeColor = activeColor;
          this.inventory = inventory;
        }
        this.product = product;
        this.image = this.product.images[0].image
    },
    addToCart(){
      let user = this.$store.getters.isLogined
      if(user){
        let data = new FormData();
        data.append("count", this.count);
        data.append("color_id", this.colorId);
        this.$store.dispatch("addCartItem", data);
        this.$router.push('/cart')
      }
        let result = localStorage.getItem("cart-items") ? JSON.parse(localStorage.getItem("cart-items")) : []
        result.push(
          {
            color_id:this.colorId,
            count:this.count
          }
        )
        let str = JSON.stringify(result)
        localStorage.setItem("cart-item",str)

    }

    },
    watch: {
      '$route' (to, from) {
        if(this.$route.name=="SingleProduct"){
          this.setProduct(this.$route.params.code)
          window.scrollTo({top:0,behavior:"smooth"})
        }
      },
      count(value){
        if(value > this.inventory){
          this.count = this.inventory
        }else if(value <=0){
          this.count = 1;
        }
      }
    },
  }
</script>
<style>
.collapse-title{
  font-weight:bold;
}
</style>