<template>
    <div class="flex-col w-full"> 
        <div class="p-8 sm:my-5 border-2 box border-secondary flex-col flex gap-4"> 
            <div>
                <span class="text-lg"> {{$t('order_detail.payment.information')}}</span>   
            </div>
           
            <div class="grid grid-cols-6 gap-3" v-if="sellerOrderDetailStore.order.payment_method">
                <template v-if="sellerOrderDetailStore.order.payment_method">
                    <span class="col-start-1 col-span-2">{{$t('order_detail.payment.method')}}</span>
                    <span class="col-start-3 col-span-3">
                        {{ sellerOrderDetailStore.order.payment_method == 'direct_payment' ? `${$t('order_detail.payment.Direct Payment')} - ${sellerOrderDetailStore.order.meta.account_mode}` : $t(`order_detail.payment.${sellerOrderDetailStore.order.payment_method}`) }}</span>
                </template>

                <template v-if="sellerOrderDetailStore.order.meta?.last_five_digit">
                    <span class="col-start-1 col-span-2">{{$t('order_detail.payment.last_five_digits')}}</span>
                    <div v-if="sellerOrderDetailStore.order.meta.last_five_digit == '' && !sellerOrderDetailStore.order.meta.receipt_image" class="col-start-3 col-span-3">{{$t('order_detail.payment.no_record')}} </div>
                    <span v-else  class="col-start-3 col-span-3">{{sellerOrderDetailStore.order.meta.last_five_digit}}</span>
                </template>

                <template v-if="sellerOrderDetailStore.order.meta.receipt_image">
                    <span class="col-start-1 col-span-2">{{$t('order_detail.payment.record')}}</span>
                    <div class="col-start-3 col-span-3 w-20 h-20 image-fit zoom-in">
                        <Tippy
                        v-if="sellerOrderDetailStore.order.meta.receipt_image"
                            tag="img"
                            data-action="zoom"
                            content="receipt image"
                            class="rounded-lg"
                            :src="sellerOrderDetailStore.order.meta.receipt_image"
                        />
                    </div>
                </template>

                <span class="col-start-1 col-span-2">{{$t('order.payment_status')}}</span>   
                <span class="col-start-3 col-span-3">{{$t(`order.payment_status_options.${sellerOrderDetailStore.order.payment_status}`)}}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSellerOrderStore } from "@/stores/lss-seller-order";
const sellerOrderDetailStore = useSellerOrderStore()

</script>