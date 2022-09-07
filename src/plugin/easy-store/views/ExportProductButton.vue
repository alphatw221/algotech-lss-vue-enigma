<template>
    <div class="relative">
        <LoadingIcon  v-if="processing" icon="three-dots" color="1a202c" class="absolute h-[30px] w-[30px] sm:w-40 mr-2 sm:mr-0 sm:h-[20px] top-3"/>
        <button 
            v-if="pluginEasyStore"
            @click="exportProduct(EASY_STORE)"
            type="button"
            class="h-[35px] w-[40px] sm:w-40 mr-2 sm:mr-0 sm:h-[50px] text-white font-medium shadow-lg btn btn-warning rounded-full mb-5 border-[2px] border-slate-100" 
            :class="{ 'cursor-not-allowed':processing }"
            >
            <template class="hidden sm:block"><span class="mr-1 text-lg font-bold">+</span> Export From Easy Store </template>

        </button>
        <button 
            v-if="pluginShopify"
            @click="exportProduct(SHOPIFY)"
            type="button"
            class="h-[35px] w-[40px] sm:w-40 mr-2 sm:mr-0 sm:h-[50px] text-white font-medium shadow-lg btn btn-warning rounded-full mb-5 border-[2px] border-slate-100" 
            :class="{ 'cursor-not-allowed':processing }"
            >
            <template class="hidden sm:block"><span class="mr-1 text-lg font-bold">+</span> Export From Shopify </template>

        </button>
    </div>
    
</template>

<script setup>
import { provide, onMounted,ref, computed, watch, getCurrentInstance } from "vue"
import { useRouter ,useRoute} from "vue-router";
import { useCookies } from "vue3-cookies";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import i18n from "@/locales/i18n"
// import { export_product_from_easy_store } from '../api/product'

const { cookies } = useCookies()
const accessToken = cookies.get('access_token')

const route = useRoute();
const router = useRouter();
const store = useLSSSellerLayoutStore();


const userGotPlugin = ref(false)
const pluginEasyStore = ref(false)
const pluginShopify = ref(false)
const processing = ref(false)
const EASY_STORE = 'easy_store'
const SHOPIFY = 'shopify'


onMounted(()=>{
    if (store.userInfo.user_subscription.user_plan?.plugins?.[EASY_STORE]) {
        userGotPlugin.value = true
        pluginEasyStore.value = true
    } else if (store.userInfo.user_subscription.user_plan?.plugins?.[SHOPIFY]) {
        userGotPlugin.value = true
        pluginShopify.value = true
    }
})


const exportProduct = (pluginName)=>{
    processing.value = true
    if (pluginName === EASY_STORE) startWebSocketConnection(true, EASY_STORE)
    else if (pluginName === SHOPIFY) startWebSocketConnection(true, SHOPIFY)
}

const startWebSocketConnection =(init, pluginName)=> {
    const websocket = new WebSocket(
        `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/plugin/${pluginName}/product/export/?token=${accessToken}`
    );

    websocket.onmessage = e =>{
        const data = JSON.parse(e.data);
        console.log(data)
        if(data.type==="response_data"){
            processing.value = true
        } 

        if(data.type==="result_data"){
            if(data.data.result=='complete'){
                location.reload()
            }else{
                store.alert.showMessageToast('export_fail, please try again or contect support team.')
            }
            processing.value = false
            websocket.close(1000);
        } 
    };

    websocket.onopen = e => {
        if(init){
            websocket.send('export')
            console.log('export')
        }else{
            console.log('reconnect')
        }
    };
    websocket.onclose = e => {
        if(e.code!=1000){
            startWebSocketConnection(false, pluginName)
        }
        console.error('socket closed');
        processing.value = false
    };
    websocket.onerror = function(err) {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        websocket.close(1000);
    };
}

</script>
