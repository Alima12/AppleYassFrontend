<template>

  <div class="main-content">
            <div class="row no-gutters font-size-13 margin-bottom-10">
            <div class="col-3 padding-20 border-radius-3 bg-white margin-left-10 margin-bottom-10">
                <p>مجموع خرید شما در یک ماه اخیر:</p>
                <p>25,000,000</p>
            </div>
            <div class="col-3 padding-20 border-radius-3 bg-danger margin-bottom-10">
                <p></p>
                <p>2,500,000 تومان</p>
            </div>


            <div class="col-3 padding-20 border-radius-3 bg-danger margin-bottom-10">
                <p> درآمد خالص </p>
                <p>2,500,000 تومان</p>
            </div>

            <div class="col-3 padding-20 border-radius-3 bg-danger margin-bottom-10">
                <p> درآمد خالص </p>
                <p>2,500,000 تومان</p>
            </div>
        </div>
        <div class="row no-gutters font-size-13 margin-bottom-10" v-if="user.isAdmin">
            <div class="col-8 padding-20 bg-white margin-bottom-10 margin-left-10 border-radius-3">
                <MonthlyChart />
            </div>
            <div class="col-4 info-amount padding-20 bg-white margin-bottom-12-p margin-bottom-10 border-radius-3">
                <p class="title icon-outline-receipt">میزان تراکنش در 10 روز اخیر</p>
                <p class="amount-show color-444">600,000,000<span> تومان </span></p>

                <p class="title icon-outline-receipt">میزان تراکنش در 30 روز اخیر</p>
                <p class="amount-show color-444">600,000,000,000<span> تومان </span></p>

                <p class="title icon-outline-receipt">مجموع تعداد سفارشات 10 روز اخیر</p>
                <p class="amount-show color-444">60 سفارش</p>

                <router-link to="/panel/transactions" class="color-2b4a83"><i class="fa fa-history" aria-hidden="true"></i>همه تراکنش ها</router-link>
            </div>
        </div>
        <div class="row bg-white no-gutters font-size-13">
            <div class="title__row">
                <p>تراکنش های اخیر شما</p>
            </div>
            <div class="table__box">
                <table width="100%" class="table">
                    <thead role="rowgroup">
                    <tr role="row" class="title-row">
                        <th>شناسه پرداخت</th>
                        <th>ایمیل پرداخت کننده</th>
                        <th>مبلغ (تومان)</th>
                        <th>درامد شما</th>
                        <th>درامد سایت</th>
                        <th>نام دوره</th>
                        <th>تاریخ و ساعت</th>
                        <th>وضعیت</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr role="row">
                        <td><a href=""> 1</a></td>
                        <td><a href="">mohammadnio3@gmail.com</a></td>
                        <td><a href="">600,000</a></td>
                        <td><a href="">400,000</a></td>
                        <td><a href="">400,000</a></td>
                        <td><a href="">خرید دوره - دوره متخصص php سطح مقدماتی</a></td>
                        <td><a href=""> 22:14:48 1399/02/23</a></td>
                        <td><a href="" class="text-success">پرداخت موفق</a></td>
                    </tr>
                    <tr role="row">
                        <td><a href=""> 1</a></td>
                        <td><a href="">mohammadniko3@gmail.com</a></td>
                        <td><a href="">600,000</a></td>
                        <td><a href="">400,000</a></td>
                        <td><a href="">400,000</a></td>
                        <td><a href="">خرید دوره - دوره متخصص php سطح مقدماتی</a></td>
                        <td><a href=""> 22:14:48 1399/02/23</a></td>
                        <td><a href="" class="text-error">پرداخت ناموفق</a></td>
                        <td class="i__oprations">
                            <a href="" class="item-delete margin-left-10" title="حذف"></a>
                            <a href="edit-transaction.html" class="item-edit" title='ویرایش'></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
  </div>
</template>
<script>
import MonthlyChart from '../components/Charts/MonthlyChart.vue'

  export default {
    name: "Home",
    components:{MonthlyChart},
    created(){
       
    },
    data(){
        return {
            user:{isAdmin:true}
        }
    }
  }

</script>