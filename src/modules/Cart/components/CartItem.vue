<template>
    <div class="row cart-item">
        <div class="col-2 image-container">
            <img :src="item.img" alt="">
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
                            هر چی که فکرشو کنی
                        </span>
                    </li>

                    <li>
                        <span>
                            <i class="fa"></i>
                        </span>
                        <span>
                            هر چی که فکرشو کنی
                        </span>
                    </li>

                    <li>
                        <span>
                            <i class="fa"></i>
                        </span>
                        <span>
                            هر چی که فکرشو کنی
                        </span>
                    </li>

                </ul>
            </div>
            <div class="actions">
                <div class="update">
                    <div class="decrease-increase">
                        <input type="number" name="" id="" min="1" v-model="count">
                    </div>
                    <div class="delete">
                        <button class="btn btn-danger delete-product"><i class="fa fa-trash"></i></button>
                    </div>
                </div>
                <div class="price">
                    <span>{{item.price.toLocaleString()}} تومان</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: "cartItem",
    props:['item'],
    data(){
        let count = this.item.count;

        return {
            count,
        }
    },
    methods:{
      increase(){
          this.$store.dispatch("updateItem",[this.item.code,this.count,this.item.color]);
      }
    },
    watch:{
        count(){
            this.increase();
        }
    }

  }
</script>
