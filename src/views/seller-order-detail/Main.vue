<template>
<div>
    <div class="my-5 text-base text-2xl text-center"> {{$t('order_detail.order')}} </div>

    <div class="grid grid-cols-12 gap-4 h-fit">
        <div class="col-span-12 lg:col-span-6 h-fit">
                <div class="w-full mx-2 ">
                    <div class="flex mb-2">
                        <h2 class="font-medium"> {{$t('order_detail.order_no')}} #{{store.orderDetail.id}} <span class="h-8 ml-3 cursor-auto btn btn-rounded-pending">
                                {{$t(`manage_order.${store.orderDetail.status}`) }}</span> </h2>
                    </div>
                    <div class="flex mb-2">
                        <span class="font-medium mr-5"> {{ store.orderDetail.customer_name }} {{store.orderDetail.platform ? `/ `+store.orderDetail.platform : ''}}</span>
                    </div>
                    <div class="flex mb-2">
                        <span class="font-medium mr-5"> {{$t('order_detail.order_date')}} : {{new Date(store.orderDetail.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}} </span>
                    </div>
                </div>
            <div class="w-full">
                <OrderDetailTable :order_type="route.query.type"/>
            </div>
            <!-- Delivery Information -->
            <div class="p-5 mt-5 border-2 box border-secondary"> 
                <div class="flex mb-4 dark:border-darkmode-400">
                    <span class="text-lg">{{$t('order_detail.delivery.information')}}</span>   
                </div>
                <div class="grid grid-cols-6 gap-2" v-show="store.orderDetail.shipping_method">

                    <template v-if="store.orderDetail.shipping_method === 'pickup'">
                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.method')}}</div>
                        <div class="col-start-3 col-span-3 py-2">{{$t(`order_detail.${store.orderDetail.shipping_method}`)}}</div>

                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.pickup_address')}}</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.shipping_option + ' - ' + store.orderDetail.pickup_address}}</div>
                    </template>
                    <template v-if="store.orderDetail.shipping_method === 'delivery'">
                        <div class="col-start-1 col-span-2 py-3">{{$t('order_detail.delivery.method')}}</div>
                        <div class="col-start-3 col-span-3 py-3">{{$t(`order_detail.${store.orderDetail.shipping_method}`)}} {{store.orderDetail.shipping_option}}</div>

                        <div class="col-start-1 col-span-2 py-3">{{$t('order_detail.delivery.address')}}</div>
                        <div class="col-start-3 col-span-3 py-3">
                            {{store.orderDetail.shipping_address_1}} ,
                            {{store.orderDetail.shipping_location}} ,
                            {{store.orderDetail.shipping_region}} ,
                            {{store.orderDetail.shipping_postcode}}
                            
                        </div>
                    </template>
                </div>
            </div>
            <!-- Delivery Information End -->
            <!-- Remark -->
            <div class="box p-5 border-2 border-secondary" v-show="store.orderDetail.shipping_remark">
                <span class="text-lg">{{$t('order_detail.remarks')}}</span>
                <div>
                    {{store.orderDetail.shipping_remark}}
                </div>
            </div>
            <!-- Remark End -->
        </div>
        <div class="col-span-12 lg:col-span-6">
            <!-- Price Summary -->
            <div>
                <PriceSummary 
                    :order_type="route.query.type" 
                    :decimal_places="user_store.userInfo.user_subscription.decimal_places" />
            </div>
            <!-- Price Summary End -->
            <!-- Payment Information -->
            <div class="p-5 mt-5 border-2 box border-secondary"> 
                <div class="flex mb-4 dark:border-darkmode-400">
                    <span class="text-lg"> {{$t('order_detail.payment.information')}}</span>   
                </div>
                <div class="grid grid-cols-6 gap-2" v-if="store.orderDetail.payment_method">
                    <template v-if="store.orderDetail.payment_method">
                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.method')}}</div>
                        <div class="col-start-3 col-span-3 py-2">{{ store.orderDetail.payment_method == 'Direct Payment' ? `Direct Payment - ${store.orderDetail.meta.account_mode}` : store.orderDetail.payment_method }}</div>
                    </template>

                    <template v-if="store.orderDetail.meta.last_five_digit">
                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.last_five_digits')}}</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.meta.last_five_digit}}</div>
                    </template>

                    <template v-if="store.orderDetail.meta.receipt_image">
                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.record')}}</div>
                        <div class="col-start-3 col-span-3 py-2">
                                <Tippy tag="img" :src="store.orderDetail.meta.receipt_image" />
                        </div>
                    </template>
                </div>
            </div>
            <!-- Payment Information End -->
        </div>
    </div>    
</div>
</template>
<script setup>
import OrderDetailTable from "./OrderDetailTable.vue";
import PriceSummary from "./PriceSummary.vue"
import OrderSummary from "@/components/box/OrderSummary.vue";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { seller_retrieve_pre_order } from "@/api_v2/pre_order";
import { seller_retrieve_order } from "@/api_v2/order";
import { useSellerOrderStore } from "@/stores/lss-seller-order";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const store = useSellerOrderStore()
const user_store = useLSSSellerLayoutStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus



onMounted(()=>{
    // console.log(route.query.type)
    get_order()
})

function get_order(){
    if (route.query.type === 'pre_order'){
        seller_retrieve_pre_order(route.params.order_id)
        .then(
            res => { store.orderDetail = res.data
                     console.log(store.orderDetail) 
                     show_adjust_price() }
        )
    }else{
        seller_retrieve_order(route.params.order_id)
        .then(
            res => { store.orderDetail = res.data
                    console.log(store.orderDetail)
                    store.modify_status = '+'
            }
        )
    }
}

function show_adjust_price(){
    if( store.orderDetail.adjust_price < 0 ){
        store.modify_status = '-'
        store.orderDetail.adjust_price = Math.abs(store.orderDetail.adjust_price)
    }else{
        store.modify_status = '+'
    }
}
</script>


<style scoped>
td {  
    width: 100px;
    height: 30px;
    border: 1px solid gray;
}

</style>