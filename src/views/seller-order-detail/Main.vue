<template>
    <div class="my-5 text-base text-xl sm:text-2xl text-center"> {{$t('order_detail.order')}} </div>
    <div class="w-[100%] mx-2 flex-col flex gap-1">
        <div class="my-auto">
            <h2 class="text-xl font-semibold"> #{{sellerOrderDetail.order.id}} 
                <span class="h-8 ml-3 cursor-auto btn btn-rounded-pending text-base">
                    {{$t(`manage_order.${sellerOrderDetail.order.status}`) }}
                </span> 
                <button class="btn btn-warning h-8 ml-3 text-base" @click="cancelOrder()">{{ 'Cancel' }}</button>
                <button class="btn btn-danger h-8 ml-3 text-base" @click="deleteOrder()">{{ $t('order.delete') }}</button>

            </h2>
            <div class="flex flex-row sm:w-[50%]">
                <div class="my-auto">
                    <span class="text-base"> {{$t('order_detail.order_date')}} : {{new Date(sellerOrderDetail.order.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}} </span>
                </div>
            </div>

        </div>

        <div class="flex flex-row flex-wrap items-center content-center mt-2">
            <label > Buyer :</label>
            <SearchSelect class="w-[300px] ml-3"
                :initialName="sellerOrderDetail?.order?.buyer_name||''" 
                v-model="sellerOrderDetail.order.buyer" 
                :searchFunction="searchCustomerFunction" 
                :optionNameKeys="['name','email']" 
                :optionValueKey="'id'"
                :placeholder="'Search by Name/Email'"
                @_select="sellerUpdateOrderBuyer($event)"
            />

        </div>

       
        
    </div>

    


    <div class="flex flex-col sm:flex-row justify-between gap-3 h-fit sm:max-h-[50vh]"> 

        <!-- OrderDetailTable -->
        <div class="flex-col mt-2 w-[100%] sm:w-1/2"> 
            <OrderDetailTable />
        </div>


        <!-- Price Summary -->
        <div class="w-[100%] sm:w-1/2">
            <PriceSummary />
        </div>

    </div>

    <!-- Second -->
    <div class="flex flex-col sm:flex-row gap-3 h-fit mt-1 z-10"> 
        <!-- Delivery Information -->
        
        <!-- <DeliveryInfoCard /> -->
        <div class="p-8 sm:my-3 border-2 box border-secondary flex-col flex w-full"> 

            <DeliveryInfo2
                :store="sellerOrderDetail"
                :layout_store="layoutStore"
                :role="'seller'"

            />
        </div>


        <!-- Payment Info -->
        <PaymentInfoCard />
    </div>
    <!-- <AddItemModal/> -->
</template>

<script setup>
// import AddItemModal from "./AddItemModal.vue";
import OrderDetailTable from "./OrderDetailTable.vue";
import PriceSummary from "./PriceSummary.vue"
import OrderSummary from "@/components/box/OrderSummary.vue";
import DeliveryInfoCard from "./DeliveryInfoCard.vue"
import PaymentInfoCard from "./PaymentInfoCard.vue"
import DeliveryInfo2 from "./DeliveryInfo2.vue"

import { computed, onMounted, onBeforeMount, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { seller_search_campaign_product} from "@/api_v2/campaign_product";
import { seller_retrieve_pre_order } from "@/api_v2/pre_order";
import { seller_retrieve_cart } from "@/api_v2/cart"
import { seller_retrieve_order, seller_delete_order, seller_update_buyer, seller_back_to_cart } from "@/api_v2/order";
import { useSellerOrderStore } from "@/stores/lss-seller-order";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";

import { list_buyers } from "@/api_v2/user_subscription"

import i18n from "@/locales/i18n";

const editReceiver = ref(false)
const orderData = ref({})

const route = useRoute()
const router = useRouter()
const sellerOrderDetail = useSellerOrderStore()
const layoutStore = useLSSSellerLayoutStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus


onBeforeMount(()=>{
    if (layoutStore.userInfo.user_subscription.status === "test") router.push({ name: 'campaign-list'})
})

onMounted(()=>{
    sellerOrderDetail.order = {}
    seller_retrieve_order(route.params.order_id, layoutStore.alert)
    .then(
        res => { sellerOrderDetail.order = res.data

            console.log(sellerOrderDetail.order)
        }
    )
})

const deleteOrder = ()=>{
    if(confirm(i18n.global.t(`order.confirm_delete`))){
        seller_delete_order(route.params.order_id, layoutStore.alert)
        .then(res=>{
            router.push({name:'manage-campaign-order', params:{campaign_id:route.params.campaign_id}})

        })
    }
    
}


const cancelOrder = ()=>{
    if(confirm(i18n.global.t(`order.confirm_cancel`))){

        seller_back_to_cart(route.params.order_id, layoutStore.alert)
        .then(res=>{
            router.go(-1)
        })
    }
}


const searchCustomerFunction = (text, routeParams)=>{
    return list_buyers(text, 1, 20, layoutStore.alert)
}

const sellerUpdateOrderBuyer = (buyer_id)=>{
    console.log(buyer_id)
    seller_update_buyer(route.params.order_id, buyer_id, layoutStore.alert).then(res=>{
        console.log(res.data)
    })
}
</script>


<style scoped>
td {  
    width: 100px;
    height: 30px;
    border: 1px solid gray;
}

</style>