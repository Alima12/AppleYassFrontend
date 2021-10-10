<template>
    <h4 class="comments-title">
        <span>
            نظرات کاربران
        </span>
    </h4>
    <section class="comments">
        <div class="comment" v-for="comment in commentList">
            <div class="head">
                <div class="name-date">
                    <div class="name">
                        <img :src="comment.image" alt="">
                        <span>{{comment.name}}</span> 
                    </div>
                    <div class="date">
                        <span>{{comment.date}}</span>
                    </div>
                </div>
                <div class="like-box">
                    <div class="like">
                        <span>{{comment.likes}}</span>
                        <i class="fa fa-thumbs-up like"></i>
                    </div>
                    <div class="dislike">
                        <span>{{comment.dislikes}}</span>
                        <i class="fa fa-thumbs-down dislike"></i>
                    </div>
                </div>
            </div>
            <div class="body">
                <p class="comment-text">{{comment.content}}</p>
            </div>
            <div class="comment reply" v-for="reply in comment.reply">
                <div class="head">
                    <div class="name-date">
                        <div class="name">
                            <img :src="reply.image" alt="">
                            <span>{{reply.name}}</span> 
                        </div>
                        <div class="date">
                            <span>{{reply.date}}</span>
                        </div>
                    </div>
                    <div class="like-box">
                        <div class="like">
                            <span>{{reply.likes}}</span>
                            <i class="fa fa-thumbs-up like"></i>
                        </div>
                        <div class="dislike">
                            <span>{{reply.dislikes}}</span>
                            <i class="fa fa-thumbs-down dislike"></i>
                        </div>
                    </div>
                </div>
                <div class="body">
                    <p class="comment-text">{{reply.content}}</p>
                </div>
            </div>
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
        <form class="form">
            <div class="name my-1 p-2">
                <label for="username" class="mb-1" style="color:#444">نام شما:</label>
                <input type="text" class="form-control" name="username"/>
            </div>
            <div class="coment-content my-1 p-2">
                <label for="commentcontent" class="mb-1" style="color:#444">نظر:</label>
                <textarea name="commentcontent" class="form-control" cols="30" rows="10"></textarea>

            </div>
            <div class="submitbtn mt-1 p-2">
                <button class="btn btn-success p-1 float-end">ارسال</button>
            </div>
        </form>
    </div>
   
    
</template>
<script>
  export default {
    name: "Comments",
    props:["commentList"]
    
  }
</script>

<style>
.send-comment h5{
    padding: 20px 0px;
    color:#333;
}

</style>
