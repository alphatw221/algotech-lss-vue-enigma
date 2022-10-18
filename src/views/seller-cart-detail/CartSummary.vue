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
        <div class="font-medium" v-if="sellerCartStore.cart.campaign">
          {{sellerCartStore.cart.campaign.currency}} 
          {{ (Math.floor(parseFloat(computedCartSubtotal) * (10 ** sellerCartStore.cart.campaign.decimal_places)) / 10 ** sellerCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
          {{sellerCartStore.cart.campaign.price_unit?$t(`global.price_unit.${sellerCartStore.cart.campaign.price_unit}`):''}}
        </div>
      </div>



      <!-- DISCOUNT -->
      <div class="flex" v-if="sellerCartStore.cart.campaign">
        <template v-if="sellerCartStore.cart.discount !=0"> 
          <div class="mr-auto">{{$t('shopping_cart.order_summary.promo_discount')}} <span class="text-danger">{{sellerCartStore.cart.applied_discount.code ? (sellerCartStore.cart.applied_discount.code) : '' }}</span></div>
          <div class="font-medium"> 
            {{sellerCartStore.cart.campaign.currency}}
            -{{(Math.floor(parseFloat(sellerCartStore.cart.discount) * (10 ** sellerCartStore.cart.campaign.decimal_places)) / 10 ** sellerCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
            {{sellerCartStore.cart.campaign.price_unit?$t(`global.price_unit.${sellerCartStore.cart.campaign.price_unit}`):''}}
          </div>
        </template>
      </div>



      <!-- SUBTOTAL_AFTER_DISCOUNT -->
      <div class="flex" v-if="sellerCartStore.cart.discount !=0">
        <!-- <div class="mr-auto">{{$t('order_detail.price_summary.sub_total')}}</div> -->
        <div class="mr-auto">Subtotal After Doscount</div>
        <div class="font-medium" v-if="sellerCartStore.cart.campaign ">
          {{sellerCartStore.cart.campaign.currency}} 
          {{ (Math.floor(parseFloat(Math.max(computedCartSubtotal-sellerCartStore.cart.discount,0)) * (10 ** sellerCartStore.cart.campaign.decimal_places)) / 10 ** sellerCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
          {{sellerCartStore.cart.campaign.price_unit?$t(`global.price_unit.${sellerCartStore.cart.campaign.price_unit}`):''}}
        </div>
      </div>


      <!-- SHIPPING -->
      <div class="flex">
        <div class="mr-auto">
          {{$t('order_detail.price_summary.shipping')}}
          <span class="text-red-500" v-if="sellerCartStore.cart.free_delivery || computedSubtotalOverFreeDeliveryThreshold || computedItemsOverFreeDeliveryThreshold">
            ({{$t('order_detail.price_summary.apply_free_delivery')}})
          </span>
        </div>

        <template v-if="sellerCartStore.cart.campaign">

          <div class="font-medium" >
            {{sellerCartStore.cart.campaign.currency}} 
            {{ (Math.floor(parseFloat(0) * (10 ** sellerCartStore.cart.campaign.decimal_places)) / 10 ** sellerCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
            {{sellerCartStore.cart.campaign.price_unit?$t(`global.price_unit.${sellerCartStore.cart.campaign.price_unit}`):''}}
          </div>


        </template> 
        
      </div>


      <!-- ADJUST_PRICE -->
      <template v-if="sellerCartStore.cart.adjust_price">
        <div class="flex">
            <div class="mr-auto">{{sellerCartStore.cart.adjust_title}}</div>
            <div class="font-medium" v-if="sellerCartStore.cart.campaign">
              {{sellerCartStore.cart.campaign.currency}}
              {{Math.floor(parseFloat(sellerCartStore.cart.adjust_price) * (10 ** sellerCartStore.cart.campaign.decimal_places)) / 10 ** sellerCartStore.cart.campaign.decimal_places }}
              <!-- {{sellerCartStore.modify_status == '-' ? '-' + Math.floor(parseFloat(sellerCartStore.cart.adjust_price) * (10 ** sellerCartStore.cart.campaign.decimal_places)) / 10 ** sellerCartStore.cart.campaign.decimal_places : Math.floor(parseFloat(sellerCartStore.cart.adjust_price) * (10 ** sellerCartStore.cart.campaign.decimal_places)) / 10 ** sellerCartStore.cart.campaign.decimal_places}} -->
              {{sellerCartStore.cart.campaign.price_unit?$t(`global.price_unit.${sellerCartStore.cart.campaign.price_unit}`):''}}
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
                    <input :id="'radio-switch-p'" class="form-check-input mr-2" type="radio" name="vertical_radio_button" v-model="sellerCartStore.modify_status" :value="'+'" />
                    <span> {{$t('order_detail.price_summary.add')}} +</span>
                </div>
                <div class="">
                    <input :id="'radio-switch-m'" class="form-check-input mr-2" type="radio" name="vertical_radio_button" v-model="sellerCartStore.modify_status" :value="'-'" />
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
                    <!-- <div class="col-start-5 col-span-8" v-if="sellerCartStore.modify_status==='-' &&sellerCartStore.cart.subtotal+sellerCartStore.cart.shipping_cost-sellerCartStore.cart.discount-sellerCartStore.cart.adjust_price < 0" style="color:red">
                        {{$t('order_detail.price_summary.price_exceed')}}
                    </div> -->
            </div>
        </div>
      </div>


      <!-- TAX -->
      <div class="flex" v-if="sellerCartStore.cart.tax">
        <div class="mr-auto">{{$t('order_detail.price_summary.tax')}}</div>
        <div class="font-medium"> 
          {{sellerCartStore.cart.campaign.currency}}
          {{(Math.floor(parseFloat(sellerCartStore.cart.tax) * (10 ** sellerCartStore.cart.campaign.decimal_places)) / 10 ** sellerCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
          {{sellerCartStore.cart.campaign.price_unit?$t(`global.price_unit.${sellerCartStore.cart.campaign.price_unit}`):''}}
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
        <div class="font-medium text-base" v-if="sellerCartStore.cart.campaign">
          {{sellerCartStore.cart.campaign.currency}} 
          {{(Math.floor(parseFloat(cartTotal) * (10 ** sellerCartStore.cart.campaign.decimal_places)) / 10 ** sellerCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
          {{sellerCartStore.cart.campaign.price_unit?$t(`global.price_unit.${sellerCartStore.cart.campaign.price_unit}`):''}}
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
const sellerStore = useLSSSellerLayoutStore()


const cartTotal = ref(0)

onMounted(()=>{
  watch(computed(()=>sellerCartStore.cart.adjust_price), () => { 

    if( sellerCartStore.cart.adjust_price < 0 ){
        sellerCartStore.modify_status = '-'
    }else{
        sellerCartStore.modify_status = '+'
    } 
    updatePriceSummary()
  })

  watch(computed(()=>sellerCartStore.modify_status), () => { 

    sellerCartStore.cart.adjust_price=sellerCartStore.modify_status === '-'? -parseFloat(Math.abs(sellerCartStore.cart.adjust_price)) : parseFloat(Math.abs(sellerCartStore.cart.adjust_price))
    updatePriceSummary()
  })
  watch(computed(()=>sellerCartStore.cart.free_delivery), () => { 
    updatePriceSummary()
  })

  watch(computed(()=>sellerCartStore.cart), () => { 
    updatePriceSummary()
  })
})

const computedCartSubtotal = computed(()=>{
  var subtotal = 0
  Object.entries(sellerCartStore.cart.products).forEach(([key, value])=>{
    subtotal += ((campaignDetailStore.campaignProductDict[key]?.price||0)*value )
  })
  return subtotal
})

const computedAdjustPrice = computed({
  get:()=>{
    return Math.abs(sellerCartStore.cart.adjust_price)
  },
  set:adjust_price=>{
     sellerCartStore.cart.adjust_price = sellerCartStore.modify_status === '-'? -parseFloat(Math.abs(adjust_price)) : parseFloat(Math.abs(adjust_price))
     updatePriceSummary()
  }
});

const computedSubtotalOverFreeDeliveryThreshold = computed(()=>{
  return sellerCartStore.cart.campaign?.meta_logistic?.is_free_delivery_for_order_above_price ? computedCartSubtotal.value >= sellerCartStore.cart.campaign?.meta_logistic?.free_delivery_for_order_above_price : false
})

const computedItemsOverFreeDeliveryThreshold = computed(()=>{
  return sellerCartStore.cart.campaign?.meta_logistic?.is_free_delivery_for_how_many_order_minimum ? sellerCartStore.cart.products.length >= sellerCartStore.cart.campaign?.meta_logistic?.free_delivery_for_how_many_order_minimum : false
})


const sellerAdjustPrice = ()=>{
  const modify_price = {
    'adjust_title':sellerCartStore.cart.adjust_title,
    'adjust_price':sellerCartStore.cart.adjust_price,
    'free_delivery':sellerCartStore.cart.free_delivery
  }

  seller_adjust_price(route.params.cart_id, modify_price, sellerStore.alert).then(
    res => {
      sellerStore.notification.showMessageToast('Update')
      sellerCartStore.cart = res.data
    }
  )
}

const updatePriceSummary = ()=>{
  // console.log('update price summary')
    //summarize_total

  let total = 0
  total += computedCartSubtotal.value
  total -= sellerCartStore.cart.discount
  total = Math.max(total, 0)
  // if(!sellerCartStore.cart.free_delivery){
  //   total += sellerCartStore.cart.shipping_cost
  // }
      
  total += sellerCartStore.cart.adjust_price
  cartTotal.value = Math.max(total, 0)
}


// const update_adjust_price_sign = ()=>{
//   // if(sellerCartStore.cart.free_delivery){
//   //     sellerCartStore.cart.shipping_cost = 0
//   // }

//   // console.log('123')
//   // console.log(sellerCartStore.cart.adjust_price)
//   if( sellerCartStore.cart.adjust_price < 0 ){
//       sellerCartStore.modify_status = '-'
//       // sellerCartStore.cart.adjust_price = Math.abs(sellerCartStore.cart.adjust_price)
//   }else{
//       sellerCartStore.modify_status = '+'
//   }
// }

const cleanAdjust = ()=>{
  seller_adjust_price(route.params.cart_id,{'adjust_title':'','adjust_price':0,'free_delivery':sellerCartStore.cart.free_delivery}, sellerStore.alert).then(
    res => {
      sellerStore.notification.showMessageToast('Update')
      sellerCartStore.cart = res.data
    }
  )
}
</script>
