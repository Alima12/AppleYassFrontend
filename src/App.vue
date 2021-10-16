<template>
  <Header />
  <router-view/>
</template>
<script>
  import "@/assets/fonts/fonts.css"
  import '@/assets/css/main.css'
  import '@/assets/css/animate.css'
  import Header from "./components/Header"
  export default {
    name: "App",
    components:{
      Header,
    }
  }
</script>
