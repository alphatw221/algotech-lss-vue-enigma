<template>
  <div class="box p-5 border-2 border-secondary">
    <div>
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">Price Summary</span>
      </div>
	  
      <div class="flex">
        <div class="mr-auto">Subtotal</div>
        <div class="font-medium">$ {{parseFloat(store.orderDetail.subtotal).toFixed(2)}}</div>
      </div>
      <div class="flex">
        <div class="mr-auto">Shipping</div>
        <div class="font-medium">$ {{parseFloat(store.orderDetail.shipping_cost).toFixed(2)}}</div>
      </div>
      <template v-if="store.orderDetail.adjust_title !== null">
        <div class="flex">
            <div class="mr-auto">{{store.orderDetail.adjust_title ?? 'Discount'}}</div>
            <div class="font-medium">$ {{store.modify_status == '-' ? -store.orderDetail.adjust_price : store.orderDetail.adjust_price}}</div>
        </div>
      </template>
      <template v-if="props.order_type !== 'order'">
      <div class="flex mt-4 border-t border-slate-200/60 dark:border-darkmode-400 mt-4
          pt-4">
        <div class="mr-auto">Modify Price
            <div class="grid grid-cols-12 gap-4">
                <div class="start-col-1 col-span-4">
                    <input :id="'radio-switch-p'" class="form-check-input" type="radio" name="vertical_radio_button" v-model="store.modify_status" :value="'+'" />
                    <span> Add +</span>
                </div>
                <div class="start-col-5 col-span-4">
                    <input :id="'radio-switch-m'" class="form-check-input" type="radio" name="vertical_radio_button" v-model="store.modify_status" :value="'-'" />
                    <span> Subtract -</span>
                </div>
            </div>
                <div class="mt-3 grid grid-cols-12 gap-4 xl:m-5 2xl:m-5">
                        <div class="col-span-4">
                            <input id="regular-form-2" type="text" class="form-control " placeholder="Display Name" v-model="store.orderDetail.adjust_title" />
                        </div>
                        <div class="col-span-4">
                            <input id="regular-form-2" type="text" class="form-control " placeholder="Amount" v-model="store.orderDetail.adjust_price" />
                        </div>
                        <div class="flex flex-row-reverse col-span-4">
                            <button class="btn btn-primary w-32 shadow-md" @click="update_modify_price">Update</button>
                        </div> 
                </div>
            <div class="m-3">
                <input
                    class="form-check-input border border-slate-500"
                    type="checkbox"
                    v-model="store.orderDetail.free_delivery"
                    />
                <span class="ml-2">Free Delivery</span>
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
        <div class="mr-auto font-medium text-base">Total Charge</div>
        <div class="font-medium text-base">$ {{parseFloat(store.orderDetail.total).toFixed(2)}}</div>
      </div>
    </div>
  </div>
    
</template>
<script setup>
import { useSellerOrderStore } from "@/stores/lss-seller-order";
import { seller_adjust_price } from "@/api_v2/pre_order"
import { useRoute, useRouter } from "vue-router";
import {ref, watch, computed} from "vue";

const store = useSellerOrderStore();
const route = useRoute();
const router = useRouter();

const props = defineProps({
  order_type: String
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

</script>
