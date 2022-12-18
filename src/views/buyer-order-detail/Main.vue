<template>
    <div class="mb-10">
        <div class="text-2xl text-base text-center my-5"> {{$t('order_detail.order')}} </div>

        <div class="grid grid-cols-12 gap-5">
            <!-- ORDER_SHIPPING_INFO_CARD -->
            <div class="col-span-12 lg:col-span-6 2xl:col-span-6">
                <div class="w-full mx-2 ">
                    <div class="flex mb-2">
                        <h2 class="font-medium mr-5 flex-row flex-wrap flex justify-between gap-3">
                            <span class="my-auto"> {{$t('order_detail.order_no')}} # {{ buyerOrderStore.order.id }}  </span> 
                            <span class="btn rounded-full bg-secondary h-8 ml-3 cursor-auto">
                                {{ $t(`order_detail.`+buyerOrderStore.order.status) }}
                            </span> 
                            <button 
                                class="btn btn-rounded-pending h-8 ml-auto sm:ml-3"
                                v-if="buyerOrderStore.order.payment_status === 'awaiting_payment' && buyerOrderStore.order.payment_method !== 'ecpay_cash_on_delivery'"
                                @click=" routeToPaymentPage()"
                            >
                                {{$t('order_detail.pay')}}
                            </button>
                        </h2>
                    </div>
                    <div class="flex mb-2">
                        <!-- <span class="font-medium mr-5"> Order Date : {{ buyerOrderStore.order.created_at }} </span> -->
                        <span class="font-medium mr-5">{{$t('order_detail.order_date')}} : {{ new Date(buyerOrderStore.order.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})  }} </span>
                    </div>
                </div>
                <div class="box p-6 border-2 border-secondary ">
                    <div class="flex">
                        <div class="mr-10">{{$t('order_detail.delivery.name')}}</div>
                        <div>{{ buyerOrderStore.order.shipping_last_name }} {{ buyerOrderStore.order.shipping_first_name }}</div>
                    </div>
                    <div class="flex mt-4" v-if="buyerOrderStore.order.shipping_phone">
                        <div class="mr-10">{{$t('order_detail.delivery.phone')}}</div>
                        <div>{{ buyerOrderStore.order.shipping_phone }}</div>
                    </div>
                    <div class="flex mt-4" v-if="buyerOrderStore.order.shipping_email">
                        <div class="mr-10">{{$t('order_detail.delivery.email')}}</div>
                        <div>{{ buyerOrderStore.order.shipping_email }}</div>
                    </div>
                    <div class="flex mt-4">
                        <div class="mr-7">{{$t('order_detail.remark')}}</div>
                        <div>{{ buyerOrderStore.order.shipping_remark }}</div>
                    </div>
                </div>
            </div>
            
            <!-- ORDER_DELIVERY_PAYMENT_INFO_CARD -->
            <div class="col-span-12 lg:col-span-6 2xl:col-span-6">
                <div class="box p-6 border-2 border-secondary"> 
                    <div class="flex mb-4 dark:border-darkmode-400">
                        <span class="text-lg">{{$t('order_detail.order_info')}}</span>   
                    </div>
                    <div class="grid grid-cols-6 gap-2">
                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.method')}}</div>
                        <div class="col-start-3 col-span-3 py-2" v-if="buyerOrderStore.order.payment_method">{{ buyerOrderStore.order.payment_method == 'direct_payment' ? `${$t('order_detail.payment.Direct Payment')} - ${buyerOrderStore.order.meta.account_mode}` : $t(`order_detail.payment.${buyerOrderStore.order.payment_method}`) }}</div>
                        <template v-if="buyerOrderStore.order.meta">
                            <div class="col-start-1 col-span-2 py-2" v-if="buyerOrderStore.order.meta.InvoiceNumber">發票號碼</div>
                            <div class="col-start-3 col-span-3 py-2" v-if="buyerOrderStore.order.meta.InvoiceNumber">{{buyerOrderStore.order.meta.InvoiceNumber}}</div>
                        </template>
                        <template v-if="buyerOrderStore.order.payment_method">
                            <div class="col-start-1 col-span-2 py-3">{{$t('order_detail.payment.last_five_digits')}}</div>
                            <div v-if="buyerOrderStore.order.meta.last_five_digit == '' && !buyerOrderStore.order.meta.receipt_image" class="col-start-3 col-span-3 py-3">{{$t('order_detail.payment.no_record')}} </div>
                            <div v-else class="col-start-3 col-span-3 py-3">{{buyerOrderStore.order.meta.last_five_digit}}</div>
                            <div class="w-20 h-20 image-fit zoom-in absolute top-[110px] right-8">
                                <Tippy
                                v-if="buyerOrderStore.order.meta.receipt_image"
                                    tag="img"
                                    data-action="zoom"
                                    content="receipt image"
                                    class="rounded-lg"
                                    :src="buyerOrderStore.order.meta.receipt_image"
                                />
                            </div>
                        </template>
                        
                        <div class="col-start-1 col-span-2 py-3">{{$t('order.payment_status')}}</div>
                        <div class="col-start-3 col-span-3 py-3">{{$t(`order.payment_status_options.${buyerOrderStore.order.payment_status}`)}}</div>

                        <template v-if="buyerOrderStore.order.shipping_method === 'pickup'">
                            <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.information')}}</div>
                            <div class="col-start-3 col-span-3 py-2">{{$t('order_detail.delivery.pickup')}}
                                {{buyerOrderStore.order.shipping_date_time!==null?'('+new Date(buyerOrderStore.order.shipping_date_time).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric",hour: '2-digit', minute: '2-digit'})+')':''}}
                            </div>

                            <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.pickup_store')}}</div>
                            <div class="col-start-3 col-span-3 py-2">{{buyerOrderStore.order?.shipping_option_data?.name}}</div> 

                            
                            <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.pickup_address')}}</div>
                            <div class="col-start-3 col-span-3 py-2">{{buyerOrderStore.order?.shipping_option_data?.address}}</div>

                        </template>
                        <template v-else-if="buyerOrderStore.order.shipping_method === 'delivery'">
                            <div class="col-start-1 col-span-2 py-3">{{$t('order_detail.delivery.information')}}</div>
                            <div class="col-start-3 col-span-3 py-3">{{$t('order_detail.delivery.delivery')}}：{{ buyerOrderStore.order.shipping_option_data?.title|| $t('order_detail.delivery.default') }}
                                {{buyerOrderStore.order.shipping_date_time!==null?'('+new Date(buyerOrderStore.order.shipping_date_time).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric",hour: '2-digit', minute: '2-digit'})+')':''}}
                            </div>

                            <div class="col-start-1 col-span-2 py-3">{{$t('order_detail.delivery.address')}}</div>
                            <div class="col-start-3 col-span-3 py-3">
                                {{buyerOrderStore.order.shipping_address_1}} ,
                                {{buyerOrderStore.order.shipping_location}} ,
                                {{buyerOrderStore.order.shipping_region}} ,
                                {{buyerOrderStore.order.shipping_postcode}} 
                                
                            </div>
                        </template>

                        <div class="col-start-1 col-span-2 py-3" v-if="!buyerOrderStore.user_subscription?.user_plan?.hide?.order_delivery_status">{{$t('order.delivery_status')}}</div>
                        <div class="col-start-3 col-span-3 py-3" v-if="!buyerOrderStore.user_subscription?.user_plan?.hide?.order_delivery_status">{{$t(`order.delivery_status_options.${buyerOrderStore.order.delivery_status}`)}}</div>
                    </div>
                </div>
            </div>
        </div>   

        <!-- ORDER_DETAIL_TABLE -->
        <div class="w-full h-fit overflow-x-hidden sm:overflow-x-auto">
            <OrderDetailTable />
        </div>

        <!-- SUMMARIZE_CARD -->
        <div class="grid grid-cols-12 gap-2 mt-5">
            <div class="box col-start-1 col-span-12 lg:col-start-9 2xl:col-start-9">
                <div   
                    class="grid grid-cols-3 gap-2 p-3 text-right">

                    <!-- SUBTOTAL -->
                    <div class="flex col-start-1 col-span-3 p-2 py-1">
                        <div class="mr-auto">{{$t('order_detail.price_summary.sub_total')}}</div>
                        <div>
                            {{buyerOrderStore.order.currency}}
                            {{(Math.floor(buyerOrderStore.order.subtotal * (10 ** buyerOrderStore.order.decimal_places)) / 10 ** buyerOrderStore.order.decimal_places).toLocaleString('en-GB')}}
                            {{buyerOrderStore.order.price_unit?$t(`global.price_unit.${buyerOrderStore.order.price_unit}`):''}}
                        </div>
                    </div>
                    
                    <!-- DISCOUNT -->
                    <div v-if="buyerOrderStore.order.discount !=0"
                        class="flex col-start-1 col-span-3 p-2 py-1">
                            <div class="mr-auto">{{ $t('shopping_cart.order_summary.promo_discount')}} <span class="text-danger">{{buyerOrderStore.order.applied_discount?.code ? (buyerOrderStore.order.applied_discount.code) : ""}}</span></div>
                            <div>
                                {{buyerOrderStore.order.currency}}
                                -{{(Math.floor(buyerOrderStore.order.discount * (10 ** buyerOrderStore.order.decimal_places)) / 10 ** buyerOrderStore.order.decimal_places).toLocaleString('en-GB')}}
                                {{buyerOrderStore.order.price_unit?$t(`global.price_unit.${buyerOrderStore.order.price_unit}`):''}}
                            </div>
                    </div>


                    <!-- SUBTOTAL_AFTER_DISCOUNT -->
                    <div v-if="buyerOrderStore.order.discount !=0"
                        class="flex col-start-1 col-span-3 p-2 py-1">
                            <div class="mr-auto">{{$t('cart.subtotal_after_discount')}}</div>
                            <div>
                                {{buyerOrderStore.order.currency}}
                                {{(Math.floor(Math.max((buyerOrderStore.order.subtotal - buyerOrderStore.order.discount),0) * (10 ** buyerOrderStore.order.decimal_places)) / 10 ** buyerOrderStore.order.decimal_places).toLocaleString('en-GB')}}
                                {{buyerOrderStore.order.price_unit?$t(`global.price_unit.${buyerOrderStore.order.price_unit}`):''}}
                            </div>
                    </div>

                    <!-- DELIVERY -->
                    <div class="flex col-start-1 col-span-3 p-2 py-1">
                        <div class="mr-auto">{{$t('order_detail.price_summary.delivery_charge')}}</div>
                        <div v-if="buyerOrderStore.order.free_delivery || buyerOrderStore.order?.meta?.subtotal_over_free_delivery_threshold || buyerOrderStore.order?.meta?.items_over_free_delivery_threshold">
                            {{buyerOrderStore.order.currency}}
                            {{(Math.floor(0 * (10 ** buyerOrderStore.order.decimal_places)) / 10 ** buyerOrderStore.order.decimal_places).toLocaleString('en-GB')}}
                            {{buyerOrderStore.order.price_unit?$t(`global.price_unit.${buyerOrderStore.order.price_unit}`):''}}
                        </div>
                        <div v-else>
                            {{buyerOrderStore.order.currency}}
                            {{(Math.floor(buyerOrderStore.order.shipping_cost * (10 ** buyerOrderStore.order.decimal_places)) / 10 ** buyerOrderStore.order.decimal_places).toLocaleString('en-GB')}}
                            {{buyerOrderStore.order.price_unit?$t(`global.price_unit.${buyerOrderStore.order.price_unit}`):''}}
                        </div>
                    </div>

                    <!-- ADJUST_PRICE -->
                    <div
                        v-if="buyerOrderStore.order.adjust_price !=0" 
                        class="flex col-start-1 col-span-3 p-2 py-1">
                            <div class="mr-auto">{{$t('order_detail.price_summary.price_adjustment')}} <span class="text-danger"> {{buyerOrderStore.order.adjust_title}} </span></div>
                            <div >
                                {{buyerOrderStore.order.currency}}
                                {{(Math.floor(buyerOrderStore.order.adjust_price * (10 ** buyerOrderStore.order.decimal_places)) / 10 ** buyerOrderStore.order.decimal_places).toLocaleString('en-GB')}}
                                {{buyerOrderStore.order.price_unit?$t(`global.price_unit.${buyerOrderStore.order.price_unit}`):''}}
                            </div>
                    </div>

                    

                    <!-- TAX -->
                    <div v-if="buyerOrderStore.order.tax" class="flex col-start-1 col-span-3 p-2 py-1">
                        <div class="mr-auto">{{$t('order_detail.price_summary.tax')}}</div>
                        <div> 
                            {{buyerOrderStore.order.currency}}
                            {{(Math.floor(parseFloat(buyerOrderStore.order.tax) * (10 ** buyerOrderStore.order.decimal_places)) / 10 ** buyerOrderStore.order.decimal_places).toLocaleString('en-GB')}}
                            {{buyerOrderStore.order.price_unit?$t(`global.price_unit.${buyerOrderStore.order.price_unit}`):''}}
                        </div>
                    </div>

                    <!-- TOTAL -->
                    <div class="flex col-start-1 col-span-3 p-2 py-1">
                        <div class="mr-auto">{{$t('order_detail.price_summary.total')}}</div>
                        <div>
                            {{buyerOrderStore.order.currency}} 
                            {{(Math.floor(buyerOrderStore.order.total * (10 ** buyerOrderStore.order.decimal_places)) / 10 ** buyerOrderStore.order.decimal_places).toLocaleString('en-GB')}}
                            {{buyerOrderStore.order.price_unit?$t(`global.price_unit.${buyerOrderStore.order.price_unit}`):''}}
                        </div>
                    </div>
                </div>
            </div>
        </div>     
    </div>
</template>

<script setup>
import OrderDetailTable from "./OrderDetailTable.vue";
// import OrderSummary from "@/components/box/OrderSummary.vue";
import OrderSummary from "@/views/buyer-order-payment/OrderSummary.vue";

import { computed, onMounted, ref, watch, getCurrentInstance } from "vue";
import { buyer_retrieve_order_with_user_subscription } from "@/api_v2/order";
import { useRoute, useRouter } from "vue-router";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
import { useCookies } from 'vue3-cookies'
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";

const layoutStore = useLSSBuyerLayoutStore();
const i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
const { cookies } = useCookies()
const route = useRoute();
const router = useRouter();

const buyerOrderStore = useLSSBuyerOrderStore(); 


onMounted(() => {

    buyer_retrieve_order_with_user_subscription(route.params.order_oid, layoutStore.alert)
    .then(
        res => { 
            buyerOrderStore.order = res.data
            buyerOrderStore.user_subscription = JSON.parse(JSON.stringify(res.data.user_subscription))
            i18n.locale = res.data.campaign.lang
            // console.log(res.data)
        }
    )
})

const routeToPaymentPage = ()=>{
    router.push({name:"buyer-order-payment-page", params:{order_oid:route.params.order_oid}});
}
</script>


<style scoped>
td {  
    width: 100px;
    height: 30px;
    border: 1px solid gray;
}

</style>