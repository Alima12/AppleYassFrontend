<template>

  <div class="main-content">
    <div class="tab__box">
            <div class="tab__items">
                <a class="tab__item is-active" href="courses.html">همه سفارشات</a>

            </div>
        </div>
        <div class="bg-white padding-20">
            <div class="t-header-search">
                <form action="" onclick="event.preventDefault();">
                    <div class="t-header-searchbox font-size-13">
                        <div type="text" class="text search-input__box ">جستجوی سفارش</div>
                        <div class="t-header-search-content ">
                            <input type="text"  class="text"  placeholder="شناسه">
                            <input type="text"  class="text" placeholder="تاریخ">
                            <btutton class="btn btn-my-styles">جستجو</btutton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="table__box">
            <table class="table">

                <thead role="rowgroup">
                <tr role="row" class="title-row">
                    <th>شناسه خرید</th>
                    <th>مبلغ پرداختی</th>
                    <th>وضعیت</th>
                    <th>تاریخ خرید</th>
                    <th>فاکتور</th>
                </tr>
                </thead>
                <tbody>
                <tr role="row" v-for="order in orders">
                    <td>{{order.refer_code}}</td>
                    <td>{{order.real_price.toLocaleString()}} تومان</td>
                    <td>
                      <span class="text-warning fw-bold" v-if="order.status=='c'">در حال پردازش</span>
                      <span class="text-warning fw-bold" v-else-if="order.status=='a'">در حال آماده سازی</span>
                      <span class="text-warning fw-bold" v-else-if="order.status=='s'">در دست پست </span>
                      <span class="text-warning fw-bold" v-else-if="order.status=='d'">تحویل داده شده</span>
                      <span class="text-warning fw-bold" v-else-if="order.status=='r'">مرجوع شده</span>

                    </td>
                    <td>
                      {{extractdate(order.updated_at)}}
                    </td>
                    <td>
                        <button class="mlg-15 btn btn-warning" title="تایید" @click="showFactor(order.items)">مشاهده</button>
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
  import axios from "axios";
  export default {
    name: "Orders",
    components:{loading:Loading},
    data(){
      return{
        isLoading: true,
        fullPage: false,
        orders:[],
      }  
    },
      mounted(){
        axios.get("transaction/orders/").then(response=>{
          this.orders = response.data
          this.isLoading = false;
        }).catch(error=>{
          console.log(error.response)
        })
      },
      
      methods:{
        extractdate(date){
          let newdate = new Date(date)
          let mydate = this.to_jalali(newdate.getFullYear(), newdate.getMonth(), newdate.getDay())
          return `${mydate[0]}-${mydate[1]}-${mydate[2]}`;


        },
        showFactor(orderItems){
          let items = ""
          orderItems.forEach(item=>{
            console.log(item.product.product.title)
            let _itemtext = `
            <tr>
              <td>${item.product.product.title}</td>
              <td>${item.count}</td>
              <td>${item.price.toLocaleString()} ریال</td>
              <td><a target="_blank" href="/product/${item.product.product.code}/" class="btn btn-info"><i class="fa fa-eye"></i></a></td>
            </tr>
            `;
            items += _itemtext;
          })
          Swal.fire({
          title: 'لیست اجناس',
          html: `<table class="w-100 orders-list">
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
        $(document).on('click touchstart', function (e) {
            var serach__box = $('.t-header-search');
            var input = $('.search-input__box');
            if ($(e.target).is(serach__box) || serach__box.has(e.target).length == 1) {
                $('.t-header-search-content').show();
                $('.t-header-searchbox').addClass('open')
            } else {
                $('.t-header-search-content').hide();
                $('.t-header-searchbox').removeClass('open')

            }
        })
      }

  }

</script>