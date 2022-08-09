<template>
    <div class="p-2 2xl:p-10">
        <TabGroup v-if="paymentReady">
            <TabList class="flex flex-wrap items-center justify-end gap-1 sm:gap-3 nav-boxed-tabs sm:px-10">
                <Tab
                    class="h-20 mx-auto border-[#131c34] w-[100%] max-w-[180px] text-center" 
                    tag="button"
                    v-for="payment,index in payments" :key="index"
                >   
                    <div v-if="payment.name === 'Direct Payment'" class="inline-flex items-center my-auto grow w-full">
                        <font-awesome-icon icon="fa-solid fa-money-check-dollar" class="hidden sm:block h-6 mr-1"/>
                        <span class="w-[75px] text-sm lg:text-lg lg:w-32 mx-auto">{{ $t(`settings.payment_form.payment_titles.${payment.key}`) }}</span>
                    </div>
                    <div v-else class="inline-flex items-center my-auto grow w-full mx-auto">
                        <font-awesome-icon icon="fa-regular fa-credit-card" class="hidden sm:block h-6 mr-1" />
                        <span class="w-[75px] text-sm lg:text-lg lg:w-32 mx-auto">{{ $t(`settings.payment_form.payment_titles.${payment.key}`) }}</span>
                    </div>
                </Tab>
            </TabList>
            <div class="mt-0 lg:mt-5 lg:px-10 lg:mx-10">  
                <TabPanels>
                    <TabPanel class="leading-relaxed" v-for="payment, index in payments" :key="index">

                            <DirectPayment :payment ="payment" v-if="payment.key=='direct_payment'"/>
                        
                            <PaymentMethod :payment="payment" v-else/>

                    </TabPanel>  
                </TabPanels>
            </div>
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
    console.log(payments.value)
})

</script>