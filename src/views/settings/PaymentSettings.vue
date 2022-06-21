<template>
    <div class="box p-2 2xl:p-10">
        <TabGroup>
            <TabList class="nav-boxed-tabs flex flex-wrap content-around justify-around items-stretch self-auto ">
                <Tab
                    v-show="activePayment.includes('directPayment')"
                    class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1" 
                    tag="button"
                >
                    <CreditCardIcon class="block mr-1" />
                    <span class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">Direct Payment</span>
                </Tab>
                <Tab 
                    v-show="activePayment.includes('paypal')"
                    class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1" 
                    tag="button"
                >
                    <TruckIcon class="block mr-1" />
                    <span class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">PayPal</span>
                </Tab>
                <Tab 
                    v-show="activePayment.includes('hitpay')"
                    class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1" 
                    tag="button"
                >
                    <TruckIcon class="block mr-1" />
                    <span class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">HitPay</span>
                </Tab>
                <Tab 
                    v-show="activePayment.includes('stripe')"
                    class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1" 
                    tag="button"
                >
                    <font-awesome-icon icon="fa-brands fa-cc-stripe" class="block mr-1 h-8" />
                    <span class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">Stripe</span>
                </Tab>
                <Tab    
                    v-show="activePayment.includes('firstData')"
                    class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1" 
                    tag="button"
                >
                    <TruckIcon class="block mr-1" /><span class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">First Data IPG</span>
                </Tab>
            </TabList>
            <TabPanels class="mt-0 lg:mt-5 2xl:mt-5 px-2 lg:px-10 2xl:px-10">
                <TabPanel 
                    v-show="activePayment.includes('directPayment')"
                    class="leading-relaxed"
                >
                    <TabContent :paymentName="'directPayment'"/>
                </TabPanel>
                <TabPanel 
                    v-show="activePayment.includes('paypal')"
                    class="leading-relaxed"
                >
                    <div class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5">
                        <input @click="toggle" class="form-check-input mr-5 col-start-1" type="checkbox" />
                        <label for="regular-form-2" class="form-label col-start-2 col-span-10">Set As Default Active</label>
                        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Name of Bank</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9 " />
                        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account Name</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9" />
                        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account No.</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9" />
                    </div>
                </TabPanel>
                <TabPanel 
                    v-show="activePayment.includes('hitpay')"
                    class="leading-relaxed"
                >
                    <div
                        class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5">
                        <input @click="toggle" class="form-check-input mr-5 col-start-1" type="checkbox" />
                        <label for="regular-form-2" class="form-label col-start-2 col-span-10">Set As Default Active</label>
                        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Payment Button Title</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9 " />
                        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account Name</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9" />
                        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account No.</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9" />
                    </div>
                </TabPanel>
                <TabPanel 
                    v-show="activePayment.includes('stripe')"
                    class="leading-relaxed"
                >
                    <TabContent :paymentName="'stripe'"/>
                </TabPanel>
                <TabPanel
                    v-show="activePayment.includes('firstData')"
                    class="leading-relaxed"
                >
                    <div class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5">
                        <input @click="toggle" class="form-check-input mr-5 col-start-1" type="checkbox" />
                        <label for="regular-form-2" class="form-label col-start-2 col-span-10">Set As Default Active</label>
                        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Store ID</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9 " />
                        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Share Secret</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9" />
                        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Currency Code</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9" />
                        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Time Zone</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9" />
                    </div>
                </TabPanel>
            </TabPanels>
            <div class="col-span-12 m-10 p-5">
                <div class="text-md font-medium m-2">
                    Delivery and Collect Note
                </div>
                <p id="" class="form-control p-5" placeholder="">
                    Delivery will be shipped after Dragon Boat Festval sorry
                    for the inconvenience we caused.
                </p>
            </div>
            <div class="col-span-12 m-10 p-5">
                <div class="text-md font-medium m-2">Remark</div>
                <textarea id="" class="form-control indent-4"
                    placeholder="">Remark remark remark remark</textarea>
            </div>
        </TabGroup>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import TabContent from './PaymentTabContent.vue';

const paymentStore = useLSSPaymentMetaStore()
const sellerStore = useLSSSellerLayoutStore()
const activePayment = ref([])


onMounted(() => {
    const activated_country = sellerStore.userInfo.user_subscription.meta_country.activated_country[0]
    activePayment.value = paymentStore[activated_country]
})

</script>