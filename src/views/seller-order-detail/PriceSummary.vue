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
        <div class="font-medium" v-if="store.orderDetail.campaign">
          {{store.orderDetail.campaign.currency}} 
          {{ (Math.floor(parseFloat(store.orderDetail.subtotal) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places).toLocaleString('en-GB')}}
          {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
        </div>
      </div>



      <!-- DISCOUNT -->
      <div class="flex" v-if="store.orderDetail.campaign">
        <template v-if="store.orderDetail.discount !=0"> 
          <div class="mr-auto">{{$t('shopping_cart.order_summary.promo_discount')}} <span class="text-danger">{{store.orderDetail.applied_discount.code ? (store.orderDetail.applied_discount.code) : '' }}</span></div>
          <div class="font-medium"> 
            {{store.orderDetail.campaign.currency}}
            -{{(Math.floor(parseFloat(store.orderDetail.discount) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places).toLocaleString('en-GB')}}
            {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
          </div>
        </template>
      </div>



      <!-- SUBTOTAL_AFTER_DISCOUNT -->
      <div class="flex" v-if="store.orderDetail.discount !=0">
        <!-- <div class="mr-auto">{{$t('order_detail.price_summary.sub_total')}}</div> -->
        <div class="mr-auto">Subtotal After Doscount</div>
        <div class="font-medium" v-if="store.orderDetail.campaign ">
          {{store.orderDetail.campaign.currency}} 
          {{ (Math.floor(parseFloat(Math.max(store.orderDetail.subtotal-store.orderDetail.discount,0)) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places).toLocaleString('en-GB')}}
          {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
        </div>
      </div>



      <!-- SHIPPING -->
      <div class="flex">
        <div class="mr-auto">
          {{$t('order_detail.price_summary.shipping')}}
          <span class="text-red-500" v-if="store.orderDetail.free_delivery || store.orderDetail?.meta?.subtotal_over_free_delivery_threshold || store.orderDetail?.meta?.items_over_free_delivery_threshold">
            ({{$t('order_detail.price_summary.apply_free_delivery')}})
          </span>
        </div>

        <template v-if="store.orderDetail.campaign">

          <div class="font-medium" v-if="store.orderDetail.free_delivery || store.orderDetail?.meta?.subtotal_over_free_delivery_threshold || store.orderDetail?.meta?.items_over_free_delivery_threshold">
            {{store.orderDetail.campaign.currency}} 
            {{ (Math.floor(parseFloat(0) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places).toLocaleString('en-GB')}}
            {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
          </div>

          <div class="font-medium" v-else>
            {{store.orderDetail.campaign.currency}} 
            {{ (Math.floor(parseFloat(store.orderDetail.shipping_cost) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places).toLocaleString('en-GB')}}
            {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
          </div>


        </template> 
        
      </div>

      


      

      <!-- ADJUST_PRICE -->
      <template v-if="store.orderDetail.adjust_price">
        <div class="flex">
            <div class="mr-auto">{{store.orderDetail.adjust_title}}</div>
            <div class="font-medium" v-if="store.orderDetail.campaign">
              {{store.orderDetail.campaign.currency}}
              {{Math.floor(parseFloat(store.orderDetail.adjust_price) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places }}
              <!-- {{store.modify_status == '-' ? '-' + Math.floor(parseFloat(store.orderDetail.adjust_price) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places : Math.floor(parseFloat(store.orderDetail.adjust_price) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places}} -->
              {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
            </div>
            <XIcon class="w-5 h-5 text-slate-400 cursor-pointer" @click="cleanAdjust()"/>
        </div>
      </template>


      <!-- SELLER_PRICE_ADJUSTMENT_SECTION -->
      <template v-if="props.order_type !== 'order'">
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
                    v-model="store.orderDetail.free_delivery"
                    />
                <span class="ml-2">{{$t('order_detail.price_summary.free_delivery')}}</span>
            </div>         
            <div class="flex flex-row w-2/3 gap-4 whitespace-nowrap">
                <div class="">
                    <input :id="'radio-switch-p'" class="form-check-input mr-2" type="radio" name="vertical_radio_button" v-model="store.modify_status" :value="'+'" />
                    <span> {{$t('order_detail.price_summary.add')}} +</span>
                </div>
                <div class="">
                    <input :id="'radio-switch-m'" class="form-check-input mr-2" type="radio" name="vertical_radio_button" v-model="store.modify_status" :value="'-'" />
                    <span> {{$t('order_detail.price_summary.subtract')}} -</span>
                </div>
            </div>
            <div class="mt-3 grid grid-cols-12 gap-4 xl:mt-5 2xl:mt-5">
                    <div class="col-span-4">
                        <input id="regular-form-2" type="text" class="form-control " :placeholder="$t('order_detail.price_summary.display_name')" v-model="store.orderDetail.adjust_title" />
                    </div>
                    <div class="col-span-4">
                        <input id="regular-form-2" type="number" class="form-control " :placeholder="$t('order_detail.price_summary.amount')" v-model="computedAdjustPrice" />
                    </div>
                    <div class="flex flex-row-reverse col-span-4">
                        <button class="btn btn-primary w-32 shadow-md" @click="sellerAdjustPrice()">{{$t('order_detail.price_summary.update')}}</button>
                    </div> 
                    <!-- <div class="col-start-5 col-span-8" v-if="store.modify_status==='-' &&store.orderDetail.subtotal+store.orderDetail.shipping_cost-store.orderDetail.discount-store.orderDetail.adjust_price < 0" style="color:red">
                        {{$t('order_detail.price_summary.price_exceed')}}
                    </div> -->
            </div>
        </div>
      </div>
      </template>

      <!-- TAX -->
      <div class="flex" v-if="store.orderDetail.tax">
        <div class="mr-auto">{{$t('order_detail.price_summary.tax')}}</div>
        <div class="font-medium"> 
          {{store.orderDetail.campaign.currency}}
          {{(Math.floor(parseFloat(store.orderDetail.meta.shopify.total_tax) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places).toLocaleString('en-GB')}}
          {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
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
        <div class="font-medium text-base" v-if="store.orderDetail.campaign">
          {{store.orderDetail.campaign.currency}} 
          {{(Math.floor(parseFloat(store.orderDetail.total) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places).toLocaleString('en-GB')}}
          {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
        </div>
      </div>

    </div>
  </div>
    
</template>
<script setup>
import { useSellerOrderStore } from "@/stores/lss-seller-order";
import { seller_adjust_price } from "@/api_v2/pre_order"
import { useRoute, useRouter } from "vue-router";
import {ref, watch, computed, onMounted} from "vue";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const store = useSellerOrderStore();
const route = useRoute();
const router = useRouter();
const sellerStore = useLSSSellerLayoutStore()

const props = defineProps({
  order_type: String,
  decimal_places: Number
})


onMounted(()=>{
  watch(computed(()=>store.orderDetail.adjust_price), () => { 

    if( store.orderDetail.adjust_price < 0 ){
        store.modify_status = '-'
    }else{
        store.modify_status = '+'
    } 
    updatePriceSummary()
  })

  watch(computed(()=>store.modify_status), () => { 

    store.orderDetail.adjust_price=store.modify_status === '-'? -parseFloat(Math.abs(store.orderDetail.adjust_price)) : parseFloat(Math.abs(store.orderDetail.adjust_price))
    updatePriceSummary()
  })
  watch(computed(()=>store.orderDetail.free_delivery), () => { 
    updatePriceSummary()
  })

})



const computedAdjustPrice = computed({
  get:()=>{
    return Math.abs(store.orderDetail.adjust_price)
  },set:adjust_price=>{
     store.orderDetail.adjust_price = store.modify_status === '-'? -parseFloat(Math.abs(adjust_price)) : parseFloat(Math.abs(adjust_price))
     updatePriceSummary()
  }});



const sellerAdjustPrice = ()=>{
  const modify_price = {
    'adjust_title':store.orderDetail.adjust_title,
    'adjust_price':store.orderDetail.adjust_price,
    'free_delivery':store.orderDetail.free_delivery
  }

  seller_adjust_price(route.params.order_id,modify_price).then(
    res => {
      sellerStore.notification.showMessageToast('Update')
      store.orderDetail = res.data
    }
  )
}

const updatePriceSummary = ()=>{
  console.log('update price summary')
    //summarize_total
    let total = 0
    total += store.orderDetail.subtotal
    total -= store.orderDetail.discount
    total = Math.max(total, 0)

    if(!store.orderDetail.free_delivery){
      total += store.orderDetail.shipping_cost
    }
        
    total += store.orderDetail.adjust_price

    store.orderDetail.total = Math.max(total, 0)

}


// const update_adjust_price_sign = ()=>{
//   // if(store.orderDetail.free_delivery){
//   //     store.orderDetail.shipping_cost = 0
//   // }

//   // console.log('123')
//   // console.log(store.orderDetail.adjust_price)
//   if( store.orderDetail.adjust_price < 0 ){
//       store.modify_status = '-'
//       // store.orderDetail.adjust_price = Math.abs(store.orderDetail.adjust_price)
//   }else{
//       store.modify_status = '+'
//   }
// }

const cleanAdjust = ()=>{
  seller_adjust_price(route.params.order_id,{'adjust_title':'','adjust_price':0,'free_delivery':store.orderDetail.free_delivery}).then(
    res => {
      sellerStore.notification.showMessageToast('Update')
      store.orderDetail = res.data
    }
  )
}
</script>
