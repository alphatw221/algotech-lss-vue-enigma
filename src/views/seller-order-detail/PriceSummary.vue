<template>
  <div class="box p-5 m-3 border-2 border-secondary">
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
      <template v-if="store.orderDetail.status === 'complete'">
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
                <div class="col-span-6">
                    <input :id="'radio-switch-p'" class="form-check-input" type="radio" name="vertical_radio_button"/>
                    <span> Add +</span>
                </div>
                <div class="col-span-6">
                    <input :id="'radio-switch-m'" class="form-check-input" type="radio" name="vertical_radio_button"/>
                    <span> Subtract -</span>
                </div>
            </div>
                <div class="m-5 grid grid-cols-12 gap-4">
                        <div class="col-span-6">
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder="Display Name" />
                        </div>
                        <div class="col-span-6">
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder="Amount" />
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
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
const store = useShoppingCartStore();
</script>
