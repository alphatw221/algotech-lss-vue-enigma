<template>
    <div class="box p-2 2xl:p-10">
        <TabGroup>
            <TabList class="nav-boxed-tabs flex flex-wrap content-around justify-around items-stretch self-auto ">
                <template v-for="(payment, index) in activatePayment" :key="index">
                    <Tab
                        class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1" 
                        tag="button"
                    >
                        <font-awesome-icon icon="fa-regular fa-credit-card" class="block mr-1 h-8" />
                        <span class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">{{ payment }}</span>
                    </Tab>    
                </template>
                

                <!-- <Tab
                    v-show="activatePayment.includes('direct_payment')"
                    class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1" 
                    tag="button"
                >
                    <font-awesome-icon icon="fa-regular fa-credit-card" class="block mr-1 h-8" />
                    <span class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">Direct Payment</span>
                </Tab> -->
            </TabList>

            <TabPanels class="mt-0 lg:mt-5 2xl:mt-5 px-2 lg:px-10 2xl:px-10">

                <!-- <TabPanel 
                    class="leading-relaxed"
                    v-for="(payment, index) in activatePayment"
                    :key="index"
                >
                    <TabContent :paymentName="payment"/>
                </TabPanel> -->

                <!-- <TabPanel 
                    v-show="activatePayment.includes('direct_payment')"
                    class="leading-relaxed"
                >
                    <TabContent :paymentName="'direct_payment'"/>
                </TabPanel>
                <TabPanel 
                    v-show="activatePayment.includes('stripe')"
                    class="leading-relaxed"
                >
                    <TabContent :paymentName="'stripe'"/>
                </TabPanel> -->
                
            </TabPanels>
        </TabGroup>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import TabContent from '@/views/settings/PaymentTabContent.vue';


const paymentStore = useLSSPaymentMetaStore()
const sellerStore = useLSSSellerLayoutStore()
const activatePayment = ref(['direct_payment', 'stripe'])

onMounted(() => {
    // const activated_country = sellerStore.userInfo.user_subscription.meta_country.activated_country[0]
    // activatePayment.value = paymentStore[activated_country]
    
    
    console.log(activatePayment.value)
})

</script>