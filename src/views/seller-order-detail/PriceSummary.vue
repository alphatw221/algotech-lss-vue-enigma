<template>
  <div class="box p-5 border-2 border-secondary">
    <div>
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">Price Summary</span>
      </div>
	  
      <div class="flex">
        <div class="mr-auto">Subtotal</div>
        <div class="font-medium">{{store.orderDetail.subtotal}}</div>
      </div>
      <div class="flex">
        <div class="mr-auto">Shipping</div>
        <div class="font-medium">{{store.orderDetail.shipping_cost}}</div>
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
                    <input :id="'radio-switch-p'" class="form-check-input" type="radio" name="vertical_radio_button"/>
                    <span> Add +</span>
                </div>
                <div class="start-col-5 col-span-4">
                    <input :id="'radio-switch-m'" class="form-check-input" type="radio" name="vertical_radio_button"/>
                    <span> Subtract -</span>
                </div>
            </div>
                <div class="m-5 grid grid-cols-12 gap-4">
                        <div class="col-span-4">
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder="Display Name" />
                        </div>
                        <div class="col-span-4">
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder="Amount" />
                        </div>
                        <div class="flex flex-row-reverse col-span-4">
                            <button class="btn btn-primary w-32 shadow-md" @click="update_order">Update</button>
                        </div> 
                </div>
            <div class="m-3">
                <input
                    class="form-check-input border border-slate-500"
                    type="checkbox"
                    />
                <span>Free Delivery</span>
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
        <div class="font-medium text-base">{{store.orderDetail.total}}</div>
      </div>
    </div>
  </div>
    
</template>
<script setup>
import { useManageOrderStore } from "@/stores/lss-manage-order";

const store = useManageOrderStore();

const props = defineProps({
  order_type: String
})

</script>
