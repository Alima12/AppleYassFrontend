<template>
  <div class="main-content" v-if="!isLoading">
        <div class="row no-gutters font-size-13 margin-bottom-10" v-if="!user.is_admin">
            <div class="col-3 padding-20 border-radius-3 bg-success margin-left-10 margin-bottom-10">
                <p>مجموع خرید شما در یک ماه اخیر:</p>
                <p>25,000,000</p>
            </div>
            <div class="col-3 padding-20 border-radius-3 bg-warning margin-left-10 margin-bottom-10">
                <p>مجموع خرید شما در یک ماه اخیر:</p>
                <p>25,000,000</p>
            </div>
            <div class="col-3 padding-20 border-radius-3 bg-danger margin-left-10 margin-bottom-10">
                <p>مجموع خرید شما در یک ماه اخیر:</p>
                <p>25,000,000</p>
            </div>
            <div class="col-3 padding-20 border-radius-3 bg-primary margin-right-10 margin-bottom-10">
                <p>مجموع خرید شما در یک ماه اخیر:</p>
                <p>25,000,000</p>
            </div>
        </div>
        <div class="row no-gutters font-size-13 margin-bottom-10" v-else>
            <div class="col-3 padding-20 border-radius-3 bg-success margin-left-10 margin-bottom-10 last-actions">
                <p class="fw-bold text-white d-flex justify-content-center align-items-center">
                    <span class="fs-5 m-2 text-justify">
                        سفارشات
                        تحویل شده
                    </span>
                    <i class="fa fa-arrow-left fa-3x cursor-pointer"></i>
                </p>
                <p class="fs-6 fw-light text-light">{{orders.delivered}} سفارش</p>

            </div>
            <div class="col-3 padding-20 border-radius-3 bg-warning margin-left-10 margin-bottom-10 last-actions">

                <p class="fw-bold text-dark d-flex justify-content-center align-items-center">
                    <span class="fs-5 m-2 text-justify">
                        سفارشات
                    در حال پردازش
                    </span>
                    <i class="fa fa-arrow-left fa-3x cursor-pointer"></i>
                </p>
                <p class="fs-6 fw-light text-dark">{{orders.accepted}} سفارش</p>

            </div>
            <div class="col-3 padding-20 border-radius-3 bg-danger margin-left-10 margin-bottom-10 last-actions">

                <p class="fw-bold text-white d-flex justify-content-center align-items-center">
                    <span class="fs-5 m-2 text-justify">
                        سفارشات  مرجوعی
                    </span>
                    <i class="fa fa-arrow-left fa-3x cursor-pointer"></i>
                </p>
                <p class="fs-6 fw-light text-light">{{orders.returned}} سفارش</p>

            </div>
            <div class="col-3 padding-20 border-radius-3 bg-primary margin-right-10 margin-bottom-10 last-actions">

                <p class="fw-bold text-white d-flex justify-content-center align-items-center">
                    <span class="fs-5 m-2 text-justify">
                        سفارشات در انتظار پرداخت
                    </span>
                    <i class="fa fa-arrow-left fa-3x cursor-pointer"></i>
                </p>
                <p class="fs-6 fw-light text-light">{{orders.checked}} سفارش</p>

            </div> 
        </div>


        <div class="row no-gutters font-size-13 margin-bottom-10" v-if="user.is_admin">
            <div class="col-8 padding-20 bg-white margin-bottom-10 margin-left-10 border-radius-3">
                <MonthlyChart />
            </div>
            <div class="col-4 info-amount padding-20 bg-white margin-bottom-12-p margin-bottom-10 border-radius-3">
                <p class="title icon-outline-receipt">میزان تراکنش در 10 روز اخیر</p>
                <p class="amount-show color-444">{{transaction.last_10.amount__sum.toLocaleString()}}<span> تومان </span></p>

                <p class="title icon-outline-receipt">میزان تراکنش در 30 روز اخیر</p>
                <p class="amount-show color-444">{{transaction.last_30.amount__sum.toLocaleString()}}<span> تومان </span></p>

                <p class="title icon-outline-receipt">مجموع تعداد سفارشات 10 روز اخیر</p>
                <p class="amount-show color-444">{{orders.order_10}} سفارش</p>

                <router-link to="/panel/orders" class="color-2b4a83"><i class="fa fa-history" aria-hidden="true"></i>همه سفارش ها</router-link>
            </div>
        </div>
        <div class="row bg-white no-gutters font-size-13">
            <div class="title__row">
                <p v-if="user.isAdmin">تراکنش های اخیر</p>
                <p v-else>تراکنش های اخیر شما</p>
            </div>
            <div class="table__box">
                <table width="100%" class="table">
                    <thead role="rowgroup">
                    <tr role="row" class="title-row">
                        <th>شناسه پرداخت</th>
                        <th>ایمیل پرداخت کننده</th>
                        <th>مبلغ (تومان)</th>
                        <th>تاریخ و ساعت</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr role="row" v-for="item in lastTransactions">
                        <td>{{item.code}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.amount.toLocaleString()}}</td>
                        <td>{{item.date}}</td>
                        <td class="text-error" v-if="!item.status">ناموفق</td>
                        <td class="text-success" v-else>موفق</td>
                        <td class="i__oprations" v-if="!user.isAdmin">
                            <a href="" class="" title='پرداخت' v-if="!item.status">
                                <i class="fa fa-paper-plane fa-2x text-primary"></i>
                            </a>
                            <span title='پرداخت موفق' v-else>
                                <i class="fa fa-check-circle text-success fa-2x"></i>
                            </span>
                        </td>
                        <td class="i__oprations" v-else>
                            <a href="" class="" title='حذف'>
                                <i class="fa fa-trash fa-2x text-error"></i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
  </div>
    <loading 
    v-model:active="isLoading"
    :can-cancel="true"
    :is-full-page="true"
    />
</template>
<script>
import axios from 'axios';
import MonthlyChart from '../components/Charts/MonthlyChart.vue'
import Loading from 'vue-loading-overlay';

  export default {
    name: "Home",
    components:{MonthlyChart, loading:Loading},
    created(){
        setTimeout(()=>{
            axios.get("statistics/").then(response=>{
                this.orders = response.data.orders;
                this.transaction = response.data.transactions;
                this.user = this.$store.getters.getMe;
                this.isLoading = false
            }).catch(error=>{
                this.isLoading = false
                this.user = this.$store.getters.getMe;

            })
        },1000)
    },
    data(){
        let lastTransactions = [
            {code:"eurhf2",email:"aliali.ali1378@yahoo.com",amount:3000000,date:"1400-09-02 22:34:07",status:true},
            {code:"kjfgfj",email:"alimahdavi137887@gmail.com",amount:300000,date:"1400-09-02 22:34:07",status:false}
        ];
        return {
            user:{},
            lastTransactions,
            orders:{},
            transaction:{amount__sum:0},
            isLoading: true,

        }
    },
    methods:{
        filterlastTransactions(){
            if(this.user.is_admin){
                return this.lastTransactions;
            }else{
                return this.lastTransactions.filter(tr=> tr.email == this.user.email);
            }
        },

        
    }
  }

</script>
<style>
    .last-actions:hover{
        opacity : 0.7 !important;
        cursor: pointer;
    }

</style>