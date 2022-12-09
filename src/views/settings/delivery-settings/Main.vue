<template>
    <div class="p-2 2xl:p-10">
        <TabGroup v-if="logisticReady">
            <TabList class="flex flex-wrap items-center justify-end gap-1 sm:gap-3 nav-boxed-tabs sm:px-10">
                <Tab
                    class="h-20 mx-auto border-[#131c34] w-[100%] max-w-[180px] text-center" 
                    tag="button"
                    v-for="logistic,index in logistics" :key="index"
                >   
                    <div v-if="logistic.name === 'Own Delivery'" class="inline-flex items-center my-auto grow w-full">
                        <font-awesome-icon icon="fa-solid fa-money-check-dollar" class="hidden sm:block h-6 mr-1"/>
                        <span class="w-[75px] text-sm lg:text-lg lg:w-32 mx-auto">{{ $t(`settings.delivery_form.delivery_titles.${logistic.key}`) }}</span>
                    </div>
                    <div v-else class="inline-flex items-center my-auto grow w-full mx-auto">
                        <font-awesome-icon icon="fa-regular fa-credit-card" class="hidden sm:block h-6 mr-1" />
                        <span class="w-[75px] text-sm lg:text-lg lg:w-32 mx-auto">{{ $t(`settings.delivery_form.delivery_titles.${logistic.key}`) }}</span>
                    </div>
                </Tab>
            </TabList>
            <div class="mt-0 lg:mt-5 lg:px-10 lg:mx-10">  
                <TabPanels>
                    <TabPanel class="leading-relaxed" v-for="logistic, index in logistics" :key="index">

                            <OwnDelivery :logistic ="logistic" v-if="logistic.key=='own_delivery'"/>

                            <StorePickup :logistic ="logistic" v-else-if="logistic.key=='store_pickup'"/>

                            <DeliveryMethod :logistic="logistic" v-else /> 
                        
                            <!-- <PaymentMethod :payment="payment" v-else/> -->

                    </TabPanel>  
                </TabPanels>
            </div>
        </TabGroup>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useLSSLogisticMetaStore } from '@/stores/lss-logistic-meta';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

import OwnDelivery from './OwnDelivery.vue'
import StorePickup from './StorePickup.vue'
import DeliveryMethod from './DeliveryMethod.vue'

const logisticStore = useLSSLogisticMetaStore()
const sellerStore = useLSSSellerLayoutStore()
const logistics = ref([])
const logisticReady = ref(false)
onMounted(() => {
    if(!sellerStore.userInfo.user_subscription)return
    const meta_country = sellerStore.userInfo.user_subscription.meta_country
    const logisticKeySet = new Set()
    meta_country.activated_country.forEach( country => { logisticStore[country].forEach( key => logisticKeySet.add(key) ) } )
    logisticKeySet.forEach(key => {
        logistics.value.push(logisticStore[key])
    });
    logisticReady.value=true
    console.log(logistics.value)
})

</script>