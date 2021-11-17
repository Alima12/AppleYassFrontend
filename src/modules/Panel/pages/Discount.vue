<template>

  <div class="main-content">
     <div class="row no-gutters  ">
            <div class="col-8 margin-left-10 margin-bottom-15 border-radius-3">
                <p class="box__title">تخفیفات</p>
                <div class="table__box">
                    <table class="table">
                        <thead role="rowgroup">
                        <tr role="row" class="title-row">
                            <th>کد تخفیف</th>
                            <th>عنوان</th>
                            <th>درصد</th>
                            <th>تا سقف</th>
                            <th>زمان باقی مانده</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr role="row" class="" v-for="disc in Discounts">
                            <td>{{disc.code}}</td>
                            <td>{{disc.title}}</td>
                            <td>{{disc.percent}}</td>
                            <td>{{disc.maxValue.toLocaleString()}} تومان </td>
                            <td>{{disc.ActiveTill}}</td>
                            <td>
                              <i class="fa fa-check-circle fa-2x text-success" v-if="disc.status"></i>
                              <i class="fa fa-times-circle fa-2x text-danger" v-else></i>
                            </td>
                            <td>
                                <a href="" class="item-delete mlg-15" @click.prevent="" title="حذف" style="font-size:22px"></a>
                                <a href="" class="item-edit " @click.prevent="" style="font-size:22px" title="ویرایش"></a>
                            </td>
                        </tr>
                 

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-4 bg-white">
                  <p class="box__title">ایجاد کد تخفیف</p>
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
          Discounts:[
            {code:"Norouz",percent:60,maxValue:300000,title:"به مناسب عید نوروز",ActiveTill:"2022-02-02 18:50:30",status:true},
            {code:"Ghorban",percent:20,maxValue:30000,title:"به مناسب عید قربان",ActiveTill:"2022-02-02 18:50:30",status:false},
            {code:"NewIphone",percent:30,maxValue:350000,title:"به مناسب عید نوروز",ActiveTill:"2022-02-02 18:50:30",status:false},
            {code:"Mohammad",percent:20,maxValue:10000,title:"هدیه ای به محمد",ActiveTill:"2022-02-02 18:50:30",status:true},
            {code:"AmirAli",percent:40,maxValue:60000,title:"هدیه ای به امیرعلی",ActiveTill:"2022-02-02 18:50:30",status:false},
            {code:"Maryam",percent:90,maxValue:3000000,title:"هدیه ای به مریم",ActiveTill:"2022-02-02 18:50:30",status:true},

          ]
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
      

    },
    
  }

</script>