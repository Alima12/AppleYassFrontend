<template>
    <div class="header d-flex item-center bg-white width-100 border-bottom padding-12-30">
        <div class="header__right d-flex flex-grow-1 item-center">
            <span class="bars" @click="togglebar()"></span>
            <a href="/" style="width:100%;margin-right:20px;margin-top:15px">
                <i class="fa fa-home" style="font-size:22px"></i>
            </a>
        </div>
        <div class="header__left d-flex flex-end item-center margin-top-2">
            <div class="notification margin-15">
                <a class="notification__icon" @click="showNotifs()"><i class="fa fa-bell"></i></a>
                <div class="dropdown__notification">
                    <div class="content__notification">
                        <span class="font-size-13">موردی برای نمایش وجود ندارد</span>
                    </div>
                </div>
            </div>
            <a href="" class="logout" title="خروج">
                <i class="fa fa-sign-out" @click="Logout()"></i>
            </a>
        </div>
    </div>
</template>
<script>
  export default {
    name: "HeaderPanel",
    methods:{
        togglebar(){
            $('.sidebar__nav').toggleClass('is-active');
            $('.content').toggleClass('is-active');
        },
        showNotifs(){
            $('.dropdown__notification').toggleClass('is-active');
        },
        Logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$router.push("/")

        }
    }

  }
</script>
<style>
.notification__icon i{
    font-size: 19px;
    color:#444;
    cursor: pointer;
}
.logout i{
    font-size: 19px;
    color:#444;
    cursor: pointer; 
}

.bars{
    font-size: 19px;
    color:#444;
    cursor: pointer; 
}

</style>