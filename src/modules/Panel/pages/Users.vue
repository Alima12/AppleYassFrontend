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
                    <td>{{user.get_full_name}}</td>
                    <td>{{user.phone_number}}</td>
                    <td>{{user.email}}</td>
                    <td>
                        <span v-if="user.is_admin" class="text-success">ادمین</span>
                        <span v-else-if="user.is_active" class="text-primary">عضو فعال</span>
                        <span v-else class="text-error">عضو غیر فعال</span>
                    </td>
                    <td>{{user.date_joined}}</td>
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
                    <input v-model="editUser.get_full_name" type="text" class="text" placeholder="نام و نام خانوادگی">
                    <input v-model="editUser.phone_number" type="text" class="text" placeholder="شماره موبایل">
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
import axios from 'axios'

  export default {
    name: "Users",
    components:{},
    data(){
        let users = [
                
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
        axios.get("users/").then(response=>{
            response.data.forEach(usr => {
                this.users.push(usr)
            });
        }).catch(err=>{
            console.log("Error",err.message)
        })
        this.editPrepareUser()

    },
    methods:{
        filterUsers(value=""){
            if(value == 'admin'){
                this.filterdUsers = this.users.filter(user=>user.is_admin)
                this.activeCat = 'admin';

            }else if(value == 'active'){
                this.filterdUsers = this.users.filter(user=>user.is_active)
                this.activeCat = 'active';

            }else if(value == 'deactive'){
                this.filterdUsers = this.users.filter(user=>!user.is_active)
                this.activeCat = 'deactive';

            }else{
                this.filterdUsers = this.users;
                this.activeCat = 'all';
            }
            if(this.sName!="" || this.sEmail!="" || this.sNumber!="" || this.sIP!=""){
                this.filterdUsers = this.filterdUsers.filter(user=> user.get_full_name.toLowerCase().includes(this.sName.toLowerCase()));
                this.filterdUsers = this.filterdUsers.filter(user=> user.email.toLowerCase().includes(this.sEmail.toLowerCase()));
                this.filterdUsers = this.filterdUsers.filter(user=> user.phone_number.includes(this.sNumber));
                this.filterdUsers = this.filterdUsers.filter(user=> user.ip.includes(this.sIP));

            }
        },
        editPrepareUser(){
            if(this.$route.params.id){
                this.editUser = this.users.find(user=> user.id == this.$route.params.id)
                setTimeout(()=>{
                    let current = document.querySelector("span.current")
                    let premission = 'کاربر غیر فعال'
                    if(this.editUser.is_admin){
                        premission = "ادمین"
                    }else if(this.editUser.is_active){
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
                    <p>اسم: ${user.get_full_name}</p>
                    <p>شماره تلفن : ${user.phone_number}</p>
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
                    axios.delete(`users/${user.id}/`).then(response=>{
                        if(response.status == 204){
                            Swal.fire({
                                title: 'حذف با موفقیت انجام شد',
                                text:'دسته بندی مورد نظر حذف شد',
                                icon:'success',
                                confirmButtonColor:"#27ae60",
                                confirmButtonText: 'متوجه شدم',
                            })
                        }
                    })
                    this.filterUsers()
                   
                }
            });
        }
    }
  }

</script>