<template>
    <!-- OUTTER BOX -->
    <div class="flex flex-col md:flex-row gap-3 h-full lg:h-[90vh] mt-10 md:mt-0">

        <!-- BEGIN: Comments -->
        <LiveComments/>
        <!-- END: Comments -->

        <div class="flex flex-col 2xl:flex-row gap-3 w-full md:w-1/2 2xl:w-2/3 h-fit md:h-full"> 
            <!-- BEGIN: Product -->
            <LiveProduct  />
            <!-- END: Product -->

            <!-- BEGIN: Incoming Order -->
            <IncomingOrder />
            <!-- END: Incoming Order -->
        </div>
        <ReplyModal :key="campaignDetailStore.campaign"/>
        <ConversationModal :key="campaignDetailStore.campaign"/>
        <InstantlyAddProductModal /> 
        <AddProductFromStockModal />

    </div>
</template>

<script setup>

import LiveComments from '@/components/campaign/LiveComments.vue';
import LiveProduct from '@/components/campaign/LiveProduct.vue';
import IncomingOrder from '@/components/campaign/IncomingOrder.vue';

import InstantlyAddProductModal from '@/components/campaign/modals/InstantlyAddProductModal.vue';
import AddProductFromStockModal from '@/components/campaign/modals/AddProductFromStockModal_2.vue';
import ReplyModal from '@/components/campaign/modals/ReplyModal.vue';
import ConversationModal from '@/components/campaign/modals/ConversationModal.vue';

import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { retrieve_campaign } from '@/api_v2/campaign';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const sellerStore = useLSSSellerLayoutStore();
const campaignDetailStore = useCampaignDetailStore()
const { cookies } = useCookies();
const router = useRouter();
const route = useRoute()

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

let webSocket = null

onMounted(()=>{
    initWebSocketConnection()
    retrieve_campaign(route.params.campaign_id, sellerStore.alert).then(res=>{
		campaignDetailStore.campaign = res.data
        console.log(res.data.end_at)
        let now = new Date()
        let isCapturable = res.data.end_at ? new Date(res.data.end_at) > now : false
        if (isCapturable) {
            console.log("insert capture data")
            if(sellerStore.commentCapturingCampaignData?.id!=res.data.id) sellerStore.commentCapturingCampaignData = res.data
        }
	})
    
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
        const index = campaignDetailStore.campaignProducts.findIndex(product => product.id === message.data.id)

        console.log(campaignDetailStore.campaignProducts)

        if(campaignDetailStore.campaignProducts[index]){
            campaignDetailStore.campaignProducts[index]["qty_sold"] = message.data.qty_sold
            campaignDetailStore.campaignProducts[index]["qty_pending_payment"] = message.data.qty_pending_payment
            campaignDetailStore.campaignProducts[index]["qty_add_to_cart"] = message.data.qty_add_to_cart
            const campaignProduct = JSON.parse(JSON.stringify(campaignDetailStore.campaignProducts[index]))
            campaignDetailStore.campaignProducts.splice(index,1)
            campaignDetailStore.campaignProducts.unshift(campaignProduct)
        }
        
    }else if (message.type == 'cart_data'){

        const cart_data = message.data
        campaignDetailStore.incomingOrdersDict[cart_data.id]=cart_data
    }
    // else if (message.type == 'order_data'){
    //     const order_data = message.data
    //     campaignDetailStore.incomingOrdersDict[order_data.id]=order_data
    //     // campaignDetailStore.incomingOrders.unshift(message.data)
    // }

}

</script>

<style scoped>

.lss-content{
    padding-right: 0px !important;    
}
</style>