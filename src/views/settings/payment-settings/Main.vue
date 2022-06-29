<template>
    <div class="box p-2 2xl:p-10">
        <TabGroup v-if="paymentReady">
            <TabList class="nav-boxed-tabs flex flex-wrap content-around justify-around items-stretch self-auto ">

                <Tab
                    class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1" 
                    tag="button"
                    v-for="payment,index in payments" :key="index"
                >
                    <font-awesome-icon icon="fa-regular fa-credit-card" class="block mr-1 h-8" />
                    <span class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">{{payment.name}}</span>
                </Tab>
            </TabList>

            <TabPanels class="mt-0 lg:mt-5 2xl:mt-5 px-2 lg:px-10 2xl:px-10" >
                <TabPanel class="leading-relaxed" v-for="payment, index in payments" :key="index">

                        <DirectPayment :payment ="payment" v-if="payment.key=='direct_payment'"/>
                    
                        <PaymentMethod :payment="payment" v-else/>

                </TabPanel>  
            </TabPanels>
        </TabGroup>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

import DirectPayment from './DirectPayment.vue'
import PaymentMethod from './PaymentMethod.vue'

const paymentStore = useLSSPaymentMetaStore()
const sellerStore = useLSSSellerLayoutStore()
const payments = ref([])
const paymentReady = ref(false)
onMounted(() => {
    if(!sellerStore.userInfo.user_subscription)return
    const meta_country = sellerStore.userInfo.user_subscription.meta_country
    const paymentKeySet = new Set()
    meta_country.activated_country.forEach( country => { paymentStore[country].forEach( key => paymentKeySet.add(key) ) } )
    paymentKeySet.forEach(key => {
        payments.value.push(paymentStore[key])
    });
    paymentReady.value=true
})

</script>