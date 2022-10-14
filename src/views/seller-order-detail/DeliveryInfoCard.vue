<template>
    <!-- Delivery Information -->
    <div class="flex-col w-full"> 
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
        <!-- Remark -->
        <div class="box p-8 border-2 border-secondary flex flex-col gap-3 mt-2" v-show="store.orderDetail.shipping_remark">
            <span class="text-lg">{{$t('order_detail.remark')}}</span>
            <span class="py-2"> {{store.orderDetail.shipping_remark}} </span>
        </div>
    </div>
</template>

<script setup>
import { useSellerOrderStore } from "@/stores/lss-seller-order";
const store = useSellerOrderStore()

</script>