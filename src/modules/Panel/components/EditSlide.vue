<template>
    <p class="box__title">ویرایش اسلاید شماره {{id}}</p>
    <div class="row no-gutters bg-white">
        <div class="col-12">
            <form action="" class="padding-30" @submit.prevent="editSlide()">
                <input type="text" class="text" placeholder="عنوان اسلاید" v-model="title">
                <div class="file-upload">
                    <div class="i-file-upload">
                        <span>آپلود تصویر</span>
                        <input v-on:change="setFile()" id="slide-file" type="file" class="file-upload" name="files" />
                    </div>
                    <span class="filesize"></span>
                    <span class="selectedFiles">فایلی انتخاب نشده است</span>
                </div>

                <button class="btn btn-my-styles">ذخیره</button>
            </form>
        </div>
    </div>


</template>
<script>
import Swal from 'sweetalert2'
import axios from 'axios';

  export default {
    name: "EditSlide",
    components:{},
    mounted(){
      setTimeout(()=>{
        $('input:file').change(e=>{
          let fileSize = parseInt(e.currentTarget.files[0].size, 10) / 1024;
          fileSize = Math.round(fileSize);
          $('.filesize').addClass('filesize').text('(' + fileSize + 'kb)');
          $('.selectedFiles').text(e.currentTarget.files[0].name).appendTo($('.selectedFiles'));
        });

      }, 2000);
      this.id = this.$route.params.id;
      axios.get(`config/slides/${this.id}/edit/`).then(response=>{
          let data = response.data;
          this.title = data.text;
      })

    },
    data(){
        return{
          title:"",
          file:"",
          id:""
      }
    },
    methods:{
      setFile(){
        let slideFile = document.querySelector("#slide-file")
        this.file = slideFile.files[0] || null
      },
      editSlide(){
        let data = new FormData()
        data.append("text", this.title)
        if(this.file != null){
            data.append("image", this.file)
        }
        axios.put(`config/slides/${this.id}/edit/`, data).then(response=>{
          if(response.status == 200){
            this.$router.push("/panel/slideshow/")
          }
        })
      },

    }
  }

</script>