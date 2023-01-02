<template>

    <div class="h-full w-full px-5 py-5 md:px-10 md:py-10">

        <div class="mt-12 mb-24" v-if="showAnimate">
            <lottie-player class="mx-auto" src="https://assets10.lottiefiles.com/packages/lf20_vIyvPR.json" loop background="transparent"  speed="1"  style="width: 300px; height: 300px;"   autoplay></lottie-player>
        </div>

        <div v-if="recaptchaToken">
            <label >您的抖音名稱（暱稱 ）</label>
            <input type="text" v-model="customerName">
            <button class="btn" @click="searchTiktokCart()">確定</button>
        </div>
        
        <div class="g-recaptcha"
            :data-sitekey="siteKey"
            data-callback="recaptchaCallBack"
            data-size="invisible"
            data-badge="inline"
            >
        </div>
    </div>
    

   
</template>

<script setup>
import {loadScriptAsyncDefer} from '@/libs/loadScript.js';
import loadScript from '@/libs/loadScript.js'
import {onMounted, ref} from 'vue'
import { useRoute, useRouter } from "vue-router";


import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';

import {buyer_search_tiktok_cart} from '@/api_v2/cart'


const buyerStore = useLSSBuyerLayoutStore();
const route = useRoute();
const router = useRouter();
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
const showAnimate = ref(false)

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

