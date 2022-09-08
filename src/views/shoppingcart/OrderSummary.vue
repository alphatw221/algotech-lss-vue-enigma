<template>
  <div class="box p-5 sm:m-3 border-2 border-secondary">
    <div class="flex flex-col">
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">{{$t('shopping_cart.order_summary.order_summary')}}</span>
      </div>
	  
      <div class="flex">
        <div class="mr-auto">{{$t('shopping_cart.order_summary.subtotal')}}</div>
        <div class="font-medium" v-if="store.order.campaign||false">
          {{store.order.campaign.currency}} 
          {{Math.floor(parseFloat(store.order.subtotal) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
          {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
        </div>
      </div>
      <div class="flex mt-4" v-if="store.order.adjust_price != 0">
        <div class="mr-auto" v-if="store.order.adjust_title">
          <div>{{ store.order.adjust_title }}</div>
          <div>({{$t('shopping_cart.order_summary.price_adjustment')}})</div>
        </div>
        <div class="mr-auto" v-else>{{$t('shopping_cart.order_summary.price_adjustment')}}</div>

        <div class="font-medium text-danger" v-if="store.order.campaign||false">
          {{store.order.campaign.currency}} 
          {{Math.floor(parseFloat(store.order.adjust_price) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
          {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
        </div>
      </div>

      <div v-if="store.order.discount != 0 && store.order.campaign||false" class="flex flex-row justify-between mt-2" >
        <label class="w-fit my-auto whitespace-nowrap">{{ $t('shopping_cart.order_summary.promo_discount')}} </label>
        <span class="font-medium text-danger"> 
          {{store.order.campaign.currency}} 
          -{{Math.floor(parseFloat(store.order.discount) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
          {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
        </span>
      </div>

      <div class="flex flex-row justify-between mt-2" >
        <label class="w-fit my-auto whitespace-nowrap">{{$t('shopping_cart.order_summary.enter_promo')}}</label>
          <div class="input-group"> 
            <input
            type="text"
            class="form-control w-32 h-[35px] text-right"
            v-model="discount_code"
            @keydown.enter.prevent="promoCheck()"
            />
            <button class="input-group-text h-[35px]" @click="promoCheck()">{{$t('shopping_cart.order_summary.enter')}}</button>
            <XIcon v-if="store.order.discount != 0 && store.order.campaign||false" class="mt-auto w-6 h-6 text-slate-400" @click="promoDelete()"/>
          </div>
          
      </div>
      <span v-if="store.order.applied_discount.code != undefined" class="text-right font-medium text-red-600">{{$t('shopping_cart.order_summary.promo_apply',{ code :store.order.applied_discount.code})}} </span>

      <div class="flex justify-between mt-2 flex-wrap"  v-for="referalCode, index in store.referalCodes" :key="index">

        <label class=" my-auto whitespace-nowrap">{{$t('shopping_cart.order_summary.referr_code')}}</label>
        <button @click="copyURL(referalCode.code+'-'+route.params.pre_order_oid)"
          class="flex my-auto whitespace-nowrap border-2 border-green-800 rounded-md p-1 px-2 text-green-800 font-medium">{{referalCode.code+'-'+route.params.pre_order_oid}} 
        </button>
        <!-- <div v-if="referalCode.description" class="my-auto whitespace-nowrap">{{referalCode.description}}</div> -->

      </div>

      <div v-if="store.shipping_info.shipping_method !== 'pickup'"
        class="flex mt-4 border-t border-slate-200/60 dark:border-darkmode-400 mt-4
          pt-4">
        <div class="mr-auto">{{$t('shopping_cart.order_summary.shipping')}}</div>
        <div class="font-medium" v-if="store.order.campaign||false">
          {{store.order.campaign.currency}} 
          {{Math.floor(parseFloat(shippingCost) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
          {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
        </div>
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
        <div class="font-medium text-base" v-if="store.order.campaign||false">
          {{store.order.campaign.currency}} 
          {{Math.floor(parseFloat(cartTotal) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
          {{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
        </div>
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
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { computed, onMounted, ref, watch } from "vue";
import { buyer_apply_discount_code, buyer_cancel_discount_code } from "@/api_v2/pre_order"; 
import { get_shopify_checkout_url } from '@/plugin/shopify/api/cart.js';
import { useCookies } from "vue3-cookies";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const { cookies } = useCookies();
const store = useShoppingCartStore();
const layoutStore = useLSSBuyerLayoutStore();

const addItem = ()=>{
  console.log('add item')
}
const shippingCost = ref(0)
const cartTotal = ref(0)

const updateOrderSummary = ()=>{
    console.log(store.referalCodes)
    if (store.shipping_info.shipping_method=='pickup'){
      shippingCost.value = 0
      cartTotal.value = Math.floor(parseFloat(store.order.subtotal + store.order.adjust_price - store.order.discount ) * (10 ** store.order.campaign.decimal_places)) / (10 ** store.order.campaign.decimal_places)
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
    cartTotal.value = store.order.subtotal + store.order.adjust_price - store.order.discount + delivery_charge 
}

watch(
  computed(() => store.order),
  updateOrderSummary
);

onMounted(()=>{
  store.order.discount = ''
  store.order.applied_discount = {}
  console.log(store.referalCodes)
})

watch(
  computed(() => {return store.shipping_info}),
  updateOrderSummary,{deep:true}
);
const discount_code = ref('')
const promoCheck =()=>{
  buyer_apply_discount_code(route.params.pre_order_oid, {discount_code : discount_code.value }).then(
    res=>{
      store.order = res.data
      discount_code.value = ''
    })
}

const promoDelete =()=>{
  buyer_cancel_discount_code(route.params.pre_order_oid, {discount_code : discount_code.value }).then(
    res=>{
      store.order = res.data
      discount_code.value = ''
    })
}

const copyURL = (code)=>{
  navigator.clipboard.writeText(`${code}`).then(()=>{
      layoutStore.notification.showMessageToast('copied!')
  })
}

const toNext=()=>{
  if (store.order.campaign.user_subscription.user_plan.plugins.shopify) {
      get_shopify_checkout_url(route.params.pre_order_oid).then(res=>{
          window.location.href = res.data
      })
  } else {
      store.openTab=2
  }
  
  // router.push({query:{tab:2}})
  // if(cookies.get('login_with')=='anonymousUser')
  // buyerLayoutStore.showLoginModal=true
}
//  this.eventBus.emit("addPoint");
</script>
 