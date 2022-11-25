<template>
    <!-- Delivery Information -->
    <div class="flex-col w-full"> 
        <div class="p-8 sm:my-3 border-2 box border-secondary flex-col flex gap-4"> 
            <div>
                <span class="text-lg dark:border-darkmode-400">{{$t('order_detail.delivery.information')}}</span>   
            </div>
            

            <div class="grid grid-cols-6" v-show="sellerOrderDetailStore.order.shipping_method">
                <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.name')}}</div>
                <div class="col-start-3 col-span-3 py-2">{{sellerOrderDetailStore.order.shipping_first_name}} {{sellerOrderDetailStore.order.shipping_last_name}}</div>
                
                <template v-if="sellerOrderDetailStore.order.shipping_phone">
                    <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.phone')}}</div>
                    <div class="col-start-3 col-span-3 py-2">{{sellerOrderDetailStore.order.shipping_phone}}</div>
                </template>

                <template v-if="sellerOrderDetailStore.order.shipping_email">
                    <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.email')}}</div>
                    <div class="col-start-3 col-span-3 py-2 break-all">{{sellerOrderDetailStore.order.shipping_email}}</div>
                </template>

                <template v-if="sellerOrderDetailStore.order.shipping_method === 'pickup'">
                    <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.method')}}</div>
                    <div class="col-start-3 col-span-3 py-2">{{$t(`order_detail.delivery.${sellerOrderDetailStore.order.shipping_method}`)}}
                    {{sellerOrderDetailStore.order.shipping_date_time!==null?'('+new Date(sellerOrderDetailStore.order.shipping_date_time).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric",hour: '2-digit', minute: '2-digit'})+')':''}}
                    </div>

                    <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.pickup_address')}}</div>
                    
                    <div class="col-start-3 col-span-3 py-2" v-if="campaignDetailStore.campaign">{{campaignDetailStore.campaign.meta_logistic?.pickup_options?.[sellerOrderDetailStore.order.shipping_option_index]?.name + ' - ' + campaignDetailStore.campaign.meta_logistic?.pickup_options?.[sellerOrderDetailStore.order.shipping_option_index]?.address}}</div>
                </template>
                <template v-if="sellerOrderDetailStore.order.shipping_method === 'delivery'">
                    <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.method')}}</span>
                    <span class="col-start-3 col-span-5 py-2">{{$t(`order_detail.delivery.${sellerOrderDetailStore.order.shipping_method}`)}}：{{ sellerOrderDetailStore.order.shipping_option == '' ? $t('order_detail.delivery.default') : sellerOrderDetailStore.order.shipping_option }}
                        {{sellerOrderDetailStore.order.shipping_date_time!==null?'('+new Date(sellerOrderDetailStore.order.shipping_date_time).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric",hour: '2-digit', minute: '2-digit'})+')':''}}
                    </span>

                    <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.address')}}</span>
                    <span class="col-start-3 col-span-3 py-2">
                        {{sellerOrderDetailStore.order.shipping_address_1}} ,
                        {{sellerOrderDetailStore.order.shipping_location}} ,
                        {{sellerOrderDetailStore.order.shipping_region}} ,
                        {{sellerOrderDetailStore.order.shipping_postcode}}
                    </span>
                </template>
                
                <span class="col-start-1 col-span-2 py-2" v-if="!layoutStore.userInfo?.user_subscription?.user_plan?.hide?.order_delivery_status">{{$t('order.delivery_status')}}</span>   
                <span class="col-start-3 col-span-3 py-2" v-if="!layoutStore.userInfo?.user_subscription?.user_plan?.hide?.order_delivery_status">{{$t(`order.delivery_status_options.${sellerOrderDetailStore.order.delivery_status}`)}}</span>

            </div>

            
        </div>
        <!-- Remark -->
        <div class="box p-8 border-2 border-secondary flex flex-col gap-3 mt-2" v-show="sellerOrderDetailStore.order.shipping_remark && !layoutStore.userInfo?.user_subscription?.user_plan?.hide?.order_shipping_remark">
            <span class="text-lg">{{$t('order_detail.remark')}}</span>
            <span class="py-2"> {{sellerOrderDetailStore.order.shipping_remark}} </span>
        </div>
    </div>
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useSellerOrderStore } from "@/stores/lss-seller-order";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail"
const sellerOrderDetailStore = useSellerOrderStore()
const campaignDetailStore = useCampaignDetailStore()
const layoutStore = useLSSSellerLayoutStore()
</script>