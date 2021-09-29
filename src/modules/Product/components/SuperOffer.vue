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
                  <img  :src="image" alt="">
                </div>
              </div>
              <div class="col-lg-8">
                <div class="spedification">
                  <div class="price-row">
                    <div class="price">{{price}}</div>
                    <div class="off">{{disscount}}</div>
                  </div>
                  <div class="title">
                      {{name}}
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
          <img :src="bannerImage" alt="">
        </div>
      </div>
  </div>
  </section>
</template>

<script>

export default {
  name: 'SuperOffer',
  data(){
    return {
      uniqueId:"2323sds",
      name:"تبلت اپل مدل iPad Mini 5 2019 7.9 inch WiFi ظرفیت 64 گیگابایت ",
      image:"https://dkstatics-public.digikala.com/digikala-products/110767188.jpg",
      bannerImage: "https://previews.123rf.com/images/icreative3d/icreative3d1608/icreative3d160800122/60598852-discount-12-percent-off-3d-illustration-on-white-background-.jpg",
      price: "10,990,000 تومان ",
      disscount: "12% تخفیف",
      discountTill:[0,0,0],
      remainTimeSecond: 70000
    }
  },
  methods:{
    setTime(){
      if (this.remainTimeSecond > 0) {
        let hour = Math.floor(this.remainTimeSecond/3600);
        let min = Math.floor((this.remainTimeSecond%3600)/60);
        let sec =  this.remainTimeSecond % 3600 % 60
        this.discountTill = [hour,min,sec]
      }
    } 
  },
  mounted(){
    setInterval(()=>{
        this.remainTimeSecond-=1;
        this.setTime();
    },1000)
  },
}
</script>
