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
            <input name="number-product" type="number"  class="form-control" :max="product.maxCount?product.maxCount: 1" min="1" value="1">
          </div>
          <div class="existance" v-if="inventory<=5" :class="{'zero':inventory <= 0}">
            <span class="count" v-if="inventory > 0">فقط {{inventory}} عدد باقی مانده</span>
            <span v-else>موجود نیست</span>
          </div>
          <div class="cost" v-if="inventory > 0">
            <span>{{price.toLocaleString()}} تومان</span>
          </div>
          <button class="btn btn-success text-center" :class="{'disabled':inventory == 0}">افزودن به سبد خرید</button>
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
      let product = this.$store.getters.getProduct(this.$route.params.code);
      let price = product.colors[0].price;
      let activeColor= product.colors[0].color;
      let inventory= product.colors[0].inventory;
      let likelyProcuts =this.$store.getters.getProducts;
      return{
        image  : "",
        product:product,
        products:likelyProcuts,
        price:price,
        activeColor:activeColor,
        inventory:inventory

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
      }

    }
  }
</script>