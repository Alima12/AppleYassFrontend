<template>

  <div class="main-content">
     <div class="tab__box">
            <div class="tab__items">
                <a class="tab__item is-active" href="slideshow.html">لیست اسلاید ها</a>
                <a class="tab__item " href="create-slideshow.html">ایجاد اسلاید جدید</a>
            </div>
        </div>
        <div class="table__box">
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
  </div>
</template>
<script>
  export default {
    name: "SlideShow",
    components:{},
    created(){
       
    },
    data(){
        return{
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
      }
    }
  }

</script>