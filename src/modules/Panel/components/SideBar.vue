<template>
  <ul>
        <li
          v-for="route in panelRoutes"
          class="item-li"
          :class="setClass(route)"
        >
          <router-link :to="route.path">{{route.title}}</router-link>  
        </li>  
        <!-- <li class="item-li i-dashboard is-active"><a href="index.html">پیشخوان</a></li> -->
        <!-- <li class="item-li i-courses "><a href="courses.html">دوره ها</a></li>
        <li class="item-li i-users"><a href="users.html"> کاربران</a></li>
        <li class="item-li i-categories"><a href="categories.html">دسته بندی ها</a></li>
        <li class="item-li i-slideshow"><a href="slideshow.html">اسلایدشو</a></li>
        <li class="item-li i-banners"><a href="banners.html">بنر ها</a></li>
        <li class="item-li i-articles"><a href="articles.html">مقالات</a></li>
        <li class="item-li i-ads"><a href="ads.html">تبلیغات</a></li>
        <li class="item-li i-comments"><a href="comments.html"> نظرات</a></li>
        <li class="item-li i-tickets"><a href="tickets.html"> تیکت ها</a></li>
        <li class="item-li i-discounts"><a href="discounts.html">تخفیف ها</a></li>
        <li class="item-li i-transactions"><a href="transactions.html">تراکنش ها</a></li>
        <li class="item-li i-checkouts"><a href="checkouts.html">تسویه حساب ها</a></li>
        <li class="item-li i-checkout__request "><a href="checkout-request.html">درخواست تسویه </a></li>
        <li class="item-li i-my__purchases"><a href="mypurchases.html">خرید های من</a></li>
        <li class="item-li i-my__peyments"><a href="mypeyments.html">پرداخت های من</a></li>
        <li class="item-li i-notification__management"><a href="notification-management.html">مدیریت اطلاع رسانی</a>
        </li> -->
    </ul>
</template>
<script>

  export default {
    name: "SideBar",
    data(){
      return{
        panelRoutes:[
          {path:"/panel/dashboard",title:"داشبورد",icon:"i-dashboard"},
          {path:"/panel/myorders",title:"سفارشات من",icon:"i-orders"},
          {path:"/panel/mytransactions",title:"تراکنش های من",icon:"i-transactions"},
          {path:"/panel/category",title:"دسته بندی",icon:"i-categories"},
          {path:"/panel/profile",title:"پروفایل",icon:"i-user__inforamtion"},


          {path:"/panel/users",title:"کاربران",icon:"i-users"},
          {path:"/panel/slideshow",title:"مدیریت اسلاید",icon:"i-slideshow"},
          {path:"/panel/products",title:"اجناس",icon:"i-basket"},
          {path:"/panel/charts",title:"آمار",icon:"i-chart"},
          {path:"/panel/discount",title:"تخفیف",icon:"i-discounts"},
          {path:"/panel/comments",title:"نظرات",icon:"i-comments"},
          {path:"/panel/transactions",title:"تراکنش ها",icon:"i-transactions"},
          {path:"/panel/orders",title:"سفارشات",icon:"i-orders"},
          {path:"/panel/setting",title:"تنظیمات",icon:"i-setting"},
          




        ]
      }
    },
    methods:{
      setClass(route){
        console.log(this.$route.path)
        let cls = `${route.icon}`
        cls += route.path == this.$route.path ? ` is-active` : ''
        return cls
      }
    }
  }
</script>

