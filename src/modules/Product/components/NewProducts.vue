<template>
  <section class="dragable-list">
    <div class="title">
      <h3 class="title-new-product">جدیدترین محصولات</h3>
    </div>
    <div id="owl-product" class="owl-carousel owl-theme">
      <div class="item" v-for="product in products">
        <Product :product="product" />
      </div>
    </div>
  </section>
</template>
<script>
  import Product from './Product';
  export default {
    name: "NewProducts",
    components:{
      Product,
    },
    data(){
      return {
        products:[
          {uniqueCode:"2aCbSu",name:"level U هندزفری ",stars:4,isSpecialOffer:false,cost:"9,000,000 ریال",image:"https://dkstatics-public.digikala.com/digikala-products/121904901.jpg"},

          {uniqueCode:"2a21bA",name:"اسپیکر بلوتوثی قابل حمل جی بی ال مدل Pulse 4 ",stars:5,isSpecialOffer:true,cost:"4,500,00 تومان",image:"https://dkstatics-public.digikala.com/digikala-products/114699730.jpg"},

          {uniqueCode:"5Sab4u",name:"هندزفری بلوتوثی هاینو تکو مدل ایرپاد 2 ",stars:2,isSpecialOffer:false,cost:"769,500 تومان",image:"https://dkstatics-public.digikala.com/digikala-products/d52027e381580114b15d694e62903a0a4c90084d_1629541316.jpg"},


          {uniqueCode:"3dfdfg",name:"کاور صنایع چرم پیری مدل PLSET5",stars:5,isSpecialOffer:true,cost:"350,000 تومان ",image:"https://dkstatics-public.digikala.com/digikala-products/88c2e4e7b57345a928a24a884d91e2da5c31955d_1631516350.jpg"},

          {uniqueCode:"3df4dfg",name:"کاور صنایع چرم پیری مدل PLSET5",stars:5,isSpecialOffer:true,cost:"350,000 تومان ",image:"https://dkstatics-public.digikala.com/digikala-products/88c2e4e7b57345a928a24a884d91e2da5c31955d_1631516350.jpg"},

          {uniqueCode:"34dfdfg",name:"کاور صنایع چرم پیری مدل PLSET5",stars:5,isSpecialOffer:true,cost:"350,000 تومان ",image:"https://dkstatics-public.digikala.com/digikala-products/88c2e4e7b57345a928a24a884d91e2da5c31955d_1631516350.jpg"},
        ]
      }
    }
  }
</script>