<template>
    <p class="box__title">ایجاد اسلاید جدید</p>
    <div class="row no-gutters bg-white">
            <div class="col-12">
            <form action="" class="padding-30" @submit.prevent="addSlide()">
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
    name: "AddSlide",
    components:{},
    mounted(){
      setTimeout(()=>{
        $('input:file').change(e=>{
          let fileSize = parseInt(e.currentTarget.files[0].size, 10) / 1024;
          fileSize = Math.round(fileSize);
          $('.filesize').addClass('filesize').text('(' + fileSize + 'kb)');
          $('.selectedFiles').text(e.currentTarget.files[0].name).appendTo($('.selectedFiles'));
        });

      },2000);
    },
    data(){
        return{
          title:"",
          file:"",
      }
    },
    methods:{
      addSlide(){
        let data = new FormData()
        data.append("text",this.title)
        data.append("image",this.file)
        axios.post("config/slides/list/", data).then(response=>{
          Swal.fire({
            title: 'موفق',
                  text:'اسلاید با موفقیت اضافه شد',
                  icon:'success',
                  confirmButtonColor:"#27ae60",
                  confirmButtonText: 'باشه!',
          }).then((e)=>{
            
            this.$router.push("/panel/slideshow");
            this.title = "";
            this.file = "";
          })
        })
        
        
      },
      setFile(){
        let slideFile = document.querySelector("#slide-file")
        this.file = slideFile.files[0]
      },

    }
  }

</script>