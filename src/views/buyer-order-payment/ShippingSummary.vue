<template>

    <div class="box p-5 m-4 border-2 border-secondary">
        <div class="flex mb-4 dark:border-darkmode-400">
            <span class="text-lg"> {{$t('shopping_cart.payment.shipping_summary')}}</span>   
        </div>
        <div class="flex">
            <div class="mr-auto">{{$t('order_detail.delivery.name')}}</div>
            <div class="mr-auto">{{ store.order.shipping_first_name }}{{ store.order.shipping_last_name }}</div>
        </div>
        <div class="flex mt-4">
            <div class="mr-auto">{{$t('shopping_cart.delivery_tab.email')}}</div>
            <div class="mr-auto">{{ store.order.shipping_email }}</div>
        </div>
        <div class="flex mt-4">
            <div class="mr-auto">{{$t('shopping_cart.delivery_tab.phone')}}</div>
            <div class="mr-auto">{{ store.order.shipping_phone }}</div>
        </div>
        <div class="mr-auto">{{$t('order_detail.delivery.method')}}</div>
        <template v-if="store.order.shipping_method === 'pickup'">
            <div class="flex mt-4 mr-auto">{{$t('shopping_cart.payment.pickup')}}</div>
            <div class="flex mt-4"> 
                <span class="mr-10">{{store.order.campaign.meta_logistic.pickup_options[store.order.shipping_option_index].name}}</span>
                <div >{{store.order.campaign.meta_logistic.pickup_options[store.order.shipping_option_index].address}}</div>
            </div>
            
        </template>
        <template v-if="store.order.shipping_method === 'delivery'">
            <div class="mr-auto">{{$t('shopping_cart.payment.delivery')}}</div>
            <div class="">{{ store.order.shipping_option }}</div>
            <div class="flex mt-4">{{$t('shopping_cart.payment.address')}}</div>
            <div class="flex mt-4">
                {{store.order.shipping_address_1}} ,
                {{store.order.shipping_postcode}} ,
                {{store.order.shipping_region}} ,
                {{store.order.shipping_location}}
            </div>
        </template>
    </div>

</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";

const store = useLSSBuyerOrderStore(); 

</script>
