<template>
  <div class="box p-5 m-3 border-2 border-secondary">
    <div>
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">Order Summary</span>
      </div>
	  
      <div class="flex">
        <div class="mr-auto">Subtotal</div>
        <div class="font-medium">$ {{ store.order.subtotal }}</div>
      </div>
      <div class="flex mt-4">


        <div class="mr-auto" v-if="store.order.adjust_title">
          <div>{{ store.order.adjust_title }}</div>
          <div>(Price Adjustment)</div>
        </div>
        <div class="mr-auto" v-else>Price Adjustment</div>

        <div class="font-medium text-danger">${{ store.order.adjust_price }}</div>
      </div>
      
      <div class="flex mt-4 border-t border-slate-200/60 dark:border-darkmode-400 mt-4
          pt-4">
        <div class="mr-auto">Shipping</div>
        <div class="font-medium">${{ store.order.shipping_cost }}</div>
      </div>

      <div
        class="
          flex
          mt-4
          pt-4
          border-t border-slate-200/60
          dark:border-darkmode-400
        "
      >
        <div class="mr-auto font-medium text-base">Total Charge</div>
        <div class="font-medium text-base">${{ store.order.total }}</div>
      </div>
    </div>
   
  </div>
    
</template>

<script setup>

import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
import { computed, onMounted, ref, watch } from "vue";

const store = useLSSBuyerOrderStore(); 




</script>
 