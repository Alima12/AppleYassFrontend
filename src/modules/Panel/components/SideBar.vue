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
          {path:"/panel/profile",title:"پروفایل",icon:"i-user__inforamtion"},
          {path:"/panel/users",title:"کاربران",icon:"i-users"},

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

