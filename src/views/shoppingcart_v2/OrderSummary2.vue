<template>
  <div class="box p-5 border-2 border-secondary">
    <div class="flex flex-col gap-4">
      <!-- ORDER SUMMARY -->
      <h2 class="mb-2">{{$t('shopping_cart.order_summary.order_summary')}}</h2>

      <!-- SUBTOTAL -->
      <div class="flex flex-row justify-between">
        <p>{{$t('shopping_cart.order_summary.subtotal')}}</p>
        <h4 class="font-medium" v-if="props.store?.cart.campaign||false">
          {{props.store?.cart.campaign.currency}} 
          {{(Math.floor(parseFloat(computedCartSubtotal) * (10 ** props.store?.cart.campaign.decimal_places)) / 10 ** props.store?.cart.campaign.decimal_places).toFixed(props.store?.cart.campaign.decimal_places)}}
          {{props.store?.cart.campaign.price_unit?$t(`global.price_unit.${props.store?.cart.campaign.price_unit}`):''}}
        </h4>
      </div>

      <!-- DISCOUNT -->
      <div v-if="props.store?.cart.discount != 0 && props.store?.cart.campaign||false" class="flex flex-row justify-between" >
        <p class="w-fit my-auto whitespace-nowrap">{{ $t('shopping_cart.order_summary.promo_discount')}} </p>
        <h4 class="font-medium text-danger"> 
          {{props.store?.cart.campaign.currency}}
          -{{(Math.floor(parseFloat(props.store?.cart.discount) * (10 ** props.store?.cart.campaign.decimal_places)) / 10 ** props.store?.cart.campaign.decimal_places).toFixed(props.store?.cart.campaign.decimal_places)}}
          {{props.store?.cart.campaign.price_unit?$t(`global.price_unit.${props.store?.cart.campaign.price_unit}`):''}}
        </h4>
      </div>

      <!-- POINT DISCOUNT -->
      <div v-if="computedPointDiscount != 0 && props.store?.cart.campaign||false" class="flex flex-row justify-between" >
        <p class="w-fit my-auto whitespace-nowrap">{{$t('order.point_discount')}}</p>
        <span class="font-medium text-danger"> 
          {{props.store?.cart.campaign.currency}} 
          -{{(Math.floor(parseFloat(computedPointDiscount) * (10 ** props.store?.cart.campaign.decimal_places)) / 10 ** props.store?.cart.campaign.decimal_places).toFixed(props.store?.cart.campaign.decimal_places)}}
          {{props.store?.cart.campaign.price_unit?$t(`global.price_unit.${props.store?.cart.campaign.price_unit}`):''}}
        </span>
      </div>

      <!-- SUBTOTAL AFTER DISCOUNT -->
      <div v-if="(props.store?.cart.discount != 0 || computedPointDiscount != 0) && props.store?.cart.campaign||false" class="flex flex-row justify-between" >
        <p class="w-fit my-auto whitespace-nowrap">{{$t('cart.subtotal_after_discount')}}</p>
        <h4 class="font-medium"> 
          {{props.store?.cart.campaign.currency}} 
          {{(Math.floor(parseFloat(computedSubtotalAfterDiscount) * (10 ** props.store?.cart.campaign.decimal_places)) / 10 ** props.store?.cart.campaign.decimal_places).toFixed(props.store?.cart.campaign.decimal_places)}}
          {{props.store?.cart.campaign.price_unit?$t(`global.price_unit.${props.store?.cart.campaign.price_unit}`):''}}
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
              <XIcon v-if="props.store?.cart.discount != 0 && props.store?.cart.campaign||false" class="mt-auto w-6 h-6 text-slate-400 cursor-pointer my-auto ml-2" @click="promoDelete()"/>
            </div>
        </div>
        <span v-if="props.store?.cart?.applied_discount?.code != undefined" class="lg:text-right text-left font-medium text-red-600">{{$t('shopping_cart.order_summary.promo_apply',{ code :props.store?.cart?.applied_discount?.code})}} </span>

         <!-- POINTS INPUT -->
         <div class="flex flex-row flex-wrap justify-between" v-if="props.store?.cart.campaign?.meta_point?.enable">
          <div>
            <h4 class="w-fit my-auto whitespace-nowrap">{{$t('shopping_cart.order_summary.points_redemption')}}</h4>
            <h4 class="w-fit my-auto whitespace-nowrap text-danger">({{computedWalletPointsLeft}} points)</h4>
          </div>
          
          <!-- <input
            type="number"
            class="form-control w-32 h-[35px] text-right"
            v-model="props.store?.points_used"
          /> -->

          <select  class="form-control w-32 h-[35px] text-right" v-model="props.store.points_used">
            <option :value="0">0</option>
            <option v-for="pointsUsedOption,pointsUsedOptionIndex in computedPointsUsedOptions" :key="pointsUsedOptionIndex" :value="pointsUsedOption">{{ pointsUsedOption }}</option>
          </select>
        </div>

      </template>

      <!-- REFERAL CODE INFO -->
      <div class="flex justify-between"  v-for="referalCode, index in props.store?.referalCodes" :key="index">

        <h4 class=" my-auto whitespace-nowrap mr-5">{{$t('shopping_cart.order_summary.referr_code')}}</h4>
        <button @click="copyURL(referalCode.code+'-'+route.params.cart_oid)"
          class="flex my-auto whitespace-nowrap border-2 border-green-800 rounded-md p-1 px-2 text-green-800 font-medium truncate">{{referalCode.code+'-'+route.params.cart_oid}} 
        </button>
        <!-- <div v-if="referalCode.description" class="my-auto whitespace-nowrap">{{referalCode.description}}</div> -->
      </div>

      <!-- SHIPPING -->
      <template v-if="props.deliveryMethod !== 'pickup'">
        
        <div class="flex pt-4 border-t border-slate-200/60 dark:border-darkmode-400">

          <p class="mr-auto">{{$t('shopping_cart.order_summary.shipping')}}</p>
          <template v-if="props.store?.cart?.campaign">
            
            <h4 class="font-medium" v-if=" props.store?.cart?.free_delivery || computedSubtotalOverFreeDeliveryThreshold || computedItemsOverFreeDeliveryThreshold ">
              {{props.store?.cart.campaign.currency}} 
              {{(Math.floor(parseFloat(0) * (10 ** props.store?.cart.campaign.decimal_places)) / 10 ** props.store?.cart.campaign.decimal_places).toFixed(props.store?.cart.campaign.decimal_places)}}
              {{props.store?.cart.campaign.price_unit?$t(`global.price_unit.${props.store?.cart.campaign.price_unit}`):''}}
            </h4>

            <h4 class="font-medium" v-else>
              {{props.store?.cart.campaign.currency}} 
              {{(Math.floor(parseFloat(computedShippingCost) * (10 ** props.store?.cart.campaign.decimal_places)) / 10 ** props.store?.cart.campaign.decimal_places).toFixed(props.store?.cart.campaign.decimal_places)}}
              {{props.store?.cart.campaign.price_unit?$t(`global.price_unit.${props.store?.cart.campaign.price_unit}`):''}}
            </h4>
          </template>
        </div>
        <h4 v-if="props.store?.cart?.free_delivery || computedSubtotalOverFreeDeliveryThreshold || computedItemsOverFreeDeliveryThreshold" class="text-danger">{{$t('shopping_cart.order_summary.free_delivery')}}</h4>
        <h4 v-else-if="computedIsMultipleShippingCostApplied" class="text-danger">{{$t('cart.multiple_shipping_included')}}</h4>

      </template>
      
      <!-- ADJUST_PRICE -->
      <div class="flex" v-if="props.store?.cart.adjust_price !== 0">
        <div class="mr-auto" v-if="props.store?.cart.adjust_title">
          <p>{{ props.store?.cart.adjust_title }}</p>
          <h4>({{$t('shopping_cart.order_summary.price_adjustment')}})</h4>
        </div>
        <p class="mr-auto" v-else>{{$t('shopping_cart.order_summary.price_adjustment')}}</p>

        <h4 class="font-medium text-danger" v-if="props.store?.cart.campaign||false">
          {{props.store?.cart.campaign.currency}}
          {{(Math.floor(parseFloat(props.store?.cart.adjust_price) * (10 ** props.store?.cart.campaign.decimal_places)) / 10 ** props.store?.cart.campaign.decimal_places).toFixed(props.store?.cart.campaign.decimal_places)}}
          {{props.store?.cart.campaign.price_unit?$t(`global.price_unit.${props.store?.cart.campaign.price_unit}`):''}}
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
          <div class="font-medium text-base w-fit ml-auto" v-if="props.store?.cart.campaign||false">
            {{props.store?.cart.campaign.currency}} 
            {{(Math.floor(parseFloat(computedCartTotal) * (10 ** props.store?.cart.campaign.decimal_places)) / 10 ** props.store?.cart.campaign.decimal_places).toFixed(props.store?.cart.campaign.decimal_places)}}
            {{props.store?.cart.campaign.price_unit?$t(`global.price_unit.${props.store?.cart.campaign.price_unit}`):''}}
          </div>
        </div>
        <h4 class="text-danger ml-auto" v-if="props.store?.cart.campaign?.meta_point?.enable && computedPointsEarned>0">
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
    <div class="flex gap-3 mt-5" v-if="props.store?.openTab === 1 && props.role=='customer'">
      <button
        class="btn w-32 border-slate-300 dark:border-darkmode-400 text-slate-500"
        @click="props.store.showAddItemModal = ! props.store?.showAddItemModal"
      >
        + {{$t('shopping_cart.order_summary.add_item')}}
      </button>
      <button class="btn btn-primary w-32 shadow-md ml-auto" @click="toNext()">{{$t('shopping_cart.order_summary.next')}}</button>
    </div>
  </div>
  <Modal :show="loginModalShow" backdrop="static" v-if="props.role=='customer'">
      <ModalBody class="p-10 text-center">
          <div class="flex flex-col gap-5 justify-center font-bold">
              <!-- <AlertOctagonIcon class="text-danger w-full h-32"/> -->
              <label for="regular-form-2" class="form-label text-danger text-[24px]">{{$t('shopping_cart.order_summary.alert')}}</label>
              <SimpleIcon icon="err_bot" color="#E80000" class="w-full h-32 p-3" />
              <label for="regular-form-2" class="form-label text-black text-[20px]">{{$t('shopping_cart.order_summary.promo_login')}}</label>
              <button class="w-32 btn btn-rounded-primary dark:border-darkmode-400 mx-auto" @click="loginModalShow =false; showLoginModal()">{{$t('shopping_cart.order_summary.ok')}}</button>
          </div>
      </ModalBody>
  </Modal>
    
</template>

<script setup>
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { computed, onMounted, ref, watch, defineProps } from "vue";
// import { buyer_apply_discount_code, buyer_cancel_discount_code } from "@/api_v2/pre_order"; 
import { buyer_apply_discount_code, buyer_cancel_discount_code } from "@/api_v2/cart"
import { get_shopify_checkout_url } from '@/plugin/shopify/api/cart.js';
import { useCookies } from "vue3-cookies";
import { useRoute, useRouter } from "vue-router";
import { getPointDiscountHelper } from "@/libs/factory/pointDiscount.js"
import { number2decimal } from "../../libs/utils/number2decimal";
const route = useRoute();
const router = useRouter();

const { cookies } = useCookies();
const shoppingCartStore = useShoppingCartStore();
const layoutStore = useLSSBuyerLayoutStore();

const loginModalShow = ref(false)
const isAnonymousUser=cookies.get("login_with")=='anonymousUser'


const props = defineProps({
  deliveryMethod: {
    type: String,
    default: 'delivery',
  },
  deliveryOptionData:{
    type: Object,
    default: {}
  },
  store:{
    type: Object,
    default:{}
  },
  layout_store:{
    type:Object,
    default:{}
  },
  role:{
    type:String,
    default:'customer'
  }, 
  campaign_product_dict:{
    type:Object,
    default:{}
  }
})


const computedCartSubtotal = computed(()=>{
  var subtotal = 0
  Object.entries(props.store?.cart.products||{}).forEach(([key, qty])=>{

    subtotal += ((props.campaign_product_dict[key]?.price||0)*qty )
  })

  return (subtotal+0.0000001).toFixed(2)
})

const computedShippingCost = computed(()=>{
  var shippingCost = 0 
  if(props.deliveryMethod=='pickup') return 0
  
  if(!props.store?.cart?.campaign?.meta_logistic) return 0
  
  const meta_logistic = props.store?.cart?.campaign?.meta_logistic

  //----------------product category logistic setting-------------------------------------
  Object.entries(computedLogisticCategories.value).forEach(([productCategoryID, objects])=>{
    const productCategory = props.store?.productCategoryDict[productCategoryID]
    if(productCategory?.meta_logistic?.enable_flat_rate){

      var is_category_product_subtotal_above = false
      if(productCategory?.meta_logistic?.is_free_delivery_for_order_above_price){
        var category_products_subtotal = 0
        objects.forEach(object=>{
          category_products_subtotal += (props.campaign_product_dict?.[object.campaignProductId].price * object.qty)
        })
        is_category_product_subtotal_above = category_products_subtotal > productCategory?.meta_logistic?.free_delivery_for_order_above_price? true:false
      }

      shippingCost+=is_category_product_subtotal_above ? 0 : (productCategory?.meta_logistic?.flat_rate||0) 
    }
  })
  if(appliedCategoryLogistic.value) return (shippingCost+0.0000001).toFixed(2)

  //----------------default logistic setting-------------------------------------
  if(props.store?.cart.campaign.meta_logistic.is_self_delivery_enabled) shippingCost = Number(meta_logistic.delivery_charge || 0)
  
  if (props.deliveryMethod == 'delivery') {
    if (props.deliveryOptionData?.type== '+'){
      shippingCost += Number(props.deliveryOptionData?.price)
    }
    else if(props.deliveryOptionData?.type == '='){
      shippingCost =  Number(props.deliveryOptionData?.price)
    }
    return (shippingCost+0.0000001).toFixed(2)
  }
  
  return (shippingCost+0.0000001).toFixed(2)
})

const computedLogisticCategories = computed(()=>{
  let logisticCategories = {}
  Object.entries(props.store?.cart?.products||{}).forEach(([key, value])=>{
    if(value>0 && props.campaign_product_dict?.[key]?.categories?.length===1 && props.campaign_product_dict?.[key]?.categories[0] in props.store?.productCategoryDict){
      
      if(logisticCategories?.[props.campaign_product_dict?.[key]?.categories[0]]){
        logisticCategories[props.campaign_product_dict?.[key]?.categories[0]].push({campaignProductId:key,qty:value})
      }else{
        logisticCategories[props.campaign_product_dict?.[key]?.categories[0]] = [{campaignProductId:key,qty:value},]
      }
    }
  })
  return logisticCategories
})

const appliedCategoryLogistic = computed(()=>{
  var applied = false
  Object.entries(computedLogisticCategories.value).forEach(([productCategoryID, objects])=>{
    const productCategory = props.store?.productCategoryDict[productCategoryID]
    if(productCategory?.meta_logistic?.enable_flat_rate) applied = true
  })
  return applied
})

// watch(computed(()=>appliedCategoryLogistic.value),()=>{props.store.appliedCategoryLogistic = appliedCategoryLogistic.value}) //can not find any use of it


const computedPointsUsedOptions = computed(()=>{
  const points = (props.store?.buyerWallet?.points||0)
  const rate = (props.store?.cart.campaign?.meta_point?.redemption_rate_point||1)
  console.log(points)
  console.log(rate)
  
  const _options = []
  for(let i=1; i<=Math.floor(points/rate); i++){
    _options.push(i*rate)
  }
  return _options
})




const productTotalQuantity = computed(()=>{
  let qty = 0
  Object.entries(props.store?.cart?.products||[]).forEach(([key, value])=>{
    qty += value
  })
  return qty
})


const computedIsMultipleShippingCostApplied = computed(()=>{  //temp
  const logisticCategories = {}
  Object.entries(props.store?.cart?.products||[]).forEach(([key, value])=>{
    if(value>0 && props.campaign_product_dict?.[key]?.categories?.length===1 && props.campaign_product_dict?.[key]?.categories[0] in props.store?.productCategoryDict){
      const productCategory = props.store?.productCategoryDict[props.campaign_product_dict?.[key]?.categories[0]]
      if(productCategory?.meta_logistic?.enable_flat_rate == true){
        logisticCategories[props.campaign_product_dict?.[key]?.categories[0]] = true
      }
    }
  })

  return Object.keys(logisticCategories).length>1
})

const computedCartTotal = computed(()=>{
  let total = 0
  // computedShippingCost.value
  total += computedCartSubtotal.value
  total -= props.store?.cart.discount||0
  total -= computedPointDiscount.value
  total = Math.max(total, 0)
  if(props.store?.cart.free_delivery || computedSubtotalOverFreeDeliveryThreshold.value || computedItemsOverFreeDeliveryThreshold.value){
    //
  }else{
    total += computedShippingCost.value
  }
      
  total += props.store?.cart.adjust_price
  total = (total+0.0000001).toFixed(2)
  return Math.max(total, 0)

})

const computedSubtotalOverFreeDeliveryThreshold = computed(()=>{
  return props.store?.cart.campaign?.meta_logistic?.is_free_delivery_for_order_above_price ? computedCartSubtotal.value >= props.store?.cart.campaign?.meta_logistic?.free_delivery_for_order_above_price : false
})

const computedItemsOverFreeDeliveryThreshold = computed(()=>{
  return props.store?.cart.campaign?.meta_logistic?.is_free_delivery_for_how_many_order_minimum ? productTotalQuantity.value >= props.store?.cart.campaign?.meta_logistic?.free_delivery_for_how_many_order_minimum : false
})


const computedPointDiscount = computed(()=>{

  if(props.store?.points_used<0){
    props.store.points_used = 0
  }
  else if((props.store?.buyerWallet?.points||0)<props.store?.points_used){
    props.store.points_used = props.store?.buyerWallet?.points||0
  }

  if(!props.store?.cart.campaign?.meta_point?.enable){
    props.store.points_used = 0
    return 0
  }

  const discountHelper = getPointDiscountHelper(props.store?.user_subscription)
  return discountHelper.computePointDiscount(null, props.store?.cart.campaign?.meta_point, props.store?.points_used)

})

const computedSubtotalAfterDiscount = computed(()=>{
  return Math.max(computedCartSubtotal.value-props.store?.cart.discount-computedPointDiscount.value,0)
})
const computedPointsEarned = computed(()=>{
  if(!props.store?.cart.campaign?.meta_point?.enable)return 0
  const discountHelper = getPointDiscountHelper(props.store?.user_subscription)
  return discountHelper.computePointsEarned(null, props.store?.cart.campaign?.meta_point, computedSubtotalAfterDiscount.value )

})


const computedWalletPointsLeft = computed(()=>{
  return (props.store?.buyerWallet?.points||0) - (props.store?.points_used ||0)
})



onMounted(()=>{
  discount_code.value = props.store?.cart?.discount||'' 
  // props.store.cart.applied_discount = {} //
})



const discount_code = ref('')
const promoCheck =()=>{
  if(props.role=='customer'){
    if (props.layout_store.userInfo && Object.keys(props.layout_store.userInfo).length === 0 && Object.getPrototypeOf(props.layout_store.userInfo) === Object.prototype) {
        loginModalShow.value = true
    } else {
        buyer_apply_discount_code(route.params.cart_oid, {discount_code : discount_code.value }, props.layout_store.alert).then(
          res=>{
            props.store.cart = res.data
            discount_code.value = ''
          })
    }
  }
  
}

const showLoginModal = () => {
  props.layout_store.showLoginModal=true
}

const promoDelete =()=>{

  if(props.role=='customer'){
    buyer_cancel_discount_code(route.params.cart_oid, props.layout_store.alert).then(
    res=>{
      props.store.cart = res.data
      discount_code.value = ''
    })
  }
  
}

const copyURL = (code)=>{
  navigator.clipboard.writeText(`${code}`).then(()=>{
      props.layout_store.notification.showMessageToast('copied!')
  })
}

const toNext=()=>{
  if (shoppingCartStore.user_subscription?.user_plan?.plugins?.shopify) {
      get_shopify_checkout_url(route.params.cart_oid, props.layout_store.alert).then(res=>{
          window.location.href = res.data
      })
  } else {
      shoppingCartStore.openTab=2
  }
  
}

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
 