import SingleProduct from "../pages/SingleProduct.vue"


export default [
  {
    path: '/product/:code',
    name: 'SingleProduct',
    component: SingleProduct,
    meta:{
      title:"محصول "
    }
  },

]