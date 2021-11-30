import axios from "axios"

const Categories = []


const state = {
  productItems:[
    {
      code:"2aCbSu",
      newProduct:true,
      hotProduct:true,
      isUserFavorite:true,
      guarantee:"گارانتی بازگشت وجه 7 روزه",
      colors:[{color:'black',price:900000,inventory: 5},{color:'white',price:900000,inventory: 0}],
      title:"Level U HeadPhone",
      category:{name:"headphone"},
      is_super_offer:false,
      name:"level U هندزفری ",
      stars:4,
      isSpecialOffer:false,
      images:[
        {
          id:1,
          image:"https://dkstatics-public.digikala.com/digikala-products/121904901.jpg"
        },
      ],
      attributes:[
        {
         text:"جنسه بدنه: آلمینیوم"
        },
        {
          text:"حافظه داخلی: 64 گیگابایت "
        },
        {
          text:"شبکه های ارتباطی: بدون سیم‌کارت"
        },
        {
          text:"رابط‌ها: جک 3.5 میلی‌متری صدا"
        }
      ],
      comments:[
        {name:"علی", image:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",date:"سه روز پیش",likes:20,dislikes:19,content:"عالیه حتما بخرید",reply:[]},
        {name:"محمد", image:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",date:"سه روز پیش",likes:10,dislikes:50,content:"عالیه حتما بخرید",reply:[]},
        {name:"امیر", image:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",date:"سه روز پیش",likes:10,dislikes:25,content:"عالیه حتما بخرید",reply:[]},
        {name:"حسین", image:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",date:"سه روز پیش",likes:29,dislikes:10,content:"عالیه حتما بخرید",reply:[]},
        {name:"وحیذ", image:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",date:"سه روز پیش",likes:50,dislikes:10,content:"عالیه حتما بخرید",reply:[{name:"علی", image:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",date:"سه روز پیش",likes:50,dislikes:0,content:"عالیه حتما بخرید"},{name:"علی", image:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",date:"سه روز پیش",likes:50,dislikes:0,content:"عالیه حتما بخرید"},{name:"علی", image:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",date:"سه روز پیش",likes:50,dislikes:0,content:"عالیه حتما بخرید"}]},
  
      ],
      technicalattrs:[{name:"قابلیت بی سیم",value:"دارد"}],
      moreDetails: "",
  
  
      
    },
    {
      code:"2a4CbSu",
      newProduct:false,
      hotProduct:false,
      isUserFavorite:false,
      guarantee:"گارانتی 24 ماهه اپل یاس",
      colors:[{color:'#f1c40f',price:19000000,inventory: 1},{color:"#2d3436",price:19200000,inventory: 0},{color:"#0984e3",price:18700000,inventory: 2}],
      title:"IPad Mini 5 2019 7.9 inch Wifi",
      category:{name:"headphone"},
      is_super_offer:true,
      name:"تبلت اپل مدل iPad Mini 5 2019 7.9 inch WiFi ظرفیت 64 گیگابایت ",
      stars:5,
      isSpecialOffer:false,
      discoutPercent:12,
      remainTimeSecond:8000,
      attributes:["جنسه بدنه: آلمینیوم","حافظه داخلی: 64 گیگابایت ","شبکه های ارتباطی: بدون سیم‌کارت","رابط‌ها: جک 3.5 میلی‌متری صدا"],
      images:[
        {
          id:1,
          image:"https://dkstatics-public.digikala.com/digikala-products/110767188.jpg",
          offerBanner:"https://previews.123rf.com/images/icreative3d/icreative3d1608/icreative3d160800122/60598852-discount-12-percent-off-3d-illustration-on-white-background-.jpg",
        },
      ],
      comments:[],
      technicalattrs:[{name:"قابلیت بی سیم",value:"دارد"},],
      moreDetails: "",
  
    },
    {
      code:"2a21bA",
      newProduct:true,
      hotProduct:true,
      isUserFavorite:false,
      guarantee:"گارانتی بازگشت وجه 7 روزه",
      colors:[{color:'gray',price:4500000,inventory: 7}],
      title:"JBL Speaker Pulse 4",
      category:{name:"speaker"},
      is_super_offer:false,
      name:"اسپیکر بلوتوثی  مدل Pulse 4 ",
      stars:5,
      isSpecialOffer:true,
      images:[
        {
          id:1,
          image:"https://dkstatics-public.digikala.com/digikala-products/114699730.jpg"
        },
      ],
      comments:[],
      technicalattrs:[{name:"",value:""},],
      moreDetails: "",
  
    },
    {
      code:"5Sab4u",
      newProduct:true,
      hotProduct:true,
      isUserFavorite:false,
      guarantee:"گارانتی بازگشت وجه 7 روزه",
      colors:[{color:'white',price:769500,inventory: 10}],
      title:"HeadPhone hyco",
      category:{name:"headphone"},
      is_super_offer:false,
      name:"هندزفری بلوتوثی هاینو تکو مدل ایرپاد 2 ",
      stars:2,
      isSpecialOffer:false,
      images:[
        {
          id:1,
          image:"https://dkstatics-public.digikala.com/digikala-products/d52027e381580114b15d694e62903a0a4c90084d_1629541316.jpg"
        },
      ],
      comments:[],
      technicalattrs:[{name:"",value:""},],
      moreDetails: "",
  
    },
    {
      code:"3dfdfg",
      newProduct:true,
      hotProduct:true,
      isUserFavorite:false,
      guarantee:"گارانتی بازگشت وجه 7 روزه",
      colors:[{color:'gray',price:350000,inventory: 2}],
      title:"Cover",
      category:{name:"cover"},
      is_super_offer:false,
      name:"کاور صنایع چرم پیری مدل PLSET5",
      stars:5,
      isSpecialOffer:true,
      images:[
        {
          id:1,
          image:"https://dkstatics-public.digikala.com/digikala-products/88c2e4e7b57345a928a24a884d91e2da5c31955d_1631516350.jpg"
        },
      ],
      comments:[],
      technicalattrs:[{name:"",value:""},],
      moreDetails: "",
  
  
    },
    {
      code:"432435j",
      hotProduc:false,
      newProduct:false,
      name:"خرید گوشی آیفون 12 64 گیگ",
      title:"iphone 11 ProMax 256G",
      stars:5,
      is_super_offer:false,
      colors:[{color:"#e74c3c",price:28900000,inventory: 8},{color:"#f1c40f",price:29100000,inventory: 15},{color:"#2c3e50",price:29000000,inventory: 10}],
      guarantee:"گارانتی بازگشت وجه 7 روزه",
      maxCount:4,
      isUserFavorite:false,
      category:{name:"اپل"},
      images: [
        {id:1,image:"https://dkstatics-public.digikala.com/digikala-products/113542044.jpg"},
        {id:2,image:"https://dkstatics-public.digikala.com/digikala-products/113542040.jpg"},
        {id:3,image:"https://dkstatics-public.digikala.com/digikala-products/113542037.jpg"}
      ],
      comments:[],
      technicalattrs:[{name:"",value:""},],
      moreDetails: "",
    }
  ],
}
const mutations ={
  updateProductItems(state, payload) {
    state.productItems = payload;
  },
}


const actions= {
  getProductItems ({ commit }) {
    axios.get(`/`).then((response) => {
      commit('updateProductItems', response.data)
    });
  },
}

const getters ={
  getProducts:state => state.productItems,
  getProduct: state=> (code)=>{
    return state.productItems.find(product=> product.code == code)
  },
  getProductByCategory: state=> (category)=>{
    return state.productItems.filter(product=>product.category.name == category)
  },
  getOfferProducts: state=> {
    return state.productItems.filter(product=> product.isSpecialOffer)
  },
  getSuperOfferProduct: state=>{
    return state.productItems.find(product=> product.is_super_offer)
  },

}



export default {
  state,
  mutations,
  actions,
  getters

}

