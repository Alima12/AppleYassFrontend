<template>
  <h2 class="bg-dark text-white text-center p-3">
    سبد خرید
    <i class="fa fa-shopping-cart text-success mx-2"></i>
  </h2>
  <div class="container-fluid produoct-cart-items">
      <cartItem :item="item"  v-for="item in cart.items" @change="setNewValue" />
      
  </div>
  <div class="container-fluid cart-all-price">
    <div class="row d-flex justify-content-end">
      <div class="col-lg-8 col-md-10 col-sm-12">
           <div class="total text-center">
            <div class="price">
              <span>جمع سبد خرید</span>
              <div v-if="hasDiscount()">
                <h4 class="text-danger text-decoration-line-through">{{realPrice.toLocaleString()}} تومان</h4>
                <h4 class="text-success">{{totalPrice.toLocaleString()}} تومان</h4>
              </div>
              <div v-else>
                <h4 class="text-success">{{totalPrice.toLocaleString()}} تومان</h4>
              </div>

            </div>
            <div class="discount-container" v-if="hasDiscount()">
              <div class="percent">
                {{cart.discount.percent}} درصد تخفیف اعمال شد با کد <span class="text-danger fw-bold"> {{cart.discount.code}}</span>
              </div>
              <div class="action" @click="deleteDiscount(cart.discount)">
                <i class="fa fa-trash fa-2x"></i>
              </div>
            </div>
            
            <div class="discount-section" v-else>
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        تخفیف
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <div class="input-group mb-3 active-code">
                          <span class="input-group-text" id="inputGroup-sizing-default">کد تخفیف</span>
                          <input v-model="discountCode" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                          <button class="btn btn-success" @click="setDiscount()">اعمال</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="submitation d-flex justify-content-end">
              <button class="btn btn-danger p-3 bg-opacity-10" @click="confirm()">ادامه فرایند خرید</button>
            </div>
          </div>
      </div>
    </div>
  </div>
      <loading 
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
      />
</template>
<script>
  import cartItem from '../components/CartItem'
  import Loading from 'vue-loading-overlay';
  import axios from 'axios';
  import Swal from 'sweetalert2'
  import "@/assets/css/cart.css"
  export default {
    name: "ShoppingCart",
    components:{
      cartItem,
      loading:Loading
    },
    data(){
      return {
        cart:{},
        totalPrice:0,
        realPrice:0,
        isLoading: true,
        fullPage: true,
        discountCode:""
      }
    },
    beforeCreate(){
      this.$store.dispatch("getCartItems");
      setTimeout(()=>{
        this.cart = this.$store.getters.CartItems;
        this.totalPrice = this.cart.total_price;
        this.realPrice = this.cart.real_price;
        this.isLoading = false;
      },1000)
    },
    methods:{

      setNewValue(price){
        this.realPrice = price[0];
        this.totalPrice = price[1];
      },
      deleteDiscount(discount){
        Swal.fire({
          title: 'حذف کد تخفیف',
          text: `آیا از حذف کد تخفیف ${discount.code} اطمینان دارید؟`,
          icon: 'error',
          confirmButtonColor:"#e74c3c",
          CancelButtonColor:"#95a5a6",
          cancelButtonText:"انصراف",
          confirmButtonText: 'حذف',
          showCancelButton: true,

        }).then((result) => {
          if (result.isConfirmed) {
            let data = new FormData();
            data.append("code", discount.code);
            axios.delete('transaction/discount/delete/', {data:data}).then(response=>{
              if(response.status==204){
                this.cart.discount = null;
                this.setAlert("کد تخفیف با موفقیت حذف شد", "warning")
                
              }
            })
            .catch(err=>{
                Swal.fire({
                    title: 'ناموفق',
                    text:'مشکلی به وجود آمده است لطفا دوباره امتحان کنید',
                    icon:'error',
                    confirmButtonColor:"#c23616",
                    confirmButtonText: 'متوجه شدم',
                })
            })
          }
        })

       
      },
      setAlert(message, type){
        this.$toast.open({
            message:message,
            type:type,
            duration:5000,
            position: 'top'

        })
      },
      setDiscount(){
        this.isLoading = true
        let data = new FormData();
        data.append("code", this.discountCode)
        axios.post("transaction/discount/use/", data).then(response=>{
          this.cart.discount = response.data;
          this.setAlert(`کد تخفیف با موفقیت به سبد خرید شما اضافه شد`, "success")
        }).catch(error=>{
          let msg = `کد تخفیف مورد نظر اشتباه است`
          if(error.response.status == 403){
            msg = error.response.data
          }
          this.setAlert(msg, "error")

        })
        this.isLoading = false
      },
      hasDiscount(){
        if(this.cart.discount != null){
          return true
        }
        return false;
      },
      confirm(){
        axios.post("transaction/order/cart/checkout/").then(response=>{
          let data = response.data
          console.log(data)
          this.$router.push('/cart/confirm')
        });
      },

    }

  }
</script>

<style>
.discount-container{
  padding: 10px 10px;
  border: 1px solid #444;
  margin-bottom:  20px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background: rgba(0, 148, 50,.5);
  border-radius: 10px;
}

.discount-container .percent{
  font-size: 1.1em;
  color: rgba(197, 108, 240,1.0);
}

.discount-container .action i{
  color: red;
  cursor: pointer;
}
</style>
