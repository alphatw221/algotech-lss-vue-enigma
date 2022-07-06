<template>
    <AccordionGroup class="mb-10" :selectedIndex="selectIndex" > 
        <DirectPayment />
        <div class="mt-5" v-for="(payment, index) in payments" :key="index">
            <DirectPaymentV2 v-if="payment.key=='direct_payment'"/>
            <PaymentMethod class="mt-1" v-else :payment="payment" />
        </div>
    </AccordionGroup>
</template>


<script setup>
import DirectPayment from "./DirectPayment.vue";
import DirectPaymentV2 from "./DirectPayment_v2.vue"
import PaymentMethod from "./PaymentMethod.vue"

import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
const store = useLSSBuyerOrderStore(); 
const paymentMetaStore = useLSSPaymentMetaStore()
import {onMounted, computed, watch} from "vue"
import {ref} from "vue"
const selectIndex = ref(0)
const payments = ref([])

watch(computed(()=>store.order),()=>{

    if (!store.order.campaign) return
    if (!store.order.campaign.user_subscription) return
    const meta_payment = store.order.campaign.meta_payment
    if (!meta_payment) return
    const meta_country = store.order.campaign.user_subscription.meta_country
    if (!meta_country) return
    const paymentKeySet = new Set()

    meta_country.activated_country.forEach( country => { paymentMetaStore[country].forEach( key => paymentKeySet.add(key) ) } )
    
    paymentKeySet.forEach(key => {
        if (meta_payment[key] && meta_payment[key].enabled) payments.value.push(paymentMetaStore[key])
    });

})


</script>
