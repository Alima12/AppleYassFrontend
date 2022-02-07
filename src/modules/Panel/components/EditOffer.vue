<template>

    Salam
      <loading 
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
      />
</template>
<script>
    import Swal from 'sweetalert2'
    import DatePicker from 'vue3-persian-datetime-picker'
    import Loading from 'vue-loading-overlay';
    import axios from 'axios'

  export default {
    name: "EditOffer",
    components:{DatePicker, loading:Loading},
    data(){
      return{
          isLoading: true,
          fullPage: false,
          offer:{}
          
      }
    },
    mounted(){
    //   axios.get("config/super-offer/").then(response=>{
    //       this.offer = response.data;
    //       this.isLoading = false;
    //   })
    },
    methods:{
        isActive(date){
            let before = new Date(date);
            let now = new Date();
            let dif = now - before;
            console.log(dif)
            if(dif < 0){
                return true
            }
            return false
        },
    }
    
  }

</script>
<style>

</style>