<template>
  <Header />
  <router-view/>
</template>
<script>
  import "@/assets/fonts/fonts.css"
  import '@/assets/css/main.css'
  import '@/assets/css/animate.css'
  import 'vue-toast-notification/dist/theme-sugar.css';
  import Header from "./components/Header"
  export default {
    name: "App",
    components:{
      Header,
    },
    mounted(){
      this.$store.dispatch("getProductItems")
    },
    watch: {
      $route(to, from) {
        this.$store.dispatch("onStart")
      }
    },
  }
</script>
