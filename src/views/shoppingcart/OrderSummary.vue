<template>
  <div class="box p-5 border-2 border-secondary">
    <div class="flex flex-col gap-4">
      <!-- ORDER SUMMARY -->
      <h2 class="mb-2">{{$t('shopping_cart.order_summary.order_summary')}}</h2>

      <!-- SUBTOTAL -->
      <div class="flex flex-row justify-between">
        <p>{{$t('shopping_cart.order_summary.subtotal')}}</p>
        <h4 class="font-medium" v-if="shoppingCartStore.cart.campaign||false">
          {{shoppingCartStore.cart.campaign.currency}} 
          {{(Math.floor(parseFloat(computedCartSubtotal) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
          {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
        </h4>
      </div>

      <!-- DISCOUNT -->
      <div v-if="shoppingCartStore.cart.discount != 0 && shoppingCartStore.cart.campaign||false" class="flex flex-row justify-between" >
        <p class="w-fit my-auto whitespace-nowrap">{{ $t('shopping_cart.order_summary.promo_discount')}} </p>
        <h4 class="font-medium text-danger"> 
          {{shoppingCartStore.cart.campaign.currency}}
          -{{(Math.floor(parseFloat(shoppingCartStore.cart.discount) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
          {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
        </h4>
      </div>

      <!-- POINT DISCOUNT -->
      <div v-if="computedPointDiscount != 0 && shoppingCartStore.cart.campaign||false" class="flex flex-row justify-between" >
        <p class="w-fit my-auto whitespace-nowrap">{{$t('order.point_discount')}}</p>
        <span class="font-medium text-danger"> 
          {{shoppingCartStore.cart.campaign.currency}} 
          -{{(Math.floor(parseFloat(computedPointDiscount) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
          {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
        </span>
      </div>

      <!-- SUBTOTAL AFTER DISCOUNT -->
      <div v-if="(shoppingCartStore.cart.discount != 0 || computedPointDiscount != 0) && shoppingCartStore.cart.campaign||false" class="flex flex-row justify-between" >
        <p class="w-fit my-auto whitespace-nowrap">{{$t('cart.subtotal_after_discount')}}</p>
        <h4 class="font-medium"> 
          {{shoppingCartStore.cart.campaign.currency}} 
          {{(Math.floor(parseFloat(computedSubtotalAfterDiscount) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
          {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
        </h4>
      </div>

      <!-- PROMO CODE INPUT -->
      <template v-if="route.query?.tab==2">
        <div class="flex flex-row flex-wrap justify-between">
          <label class="w-fit my-auto whitespace-nowrap">{{$t('shopping_cart.order_summary.enter_promo')}}</label>
            <div class="input-group ml-auto"> 
              <input
              type="text"
              class="form-control sm:w-32 h-[35px] text-right"
              v-model="discount_code"
              @keydown.enter.prevent="promoCheck()"
              />
              <button class="input-group-text h-[35px] w-16" @click="promoCheck()">{{$t('shopping_cart.order_summary.enter')}}</button>
              <XIcon v-if="shoppingCartStore.cart.discount != 0 && shoppingCartStore.cart.campaign||false" class="mt-auto w-6 h-6 text-slate-400 cursor-pointer my-auto ml-2" @click="promoDelete()"/>
            </div>
        </div>
        <span v-if="shoppingCartStore.cart?.applied_discount?.code != undefined" class="lg:text-right text-left font-medium text-red-600">{{$t('shopping_cart.order_summary.promo_apply',{ code :shoppingCartStore.cart?.applied_discount?.code})}} </span>

        <!-- POINTS INPUT -->
        <div class="flex flex-row flex-wrap justify-between" v-if="shoppingCartStore.cart.campaign?.meta_point?.enable">
          <div>
            <h4 class="w-fit my-auto whitespace-nowrap">{{$t('shopping_cart.order_summary.points_redemption')}}</h4>
            <h4 class="w-fit my-auto whitespace-nowrap text-danger">({{computedWalletPointsLeft}} points)</h4>
          </div>
          
          <input
            type="number"
            class="form-control w-32 h-[35px] text-right"
            v-model="shoppingCartStore.points_used"
          />
        </div>
      </template>

      <!-- REFERAL CODE INFO -->
      <div class="flex justify-between"  v-for="referalCode, index in shoppingCartStore.referalCodes" :key="index">

        <h4 class=" my-auto whitespace-nowrap mr-5">{{$t('shopping_cart.order_summary.referr_code')}}</h4>
        <button @click="copyURL(referalCode.code+'-'+route.params.cart_oid)"
          class="flex my-auto whitespace-nowrap border-2 border-green-800 rounded-md p-1 px-2 text-green-800 font-medium truncate">{{referalCode.code+'-'+route.params.cart_oid}} 
        </button>
        <!-- <div v-if="referalCode.description" class="my-auto whitespace-nowrap">{{referalCode.description}}</div> -->
      </div>

      <!-- SHIPPING -->
      <template v-if="shoppingCartStore.shipping_info.shipping_method !== 'pickup'">
        
        <div class="flex pt-4 border-t border-slate-200/60 dark:border-darkmode-400">

          <p class="mr-auto">{{$t('shopping_cart.order_summary.shipping')}}</p>
          <template v-if="shoppingCartStore.cart?.campaign">
            
            <h4 class="font-medium" v-if=" shoppingCartStore.cart?.free_delivery || computedSubtotalOverFreeDeliveryThreshold || computedItemsOverFreeDeliveryThreshold ">
              {{shoppingCartStore.cart.campaign.currency}} 
              {{(Math.floor(parseFloat(0) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
              {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
            </h4>

            <h4 class="font-medium" v-else>
              {{shoppingCartStore.cart.campaign.currency}} 
              {{(Math.floor(parseFloat(computedShippingCost) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
              {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
            </h4>
          </template>
        </div>
        <h4 v-if="shoppingCartStore.cart?.free_delivery || computedSubtotalOverFreeDeliveryThreshold || computedItemsOverFreeDeliveryThreshold" class="text-danger">{{$t('shopping_cart.order_summary.free_delivery')}}</h4>
        <h4 v-else-if="computedIsMultipleShippingCostApplied" class="text-danger">{{$t('cart.multiple_shipping_included')}}</h4>

      </template>
      
      <!-- ADJUST_PRICE -->
      <div class="flex" v-if="shoppingCartStore.cart.adjust_price !== 0">
        <div class="mr-auto" v-if="shoppingCartStore.cart.adjust_title">
          <p>{{ shoppingCartStore.cart.adjust_title }}</p>
          <h4>({{$t('shopping_cart.order_summary.price_adjustment')}})</h4>
        </div>
        <p class="mr-auto" v-else>{{$t('shopping_cart.order_summary.price_adjustment')}}</p>

        <h4 class="font-medium text-danger" v-if="shoppingCartStore.cart.campaign||false">
          {{shoppingCartStore.cart.campaign.currency}}
          {{(Math.floor(parseFloat(shoppingCartStore.cart.adjust_price) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
          {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
        </h4>
      </div>

      <!-- TOTAL -->
      <div
        class="
          flex flex-col pt-4 gap-2
          border-t border-slate-200/60
          dark:border-darkmode-400
        "
      >
        
        <div class="flex flex-row">
          <div class="mr-auto font-medium text-base">{{$t('shopping_cart.order_summary.total_charge')}}</div>
          <div class="font-medium text-base w-fit ml-auto" v-if="shoppingCartStore.cart.campaign||false">
            {{shoppingCartStore.cart.campaign.currency}} 
            {{(Math.floor(parseFloat(computedCartTotal) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
            {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
          </div>
        </div>
        <h4 class="text-danger ml-auto" v-if="shoppingCartStore.cart.campaign?.meta_point?.enable && computedPointsEarned>0">
          <template v-if="isAnonymousUser">
            {{$t('shopping_cart.order_summary.login_for_points',{points:computedPointsEarned})}}
          </template>
          <template v-else>
            {{$t('shopping_cart.order_summary.points_earn',{points:computedPointsEarned})}}
          </template>
        </h4>
      </div>
    </div>

    <!-- ADD_MORE_ITEMS NEXT BUTTON -->
    <div class="flex gap-3 mt-5" v-if="shoppingCartStore.openTab === 1">
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
          <div class="flex flex-col gap-5 justify-center font-bold">
              <!-- <AlertOctagonIcon class="text-danger w-full h-32"/> -->
              <label for="regular-form-2" class="form-label text-danger text-[24px]">{{$t('shopping_cart.order_summary.alert')}}</label>
              <SimpleIcon icon="err_bot" color="#E80000" class="w-full h-32 p-3" />
              <label for="regular-form-2" class="form-label text-black text-[20px]">{{$t('shopping_cart.order_summary.promo_login')}}</label>
              <button class="w-32 btn btn-rounded-primary dark:border-darkmode-400 mx-auto" @click="showModal =false; showLoginModal()">{{$t('shopping_cart.order_summary.ok')}}</button>
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
import { getPointDiscountHelper } from "@/libs/factory/pointDiscount.js"
const route = useRoute();
const router = useRouter();

const { cookies } = useCookies();
const shoppingCartStore = useShoppingCartStore();
const layoutStore = useLSSBuyerLayoutStore();

const showModal = ref(false)
const isAnonymousUser=cookies.get("login_with")=='anonymousUser'


const computedCartSubtotal = computed(()=>{
  var subtotal = 0
  Object.entries(shoppingCartStore.cart.products||{}).forEach(([key, qty])=>{
    subtotal += ((shoppingCartStore.campaignProductDict[key]?.price||0)*qty )
  })
  return subtotal
})

const computedShippingCost = computed(()=>{
  var shippingCost = 0 
  if(shoppingCartStore.shipping_info.shipping_method=='pickup') return 0
  
  if(!shoppingCartStore.cart?.campaign?.meta_logistic) return 0
  
  const meta_logistic = shoppingCartStore.cart?.campaign?.meta_logistic

  //----------------product category logistic setting-------------------------------------
  Object.entries(computedLogisticCategories.value).forEach(([productCategoryID, objects])=>{
    const productCategory = shoppingCartStore.productCategoryDict[productCategoryID]
    if(productCategory?.meta_logistic?.enable_flat_rate){

      var is_category_product_subtotal_above = false
      if(productCategory?.meta_logistic?.is_free_delivery_for_order_above_price){
        var category_products_subtotal = 0
        objects.forEach(object=>{
          category_products_subtotal += (shoppingCartStore.campaignProductDict?.[object.campaignProductId].price * object.qty)
        })
        is_category_product_subtotal_above = category_products_subtotal > productCategory?.meta_logistic?.free_delivery_for_order_above_price? true:false
      }

      shippingCost+=is_category_product_subtotal_above ? 0 : (productCategory?.meta_logistic?.flat_rate||0) 
    }
  })
  if(appliedCategoryLogistic.value) return shippingCost

  //----------------default logistic setting-------------------------------------
  if(shoppingCartStore.cart.campaign.meta_logistic.is_self_delivery_enabled) shippingCost = Number(meta_logistic.delivery_charge || 0)
  
  if (shoppingCartStore.shipping_info.shipping_method == 'delivery') {
    if(typeof shoppingCartStore.shipping_info.shipping_option_index=='number'){
      if (meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].type== '+'){
        shippingCost += Number(meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].price)
      }
      else if(meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].type == '='){
        shippingCost =  Number(meta_logistic.additional_delivery_options[shoppingCartStore.shipping_info.shipping_option_index].price)
      }
    }
    return shippingCost
  }
  
  //----------------ecpay logistic setting-------------------------------------
  if (shoppingCartStore.shipping_info.shipping_method == 'ecpay') {
    if (meta_logistic.ecpay.logistics_sub_type[shoppingCartStore.shipping_info.shipping_option_index].type== '+'){
      shippingCost += Number(meta_logistic.ecpay.logistics_sub_type[shoppingCartStore.shipping_info.shipping_option_index].delivery_charge)
    }
    else if(meta_logistic.ecpay.logistics_sub_type[shoppingCartStore.shipping_info.shipping_option_index].type == '='){
      shippingCost =  Number(meta_logistic.ecpay.logistics_sub_type[shoppingCartStore.shipping_info.shipping_option_index].delivery_charge)
    }
    return shippingCost
  }
  return shippingCost
})

const computedLogisticCategories = computed(()=>{
  let logisticCategories = {}
  Object.entries(shoppingCartStore.cart.products).forEach(([key, value])=>{
    if(value>0 && shoppingCartStore.campaignProductDict?.[key]?.categories?.length===1 && shoppingCartStore.campaignProductDict?.[key]?.categories[0] in shoppingCartStore.productCategoryDict){
      
      if(logisticCategories?.[shoppingCartStore.campaignProductDict?.[key]?.categories[0]]){
        logisticCategories[shoppingCartStore.campaignProductDict?.[key]?.categories[0]].push({campaignProductId:key,qty:value})
      }else{
        logisticCategories[shoppingCartStore.campaignProductDict?.[key]?.categories[0]] = [{campaignProductId:key,qty:value},]
      }
    }
  })
  return logisticCategories
})

const appliedCategoryLogistic = computed(()=>{
  var applied = false
  Object.entries(computedLogisticCategories.value).forEach(([productCategoryID, objects])=>{
    const productCategory = shoppingCartStore.productCategoryDict[productCategoryID]
    if(productCategory?.meta_logistic?.enable_flat_rate) applied = true
  })
  return applied
})

watch(computed(()=>appliedCategoryLogistic.value),()=>{shoppingCartStore.appliedCategoryLogistic = appliedCategoryLogistic.value})



const productTotalQuantity = computed(()=>{
  let qty = 0
  Object.entries(shoppingCartStore.cart?.products||[]).forEach(([key, value])=>{
    qty += value
  })
  return qty
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
  // computedShippingCost.value
  total += computedCartSubtotal.value
  total -= shoppingCartStore.cart.discount||0
  total -= computedPointDiscount.value
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
  return shoppingCartStore.cart.campaign?.meta_logistic?.is_free_delivery_for_how_many_order_minimum ? productTotalQuantity.value >= shoppingCartStore.cart.campaign?.meta_logistic?.free_delivery_for_how_many_order_minimum : false
})


const computedPointDiscount = computed(()=>{

  if(shoppingCartStore.points_used<0){
    shoppingCartStore.points_used = 0
  }
  else if((shoppingCartStore.buyerWallet?.points||0)<shoppingCartStore.points_used){
    shoppingCartStore.points_used = shoppingCartStore.buyerWallet?.points||0
  }

  if(!shoppingCartStore.cart.campaign?.meta_point?.enable){
    shoppingCartStore.points_used = 0
    return 0
  }

  const discountHelper = getPointDiscountHelper(shoppingCartStore.user_subscription)
  return discountHelper.computePointDiscount(null, shoppingCartStore.cart.campaign?.meta_point, shoppingCartStore.points_used)

})

const computedSubtotalAfterDiscount = computed(()=>{
  return Math.max(computedCartSubtotal.value-shoppingCartStore.cart.discount-computedPointDiscount.value,0)
})
const computedPointsEarned = computed(()=>{
  if(!shoppingCartStore.cart.campaign?.meta_point?.enable)return 0
  const discountHelper = getPointDiscountHelper(shoppingCartStore.user_subscription)
  return discountHelper.computePointsEarned(null, shoppingCartStore.cart.campaign?.meta_point, computedSubtotalAfterDiscount.value )

})


const computedWalletPointsLeft = computed(()=>{
  return (shoppingCartStore.buyerWallet?.points||0) - (shoppingCartStore.points_used ||0)
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

<style scoped>

h2{
  font-size: 20px; 
  font-weight: 500; 
}
/* 副標 */
h3{
  font-size: 16px; 
  font-weight: 500; 
}

h4{
  font-size: 14px; 
}

p{
  font-size: 16px; 
}

</style>
 