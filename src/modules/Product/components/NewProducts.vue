<template>
  <section class="dragable-list">
    <div class="title">
      <h3 class="title-new-product">جدیدترین محصولات</h3>
    </div>
    <div id="owl-product" class="owl-carousel owl-theme">
      <div class="item" v-for="product in products">
        <Product :product="product" />
      </div>
    </div>
  </section>
</template>
<script>
  import axios from "axios"
  import Product from './Product';
  export default {
    name: "NewProducts",
    components:{
      Product,
    },
    data(){
      return {
        products:[],
      }
    },
    mounted(){
      axios.get("product/new/").then(response=>{
        this.products = response.data;
      })
    }
    
  }
</script>