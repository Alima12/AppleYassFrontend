<template>

  <div class="main-content">
    <div class="tab__box">
      <div class="tab__items">
          <router-link class="tab__item is-active" to="">همه محصولات</router-link>
          <router-link class="tab__item" to="">
            همه محصولات
            
          </router-link>
          <router-link class="tab__item" to="">
            افزودن محصولات
            <i class="fa fa-plus-circle mr-1 text-success"></i>  
          </router-link>
      </div>
    </div>
    <div class="pagination row">
      <div class="col-lg-6 col-md-8 col-sm-12 mx-auto pages-container">
        <router-link :to="`/panel/products/`+ (parseInt(page) -1).toString()" class="page-item perv">قبلی</router-link>
        <router-link :to="`/panel/products/` + (parseInt(page) -2).toString()"   class="page-item extra">{{page-2}}</router-link>
        <router-link :to="`/panel/products/` + (parseInt(page) -1).toString()"   class="page-item extra">{{page-1}}</router-link>
        <router-link :to="`/panel/products/` + page" class="page-item active">{{page}}</router-link>
        <router-link :to="`/panel/products/` + (parseInt(page) + 1).toString()"   class="page-item extra">{{parseInt(page)+1}}</router-link>
        <router-link :to="`/panel/products/` + (parseInt(page) +2).toString()"   class="page-item extra">{{parseInt(page)+2}}</router-link>
        <router-link :to="`/panel/products/` + (parseInt(page) + 1).toString()" class="page-item next">
          بعدی
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Products",
    components:{},
    data(){
      let products = this.$store.getters.getProducts.filter(product=>product.hotProduct)
      return {
        products,
        page:0,
      }
    },
    created(){
      this.page = this.$route.params.id;
    },
  }

</script>

<style>
.pagination{
  margin-top: 20px;
  width: 100%;

}
.pagination .pages-container{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #666;
  border-radius: 10px;

}

.pagination .pages-container .page-item{
  margin: 10px 15px;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 10px;

  
}
.pagination .pages-container .page-item:hover{
  background-color: rgba(52, 152, 219,.5);
}

.pagination .pages-container .page-item.active{
  background-color: #3498db;
  color: white;
}

.pagination .pages-container .page-item.next{
    font-weight: bold;
}

.pagination .pages-container .page-item.perv{
    font-weight: bold;
  
}
@media only screen and (max-width:720px) {
  .pagination .pages-container .page-item.extra{
    display: none;
    color: red;
  }
  
}
</style>