<template>

    <div class="h-[85vh] w-full relative">
        <div v-if="showAnimate">
            <lottie-player class="mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50" 
                src="https://assets10.lottiefiles.com/packages/lf20_vIyvPR.json" loop background="transparent"  speed="1"  style="width: 300px; height: 300px;"   autoplay></lottie-player>
        </div>
        <template v-if="!showAnimate">
            <div class="flex flex-row lg:gap-10 justify-center py-10"> 
                <!-- <img src="@/assets/images/lss-img/kuaimai-avatar.jpeg" class="h-[80px] lg:h-[130px] rounded-xl lg:ml-20"/>  -->
                <p class="my-auto text-[1.8rem] lg:text-[2rem]"> 買買買</p>
                <LoadingIcon icon="loading_right" class="w-[80px] my-auto lg:w-[120px]"/>
                <img src="@/assets/images/lss-img/tiktok_black_bg.png" class="h-[80px] lg:h-[150px] my-auto"/>
            </div>
            <div class="h-full w-full xl:w-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] font-medium text-primary">
                <div
                    v-if="recaptchaToken" 
                    class="h-1/2 flex flex-col lg:flex-row justify-center lg:divide-x-4 top-1/2 translate-y-1/2"> 
                    
                    <div class="flex w-full h-full lg:p-10 mx-auto">
                        <div class="flex flex-col gap-3 justify-center mx-auto lg:ml-16 relative"> 
                            <label class="text-xl font-medium"> 進入您的專屬購物車</label>
                            <label class="text-lg font-bold mt-3"> 方式一</label>
                            <button class="tiktok-login-btn shadow-lg" @click="bindPage">登入TikTok帳號</button>
                            <label class="text-lg font-bold mt-3"> 方式二</label>
                            <label class="mx-auto">輸入您的TikTok使用者名稱（暱稱）</label>
                            <div class="flex flex-row h-[42px]"> 
                                <input type="text" v-model="customerName" class="rounded-l-lg w-full h-[42px] border-primary ">
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
                            <label class="text-xl font-medium absolute top-0 left-0">直接選購商品</label>
                            <a class="btn btn-primary px-5 w-fit mx-auto hover:text-white"  
                                :href="`${baseURL}/buyer/recaptcha/blank/${route.params.campaign_id}/`"> 前往選購</a>
                            
                        </div>
                    </div>
                </div>
                <!-- <img src="@/assets/images/lss-img/Tiktok_name_exp.png" class="fixed h-[270px] bottom-12 left-[104px] hidden lg:block"/> -->
            </div>
            <div class="absolute text-[32px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"> 
                <lable class="text-slate-600 font-bold h-12 w-12 bg-slate-100 "> 或</lable>
            </div>
        </template>

        <div class="g-recaptcha absolute bottom-10 right-10 z-50"
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
import { ModalHeader } from '../../global-components/modal';


const buyerStore = useLSSBuyerLayoutStore();
const route = useRoute();
const router = useRouter();
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
const baseURL = import.meta.env.VITE_APP_WEB
const showAnimate = ref(true)
const showModal = ref(false)

const recaptchaToken = ref(null)
const customerName = ref('')
onMounted(()=>{
    loadScript('https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',()=>{
        showAnimate.value=true
    })
    loadRecaptcha()
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
</script>


<style scoped>
.tiktok-login-btn { 
    border: 1px solid rgb(5, 0, 10);
    background-color: #020003;
    padding: auto;
    min-width: 300px;
    height: 42px;
    border-radius: 42px 42px; 
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-size: 16px;
}

.body-middle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 60px;
    height: 60px;
}
</style>