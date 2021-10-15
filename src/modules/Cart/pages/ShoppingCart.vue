<template>
  <h2 class="bg-dark text-white text-center p-3">
    سبد خرید
    <i class="fa fa-shopping-cart text-success mx-2"></i>
  </h2>
  <div class="container-fluid produoct-cart-items">
      <cartItem :item="item"  v-for="item in items"/>

  </div>
  <div class="container-fluid cart-all-price">
    <div class="row d-flex justify-content-end">
      <div class="col-lg-8 col-md-10 col-sm-12">
           <div class="total text-center">
            <div class="price">
              <span>جمع سبد خرید</span>
              <h4>{{totalPrice.toLocaleString()}} تومان</h4>
            </div>
            <div class="discount-section">
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
 
</template>
<script>
  import cartItem from '../components/CartItem'
  import "@/assets/css/cart.css"
  export default {
    name: "ShoppingCart",
    components:{
      cartItem,
    },
    data(){
      return {
        items:this.$store.getters.getCartItems,
        totalPrice:this.$store.getters.getCartTotalPrice,
      }
    },
    created(){
      setInterval(()=>{
        this.totalPrice = this.$store.getters.getCartTotalPrice;
      },1000);
    },

  }
</script>
