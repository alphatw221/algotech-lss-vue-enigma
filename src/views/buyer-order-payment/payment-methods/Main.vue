<template>
    <AccordionGroup class="mb-10 " :selectedIndex="selectIndex" > 
        <!-- <DirectPayment /> -->
        <PickupPay v-if="store.order.shipping_option_data?.logisticsType == 'CVS'" /> 
        <template v-else> 
            <div class="mt-5" v-for="(payment, index) in payments" :key="index">
                <DirectPaymentV2 v-if="payment.key=='direct_payment'"/>
                <PickupPay v-else-if="payment.key=='pickup_pay'" :payment="payment"/> 
                <PaymentMethod class="mt-1" v-else :payment="payment" />
            </div>
        </template>
    </AccordionGroup>
</template>


<script setup>
import DirectPayment from "./DirectPayment.vue";
import DirectPaymentV2 from "./DirectPayment_v2.vue"
import PaymentMethod from "./PaymentMethod.vue"
import PickupPay from "./PickupPay.vue";

import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
import {onMounted, computed, watch, ref} from "vue"

const store = useLSSBuyerOrderStore(); 
const paymentMetaStore = useLSSPaymentMetaStore()
const selectIndex = ref(0)
const payments = ref([])

watch(computed(()=>store.order),()=>{
    console.log('payment-methods')
    if (!store.order.campaign) return
    if (!store.order.campaign.user_subscription) return
    const meta_payment = store.order.campaign.meta_payment
    if (!meta_payment) return
    const meta_country = store.order.campaign.user_subscription.meta_country
    if (!meta_country) return
    const paymentKeySet = new Set()

    meta_country.activated_country.forEach( country => { paymentMetaStore[country].forEach( key => paymentKeySet.add(key) ) } )
    console.log('keySet',paymentKeySet)
    // if (meta_payment['ecpay'] && meta_payment['ecpay'].invoice_enabled) paymentMetaStore['ecpay'].invoice = true
    paymentKeySet.forEach(key => {
        if (meta_payment[key] && meta_payment[key].enabled) payments.value.push(paymentMetaStore[key])
    });
    console.log('pp',payments.value)
})

const cash_on_delivery = () =>{
  const data = {
    'is_collection': 'N', //Y or N
    } 
    buyer_cash_on_delivery(route.params.order_oid,data).then(
    res=>{
        console.log(res.data)
    }
  )
  
}


</script>
