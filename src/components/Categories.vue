<template>
  <section class="dragable-list">
    <div class="title">
      <h3 class="title-new-product">دسته بندی</h3>
    </div>
    <div id="category" class="owl-carousel owl-theme">
      <div class="item" v-for="category in categories">
        <router-link :to="`/category/${category.code}`">
          <div class="category-container">
            <img :src="category.image">
            <span>
                {{category.name}}
            </span>
          </div>
        </router-link>
        
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    name: "Categories",
    data(){
      return {
        categories:[
          {code:"phone",name:"گوشی موبایل",image:"https://dkstatics-public.digikala.com/digikala-products/48c5a02abc05ec142e3906ff4e2c78479bb8a966_1607422944.jpg"},
          {code:"camputer",name:"کامپیوتر و لپ تاپ",image:"https://dkstatics-public.digikala.com/digikala-products/b5ae8ce207a016a4443fe18256e2c37d52c68446_1605100088.jpg"},
          {code:"case",name:"کیف",image:"https://dkstatics-public.digikala.com/digikala-products/5081a5c73e27f56b8194861df8419baaed8ce348_1610725915.jpg"},
          {code:"moblecover",name:"کاور موبایل",image:"https://dkstatics-public.digikala.com/digikala-products/110940392.jpg"},
          {code:"headphone",name:"گوشی موبایل",image:"https://dkstatics-public.digikala.com/digikala-products/1590342.jpg"},
          {code:"handsfree",name:"هندفری",image:"https://dkstatics-public.digikala.com/digikala-products/d52027e381580114b15d694e62903a0a4c90084d_1629541316.jpg"},
        ]
      }
    }
  }
</script>
<style>

  #category .item{
    padding: 5px;
    height: 220px;
    font-size: 1em;
  }
.category-container{
  position: relative;

}
.category-container img{
  width: 100%;
  height: 100%;

}
.category-container span{
  display: inline-block;
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: rgba(255, 255, 255, .4);
  height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  transition: all 1s;
  border-radius: 3px 3px 0px 0px;
  font-size: 1.3em;
  color: #2c3e50;
  cursor: pointer;

}
.category-container a{
  color: #fff200 !important;
}
.category-container:hover span{
  height: 100%;
}
</style>