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
                    <th>تاریخ خرید</th>
                    <th>فاکتور</th>
                </tr>
                </thead>
                <tbody>
                <tr role="row" >
                    <td>4ed34323</td>
                    <td>3,000,000 تومان</td>
                    <td>
                      <span class="text-warning fw-bold">در حال پردازش</span>
                    </td>
                    <td>
                      1400/08/18
                    </td>
                    <td>
                        <button class="mlg-15 btn btn-warning" title="تایید" @click="showFactor">مشاهده</button>
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
  export default {
    name: "MyOrders",
    components:{loading:Loading},
    data(){
      return{
        isLoading: true,
        fullPage: false
      }  
    },
    methods:{
      showFactor(){
        Swal.fire({
        title: 'لیست اجناس',
        html: `<table class="w-100 orders-list">
  <tr>
    <th>تصویر</th>
    <th>تعداد</th>
    <th>قیمت واحد</th>
    <th>لینک</th>

  </tr>

  <tr>
    <td><img width="90px" src="https://dkstatics-public.digikala.com/digikala-products/a1ce7f73cb727e977537090509479f3dd134ea42_1635065691.jpg" alt=""></td>
    <td>2</td>
    <td>23,000 تومان</td>
    <td><a target="_blank" href="#" class="btn btn-info"><i class="fa fa-eye"></i></a></td>
  </tr>
  <tr>
    <td><img width="90px" src="https://dkstatics-public.digikala.com/digikala-products/a1ce7f73cb727e977537090509479f3dd134ea42_1635065691.jpg" alt=""></td>
    <td>2</td>
    <td>23,000 تومان</td>
    <td><a target="_blank" href="#" class="btn btn-info"><i class="fa fa-eye"></i></a></td>
  </tr>
    <tr>
    <td><img width="90px" src="https://dkstatics-public.digikala.com/digikala-products/116904078.jpg" alt=""></td>
    <td>1</td>
    <td>89,000 تومان</td>
    <td><a target="_blank" href="#" class="btn btn-info"><i class="fa fa-eye"></i></a></td>
  </tr>

</table>`,
        icon: 'info',
        confirmButtonText: 'متوجه شدم'
      })
      }
    }
  }

</script>
<style>
table.orders-list{
  padding: 5px 10px;
}
</style>