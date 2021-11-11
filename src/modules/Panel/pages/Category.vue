<template>

  <div class="main-content">
     <div class="row no-gutters  ">
            <div class="col-8 margin-left-10 margin-bottom-15 border-radius-3">
                <p class="box__title">دسته بندی ها</p>
                <div class="table__box">
                    <table class="table">
                        <thead role="rowgroup">
                        <tr role="row" class="title-row">
                            <th>نام دسته بندی</th>
                            <th>نام انگلیسی دسته بندی</th>
                            <th>دسته پدر</th>
                            <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr role="row" class="" v-for="category in categories">
                            <td><a href="">{{category.title}}</a></td>
                            <td>{{category.name}}</td>
                            <td v-if="category.owner=={}">ندارد</td>
                            <td v-else>{{category.owner.title}}</td>
                            <td>
                                <a href="" class="item-delete mlg-15" @click.prevent="deleteCategory(category)" title="حذف" style="font-size:22px"></a>
                                <a :href="`/category/${category.href}`" target="_blank" class="item-eye mlg-15" style="font-size:22px" title="مشاهده"></a>
                                <a href="" class="item-edit " @click.prevent="editCategory(category)" style="font-size:22px" title="ویرایش"></a>
                            </td>
                        </tr>
                 

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-4 bg-white">
                  <p class="box__title">ایجاد دسته بندی جدید</p>
                  <form @submit.prevent="addCategory()" class="padding-30">
                      <input type="text" v-model="name" placeholder="نام دسته بندی" class="text">
                      <input type="text" v-model="title" placeholder="نام انگلیسی دسته بندی" class="text">
                      <p class="box__title margin-bottom-15">انتخاب دسته پدر</p>
                      <select>
                          <option v-for="category in categories" :value="category.id">
                            {{category.name}}
                          </option>
                      </select>
                      <button class="btn btn-success" v-if="editMode">ذخیره</button>
                      <button class="btn btn-my-styles" v-else>اضافه کردن</button>
                      <button class="btn btn-danger mx-1" v-if="editMode" @click="cancelEdit()">انصراف</button>

                  </form>
            </div>
        </div>
  </div>
</template>
<script>
  import Swal from 'sweetalert2'
  export default {
    name: "Category",
    components:{},
    data(){
      return{
        categories:[
          {id:0,href:"apple",name:"Apple",title:"محصولات اپل",owner:{}},
          {id:1,href:"iphone",name:"Iphone",title:"گوشی موبایل",owner:{id:0,name:"Apple",title:"محصولات اپل",owner:{}}},
          {id:2,href:"ipad",name:"Ipad",title:"تبلت",owner:{id:0,name:"Apple",title:"محصولات اپل",owner:{}}},
          {id:3,href:"ipod",name:"Ipod",title:"تبلت",owner:{id:0,name:"Apple",title:"محصولات اپل",owner:{}}},
          {id:4,href:"iwatch",name:"Iwatch",title:"ساعت هوشمند",owner:{id:0,name:"Apple",title:"محصولات اپل",owner:{}}},
          {id:5,href:"airpod",name:"Airpod",title:"هندزفری",owner:{id:0,name:"Apple",title:"محصولات اپل",owner:{}}},
        ],
        filterdCategories:[],
        name:"",
        title:"",
        editedId:-1,
        editMode:false,


      }
    },
    mounted(){
      $(document).on('click', '.dropdown-select', function (event) {
          if ($(event.target).hasClass('dd-searchbox')) {
              return;
          }
          $('.dropdown-select').not($(this)).removeClass('open');
          $(this).toggleClass('open');
          if ($(this).hasClass('open')) {
              $(this).find('.option').attr('tabindex', 0);
              $(this).find('.selected').focus();
          } else {
              $(this).find('.option').removeAttr('tabindex');
              $(this).focus();
          }
      });
      $(document).on('click', function (event) {
          if ($(event.target).closest('.dropdown-select').length === 0) {
              $('.dropdown-select').removeClass('open');
              $('.dropdown-select .option').removeAttr('tabindex');
          }
          event.stopPropagation();
      });
      $(document).on('click', '.dropdown-select .option', function (event) {
          $(this).closest('.list').find('.selected').removeClass('selected');
          $(this).addClass('selected');
          var text = $(this).data('display-text') || $(this).text();
          $(this).closest('.dropdown-select').find('.current').text(text);
          $(this).closest('.dropdown-select').prev('select').val($(this).data('value')).trigger('change');
      });

      $(document).on('keydown', '.dropdown-select', function (event) {
          var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
          if (event.keyCode == 13) {
              if ($(this).hasClass('open')) {
                  focused_option.trigger('click');
              } else {
                  $(this).trigger('click');
              }
              return false;
              // Down
          } else if (event.keyCode == 40) {
              if (!$(this).hasClass('open')) {
                  $(this).trigger('click');
              } else {
                  focused_option.next().focus();
              }
              return false;
              // Up
          } else if (event.keyCode == 38) {
              if (!$(this).hasClass('open')) {
                  $(this).trigger('click');
              } else {
                  var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
                  focused_option.prev().focus();
              }
              return false;
              // Esc
          } else if (event.keyCode == 27) {
              if ($(this).hasClass('open')) {
                  $(this).trigger('click');
              }
              return false;
          }
      });
    },

    methods:{
      addCategory(){
        let current = document.querySelector("span.current")
        current = current.innerText || ''
        let owner = this.categories.find(own=> own.name== current) || ''
        if(this.editMode){
            let t = this.categories.find(cat=> cat.id == this.editedId);
            t.name = this.name;
            t.title = this.title;
            t.owner= owner
             Swal.fire({
                title: 'موفق',
                text:'دسته بندی مورد نظر ویرایش شد',
                icon:'success',
                confirmButtonColor:"#27ae60",
                confirmButtonText: 'متوجه شدم',
            })
        }else{
            this.categories.push(        {
                id:this.categories.length,
                name:this.name,
                title:this.title,
                owner:owner,
            })
            Swal.fire({
                    title: 'موفق',
                    text:'دسته بندی مورد نظر با موفقیت اضافه شد',
                    icon:'success',
                    confirmButtonColor:"#27ae60",
                    confirmButtonText: 'متوجه شدم',

            })
           
        }
        this.cancelEdit();
        

      },
      editCategory(cat){
        this.name = cat.name;
        this.title = cat.title;
        let current = document.querySelector("span.current")
        current.innerText = cat.owner.name
        this.editedId = cat.id;
        this.editMode = true;
      },
      cancelEdit(){
        this.editMode= false;
        this.editedId = -1;
        this.name = '';
        this.title = '';
        let current = document.querySelector("span.current")
        current.innerText = "";
      },
      deleteCategory(cat){
        Swal.fire({
        title: 'حذف دسته',
        text: `با حذف کردن این دسته تمامی محصولات موجود در این دسته از دسته بندی ها خارج میشوند`,
        icon: 'error',
        confirmButtonColor:"#e74c3c",
        CancelButtonColor:"#95a5a6",
        cancelButtonText:"انصراف",
        confirmButtonText: 'حذف',
        showCancelButton: true,

      }).then((result) => {
            if (result.isConfirmed) {
                let deleteItem = this.categories.find(category=> category.id == cat.id)
                this.categories = this.categories.filter(cat=> cat.id !== deleteItem.id);
                Swal.fire({
                    title: 'حذف با موفقیت انجام شد',
                    text:'دسته بندی مورد نظر حذف شد',
                    icon:'success',
                    confirmButtonColor:"#27ae60",
                    confirmButtonText: 'متوجه شدم',
                })
            }
      })
      },

    },
    
  }

</script>