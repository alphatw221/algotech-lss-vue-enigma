<template>
    <div class="my-5 text-base text-xl sm:text-2xl text-center"> {{$t('order_detail.order')}} </div>
    <div class="w-[100%] mx-2 flex-col flex gap-1">
        <div class="my-auto">
            <h2 class="text-xl font-semibold"> #{{store.orderDetail.id}} 
                <span class="h-8 ml-3 cursor-auto btn btn-rounded-pending text-base" v-if="route.query.type == 'cart'">
                    Cart
                </span> 
                <span class="h-8 ml-3 cursor-auto btn btn-rounded-pending text-base" v-else>
                    {{$t(`manage_order.${store.orderDetail.status}`) }}
                </span> 
            </h2>
        </div>
        <div v-if="store.orderDetail.customer_name" class="my-auto">
            <span class="text-base mr-5"> {{ store.orderDetail.customer_name }} {{store.orderDetail.platform ? `/ `+ $t('order_detail.'+ store.orderDetail.platform) : ''}}</span>
        </div>
        <div class="my-auto" v-if="route.query.type != 'cart'">
            <span class="text-base mr-5 break-all">{{$t('order_detail.delivery.email')}} : {{store.orderDetail.shipping_email}}</span>
        </div>
        <div class="my-auto" v-if="route.query.type != 'cart'">
            <span class="text-base mr-5">{{$t('order_detail.delivery.phone')}} : {{store.orderDetail.shipping_phone}}</span>
        </div>
        <div class="flex flex-row sm:w-[50%]">
            <div class="my-auto">
                <span class="text-base"> {{$t('order_detail.order_date')}} : {{new Date(store.orderDetail.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}} </span>
            </div>
            <div class="ml-auto" v-if="route.query.type !== 'order'">
                <button
                    class="btn w-32 border-slate-300 dark:border-darkmode-400"
                    @click="store.showAddItemModal = ! store.showAddItemModal"
                >
                    + {{$t('shopping_cart.order_summary.add_item')}}
                </button>
            </div>
        </div>
    </div>
    <div class="flex flex-col sm:flex-row justify-between gap-3 h-fit sm:max-h-[50vh]"> 

        <!-- OrderDetailTable -->
        <div class="flex-col mt-2 w-[100%] sm:w-1/2"> 
            <CartDetailTable v-if="route.query.type=='cart'"/>
            <OrderDetailTable v-else :order_type="route.query.type"/>
        </div>
        <!-- OrderDetailTable -->

        <!-- Price Summary -->
        <div class="w-[100%] sm:w-1/2">
            <CartSummary v-if="route.query.type=='cart'"/>
            <PriceSummary v-else :order_type="route.query.type"  />
        </div>
        <!-- Price Summary End -->
    </div>

    <!-- Second -->
    <div class="flex flex-col sm:flex-row gap-3 h-fit mt-1 z-10"> 
        <!-- Delivery Information -->
        <DeliveryInfoCard v-if="route.query.type != 'cart'"/>
        <!-- <div class="flex-col w-full"> 
            <div class="p-8 sm:my-3 border-2 box border-secondary flex-col flex gap-4"> 
                <span class="text-lg dark:border-darkmode-400">{{$t('order_detail.delivery.information')}}</span>   
                <div class="grid grid-cols-6" v-show="store.orderDetail.shipping_method">
                    <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.name')}}</div>
                    <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.shipping_first_name}} {{store.orderDetail.shipping_last_name}}</div>
                    
                    <template v-if="store.orderDetail.shipping_phone">
                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.phone')}}</div>
                        <div class="col-start-3 col-span-3 py-2">{{store.orderDetail.shipping_phone}}</div>
                    </template>

                    <template v-if="store.orderDetail.shipping_email">
                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.email')}}</div>
                        <div class="col-start-3 col-span-3 py-2 break-all">{{store.orderDetail.shipping_email}}</div>
                    </template>

                    <template v-if="store.orderDetail.shipping_method === 'pickup'">
                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.method')}}</div>
                        <div class="col-start-3 col-span-3 py-2">{{$t(`order_detail.delivery.${store.orderDetail.shipping_method}`)}}</div>

                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.pickup_address')}}</div>
                        
                        <div class="col-start-3 col-span-3 py-2" v-if="store.orderDetail.campaign">{{store.orderDetail.campaign.meta_logistic.pickup_options[store.orderDetail.shipping_option_index].name + ' - ' + store.orderDetail.campaign.meta_logistic.pickup_options[store.orderDetail.shipping_option_index].address}}</div>
                    </template>
                    <template v-if="store.orderDetail.shipping_method === 'delivery'">
                        <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.method')}}</span>
                        <span class="col-start-3 col-span-3 py-2">{{$t(`order_detail.delivery.${store.orderDetail.shipping_method}`)}}：{{ store.orderDetail.shipping_option == '' ? $t('order_detail.delivery.default') : store.orderDetail.shipping_option }}</span>

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

            <div class="box p-8 border-2 border-secondary flex flex-col gap-3 mt-2" v-show="store.orderDetail.shipping_remark">
                <span class="text-lg">{{$t('order_detail.remark')}}</span>
                <span class="py-2"> {{store.orderDetail.shipping_remark}} </span>
            </div>
        </div> -->

        <!-- Payment Information -->
        <PaymentInfoCard v-if="route.query.type != 'cart'"/>
        <!-- <div class="flex-col w-full"> 
            <div class="p-8 sm:my-5 border-2 box border-secondary flex-col flex gap-4"> 
                <span class="text-lg"> {{$t('order_detail.payment.information')}}</span>   
                <div class="grid grid-cols-6" v-if="store.orderDetail.payment_method">
                    <template v-if="store.orderDetail.payment_method">
                        <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.method')}}</span>
                        <span class="col-start-3 col-span-3 py-2">
                            {{ store.orderDetail.payment_method == 'Direct Payment'||'direct_payment' ? `${$t('order_detail.payment.Direct Payment')} - ${store.orderDetail.meta.account_mode}` : store.orderDetail.payment_method }}</span>
                    </template>

                    <template v-if="store.orderDetail">
                        <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.last_five_digits')}}</span>
                        <div v-if="store.orderDetail.meta.last_five_digit == '' && !store.orderDetail.meta.receipt_image" class="col-start-3 col-span-3 py-2">{{$t('order_detail.payment.no_record')}} </div>
                        <span v-else  class="col-start-3 col-span-3 py-2">{{store.orderDetail.meta.last_five_digit}}</span>
                    </template>

                    <template v-if="store.orderDetail.meta.receipt_image">
                        <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.record')}}</span>
                        <span class="col-start-3 col-span-3 py-2">
                                <Tippy tag="img" :src="store.orderDetail.meta.receipt_image" />
                        </span>
                    </template>
                </div>
            </div>
        </div> -->
    </div>
    <AddItemModal/>
</template>

<script setup>
import AddItemModal from "./AddItemModal.vue";
import OrderDetailTable from "./OrderDetailTable.vue";
import CartDetailTable from "./CartDetailTable.vue"
import PriceSummary from "./PriceSummary.vue"
import CartSummary from "./CartSummary.vue";
import DeliveryInfoCard from "./DeliveryInfoCard.vue"
import PaymentInfoCard from "./PaymentInfoCard.vue"
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { seller_list_campaign_product } from "@/api_v2/campaign_product";
import { seller_retrieve_pre_order } from "@/api_v2/pre_order";
import { seller_retrieve_cart } from "@/api_v2/cart"
import { seller_retrieve_order } from "@/api_v2/order";
import { useSellerOrderStore } from "@/stores/lss-seller-order";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";


const route = useRoute()
const store = useSellerOrderStore()
const layoutStore = useLSSSellerLayoutStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus



onMounted(()=>{
    // console.log(route.params)
    // get_order()



    if (route.query.type === 'cart'){
        seller_retrieve_cart(route.params.order_id, layoutStore.alert)
        .then(
            res => { store.orderDetail = res.data
                console.log(res.data)
                    //  console.log(store.orderDetail) 
                    //  show_adjust_price() 
            }
        )

        var _campaign_id, _type, _toastify
        seller_list_campaign_product(_campaign_id = route.params.campaign_id, _type='all', _toastify=layoutStore.alert).then(
            res=>{
                store.campaignProducts = res.data
            }
        )
    }
    else if (route.query.type === 'pre_order'){
        seller_retrieve_pre_order(route.params.order_id, layoutStore.alert)
        .then(
            res => { store.orderDetail = res.data
                    //  console.log(store.orderDetail) 
                    //  show_adjust_price() 
            }
        )
        seller_list_campaign_product(_campaign_id = route.params.campaign_id, _type='all', _toastify=layoutStore.alert).then(
            res=>{
                store.campaignProducts = res.data
            }
        )
    }
    else{
        seller_retrieve_order(route.params.order_id, layoutStore.alert)
        .then(
            res => { store.orderDetail = res.data
                    // console.log(store.orderDetail)
                    // store.modify_status = '+'
            }
        )
    }



})



</script>


<style scoped>
td {  
    width: 100px;
    height: 30px;
    border: 1px solid gray;
}

</style>