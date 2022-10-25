<template>
  <div class="box p-5 sm:m-3 border-2 border-secondary">
    <div class="flex flex-col">
      <!-- ORDER SUMMARY -->
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">{{$t('shopping_cart.order_summary.order_summary')}}</span>
      </div>

      <!-- SUBTOTAL -->
      <div class="flex">
        <div class="mr-auto">{{$t('shopping_cart.order_summary.subtotal')}}</div>
        <div class="font-medium" v-if="shoppingCartStore.cart.campaign||false">
          {{shoppingCartStore.cart.campaign.currency}} 
          {{(Math.floor(parseFloat(computedCartSubtotal) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
          {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
        </div>
      </div>

      

      <!-- DISCOUNT -->
      <div v-if="shoppingCartStore.cart.discount != 0 && shoppingCartStore.cart.campaign||false" class="flex flex-row justify-between mt-2" >
        <label class="w-fit my-auto whitespace-nowrap">{{ $t('shopping_cart.order_summary.promo_discount')}} </label>
        <span class="font-medium text-danger"> 
          {{shoppingCartStore.cart.campaign.currency}} 
          -{{(Math.floor(parseFloat(shoppingCartStore.cart.discount) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
          {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
        </span>
      </div>

      <!-- SUBTOTAL AFTER DISCOUNT -->
      <div v-if="shoppingCartStore.cart.discount != 0 && shoppingCartStore.cart.campaign||false" class="flex flex-row justify-between mt-2" >
        <label class="w-fit my-auto whitespace-nowrap">Subtotal After Discount </label>
        <span class="font-medium "> 
          {{shoppingCartStore.cart.campaign.currency}} 
          {{(Math.floor(parseFloat(Math.max(computedCartSubtotal-shoppingCartStore.cart.discount,0)) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
          {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
        </span>
      </div>

      <!-- PROMO CODE INPUT -->
      <div class="flex flex-row flex-wrap justify-between mt-2" >
        <label class="w-fit my-auto whitespace-nowrap">{{$t('shopping_cart.order_summary.enter_promo')}}</label>
          <div class="input-group"> 
            <input
            type="text"
            class="form-control w-32 h-[35px] text-right"
            v-model="discount_code"
            @keydown.enter.prevent="promoCheck()"
            />
            <button class="input-group-text h-[35px]" @click="promoCheck()">{{$t('shopping_cart.order_summary.enter')}}</button>
            <XIcon v-if="shoppingCartStore.cart.discount != 0 && shoppingCartStore.cart.campaign||false" class="mt-auto w-6 h-6 text-slate-400 cursor-pointer my-auto ml-2" @click="promoDelete()"/>
          </div>
          
      </div>
      <span v-if="shoppingCartStore.cart?.applied_discount?.code != undefined" class="lg:text-right text-left font-medium text-red-600">{{$t('shopping_cart.order_summary.promo_apply',{ code :shoppingCartStore.cart?.applied_discount?.code})}} </span>

      <!-- REFERAL CODE INFO -->
      <div class="flex justify-between mt-2"  v-for="referalCode, index in shoppingCartStore.referalCodes" :key="index">

        <label class=" my-auto whitespace-nowrap mr-5">{{$t('shopping_cart.order_summary.referr_code')}}</label>
        <button @click="copyURL(referalCode.code+'-'+route.params.cart_oid)"
          class="flex my-auto whitespace-nowrap border-2 border-green-800 rounded-md p-1 px-2 text-green-800 font-medium truncate">{{referalCode.code+'-'+route.params.cart_oid}} 
        </button>
        <!-- <div v-if="referalCode.description" class="my-auto whitespace-nowrap">{{referalCode.description}}</div> -->

      </div>


      <!-- SHIPPING -->
      <template v-if="shoppingCartStore.shipping_info.shipping_method !== 'pickup'">
        
        <div class="flex mt-4 border-t border-slate-200/60 dark:border-darkmode-400 mt-4
            pt-4">

          <div class="mr-auto">{{$t('shopping_cart.order_summary.shipping')}}</div>


          <template v-if="shoppingCartStore.cart?.campaign">

            <div class="font-medium" v-if=" shoppingCartStore.cart?.free_delivery || computedSubtotalOverFreeDeliveryThreshold || computedItemsOverFreeDeliveryThreshold ">
              {{shoppingCartStore.cart.campaign.currency}} 
              {{(Math.floor(parseFloat(0) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
              {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
            </div>

            <div class="font-medium" v-else>
              {{shoppingCartStore.cart.campaign.currency}} 
              {{(Math.floor(parseFloat(computedShippingCost) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
              {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
            </div>

          </template>
        
        </div>
        <div v-if="shoppingCartStore.cart?.free_delivery || computedSubtotalOverFreeDeliveryThreshold || computedItemsOverFreeDeliveryThreshold" class="text-red-600 text-sm">{{$t('shopping_cart.order_summary.free_delivery')}}</div>
        <div v-if="computedIsMultipleShippingCostApplied" class="text-red-600 text-sm">Multiple Shipping Fee Applied</div>

      </template>
      



      <!-- ADJUST_PRICE -->
      <div class="flex mt-4" v-if="shoppingCartStore.cart.adjust_price != 0">
        <div class="mr-auto" v-if="shoppingCartStore.cart.adjust_title">
          <div>{{ shoppingCartStore.cart.adjust_title }}</div>
          <div>({{$t('shopping_cart.order_summary.price_adjustment')}})</div>
        </div>
        <div class="mr-auto" v-else>{{$t('shopping_cart.order_summary.price_adjustment')}}</div>

        <div class="font-medium text-danger" v-if="shoppingCartStore.cart.campaign||false">
          {{shoppingCartStore.cart.campaign.currency}} 
          {{(Math.floor(parseFloat(shoppingCartStore.cart.adjust_price) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
          {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
        </div>
      </div>

      <!-- TOTAL -->
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
        <div class="font-medium text-base" v-if="shoppingCartStore.cart.campaign||false">
          {{shoppingCartStore.cart.campaign.currency}} 
          {{(Math.floor(parseFloat(computedCartTotal) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
          {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
        </div>
      </div>
    </div>

    <!-- ADD_MORE_ITEMS NEXT BUTTON -->
    <div class="flex mt-5" v-if="shoppingCartStore.openTab === 1">
      <button
        class="btn w-32 border-slate-300 dark:border-darkmode-400 text-slate-500"
        @click="shoppingCartStore.showAddItemModal = ! shoppingCartStore.showAddItemModal"
      >
        + {{$t('shopping_cart.order_summary.add_item')}}
      </button>
      <button class="btn btn-primary w-32 shadow-md ml-auto" @click="toNext()">{{$t('shopping_cart.order_summary.next')}}</button>
    </div>
  </div>
  <Modal :show="showModal" backdrop="static">
      <ModalBody class="p-10 text-center">
          <div class="mt-1">
              <label for="regular-form-2" class="form-label" style="font-size: 1.2rem;">Please social login to use promo code</label>
          </div>
          <div class="">
              <button class="w-32 btn dark:border-darkmode-400 mt-7" @click="showModal =false; showLoginModal()">OK</button>
          </div>
      </ModalBody>
  </Modal>
    
</template>

<script setup>
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { computed, onMounted, ref, watch } from "vue";
// import { buyer_apply_discount_code, buyer_cancel_discount_code } from "@/api_v2/pre_order"; 
import { buyer_apply_discount_code, buyer_cancel_discount_code } from "@/api_v2/cart"
import { get_shopify_checkout_url } from '@/plugin/shopify/api/cart.js';
import { useCookies } from "vue3-cookies";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const { cookies } = useCookies();
const shoppingCartStore = useShoppingCartStore();
const layoutStore = useLSSBuyerLayoutStore();

// const shippingCost = ref(0)
// const cartTotal = ref(0)
const showModal = ref(false)

const computedCartSubtotal = computed(()=>{
  var subtotal = 0
  Object.entries(shoppingCartStore.cart.products).forEach(([key, value])=>{
    subtotal += ((shoppingCartStore.campaignProductDict[key]?.price||0)*value )
  })
  return subtotal
})

const computedShippingCost = computed(()=>{
  var shippingCost = 0 
  if(shoppingCartStore.shipping_info.shipping_method=='pickup'){
    return 0
  }else{
    if(!shoppingCartStore.cart?.campaign?.meta_logistic){
      return 0
    }else{
      const meta_logistic = shoppingCartStore.cart?.campaign?.meta_logistic

      //----------------product category logistic setting-------------------------------------
      const logisticCategories = {}
      var applyCategoryLogistic = false
      Object.entries(shoppingCartStore.cart.products).forEach(([key, value])=>{

        console.log(shoppingCartStore.campaignProductDict?.[key]?.categories)
        console.log(shoppingCartStore.productCategoryDict)
        if(value>0 && shoppingCartStore.campaignProductDict?.[key]?.categories?.length===1 && shoppingCartStore.campaignProductDict?.[key]?.categories[0] in shoppingCartStore.productCategoryDict){
          logisticCategories[shoppingCartStore.campaignProductDict?.[key]?.categories[0]]=true
        }
      })
      Object.keys(logisticCategories).forEach((key)=>{
        const productCategory = shoppingCartStore.productCategoryDict[key]
        if(productCategory?.meta_logistic?.enable_flat_rate){
          applyCategoryLogistic = true
          shippingCost+=productCategory?.meta_logistic?.flat_rate||0
        }
      })
      if(applyCategoryLogistic)return shippingCost
      //----------------default logistic setting-------------------------------------
      shippingCost = Number(meta_logistic.delivery_charge || 0)

      if(typeof shoppingCartStore.shipping_info.shipping_option_index=='number'){
        if (meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].type== '+'){
          shippingCost += Number(meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].price)
        }
        else if(meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].type == '='){
          shippingCost =  Number(meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].price)
        }
      }
    }
  }
  return shippingCost
})

const computedIsMultipleShippingCostApplied = computed(()=>{  //temp

  const logisticCategories = {}
  Object.entries(shoppingCartStore.cart?.products||[]).forEach(([key, value])=>{
    if(value>0 && shoppingCartStore.campaignProductDict?.[key]?.categories?.length===1 && shoppingCartStore.campaignProductDict?.[key]?.categories[0] in shoppingCartStore.productCategoryDict){
      const productCategory = shoppingCartStore.productCategoryDict[shoppingCartStore.campaignProductDict?.[key]?.categories[0]]
      if(productCategory?.meta_logistic?.enable_flat_rate == true){
        logisticCategories[shoppingCartStore.campaignProductDict?.[key]?.categories[0]] = true
      }
    }
  })
  return Object.keys(logisticCategories).length>1
})

const computedCartTotal = computed(()=>{

  let total = 0
  total += computedCartSubtotal.value
  total -= shoppingCartStore.cart.discount||0
  total = Math.max(total, 0)

  if(shoppingCartStore.cart.free_delivery || computedSubtotalOverFreeDeliveryThreshold.value || computedItemsOverFreeDeliveryThreshold.value){
    //
  }else{
    total += computedShippingCost.value
  }
      
  total += shoppingCartStore.cart.adjust_price

  return Math.max(total, 0)

})

const computedSubtotalOverFreeDeliveryThreshold = computed(()=>{
  return shoppingCartStore.cart.campaign?.meta_logistic?.is_free_delivery_for_order_above_price ? computedCartSubtotal.value >= shoppingCartStore.cart.campaign?.meta_logistic?.free_delivery_for_order_above_price : false
})

const computedItemsOverFreeDeliveryThreshold = computed(()=>{
  return shoppingCartStore.cart.campaign?.meta_logistic?.is_free_delivery_for_how_many_order_minimum ? shoppingCartStore.cart.products.length >= shoppingCartStore.cart.campaign?.meta_logistic?.free_delivery_for_how_many_order_minimum : false
})

// const updateOrderSummary = ()=>{
//   console.log('update')
//   let is_subtotal_over_free_delivery_threshold=false
//   let is_items_over_free_delivery_threshold=false


//   //compute shipping cost
//   if(shoppingCartStore.shipping_info.shipping_method=='pickup'){
//     shippingCost.value = 0
//   }else{
//     if(!shoppingCartStore.cart?.campaign?.meta_logistic){
//       shippingCost.value = 0
//     }else{
//       const meta_logistic = shoppingCartStore.cart?.campaign?.meta_logistic

//       shippingCost.value = Number(meta_logistic.delivery_charge || 0)

//       is_subtotal_over_free_delivery_threshold = meta_logistic.is_free_delivery_for_order_above_price ? shoppingCartStore.cart.subtotal >= meta_logistic.free_delivery_for_order_above_price : false
//       is_items_over_free_delivery_threshold = meta_logistic.is_free_delivery_for_how_many_order_minimum ? shoppingCartStore.cart.products.length >= meta_logistic.free_delivery_for_how_many_order_minimum : false
      
//       if(typeof shoppingCartStore.shipping_info.shipping_option_index=='number'){
//         if (meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].type== '+'){
//           shippingCost.value += Number(meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].price)
//         }
//         else if(meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].type == '='){
//           shippingCost.value =  Number(meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].price)
//         }
//       }

//     }
    
//   }
 
//   //summarize_total
//   let total = 0
//   total += shoppingCartStore.cart.subtotal
//   total -= shoppingCartStore.cart.discount
//   total = Math.max(total, 0)

//   if(shoppingCartStore.cart.free_delivery || is_subtotal_over_free_delivery_threshold || is_items_over_free_delivery_threshold){
//     //
//   }else{
//     total += shippingCost.value
//   }
      
//   total += shoppingCartStore.cart.adjust_price

//   cartTotal.value = Math.max(total, 0)
// }

// watch(
//   computed(() => shoppingCartStore.cart),
//   updateOrderSummary
// );

onMounted(()=>{
  shoppingCartStore.cart.discount = ''
  shoppingCartStore.cart.applied_discount = {}
})

// watch(
//   computed(() => {return shoppingCartStore.shipping_info}),
//   updateOrderSummary,{deep:true}
// );

const discount_code = ref('')
const promoCheck =()=>{
  if (layoutStore.userInfo && Object.keys(layoutStore.userInfo).length === 0 && Object.getPrototypeOf(layoutStore.userInfo) === Object.prototype) {
      showModal.value = true
  } else {
      buyer_apply_discount_code(route.params.cart_oid, {discount_code : discount_code.value }, layoutStore.alert).then(
        res=>{
          shoppingCartStore.cart = res.data
          discount_code.value = ''
        })
  }
}

const showLoginModal = () => {
  layoutStore.showLoginModal=true
}

const promoDelete =()=>{
  buyer_cancel_discount_code(route.params.cart_oid, layoutStore.alert).then(
    res=>{
      shoppingCartStore.cart = res.data
      discount_code.value = ''
    })
}

const copyURL = (code)=>{
  navigator.clipboard.writeText(`${code}`).then(()=>{
      layoutStore.notification.showMessageToast('copied!')
  })
}

const toNext=()=>{
  if (shoppingCartStore.user_subscription?.user_plan?.plugins?.shopify) {
      get_shopify_checkout_url(route.params.cart_oid, layoutStore.alert).then(res=>{
          window.location.href = res.data
      })
  } else {
      shoppingCartStore.openTab=2
  }
  
  // router.push({query:{tab:2}})
  // if(cookies.get('login_with')=='anonymousUser')
  // buyerLayoutStore.showLoginModal=true
}
//  this.eventBus.emit("addPoint");
</script>
 