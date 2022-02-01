<template>
    <div class="confirm-page-container">
      <div class="proccess">
        <div class="header">
          <h3>تایید نهایی</h3>
        </div>
      </div>
      <hr class="myhr" />
      <div class="main">
        <div class="addresses">
            <div class="header">
              <p>لطفا آدرس خود را انتخاب کنید</p>
            </div>
          <form id="addressForm">
            <div class="worm">
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
              <div class="worm__segment"></div>
            </div>
          </form>
          <div class="add-address">
            <a class="btn btn-outline-success" href="/panel/profile" target="_blank">
              اضافه کردن آدرس
              <i class="fa fa-plus"></i>
            </a>
          </div>
              
          
        </div>

        <hr class="myhr" />
        <div class="content">

          <div class="products">
            <h6>لیست محصولات</h6>
            <div class="product mb-1" v-for="product in items">
              <a :href="`/product/`+ product.code" target="_blank" rel="noopener noreferrer">
                <img :src="'http://127.0.0.1:8000'+ product.images[0].image">
              </a>
              <div class="detail">
                {{product.title}}({{product.name}})
                <span><i class="fa fa-circle" :style="`color: ${product.colors.color};`"></i></span> رنگ
                به قیمت <span class="price">{{product.colors.price.toLocaleString()}}</span>
              </div>
            </div>
            <div class="total-prices">
              <p>فاکتور</p>
              <div class="real-price">
                <span>جمع حساب:</span>
                {{cart.real_price.toLocaleString()}}
              </div>
              <div class="total-price">
               <span> قابل پرداخت: </span>
                {{cart.total_price.toLocaleString()}}
              </div>

              <div class="saves-money" v-if="cart.real_price > cart.total_price">
                <span>مقدار تخفیف:</span>
                {{ (parseInt(cart.real_price) - parseInt(cart.total_price)).toLocaleString() }}
              </div>
              <small class="text-center">* تمامی مبالغ به تومان میباشد</small>
            </div>

          </div>
        </div>
      </div>

      
    </div>

    <div class="buy-button">
      <button class="btn btn-outline-success" @click="pay()">
        پرداخت
      </button>
    </div>



    <loading 
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="true"
    />
    
</template>
<script>
  import Loading from 'vue-loading-overlay';
  import "@/assets/css/confirmpage.css"

  import axios from 'axios';
  export default {
    name: "ConfirmPage",
    components:{ 
      loading:Loading
    },
    data(){
      return {
          isLoading:false,
          cart:{
            customer:{
              address:[]
            }
          },
          proccess:0,
          id:0,
          items:[]
      }
    },
    beforeCreate(){
      this.$router.push("/cart/payment")
      axios.get("transaction/order/cart/checkout/").then(response=>{
        this.cart = response.data;
        axios.get(`transaction/orders/shoppingview/${this.cart.refer_code}/`).then(res=>{
          this.items = res.data.products
          this.colors = res.data.colors
          for (let index = 0; index < res.data.colors.length; index++) {
            this.items[index].colors = this.colors[index]
            
          }

        })
      });
    },
    methods:{
      pay(){
        let box = document.querySelector("#addressForm")
        let choosed = -1;
        for(let index=0;index < box.elements.length;index++){
          let item = box.elements[index];
          if(item.checked){
            choosed = item.value;
          }
        }
        if(choosed > 0){
          let data = new FormData()
          data.append("addressID", choosed)
          axios.post(`transaction/order/cart/checkout/set/${this.cart.refer_code}/`, data).then(response=>{
            this.$router.go("/cart/payment")
          })
        }
        
      },
      getAddreses(){
        setTimeout(()=>{
          let box = document.querySelector("#addressForm")
          let choices = ""
          let id = 0
          this.cart.customer.address.forEach(address => {
            id = this.getId()
            choices += `
            <input id="${address.id}" type="radio" value="${address.id}" name="noname">
            <label for="${address.id}"><span></span>${address.city}/${address.rest_of}</label>
            `
          });
          box.innerHTML = choices +  box.innerHTML;
          box.elements[0].checked = true
        },1000)

      },
      getId(){
        this.id = parseInt(1) + parseInt(this.id);
        return this.id;
      },
      setProccess(){
        for (let index = 0; index < 33; index++) {
          setTimeout(()=>{
            this.proccess = index;
          },200)
          
        }
      }
    },
    mounted(){
      this.setProccess()
      this.getAddreses()
    }

  }
</script>

<style>

</style>
