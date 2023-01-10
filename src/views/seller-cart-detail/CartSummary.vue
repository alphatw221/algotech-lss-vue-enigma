<template>
  <div class="box p-5 border-2 border-secondary">
    <div>
      <!-- TITLE -->
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">{{$t('order_detail.price_summary.price_summary')}}</span>
      </div>

      <!-- SUBTOTAL -->
      <div class="flex">
        <div class="mr-auto">{{$t('order_detail.price_summary.sub_total')}}</div>
        <div class="font-medium" v-if="campaignDetailStore.campaign">
          {{campaignDetailStore.campaign?.currency}} 
          {{ (Math.floor(parseFloat(computedCartSubtotal) * (10 ** campaignDetailStore.campaign?.decimal_places)) / 10 ** campaignDetailStore.campaign?.decimal_places).toLocaleString('en-GB')}}
          {{campaignDetailStore.campaign?.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign?.price_unit}`):''}}
        </div>
      </div>



      <!-- DISCOUNT -->
      <div class="flex" v-if="campaignDetailStore.campaign">
        <template v-if="sellerCartStore.cart.discount !=0"> 
          <div class="mr-auto">{{$t('shopping_cart.order_summary.promo_discount')}} <span class="text-danger">{{sellerCartStore.cart.applied_discount?.code ? (sellerCartStore.cart.applied_discount.code) : '' }}</span></div>
          <div class="font-medium"> 
            {{campaignDetailStore.campaign?.currency}}
            -{{(Math.floor(parseFloat(sellerCartStore.cart.discount) * (10 ** campaignDetailStore.campaign?.decimal_places)) / 10 ** campaignDetailStore.campaign?.decimal_places).toLocaleString('en-GB')}}
            {{campaignDetailStore.campaign?.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign?.price_unit}`):''}}
          </div>
        </template>
      </div>



      <!-- SUBTOTAL_AFTER_DISCOUNT -->
      <div class="flex" v-if="sellerCartStore.cart.discount !=0">
        <!-- <div class="mr-auto">{{$t('order_detail.price_summary.sub_total')}}</div> -->
        <div class="mr-auto">{{$t('cart.subtotal_after_discount')}}</div>
        <div class="font-medium" v-if="campaignDetailStore.campaign ">
          {{campaignDetailStore.campaign?.currency}} 
          {{ (Math.floor(parseFloat(computedSubtotalAfterDiscount) * (10 ** campaignDetailStore.campaign?.decimal_places)) / 10 ** campaignDetailStore.campaign?.decimal_places).toLocaleString('en-GB')}}
          {{campaignDetailStore.campaign?.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign?.price_unit}`):''}}
        </div>
      </div>


      <!-- SHIPPING -->
      <div class="flex">
        <div class="mr-auto">
          {{$t('order_detail.price_summary.shipping')}}
          <span class="text-red-500" v-if="sellerCartStore.cart.free_delivery || computedSubtotalOverFreeDeliveryThreshold || computedItemsOverFreeDeliveryThreshold">
            ({{$t('order_detail.price_summary.apply_free_delivery')}})
          </span>
          <div v-else-if="computedIsMultipleShippingCostApplied" class="text-red-600 text-sm">{{$t('cart.multiple_shipping_included')}}</div>

        </div>

        <template v-if="campaignDetailStore.campaign">

          <div class="font-medium" v-if=" sellerCartStore.cart?.free_delivery || computedSubtotalOverFreeDeliveryThreshold || computedItemsOverFreeDeliveryThreshold ">
              {{campaignDetailStore.campaign?.currency}} 
              {{(Math.floor(parseFloat(0) * (10 ** campaignDetailStore.campaign?.decimal_places)) / 10 ** campaignDetailStore.campaign?.decimal_places).toLocaleString('en-GB')}}
              {{campaignDetailStore.campaign?.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign?.price_unit}`):''}}
            </div>

            <div class="font-medium" v-else>
              {{campaignDetailStore.campaign?.currency}} 
              {{(Math.floor(parseFloat(computedShippingCost) * (10 ** campaignDetailStore.campaign?.decimal_places)) / 10 ** campaignDetailStore.campaign?.decimal_places).toLocaleString('en-GB')}}
              {{campaignDetailStore.campaign?.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign?.price_unit}`):''}}
            </div>
        </template> 
        
      </div>


      <!-- ADJUST_PRICE -->
      <template v-if="sellerCartStore.cart.adjust_price">
        <div class="flex">
            <div class="mr-auto">{{sellerCartStore.cart.adjust_title}}</div>
            <div class="font-medium" v-if="campaignDetailStore.campaign">
              {{campaignDetailStore.campaign?.currency}}
              {{Math.floor(parseFloat(sellerCartStore.cart.adjust_price) * (10 ** campaignDetailStore.campaign?.decimal_places)) / 10 ** campaignDetailStore.campaign?.decimal_places }}
              <!-- {{priceAdjustmentSign.value == '-' ? '-' + Math.floor(parseFloat(sellerCartStore.cart.adjust_price) * (10 ** campaignDetailStore.campaign?.decimal_places)) / 10 ** campaignDetailStore.campaign?.decimal_places : Math.floor(parseFloat(sellerCartStore.cart.adjust_price) * (10 ** campaignDetailStore.campaign?.decimal_places)) / 10 ** campaignDetailStore.campaign?.decimal_places}} -->
              {{campaignDetailStore.campaign?.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign?.price_unit}`):''}}
            </div>
            <XIcon class="w-5 h-5 text-slate-400 cursor-pointer" @click="cleanAdjust()"/>
        </div>
      </template>


      <!-- SELLER_PRICE_ADJUSTMENT_SECTION -->
      <div class="flex mt-4 border-t border-slate-200/60 dark:border-darkmode-400
          pt-4">
          <div>
            <div class="flex w-full "> 
              <span class="my-auto"> {{$t('order_detail.price_summary.price_adjustment')}} </span> 
              <Tippy 
                  class="rounded-full w-fit whitespace-wrap" 
                  data-tippy-allowHTML="true" 
                  data-tippy-placement="right" 
                  :content="$t('tooltips.manage_order_details.price_adjustment')" 
                  theme='light'
              > 
                  <HelpCircleIcon class="w-5 ml-1 tippy-icon" />
              </Tippy> 
            </div>
        
          <div class="mt-3 mb-3">
                <input
                    class="form-check-input border border-slate-500"
                    type="checkbox"
                    v-model="sellerCartStore.cart.free_delivery"
                    />
                <span class="ml-2">{{$t('order_detail.price_summary.free_delivery')}}</span>
            </div>         
            <div class="flex flex-row w-2/3 gap-4 whitespace-nowrap">
                <div class="">
                    <input :id="'radio-switch-p'" class="form-check-input mr-2" type="radio" name="vertical_radio_button" v-model="priceAdjustmentSign" :value="'+'" />
                    <span> {{$t('order_detail.price_summary.add')}} +</span>
                </div>
                <div class="">
                    <input :id="'radio-switch-m'" class="form-check-input mr-2" type="radio" name="vertical_radio_button" v-model="priceAdjustmentSign" :value="'-'" />
                    <span> {{$t('order_detail.price_summary.subtract')}} -</span>
                </div>
            </div>
            <div class="mt-3 grid grid-cols-12 gap-4 xl:mt-5 2xl:mt-5">
                    <div class="col-span-4">
                        <input id="regular-form-2" type="text" class="form-control " :placeholder="$t('order_detail.price_summary.display_name')" v-model="sellerCartStore.cart.adjust_title" />
                    </div>
                    <div class="col-span-4">
                        <input id="regular-form-2" type="number" class="form-control " :placeholder="$t('order_detail.price_summary.amount')" v-model="computedAdjustPrice" />
                    </div>
                    <div class="flex flex-row-reverse col-span-4">
                        <button class="btn btn-primary w-32 shadow-md" @click="sellerAdjustPrice()">{{$t('order_detail.price_summary.update')}}</button>
                    </div> 
                    <!-- <div class="col-start-5 col-span-8" v-if="priceAdjustmentSign.value==='-' &&sellerCartStore.cart.subtotal+sellerCartStore.cart.shipping_cost-sellerCartStore.cart.discount-sellerCartStore.cart.adjust_price < 0" style="color:red">
                        {{$t('order_detail.price_summary.price_exceed')}}
                    </div> -->
            </div>
        </div>
      </div>


      <!-- TAX -->
      <div class="flex" v-if="sellerCartStore.cart.tax">
        <div class="mr-auto">{{$t('order_detail.price_summary.tax')}}</div>
        <div class="font-medium"> 
          {{campaignDetailStore.campaign?.currency}}
          {{(Math.floor(parseFloat(sellerCartStore.cart.tax) * (10 ** campaignDetailStore.campaign?.decimal_places)) / 10 ** campaignDetailStore.campaign?.decimal_places).toLocaleString('en-GB')}}
          {{campaignDetailStore.campaign?.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign?.price_unit}`):''}}
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
        <div class="mr-auto font-medium text-base">{{$t('order_detail.price_summary.total')}}</div>
        <div class="font-medium text-base" v-if="campaignDetailStore.campaign">
          {{campaignDetailStore.campaign?.currency}} 
          {{(Math.floor(parseFloat(computedTotal) * (10 ** campaignDetailStore.campaign?.decimal_places)) / 10 ** campaignDetailStore.campaign?.decimal_places).toLocaleString('en-GB')}}
          {{campaignDetailStore.campaign?.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign?.price_unit}`):''}}
        </div>
      </div>

    </div>
  </div>
    
</template>
<script setup>


import { seller_adjust_price } from "@/api_v2/cart"
import { useRoute, useRouter } from "vue-router";
import {ref, watch, computed, onMounted} from "vue";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail"
import { useSellerCartStore } from "@/stores/lss-seller-cart";
const campaignDetailStore = useCampaignDetailStore()

const sellerCartStore = useSellerCartStore()

const route = useRoute();
const router = useRouter();
const layoutStore = useLSSSellerLayoutStore()

const priceAdjustmentSign = ref('-')
onMounted(()=>{
  watch(computed(()=>sellerCartStore.cart.adjust_price), () => { 
    if( sellerCartStore.cart.adjust_price < 0 ){priceAdjustmentSign.value = '-'}
    else if(sellerCartStore.cart.adjust_price > 0){priceAdjustmentSign.value = '+'}
  })

  watch(computed(()=>priceAdjustmentSign.value), () => { 
    sellerCartStore.cart.adjust_price = priceAdjustmentSign.value === '-'? -parseFloat(computedAdjustPrice.value) : parseFloat(computedAdjustPrice.value)
  })
  
})

const computedCartSubtotal = computed(()=>{
  var subtotal = 0
  Object.entries(sellerCartStore.cart?.products||{}).forEach(([key, value])=>{
    subtotal += ((campaignDetailStore.campaignProductDict[key]?.price||0)*value )
  })
  return subtotal
})


const computedAdjustPrice = computed({
  get:()=>{
    return Math.abs(sellerCartStore.cart.adjust_price)
  },
  set:adjust_price=>{
     sellerCartStore.cart.adjust_price = priceAdjustmentSign.value === '-'? -parseFloat(Math.abs(adjust_price)) : parseFloat(Math.abs(adjust_price))
  }
});

const computedSubtotalOverFreeDeliveryThreshold = computed(()=>{
  return campaignDetailStore.campaign?.meta_logistic?.is_free_delivery_for_order_above_price ? computedCartSubtotal.value >= campaignDetailStore.campaign?.meta_logistic?.free_delivery_for_order_above_price : false
})

const computedItemsOverFreeDeliveryThreshold = computed(()=>{
  
  return campaignDetailStore.campaign?.meta_logistic?.is_free_delivery_for_how_many_order_minimum ? Object.keys(sellerCartStore.cart?.products||{}).length >= campaignDetailStore.campaign?.meta_logistic?.free_delivery_for_how_many_order_minimum : false
})

const computedShippingCost = computed(()=>{

  //----------------product category logistic setting-------------------------------------
  const logisticCategories = {}
  var applyCategoryLogistic = false
  Object.entries(sellerCartStore.cart?.products||{}).forEach(([key, value])=>{

    if(
      value>0 && 
      campaignDetailStore.campaignProductDict?.[key]?.categories?.length===1 && 
      layoutStore.userInfo?.user_subscription?.product_categories?.find(product_category=>product_category.id.toString()==campaignDetailStore.campaignProductDict?.[key]?.categories[0])
      ){
      // logisticCategories[campaignDetailStore.campaignProductDict?.[key]?.categories[0]]=true

      if(logisticCategories?.[campaignDetailStore.campaignProductDict?.[key]?.categories[0]]){
        logisticCategories[campaignDetailStore.campaignProductDict?.[key]?.categories[0]].push({campaignProductId:key,qty:value})
      }else{
        logisticCategories[campaignDetailStore.campaignProductDict?.[key]?.categories[0]] = [{campaignProductId:key,qty:value},]
      }

    }
  })

  var shippingCost = 0 
  Object.entries(logisticCategories).forEach(([productCategoryID, objects])=>{
    const productCategory = layoutStore.userInfo?.user_subscription?.product_categories?.find(product_category=>product_category.id.toString()===productCategoryID)

    if(productCategory?.meta_logistic?.enable_flat_rate){
      applyCategoryLogistic = true



      var is_category_product_subtotal_above = false
      if(productCategory?.meta_logistic?.is_free_delivery_for_order_above_price){
        var category_products_subtotal = 0
        objects.forEach(object=>{
          category_products_subtotal += (campaignDetailStore.campaignProductDict?.[object.campaignProductId].price * object.qty)
        })
        is_category_product_subtotal_above = category_products_subtotal > productCategory?.meta_logistic?.free_delivery_for_order_above_price|0 
      }


      shippingCost+= is_category_product_subtotal_above ? 0 : productCategory?.meta_logistic?.flat_rate||0
    }
  })

  if(applyCategoryLogistic)return shippingCost
      
  return campaignDetailStore.campaign?.meta_logistic?.delivery_charge||0
})

const computedIsMultipleShippingCostApplied = computed(()=>{  //temp

  const logisticCategories = {}
  Object.entries(sellerCartStore.cart?.products||{}).forEach(([key, value])=>{
    if(
      value>0 && 
      campaignDetailStore.campaignProductDict?.[key]?.categories?.length===1 && 
      layoutStore.userInfo?.user_subscription?.product_categories?.find(product_category=>product_category.id.toString()==campaignDetailStore.campaignProductDict?.[key]?.categories[0])
      ){
        const productCategory = layoutStore.userInfo?.user_subscription?.product_categories?.find(product_category=>product_category.id.toString()==campaignDetailStore.campaignProductDict?.[key]?.categories[0])

        if(productCategory?.meta_logistic?.enable_flat_rate){
          logisticCategories[campaignDetailStore.campaignProductDict?.[key]?.categories[0]]=true
        }
    }
  })
  return Object.keys(logisticCategories).length>1
})

const computedSubtotalAfterDiscount = computed(()=>{
  return Math.max(computedCartSubtotal.value-sellerCartStore.cart.discount,0)
})


const computedTotal = computed(()=>{

  let total = 0
  total += computedCartSubtotal.value
  total -= sellerCartStore.cart.discount
  total = Math.max(total, 0)
  // if(!sellerCartStore.cart.free_delivery){
  //   total += sellerCartStore.cart.shipping_cost
  // }
  if(sellerCartStore.cart.free_delivery || computedSubtotalOverFreeDeliveryThreshold.value || computedItemsOverFreeDeliveryThreshold.value){
    //
  }else{
    total += computedShippingCost.value
  }

  total += sellerCartStore.cart.adjust_price
  total += sellerCartStore.cart.tax
  return Math.max(total, 0)


})

const sellerAdjustPrice = ()=>{
  const modify_price = {
    'adjust_title':sellerCartStore.cart.adjust_title,
    'adjust_price':sellerCartStore.cart.adjust_price,
    'free_delivery':sellerCartStore.cart.free_delivery
  }

  seller_adjust_price(route.params.cart_id, modify_price, layoutStore.alert).then(
    res => {
      layoutStore.notification.showMessageToast('Update')
      sellerCartStore.cart = res.data
    }
  )
}


const cleanAdjust = ()=>{
  seller_adjust_price(route.params.cart_id,{'adjust_title':'','adjust_price':0,'free_delivery':sellerCartStore.cart.free_delivery}, layoutStore.alert).then(
    res => {
      layoutStore.notification.showMessageToast('Update')
      sellerCartStore.cart = res.data
    }
  )
}
</script>
