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
                    <td v-if="comment.owner != null">
                      {{comment.owner.first_name}} {{comment.owner.last_name}}
                    </td>
                    <td v-else>
                      ناشناس
                    </td>
                    <td v-if="comment.owner != null">
                      {{comment.owner.email}}
                    </td>
                     <td v-else>
                      ناشناس
                    </td>
                    <td>{{comment.content}}</td>
                    <td>
                      <a class="btn btn-primary fw-bold" :href="`/product/${comment.product.code}`" target="_blank" rel="noopener noreferrer">
                        <i class="fa fa-eye text-white"></i>
                      </a>
                    </td>
                    <td>{{comment.created_at}}</td>
                    <td>
                        <span v-if="comment.status == 'a' " class="text-success">تایید شده</span>
                        <span v-else-if="comment.status == 'w' " class="text-primary">در حال بررسی</span>
                        <span v-else class="text-error">رد شده</span>
                    </td>
                    <td>
                        <div v-if="comment.status == `w`">
                          <button class="btn btn-outline-success m-1" @click="acceptComment(comment)">
                           <i class="fa fa-check"></i>
                          </button>
                          <button class="btn btn-outline-danger" @click="rejectComment(comment)">
                           <i class="fa fa-times"></i>
                          </button>
                        </div>
                         <div v-else>
                          <button class="btn btn-outline-danger m-1" @click="deleteComment(comment)">
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
      <loading 
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
      />
</template>

<script>
  import Swal from 'sweetalert2'
import axios from 'axios';
  import Loading from 'vue-loading-overlay';

  export default {
    name: "Comments",
    components:{Loading},
    data(){

        return{
           
           Comments:[],
           isLoading:true
        }
    },
    methods:{
      setAlert(message, type){
        this.$toast.open({
            message:message,
            type:type,
            duration:5000,
            position: 'top'

        })
      },
      deleteComment(comment){
        Swal.fire({
          title: 'آیا از حذف این نظر اطمینان دارید؟',
          html: `<p class="text-danger">آیا از حذف کامنت زیر اطمینان دارید؟</p>
          <p class="fw-bold">${comment.content}</p>`,
          icon: 'warning',
          confirmButtonText: 'حذف کن',
          confirmButtonColor:"#e74c3c",
          CancelButtonColor:"#95a5a6",
          cancelButtonText:"انصراف",
          confirmButtonText: 'حذف',
          showCancelButton: true,
        }).then(result=>{
          if (result.isConfirmed) {
          axios.delete(`comments/${comment.id}/delete/`).then(response=>{
            this.setAlert("کامنت مورد نظر با موفقیت حذف شد", "error")
            this.Comments = this.Comments.filter(c=> c.id != comment.id);
          })
          }
        });
        
      },
      acceptComment(comment){
        axios.post(`comments/${comment.id}/accept/`).then(response=>{
          comment = response.data;
          comment.status = "a"
          this.setAlert("کامنت با موفقیت تایید شد", "success")

        })
      },
      rejectComment(comment){
        axios.post(`comments/${comment.id}/reject/`).then(response=>{
          this.setAlert("کامنت مورد نظر رد شد", "error")
          comment.status = "r"
        })

      },


      
    },
    mounted(){
      axios.get("comments/").then(response=>{
        this.Comments = response.data;
        console.log(this.Comments)
        this.isLoading = false;
      })
    },

  }

</script>