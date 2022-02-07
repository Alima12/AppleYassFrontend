<template>
  <div class="main-content" >
    <div class="row no-gutters" v-if="/^.panel.superoffer.?$/.test($route.path)">
        <div class="col-12 margin-left-10 margin-bottom-15 border-radius-3">
                <p class="box__title text-center">تخفیفات شگفت انگیز</p>
                <div class="table__box">
                    <table class="table">
                        <thead role="rowgroup">
                        <tr role="row" class="title-row">
                            <th>عنوان</th>
                            <th>عکس محصول</th>
                            <th>تعداد خرید</th>
                            <th>درصد</th> 
                            <th>عکس درصد</th> 
                            <th>محصول</th> 

                            <th>وضعیت</th>
                            <th>محدودیت در استفاده</th>

                            <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr role="row" class="" v-for="offer in offers">
                            <td>{{offer.title}}</td>
                            <td>
                                <img :src="offer.image" alt="" width="100">
                            </td>
                            <td>{{offer.users}}</td>

                            <td>{{offer.percent}}%</td>
                            <td>
                                <img :src="offer.percent_image" alt="" width="100">
                            </td>
                            <td>
                                <a :href="`/product/${offer.product.product.code}/`" class="btn btn-primary text-white" target="_blank">مشاهده</a>
                            </td>
                            <td>
                              <i class="fa fa-check-circle fa-2x text-success" v-if="isActive(offer.till)"></i>
                              <i class="fa fa-times-circle fa-2x text-danger" v-else></i>
                            </td>
                             <td>
                              <i class="fa fa-check-circle fa-2x text-success" v-if="offer.limited"></i>
                              <i class="fa fa-times-circle fa-2x text-danger" v-else></i>
                            </td>
                            <td>
                                <router-link :to="`/panel/superoffer/${offer.id}/`" class="item-edit mlg-15" style="font-size:22px"  title="ویرایش" ></router-link>
                                <a class="item-delete " style="font-size:22px" title="حذف" @click.prevent="deleteDiscount()"></a>
                            </td>
                        </tr>
                 

                        </tbody>
                    </table>
                </div>
            </div>
           
            
    </div>
    <div class="row" v-else-if="/^.panel.superoffer.add.?$/.test($route.path)">
        <add-offer />
    </div>
    <div class="row" v-else>
        <edit-offer />
    </div>
  </div>
      <loading 
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
      />
</template>
<script>
    import Swal from 'sweetalert2'
    import DatePicker from 'vue3-persian-datetime-picker'
    import Loading from 'vue-loading-overlay';
    import axios from 'axios'
    import AddOffer from "../components/AddOffer.vue";
    import EditOffer from "../components/EditOffer.vue";

  export default {
    name: "SuperOffer",
    components:{DatePicker, loading:Loading, AddOffer, EditOffer},
    data(){
      return{
          isLoading: true,
          fullPage: false,
          offers:[]
          
      }
    },
    mounted(){
      axios.get("config/super-offer/list/").then(response=>{
          this.offers = response.data;
          this.isLoading = false;
      })
    },
    methods:{
        isActive(date){
            let before = new Date(date);
            let now = new Date();
            let dif = now - before;
            console.log(dif)
            if(dif < 0){
                return true
            }
            return false
        },
    }
    
  }

</script>
<style>

</style>