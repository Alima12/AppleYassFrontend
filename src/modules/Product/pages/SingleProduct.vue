<template>
<div class="container-fluid single-product">
  <div class="row mb-3">
    <h3 class="text-center">{{product.name}}</h3>
    <div class="px-3 mb-3">
      <hr />
    </div>
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
          <i v-for="item in product.stars" class="fa fa-star"></i>
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
              <li v-for="attribute in product.attributes">{{attribute}}</li>
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
        <div class="item" v-for="product in products">
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
                  <i class="item" v-for="tech in product.technicalattrs">
                    <spna class="title">{{tech.name}}</spna>
                    <spna class="content">{{tech.value}}</spna>
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
                {{product.moreDetails}}
              </div>
            </div>
          </div>
        </div>
       
    </div>
    
    </div>
  </div>


  <div class="row">
    <Comments  :commentList="product.comments" />
  </div>

</div>
</template>
<script>
  import "@/assets/css/product.css";
  import Product from '../components/Product';
  import Comments from '../components/Comments';

 
  export default {
    name: "SingleProduct",
    components:{
      Product,
      Comments
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
      }
    },
    created(){
      this.setProduct(this.$route.params.code)
    },
    mounted(){
      window.scrollTo({top:0,behavior:"smooth"})
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
        this.price = color.price;
        this.activeColor = color.color;
        this.inventory = color.inventory;
      },
      setProduct(code){
        let product = this.$store.getters.getProduct(code);
        let price = product.colors[0].price;
        let activeColor= product.colors[0].color;
        let inventory= product.colors[0].inventory;
        let likelyProcuts =this.$store.getters.getProducts;
        this.product = product;
        this.products = likelyProcuts;
        this.price = price;
        this.activeColor = activeColor;
        this.inventory = inventory;
        this.image = this.product.images[0].image
    },
    addToCart(){
      let color = this.product.colors.find(color=> color.color == this.activeColor).color;
      let items = this.$store.getters.getCartItems;
      let cartItem = items.find(item=>item.code == this.product.code && item.color == color)
      if(cartItem){
        this.$store.dispatch("updateItem",[cartItem.code,this.count,color]);
      }else{
        let item = {
          code:this.product.code,
          color,
          count:this.count,
          price: this.price,
          img:this.image,
          name:this.product.name

        }
        this.$store.dispatch('addItem',item);
      }

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