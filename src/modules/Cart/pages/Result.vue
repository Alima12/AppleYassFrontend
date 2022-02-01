<template>
    <div class="confirm-page-container">
        <div class="title text-center alert alert-primary">
          پرداخت
          <span class="text-success" v-if="status==true">موفق</span>
          <span class="text-danger" v-if="status==false">ناموفق</span>
        </div>
        <div class="tracking">
          <p class="title">اطلاعات پرداخت</p>
          <p class="track_code">
            کد پیگیری: 
            <span>{{trackingCode}}</span>
          </p>
          <p class="refer-code">
            شماره سفارش:
            <span>{{refer_code}}</span>

          </p>
          <small>
            سفارش شما در حال پردازش است و بزودی آماده ارسال خواهد شد
          </small>
        </div>
        <div class="goHOme">
          
          <router-link to="/panel" class="btn btn-danger text-white p-3">مشاهده سفارشات</router-link>
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
    name: "Result",
    components:{ 
      loading:Loading
    },
    data(){
      return {
        isLoading:false,
        trackingCode:"2343434342",
        msg:"پرداخت شما با موفقیت انجام شد",
        status: true,
        refer_code:"Afjsdfhjsdfksdfh"
      }
    },
    beforeCreate(){
      let code = this.$route.params.code;
      this.isLoading = false;
      if(code){
        // axios.post("somewhere").then(response=>{
        //   let data =response.data;
        //   this.trackingCode = data.tracking_code;
        //   this.msg = data.message;
        //   this.status = data.status;
        //   this.isLoading = false
        // })
      }
    },
    methods:{

    }

  }
</script>

<style>
.confirm-page-container .tracking{
  display: flex;
  flex-direction: column;
  align-items: center;
  border: .5px solid #999;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 10px;
}
.confirm-page-container .tracking .title{
  font-size: .9em;
}
.confirm-page-container .tracking p {
  padding: 10px 20px;
}
.track_code{
  color: #444;
}
.track_code span{
  color: #e74c3c;
  font-weight: bold;

}
.refer-code span{
  color: #27ae60;
  font-weight: bold;
}
.goHOme{
  padding: 10px 20px;
  display: flex;
  justify-content: center;

}
</style>
