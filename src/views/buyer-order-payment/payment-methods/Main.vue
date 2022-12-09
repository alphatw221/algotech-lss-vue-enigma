<template>
    <AccordionGroup class="mb-10 " :selectedIndex="selectIndex" > 
        <!-- <DirectPayment /> -->
        <div class="mt-5" v-for="(payment, index) in payments" :key="index">
            <DirectPaymentV2 v-if="payment.key=='direct_payment'"/>
            <PaymentMethod class="mt-1" v-else :payment="payment" />
        </div>
    </AccordionGroup>
    <!-- Ecpay csv map test button -->
    <button class="w-fit btn btn-rounded-primary" @click="cash_on_delivery">
        test ecpay
    </button>
</template>


<script setup>
import DirectPayment from "./DirectPayment.vue";
import DirectPaymentV2 from "./DirectPayment_v2.vue"
import PaymentMethod from "./PaymentMethod.vue"

import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
import {onMounted, computed, watch} from "vue"
import {ref} from "vue"
import { useRoute, useRouter } from "vue-router";
import {buyer_cash_on_delivery} from "@/api_v2/order"
const store = useLSSBuyerOrderStore(); 
const paymentMetaStore = useLSSPaymentMetaStore()
const route = useRoute();
const router = useRouter();
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
    console.log(paymentKeySet)
    // if (meta_payment['ecpay'] && meta_payment['ecpay'].invoice_enabled) paymentMetaStore['ecpay'].invoice = true
    paymentKeySet.forEach(key => {
        if (meta_payment[key] && meta_payment[key].enabled) payments.value.push(paymentMetaStore[key])
    });
    console.log(payments.value)
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
