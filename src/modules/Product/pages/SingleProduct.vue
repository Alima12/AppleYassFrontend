<template>
<div class="container-fluid single-product">
  <div class="row mb-3">
    <h3 class="text-center">{{product.name}}</h3>
    <div class="px-3 mb-3">
      <hr />
    </div>
    <div class="col-lg-6 col-md-12 col-sm-12">
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
    <div class="col-lg-3 col-md-12 col-sm-12">
      <div class="detial-container">
        <p class="title">{{product.title}}</p>
        <div class="stars">
          <p>امتیاز: &nbsp; &nbsp;</p>
          <i v-for="item in product.stars" class="fa fa-star"></i>

        </div>
        <div class="cost">
          <span>{{product.cost}}</span>
        </div>
        <div class="colors">
          <a href="" v-for="color in product.colors">
            <i  class="fa fa-circle fa-3x" :style="`color: ${color}`"></i>
          </a>
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
            <input name="number-product" type="number" class="form-control" :max="product.maxCount" min="1" value="1">
          </div>
          <div class="existance">
            <span class="count">فقط {{product.inventory}} عدد باقی مانده</span>
          </div>
          <button class="btn btn-success text-center">افزودن به سبد خرید</button>
        </div>
      </div>
    </div>

  </div>

  <div class="row"></div>
</div>
</template>
<script>
  import "@/assets/css/product.css";
  export default {
    name: "SingleProduct",
    data(){
      return{
        image  : "",
        product:{
          name:"خرید گوشی آیفون 12 64 گیگ",
          title:"iphone 11 ProMax 256G",
          stars:5,
          cost: "29,000,000 تومان",
          colors:["#e74c3c","#f1c40f","#2c3e50"],
          guarantee:"گارانتی بازگشت وجه 7 روزه",
          maxCount:4,
          inventory: 20,
          isUserFavorite:false,
          images: [
            {id:1,image:"https://dkstatics-public.digikala.com/digikala-products/113542044.jpg"},
            {id:2,image:"https://dkstatics-public.digikala.com/digikala-products/113542040.jpg"},
            {id:3,image:"https://dkstatics-public.digikala.com/digikala-products/113542037.jpg"}
          ]
        },

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