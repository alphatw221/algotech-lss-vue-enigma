<template>
  <div class="box p-5 border-2 border-secondary">
    <div>
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">{{$t('order_detail.price_summary.price_summary')}}</span>
      </div>
	  
      <div class="flex">
        <div class="mr-auto">{{$t('order_detail.price_summary.sub_total')}}</div>
        <div class="font-medium" v-if="store.orderDetail.campaign">
          {{store.orderDetail.campaign.currency}} 
          {{ (Math.floor(parseFloat(store.orderDetail.subtotal) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places).toLocaleString('en-GB')}}
          {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
        </div>
      </div>
      <div class="flex">
        <div class="mr-auto">
          {{$t('order_detail.price_summary.shipping')}}
          <span class="text-red-500" v-if="store.orderDetail.free_delivery">({{$t('order_detail.price_summary.apply_free_delivery')}})</span>
        </div>
        <div class="font-medium" v-if="store.orderDetail.campaign">
          {{store.orderDetail.campaign.currency}} 
          {{ (Math.floor(parseFloat(store.orderDetail.shipping_cost) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places).toLocaleString('en-GB')}}
          {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
        </div>
      </div>
      <template v-if="store.orderDetail.adjust_price">
        <div class="flex">
            <div class="mr-auto">{{store.orderDetail.adjust_title}}</div>
            <div class="font-medium" v-if="store.orderDetail.campaign">
              {{store.orderDetail.campaign.currency}}
              {{store.modify_status == '-' ? '-' + Math.floor(parseFloat(store.orderDetail.adjust_price) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places : Math.floor(parseFloat(store.orderDetail.adjust_price) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places}}
              {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
            </div>
            <XIcon class="w-5 h-5 text-slate-400" @click="cleanAdjust()"/>
        </div>
      </template>
        <div class="flex" v-if="store.orderDetail.campaign">
          <template v-if="store.orderDetail.discount !=0"> 
            <div class="mr-auto">{{$t('shopping_cart.order_summary.promo_discount')}} <span class="text-danger">({{store.orderDetail.applied_discount.code}})</span></div>
            <div class="font-medium"> 
              {{store.orderDetail.campaign.currency}}
              -{{(Math.floor(parseFloat(store.orderDetail.discount) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places).toLocaleString('en-GB')}}
              {{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
            </div>
          </template>
        </div>
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
                        <input id="regular-form-2" type="number" class="form-control " :placeholder="$t('order_detail.price_summary.amount')" v-model="store.orderDetail.adjust_price" />
                    </div>
                    <div class="flex flex-row-reverse col-span-4">
                        <button class="btn btn-primary w-32 shadow-md" @click="update_modify_price">{{$t('order_detail.price_summary.update')}}</button>
                    </div> 
                    <div class="col-start-5 col-span-8" v-if="store.modify_status==='-' &&store.orderDetail.subtotal+store.orderDetail.shipping_cost-store.orderDetail.discount-store.orderDetail.adjust_price < 0" style="color:red">
                        {{$t('order_detail.price_summary.price_exceed')}}
                    </div>
            </div>
        </div>
      </div>
      </template>
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

const modify_price = {
  'adjust_title':'',
  'adjust_price':0,
  'free_delivery':false
}

function update_modify_price(){
  modify_price.adjust_title = store.orderDetail.adjust_title
  modify_price.free_delivery = store.orderDetail.free_delivery
  if(store.modify_status === '-'){
    modify_price.adjust_price = -parseFloat(store.orderDetail.adjust_price)
  }else{
    modify_price.adjust_price = parseFloat(store.orderDetail.adjust_price)
  }

  seller_adjust_price(route.params.order_id,modify_price).then(
    res => {
      alert('Update')
      store.orderDetail = res.data
      show_adjust_price()
    }
  )
}

function show_adjust_price(){
    if( store.orderDetail.adjust_price < 0 ){
        store.modify_status = '-'
        store.orderDetail.adjust_price = Math.abs(store.orderDetail.adjust_price)
    }else{
        store.modify_status = '+'
    }
}

const cleanAdjust = ()=>{
  seller_adjust_price(route.params.order_id,{'adjust_title':'','adjust_price':0,'free_delivery':false}).then(
    res => {
      store.orderDetail = res.data
    }
  )
}
</script>
