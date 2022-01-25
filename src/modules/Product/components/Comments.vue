<template>
    <h4 class="comments-title">
        <span>
            نظرات کاربران
        </span>
    </h4>
    <section class="comments">
        <div class="comment" v-for="comment in commentList">
            <Comment :comment="comment" :code="code" />
        </div>
        <div v-if="commentList.length< 1">
            کامنتی وجود ندارد
        </div>

    
    </section>
    <div class="col-10 mx-auto">
        <hr />
    </div>
    <div class="col-8 mx-auto p-2 send-comment">
        
        <h5 class="text-center">
            ارسال نظر
        </h5>
        <form class="form" @submit.prevent="sendComment">
            <div class="coment-content my-1 p-2">
                <label for="commentcontent" class="mb-1" style="color:#444">نظر:</label>
                <textarea v-model="comment.content" name="commentcontent" class="form-control" cols="30" rows="10"></textarea>

            </div>
            <div class="submitbtn mt-1 p-2">
                <button class="btn btn-outline-success p-3 float-end">ارسال</button>
            </div>
            
        </form>
    </div>
    <loading 
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
      />
    
</template>
<script>
    import Comment from "./Comment"
    import axios from 'axios'
    import Loading from 'vue-loading-overlay';

  export default {
    name: "Comments",
    props:["code"],
    components:{
        Comment,
        loading:Loading

    },
    data(){
        return{
            commentList:[],
            fullPage:true,
            isLoading:true,
            comment:{
                content:""
            }
           
        }
    },
    async created(){
        setTimeout(()=>{
            axios.get(`comments/${this.code}/`).then(response=>{
                let temp = response.data;
                this.commentList = [...temp]

                this.commentList.forEach(comment=>{
                    comment.reply = []
                })
                let primary = []
                temp.forEach(comment=>{
                    
                    if(comment.parent != null){
                        this.commentList.find(com=> com.id == comment.parent).reply.push(comment)
                        primary.push(comment.id)
                    }
                })
                primary.forEach(id=>{
                    this.commentList = this.commentList.filter(comment=> comment.id != id)
                })
                this.isLoading = false;
            })
        },2000)
        

    },
    methods:{
        setAlert(message, type){
            this.$toast.open({
                message:message,
                type:type,
                duration:5000,
                position: 'bottom'

            })
        },
        sendComment(){
            this.isLoading = true;
            if(this.comment.content != ""){
                let data = new FormData()
                data.append("content", this.comment.content)
                axios.post(`comments/add/${this.code}/`, data).then(response=>{
                    if(response.status==201){

                        this.isLoading=false;
                        window.scrollTo({top:0, behavior:"smooth"})
                        this.comment.content = "";
                        this.setAlert("نظر شما با موفقیت ثبت شد و پس از تایید مدیر سایت نمایش داده خواهد شد.", "success")
                       
                    }
                })
            }else{
                this.setAlert("فیلد بالا نمیتوند خالی باشد", "error")
                this.isLoading=false;
            }

        }
    }
  }
</script>

<style>
.send-comment h5{
    padding: 20px 0px;
    color:#333;
}

</style>
