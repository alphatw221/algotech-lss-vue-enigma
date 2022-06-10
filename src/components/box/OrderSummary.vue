<template>
  <div class="box p-5 m-3 border-2 border-secondary">
    <div>
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">Order Summary</span>
      </div>
	  
      <div class="flex">
        <div class="mr-auto">Subtotal</div>
        <div class="font-medium">$ {{ parseFloat(store.order.subtotal).toFixed(2) }}</div>
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
        <div class="font-medium">${{ shippingCost }}</div>
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
        <div class="font-medium text-base">${{ cartTotal).toFixed(2) }}</div>
      </div>
    </div>
    <div class="flex mt-5" v-if="store.openTab === 1">
      <button
        class="btn w-32 border-slate-300 dark:border-darkmode-400 text-slate-500"
        @click="store.showAddItemModal = ! store.showAddItemModal"
      >
        + Add more items
      </button>
      <button class="btn btn-primary w-32 shadow-md ml-auto" @click="store.openTab=2">Checkout</button>
    </div>
  </div>
    
</template>

<script setup>
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { computed, onMounted, ref, watch } from "vue";

const store = useShoppingCartStore(); 

const addItem = ()=>{
  console.log('add item')
}
const shippingCost = ref(0)
const cartTotal = ref(0)


const updateOrderSummary = ()=>{
    if (store.shipping_info.method=='pickup'){
      shippingCost.value = 0
      cartTotal.value = parseFloat(store.order.subtotal + store.order.adjust_price ).toFixed(2)
      return
    }

    const campaign = store.order.campaign||null
    if (!campaign) return
    
    const meta_logistic = campaign.meta_logistic || null
    if (!meta_logistic) return

    let delivery_charge = meta_logistic.delivery_charge || 0
    delivery_charge = Number(delivery_charge)

    const delivery_titles = meta_logistic.additional_delivery_charge_title || null
    const delivery_types = meta_logistic.additional_delivery_charge_type || null
    const delivery_prices = meta_logistic.additional_delivery_charge_price || null


    const free_delivery_for_order_above_price = meta_logistic.is_free_delivery_for_order_above_price == 1 ? meta_logistic.free_delivery_for_order_above_price : 0
    const free_delivery_for_how_many_order_minimum = meta_logistic.is_free_delivery_for_how_many_order_minimum == 1 ? meta_logistic.free_delivery_for_how_many_order_minimum : 0

    const is_subtotal_over_free_delivery_threshold = store.order.subtotal >= free_delivery_for_order_above_price
    const is_items_over_free_delivery_threshold = store.order.products.length >= free_delivery_for_how_many_order_minimum

    if ( delivery_titles && delivery_types && delivery_prices ){      
      const index = delivery_titles.indexOf(store.shipping_info.shipping_option)

      if (delivery_types[index] == '+'){
        delivery_charge += Number(delivery_prices[index])
      }
      else if(delivery_types[index] == '='){
        delivery_charge =  Number(delivery_prices[index])
      }
    }

    if (store.order.free_delivery || is_subtotal_over_free_delivery_threshold || is_items_over_free_delivery_threshold) delivery_charge = 0
        
    shippingCost.value = delivery_charge
    cartTotal.value = store.order.subtotal + store.order.adjust_price + delivery_charge
}
watch(
  computed(() => store.order),
  updateOrderSummary
);

watch(
  computed(() => store.shipping_info.method),
  updateOrderSummary
);
watch(
  computed(() => store.shipping_info.shipping_option),
  ()=>{
    console.log(store.shipping_info.shipping_option)
    updateOrderSummary()
  }
);

//  this.eventBus.emit("addPoint");
</script>
 