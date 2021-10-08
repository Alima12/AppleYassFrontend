<template>
  <section class="footer mt-3">
      <div class="footer-container">
          <div class="container-fluid">
              <div class="row logo">
                  <div class="col-12">
                    <img src="https://png.pngitem.com/pimgs/s/63-636592_apple-logo-and-name-hd-png-download.png" alt="">
                  </div>
                  <div class="col-12 tel-res">
                      <p class="telephone"> تلفن تماس : 07432326985 - 09174580056</p>
                      <p class="address"> آدرس: گچساران / نرسیده به سه راهی / جنب بستنی شاد</p>
                  </div>
              </div>
              
              <div class="row details">
                  <div class="col-lg-8 col-md-7 col-sm-12">
                      <div class="title">اپل یاس</div>
                      <p class="about-us">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
                  </div>
                  <div class="col-lg-4 col-md-5 col-sm-12">
                      <div class="certificates">
                            <div class="item">
                                <a href="#">
                                    <img src="https://www.digikala.com/static/files/6e2d6b38.png" alt="">
                                </a>
                            </div>
                            <div class="item">
                              <a href="#">
                                  <img src="https://www.digikala.com/static/files/6e2d6b38.png" alt="">
                              </a>
                          </div>
                            <div class="item">
                                <a href="#">
                                    <img src="https://www.digikala.com/static/files/6e2d6b38.png" alt="">
                                </a>
                            </div>
                      </div>
                  </div>
              </div>

              <div class="row">
                <div class="col-12">
                    <p class="copy-rights">
                        ©2020 Copy Right | تمامی حقوق این سایت متعلق به اپل یاس میباشد
                    </p>
                        
                </div>
              </div>
          </div>
      </div>
  </section>
</template>
<script>
  export default {
    name: "Footer",
    data(){
      return {
      }
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
