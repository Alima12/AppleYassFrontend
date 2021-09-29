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
  import carousel from 'vue-owl-carousel2'
  export default {
    name: "Slider",
    components:{
      carousel,
    },
    data(){
      let slideha = [
          {
            index:1 ,
            image:"https://photos5.appleinsider.com/gallery/43148-83800-210713-iPhone12-xl.jpg",
            text:"اپل یاس ",
            isActive: false
          },
          {
            index:2 ,
            image:"https://9to5mac.com/wp-content/uploads/sites/6/2021/04/big-display-imac.jpg",
            text:"اپل یاس ",
            isActive: false
          },
          {
            index:3 ,
            image:"https://cdn.mos.cms.futurecdn.net/LjqKgNBc8TCXke3CNekJgA.jpg",
            text:"اپل یاس ",
            isActive: true
          }
        
      ]
      let indexha = slideha.length
      return {
        slides:slideha,
        indexes :indexha,
        activeIndex: 1

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
    }
  }
</script>