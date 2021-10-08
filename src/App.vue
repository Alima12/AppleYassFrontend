<template>
  <Header />
  <router-view/>
  <Footer />
</template>
<script>
  import "@/assets/fonts/fonts.css"
  import '@/assets/css/main.css'
  import '@/assets/css/animate.css'
  import Header from "./components/Header"
  import Footer from "./components/Footer"
  export default {
    name: "App",
    components:{
      Header,
      Footer
    }
  }
</script>
