<template>

  <div class="main-content">
     <div class="tab__box">
          <div class="tab__items">
              <router-link exact-active-class="is-active" class="tab__item" to="/panel/slideshow" >لیست اسلاید ها</router-link>
              <router-link exact-active-class="is-active" class="tab__item" to="/panel/slideshow/add" >ایجاد اسلاید جدید</router-link>
              
          </div>
      </div>
    <div class="table__box" v-if="$route.path=='/panel/slideshow'">
      <table class="table">
          <thead role="rowgroup">
            <tr role="row" class="title-row">
              <th class="p-r-90">شناسه</th>
              <th>عنوان</th>
              <th>تصویر</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr role="row" v-for="slide in slides">
              <td>{{slide.id}}</td>
              <td>
                <router-link :to="`/panel/slide/${slide.id}/edit`">{{slide.text}}</router-link>
              </td>
              <td>
                <a href="/">
                  <img class="img__slideshow" :src="slide.image" :alt="slide.text">
                </a>
              </td>
              <td>{{slide.created_at}}</td>
              <td class="slide-action">
                <a 
                  class="item-eye mlg-15"
                  title="وضعیت"
                  @click.prevent="deactive(slide.id)"
                  :class="{'deactive':slide.is_active}"
                >
                </a>
                <a class="item-edit  mlg-15" title="ویرایش" @click="$router.push(`/panel/slideshow/edit/${slide.id}`)"></a>
                <a class="item-delete mlg-15" title="حذف" @click="deleteSlide(slide.id)"></a>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
    <div v-else-if="$route.path=='/panel/slideshow/add'">
     <AddSlide />
    </div>
    <div v-else>
     <EditSlide />
    </div>


  </div>
</template>
<script>
  import Swal from 'sweetalert2'
import axios from 'axios';
import AddSlide from "../components/AddSlide"
import EditSlide from "../components/EditSlide"


  export default {
    name: "SlideShow",
    components:{AddSlide, EditSlide},
    mounted(){
      setTimeout(()=>{
        $('input:file').change(e=>{
          let fileSize = parseInt(e.currentTarget.files[0].size, 10) / 1024;
          fileSize = Math.round(fileSize);
          $('.filesize').addClass('filesize').text('(' + fileSize + 'kb)');
          $('.selectedFiles').text(e.currentTarget.files[0].name).appendTo($('.selectedFiles'));
        });

      },3000);
    },
    data(){
        return{
          title:"",
          file:"",
          slides:[]
      }
    },
    mounted(){
      axios.get("config/slides/list/").then(response=>{
        this.slides = response.data
      })
    },
    methods:{
      deleteSlide(id){
        Swal.fire({
          title: 'آیا از حذف این اسلاید اطمینان دارید؟',
          icon: 'warning',
          confirmButtonText: 'حذف کن',
          confirmButtonColor:"#e74c3c",
          CancelButtonColor:"#95a5a6",
          cancelButtonText:"انصراف",
          confirmButtonText: 'حذف',
          showCancelButton: true,
        }).then(result=>{
          if (result.isConfirmed) {
          axios.delete(`config/slides/${id}/delete/`).then(response=>{
            if(response.status == 204){

              this.slides = this.slides.filter(slide=>slide.id != id)
            }
          })
          }
        });
      
      },
      deactive(id){
        axios.post(`config/slides/${id}/reverse/`).then(response=>{
          this.slides.find(slide=>slide.id == id).is_active = response.data.state;
        })
      },
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