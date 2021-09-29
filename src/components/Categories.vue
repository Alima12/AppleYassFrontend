<template>
  <section class="dragable-list">
    <div class="title">
      <h3 class="title-new-product">دسته بندی</h3>
    </div>
    <div id="category" class="owl-carousel owl-theme">
      <div class="item" v-for="category in categories">
        <div class="category-container">
          <img src="https://dkstatics-public.digikala.com/digikala-products/d52027e381580114b15d694e62903a0a4c90084d_1629541316.jpg">
          <span>
            <a href="#">
              {{category}}
            </a>
          </span>
        </div>
        
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
        "phone",
        "mac",
        "airpod",
        "ipad",
        "phone",
        "mac",
        "airpod",
        "ipad",
        "phone",
        "mac",
        "airpod",
        "ipad"
          
        ]
      }
    }
  }
</script>
<style>
  #category .item{
    padding: 5px;
    height: 200px;
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
  background-color: rgba(0, 0, 0, .4);
  height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  transition: all 1s;
  border-radius: 3px 3px 0px 0px;
  font-size: 1.3em;
  color: #ecf0f1;
  cursor: pointer;

}
.category-container a{
  color: #fff200 !important;
}
.category-container span:hover{
  height: 100%;
}
</style>