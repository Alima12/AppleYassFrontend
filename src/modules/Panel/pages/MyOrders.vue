<template>

  <div class="main-content">
    <div class="tab__box">
            <div class="tab__items">
                <a class="tab__item is-active" href="courses.html">همه سفارشات</a>
            </div>
        </div>
        <div class="table__box">
            <table class="table">
                <thead role="rowgroup">
                <tr role="row" class="title-row">
                    <th>شناسه خرید</th>
                    <th>مبلغ پرداختی</th>
                    <th>وضعیت</th>
                    <th>آخرین بروزرسانی</th>
                    <th>وضعیت پرداخت</th>
                    <th>فاکتور</th>

                </tr>
                </thead>
                <tbody>
                <tr role="row" v-for="order in orders">
                    <td>{{order.refer_code}}</td>
                    <td>{{order.real_price.toLocaleString()}} تومان</td>
                    <td>
                      <span class="text-warning fw-bold" v-if="order.status=='c'">در حال پردازش</span>
                      <span class="text-danger fw-bold" v-else-if="order.status=='f'">ناموفق</span>

                      <span class="text-primary fw-bold" v-else-if="order.status=='a'">در حال آماده سازی</span>
                      <span class="text-secondary fw-bold" v-else-if="order.status=='s'">در دست پست </span>
                      <span class="text-success fw-bold" v-else-if="order.status=='d'">تحویل داده شده</span>
                      <span class="text-warning fw-bold" v-else-if="order.status=='r'">مرجوع شده</span>

                    </td>
                    <td>
                      {{extractdate(order.updated_at)}}
                    </td>
                    <td>
                      <span class="text-warning fw-bold" v-if="order.transaction[0].status=='w'">در انتظار</span>
                      <span class="text-danger fw-bold" v-else-if="order.transaction[0].status=='s'">موفق</span>
                      <span class="text-primary fw-bold" v-else-if="order.transaction[0].status=='r'">مرجوع شده</span>
                      <span class="text-primary fw-bold" v-else-if="order.transaction[0].status=='f'">ناموفق</span>
                    </td>
                    <td>
                        <button class="mlg-15 btn btn-warning" title="تایید" @click="showFactor(order.refer_code)">مشاهده</button>
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
  import Swal from 'sweetalert2'
import axios from 'axios';
  export default {
    name: "MyOrders",
    components:{loading:Loading},
    data(){
      return{
        isLoading: true,
        fullPage: false,
        orders:[],
      }  
    },
    mounted(){
      axios.get("transaction/orders/me/").then(response=>{
        this.orders = response.data
        console.log(this.orders)
        this.isLoading = false;
      })
    },
    methods:{
      extractdate(date){
        let newdate = new Date(date)
        let mydate = this.to_jalali(newdate.getFullYear(), newdate.getMonth(), newdate.getDay())
        return `${mydate[0]}-${mydate[1]}-${mydate[2]}`;


      },
      showFactor(refer_code){
          let products = []
          let items = ""
          axios.get(`transaction/orders/shoppingview/${refer_code}/`).then(response=>{
              products = response.data.products
              let colors = response.data.colors
              let counts = response.data.counts
              for (let index = 0; index < products.length; index++) {
                products[index].color = colors[index];
                products[index].count = counts[index];
              }

          }).then(()=>{
            products.forEach(item=>{
              let _itemtext = `
              <tr>
                <td>${item.title}</td>
                <td>${item.count}</td>
                <td>${item.color.price.toLocaleString()} ریال</td>
                <td><a target="_blank" href="/product/${item.code}/" class="btn btn-info"><i class="fa fa-eye"></i></a></td>
              </tr>
              `;
                items += _itemtext;
            })
            Swal.fire({
              title: 'لیست اجناس',
              html: `
                <table class="w-100 orders-list">
                  <tr>
                    <th>عنوان</th>
                    <th>تعداد</th>
                    <th>قیمت واحد</th>
                    <th>لینک</th>
                  </tr>
                ${items}
                </table>`,
              icon: 'info',
              confirmButtonText: 'متوجه شدم'
            })
            
          })
          
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
    }
  }

</script>
<style>
table.orders-list{
  padding: 5px 10px;
}
</style>