<template>
 <form action="" @submit.prevent="saveProdcut()">
      <div class="row p-1">
        <div class="col-lg-10 col-md-9 col-sm-7">  
          <label for="code" class="mb-2">کد محصول  :</label>
          <input name="code" v-model="product.code" type="text" class="text font-size-13" placeholder="کد محصول">
        </div>
        <div class="col-lg-2 col-md-3 col-sm-5 d-flex align-items-center justify-content-end">  
          <button to="/panel" class="btn btn-success" @click.prevent="generateCode()">ساختن</button>
        </div>
      </div>


      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="name" class="mb-2">نام محصول:</label>
          <input  name="name" v-model="product.name" type="text" class="text font-size-13" placeholder="نام محصول">
        </div>
      </div>

      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="title" class="mb-2">عنوان:</label>
          <input  name="title" v-model="product.title" type="text" class="text font-size-13" placeholder="عنوان">
        </div>
      </div>
     
      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12 image-wrapper">  
            <div v-for="img in product.images" class="image-exact">
                <div class="img">
                    <img :src="img.image" alt="">
                </div>
                <div class="delete-image">
                    <i class="fa fa-times-circle" @click="deleteImage(img.id)"></i>
                </div>
            </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12">  
          <label for="name" class="mb-2">تصاویر:</label>
          <input @change="setFiles()" id="product-images"  name="name" type="file" accept=".jpg, .png, .jpeg, .gif" multiple class="font-size-13" placeholder="تصاویر">
        </div>
      </div>

        <div class="row p-1">
            <div class="col-lg-12 col-md-12 col-sm-12">  
            <label for="guarantee" class="mb-2">گارانتی:</label>
            <input  name="guarantee" v-model="product.guarantee" type="text" class="text font-size-13" placeholder="گارانتی">
            </div>
        </div>


        <div class="row p-1 my-2">
            <div class="col-lg-12 col-md-12 col-sm-12">  
                <label for="category" class="mb-2">دسته بندی:</label>
                <select name="" id="" class="form-select" v-model="tempCategory" size="3" aria-label="size 3 select example">
                    <option v-for="cat in categories" :value="cat.id">{{cat.title}}</option>
                </select>
            </div>
        </div>

      <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12 notification__box">  
            <p class="title__noti">خصوصیت</p>
            <div class="notificationGroup">
                <input id="option1" v-model="product.is_hot" name="option1" type="checkbox"/>
                <label for="option1">داغ</label>
            </div>
            <div class="notificationGroup">
                <input id="option2" v-model="product.is_new" name="option2" type="checkbox" />
                <label for="option2">جدید</label>
            </div>
        </div>
      </div>



      <h5>قیمت و رنگ</h5>
      <div class="row p-1" :style="`background-color:${color.color}`" v-for="color in product.colors">
        <div class="col-lg-4 col-md-4 col-sm-12">  
            <label :style="`background-color:${color.color}`" class="text-center form-control" for="color">رنگ</label>
            <input @blur="UpdateColor(color)" v-model="color.color" class="form-control" name="color" type="text" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">  
            <label class="text-center form-control" for="price">قیمت به تومان</label>
            <input @blur="UpdateColor(color)" v-model="color.price" class="form-control" name="price" type="text" />
        </div>
        <div class="col-lg-3 col-md-2 col-sm-12">  
            <label class="text-center form-control" for="inventory">تعداد</label>
            <input @blur="UpdateColor(color)" v-model="color.inventory" class="form-control" name="inventory" type="text" />
        </div>

        <button class="btn btn-outline-danger col-lg-1 col-md-2 col-sm-12" @click.prevent="removeColor(color)">
            <i class="fa fa-times-circle fa-2x"></i>
        </button>

      </div>


    <div class="row p-1">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <button class="btn btn-outline-success w-100 p-3" @click.prevent="addColor()">
                <i class="fa fa-plus-circle fa-2x"></i>
            </button>
        </div>
    </div>


    <h6>خصوصیات:</h6>
    <div class="row p-1 mb-4">
        <div class="col-lg-11 col-md-11 col-sm-12 mb-1 d-flex justify-content-between" v-for="attr in product.attributes">  
            <input @blur="updateAttr(attr)" name="Attr" v-model="attr.text" type="text" class="text font-size-13" placeholder="شرح">
            <div class="mx-1">
                <button class="btn btn-outline-danger" @click.prevent="removeAttr(attr)">
                    <i class="fa fa-times-circle"></i>
                </button>
            </div>
        </div>
        <div class="col-1">
            <button class="btn btn-outline-success" @click.prevent="addAttr()">
                <i class="fa fa-plus-circle"></i>
            </button>
        </div>
    </div>


    <h6>خصوصیات فنی:</h6>
    <div class="row p-1">
        <div class="col-lg-11 col-md-11 col-sm-11 d-flex justify-content-space-beetwen mb-3" v-for="tech in product.technical">
            <div class="w-50 p-1">
                <input @blur="updateTech(tech)" name="name" v-model="tech.name" type="text"  class="text font-size-13" placeholder="اسم">
            </div> 
            <div class="w-50 p-1">
                <input @blur="updateTech(tech)" name="value" v-model="tech.text" type="text"   class="text font-size-13" placeholder="توضیح">
            </div> 
            <button class="btn btn-outline-danger mines-button" @click.prevent="removeTech(tech)">
                    <i class="fa fa-times"></i>
            </button>
        </div>

        <div class="col-1">
            <button class="btn btn-outline-success" @click.prevent="addTech()">
                <i class="fa fa-plus-circle"></i>
            </button>
        </div>
    </div>




    <div class="row p-1">
        <div class="col-lg-12 col-md-12 col-sm-12">
            <label class="mb-2" for="moreDetail">توضیحات اضافی:</label>
            <textarea name="moreDetail" v-model="product.detail" class="form-control"></textarea>

        </div>
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
    <loading 
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
      />
</template>
<script>
import axios from 'axios';
  import Loading from 'vue-loading-overlay';
  import Swal from 'sweetalert2'
  export default {
    name: "CreateEditProduct",
    components:{Loading},
    data(){
        return{
            isLoading:true,
            tempCategory:"",
            product:{},
            images:[],
            categories:[],
        }
    },
    mounted(){
        let code = this.$route.params.code || null;
        if(code){
            axios.get(`${code}/`).then(response=>{
                this.product = response.data
                this.tempCategory = this.product.category.id;
                this.isLoading = false
            })
        }
        setTimeout(()=>{
            this.categories = this.$store.getters.getCategories;
            this.isLoading = false;
        },2000)

    },
    methods:{
        UpdateColor(color){
            let data = new FormData()
            data.append("price", color.price)
            data.append("color", color.color)
            data.append("inventory", color.inventory)
            data.append("product", this.product.id)
            axios.put(`product/colors/${color.id}/update/`, data).then(response=>{
                color = response.data;
                this.setAlert("بروز شد", "success")
            })
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
            this.product.code = this.makeid(8);

        },
        sendColors(productID){
            this.product.colors.forEach(async color=>{
                let data = new FormData()
                data.append("product_code", productID);
                data.append("product", 1);

                data.append("color", color.color);
                data.append("inventory", color.inventory);
                data.append("price", color.price);
                await axios.post("product/colors/", data).then(response=>{
                }).catch(err=>{
                    console.log(err.response.data)
                })
            })
            this.isLoading = false;
            
        },
        addColor(){
            let data = new FormData();
            axios.post(`product/colors/${this.product.code}/add/`, data).then(response=>{
                this.product.colors.push(response.data);
            })
        },
        removeColor(color){
            Swal.fire({
                title: 'آیا از حذف این رنگ اطمینان دارید؟',
                text:"قبل از اینکه حذف کنید مطمئن شوید که این رنگ در هیچ سبد خریدی وجود ندارد اگر نه میتوانید بجای حذف موجودی را صفر کنید",
                icon: 'warning',
                confirmButtonText: 'حذف کن',
                confirmButtonColor:"#e74c3c",
                CancelButtonColor:"#95a5a6",
                cancelButtonText:"انصراف",
                confirmButtonText: 'حذف',
                showCancelButton: true,
                }).then(result=>{
                if (result.isConfirmed) {
                    axios.delete(`product/colors/${this.product.code}/delete/${color.id}/`).then(response=>{
                        if(response.status == 204){
                            this.product.colors = this.product.colors.filter(col=> col != color);
                            this.setAlert("با موفقیت حذف شد", "error")
                        }
                    })
                }
                });
            
        },
        setFiles(){
            let images = document.querySelector("#product-images");
            for (let index = 0; index < images.files.length; index++) {
                let data = new FormData()
                data.append("image", images.files[index])

                axios.post(`product/images/${this.product.code}/`, data).then(response=>{
                    this.setAlert("عکس با موفقیت اضافه شد", "default")
                    response.data.image = "http://127.0.0.1:8000" + response.data.image
                    this.product.images.push(response.data)
                })
            }
            


        },
        addAttr(){
            let data = new FormData();
            axios.post(`product/attr/${this.product.code}/add/`, data).then(response=>{
                this.product.attributes.push(response.data);
            })
        },
         updateAttr(attr){
            let data = new FormData()
            data.append("name", attr.name)
            data.append("text", attr.text)
            data.append("product", this.product.id)
            axios.put(`product/attr/${attr.id}/update/`, data).then(response=>{
                attr = response.data;
                this.setAlert("بروز شد", "success")
            })
        },
        removeAttr(attr){
            Swal.fire({
                title: 'آیا از حذف این خصوصیت فنی اطمینان دارید؟',
                icon: 'warning',
                confirmButtonText: 'حذف کن',
                confirmButtonColor:"#e74c3c",
                CancelButtonColor:"#95a5a6",
                cancelButtonText:"انصراف",
                confirmButtonText: 'حذف',
                showCancelButton: true,
                }).then(result=>{
                if (result.isConfirmed) {
                    axios.delete(`product/attr/${this.product.code}/delete/${attr.id}/`).then(response=>{
                        if(response.status == 204){
                            this.product.attributes = this.product.attributes.filter(col=> col != attr);
                            this.setAlert("با موفقیت حذف شد", "error")
                        }
                    })
                }
                });
        },

        addTech(){
            let data = new FormData();
            axios.post(`product/tech/${this.product.code}/add/`, data).then(response=>{
                this.product.technical.push(response.data);
            })

        },
        updateTech(tech){
            let data = new FormData()
            data.append("name", tech.name)
            data.append("text", tech.text)
            data.append("product", this.product.id)
            axios.put(`product/tech/${tech.id}/update/`, data).then(response=>{
                tech = response.data;
                this.setAlert("بروز شد", "success")
            })
        },
        removeTech(tech){
            Swal.fire({
                title: 'آیا از حذف این خصوصیت فنی اطمینان دارید؟',
                icon: 'warning',
                confirmButtonText: 'حذف کن',
                confirmButtonColor:"#e74c3c",
                CancelButtonColor:"#95a5a6",
                cancelButtonText:"انصراف",
                confirmButtonText: 'حذف',
                showCancelButton: true,
                }).then(result=>{
                if (result.isConfirmed) {
                    axios.delete(`product/tech/${this.product.code}/delete/${tech.id}/`).then(response=>{
                        if(response.status == 204){
                            this.product.technical = this.product.technical.filter(col=> col != tech);
                            this.setAlert("با موفقیت حذف شد", "error")
                        }
                    })
                }
                });
        },
        saveProdcut(){
            this.isLoading = true
            let formData = new FormData();
            formData.append("code",this.product.code);
            formData.append("title",this.product.title);
            formData.append("name",this.product.name);
            formData.append("detail",this.product.detail);
            formData.append("is_new",this.product.is_new);
            formData.append("is_hot",this.product.is_hot);
            formData.append("category_id",this.tempCategory);
            formData.append("rate", 0);
            
            formData.append("guarantee", this.product.guarantee)
            let headers = {
                "Content-Type": "multipart/form-data"
            }
            axios.put(`product/update/${this.product.code}/`, formData, headers).then(response=>{
                this.product = response.data;
                this.setAlert("محصول با موفقیت بروز شد", "success")
                this.$router.push("/panel/products/")
                this.isLoading = false;
            }).catch(err=>{
                this.setAlert("ظاهرا مشکلی بوجود آمده است", "error")
                this.isLoading = false;
            })

        },
        setAlert(message, type){
            this.$toast.open({
                message:message,
                type:type,
                duration:5000,
                position: 'top'

            })
        },
        deleteImage(id){
            this.product.images = this.product.images.filter(img=> img.id != id);
  

            axios.delete(`product/images/${this.product.code}/delete/${id}/`).then(response=>{
                this.setAlert("عکس با موفقیت حذف شد", "error")
            })
        }
    },
    watch:{
        tempCategory(value){
            let temp = this.categories.find(cat=> cat.id == parseInt(value));
            this.product.category = temp;
        }
    }
    

  
  }
</script>
<style>
.mines-button{
    padding: 0px 20px;
    font-size: .9em;
}

.image-wrapper{
    display: flex;
    justify-content: start;
    margin-bottom:40px ;
}

.image-exact{
    position: relative;
    width: 190px;
    padding: 10px;
}
.image-wrapper .img{
    width: 100%;
    height: 100%;

}

.image-wrapper .img img{
    width: 100%;
    height: 100%;

}

.image-wrapper .delete-image{
    position: absolute;
    top: 10px;
    left: 10px;
}
.image-wrapper .delete-image i{
    font-size: 22px;
    cursor: pointer;
    color: red;
}
</style>