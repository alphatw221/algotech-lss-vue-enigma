<template>
    <div class="flex-col w-full"> 
        <div class="p-8 sm:my-5 border-2 box border-secondary flex-col flex gap-4"> 
            <span class="text-lg"> {{$t('order_detail.payment.information')}}</span>   
            <div class="grid grid-cols-6" v-if="store.orderDetail.payment_method">
                <template v-if="store.orderDetail.payment_method">
                    <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.method')}}</span>
                    <span class="col-start-3 col-span-3 py-2">
                        {{ store.orderDetail.payment_method == 'Direct Payment'||'direct_payment' ? `${$t('order_detail.payment.Direct Payment')} - ${store.orderDetail.meta.account_mode}` : store.orderDetail.payment_method }}</span>
                </template>

                <template v-if="store.orderDetail">
                    <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.last_five_digits')}}</span>
                    <div v-if="store.orderDetail.meta.last_five_digit == '' && !store.orderDetail.meta.receipt_image" class="col-start-3 col-span-3 py-2">{{$t('order_detail.payment.no_record')}} </div>
                    <span v-else  class="col-start-3 col-span-3 py-2">{{store.orderDetail.meta.last_five_digit}}</span>
                </template>

                <template v-if="store.orderDetail.meta.receipt_image">
                    <span class="col-start-1 col-span-2 py-2">{{$t('order_detail.payment.record')}}</span>
                    <span class="col-start-3 col-span-3 py-2">
                            <Tippy tag="img" :src="store.orderDetail.meta.receipt_image" />
                    </span>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSellerOrderStore } from "@/stores/lss-seller-order";
const store = useSellerOrderStore()

</script>