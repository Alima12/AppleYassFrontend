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
  import Product from './Product';
  export default {
    name: "NewProducts",
    components:{
      Product,
    },
    data(){
      let products = this.$store.getters.getProducts.filter(product=> product.newProduct)
      return {
        products:products
      }
    },
    
  }
</script>