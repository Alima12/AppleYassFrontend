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
                <form action="" onclick="event.preventDefault();">
                    <div class="t-header-searchbox font-size-13">
                        <input type="text" class="text search-input__box font-size-13" placeholder="جستجوی کاربر">
                        <div class="t-header-search-content ">
                            <input type="text" v-model="sName" class="text margin-bottom-20" placeholder="نام و نام خانوادگی">
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
                        <a style="font-size:20px" href="" class="item-delete mlg-15" title="حذف"></a>
                        <a style="font-size:20px" href="" class="item-edit " title="ویرایش"></a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

  </div>
</template>
<script>
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
            filterdUsers:users,
            activeCat:'all'
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
        }
    }
  }

</script>