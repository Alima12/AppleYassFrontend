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
              <td>{{slide.index}}</td>
              <td>
                <router-link :to="`/panel/slide/${slide.index}/edit`">{{slide.text}}</router-link>
              </td>
              <td>
                <a href="">
                  <img class="img__slideshow" :src="slide.image" :alt="slide.text">
                </a>
              </td>
              <td>1399/11/11</td>
              <td class="slide-action">
                <a 
                  class="item-eye mlg-15"
                  title="وضعیت"
                  @click.prevent="deactive(slide.index)"
                  :class="{'deactive':slide.isActive}"
                >
                </a>
                <a href="" class="item-edit  mlg-15" title="ویرایش"></a>
                <a href="" class="item-delete mlg-15" title="حذف"></a>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
    <div v-else>
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
    </div>

  </div>
</template>
<script>
  import Swal from 'sweetalert2'

  export default {
    name: "SlideShow",
    components:{},
    mounted(){
      setTimeout(()=>{
        $('input:file').change(e=>{
          let fileSize = parseInt(e.currentTarget.files[0].size, 10) / 1024;
          fileSize = Math.round(fileSize);
          $('.filesize').addClass('filesize').text('(' + fileSize + 'kb)');
          $('.selectedFiles').text(e.currentTarget.files[0].name).appendTo($('.selectedFiles'));
        });

      },1000);
    },
    data(){
        return{
          title:"",
          file:"",
          slides:[
              {
                index:1 ,
                image:"https://photos5.appleinsider.com/gallery/43148-83800-210713-iPhone12-xl.jpg",
                text:"اپل یاس ",
                isActive:true,
              },
              {
                index:2 ,
                image:"https://9to5mac.com/wp-content/uploads/sites/6/2021/04/big-display-imac.jpg",
                text:"اپل یاس ",
                isActive:true,
              },
              {
                index:3 ,
                image:"https://cdn.mos.cms.futurecdn.net/LjqKgNBc8TCXke3CNekJgA.jpg",
                text:"اپل یاس ",
                isActive:true,
              }
        
        ]
      }
    },
    methods:{
      deactive(index){
        this.slides.find(slide=>slide.index == index).isActive = !this.slides.find(slide=>slide.index == index).isActive
      },
      addSlide(){
        let data = new FormData()
        data.append("title",this.title)
        data.append("file",this.file)
        Swal.fire({
          title: 'موفق',
                text:'اسلاید با موفقیت اضافه شد',
                icon:'success',
                confirmButtonColor:"#27ae60",
                confirmButtonText: 'باشه!',
        }).then((e)=>{
          // sendRequestToServer();
          this.$router.push("/panel/slideshow");
          this.title = "";
          this.file = "";
        })
        
      },
      setFile(){
        let slideFile = document.querySelector("#slide-file")
        this.file = slideFile.files[0]
      }
    }
  }

</script>