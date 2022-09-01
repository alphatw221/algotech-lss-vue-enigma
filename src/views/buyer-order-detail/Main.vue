<template>
    <div class="h-full">
        <div class="text-2xl text-base text-center my-5"> {{$t('order_detail.order')}} </div>

        <div class="grid grid-cols-12 gap-5">

            <div class="col-span-12 lg:col-span-6 2xl:col-span-6">
                <div class="w-full mx-2 ">
                    <div class="flex mb-2">
                        <h2 class="font-medium mr-5 flex-row flex-wrap flex justify-between gap-3">
                            <span class="my-auto"> {{$t('order_detail.order_no')}} # {{ store.order.id }}  </span> 
                            <span class="btn rounded-full bg-secondary h-8 ml-3 cursor-auto">
                                {{ $t(`order_detail.`+store.order.status) }}
                            </span> 
                            <button 
                                class="btn btn-rounded-pending h-8 ml-auto sm:ml-3"
                                v-if="store.order.status === 'review'"
                                @click="router.push(`/buyer/order/${route.params.order_oid}/payment`)"
                            >
                                {{$t('order_detail.pay')}}
                            </button>
                        </h2>
                    </div>
                    <div class="flex mb-2">
                        <!-- <span class="font-medium mr-5"> Order Date : {{ store.order.created_at }} </span> -->
                        <span class="font-medium mr-5">{{$t('order_detail.order_date')}} : {{ new Date(store.order.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})  }} </span>
                    </div>
                </div>
                <div class="box p-6 border-2 border-secondary ">
                    <div class="flex">
                        <div class="mr-10">{{$t('order_detail.delivery.name')}}</div>
                        <div>{{ store.order.shipping_last_name }} {{ store.order.shipping_first_name }}</div>
                    </div>
                    <div class="flex mt-4">
                        <div class="mr-10">{{$t('order_detail.delivery.phone')}}</div>
                        <div>{{ store.order.shipping_phone }}</div>
                    </div>
                    <div class="flex mt-4">
                        <div class="mr-10">{{$t('order_detail.delivery.email')}}</div>
                        <div>{{ store.order.shipping_email }}</div>
                    </div>
                    <div class="flex mt-4">
                        <div class="mr-7">{{$t('order_detail.remark')}}</div>
                        <div>{{ store.order.shipping_remark }}</div>
                    </div>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 2xl:col-span-6">
                <div class="box p-6 border-2 border-secondary"> 
                    <div class="flex mb-4 dark:border-darkmode-400">
                        <span class="text-lg">{{$t('order_detail.order_info')}}</span>   
                    </div>
                    <div class="grid grid-cols-6 gap-2">
                        <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.method')}}</div>
                        <div class="col-start-3 col-span-3 py-2" v-if="store.order.payment_method">{{ store.order.payment_method == 'direct_payment' ? `${$t('order_detail.payment.Direct Payment')} - ${store.order.meta.account_mode}` : $t(`order_detail.payment.${store.order.payment_method}`) }}</div>
                        <template v-if="store.order.meta">
                            <div class="col-start-1 col-span-2 py-2" v-if="store.order.meta.InvoiceNumber">發票號碼</div>
                            <div class="col-start-3 col-span-3 py-2" v-if="store.order.meta.InvoiceNumber">{{store.order.meta.InvoiceNumber}}</div>
                        </template>
                        <template v-if="store.order.payment_method">
                            <div class="col-start-1 col-span-2 py-3">{{$t('order_detail.payment.last_five_digits')}}</div>
                            <div v-if="store.order.meta.last_five_digit == '' && !store.order.meta.receipt_image" class="col-start-3 col-span-3 py-3">{{$t('order_detail.payment.no_record')}} </div>
                            <div v-else class="col-start-3 col-span-3 py-3">{{store.order.meta.last_five_digit}}</div>
                            <div class="w-20 h-20 image-fit zoom-in absolute top-[110px] right-8">
                                <Tippy
                                v-if="store.order.meta.receipt_image"
                                    tag="img"
                                    data-action="zoom"
                                    content="receipt image"
                                    class="rounded-lg"
                                    :src="store.order.meta.receipt_image"
                                />
                            </div>
                        </template>
                        
                        <template v-if="store.order.shipping_method === 'pickup'">
                            <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.information')}}</div>
                            <div class="col-start-3 col-span-3 py-2">{{$t('order_detail.delivery.pickup')}}</div>

                            <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.pickup_store')}}</div>
                            <!-- temp -->
                            <div class="col-start-3 col-span-3 py-2">{{store.order.campaign.meta_logistic.pickup_options[store.order.shipping_option_index]?.name}}</div> 
                            <!-- future -->
                            <!-- <div class="col-start-3 col-span-3 py-2">{{store.order.shipping_option_data.name}}</div> -->

                            
                            <div class="col-start-1 col-span-2 py-2">{{$t('order_detail.delivery.pickup_address')}}</div>
                            <!-- temp -->
                            <div class="col-start-3 col-span-3 py-2">{{store.order.campaign.meta_logistic.pickup_options[store.order.shipping_option_index]?.address}}</div>
                            <!-- future -->
                            <!-- <div class="col-start-3 col-span-3 py-2">{{store.order.shipping_option_data.address}}</div> -->

                        </template>
                        <template v-else-if="store.order.shipping_method === 'delivery'">
                            <div class="col-start-1 col-span-2 py-3">{{$t('order_detail.delivery.information')}}</div>
                            <!-- temp -->
                            <div class="col-start-3 col-span-3 py-3">{{ store.order.shipping_option == '' ? 'Default' : store.order.shipping_option }}</div>
                            <!-- future -->
                            <!-- <div class="col-start-3 col-span-3 py-3" v-if="store.order.shipping_option.title">{{ store.order.shipping_option_data.title }}</div>
                            <div class="col-start-3 col-span-3 py-3" v-else>{{ 'default' }}</div>   i18n here -->
                            

                            <div class="col-start-1 col-span-2 py-3">{{$t('order_detail.delivery.address')}}</div>
                            <div class="col-start-3 col-span-3 py-3">
                                {{store.order.shipping_address_1}} ,
                                {{store.order.shipping_location}} ,
                                {{store.order.shipping_region}} ,
                                {{store.order.shipping_postcode}} 
                                
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>   
        <div class="w-full h-fit overflow-x-hidden sm:overflow-x-auto">
            <OrderDetailTable />
        </div>
        <div class="grid grid-cols-12 gap-2 mt-5">
            <div class="box col-start-1 col-span-12 lg:col-start-9 2xl:col-start-9">
                <div class="grid grid-cols-3 gap-2 p-3 text-right">
                    <div class="flex col-start-1 col-span-3 p-2 py-1">
                        <div class="mr-auto">{{$t('order_detail.price_summary.sub_total')}}</div>
                        <div v-if="store.order.campaign">
                            {{store.order.campaign.currency}}
                            {{ Math.floor(store.order.subtotal * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
                            {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
                        </div>
                    </div>
                    <div class="flex col-start-1 col-span-3 p-2 py-1">
                        <div class="mr-auto">{{$t('order_detail.price_summary.delivery_charge')}}</div>
                        <div v-if="store.order.campaign">
                            {{store.order.campaign.currency}}
                            {{ Math.floor(store.order.shipping_cost * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
                            {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
                        </div>
                    </div>
                    <div class="flex col-start-1 col-span-3 p-2 py-1">
                        <div class="mr-auto">{{$t('order_detail.price_summary.price_adjustment')}} {{store.order.adjust_title ?? ''}}</div>
                        <div v-if="store.order.campaign">
                            {{store.order.campaign.currency}}
                            {{ Math.floor(store.order.adjust_price * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
                            {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
                        </div>
                    </div>
                    <div class="flex col-start-1 col-span-3 p-2 py-1">
                        <div class="mr-auto">{{ $t('shopping_cart.order_summary.promo_discount')}} {{store.order.adjust_title ?? ''}}</div>
                        <div v-if="store.order.campaign">
                            {{store.order.campaign.currency}}
                            -{{ Math.floor(store.order.discount * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
                            {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
                        </div>
                    </div>
                    <div class="flex col-start-1 col-span-3 p-2 py-1">
                        <div class="mr-auto">{{$t('order_detail.price_summary.total')}}</div>
                        <div v-if="store.order.campaign">
                            {{store.order.campaign.currency}} 
                            {{ Math.floor(store.order.total * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
                            {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
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
import { buyer_retrieve_order_with_user_subscription, guest_retrieve_order_with_user_subscription } from "@/api_v2/order";
import { useRoute, useRouter } from "vue-router";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
import { useCookies } from 'vue3-cookies'
const i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
const { cookies } = useCookies()
const route = useRoute();
const router = useRouter();

const store = useLSSBuyerOrderStore(); 
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const isAnonymousUser=cookies.get("login_with")=='anonymousUser'
onMounted(() => {
    const retrieve_order = isAnonymousUser?guest_retrieve_order_with_user_subscription:buyer_retrieve_order_with_user_subscription
    retrieve_order(route.params.order_oid)
    .then(
        res => { 
            store.order = res.data
            i18n.locale = res.data.campaign.lang
            console.log(res.data)
        }
    )
})
</script>


<style scoped>
td {  
    width: 100px;
    height: 30px;
    border: 1px solid gray;
}

</style>