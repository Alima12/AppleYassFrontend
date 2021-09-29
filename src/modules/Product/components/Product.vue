<template>
  <div class="shopping-cart">
    <div class="image-sec">
      <img :src="product.image" alt="">
      <span v-if="product.isSpecialOffer" class="is-hot-offer badge badge-danger p-2">پیشنهاد ویژه</span>
      <div class="stars">
        <i v-for="star in product.stars" class="fa fa-star"></i>
      </div>
    </div>
    <div class="cart-title">{{product.name}}</div>
    <div class="buttons">
      <div class="right">
        <span class="price">{{product.cost}}</span>
      </div>
      <div class="left">
          <div class="extend-btn">
            <a href="">افزودن</a>
            <a href=""><i class="fa fa-heart"></i></a>
          </div>
          <div class="extend-btn">
            <a href="">خرید</a>
            <a href=""><i class="fa fa-shopping-cart"></i></a>
          </div>
      </div>

    </div>
  </div>

</template>
<script>
  export default {
    name: "Product",
    props:['product'],
  }
</script>