<template>

    <div class="box p-5 m-4 border-2 border-secondary">
        <div class="flex mb-4 dark:border-darkmode-400">
            <span class="text-lg"> Shipping Summary</span>   
        </div>
        <div class="flex">
            <!-- <div class="mr-auto">Anna Wang</div> -->
            <div class="mr-auto">{{ store.order.shipping_first_name }}{{ store.order.shipping_last_name }}</div>
        </div>
        <div class="flex mt-4">
            <!-- <div class="mr-auto">afbdifbsd@gmail.com</div> -->
            <div class="mr-auto">{{ store.order.shipping_email }}</div>
        </div>
        <div class="flex mt-4">
            <!-- <div class="mr-auto">091534846</div> -->
            <div class="mr-auto">{{ store.order.shipping_phone }}</div>
        </div>
        <div class="flex mt-4">
            <!-- <div class="mr-auto">Shipping Method : Delivery</div> -->
            <div class="mr-auto">{{ store.order.shipping_method }}</div>
        </div>
        <div class="flex mt-4">
            <!-- <div class="mr-auto">2401 Utah Avenue South Seattle, Washington, U.S.</div> -->
            <div class="mr-auto">{{ store.order.shipping_address_1 }}</div>
        </div>

        <div class="flex mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
            <div class="mr-auto font-medium text-base">Total Charge</div>
            <div class="font-medium">${{ store.order.shipping_cost }}</div>
        </div>
    </div>

</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";

const store = useLSSBuyerOrderStore(); 

</script>
