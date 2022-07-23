<template>
    <!-- OUTTER BOX -->
    <div class="grid grid-cols-12 grid-rows-6 gap-3 h-fit lg:h-[90vh]">

        <!-- BEGIN: Comments -->
        <LiveComments/>
        <!-- END: Comments -->

        <!-- BEGIN: Product -->
        <LiveProduct  />
        <!-- END: Product -->

        <!-- BEGIN: Incoming Order -->
        <IncomingOrder />
        <!-- END: Incoming Order -->
        
        <ReplyModal/>
        <InstantlyAddProductModal /> 
        <AddProductFromStockModal />


    </div>
</template>

<script setup>

import LiveComments from '@/components/campaign/LiveComments.vue';
import LiveProduct from '@/components/campaign/LiveProduct.vue';
import IncomingOrder from '@/components/campaign/IncomingOrder.vue';

import InstantlyAddProductModal from '@/components/campaign/modals/InstantlyAddProductModal.vue';
import AddProductFromStockModal from '@/components/campaign/modals/AddProductFromStockModal.vue';
import ReplyModal from '@/components/campaign/modals/ReplyModal.vue';

import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";

const store = useCampaignDetailStore()
const { cookies } = useCookies();
const router = useRouter();
const route = useRoute()

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

let webSocket = null

onMounted(()=>{
    initWebSocketConnection()
})

onUnmounted(()=>{
    webSocket.close(1000)
})

const initWebSocketConnection=()=>{
    webSocket = new WebSocket(
        `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/campaign/${route.params.campaign_id}/?token=${cookies.get('access_token')}`
    );
    webSocket.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log(message)
        handleSocketMessage(message)
    };
    webSocket.onopen = e => {
        console.log('connected')
    };
    webSocket.onclose = e => {
        if(e.code!=1000){
            initWebSocketConnection()
        }
        console.error('Chat socket closed unexpectedly');
        
    };
    webSocket.onerror = err => {
        console.error(err)
         webSocket.close(1000);
    };
}

const handleSocketMessage = message=>{

    if(message.type=='comment_data'){
        eventBus.emit("insert_all_comment", message.data)
        eventBus.emit(`insert_commentSummarize_comment`, message.data)
        eventBus.emit(`insert_${message.data.platform}_comment`, message.data)
    }else if (message.type == 'product_data'){
        const index = store.campaignProducts.findIndex(product => product.id === message.data.id)

        console.log(store.campaignProducts)

        if(store.campaignProducts[index]){
            store.campaignProducts[index]["qty_sold"] = message.data.qty_sold
            store.campaignProducts[index]["qty_add_to_cart"] = message.data.qty_add_to_cart
        }
        
    }else if (message.type == 'order_data'){
        store.incomingOrders.unshift(message.data)
    }

}

</script>