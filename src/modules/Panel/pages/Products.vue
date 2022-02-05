<template>
  <div class="main-content">
    <div class="tab__box">
      <div class="tab__items">
          <router-link class="tab__item" exact-active-class="is-active" to="/panel/products">همه محصولات</router-link>
          <router-link class="tab__item" to="/panel/products/new" exact-active-class="is-active">
            افزودن محصولات
            <i class="fa fa-plus-circle mr-1 text-success"></i>  
          </router-link>
      </div>
    </div>

    <div class="product-list" v-if="/.{1}panel.{1}products(.{1}\d*)?$/.test($route.path)">

      <div class="table__box">
        <table class="table">
            <thead role="rowgroup">
            <tr role="row" class="title-row">
                <th>کد محصول</th>
                <th>عکس</th>
                <th>اسم</th>
                <th>عنوان</th>
                <th>دسته بندی</th>
                <th>امتیاز</th>
                <th>گارانتی</th>
                <th>محصول جدید</th>
                <th>محصول داغ</th>
                <th>پیشنهاد ویژه</th>
                <th>تخفیف ویژه</th>
                <th>قیمت</th>
                <th>عملیات</th>


            </tr>
            </thead>
            <tbody>
            <tr role="row" v-for="product in products">
                <td>{{product.code}}</td>
                <td >
                  <img v-if="product.images.length > 0" width="120" :src="product.images[0].image" alt="">
                  <p v-else>عکس ندارد</p>
                </td>
                <td class="fw-bold">{{product.name}}</td>
                <td class="fw-bold">{{product.title}}</td>
                <td class="fw-bold">
                  <p v-if="product.category">
                    {{product.category.name}}
                  </p>
                  <p v-else>بدون دسته بندی</p>
                </td>
                <td>
                  <div class="stars">
                    <i v-for="star in product.stars" class="fa fa-star"></i>
                  </div>
                </td>
                <td>{{product.guarantee}}</td>
                <td class="pt-3">
                  <i class="fa fa-check-circle fa-2x text-success" v-if="product.is_new"></i>
                  <i class="fa fa-times-circle fa-2x text-danger" v-else></i>
                </td>
                <td class="pt-3">
                  <i class="fa fa-check-circle fa-2x text-success" v-if="product.is_hot"></i>
                  <i class="fa fa-times-circle fa-2x text-danger" v-else></i>
                </td>
                <td class="pt-3">
                  <i class="fa fa-check-circle fa-2x text-success" v-if="product.is_special_offer"></i>
                  <i class="fa fa-times-circle fa-2x text-danger" v-else></i>
                </td>
                <td class="pt-3">
                  <i class="fa fa-check-circle fa-2x text-success" v-if="product.is_super_offer"></i>
                  <i class="fa fa-times-circle fa-2x text-danger" v-else></i>
                </td> 
                <td  style="background-color:rgba(189, 195, 199,.5); border:1px solid #999">
                  <p class="d-flex align-items-center"  v-for="color in product.colors" style="padding:5px 10px">
                    <i class="fa fa-circle fa-2x" :style="`color:${color.color};margin-left:10px`"></i>
                    <span class="fw-bold">{{color.price.toLocaleString()}}</span>&nbsp; | &nbsp;
                    <span class="fw-bold">{{color.inventory}}</span>  موجود
                  </p>
                </td>
                <td>
                  <a class="btn btn-outline-success mx-1" title="مشاهده" :href="`/product/${product.code}`" target="_blank">
                    <i class="fa fa-eye"></i>
                  </a>
                  <a class="btn btn-outline-primary" title="ویرایش" :href="`/panel/products/edit/${product.code}`">
                    <i class="fa fa-pencil"></i>
                  </a>
                
                </td>
            </tr>

            </tbody>
        </table>
      </div>

      <div class="pagination row">
        <div class="col-lg-6 col-md-8 col-sm-12 mx-auto pages-container">
          <router-link v-if="previous != null" :to="goPreviousPage()" class="page-item perv">قبلی</router-link>
          <router-link v-if="previous != null" :to="goPreviousPage()" class="page-item extra">{{page-1}}</router-link>
          <p class="page-item active">{{page}}</p>
          <router-link v-if="next!= null" :to="goNextPage()"   class="page-item extra">{{parseInt(page)+1}}</router-link>
          <router-link v-if="next != null" :to="goNextPage()" class="page-item next">
            بعدی
          </router-link>
        </div>
      </div>
    </div>


    <div class="new-product" v-else-if="/.{1}panel.{1}products.{1}new$/.test($route.path)">
        <CreateProduct />
    </div>

    <div class="new-product" v-else>
        <EditProduct />
    </div>


    <loading 
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      />
  </div>
</template>
<script>
  import CreateProduct from '../components/CreateProduct'
  import EditProduct from '../components/EditProduct'

  import Loading from 'vue-loading-overlay';
  import axios from "axios"
  export default {
    name: "Products",
    components:{CreateProduct, Loading, EditProduct},
    data(){
      return {
        isLoading:true,
        products:"",
        page:1,
        max:1,
        next:null,
        previous:null
      }
    },
    mounted(){
      // `/panel/products/` + (parseInt(page) + 1).toString()
      let query = this.$route.query;
      this.page = query.page ? query.page : 1
      if (this.page < 1){
        this.page = 1
      }
      this.setProducts()
    },
    created(){
      this.page = this.$route.params.id ? this.$route.params.id : 1
      
    },
    updated(){
      this.page = this.$route.params.id ? this.$route.params.id : 1
    },
    watch:{
      page(){
        this.setProducts()
      }
    },
    methods:{
      setProducts(){
        this.isLoading = true
        axios.get(`?p=${this.page}`).then(response=>{
          this.products = response.data.results;
          this.previous = response.data.previous;
          this.next = response.data.next;
          this.isLoading = false;
        });
      },
      goPreviousPage(){
        let query = Object.assign({});
        query.page = this.page > 1 ? this.page - 1 : this.page;
        this.$router.push({ query });
      },
      goNextPage(){

      }
    }
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

.stars{
  padding: 5px;
}
.stars i{
  color: #f39c12;
  font-size: 1.2em;
}
</style>