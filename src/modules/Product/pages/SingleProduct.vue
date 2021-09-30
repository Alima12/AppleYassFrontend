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
            <a href="#"  v-for="item in product.images">
              <img @click="setImage(item.id)" :src="item.image" alt="">
            </a>
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
          <a href="" v-for="color in product.colors">
            <i  class="fa fa-circle fa-3x" :style="`color: ${color}`"></i>
          </a>
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
            <input name="number-product" type="number"  class="form-control" :max="product.maxCount?product.maxCount: 1" min="1" value="1">
          </div>
          <div class="existance" v-if="product.inventory<=5">
            <span class="count">فقط {{product.inventory}} عدد باقی مانده</span>
          </div>
          <div class="cost">
            <span>{{product.price}}</span>
          </div>
          <button class="btn btn-success text-center">افزودن به سبد خرید</button>
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
</div>
</template>
<script>
  import "@/assets/css/product.css";
  import Product from '../components/Product';
 
  export default {
    name: "SingleProduct",
    components:{
      Product,
    },
    data(){
      let product = this.$store.getters.getProduct(this.$route.params.code)
      let likelyProcuts =this.$store.getters.getProducts;
      return{
        image  : "",
        product:product,
        products:likelyProcuts,
        

      }
    },
    mounted(){
      this.image = this.product.images[0].image
    },
    methods:{
      setImage(imageId){
        console.log(imageId)
        this.image = this.product.images.find(img=> img.id == imageId).image
      },
      addFavorite(){
        this.product.isUserFavorite = !this.product.isUserFavorite;
      }

    }
  }
</script>