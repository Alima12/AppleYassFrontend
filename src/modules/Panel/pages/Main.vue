<template>
  <div class="sidebar__nav border-top border-left">
      <span class="bars d-none padding-0-18" @click="togglebar()"></span>
      <a class="header__logo  d-none" href="https://webamooz.net"></a>
      <div class="profile__info border cursor-pointer text-center">
          <div class="avatar__img"><img :src="img" class="avatar___img">
              <input type="file" accept="image/*" class="hidden avatar-img__input">
              <div class="v-dialog__container" style="display: block;"></div>
              <div class="box__camera default__avatar"></div>
          </div>
          <span class="profile__name">کاربر : {{user.get_full_name}}</span>
      </div>

      <SideBar />
  </div>
  <div class="content">
    <HeaderPanel />
    <div class="breadcrumb">
        <ul>
            <li v-for="route in $route.matched">
              <router-link :to="route.path">{{route.name}}</router-link>
            </li>
        </ul>
    </div>
    <router-view></router-view>
</div>
  
</template>
<script>
  import SideBar from "../components/SideBar"
  import HeaderPanel from '../components/Header'
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    name: "Panel",
    components:{
      SideBar,
      HeaderPanel

    },
    data(){
      return{
        user:{},
        img:""
      }
    },
    methods:{
      create_custom_dropdowns() {
        $('select.set').each(function (i, select) {
            if (!$(this).next().hasClass('dropdown-select')) {
                $(this).after('<div class="dropdown-select wide ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
                var dropdown = $(this).next();
                var options = $(select).find('option');
                var selected = $(this).find('option:selected');
                dropdown.find('.current').html(selected.data('display-text') || selected.text());
                options.each(function (j, o) {
                    var display = $(o).data('display-text') || '';
                    dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
                });
            }
        });

        $('.dropdown-select ul').before('<div class="dd-search"><input id="txtSearchValue" autocomplete="off" onkeyup="filter()" class="dd-searchbox" type="text"></div>');
      },
      togglebar(){
            $('.sidebar__nav').toggleClass('is-active');
            $('.content').toggleClass('is-active');
      },
    },
    mounted(){
      this.$store.dispatch("getCategory")
      if(this.$store.getters.isLogined){
        setTimeout(()=>{
          this.user = this.$store.getters.getMe;
          this.img = this.user.images[this.user.images.length -1 ].image
        },1000);
      }else{
        this.$router.push("/auth/login");
      }
      this.create_custom_dropdowns();
      document.querySelector(".header nav").classList.add("panel")
      $(document).on('click', function (event) {
          if (!$(event.target).closest('.dropdown__notification').length && !$(event.target).closest('.notification').length) {
              $('.dropdown__notification').removeClass('is-active');
          }
      })
    }
  }
</script>
<style>
  @import "../../../assets/css/panel/style.css";
  @import "../../../assets/css/panel/responsive_768.css";
  @import "../../../assets/css/panel/responsive_991.css";
  
  .header nav.panel{
    display: none ;
  }

</style>