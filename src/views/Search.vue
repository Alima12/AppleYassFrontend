<template>
    <section class="search container-fluid">
        <div class="search-box row">
            <div class="search-title col-2">
                <h6>جستجو:</h6>
            </div>
            <div class="col-8 search-input">
                <input type="text" class="form-control w-100" v-model="params" />
            </div>
            <div class="col-2 search-btn">
                <button class="btn btn-outline-dark" @click="search()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
        <hr />

        <div class="search-result">
            <div class="category-list">
                <div class="category-items">
                    <div @click="setCategory(category)" class="item" v-for="category in categories" :class="{'active': category.active}">
                        <p>
                            {{category.title}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="main row">
                <div class="col-lg-3 col-md-12 col-sl-12 filter-section">
                    <div class="sorting">
                        <h5>
                            <i class="fa fa-sort-amount-desc"></i>
                            مرتب سازی: </h5>
                        <div class="item">
                            <p class="sort-item">پربازدیدترین</p>
                            <p class="sort-item">پرفروش ترین</p>
                            <p class="sort-item">جدیدترین</p>
                            <p class="sort-item">ارزان ترین</p>
                        </div>

                    </div>
                    <div class="filters">
                        <div class="filter-container">
                            <div class="center">
                                <input class="filter-checkbox" type="checkbox" id="cbx" style="display:none"/>
                                <label for="cbx" class="toggle"><span></span></label>    
                            </div>
                            <div class="title">
                                فقط کالا های موجود
                            </div>
                        </div>
                        <div class="filter-container">
                            <div class="center">
                                <input class="filter-checkbox" type="checkbox" id="cbx1" style="display:none"/>
                                <label for="cbx1" class="toggle"><span></span></label>    
                            </div>
                            <div class="title">
                                فقط کالا های موجود
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-lg-9 col-md-12 col-sm-12">
                    <div class="row">
                        <div class="product col-lg-4 col-md-6 col-sm-12" v-for="product in products">
                            <Product :product="product" />
                        </div>
                    </div>
                </div>
            </div>


        </div>



    </section>
    <div class="my-loader" :class="{'active': loadingActivate}">
        <pulse-loader :loading="loading" color="#444" :size="size"></pulse-loader>
    </div>

</template>
<script>
    import {
        ContentLoader,
    } from 'vue-content-loader'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import '@/assets/css/search.css';
    import Product from "../modules/Product/components/Product"
    import axios from 'axios'
    export default {
        name: "Search",
        components:{
            Product, 
            ContentLoader,
            PulseLoader

        },
        data(){
            return {
                categories:[],
                products:[],
                params:"",
                category:"",
                loadingActivate:true
            }
        },
        methods:{
            async search(){
                this.loadingActivate = true;
                this.manageParams(this.updateQuery())
                axios.get(
                    "searching/" + window.location.search
                ).then(response=>{
                    this.products = response.data.results;
                    console.log(this.products.length)
                    this.loadingActivate = false;
                })

            },
            setCategory(cat){
                this.category = cat.name;
                this.search()
                
            },
            updateQuery(){
                let query = Object.assign({});
                query.category__name = this.category;
                query.search = this.params;
                this.$router.push({ query });
                return query
                
            },
            manageParams(query=null){
                if (query == null){
                    query = this.$route.query;
                }
                this.params = query.search;
                this.category = query.category__name;
                console.log(this.category)
                this.categories.forEach(categ=>{
                    if(categ.name == this.category){
                        categ.active = true
                    }else{
                        categ.active = false
                    }
                })
            }

        },
        watch:{
            params(){
                this.updateQuery()
            },
        },
        mounted(){
            
            axios.get("category/list/").then(response=>{
                this.categories = response.data;
                this.manageParams()
                this.search()
            })
        }
    }
</script>
<style>


</style>

 