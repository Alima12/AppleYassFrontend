<template>
  <section class="page-producs container-fluid p-3 mt-4">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="product in products">
          <Product :product="product" />
        </div>
      </div>
  </section>
</template>
<script>
  import Product from './Product'

  export default {
    name: "Productions",
    components:{
      Product,
    },
    data(){
      let products = this.$store.getters.getProducts.filter(product=>product.hotProduct)
      return {
        products: products,
      }
    }
  }
</script>