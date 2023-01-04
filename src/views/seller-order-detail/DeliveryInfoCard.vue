<template>
    <!-- Delivery Information -->
    <div class="flex-col w-full"> 
        <div class="p-8 sm:my-3 border-2 box border-secondary flex-col flex gap-4"> 
            <div>
                <span class="text-lg dark:border-darkmode-400">{{$t('order_detail.delivery.information')}}</span>   
            </div>
            

            <div class="grid grid-cols-6 gap-2" v-show="sellerOrderDetailStore.order.shipping_method">
                <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.name')}}</div>
                <div class="col-start-3 col-span-4">{{sellerOrderDetailStore.order.shipping_first_name}}</div>
                
                <template v-if="sellerOrderDetailStore.order.shipping_cellphone">
                    <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.cellphone')}}</div>
                    <div class="col-start-3 col-span-4">{{sellerOrderDetailStore.order.shipping_cellphone}}</div>
                </template>

                <template v-if="sellerOrderDetailStore.order.shipping_email">
                    <div class="col-start-1 col-span-2 ">{{$t('order_detail.delivery.email')}}</div>
                    <div class="col-start-3 col-span-4 break-all">{{sellerOrderDetailStore.order.shipping_email}}</div>
                </template>

                <template v-if="sellerOrderDetailStore.order.shipping_method === 'pickup'">
                    <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.information')}}</div>
                    <div class="col-start-3 col-span-3">{{$t('order_detail.delivery.pickup')}}
                        {{sellerOrderDetailStore.order.shipping_date_time!==null?'('+new Date(sellerOrderDetailStore.order.shipping_date_time).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric",hour: '2-digit', minute: '2-digit'})+')':''}}
                    </div>

                    <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.pickup_store')}}</div>
                    <div class="col-start-3 col-span-3">{{sellerOrderDetailStore.order?.shipping_option_data?.name}}</div> 

                    
                    <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.pickup_address')}}</div>
                    <div class="col-start-3 col-span-3">{{sellerOrderDetailStore.order?.shipping_option_data?.address}}</div>

                </template>
                <template v-else-if="sellerOrderDetailStore.order.shipping_method === 'delivery'">
                    <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.information')}}</div>
                    <div class="col-start-3 col-span-3">{{$t('order_detail.delivery.delivery')}}：{{ buyerOrderStore.order.shipping_option|| $t('order_detail.delivery.default') }}
                        {{sellerOrderDetailStore.order.shipping_date_time!==null?'('+new Date(sellerOrderDetailStore.order.shipping_date_time).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric",hour: '2-digit', minute: '2-digit'})+')':''}}
                    </div>
                    <template v-if="sellerOrderDetailStore.order.shipping_option_data?.is_cvs"> 
                        <div class="col-start-1 col-span-5 sm:col-span-2">{{$t('order_detail.delivery.cvs')}}</div>
                        <div class="col-start-2 col-span-5 sm:col-start-3 sm:col-span-4">{{ sellerOrderDetailStore.order.shipping_option_data?.cvs_store_name }}</div>
                        <div class="col-start-2 col-span-5 sm:col-start-3 sm:col-span-4 -my-2">{{ sellerOrderDetailStore.order.shipping_option_data?.cvs_address }}</div>
                    </template>
                    <template v-else> 
                        <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.address')}}</div>
                        <div class="col-start-3 col-span-3">
                            {{sellerOrderDetailStore.order.shipping_address_1}} ,
                            {{sellerOrderDetailStore.order.shipping_location}} ,
                            {{sellerOrderDetailStore.order.shipping_region}} ,
                            {{sellerOrderDetailStore.order.shipping_postcode}} 
                            
                        </div>
                    </template>
                </template>
                <template v-else-if="sellerOrderDetailStore.order.shipping_method === 'ecpay'"> 
                    <template v-if="sellerOrderDetailStore.order.shipping_option_data.logisticsType == 'CVS'"> 
                        <div class="col-start-1 col-span-5 sm:col-span-2">{{$t('order_detail.delivery.cvs')}}</div>
                        <div class="col-start-2 col-span-5 sm:col-start-3 sm:col-span-4">{{sellerOrderDetailStore.order.shipping_option_data.LogisticsSubType == 'UNIMARTC2C'? '7-11店到店':'全家店到店'}}</div>
                        <div class="col-start-2 col-span-5 sm:col-start-3 sm:col-span-4 -my-2">{{ sellerOrderDetailStore.order.shipping_option_data?.cvs_store_name }}</div>
                        <div class="col-start-2 col-span-5 sm:col-start-3 sm:col-span-4 -my-1">{{ sellerOrderDetailStore.order.shipping_option_data?.cvs_address }}</div>
                    </template>
                    <template v-else> 
                        <div class="col-start-1 col-span-2">{{$t('order_detail.delivery.address')}}</div>
                        <div class="col-start-3 col-span-4">
                            {{sellerOrderDetailStore.order.shipping_postcode}} 
                            {{sellerOrderDetailStore.order.shipping_region}}, {{sellerOrderDetailStore.order.shipping_location}}, {{sellerOrderDetailStore.order.shipping_address_1}}
                        </div>
                    </template>
                </template>
                
                <span class="col-start-1 col-span-2 " v-if="!layoutStore.userInfo?.user_subscription?.user_plan?.hide?.order_delivery_status">{{$t('order.delivery_status')}}</span>   
                <span class="col-start-3 col-span-4" v-if="!layoutStore.userInfo?.user_subscription?.user_plan?.hide?.order_delivery_status">{{$t(`order.delivery_status_options.${sellerOrderDetailStore.order.delivery_status}`)}}</span>

            </div>

            
        </div>
        <!-- Remark -->
        <div class="box p-8 border-2 border-secondary flex flex-col gap-3 mt-2" v-show="sellerOrderDetailStore.order.shipping_remark && !layoutStore.userInfo?.user_subscription?.user_plan?.hide?.order_shipping_remark">
            <span class="text-lg">{{$t('order_detail.remark')}}</span>
            <span class=""> {{sellerOrderDetailStore.order.shipping_remark}} </span>
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