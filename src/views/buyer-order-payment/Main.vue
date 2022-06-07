<template>
    <div class="box grid grid-cols-12 gap-4">
        <div class="col-start-1 col-span-12 lg:col-span-7 2xl:col-span-7">
            <ShippingSummary />
        </div>
        <div class="col-span-12 lg:col-span-5 2xl:col-span-5">
            <OrderSummary />
        </div>
        <div class="col-start-1 col-span-12 lg:col-span-7 2xl:col-span-7">
            <PaymentMethods />
        </div>
    </div>
</template>
              
<script setup>

import OrderSummary from "./OrderSummary.vue";
import PaymentMethods from "./payment-methods/Main.vue";
import ShippingSummary from "./ShippingSummary.vue";

import { computed, onMounted, ref, watch } from "vue";
import { buyer_retrieve_order } from "@/api_v2/order";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();

import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
const store = useLSSBuyerOrderStore(); 

onMounted(()=>{
  buyer_retrieve_order(route.params.order_id)
  .then(
      res => {
        store.order = res.data
      }
  )
})


</script>