<template>
<div class="mt-8 sm:p-3 lg:m-8">
    <TabGroup :selectedIndex="sellerLayoutStore.profileTab">
        <TabList class="flex items-center nav-link-tabs w-96 intro-y" >
            <Tab class="w-36 lg:w-48 2xl:w-48 py-2 text-lg font-[16px] m-0" tag="button">Profile</Tab>
            <Tab class="w-36 lg:w-48 2xl:w-48 py-2 text-lg font-[16px]" tag="button">Subscription</Tab>
        </TabList>
        <TabPanels>
            <TabPanel class="leading-relaxed">
                <ProfileTab />
            </TabPanel>
            <TabPanel class="leading-relaxed">
                <SubscriptionTab />
            </TabPanel>
        </TabPanels>
    </TabGroup>
</div>
</template>

<script setup>
import ProfileTab from './ProfileTab.vue';
import SubscriptionTab from './SubscriptionTab.vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const sellerLayoutStore = useLSSSellerLayoutStore()


</script>