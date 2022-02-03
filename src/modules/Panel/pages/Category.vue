<template>
    <loading 
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      />
  <div class="main-content">
     <div class="row no-gutters  ">
            <div class="col-8 margin-left-10 margin-bottom-15 border-radius-3">
                <p class="box__title">دسته بندی ها</p>
                <div class="table__box">
                    <table class="table">
                        <thead role="rowgroup">
                        <tr role="row" class="title-row">
                            <th>تصویر</th>
                            <th>نام دسته بندی</th>
                            <th>نام انگلیسی دسته بندی</th>
                            <th>دسته پدر</th>
                            <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr role="row"  v-for="category in categories">
                            <td >
                                <img :src="category.image" :alt="category.title" width="90">
                                
                            </td>
                            <td >{{category.title}}</td>
                            <td>{{category.name}}</td>
                            <td v-if="category.parent==null">ندارد</td>
                            <td v-else>{{category.parent.title}}</td>
                            <td>
                                <a href="" class="item-delete mlg-15" @click.prevent="deleteCategory(category)" title="حذف" style="font-size:22px"></a>
                                <a :href="`/category/${category.name}`" target="_blank" class="item-eye mlg-15" style="font-size:22px" title="مشاهده"></a>
                                <a href="" class="item-edit " @click.prevent="editCategory(category)" style="font-size:22px" title="ویرایش"></a>
                            </td>
                        </tr>
                 

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-4 bg-white">
                  <p class="box__title">ایجاد دسته بندی جدید</p>
                  <form @submit.prevent="addCategory()" class="padding-30" id="categoryFonm">
                      <div class="mb-3">
                        <label for="formFile" class="form-label">تصویر</label>
                        <input class="form-control" name="image" type="file" id="ImageFile" @change="setFile()">
                      </div>
                      <input type="text" v-model="title" placeholder="نام دسته بندی" class="text">
                      <input type="text" v-model="name" placeholder="نام انگلیسی دسته بندی" class="text">
                      <p class="box__title margin-bottom-15">انتخاب دسته پدر</p>
                      <select class="select-delay">
                          <option value="-1">ندارد</option>
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
  import Loading from 'vue-loading-overlay';
  import axios from "axios"
  export default {
    name: "Category",
    components:{Loading},
    data(){
      return{
        categories:[
        ],
        filterdCategories:[],
        name:"",
        title:"",
        editedId:-1,
        editMode:false,
        isLoading:true,
        imageChanged:false,
        imageFile:""



      }
    },
    mounted(){
        this.$store.dispatch("getCategory");
        setTimeout(()=>{
            this.categories = this.$store.getters.getCategories
            document.querySelector(".select-delay").className = "set";
        },1000)

        setTimeout(()=>{
            $('select.set').each(function (i, select) {
            if (!$(this).next().hasClass('dropdown-select')) {
                $(this).after('<div class="dropdown-select wide ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
                var dropdown = $(this).next();
                var options = $(select).find('option');
                var selected = $(this).find('option:selected');
                dropdown.find('.current').html(selected.data('display-text') || selected.text());
                options.each(function (j, o) {
                    var display = $(o).data('display-text') || '';
                    dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
                });
            }
        });
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
            this.isLoading = false;
        },1000);
    },

    methods:{
    setFile(){
        let file = document.querySelector(`#ImageFile`);
        this.imageFile = file.files[0];
        this.imageChanged=true;
      },
      async addCategory(){
        this.isLoading = true
        let current = document.querySelector("span.current")
        current = current.innerText || ''
        let owner = await this.categories.find(own=> own.name== current) || ''
        if(this.editMode){
            let formData = new FormData();
            formData.append("name", this.name)
            formData.append("title", this.title)

            if(this.imageChanged){
                formData.append("image", this.imageFile)
            }

            owner ? formData.append("parent_id",owner.id) : null
            axios.put("category/"+this.editedId+"/", formData).then(response=>{
               Swal.fire({
                    title: 'موفق',
                    text:'دسته بندی مورد نظر ویرایش شد',
                    icon:'success',
                    confirmButtonColor:"#27ae60",
                    confirmButtonText: 'متوجه شدم',
                })
            }).catch(err=>{
                console.log(err.response.data)
                Swal.fire({
                    title: 'ناموفق',
                    text:err.response.data,
                    icon:'error',
                    confirmButtonColor:"#27ae60",
                    confirmButtonText: 'متوجه شدم',
                })
            })

        }else{
            let formData = new FormData();
            formData.append("name", this.name);
            formData.append("title", this.title);

            if(this.imageChanged){

                formData.append("image", this.imageFile)
            }
            owner ? formData.append("parent_id",owner.id) : null
            axios.post("category/", formData).then(response=>{
                Swal.fire({
                    title: 'موفق',
                    text:'دسته بندی مورد نظر با موفقیت اضافه شد',
                    icon:'success',
                    confirmButtonColor:"#27ae60",
                    confirmButtonText: 'متوجه شدم',
                })
            }).catch(err=>{
                console.log(err.response.data)
                Swal.fire({
                    title: 'ناموفق',
                    text:err.response.data,
                    icon:'error',
                    confirmButtonColor:"#27ae60",
                    confirmButtonText: 'متوجه شدم',
                })
            })
           
        }
        this.cancelEdit();
        this.isLoading = false
        this.imageChanged = false;
        this.imageFile = "";
        

      },
      editCategory(cat){
        this.editMode = true;
        this.name = cat.name;
        this.title = cat.title;
        this.imageChanged = false;
        this.imageFile = "";

        let current = document.querySelector("span.current")

        current.innerText = cat.owner? cat.owner.name : "ندارد"

        this.editedId = cat.id;

      },
      cancelEdit(){
        this.editMode= false;
        this.editedId = -1;
        this.name = '';
        this.title = '';
        this.imageChanged = false;
        this.imageFile = "";
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
                axios.delete(`category/${cat.id}/`).then(response=>{
                    let deleteItem = this.categories.find(category=> category.id == cat.id)
                    this.categories = this.categories.filter(cat=> cat.id !== deleteItem.id);
                    Swal.fire({
                        title: 'حذف با موفقیت انجام شد',
                        text:'دسته بندی مورد نظر حذف شد',
                        icon:'success',
                        confirmButtonColor:"#27ae60",
                        confirmButtonText: 'متوجه شدم',
                    })
                }).catch(err=>{
                    Swal.fire({
                        title: 'ناموفق',
                        text:'مشکلی به وجود آمده است لطفا دوباره امتحان کنید',
                        icon:'error',
                        confirmButtonColor:"#c23616",
                        confirmButtonText: 'متوجه شدم',
                    })
                })
              
            }
      })
      },

    },
    
  }

</script>