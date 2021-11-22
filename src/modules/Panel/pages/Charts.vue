<template>

  <div class="main-content">
    <div class="row">
      <div class="col-lg-6 col-md-12 col-sm-12">
        <p class="text__title">
          بازدید ماهانه
        </p>
        <MonthlyChart />
      </div>

    </div>
    
  </div>
</template>
<script>

import MonthlyChart from '../components/Charts/MonthlyChart.vue'

  export default {
    name: "Chart",
    components:{MonthlyChart},
    created(){
       
    },
  }

</script>