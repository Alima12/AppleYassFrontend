<template>
    <div class="row cart-item" v-if="!setFromLocal">
        <div class="col-2 image-container">
            <a :href="`/product/` + item.product.product.code">

                <img :src="item.image" alt="">
                <p class="d-none">
                    {{setImage(item.product.product)}}
                </p>
            </a>
        </div>
        <div class="col-10 details">
            <h4 class="product-title">{{item.name}}</h4>
            <div class="more">
                <ul>
                    <li>
                        <span>
                            <i class="fa"></i>
                        </span>
                        <span>
                            {{item.title}}
                        </span>
                    </li>

                </ul>
            </div>
            <div class="actions">
                <div class="update">
                    <div class="decrease-increase">
                        <input type="number" min="1" v-model="count">
                    </div>
                    <div class="delete">
                        <button class="btn btn-danger delete-product" @click="deleteItem(item.product.id)"><i class="fa fa-trash"></i></button>
                    </div>
                </div>
                <div class="price">
                    <span>{{item.price.toLocaleString()}} تومان</span>
                </div>
            </div>
        </div>
    </div>

    <div class="row cart-item" v-else>
        <div class="col-2 image-container">
            <a :href="`/product/` + it.product.code">
                <img :src="it.product.images[0].image" alt="">
                <p class="d-none">
                </p>
            </a>
        </div>
        <div class="col-10 details">
            <h4 class="product-title">{{it.product.name}}</h4>
            <div class="more">
                <ul>
                    <li>
                        <span>
                            <i class="fa"></i>
                        </span>
                        <span>
                            {{it.product.title}}
                        </span>
                    </li>

                </ul>
            </div>
            <div class="actions">
                <div class="update">
                    <div class="decrease-increase">
                        <input type="number" min="1" v-model="count">
                    </div>
                    <div class="delete">
                        <button class="btn btn-danger delete-product" @click="deleteItem(it.product.id)"><i class="fa fa-trash"></i></button>
                    </div>
                </div>
                <div class="price">
                    <span>{{it.price.toLocaleString()}} تومان</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
  import Swal from 'sweetalert2'

  export default {
    name: "cartItem",
    props:['item',"setFromLocal"],
    data(){
        let count = this.item.count;

        return {
            count,
            it:{}
        }
    },
    async mounted(){
        if(this.setFromLocal){
            await axios.get(`${this.item.color_id}/color/`).then(response=>{
                this.it = response.data
            })
        }
    },
    methods:{
      increase(){
          this.$store.dispatch("updateItem",[this.item.code,this.count,this.item.color]);
      },
      async setImage(item){
          await axios.get(`${item.code}/`).then(response=>{
              this.item.image = response.data.images[0].image;
              this.item.title = response.data.title;
              this.item.name = response.data.name;

          })
      },
      deleteItem(id){
        
        Swal.fire({
          title: '<h5>حذف محصول از سبد خرید</h5>',
          html: `<p class="text-danger">آیا از حذف محصول زیر اطمینان دارید؟</p>
          <p class="fw-bold">${this.item.title}</p>`,
          icon: 'warning',
          confirmButtonText: 'حذف کن',
          confirmButtonColor:"#e74c3c",
          CancelButtonColor:"#95a5a6",
          cancelButtonText:"انصراف",
          confirmButtonText: 'حذف',
          showCancelButton: true,
        }).then(result=>{
          if (result.isConfirmed) {
              this.$store.dispatch("removeCartItem", id);
              Swal.fire({
                  title: 'حذف با موفقیت انجام شد',
                  text:'محصول مورد نظر با موفقیت از سبد خرید شما حذف شد',
                  icon:'success',
                  confirmButtonColor:"#27ae60",
                  confirmButtonText: 'متوجه شدم',
              }).then(result=>{
                if (result.isConfirmed) {
                  location.reload();
                }
              })
          }
        });
        
      }
    },
    watch:{
        count(){
            let data = new FormData()
            if(typeof this.count === 'number') {
                data.append("new_value", this.count);
                axios.put(`transaction/order/cart/update/${this.item.product.id}/`, data).then(response=>{
                    this.count = response.data.newValue;
                    let real_price = response.data.new_real_price;
                    let total_price = response.data.new_total_price;

                    this.$emit("change", [real_price, total_price])
                })
            }else{

            }

        }
    }

  }
</script>
