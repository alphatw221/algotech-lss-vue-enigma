<template>

    <div class="box p-5 m-4 border-2 border-secondary">
        <div class="flex mb-4 dark:border-darkmode-400">
            <span class="text-lg"> {{$t('shopping_cart.payment.shipping_summary')}}</span>   
        </div>
        <div class="flex flex-wrap">
            <div class="w-1/4 whitespace-nowrap">{{$t('order_detail.delivery.name')}}</div>
            <div class="sm:w-3/4">{{ store.order.shipping_first_name }}{{ store.order.shipping_last_name }}</div>
        </div>
        <div class="flex flex-wrap mt-4">
            <div class="w-1/4 whitespace-nowrap">{{$t('shopping_cart.delivery_tab.email')}}</div>
            <div class="w-3/4">{{ store.order.shipping_email }}</div>
        </div>
        <div class="flex flex-wrap mt-4">
            <div class="w-1/4 whitespace-nowrap">{{$t('shopping_cart.delivery_tab.phone')}}</div>
            <div class="w-3/4">{{ store.order.shipping_phone }}</div>
        </div>
        <div class="flex flex-wrap mt-4">
            <div class="w-1/4 whitespace-nowrap">{{$t('order_detail.delivery.method')}}</div>
            <div v-if="store.order.shipping_method === 'pickup'" class="flex mt-4 w-3/4">{{$t('shopping_cart.payment.pickup')}}</div>
            <div  v-else-if="store.order.shipping_method === 'delivery'" class="w-3/4">{{$t('shopping_cart.payment.delivery')}}</div>
        </div>


        <template v-if="store.order.shipping_method === 'pickup'">        
            <div class="flex flex-wrap mt-4"> 
                <div class="w-1/4 whitespace-nowrap">{{store.order.campaign.meta_logistic.pickup_options[store.order.shipping_option_index].name}}</div>
                <div class="w-3/4">{{store.order.campaign.meta_logistic.pickup_options[store.order.shipping_option_index].address}}</div>
            </div>
        </template>

        <template v-if="store.order.shipping_method === 'delivery'">
            <div class="">{{ store.order.shipping_option }}</div>
            <div class="flex flex-row flex-wrap">
                <div class="w-1/4 mt-4 whitespace-nowrap">{{$t('shopping_cart.payment.address')}}</div>
                <div class="w-3/4 mt-4 ">
                    {{store.order.shipping_address_1}} ,
                    {{store.order.shipping_postcode}} ,
                    {{store.order.shipping_region}} ,
                    {{store.order.shipping_location}}
                </div>
            </div>
        </template>
    </div>

</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";

const store = useLSSBuyerOrderStore(); 

</script>
