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
</template>

<script>
// @ is an alias to /src
import Slider from "../components/Slider";
import Productions from "../modules/Product/components/Productions";
import SuperOffer from "../modules/Product/components/SuperOffer";
import NewProducts from "../modules/Product/components/NewProducts";
import Categories from "../components/Categories";




import "@/assets/css/home.css"

export default {
  name: 'Home',
  components: {
    Slider,
    Productions,
    SuperOffer,
    NewProducts,
    Categories,
  }
}
</script>
