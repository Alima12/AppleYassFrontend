<template>
  <ul>
        <li
          v-for="route in filterdpanelRoutes()"
          class="item-li"
          :class="setClass(route)"
        >
          <router-link :to="route.path">{{route.title}}</router-link>  
        </li>  
        
    </ul>
</template>
<script>
  import axios from "axios"
  export default {
    name: "SideBar",
    data(){

      return{
        user:"",
        panelRoutes:[
          {adminPermission:false,path:"/panel/dashboard",title:"داشبورد",icon:"i-dashboard"},
          {adminPermission:false,path:"/panel/myorders",title:"سفارشات من",icon:"i-orders"},
          {adminPermission:false,path:"/panel/mytransactions",title:"تراکنش های من",icon:"i-transactions"},
          {adminPermission:false,path:"/panel/profile",title:"پروفایل",icon:"i-user__inforamtion"},

          {adminPermission:true,path:"/panel/users",title:"کاربران",icon:"i-users"},
          {adminPermission:true,path:"/panel/category",title:"دسته بندی",icon:"i-categories"},
          {adminPermission:true,path:"/panel/slideshow",title:"مدیریت اسلاید",icon:"i-slideshow"},
          {adminPermission:true,path:"/panel/products",title:"اجناس",icon:"i-basket"},
          {adminPermission:true,path:"/panel/charts",title:"آمار",icon:"i-chart"},
          {adminPermission:true,path:"/panel/discount",title:"تخفیف",icon:"i-discounts"},
          {adminPermission:true,path:"/panel/comments",title:"نظرات",icon:"i-comments"},
          {adminPermission:true,path:"/panel/transactions",title:"تراکنش ها",icon:"i-transactions"},
          {adminPermission:true,path:"/panel/orders",title:"سفارشات",icon:"i-orders"},
          {adminPermission:true,path:"/panel/setting",title:"تنظیمات",icon:"i-setting"}
          
        ]
      }
    },
    mounted(){
      setInterval(()=>{
        this.user = this.$store.getters.getMe;
      },1000)
    },
    methods:{
      setClass(route){
        let cls = `${route.icon}`
        cls += route.path == this.$route.path ? ` is-active` : ''
        return cls
      },
      filterdpanelRoutes(){
        return this.panelRoutes.filter(route=>{
          if(!route.adminPermission || route.adminPermission && this.user.is_admin){
            return route
          }
        })
      }
    }
  }
</script>

