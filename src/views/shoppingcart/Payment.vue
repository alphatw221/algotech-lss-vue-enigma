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


import PaymentMethods from "@/components/box/PaymentMethods.vue";
import OrderSummary from "@/components/box/OrderSummary.vue";
import ShippingSummary from "@/components/box/ShippingSummary.vue";

import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { buyer_retrieve_order } from "@/api_v2/order"

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const store = useShoppingCartStore(); 


onMounted(()=>{
  store.openTab=0
  buyer_retrieve_order(route.params.order_id)
  .then(
      res => {
        store.order = res.data
      }
  )
})


</script>