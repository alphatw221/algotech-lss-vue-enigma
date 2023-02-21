<template>
    <div class="box p-5 border-2 border-secondary">
      <div class="flex flex-col">
        <!-- ORDER SUMMARY -->
        <div class="flex mb-4 dark:border-darkmode-400">
          <span class="text-lg">{{$t('shopping_cart.order_summary.order_summary')}}</span>
        </div>
  
        <!-- SUBTOTAL -->
        <div class="flex">
          <div class="mr-auto">{{$t('shopping_cart.order_summary.subtotal')}}</div>
          <div class="h-4 w-20 bg-slate-200 rounded"></div>
        </div>

        <div class="flex flex-row flex-wrap justify-between mt-2" v-if="shoppingCartStore.openTab === 2">
        <label class="w-fit my-auto whitespace-nowrap">{{$t('shopping_cart.order_summary.enter_promo')}}</label>
          <div class="input-group ml-auto"> 
            <input
            type="text"
            disabled
            class="form-control sm:w-32 h-[35px] text-right"
            />
            <button class="input-group-text h-[35px] w-16">{{$t('shopping_cart.order_summary.enter')}}</button>
          </div>
      </div>

        <!-- SHIPPING -->
        <div class="flex mt-4 border-t border-slate-200/60 dark:border-darkmode-400 mt-4
            pt-4">

            <div class="mr-auto">{{$t('shopping_cart.order_summary.shipping')}}</div>
            <div class="h-4 w-20 bg-slate-200 rounded"></div>
        </div>
  
        <!-- TOTAL -->
        <div
          class="
            flex flex-col
            mt-4
            pt-4
            gap-2
            border-t border-slate-200/60
            dark:border-darkmode-400
          "
        >
          
          <div class="flex flex-row">
            <div class="mr-auto font-medium text-base">{{$t('shopping_cart.order_summary.total_charge')}}</div>
            <div class="h-4 w-20 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
  
      <!-- ADD_MORE_ITEMS NEXT BUTTON -->
      <div class="flex gap-3 mt-5" v-if="shoppingCartStore.openTab === 1">
        <button
          class="btn w-32 border-slate-300 dark:border-darkmode-400 text-slate-500"
          disabled
        >
          + {{$t('shopping_cart.order_summary.add_item')}}
        </button>
        <button disabled class="btn btn-primary w-32 shadow-md ml-auto">{{$t('shopping_cart.order_summary.next')}}</button>
      </div>
    </div>
      
  </template>

<script setup>
    import { useShoppingCartStore } from "@/stores/lss-shopping-cart";

    const shoppingCartStore = useShoppingCartStore();
</script>
