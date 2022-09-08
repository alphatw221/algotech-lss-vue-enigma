<template>

    <div class="h-full w-full px-5 py-5 md:px-10 md:py-10">

        <div class="mt-12 mb-24" v-if="showAnimate">
            <lottie-player class="mx-auto" src="https://assets10.lottiefiles.com/packages/lf20_vIyvPR.json" loop background="transparent"  speed="1"  style="width: 300px; height: 300px;"   autoplay></lottie-player>
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
import { buyer_create_blank_cart, guest_create_blank_cart } from '@/api_v2/pre_order';
import { get_easy_store_checkout_url } from '@/plugin/easy-store/api/cart.js'
import { get_ordr_startr_checkout_url } from '@/plugin/ordr-startr/api/cart.js'

import { useCookies } from 'vue3-cookies';
import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';

const buyerStore = useLSSBuyerLayoutStore();
const { cookies } = useCookies();
const route = useRoute();
const router = useRouter();
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
const showAnimate = ref(false)

onMounted(()=>{
    loadScript('https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',()=>{
        showAnimate.value=true
    })
    console.log(siteKey)
    if(cookies.get('login_with')!='anonymousUser'){
        const type = route.params.type
        const object_id = route.params.object_id
        if(type=='blank'){
            buyer_create_blank_cart(object_id, cookies.get('login_with')).then(res=>{
                router.push(`/buyer/cart/${res.data.pre_order_oid}`)
            })
        }else{
            loadRecaptcha()
        }
    }else{
        loadRecaptcha()
    }

})

const loadRecaptcha = ()=>{
    window.recaptchaOnLoad=()=>grecaptcha.execute();
    window.recaptchaCallBack=recaptchaCallBack
    loadScriptAsyncDefer('https://www.google.com/recaptcha/api.js?onload=recaptchaOnLoad')
}

const recaptchaCallBack = token=>{

    const type = route.params.type
    const object_id = route.params.object_id
    if(type=='blank'){
        guest_create_blank_cart(object_id, token, cookies.get('client_uuid')).then(response=>{
            console.log(response.data)
            if (!cookies.get('client_uuid')){
                var set_cookie = new Promise((res) => {
                    cookies.set("client_uuid", response.data.client_uuid)
                    res()
                })
                set_cookie.then(() => {
                    router.push(`/buyer/cart/${response.data.pre_order_oid}`)
                })
            } else{
                router.push(`/buyer/cart/${response.data.pre_order_oid}`)
            }
        })
    }else if(type=='easy_store'){

        get_easy_store_checkout_url(object_id, token).then(res=>{window.location.href = res.data})
    }else if(type=='ordr_startr'){
        get_ordr_startr_checkout_url(object_id, token).then(res=>{window.location.href = res.data})
    }
}
</script>

