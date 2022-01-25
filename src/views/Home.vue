<template>
  <div class="home">
    <Slider />
    <main>
      <Categories />
      <Productions />
      <SuperOffer />
      <NewProducts />
    </main>
    
  </div>
    <Footer :data="footerData" />
</template>

<script>
// @ is an alias to /src
import Slider from "../components/Slider";
import Productions from "../modules/Product/components/Productions";
import SuperOffer from "../modules/Product/components/SuperOffer";
import NewProducts from "../modules/Product/components/NewProducts";
import Categories from "../components/Categories";
import Footer from "../components/Footer"
import "@/assets/css/home.css"
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Slider,
    Productions,
    SuperOffer,
    NewProducts,
    Categories,
    Footer
  },
  data(){
    return {
      footerData:{}
    }
  },
  mounted(){
    axios.get("/config/").then(response=>{
      this.footerData = response.data;
    })
    setTimeout(()=>{
      let sliders = ['#owl-product','#category']
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
        if (slide == '#category'){
          responsive = {
              0:{
                  items:2
              },
              600:{
                  items:4
              },
              1000:{
                  items:6
              }
        }
        }
        $(slide).owlCarousel({
          rtl:true,
          margin:10,
          responsive
         
        })
      })
    }, 3000)
  },
}
</script>
