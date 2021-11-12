<template>
  <div class="main-content">
    <div class="tab__box">
        <div class="tab__items">
            <router-link to="/panel/users" :class="{'is-active':activeCat == 'all'&&$route.path == '/panel/users'}" class="tab__item" @click.prevent="filterUsers()">همه کاربران</router-link>
            <router-link to="/panel/users" :class="{'is-active':activeCat == 'admin'&&$route.path == '/panel/users'}" class="tab__item" @click.prevent="filterUsers('admin')" href="">مدیران</router-link>
            <router-link to="/panel/users" :class="{'is-active':activeCat == 'active'&&$route.path == '/panel/users'}" class="tab__item" @click.prevent="filterUsers('active')" href="">کاربران فعال</router-link>
            <router-link to="/panel/users" :class="{'is-active':activeCat == 'deactive'&&$route.path == '/panel/users'}" class="tab__item" @click.prevent="filterUsers('deactive')" href="">کاربران غیر فعال</router-link>
            <router-link to="/panel/users/new" exact-active-class="is-active" class="tab__item">ایجاد کاربر جدید</router-link>
        </div>
    </div>
    <div class="users-list" v-if="$route.path=='/panel/users'">
        <div class="d-flex flex-space-between item-center flex-wrap padding-30 border-radius-3 bg-white">
            <div class="t-header-search">
                <form action="" @click.prevent="filterUsers()">
                    <div class="t-header-searchbox font-size-13">
                        <input v-model="sName" type="text" class="text search-input__box font-size-13" placeholder="جستجوی کاربر">
                        <div class="t-header-search-content ">
                            <input type="text" v-model="sIP" class="text margin-bottom-20" placeholder="ایپی">
                            <input type="text" v-model="sEmail" class="text"  placeholder="ایمیل">
                            <input type="text" v-model="sNumber" class="text" placeholder="شماره">
                            <btutton class="btn btn-my-styles">جستجو</btutton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="table__box">
            <table class="table">
                <thead role="rowgroup">
                <tr role="row" class="title-row">
                    <th>شناسه</th>
                    <th>نام و نام خانوادگی</th>
                    <th>شماره موبایل</th>
                    <th>ایمیل</th>
                    <th>سطح کاربری</th>
                    <th>تاریخ عضویت</th>
                    <th>ای پی</th>
                    <th>عملیات</th>
                </tr>
                </thead>
                <tbody>
                <tr role="row" class="fw-bold" v-for="user in filterdUsers">
                    <td>{{user.id}}</td>
                    <td>{{user.fullname}}</td>
                    <td>{{user.phoneNumber}}</td>
                    <td>{{user.email}}</td>
                    <td>
                        <span v-if="user.isAdmin" class="text-success">ادمین</span>
                        <span v-else-if="user.isActive" class="text-primary">عضو فعال</span>
                        <span v-else class="text-error">عضو غیر فعال</span>
                    </td>
                    <td>{{user.dateJoin}}</td>
                    <td class="text-success">{{user.ip}}</td>
                    <td>
                        <a style="font-size:20px;cursor:pointer;" @click.prevent="deleteUser(user.id)" class="item-delete mlg-15" title="حذف"></a>
                        <router-link :to="`/panel/users/${user.id}`" style="font-size:20px" href="" class="item-edit " title="ویرایش"></router-link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else class="create-user">
         <div class="row no-gutters  bg-white">
            <div class="col-12">
                <p class="box__title" v-if="$route.name != 'edit-user'">افزودن کاربر</p>
                <p class="box__title" v-else>ویرایش کاربر</p>
                <form action="" class="padding-30" method="post">
                    <input v-model="editUser.fullname" type="text" class="text" placeholder="نام و نام خانوادگی">
                    <input v-model="editUser.phoneNumber" type="text" class="text" placeholder="شماره موبایل">
                    <input v-model="editUser.email" type="text" class="text" placeholder="ایمیل">
                    <input v-model="editUser.ip" type="text" class="text" placeholder="آی پی" disabled>
                    <select name="" id="">
                        <option value="0">کاربر فعال</option>
                        <option value="1">کاربر غیر فعال</option>
                        <option value="2">مدیر</option>
                    </select>

                    <button class="btn btn-my-styles" v-if="$route.name != 'edit-user'">افزودن</button>
                
                    <button class="btn btn-my-styles" v-else>ویرایش</button>
                </form>

            </div>
        </div>
    </div>
  </div>

</template>

<script>
  import Swal from 'sweetalert2'

  export default {
    name: "Users",
    components:{},
    data(){
        let users = [
                {id:0,fullname:"Ali",phoneNumber:"09303444354",email:"aliali.ali1378@yahoo.com",isAdmin:true,isActive:true,dateJoin:"1400-06-01",ip:"148.12.12.1",totalBuys:3000000},
                {id:1,fullname:"Amir",phoneNumber:"09301444404",email:"aliali.ali1378@yahoo.com",isAdmin:false,isActive:true,dateJoin:"1400-08-05",ip:"142.12.10.1",totalBuys:40000000},
                {id:2,fullname:"Milad",phoneNumber:"09174214351",email:"aliali.ali1378@yahoo.com",isAdmin:false,isActive:true,dateJoin:"1400-07-05",ip:"128.1.11.1",totalBuys:2000000},
                {id:3,fullname:"Maryam",phoneNumber:"09901232010",email:"aliali.ali1378@yahoo.com",isAdmin:true,isActive:true,dateJoin:"1400-06-05",ip:"248.2.12.1",totalBuys:1000000},
                {id:4,fullname:"Parisa",phoneNumber:"09141598520",email:"aliali.ali1378@yahoo.com",isAdmin:false,isActive:true,dateJoin:"1400-09-05",ip:"147.12.12.1",totalBuys:31000000},
                {id:6,fullname:"Rostam",phoneNumber:"09127267626",email:"aliali.ali1378@yahoo.com",isAdmin:false,isActive:true,dateJoin:"1400-10-05",ip:"210.12.12.1",totalBuys:35200000},
                {id:5,fullname:"Reyhan",phoneNumber:"09174212112",email:"aliali.ali1378@yahoo.com",isAdmin:false,isActive:false,dateJoin:"1400-07-01",ip:"220.12.12.1",totalBuys:341000},
                {id:7,fullname:"Saman",phoneNumber:"09151201214",email:"aliali.ali1378@yahoo.com",isAdmin:false,isActive:false,dateJoin:"1400-06-21",ip:"148.02.12.1",totalBuys:3123000},
                {id:8,fullname:"Ahmad",phoneNumber:"09202544565",email:"aliali.ali1378@yahoo.com",isAdmin:false,isActive:true,dateJoin:"1400-06-20",ip:"148.12.12.1",totalBuys:100000},
                {id:9,fullname:"Sara",phoneNumber:"09928511230",email:"aliali.ali1378@yahoo.com",isAdmin:false,isActive:true,dateJoin:"1400-06-08",ip:"112.12.12.1",totalBuys:1008000},
                {id:10,fullname:"Samira",phoneNumber:"09382020151",email:"aliali.ali1378@yahoo.com",isAdmin:false,isActive:true,dateJoin:"1400-06-11",ip:"148.12.12.1",totalBuys:3900000}

        ]
        return{
            users:users,
            sName:"",
            sEmail:"",
            sNumber:"",
            sIP:"",
            filterdUsers:users,
            activeCat:'all',
            editUser:{}
        }
    },
    created(){
       $(document).on('click touchstart', function (e) {
            var serach__box = $('.t-header-search');
            var input = $('.search-input__box');
            if ($(e.target).is(serach__box) || serach__box.has(e.target).length == 1) {
                $('.t-header-search-content').show();
                $('.t-header-searchbox').addClass('open')
            } else {
                $('.t-header-search-content').hide();
                $('.t-header-searchbox').removeClass('open')

            }
        })
        $(document).on('click', '.dropdown-select', function (event) {
          if ($(event.target).hasClass('dd-searchbox')) {
              return;
          }
          $('.dropdown-select').not($(this)).removeClass('open');
          $(this).toggleClass('open');
          if ($(this).hasClass('open')) {
              $(this).find('.option').attr('tabindex', 0);
              $(this).find('.selected').focus();
          } else {
              $(this).find('.option').removeAttr('tabindex');
              $(this).focus();
          }
      });
      $(document).on('click', function (event) {
          if ($(event.target).closest('.dropdown-select').length === 0) {
              $('.dropdown-select').removeClass('open');
              $('.dropdown-select .option').removeAttr('tabindex');
          }
          event.stopPropagation();
      });
      $(document).on('click', '.dropdown-select .option', function (event) {
          $(this).closest('.list').find('.selected').removeClass('selected');
          $(this).addClass('selected');
          var text = $(this).data('display-text') || $(this).text();
          $(this).closest('.dropdown-select').find('.current').text(text);
          $(this).closest('.dropdown-select').prev('select').val($(this).data('value')).trigger('change');
      });

      $(document).on('keydown', '.dropdown-select', function (event) {
          var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
          if (event.keyCode == 13) {
              if ($(this).hasClass('open')) {
                  focused_option.trigger('click');
              } else {
                  $(this).trigger('click');
              }
              return false;
              // Down
          } else if (event.keyCode == 40) {
              if (!$(this).hasClass('open')) {
                  $(this).trigger('click');
              } else {
                  focused_option.next().focus();
              }
              return false;
              // Up
          } else if (event.keyCode == 38) {
              if (!$(this).hasClass('open')) {
                  $(this).trigger('click');
              } else {
                  var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
                  focused_option.prev().focus();
              }
              return false;
              // Esc
          } else if (event.keyCode == 27) {
              if ($(this).hasClass('open')) {
                  $(this).trigger('click');
              }
              return false;
          }
      });

    },
    updated(){
        this.editPrepareUser()
    },
    mounted(){
        this.editPrepareUser()

    },
    methods:{
        filterUsers(value=""){
            if(value == 'admin'){
                this.filterdUsers = this.users.filter(user=>user.isAdmin)
                this.activeCat = 'admin';

            }else if(value == 'active'){
                this.filterdUsers = this.users.filter(user=>user.isActive)
                this.activeCat = 'active';

            }else if(value == 'deactive'){
                this.filterdUsers = this.users.filter(user=>!user.isActive)
                this.activeCat = 'deactive';

            }else{
                this.filterdUsers = this.users;
                this.activeCat = 'all';
            }
            if(this.sName!="" || this.sEmail!="" || this.sNumber!="" || this.sIP!=""){
                this.filterdUsers = this.filterdUsers.filter(user=> user.fullname.toLowerCase().includes(this.sName.toLowerCase()));
                this.filterdUsers = this.filterdUsers.filter(user=> user.email.toLowerCase().includes(this.sEmail.toLowerCase()));
                this.filterdUsers = this.filterdUsers.filter(user=> user.phoneNumber.includes(this.sNumber));
                this.filterdUsers = this.filterdUsers.filter(user=> user.ip.includes(this.sIP));

            }
        },
        editPrepareUser(){
            if(this.$route.params.id){
                this.editUser = this.users.find(user=> user.id == this.$route.params.id)
                setTimeout(()=>{
                    let current = document.querySelector("span.current")
                    let premission = 'کاربر غیر فعال'
                    if(this.editUser.isAdmin){
                        premission = "ادمین"
                    }else if(this.editUser.isActive){
                        premission = "کاربر فعال"
                    }
                    current.innerText = premission;
                },1000)
               
            }
        },
        deleteUser(id){
            let user = this.users.find(usr=> usr.id == id);
            Swal.fire({
                title: '<h5>حذف کاربر</h5>',
                html: `<div>
                <div>
                    <p>اسم: ${user.fullname}</p>
                    <p>شماره تلفن : ${user.phoneNumber}</p>
                    <p>ایمیل: ${user.email}</p>
                    <p>آیپی: ${user.ip}</p>


                </div>
                <p>توجه داشته باشید با حذف کردن کاربر فوق هیچ راهی برای برگرداند آن وجود ندارد</p>
                <p>*تمامی سوابق کاربر باقی خواهند ماند</p>
                <small>*از جمله سفارشات و تراکنش ها ولی نام کاربر در آن ذکر نخواهد شد</small>
                            </div>`,
                icon: 'warning',
                confirmButtonText: 'حذف کن',
                confirmButtonColor:"#e74c3c",
                CancelButtonColor:"#95a5a6",
                cancelButtonText:"انصراف",
                confirmButtonText: 'حذف',
                showCancelButton: true,
            }).then(result=>{
                if (result.isConfirmed) {
                    this.users = this.users.filter(usr=> usr.id !== user.id);
                    this.filterUsers()
                    Swal.fire({
                        title: 'حذف با موفقیت انجام شد',
                        text:'دسته بندی مورد نظر حذف شد',
                        icon:'success',
                        confirmButtonColor:"#27ae60",
                        confirmButtonText: 'متوجه شدم',
                    })
                }
            });
        }
    }
  }

</script>