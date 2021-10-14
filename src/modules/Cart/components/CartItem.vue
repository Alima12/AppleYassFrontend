<template>
    <div class="row cart-item">
        <div class="col-2 image-container">
            <img src="https://dkstatics-public.digikala.com/digikala-products/114699730.jpg" alt="">
        </div>
        <div class="col-10 details">
            <h4 class="product-title">اسپیکر jbl قابل حمل</h4>
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
                        <input type="number" name="" id="" min="1">
                    </div>
                    <div class="delete">
                        <button class="btn btn-danger delete-product"><i class="fa fa-trash"></i></button>
                    </div>
                </div>
                <div class="price">
                    <span>58,000 تومان</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: "cartItem",
    props:['item']
  }
</script>
