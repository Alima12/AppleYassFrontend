<template>
            <div class="head">
                <div class="name-date">
                    <div class="name">
                        <img :src="comment.owner.images[comment.owner.images.length - 1].image" alt="">
                        <span>{{comment.owner.first_name}} {{comment.owner.last_name}}</span>
                        : 
                    </div>
                    <div class="date">
                        <span>
                            {{setDate(comment.created_at)}}
                        </span>
                    </div>
                </div>
                <div class="like-box">
                    <div class="like">
                        <span>{{comment.likes.length}}</span>
                        <i @click="like(comment)" :class="{'i':comment.likes.includes(user.id)}" class="fa fa-thumbs-up like"></i>
                    </div>
                    <div class="dislike">
                        <span>{{comment.dislikes.length}}</span>
                        <i @click="dislike(comment)" :class="{'i':comment.dislikes.includes(user.id)}" class="fa fa-thumbs-down dislike"></i>
                    </div>
                </div>
            </div>
            <div class="body">
                <p class="comment-text">
                    {{comment.content}} 
                </p>
            </div>
            <div class="comment reply" v-for="reply in comment.reply">
                <div class="head">
                    <div class="name-date">
                        <div class="name">
                            <img :src="reply.owner.images[reply.owner.images.length - 1].image" alt="">
                            <span>{{reply.name}}</span> 
                        </div>
                        <div class="date">
                            <span>{{setDate(reply.created_at)}}</span>
                            <hr>
                        </div>
                    </div>
                    <div class="like-box">
                        <div class="like">
                            <span>{{reply.likes.length}}</span>
                            <i @click="like(reply)" :class="{'i':reply.likes.includes(user.id)}" class="fa fa-thumbs-up like"></i>
                        </div>
                        <div class="dislike">
                            <span>{{reply.dislikes.length}}</span>
                            <i @click="dislike(reply)" :class="{'i':reply.dislikes.includes(user.id)}" class="fa fa-thumbs-down dislike"></i>
                        </div>
                    </div>
                </div>
                <div class="body">
                    <p class="comment-text">{{reply.content}}</p>
                </div>
           <div class="comment reply" v-for="rep in reply.reply">

                <div class="head">
                    <div class="name-date">
                        <div class="name">
                            <img :src="rep.owner.images[rep.owner.images.length - 1].image" alt="">
                            <span>{{rep.name}}</span> 
                        </div>
                        <div class="date">
                            <span>{{setDate(rep.created_at)}}</span>
                            <hr>
                        </div>
                    </div>
                    <div class="like-box">
                        <div class="like">
                            <span>{{rep.likes.length}}</span>
                            <i @click="like(rep)" :class="{'i':rep.likes.includes(user.id)}" class="fa fa-thumbs-up like"></i>
                        </div>
                        <div class="dislike">
                            <span>{{rep.dislikes.length}}</span>
                            <i @click="dislike(rep)" :class="{'i':rep.dislikes.includes(user.id)}" class="fa fa-thumbs-down dislike"></i>
                        </div>
                    </div>
                </div>
                <div class="body">
                    <p class="comment-text">{{rep.content}}</p>
                </div>
                
            </div>


            </div>
    
</template>
<script>
import axios from 'axios'
    export default {
        name: "Comment",
        props:["comment", "code"],
        data(){
            return {
                user:this.$store.getters.getMe
            }
        },
        methods:{
            like(inst){
                let data = new FormData()
                data.append("comment", inst.id)
                axios.post(`comments/${this.code}/like/`, data).then(response=>{
                    inst.likes = response.data.likes;
                    inst.dislikes = response.data.dislikes;

                })
            },
            dislike(inst){
                let data = new FormData()
                data.append("comment",  inst.id)
                axios.post(`comments/${this.code}/dislike/`, data).then(response=>{
                    inst.likes = response.data.likes;
                    inst.dislikes = response.data.dislikes;
                })
            },
            setDate(time){
                let date = new Date(time)
                let now = new Date()
                let remain = Math.floor((date - now) /1000);
                remain = Math.abs(remain)
                let hour = Math.floor(remain/3600);
                let days =Math.floor(hour / 24);
                if(days>0){
                    days += " روز و ";
                }else{
                    days=""
                }

                hour = Math.floor(hour % 24);
                
                if(hour>0){
                    hour += " ساعت پیش";
                }else{
                    hour="چند لحظه پیش"
                }
                let response = `${days}  ${hour}`
                return response

            }
        }
    }
</script>

 