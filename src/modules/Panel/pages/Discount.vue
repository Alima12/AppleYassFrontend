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
                            <td>{{disc.maxValue.toLocaleString()}} تومان </td>
                            <td>{{disc.ActiveTill}}</td>
                            <td>
                              <i class="fa fa-check-circle fa-2x text-success" v-if="disc.status"></i>
                              <i class="fa fa-times-circle fa-2x text-danger" v-else></i>
                            </td>
                            <td>
                              <i class="fa fa-check-circle fa-2x text-success" v-if="disc.reUseAble"></i>
                              <i class="fa fa-times-circle fa-2x text-danger" v-else></i>
                            </td>
                            <td>
                                <a href="" class="item-delete mlg-15" @click.prevent="" title="حذف" style="font-size:22px"></a>
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

              <form action="" method="post">

                <div class="row p-1">
                  <div class="col-lg-10 col-md-9 col-sm-7">  
                    <label for="code" class="mb-2">کد محصول  :</label>
                    <input name="code" v-model="discount.code" type="text" class="text font-size-13" placeholder="کد محصول">
                  </div>
                  <div class="col-lg-2 col-md-3 col-sm-5 d-flex align-items-center justify-content-end">  
                    <button to="/panel" class="btn btn-success" @click.prevent="generateCode()">ساختن</button>
                  </div>
                </div>


                <div class="row p-1">
                  <div class="col-lg-12 col-md-12 col-sm-12">  
                    <label for="name" class="mb-2">عنوان کد تخفیف:</label>
                    <input  name="name" v-model="discount.title" type="text" class="text font-size-13" placeholder="عنوان">
                  </div>
                </div>

                <div class="row p-1">
                  <div class="col-lg-12 col-md-12 col-sm-12">  
                    <label for="name" class="mb-2">درصد:</label>
                    <input  name="name" v-model="discount.percent" type="number" max="99"
                    min="1" class="text font-size-13" placeholder="درصد تخفیف">
                  </div>
                </div>

                <div class="row p-1">
                  <div class="col-lg-12 col-md-12 col-sm-12">  
                    <label for="name" class="mb-2">سقف استفاده از کد به تومان:</label>
                    <input  name="name" v-model="discount.maxValue" type="text" class="text font-size-13" placeholder="سقف">
                    <small class="text-reset fw-light">اگر میخواهید محدودیتی نداشته باشد آن را 0 بگذارید</small>
                  </div>
                </div>

                <div class="row p-1 mt-3">
                  <div class="col-lg-12 col-md-12 col-sm-12">  
                    <label for="name" class="m-2">اعتبار تا:</label>
                      <custom-date-picker v-model="discount.ActiveTill"></custom-date-picker>
                  </div>
                </div>

                <div class="row p-1">
                  <div class="col-lg-12 col-md-12 col-sm-12 notification__box activate-status">  
                    <p class="title__noti">وضعیت</p>
                    <div class="notificationGroup">
                        <input id="option1" v-model="discount.status" name="option1" type="checkbox"/>
                        <label for="option1" v-if="discount.status">فعال</label>
                        <label for="option1" v-else>غیر فعال</label>

                    </div>
                  </div>
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


                <div class="row p-1 my-3">
                  <div class="col-lg-4 col-md-8 col-sm-12 mx-auto p-2">
                    <button class="w-100 btn btn-primary p-3" @click.prevent="saveProdcut()">
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
</template>
<script>
  import Swal from 'sweetalert2'
  import DatePicker from 'vue3-persian-datetime-picker'
  export default {
    name: "Category",
    components:{DatePicker},
    data(){
      return{
          Discounts:[
            {code:"Norouz",percent:60,maxValue:300000,title:"به مناسب عید نوروز",ActiveTill:"2022-02-02 18:50:30",status:true,reUseAble:false},
            {code:"Ghorban",percent:20,maxValue:30000,title:"به مناسب عید قربان",ActiveTill:"2022-02-02 18:50:30",status:false,reUseAble:false},
            {code:"NewIphone",percent:30,maxValue:350000,title:"به مناسب عید نوروز",ActiveTill:"2022-02-02 18:50:30",status:false,reUseAble:false},
            {code:"Mohammad",percent:20,maxValue:10000,title:"هدیه ای به محمد",ActiveTill:"2022-02-02 18:50:30",status:true,reUseAble:false},
            {code:"AmirAli",percent:40,maxValue:60000,title:"هدیه ای به امیرعلی",ActiveTill:"2022-02-02 18:50:30",status:false,reUseAble:false},
            {code:"Maryam",percent:90,maxValue:3000000,title:"هدیه ای به مریم",ActiveTill:"2022-02-02 18:50:30",status:true,reUseAble:false},

          ],
          discount:{
            specialUser:[
            
            ]
          },
          editMode:false,
      }
    },

    methods:{
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
        if(!this.editMode){
          this.Discounts.push(this.discount);
        }
        this.discount = {
            specialUser:[
            
            ]
        };
        window.scrollTo({top:0,behavior:"smooth"})
        this.editMode = false
      },
      editDiscount(discount){
        this.discount = this.Discounts.find(d=> d.code == discount.code);
        this.editMode = true;
        window.scrollTo({top:750,behavior:"smooth"})

      }

    },
    
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