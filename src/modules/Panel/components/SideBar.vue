<template>
  <ul>
        <li
          v-for="route in panelRoutes"
          class="item-li"
          :class="setClass(route)"
        >
          <router-link :to="route.path">{{route.title}}</router-link>  
        </li>  
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

