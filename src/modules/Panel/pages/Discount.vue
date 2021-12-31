<template>

  <div class="main-content">
     <div class="row no-gutters  ">
            <div class="col-12 margin-left-10 margin-bottom-15 border-radius-3">
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
                            <th>استفاده چندباره</th>

                            <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr role="row" class="" v-for="disc in Discounts">
                            <td>{{disc.code}}</td>
                            <td>{{disc.title}}</td>
                            <td>{{disc.percent}}%</td>
                            <td>{{disc.max_price.toLocaleString()}} تومان </td>
                            <td>{{disc.ActiveTill}}</td>
                            <td>
                              <i class="fa fa-check-circle fa-2x text-success" v-if="disc.is_active"></i>
                              <i class="fa fa-times-circle fa-2x text-danger" v-else></i>
                            </td>
                            <td>
                              <i class="fa fa-check-circle fa-2x text-success" v-if="disc.reUseAble"></i>
                              <i class="fa fa-times-circle fa-2x text-danger" v-else></i>
                            </td>
                            <td>
                                <a href="" class="item-delete mlg-15" @click.prevent="deleteDiscount(disc)" title="حذف" style="font-size:22px"></a>
                                <a href="" class="item-edit " @click.prevent="editDiscount(disc)" style="font-size:22px" title="ویرایش"></a>
                            </td>
                        </tr>
                 

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-12 mt-2">
              <p class="box__title" v-if="editMode">ویرایش تخفیف</p>
              <p class="box__title" v-else>افزودن تخفیف جدید</p>

              <form method="post" class="needs-validation" novalidate @submit.prevent="saveProdcut()">

                <div class="row p-1">
                  <div class="col-lg-10 col-md-9 col-sm-7">  
                    <label for="code" class="mb-2">کد تخفیف  :</label>
                    <input name="code" id="code" v-model="discount.code"
                      type="text"
                      class="text font-size-13 form-control"
                      :class="{'is-invalid':errors.code.is_valid==false,'is-valid':errors.code.is_valid == true}"
                      placeholder="کد تخفیف"
                      required
                    />
                      <div class="invalid-feedback">
                        {{errors.code.msg}}
                      </div>
                  </div>


                  <div class="col-lg-2 col-md-3 col-sm-5 d-flex align-items-center justify-content-end">  
                    <button to="/panel" class="btn btn-success" @click.prevent="generateCode()">ساختن</button>
                  </div>
                </div>


                <div class="row p-1">
                  <div class="col-lg-12 col-md-12 col-sm-12">  
                    <label for="name" class="mb-2">عنوان کد تخفیف:</label>
                    <input  name="name" v-model="discount.title" type="text" class="text font-size-13 form-control" placeholder="عنوان"
                    :class="{'is-invalid':errors.title.is_valid==false,'is-valid':errors.title.is_valid == true}"
                    />
                      <div class="invalid-feedback">
                        {{errors.title.msg}}
                      </div>
                  </div>
                </div>

                <div class="row p-1">
                  <div class="col-lg-12 col-md-12 col-sm-12">  
                    <label for="name" class="mb-2">درصد:</label>
                    <input  name="name" v-model="discount.percent" type="number" max="99"
                    min="1" class="text font-size-13 form-control" placeholder="درصد تخفیف"
                    :class="{'is-invalid':errors.percent.is_valid==false,'is-valid':errors.percent.is_valid == true}"
                    
                    />
                    <div class="invalid-feedback">
                        {{errors.percent.msg}}
                      </div>
                  </div>
                </div>

                <div class="row p-1">
                  <div class="col-lg-12 col-md-12 col-sm-12">  
                    <label for="name" class="mb-2">سقف استفاده از کد به تومان:</label>
                    <input  name="name" v-model="discount.max_price" type="text" class="text font-size-13 form-control" 
                    placeholder="سقف"
                    :class="{'is-invalid':errors.max_price.is_valid==false,'is-valid':errors.max_price.is_valid == true}"
                    />
                    <small class="text-reset fw-light">اگر میخواهید محدودیتی نداشته باشد آن را 0 بگذارید</small>
                     <div class="invalid-feedback">
                        {{errors.max_price.msg}}
                      </div>
                  </div>
                </div>

                <div class="row p-1 mt-3">
                  <div class="col-lg-12 col-md-12 col-sm-12">  
                    <label for="name" class="m-2">اعتبار تا:</label>
                      <custom-date-picker v-model="period"></custom-date-picker>
                  </div>
                  {{period}}
                </div>

                <div class="row p-1">
                  <div class="col-lg-12 col-md-12 col-sm-12 notification__box re-use">  
                    <p class="title__noti">قابلیت استفاده چندباره</p>
                    <div class="notificationGroup">
                        <input id="option2" v-model="discount.reUseAble" name="option2" type="checkbox"/>
                        <label for="option2" v-if="discount.reUseAble">فعال</label>
                        <label for="option2" v-else>غیر فعال</label>
                    </div>
                  </div>
                </div>


               <div class="row p-1">
                  <div class="col-lg-12 col-md-12 col-sm-12">  
                    <label for="name" class="mb-2">استفاده فقط توسط:</label>
                    <div v-for="user in discount.specialUser">
                      <input  name="name" v-model="user.email" type="text" class="text font-size-13" placeholder="ایمیل کاربر">
                    </div>
                    <div class="col-12 mt-2">
                      <button class="btn btn-outline-success" @click.prevent="addUserSpecial()">
                        <i class="fa fa-plus-circle fa-2x">
                        </i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="my-3 p-2">
                  <p class="alert alert-danger p-3 text-center" v-if="thereIsError==true">
                    لطفا ارور ها را برطرف کنید
                  </p>
                </div>

                <div class="row p-1 my-3">
                  <div class="col-lg-4 col-md-8 col-sm-12 mx-auto p-2">
                    <button class="w-100 btn btn-primary p-3">
                      <span>
                        ذخیره
                      </span>
                    </button>
                  </div>
                </div>



              </form>
            </div>
            
        </div>
  </div>
      <loading 
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
      />
</template>
<script>
  import Swal from 'sweetalert2'
  import DatePicker from 'vue3-persian-datetime-picker'
  import Loading from 'vue-loading-overlay';

import axios from 'axios'
  export default {
    name: "Category",
    components:{DatePicker,loading:Loading},
    data(){
      return{
          Discounts:[

          ],
          discount:{
            specialUser:[
            
            ]
          },
          editMode:false,
          isLoading: true,
          fullPage: false,
          period:"",
          errors:{
            code:{msg:"کد تخفیف باید حتما وارد شود و از حروف و اعداد انگلیسی استفاده شود", is_valid:null},
            title:{msg:"برای کد تخفیف یک عنوان بنویسید", is_valid:null},
            percent:{msg:"درصد باید از اعداد تشکیل شود و عددی بین -1 تا 100 باشد", is_valid:null},
            max_price:{msg:"این مقدار باید از اعداد تشکیل شود", is_valid:null},



          },
          thereIsError:null,
      }
    },
    mounted(){
      this.setDiscounts()
    },
    methods:{
      formValidation(){
        let english = /^[A-Za-z0-9]*$/;
        if(this.discount.code == undefined || this.discount.code =="" || !english.test(this.discount.code)){
          this.errors.code.is_valid = false;
        }
        else{
          this.errors.code.is_valid = true;

        }


        if(this.discount.title == undefined || this.discount.title ==""){
          this.errors.title.is_valid = false;
        }
        else{
          this.errors.title.is_valid = true;

        }
        let isNumber = /^[0-9]{2}$/
        if(!isNumber.test(this.discount.percent) || this.discount.percent == undefined ||  -1 > this.discount.percent< 100){
          this.errors.percent.is_valid = false;
        }
        else{
          this.errors.percent.is_valid = true;

        }

        let isAccepteable = /^[0-9]*$/
        if(!isAccepteable.test(this.discount.max_price) || this.discount.max_price == undefined){
          this.errors.max_price.is_valid = false;
        }
        else{
          this.errors.max_price.is_valid = true;

        }







        return false;
      },
      setDiscounts(){
        axios.get("transaction/discounts/").then(response=>{
          this.Discounts = response.data;
          this.isLoading = false;
        })
      },
      extractdate(date){
        let newdate = new Date(date)
        let mydate = this.to_jalali(newdate.getFullYear(), newdate.getMonth(), newdate.getDay())
        this.period = `${newdate.getFullYear()}-${newdate.getMonth()}-${newdate.getDay()} ${newdate.getHours()}:${newdate.getMinutes()}`;
      },
       to_jalali(gy, gm, gd){
        var g_d_m, jy, jm, jd, gy2, days;
        g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        gy2 = (gm > 2) ? (gy + 1) : gy;
        days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
        jy = -1595 + (33 * ~~(days / 12053));
        days %= 12053;
        jy += 4 * ~~(days / 1461);
        days %= 1461;
        if (days > 365) {
          jy += ~~((days - 1) / 365);
          days = (days - 1) % 365;
        }
        if (days < 186) {
          jm = 1 + ~~(days / 31);
          jd = 1 + (days % 31);
        } else {
          jm = 7 + ~~((days - 186) / 30);
          jd = 1 + ((days - 186) % 30);
        }
        return [jy, jm, jd];
      },
      makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * 
                charactersLength));
            }   
            return result;
      },
      generateCode(){
          // this.product.code =  do ajax;
          this.discount.code = this.makeid(10);

      },
      addUserSpecial(){
        this.discount.specialUser.push({email:""});
      },
      saveProdcut(){
        // do ajax
        if(!this.formValidation()){
          this.thereIsError = true;
        }
        let data = new FormData();
        data.append("code",this.discount.code);
        data.append("title",this.discount.title);
        data.append("percent",this.discount.percent);
        data.append("max_price",this.discount.max_price);
        data.append("reUseAble",this.discount.reUseAble);
        data.append("period", this.period);

        if(!this.editMode){
          axios.post('transaction/discounts/',data).then(response=>{
            if(response.status==201){
              Swal.fire({
                title: '<h5>موفق</h5>',
                icon: 'success',
                confirmButtonText: 'متوجه شدم',
              }).then(result=>{
                if (result.isConfirmed) {
                  window.scrollTo({top:0,behavior:"smooth"})
                }
              });
            }
          })
        }else{
          axios.put(`transaction/discounts/${this.discount.id}/`,data).then(response=>{
            Swal.fire({
                title: '<h5>موفق</h5>',
                icon: 'success',
                confirmButtonText: 'متوجه شدم',
              }).then(result=>{
                if (result.isConfirmed) {
                  window.scrollTo({top:0,behavior:"smooth"})
                }
              });
          })
        }
        this.discount = {
            specialUser:[
            
            ]
        };
        this.setDiscounts()
        window.scrollTo({top:0,behavior:"smooth"})
        this.editMode = false
      },
      editDiscount(discount){
        this.discount = discount;
        this.editMode = true;
        window.scrollTo({top:750,behavior:"smooth"})

      },
      deleteDiscount(item){
        Swal.fire({
          title: '<h5>حذف کد تخفیف</h5>',
          html: `<p class="text-danger">آیا از حذف کد تخفیف زیر اطمینان دارید؟</p>
          <p class="fw-bold">${item.title}</p>`,
          icon: 'warning',
          confirmButtonText: 'حذف کن',
          confirmButtonColor:"#e74c3c",
          CancelButtonColor:"#95a5a6",
          cancelButtonText:"انصراف",
          confirmButtonText: 'حذف',
          showCancelButton: true,
        }).then(result=>{
          if (result.isConfirmed) {
              axios.delete(`transaction/discounts/${item.id}/`).then(response=>console.log(response.status))
              Swal.fire({
                  title: 'حذف با موفقیت انجام شد',
                  text:'کد تخفیف مورد نظر با موفقیت حذف شد',
                  icon:'success',
                  confirmButtonColor:"#27ae60",
                  confirmButtonText: 'متوجه شدم',
              }).then(response=>{
                this.setDiscounts()
              })
          }
        });
      },


    },
    watch:{
      'discount.code'(){
        this.errors.code.is_valid = null;
        this.thereIsError = false;
      },
      'discount.title'(){
        this.errors.title.is_valid = null;
        this.thereIsError = false;
      },
      'discount.percent'(){
        this.errors.percent.is_valid = null;
        this.thereIsError = false;
      },
      'discount.max_price'(){
        this.errors.max_price.is_valid = null;
        this.thereIsError = false;
      },
    }
    
  }

</script>
<style>
.activate-status{
  background-color: #e74c3c;
  border-radius: 10px;
  font-weight: bold;
  font-size: 22px;
}

.re-use{
  border-radius: 10px;
  background-color: #27ae60;
  font-weight: bold;
  font-size: 22px;

}
.title__noti{
  color: white;
}
</style>