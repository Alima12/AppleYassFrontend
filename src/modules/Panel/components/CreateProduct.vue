<template>
{{$route.params}}
 <form action="" method="post">
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
                <input id="option1" v-model="product.hotProduct" name="option1" type="checkbox"/>
                <label for="option1">داغ</label>
            </div>
            <div class="notificationGroup">
                <input id="option2" v-model="product.newProduct" name="option2" type="checkbox" />
                <label for="option2">جدید</label>
            </div>
        </div>
      </div>



      <h5>قیمت و رنگ</h5>
      <div class="row p-1" :style="`background-color:${color.color}`" v-for="color in product.colors">
        <div class="col-lg-4 col-md-4 col-sm-12">  
            <label :style="`background-color:${color.color}`" class="text-center form-control" for="color">رنگ</label>
            <input v-model="color.color" class="form-control" name="color" type="text" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">  
            <label class="text-center form-control" for="price">قیمت به تومان</label>
            <input v-model="color.price" class="form-control" name="price" type="text" />
        </div>
        <div class="col-lg-3 col-md-2 col-sm-12">  
            <label class="text-center form-control" for="inventory">تعداد</label>
            <input v-model="color.inventory" class="form-control" name="inventory" type="text" />
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
    <div class="row p-1">
        <div class="col-lg-11 col-md-11 col-sm-11" v-for="attr in product.attributes">  
            <input  name="Attr" v-model="attr.text" type="text" class="text font-size-13" placeholder="شرح">
        </div>
        <div class="col-1">
            <button class="btn btn-outline-success" @click.prevent="addAttr()">
                <i class="fa fa-plus-circle"></i>
            </button>
        </div>
    </div>


    <h6>خصوصیات فنی:</h6>
    <div class="row p-1">
        <div class="col-lg-11 col-md-11 col-sm-11 d-flex" v-for="tech in product.technicalattrs">
            <div class="w-50 p-1">
                <input  name="name" v-model="tech.name" type="text"     class="text font-size-13" placeholder="اسم">
            </div> 
            <div class="w-50 p-1">
                <input  name="value" v-model="tech.value" type="text"   class="text font-size-13" placeholder="توضیح">
            </div> 
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
            <textarea name="moreDetail" v-model="product.moreDetail" class="form-control"></textarea>

        </div>
    </div>


      <div class="row p-1 my-3">
        <div class="col-lg-4 col-md-8 col-sm-12 mx-auto p-2">
          <button class="w-100 btn btn-primary p-3" @click="saveProdcut()">
            <span>
              ذخیره
            </span> 
          </button>
        </div>
      </div>



    </form>
</template>
<script>
  export default {
    name: "CreateEditProduct",
    data(){
        return{
            tempCategory:"",
            product:{
                code:"",
                name:"",
                title:"",
                newProduct:false,
                hotProduct:true,
                colors:[{}],
                images:[],
                attributes:[{text:""}],
                technicalattrs:[{name:"",value:""},],
                moreDetails: "",
                category:"",

            },
            categories:[
                {id:0,href:"apple",name:"Apple",title:"محصولات اپل",owner:{}},
                {id:1,href:"iphone",name:"Iphone",title:"گوشی موبایل",owner:{id:0,name:"Apple",title:"محصولات اپل",owner:{}}},
                {id:2,href:"ipad",name:"Ipad",title:"تبلت",owner:{id:0,name:"Apple",title:"محصولات اپل",owner:{}}},
                {id:3,href:"ipod",name:"Ipod",title:"تبلت",owner:{id:0,name:"Apple",title:"محصولات اپل",owner:{}}},
                {id:4,href:"iwatch",name:"Iwatch",title:"ساعت هوشمند",owner:{id:0,name:"Apple",title:"محصولات اپل",owner:{}}},
                {id:5,href:"airpod",name:"Airpod",title:"هندزفری",owner:{id:0,name:"Apple",title:"محصولات اپل",owner:{}}},
            ],
        }
    },
    mounted(){
        let id = this.$route.params.code || null;
        if(id){
            let p = this.$store.getters.getProduct(id);
            this.product = p;
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
            this.product.code = this.makeid(8);

        },
        addColor(){
            this.product.colors.push({});
        },
        removeColor(color){
            this.product.colors = this.product.colors.filter(col=> col != color);
        },
        setFiles(){
            let images = document.querySelector("#product-images");

            for (let index = 0; index < images.files.length; index++) {
                this.product.images.push({
                    id:this.product.images.length +1,
                    image:URL.createObjectURL(images.files[index])
                });
                
            }

        },
        addAttr(){
            this.product.attributes.push({text:""});
        },
        addTech(){
            this.product.technicalattrs.push({name:"",value:""});
        },
        saveProdcut(){
            alert()
        },
        deleteImage(id){
            this.product.images = this.product.images.filter(img=> img.id != id);
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