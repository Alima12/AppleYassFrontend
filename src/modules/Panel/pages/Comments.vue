<template>
  <div class="main-content">
    <div class="tab__box">
        <div class="tab__items">
          <router-link to="/panel/users/new" exact-active-class="is-active" class="tab__item"></router-link>
        </div>
    </div>
    <div class="Comments-list">
        <div class="table__box">
            <table class="table">
                <thead role="rowgroup">
                <tr role="row" class="title-row">
                    <th>کاربر</th>
                    <th>ایمیل کاربر</th>
                    <th>متن</th>
                    <th>صفحه</th>
                    <th>تاریخ</th>
                    <th>وضعیت</th>
                    <th>عملیات</th>
                </tr>
                </thead>
                <tbody>
                <tr role="row" class="fw-bold" v-for="comment in Comments">
                    <td>{{comment.owner.fullname}}</td>
                    <td>{{comment.owner.email}}</td>
                    <td>{{comment.content}}</td>
                    <td>
                      <a class="btn btn-primary fw-bold" :href="`/product/${comment.product.code}`" target="_blank" rel="noopener noreferrer">
                        <i class="fa fa-eye text-white"></i>
                      </a>
                    </td>
                    <td>{{comment.date}}</td>
                    <td>
                        <span v-if="comment.status == 'a' " class="text-success">تایید شده</span>
                        <span v-else-if="comment.status == 'd' " class="text-primary">در حال بررسی</span>
                        <span v-else class="text-error">رد شده</span>
                    </td>
                    <td>
                        <div v-if="comment.status == `d`">
                          <button class="btn btn-outline-success m-1" @click="acceptComment(comment.id)">
                           <i class="fa fa-check"></i>
                          </button>
                          <button class="btn btn-outline-danger" @click="rejectComment(comment.id)">
                           <i class="fa fa-times"></i>
                          </button>
                        </div>
                         <div v-else>
                          <button class="btn btn-outline-danger m-1" @click="deleteComment(comment.id)">
                           <i class="fa fa-trash " style="font-size:22px"></i>
                          </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
  
  </div>

</template>

<script>
  import Swal from 'sweetalert2'

  export default {
    name: "Comments",
    components:{},
    data(){

        return{
           
           Comments:[
             {id:0,owner:{fullname:"علی مهدوی",email:"aliali.ali1378@yahoo.com"},content:"از خرید این محصول راضی هستم",product:{code:"432435j"},date:"1400-09-02 22:35:40",status:"a"},
             {id:1,owner:{fullname:"محسن ی",email:"aliali.ali1378@yahoo.com"},content:"از خرید این محصول راضی هستم",product:{code:"2a21bA"},date:"1400-09-02 22:35:40",status:"d"},
             {id:2,owner:{fullname:"وحید امیری",email:"aliali.ali1378@yahoo.com"},content:"از خرید این محصول راضی هستم",product:{code:"432435j"},date:"1400-09-02 22:35:40",status:"d"},
             {id:3,owner:{fullname:"مهدی ترابی",email:"aliali.ali1378@yahoo.com"},content:"از خرید این محصول ناراضی هستم",product:{code:"5Sab4u"},date:"1400-09-02 22:35:40",status:"r"},
             {id:4,owner:{fullname:"محسن نامجو",email:"aliali.ali1378@yahoo.com"},content:"از خرید این محصول راضی هستم",product:{code:"2a21bA"},date:"1400-09-02 22:35:40",status:"d"}
           
           ]
        }
    },
    methods:{
      deleteComment(id){
        this.Comments = this.Comments.filter(c=> c.id != id);
      },
      acceptComment(id){
        let comment = this.Comments.find(c=> c.id == id);
        comment.status = "a"
      },
      rejectComment(id){
        let comment = this.Comments.find(c=> c.id == id);
        comment.status = ""

      },


      
    }
  }

</script>