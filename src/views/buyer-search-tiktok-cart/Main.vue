<template>

    <div class="h-[85vh] w-full relative">
        <div v-if="showAnimate">
            <lottie-player class="mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50" 
                src="https://assets10.lottiefiles.com/packages/lf20_vIyvPR.json" loop background="transparent"  speed="1"  style="width: 300px; height: 300px;"   autoplay></lottie-player>
        </div>
        <template v-if="!showAnimate">
            <div class="flex flex-row lg:gap-10 justify-center py-10"> 
                <img src="@/assets/images/lss-img/kuaimai-avatar.jpeg" class="h-[80px] lg:h-[130px] rounded-xl lg:ml-20"/> 
                <LoadingIcon icon="loading_right" class="w-[80px] my-auto lg:w-[120px]"/>
                <img src="@/assets/images/lss-logo/LSS_logo_words.png" class="h-[80px] lg:h-[120px] my-auto"/>
            </div>
            <div class="h-full w-full xl:w-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] font-medium text-primary">
                <div
                    v-if="recaptchaToken" 
                    class="h-1/2 flex flex-col lg:flex-row justify-center lg:divide-x-4 top-1/2 translate-y-1/2"> 
                    
                    <div class="flex w-full h-full lg:p-10 mx-auto">
                        <div class="flex flex-col gap-3 justify-center mx-auto lg:ml-16 relative"> 
                            <label class="">輸入您的抖音名稱（暱稱）以帶入 +1 商品</label>
                            <input type="text" v-model="customerName" class="rounded-lg w-[300px] h-[42px]">
                            <button class="btn btn-primary w-fit px-5 mx-auto sm:ml-auto" @click="searchTiktokCart()">確認</button>

                            <a class="sm:hidden mx-auto underline text-slate-600 my-8" @click="showModal=true"> 找不到暱稱?</a>
                        </div>
                    </div>
                    <div class="flex justify-center w-full border-t-2 border-slate-500 dark:border-darkmode-400 my-8 lg:hidden">
                        <div class="px-5 -mt-3 bg-slate-100 dark:bg-darkmode-600 text-slate-500 text-[20px]">
                            或
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 w-full justify-center lg:p-10 mt-4 lg:mt-0"> 
                        <label class="mx-auto">直接選購商品</label>
 
                            <a class="btn btn-primary w-fit px-5 mx-auto hover:text-white"  
                                :href="`${baseURL}/buyer/recaptcha/blank/${route.params.campaign_id}/`"> 前往選購</a>
                    </div>
                </div>
                <img src="@/assets/images/lss-img/Tiktok_name_exp.png" class="fixed h-[270px] bottom-12 left-[104px] hidden lg:block"/>
            </div>
            <div class="absolute text-[32px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"> 
                <lable class="text-slate-600 font-bold h-10 w-10 bg-slate-100 "> 或</lable>
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
