<template>
  <div class="category">
    <div v-if="category.parent != null">
       <a :href="`/category/`+ category.parent.name">{{category.parent.title}}</a>  > <a :href="`/category/`+category.name">{{category.title}}</a>
    </div>
    <div v-else class="fw-bold text-center fs-3 mb-2 mt-3">
      {{category.title}}
    </div>
    <hr />

    <div id="category-children" class="owl-carousel owl-theme cat-container">
      <div class="item cat-item" v-for="cat in category.children">
          <div class="image-container">
            <a :href="`/category/${cat.name}/`">
              <img :src="cat.image" alt="">
            </a>
          </div>
          <div class="content d-flex align-items-center justify-content-center">
            <p>
              <a :href="`/category/${cat.name}/`">
              {{cat.title}}
               </a>
            </p>
          </div>
      </div>
    </div>

    <div class="title">
      <h2>محصولات</h2>
    </div>
    
    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-3" v-for="product in products">
        <Product :product="product" />
      </div>
      
    </div>

  </div>
  <Footer :data="footerData" />
</template>

<script>
import axios from 'axios'
import Footer from "../components/Footer"
import Product from '../modules/Product/components/Product.vue'


export default{
  name:"Category",
  data(){
    return{
      products:[],
      category:{},
      footerData:{}
    }
  },
  components:{
    Product,
    Footer
  },
  mounted(){
    let name = this.$route.params.code;
    axios.get(`category/${name}/`).then(response=>{
      this.products = response.data;
    })
    axios.get(`category/${name}/detail/`).then(response=>{
      this.category = response.data;
    })
    axios.get("/config/").then(response=>{
      this.footerData = response.data;
    })
    setTimeout(()=>{
      let sliders = ['#category-children']
      sliders.forEach(slide=>{
        let responsive = {
              0:{
                  items:1
              },
              600:{
                  items:3
              },
              1000:{
                  items:4
              }
        }
        $(slide).owlCarousel({
          rtl:true,
          margin:10,
          responsive
         
        })
      })
    }, 2000)
  }
}
</script>
<style>
.category{
  margin: 70px 5px;
}
.cat-container{
  padding: 10px 15px;
 direction: ltr;
 position: relative;
 border-radius: 10px;
}
.cat-container .cat-item{
  padding: 10px;
  text-align: center;
  

}
.cat-container .cat-item .image-container{
  width: 100%;
}
.cat-container .cat-item .image-container a{
  display: inline-block;
  background-color: red;
}

.cat-container .cat-item .image-container img{
  height: 180px;
  width: 100%;
  margin-bottom: 10px solid red ;


}

.cat-container .cat-item .content{
  text-align: center;

  font-size: 22px;
  margin-top: 10px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 20%;
  background-color:rgba(0, 0, 0, .8);
  padding: 10px;
  

}

.cat-container .cat-item .content p{
  color: white;
  padding: 10px;
  
}
.cat-container .cat-item .content p a{
  color: white;
  padding: 10px;
  margin-top: 10px;


}


.category .title{
  margin: 20px 10px;
}
.category .title p{
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(255, 0, 0, 0.753);
}
</style>
