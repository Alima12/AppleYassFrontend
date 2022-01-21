<template>
  <section class="footer mt-3">
      <div class="footer-container">
          <div class="container-fluid">
              <div class="row logo">
                  <div class="col-12">
                    <img :src="`http://127.0.0.1:8000`+ data.logo + '/' " alt="">
                  </div>
                  <div class="col-12 tel-res">
                      <p class="telephone">تلفن تماس: {{data.contact_us}}</p>
                      <p class="address"> آدرس: {{data.our_address}}</p>
                  </div>
              </div>
              
              <div class="row details">
                  <div class="col-lg-8 col-md-7 col-sm-12">
                      <div class="title">{{data.web_name}}</div>
                      <p class="about-us">
                          {{data.about_us}}
                      </p>
                  </div>
                  <div class="col-lg-4 col-md-5 col-sm-12">
                      <div class="certificates">
                        <div class="item" v-for="certificate in certificates">
                            <a href="#">
                                <img :src="certificate.image" :alt="certificate.title" :title="certificate.title">
                            </a>
                        </div>
                      </div>
                  </div>
              </div>

              <div class="row">
                <div class="col-12">
                    <p class="copy-rights">
                        {{data.copy_rights}}
                    </p>
                        
                </div>
              </div>
          </div>
          
      </div>
  </section>
</template>
<script>
import axios from 'axios'
  export default {
    name: "Footer",
    props:["data"],
    data(){
      return {
          certificates :[

          ]
      }
    },
    mounted(){
        axios.get("/config/certificates/").then(response=>{
            this.certificates = response.data;
        })
    }

  }
</script>
<style>
    .footer-container{
        width: 100%;
        height: auto;
        font-size: 1em;
        padding: 20px 30px;
        background-color: #e6eaee;
        color: #444;
        padding-bottom: 5px;
    }


    .footer-container .logo .tel-res{
        display: flex;
        align-content: center;
        align-items: center;
        margin: 10px 15px;
        font-size: 1.1em;
    }
    .footer-container .logo img{
        width: 150px;
        border-radius: 10px;
    }
    .footer-container .logo .telephone{
        margin-left: 5px;
    }

    .footer-container .logo .address{
        margin-right: 15px;
        
    }

    .footer-container .details{
        border-top: 1px solid #555;
        padding: 30px 0px;
    }
    .footer-container .details .title{
        font-weight: bold;
        font-size: 1.3em;
        margin-bottom:12px;
    }
    .footer-container .details .about-us{
        text-align: justify;
    }

    .footer-container .certificates{
        padding: 10px 15px;
        display: flex;
        justify-content: center;


    }
    .footer-container .certificates .item{
        margin-right: 4px;
    }
    .footer-container .certificates .item a{

    }
    .footer-container .certificates .item a img{
        width: 100%;
    }

    .footer-container .copy-rights{
        color: #333;
        text-align: center;
        padding: 15px;
        border-top: 1px solid #555;
        font-weight: bold;
    }
    @media only screen and (max-width:800px) {
        .footer-container .logo .tel-res{
            display: flex;
            flex-direction: column;
           
        }
    }
</style>
