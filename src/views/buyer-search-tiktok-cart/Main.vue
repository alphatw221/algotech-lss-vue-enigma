<template>

    <div class="h-[85vh] w-full relative">
        <div v-if="showAnimate">
            <lottie-player class="mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50" 
                src="https://assets10.lottiefiles.com/packages/lf20_vIyvPR.json" loop background="transparent"  speed="1"  style="width: 300px; height: 300px;"   autoplay></lottie-player>
        </div>
        <template v-if="!showAnimate">
            <div class="flex flex-row lg:gap-10 justify-center pt-2 pb-5 lg:py-10"> 
                <!-- <img src="@/assets/images/lss-img/kuaimai-avatar.jpeg" class="h-[80px] lg:h-[130px] rounded-xl lg:ml-20"/>  -->
                <img src="@/assets/images/lss-img/tiktok_black_bg.png" class="h-[70px] lg:h-[150px] my-auto z-10"/>
                <div class="relative w-[100px] lg:w-[200px]"> 
                    <div class="loading"> 
                        <div class="bullet"></div><div class="bullet"></div><div class="bullet"></div>
                    </div>
                </div>
                <p class=" my-auto py-2 font-medium text-[1.2rem] lg:text-[1.8rem] z-10 bg-slate-100"> {{tiktokStore}}</p>
            </div>
            <div class="h-full w-full xl:w-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] font-medium text-primary">
                <div
                    v-if="recaptchaToken" 
                    class="h-1/2 flex flex-col lg:flex-row justify-center lg:divide-x-4 top-1/2 translate-y-1/2"> 
                    
                    <div class="flex w-full h-full lg:p-10 mx-auto">
                        <div class="flex flex-col gap-3 justify-center mx-auto lg:ml-16 relative"> 
                            <label class="text-xl font-medium text-center lg:text-left"> 進入您的專屬購物車</label>
                            <label class="text-lg font-bold mt-3"> 方式一</label>

                            <a class="tiktok-login-btn shadow-lg flex justify-center" :href="`${serverDomain}/api/v2/tiktok/${route.params.campaign_id}/cart?message`"><p class="my-auto">登入TikTok帳號</p>  </a>
                            <label class="text-lg font-bold mt-3"> 方式二</label>
                            <label class="">輸入您的TikTok使用者名稱（暱稱）</label>
                            <div class="flex flex-row h-[42px]"> 
                                <input type="text" v-model="customerName" class="rounded-l-lg w-full h-[42px] border-primary">
                                <button class="btn btn-primary w-fit px-5 rounded-l-none whitespace-nowrap" @click="searchTiktokCart()">確認</button>
                            </div>
                            <a class="mx-auto underline text-slate-600 my-2" @click="showModal=true"> 找不到暱稱?</a>

                            
                        </div>
                    </div>
                    <div class="flex justify-center w-full border-t-2 border-slate-500 dark:border-darkmode-400 my-8 lg:hidden">
                        <div class="px-5 -mt-3 bg-slate-100 dark:bg-darkmode-600 text-slate-500 text-[20px]">
                            或
                        </div>
                    </div>
                    <div class="flex w-full h-full lg:p-10 mx-auto ">
                        <div class="flex flex-col gap-3 justify-center mx-auto relative w-[300px]"> 
                            <label class="text-xl font-medium mb-5 text-center lg:text-left">直接選購商品</label>
                            <a class="btn btn-primary px-5 w-fit hover:text-white mx-auto lg:mx-0"  
                                :href="`${baseURL}/buyer/recaptcha/blank/${route.params.campaign_id}/`"> 前往選購</a>
                            
                        </div>
                    </div>
                </div>
                <!-- <img src="@/assets/images/lss-img/Tiktok_name_exp.png" class="fixed h-[270px] bottom-12 left-[104px] hidden lg:block"/> -->
            </div>
            <div class="absolute text-[32px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"> 
                <lable class="text-slate-500 font-bold h-12 w-12 bg-slate-100 "> 或</lable>
            </div>
        </template>

        <div class="g-recaptcha absolute bottom-0 lg:bottom-10 right-10 z-50"
            :data-sitekey="siteKey"
            data-callback="recaptchaCallBack"
            data-size="invisible"
            data-badge="inline"
            >
        </div>
    </div>

    <Modal :show="showModal" @hidden="showModal=false">
        <ModalBody class="px-5">
            <div class="h-10">
                <a
                @click="showModal=false"
                class="absolute right-0 top-0 mt-3 mr-3"
                > <XIcon class="w-8 h-8 text-slate-400" />
                </a>
            </div>
            <img src="@/assets/images/lss-img/Tiktok_name_exp.png" class="h-full w-full"/>
        </ModalBody>
  </Modal>
    
 
   
</template> 

<script setup>
import {loadScriptAsyncDefer} from '@/libs/loadScript.js';
import loadScript from '@/libs/loadScript.js'
import {onMounted, ref} from 'vue'
import { useRoute, useRouter } from "vue-router";
import BindTiktokAccountButton from '@/components/button/BindTiktokAccountButton.vue'
import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
import {buyer_search_tiktok_cart} from '@/api_v2/cart'
import {buyer_retrieve_campaign} from '@/api_v2/campaign'


const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
const baseURL = import.meta.env.VITE_APP_WEB
const serverDomain = import.meta.env.VITE_APP_ROOT_API

const buyerStore = useLSSBuyerLayoutStore();
const route = useRoute();
const router = useRouter();

const showAnimate = ref(true)
const showModal = ref(false)
const campaign = ref([])
const recaptchaToken = ref(null)
const customerName = ref('')
const tiktokStore = ref('connecting to Tiktok')
onMounted(()=>{
    loadScript('https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',()=>{
        showAnimate.value=true
    })
    loadRecaptcha()
    retrieveCampaign()
})

const loadRecaptcha = ()=>{
    window.recaptchaOnLoad=()=>grecaptcha.execute();
    window.recaptchaCallBack=recaptchaCallBack
    loadScriptAsyncDefer('https://www.google.com/recaptcha/api.js?onload=recaptchaOnLoad')
}

const recaptchaCallBack = token=>{
    recaptchaToken.value = token
    showAnimate.value = false
}
const searchTiktokCart = ()=>{
    buyer_search_tiktok_cart(recaptchaToken.value, route.params.campaign_id, customerName.value, buyerStore.alert)
    .then(res=>{
        router.push({name:'buyer-shopping-cart-detail-page', params:{cart_oid:res.data}})
    }).catch(err=>{
        setInterval(()=>{location.reload()},1000);
    })
}

const retrieveCampaign = ()=>{
    buyer_retrieve_campaign(route.params.campaign_id).then(res=>{
        // console.log(res.data)
        campaign.value = res.data

        tiktokStore.value = ['', ' ', undefined,null].includes(res.data.tiktok_campaign?.username)? 'connecting to Tiktok':res.data.tiktok_campaign.username
    })
}

</script>


<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.tiktok-login-btn { 
    border: 1px solid rgb(5, 0, 10);
    background-color: #020003;
    padding: auto;
    min-width: 300px;
    min-height: 42px;
    height: 42px;
    border-radius: 42px 42px; 
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-size: 16px;
}


.loading{
  position: absolute;
  top: 45%;
  left: 50%;
  
  .bullet{
    position: absolute;
    padding: $size/2;
    border-radius: 50%;
    background: $color;
    animation: animIn 1s ease-in-out 0s infinite;
    
    $i: 0s;
    @for $level from 0 to $bullets {
      &:nth-child(#{$level + 1}) { animation-delay: $i; }
      $i: $i + $delay;
    }
    
  }
}

@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {
    .loading{
  position: absolute;
  top: 45%;
  left: 50%;
  
  .bullet{
    position: absolute;
    padding: $size/4;
    border-radius: 50%;
    background: $color;
    animation: animIn 1.5s ease-in-out 0s infinite;
    
    $i: 0s;
    @for $level from 0 to $bullets {
      &:nth-child(#{$level + 1}) { animation-delay: $i; }
      $i: $i + $delay;
    }
    
  }
}
}

        
@keyframes animIn {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }    
  
  50%{ opacity: 1; }
  
  100%{
    transform: translateX(100px);
    opacity: 0;
  }
}
</style>

