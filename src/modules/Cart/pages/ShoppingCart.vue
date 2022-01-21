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
              <div v-if="cart.hasOwnProperty('discount')">
                <h4 class="text-danger text-decoration-line-through">{{realPrice.toLocaleString()}} تومان</h4>
                <h4 class="text-success">{{totalPrice.toLocaleString()}} تومان</h4>
              </div>
              <div v-else>
                <h4 class="text-success">{{totalPrice.toLocaleString()}} تومان</h4>
              </div>

            </div>
            <div class="discount-container" v-if="cart.hasOwnProperty('discount')">
              <div class="percent">
                {{cart.discount.percent}} درصد تخفیف اعمال شد با کد <span class="text-danger fw-bold"> {{cart.discount.code}}</span>
              </div>
              <div class="action">
                <i class="fa fa-trash fa-2x"></i>
              </div>
            </div>
            <div class="discount-section" v-if="!cart.hasOwnProperty('discount')">
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
                          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                          <button class="btn btn-success">اعمال</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="submitation d-flex justify-content-end">
              <button class="btn btn-danger p-3 bg-opacity-10">ادامه فرایند خرید</button>
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
      }
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
