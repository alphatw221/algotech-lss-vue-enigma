<template>
    <div class="my-5 text-base text-xl sm:text-2xl text-center"> {{$t('order_detail.order')}} </div>

    <div class="flex flex-col sm:flex-row justify-between gap-3 h-fit sm:max-h-[40vh]"> 
        <div class="w-[100%] flex-col"> 
            <div class="w-[100%] mx-2 flex-col flex gap-1">
                <div class="">
                    <h2 class="font-medium"> {{$t('order_detail.order_no')}} #{{store.orderDetail.id}} 
                        <span class="h-8 ml-3 cursor-auto btn btn-rounded-pending">
                        {{$t(`manage_order.${store.orderDetail.status}`) }}</span> </h2>
                </div>
                <div class="">
                    <span class="font-medium mr-5"> {{ store.orderDetail.customer_name }} {{store.orderDetail.platform ? `/ `+store.orderDetail.platform : ''}}</span>
                </div>
                <div class="">
                    <span class="font-medium mr-5"> {{$t('order_detail.order_date')}} : {{new Date(store.orderDetail.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}} </span>
                </div>
            </div>
            <div class="w-[100%] mt-2">
                <OrderDetailTable :order_type="route.query.type"/>
            </div>
        </div>
        <!-- Price Summary End -->
        <!-- Price Summary -->
        <div class="w-[100%]">
            <PriceSummary 
                :order_type="route.query.type" 
                :decimal_places="user_store.userInfo.user_subscription.decimal_places" />
        </div>
    </div>

    <!-- Second -->
    <div class="flex flex-col sm:flex-row gap-3 h-fit mt-3 z-10"> 
        <!-- Delivery Information -->
        <div class="flex-col w-full"> 
            <div class="p-8 sm:my-5 border-2 box border-secondary flex-col flex gap-4"> 
                <span class="text-lg dark:border-darkmode-400">{{$t('order_detail.delivery.information')}}</span>   
                <div class="grid grid-cols-6" v-show="store.orderDetail.shipping_method">
                    <template v-if="store.orderDetail.shipping_method === 'pickup'">
                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.method')}}</div>
                        <div class="col-start-3 col-span-3 py-2">{{$t(`order_detail.delivery.${store.orderDetail.shipping_method}`)}}</div>

                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.pickup_address')}}</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.shipping_option + ' - ' + store.orderDetail.campaign.meta_logistic.pickup_options[store.orderDetail.shipping_option_index].address}}</div>
                    </template>
                    <template v-if="store.orderDetail.shipping_method === 'delivery'">
                        <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.method')}}</span>
                        <span class="col-start-3 col-span-3 py-2">{{$t(`order_detail.delivery.${store.orderDetail.shipping_method}`)}} {{store.orderDetail.shipping_option}}</span>

                        <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.address')}}</span>
                        <span class="col-start-3 col-span-3 py-2">
                            {{store.orderDetail.shipping_address_1}} ,
                            {{store.orderDetail.shipping_location}} ,
                            {{store.orderDetail.shipping_region}} ,
                            {{store.orderDetail.shipping_postcode}}
                        </span>
                    </template>
                </div>
            </div>
            <!-- Remark -->
            <div class="box p-8 border-2 border-secondary flex flex-col gap-3" v-show="store.orderDetail.shipping_remark">
                <span class="text-lg">{{$t('order_detail.remark')}}</span>
                <span class="py-2"> {{store.orderDetail.shipping_remark}} </span>
            </div>
        </div>
        <!-- Payment Information -->
        <div class="flex-col w-full"> 
            <div class="p-8 sm:my-5 border-2 box border-secondary flex-col flex gap-4"> 
                <span class="text-lg"> {{$t('order_detail.payment.information')}}</span>   
                <div class="grid grid-cols-6" v-if="store.orderDetail.payment_method">
                    <template v-if="store.orderDetail.payment_method">
                        <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.method')}}</span>
                        <span class="col-start-3 col-span-3 py-2">
                            {{ store.orderDetail.payment_method == 'Direct Payment' ? `${$t('order_detail.payment.Direct Payment')} - ${store.orderDetail.meta.account_mode}` : store.orderDetail.payment_method }}</span>
                    </template>

                    <template v-if="store.orderDetail.meta.last_five_digit">
                        <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.last_five_digits')}}</span>
                        <span class="col-start-3 col-span-3 py-2">{{store.orderDetail.meta.last_five_digit}}</span>
                    </template>

                    <template v-if="store.orderDetail.meta.receipt_image">
                        <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.record')}}</span>
                        <span class="col-start-3 col-span-3 py-2">
                                <Tippy tag="img" :src="store.orderDetail.meta.receipt_image" />
                        </span>
                    </template>
                </div>
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