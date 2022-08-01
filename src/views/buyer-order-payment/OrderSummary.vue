<template>
  <div class="box p-5 m-3 border-2 border-secondary">
    <div>
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">{{$t('shopping_cart.order_summary.order_summary')}}</span>
      </div>
	  
      <div class="flex">
        <div class="mr-auto">{{$t('shopping_cart.order_summary.subtotal')}}</div>
        <div class="font-medium" v-if="store.order.campaign">{{store.order.campaign.currency}} {{parseFloat(store.order.subtotal).toFixed(store.order.campaign.user_subscription.decimal_places)}}</div>
      </div>
      <div class="flex mt-4">


        <div class="mr-auto" v-if="store.order.adjust_title">
          <div>{{ store.order.adjust_title }}</div>
          <div>({{$t('shopping_cart.order_summary.price_adjustment')}})</div>
        </div>
        <div class="mr-auto" v-else>{{$t('shopping_cart.order_summary.price_adjustment')}}</div>

        <div class="font-medium text-danger" v-if="store.order.campaign">{{store.order.campaign.currency}}{{ parseFloat(store.order.adjust_price).toFixed(store.order.campaign.user_subscription.decimal_places) }}</div>
      </div>
      
      <div class="flex mt-4 border-t border-slate-200/60 dark:border-darkmode-400 mt-4
          pt-4">
        <div class="mr-auto">{{$t('shopping_cart.order_summary.shipping')}}</div>
        <div class="font-medium" v-if="store.order.campaign">{{store.order.campaign.currency}}{{ parseFloat(store.order.shipping_cost).toFixed(store.order.campaign.user_subscription.decimal_places) }}</div>
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
        <div class="mr-auto font-medium text-base">{{$t('shopping_cart.order_summary.total_charge')}}</div>
        <div class="font-medium text-base" v-if="store.order.campaign">{{store.order.campaign.currency}}{{ parseFloat(store.order.total).toFixed(store.order.campaign.user_subscription.decimal_places) }}</div>
      </div>
    </div>
   
  </div>
    
</template>

<script setup>

import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
import { computed, onMounted, ref, watch } from "vue";

const store = useLSSBuyerOrderStore(); 




</script>
 