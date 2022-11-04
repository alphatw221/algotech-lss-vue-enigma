<template>
    <template>
        <select v-model="order[column.key]" class="w-30" @change="updateOrderPaymentStatus(order, index, $event)">
            <option :value="option.value" v-for="(option,index) in payment_status_options" :key="index">
                {{$t(`order.payment_status_options.${option.value}`)}}</option>
        </select>
    </template>
    <template >
        {{$t(`order.payment_status_options.${order[column.key]}`)}}
    </template>
</template>


<script setup>
import {  seller_update_deliver_status } from "@/api_v2/order"

import { ref, provide, onMounted, onUnmounted, getCurrentInstance, defineProps} from "vue";
import { useRoute, useRouter } from "vue-router";

import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { } from ""

const props = defineProps({
    order: Object,
});


const route = useRoute();
const router = useRouter();

const internalInstance = getCurrentInstance()
const layoutStore = useLSSSellerLayoutStore()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;












</script>