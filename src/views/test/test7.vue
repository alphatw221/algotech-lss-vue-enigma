<template>
 <TabGroup>
            <TabList class="nav-boxed-tabs flex flex-wrap content-around justify-around items-stretch self-auto ">

                <Tab
                    class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1" 
                    tag="button"
                    v-for="payment,index in [1,2,3]" :key="index"
                >
                    <font-awesome-icon icon="fa-regular fa-credit-card" class="block mr-1 h-8" />
                    <span class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">{{payment}}</span>
                </Tab>
            </TabList>

            <TabPanels class="mt-0 lg:mt-5 2xl:mt-5 px-2 lg:px-10 2xl:px-10">
                <TabPanel class="leading-relaxed"  v-for="payment,index in [1,2,3]" :key="index">
                        <div>{{payment}}</div>

                </TabPanel>  

            </TabPanels>
        </TabGroup>
</template>

<script setup>
// import { onMounted, ref } from 'vue';
// import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
// import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
// import TabContent from '@/views/settings/PaymentTabContent.vue';


// const paymentStore = useLSSPaymentMetaStore()
// const sellerStore = useLSSSellerLayoutStore()
// const activatePayment = ref(['direct_payment', 'stripe'])

// onMounted(() => {
//     // const activated_country = sellerStore.userInfo.user_subscription.meta_country.activated_country[0]
//     // activatePayment.value = paymentStore[activated_country]
    
    
//     console.log(activatePayment.value)
// })

</script>