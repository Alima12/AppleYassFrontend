<template>

  <div class="main-content">
    <div class="row">
      <div class="col-6"><MonthlyChart /></div>

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