<template>

    <div class="relative my-auto ml-auto" v-if="userGotPlugin">
        <LoadingIcon  v-if="processing" icon="three-dots" color="1a202c" class="absolute h-[30px] w-[20px] sm:w-32 mr-2 sm:mr-0 sm:h-[20px] top-3 "/>
        <button 
            @click="exportOrderFromEasyStore()"
            type="button"
            class="p-2 mr-1 flex items-center btn btn-outline-primary w-fit h-[35px] sm:h-[42px]" 
            :class="{ 'cursor-not-allowed':processing }"
            >
            <template class="block whitespace-nowrap">Sync EasyStore Order</template>
        </button>
    </div>
    
</template>

<script setup>
import { provide, onMounted,ref, computed, watch, getCurrentInstance } from "vue"
import { useRouter ,useRoute} from "vue-router";
import { useCookies } from "vue3-cookies";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import i18n from "@/locales/i18n"


const { cookies } = useCookies()
const accessToken = cookies.get('access_token')

const route = useRoute();
const router = useRouter();
const store = useLSSSellerLayoutStore();


const userGotPlugin = ref(false)
const processing = ref(false)
const EASY_STORE = 'easy_store'

onMounted(()=>{if(store.userInfo.user_subscription.user_plan?.plugins?.[EASY_STORE])userGotPlugin.value = true})


const exportOrderFromEasyStore = ()=>{
    processing.value = true
    startWebSocketConnection(true)
}

const startWebSocketConnection =(init)=> {
  const websocket = new WebSocket(
      `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/plugin/easy_store/order/export/${route.params.campaign_id}/?token=${accessToken}`
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
