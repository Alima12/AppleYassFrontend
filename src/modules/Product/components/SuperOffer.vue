<template>
  <section class="supper-offer-section container-fluid mt-4">
  <div class="row">
    <div class="col-lg-9">
      <div class="supper-offer-box">
          <span class="title">
            پیشنهاد شگفت انگیز
          </span>

          <div class="body container-fluid">
            <div class="row">
              <div class="col-lg-4">
                <div class="image-container">
                  <router-link :to="`/product/${code}`">
                      <img  :src="'http://127.0.0.1:8000'+ product.image" alt="">
                  </router-link>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="spedification">
                  <div class="price-row">
                    <div class="price text-danger text-decoration-line-through">{{product.real_price.toLocaleString()}} <span>تومان</span></div>
                    <div class="price text-success">{{product.total_price.toLocaleString()}} <span>تومان</span></div>
                    <div class="off">%{{product.percent}} تخفیف</div>
                  </div>
                  <div class="title">
                      {{product.title}}
                  </div>
                  <hr class="px-5"/>
                  <div class="counter-down">
                    <span id="seconds">{{discountTill[2]}}</span> :
                    <span id="minutes">{{discountTill[1]}}</span> :
                    <span id="hours">{{discountTill[0]}}</span>
                  </div>
                  <div class="remaining-time">
                      زمان باقی مانده تا پایان تخفیف
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div class="col-lg-3">
        <div class="banner">
          <img :src="'http://127.0.0.1:8000'+ product.percent_image" alt="">
        </div>
      </div>
  </div>
  </section>
  
</template>

<script>
import axios from 'axios';

export default {
  name: 'SuperOffer',
  data(){
    return {
      product:{
        total_price:1000,
        real_price:1000
      },
      discountTill:[0,0,0],
      code:""
    }
  },
  methods:{
    setTime(){
      if (this.product.remainTimeSecond > 0) {
        let hour = Math.floor(this.product.remainTimeSecond/3600);
        let min = Math.floor((this.product.remainTimeSecond%3600)/60);
        let sec =  this.product.remainTimeSecond % 3600 % 60
        this.discountTill = [hour,min,sec]
      }
    } 
  },
  mounted(){
    setInterval(()=>{
        this.product.remainTimeSecond-=1;
        this.setTime();
    },1000)
    axios.get("config/super-offer/").then(response=>{
      this.product = response.data;
      this.code =this.product.product.product.code; 
      let date = new Date(this.product.till)
      let now = new Date()
      this.product.remainTimeSecond = Math.floor((date - now) /1000);
      
    })
  },
}
</script>
