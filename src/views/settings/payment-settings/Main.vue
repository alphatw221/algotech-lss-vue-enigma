<template>
    <div class="p-2 2xl:p-10">
        <TabGroup v-if="paymentReady">
            <TabList class="nav-boxed-tabs flex flex-wrap gap-3 w-full justify-around items-center sm:px-10">
                <Tab
                    class="h-20 border-[#131c34] w-fit flex self-center" 
                    tag="button"
                    v-for="payment,index in payments" :key="index"
                >
                    <div class="grow inline-flex items-center place-content-center my-auto">
                        <font-awesome-icon icon="fa-regular fa-credit-card" class="block mr-1 h-6" />
                        <span class="text-sm w-24 lg:text-lg lg:w-32 ">{{payment.name}}</span>
                    </div>
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