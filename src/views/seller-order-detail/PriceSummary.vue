<template>
  <div class="box p-5 border-2 border-secondary">
    <div>
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">Price Summary</span>
      </div>
	  
      <div class="flex">
        <div class="mr-auto">Subtotal</div>
        <div class="font-medium">{{parseFloat(store.orderDetail.subtotal).toFixed(2)}}</div>
      </div>
      <div class="flex">
        <div class="mr-auto">Shipping</div>
        <div class="font-medium">{{parseFloat(store.orderDetail.shipping_cost).toFixed(2)}}</div>
      </div>
      <template v-if="props.order_type === 'order'">
        <div class="flex">
            <div class="mr-auto">{{store.orderDetail.adjust_title ?? 'Discount'}}</div>
            <div class="font-medium">{{store.orderDetail.adjust_price ?? ''}}</div>
        </div>
      </template>
      <template v-else>
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
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder="Display Name" v-model="store.orderDetail.adjust_title" />
                        </div>
                        <div class="col-span-4">
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder="Amount" v-model="store.orderDetail.adjust_price" />
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
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { update_adjust_price } from "@/api_v2/pre_order"
import { useRoute, useRouter } from "vue-router";
import {ref, watch, computed, getCurrentInstance} from "vue";

const store = useManageOrderStore();
const route = useRoute();
const router = useRouter();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const props = defineProps({
  order_type: String
})

const adjust_price = ref(store.orderDetail.adjust_price)
const adjust_title = ref(store.orderDetail.adjust_title)

function update_modify_price(){
  store.modify_price.adjust_title = store.orderDetail.adjust_title
  store.modify_price.free_delivery = store.orderDetail.free_delivery
  if(store.modify_status === '-'){
    store.modify_price.adjust_price = -(store.orderDetail.adjust_price)
  }else{
    store.modify_price.adjust_price = store.orderDetail.adjust_price
  }

  update_adjust_price(route.params.order_id,store.modify_price).then(
    res => {
      alert('Update')
      eventBus.emit('getNewPrice')
    }
  )
}
function update_price_summary(){

}
// watch(
//   computed(() => store.orderDetail),
// );

</script>
