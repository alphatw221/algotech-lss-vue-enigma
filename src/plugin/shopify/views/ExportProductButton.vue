<template>
    <div class="relative">
        <button 
            v-if="hasPlugin"
            @click="exportProduct()"
            type="button"
            class="h-[35px] w-48 mr-2 sm:mr-0 sm:h-[50px] text-white font-medium shadow-lg btn btn-warning rounded-full mb-5 sm:mb-0 border-[2px] border-slate-100" 
            :class="{ 'cursor-not-allowed':processing }"
            >
            <LoadingIcon  v-if="processing" icon="three-dots" color="white" class="absolute h-[30px] w-[30px] sm:w-40 mr-2 sm:mr-0 sm:h-[20px] top-4"/>
            <template v-else-if="!processing"> 
                <font-awesome-icon icon="fa-solid fa-arrows-rotate" class="relative h-5 mb-0.5 mr-2" width="19" color="white"/>
                <!-- <SimpleIcon class="h-5 mb-0.5 mr-2" width="19" icon="export" color="white" />  -->
                <div>Sync Shopify Product </div>
            </template>
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


const hasPlugin = ref(false)
const processing = ref(false)
const SHOPIFY = 'shopify'


onMounted(()=>{
    if (store.userInfo.user_subscription.user_plan?.plugins?.[SHOPIFY]) {
        hasPlugin.value = true
    }
})

const exportProduct = ()=>{
    processing.value = true
    startWebSocketConnection(true)
}

const startWebSocketConnection =(init)=> {
    const websocket = new WebSocket(
        `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/plugin/shopify/product/export/?token=${accessToken}`
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
            startWebSocketConnection(false)
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
