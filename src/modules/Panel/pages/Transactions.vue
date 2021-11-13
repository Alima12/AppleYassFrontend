<template>

 <div class="main-content">
    <div class="tab__box">
            <div class="tab__items">
                <router-link class="tab__item is-active" to="">همه تراکنش ها</router-link>
                <router-link class="tab__item " to="">موفق</router-link>
                <router-link class="tab__item " to="">ناموفق</router-link>
            </div>
        </div>
        <div class="table__box">
            <table class="table">
                <thead role="rowgroup">
                <tr role="row" class="title-row">
                    <th>شناسه تراکنش</th>
                    <th>توسط</th>
                    <th>مبلغ پرداختی</th>
                    <th>وضعیت</th>
                    <th>تاریخ تراکنش</th>

                </tr>
                </thead>
                <tbody>
                <tr role="row"  v-for="transaction in transactions">
                    <td>{{transaction.code}}</td>
                    <td>{{transaction.owner.fullname}}</td>
                    <td>{{transaction.cost.toLocaleString()}} تومان</td>
                    <td>
                      <span class="text-success fw-bold" v-if="transaction.status">موفق</span>
                      <span class="text-danger fw-bold" v-else>ناموفق</span>
                    </td>
                    <td>
                      {{transaction.date}}
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    <loading 
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
      />



</div>
</template>
<script>
   import Loading from 'vue-loading-overlay';
  export default {
    name: "Transactions",
    components:{loading:Loading},
    data(){
      return{
        isLoading: true,
        fullPage: false,
        transactions:[
          {code:"4343457",cost:3000000,status:true,owner:{fullname:"AliMahdavi"},date:"1400/08/18 - 14:02:03"},
          {code:"5465444",cost:3600000,status:false,owner:{fullname:"AmirAkbari"},date:"1400/02/20 - 14:02:03"},
          {code:"7890866",cost:390600,status:true,owner:{fullname:"Maryamsheikhi"},date:"1400/05/12 - 14:02:03"},
          {code:"6768322",cost:120000,status:false,owner:{fullname:"Hadich"},date:"1400/08/02 - 14:02:03"},
          {code:"4831092",cost:30000,status:true,owner:{fullname:"farich"},date:"1400/08/03 - 14:02:03"},

        ]
      }  
    },
    methods:{
    },
    created(){
     
    }
  }


</script>