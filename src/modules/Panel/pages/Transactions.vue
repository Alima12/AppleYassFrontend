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
                    <td>{{transaction.refer_code}}</td>
                    <td>{{transaction.customer.first_name}}</td>

                    <td>{{transaction.amount.toLocaleString()}} تومان</td>
                    <td>
                      <span class="text-success fw-bold" v-if="transaction.status == 's'">موفق</span>
                      <span class="text-warning fw-bold" v-else-if="transaction.status == 'w'">در انتظار پرداخت</span>
                      <span class="text-dark fw-bold" v-else-if="transaction.status == 'r'">برگشت داده شده</span>
                      <span class="text-danger fw-bold" v-else>ناموفق</span>
                    </td>
                    <td>
                      {{extractdate(transaction.updated_at)}}
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
   import axios from 'axios';
  export default {
    name: "Transactions",
    components:{loading:Loading},
    data(){
      return{
        isLoading: true,
        fullPage: false,
        transactions:[
        ]
      }  
    },
    methods:{
      extractdate(date){
          let newdate = new Date(date)
          let mydate = this.to_jalali(newdate.getFullYear(), newdate.getMonth(), newdate.getDay())
          return `${mydate[0]}-${mydate[1]}-${mydate[2]} - ${newdate.getHours()}:${newdate.getMinutes()}:${newdate.getSeconds()}`;


      },
      to_jalali(gy, gm, gd){
          var g_d_m, jy, jm, jd, gy2, days;
          g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
          gy2 = (gm > 2) ? (gy + 1) : gy;
          days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
          jy = -1595 + (33 * ~~(days / 12053));
          days %= 12053;
          jy += 4 * ~~(days / 1461);
          days %= 1461;
          if (days > 365) {
            jy += ~~((days - 1) / 365);
            days = (days - 1) % 365;
          }
          if (days < 186) {
            jm = 1 + ~~(days / 31);
            jd = 1 + (days % 31);
          } else {
            jm = 7 + ~~((days - 186) / 30);
            jd = 1 + ((days - 186) % 30);
          }
          return [jy, jm, jd];
      }
    },
    created(){
      axios.get("transaction/").then(response=>{
        this.transactions= response.data
        this.isLoading = false;
      });
     
    }
  }


</script>