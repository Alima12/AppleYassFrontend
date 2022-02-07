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
import axios from 'axios'
  import Product from './Product'

  export default {
    name: "Productions",
    components:{
      Product,
    },
    data(){
      return {
        products: [],
      }
    },
    mounted(){
      axios.get("product/hot/").then(response=>{
        this.products = response.data;
      })
    },
    watch:{
    }
  }
</script>