<template>
    <div class="confirm-page-container">
      <div class="choose-way">
        <div class="item">
          <p class="alert alert-success text-center">
             در حال انتقال به درگاه پرداخت ...
          </p>
        </div>
      </div>



    </div>

    <loading 
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="true"
    />
</template>
<script>
  import Loading from 'vue-loading-overlay';
  import axios from 'axios';
  export default {
    name: "Payment",
    components:{ 
      loading:Loading
    },
    data(){
      return {
          isLoading:false,
          proccess:66,

      }
    },
    beforeCreate(){

    },
    methods:{

    }

  }
</script>

<style>

</style>
