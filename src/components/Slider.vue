<template>
  <section class="slider">
      <div class="slides">
          <div class="item" :class="{'active':slide.isActive}" v-for="slide in slides" :id="`slide${slide.index}`">
              <img :src="slide.image" :alt="slide.text" />
              <span class="text-warning">{{slide.text}}</span>
          </div>
      </div>
      <div class="buttons">    
          <span v-for="item in indexes">
            <i :class="{'active':item == activeIndex}" @click="setSlide(item)" class="fa fa-circle"></i>
          </span>  
      </div>
  </section>
</template>
<script>
import axios from 'axios'
  import carousel from 'vue-owl-carousel2'
  export default {
    name: "Slider",
    components:{
      carousel,
    },
    data(){
      return {
        slides:[],
        indexes :0,
        activeIndex: 1,

      }

    },
    mounted(){
      setInterval(()=>{
        this.activeIndex++;
        if(this.activeIndex>this.slides.length){
            this.activeIndex = 1;
        }
        this.setSlide(this.activeIndex)

      },5000)

      axios.get("/config/slides/").then(response=>{
        this.prepareSlides(response.data)
      })
    },

    methods:{
      setSlide(index){
        let slideIndex = index;
        this.slides.forEach((slide)=>{
            slide.isActive=false;
        })
        this.activeIndex = slideIndex;
        this.slides[slideIndex - 1].isActive=true;
      },
      prepareSlides(slides){
        this.slides = slides;
        this.slides.forEach(slide=>{
          slide.isActive= false
        })
        this.indexes = this.slides.length;
        this.setSlide(1)
      }
    }
  }
</script>