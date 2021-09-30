import { createStore } from 'vuex'

const state = {
  productItems:[
    {
      code:"2aCbSu",
      newProduct:true,
      hotProduct:true,
      isUserFavorite:true,
      guarantee:"گارانتی بازگشت وجه 7 روزه",
      colors:['black'],
      inventory:5,
      title:"Level U HeadPhone",
      category:{name:"headphone"},
      is_super_offer:false,
      name:"level U هندزفری ",
      stars:4,
      isSpecialOffer:false,
      price:"9,000,000 ریال",
      images:[
        {
          id:0,
          image:"https://dkstatics-public.digikala.com/digikala-products/121904901.jpg"
        },
      ],
      attributes:["جنسه بدنه: آلمینیوم","حافظه داخلی: 64 گیگابایت ","شبکه های ارتباطی: بدون سیم‌کارت","رابط‌ها: جک 3.5 میلی‌متری صدا"]
    },
    {
      code:"2a4CbSu",
      newProduct:false,
      hotProduct:false,
      isUserFavorite:false,
      guarantee:"گارانتی 24 ماهه اپل یاس",
      colors:['#f1c40f',"#2d3436","#0984e3"],
      inventory:1,
      title:"IPad Mini 5 2019 7.9 inch Wifi",
      category:{name:"headphone"},
      is_super_offer:true,
      name:"تبلت اپل مدل iPad Mini 5 2019 7.9 inch WiFi ظرفیت 64 گیگابایت ",
      stars:5,
      isSpecialOffer:false,
      discoutPercent:12,
      remainTimeSecond:8000,
      price:"10,990,000 تومان",
      attributes:["جنسه بدنه: آلمینیوم","حافظه داخلی: 64 گیگابایت ","شبکه های ارتباطی: بدون سیم‌کارت","رابط‌ها: جک 3.5 میلی‌متری صدا"],
      images:[
        {
          id:0,
          image:"https://dkstatics-public.digikala.com/digikala-products/110767188.jpg",
          offerBanner:"https://previews.123rf.com/images/icreative3d/icreative3d1608/icreative3d160800122/60598852-discount-12-percent-off-3d-illustration-on-white-background-.jpg",
        },
      ]
    },
    {
      code:"2a21bA",
      newProduct:true,
      hotProduct:true,
      isUserFavorite:false,
      guarantee:"گارانتی بازگشت وجه 7 روزه",
      colors:['gray'],
      inventory:7,
      title:"JBL Speaker Pulse 4",
      category:{name:"speaker"},
      is_super_offer:false,
      name:"اسپیکر بلوتوثی قابل حمل جی بی ال مدل Pulse 4 ",
      stars:5,
      isSpecialOffer:true,
      price:"4,500,00 تومان",
      images:[
        {
          id:0,
          image:"https://dkstatics-public.digikala.com/digikala-products/114699730.jpg"
        },
      ]
    },
    {
      code:"5Sab4u",
      newProduct:true,
      hotProduct:true,
      isUserFavorite:false,
      guarantee:"گارانتی بازگشت وجه 7 روزه",
      colors:['gray'],
      inventory:10,
      title:"HeadPhone hyco",
      category:{name:"headphone"},
      is_super_offer:false,
      name:"هندزفری بلوتوثی هاینو تکو مدل ایرپاد 2 ",
      stars:2,
      isSpecialOffer:false,
      price:"769,500 تومان",
      images:[
        {
          id:0,
          image:"https://dkstatics-public.digikala.com/digikala-products/d52027e381580114b15d694e62903a0a4c90084d_1629541316.jpg"
        },
      ]
    },
    {
      code:"3dfdfg",
      newProduct:true,
      hotProduct:true,
      isUserFavorite:false,
      guarantee:"گارانتی بازگشت وجه 7 روزه",
      colors:['gray'],
      inventory:2,
      title:"Cover",
      category:{name:"cover"},
      is_super_offer:false,
      name:"کاور صنایع چرم پیری مدل PLSET5",
      stars:5,
      isSpecialOffer:true,
      price:"350,000 تومان ",
      images:[
        {
          id:0,
          image:"https://dkstatics-public.digikala.com/digikala-products/88c2e4e7b57345a928a24a884d91e2da5c31955d_1631516350.jpg"
        },]
      },
    {
      code:"43243fj",
      hotProduc:false,
      newProduct:false,
      name:"خرید گوشی آیفون 12 64 گیگ",
      title:"iphone 11 ProMax 256G",
      stars:5,
      is_super_offer:false,
      price: "29,000,000 تومان",
      colors:["#e74c3c","#f1c40f","#2c3e50"],
      guarantee:"گارانتی بازگشت وجه 7 روزه",
      maxCount:4,
      inventory: 20,
      isUserFavorite:false,
      images: [
        {id:1,image:"https://dkstatics-public.digikala.com/digikala-products/113542044.jpg"},
        {id:2,image:"https://dkstatics-public.digikala.com/digikala-products/113542040.jpg"},
        {id:3,image:"https://dkstatics-public.digikala.com/digikala-products/113542037.jpg"}
      ]
    }
  ],
}
const mutations ={
  updateProductItems(state, payload) {
    state.productItems = payload;
  },
}


const actions= {
  // getProductItems ({ commit }) {
  //   axios.get(`/api/products`).then((response) => {
  //     commit('updateProductItems', response.data)
  //   });
  // },
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
