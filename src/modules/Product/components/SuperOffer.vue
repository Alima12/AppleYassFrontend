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
                  <router-link :to="`/product/${product.code}`">
                      <img  :src="product.images[0].image" alt="">
                  </router-link>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="spedification">
                  <div class="price-row">
                    <div class="price">{{product.price}}</div>
                    <div class="off">%{{product.discoutPercent}} تخفیف</div>
                  </div>
                  <div class="title">
                      {{product.name}}
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
          <img :src="product.images[0].offerBanner" alt="">
        </div>
      </div>
  </div>
  </section>
</template>

<script>

export default {
  name: 'SuperOffer',
  data(){
    let superProduct = this.$store.getters.getSuperOfferProduct
    return {
      product:superProduct,
      discountTill:[0,0,0],
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
  },
}
</script>
