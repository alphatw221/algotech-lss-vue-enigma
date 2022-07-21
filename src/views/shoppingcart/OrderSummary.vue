<template>
  <div class="box p-5 m-3 border-2 border-secondary">
    <div>
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">{{$t('shopping_cart.order_summary.order_summary')}}</span>
      </div>
	  
      <div class="flex">
        <div class="mr-auto">{{$t('shopping_cart.order_summary.subtotal')}}</div>
        <div class="font-medium" v-if="store.order.campaign||false">{{store.order.campaign.currency}} {{ parseFloat(store.order.subtotal).toFixed(2) }}</div>
      </div>
      <div class="flex mt-4">


        <div class="mr-auto" v-if="store.order.adjust_title">
          <div>{{ store.order.adjust_title }}</div>
          <div>({{$t('shopping_cart.order_summary.price_adjustment')}})</div>
        </div>
        <div class="mr-auto" v-else>{{$t('shopping_cart.order_summary.price_adjustment')}}</div>

        <div class="font-medium text-danger" v-if="store.order.campaign||false">{{store.order.campaign.currency}} {{ parseFloat(store.order.adjust_price).toFixed(2) }}</div>
      </div>
      
      <div v-if="store.shipping_info.shipping_method !== 'pickup'"
        class="flex mt-4 border-t border-slate-200/60 dark:border-darkmode-400 mt-4
          pt-4">
        <div class="mr-auto">{{$t('shopping_cart.order_summary.shipping')}}</div>
        <div class="font-medium" v-if="store.order.campaign||false">{{store.order.campaign.currency}} {{ shippingCost }}</div>
      </div>
      <div v-if="shippingCost === 0 && store.shipping_info.shipping_method !== 'pickup'" class="text-red-600 text-sm">{{$t('shopping_cart.order_summary.free_delivery')}}</div>
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
        <div class="font-medium text-base" v-if="store.order.campaign||false">{{store.order.campaign.currency}} {{ parseFloat(cartTotal).toFixed(2) }}</div>
      </div>
    </div>
    <div class="flex mt-5" v-if="store.openTab === 1">
      <button
        class="btn w-32 border-slate-300 dark:border-darkmode-400 text-slate-500"
        @click="store.showAddItemModal = ! store.showAddItemModal"
      >
        + {{$t('shopping_cart.order_summary.add_item')}}
      </button>
      <button class="btn btn-primary w-32 shadow-md ml-auto" @click="toNext()">{{$t('shopping_cart.order_summary.next')}}</button>
    </div>
  </div>
    
</template>

<script setup>
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { computed, onMounted, ref, watch } from "vue";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { useCookies } from "vue3-cookies";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const { cookies } = useCookies();
const buyerLayoutStore = useLSSBuyerLayoutStore();
const store = useShoppingCartStore(); 

const addItem = ()=>{
  console.log('add item')
}
const shippingCost = ref(0)
const cartTotal = ref(0)


const updateOrderSummary = ()=>{

    console.log('update order summary')
    if (store.shipping_info.shipping_method=='pickup'){
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

    // const delivery_titles = meta_logistic.additional_delivery_charge_title || null
    // const delivery_types = meta_logistic.additional_delivery_charge_type || null
    // const delivery_prices = meta_logistic.additional_delivery_charge_price || null


    // const free_delivery_for_order_above_price = meta_logistic.is_free_delivery_for_order_above_price == 1 ? meta_logistic.free_delivery_for_order_above_price : 0
    // const free_delivery_for_how_many_order_minimum = meta_logistic.is_free_delivery_for_how_many_order_minimum == 1 ? meta_logistic.free_delivery_for_how_many_order_minimum : 0

    const is_subtotal_over_free_delivery_threshold = meta_logistic.is_free_delivery_for_order_above_price ? store.order.subtotal >= meta_logistic.free_delivery_for_order_above_price : false
    const is_items_over_free_delivery_threshold = meta_logistic.is_free_delivery_for_how_many_order_minimum ? store.order.products.length >= meta_logistic.free_delivery_for_how_many_order_minimum : false

    // let index = meta_logistic.additional_delivery_options.findIndex(option=> option.title == store.shipping_info.shipping_option)
    if ( !['',null,undefined].includes(store.shipping_info.shipping_option_index) && meta_logistic.additional_delivery_options[store.shipping_info.shipping_option_index] ){      
      const option = meta_logistic.additional_delivery_options[store.shipping_info.shipping_option_index]
      // const index = delivery_titles.indexOf(store.shipping_info.shipping_option)

      if (option.type== '+'){
        delivery_charge += Number(option.price)
      }
      else if(option.type == '='){
        delivery_charge =  Number(option.price)
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
  computed(() => {return store.shipping_info}),
  updateOrderSummary,{deep:true}
);



const toNext=()=>{
  store.openTab=2
  // router.push({query:{tab:2}})
  // if(cookies.get('login_with')=='anonymousUser')
  // buyerLayoutStore.showLoginModal=true
}
//  this.eventBus.emit("addPoint");
</script>
 