<template>
  <div class="box p-5 m-3 border-2 border-secondary">
    <div>
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">{{$t('shopping_cart.order_summary.order_summary')}}</span>
      </div>
	  
      <div class="flex">
        <div class="mr-auto">{{$t('shopping_cart.order_summary.subtotal')}}</div>
        <div class="font-medium" v-if="store.order.campaign">
          {{store.order.campaign.currency}} 
          {{ Math.floor(store.order.subtotal * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
          {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
        </div>
      </div>
      <div v-if="store.order.campaign && store.order.adjust_price != 0" class="flex mt-4">
        <div class="mr-auto" v-if="store.order.adjust_title">
          <div>{{ store.order.adjust_title }}</div>
          <div>({{$t('shopping_cart.order_summary.price_adjustment')}})</div>
        </div>
        <div class="mr-auto" v-else>{{$t('shopping_cart.order_summary.price_adjustment')}}</div>

        <div class="font-medium text-danger">
          {{store.order.campaign.currency}}
          {{ Math.floor(store.order.adjust_price * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
          {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
        </div> 
      </div>

      <div v-if="store.order.campaign && store.order.discount !=0" class="flex flex-row justify-between mt-2" >
        <label class="w-fit my-auto whitespace-nowrap">{{ $t('shopping_cart.order_summary.promo_discount')}} </label>
        <span class="font-medium text-danger"> 
          {{store.order.campaign.currency}} 
          -{{Math.floor(parseFloat(store.order.discount) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
          {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
        </span>
      </div>

      <div class="flex mt-4 border-t border-slate-200/60 dark:border-darkmode-400 mt-4
          pt-4">
        <div class="mr-auto">{{$t('shopping_cart.order_summary.shipping')}}</div>
        <div class="font-medium" v-if="store.order.campaign">
          {{store.order.campaign.currency}}
          {{ Math.floor(store.order.shipping_cost * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
          {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
        </div>
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
        <div class="font-medium text-base" v-if="store.order.campaign">
          {{store.order.campaign.currency}}
          {{ Math.floor(store.order.total * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
          {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
        </div>
      </div>
    </div>
   
  </div>
    
</template>

<script setup>

import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
import { computed, onMounted, ref, watch } from "vue";

const store = useLSSBuyerOrderStore(); 

</script>
 