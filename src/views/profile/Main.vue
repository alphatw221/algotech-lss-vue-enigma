<template>
<div class="box sm:p-3 lg:m-8">
    <TabGroup :selectedIndex="sellerLayoutStore.profileTab">
        <TabList class="flex flex-wrap items-center nav-link-tabs w-auto intro-y tab_bar" >
            <Tab class="w-36 lg:w-48 2xl:w-48 py-2 text-lg font-[16px] m-0" tag="button">Profile</Tab>
            <Tab class="w-36 lg:w-48 2xl:w-48 py-2 text-lg font-[16px]" tag="button">Subscription</Tab>
            <!-- <Tab class="w-36 lg:w-48 2xl:w-48 py-2 text-lg font-[16px]" tag="button">Reset Password</Tab> -->
        </TabList>
        <TabPanels>
            <TabPanel class="leading-relaxed">
                <ProfileTab />
            </TabPanel>
            <TabPanel class="leading-relaxed">
                <SubscriptionTab />
            </TabPanel>
            <!-- <TabPanel class="leading-relaxed">
                <ResetPasswordTab />
            </TabPanel> -->
        </TabPanels>
    </TabGroup>
</div>
</template>

<script setup>
import ProfileTab from './ProfileTab.vue';
import SubscriptionTab from './SubscriptionTab.vue';
import ResetPasswordTab from './ResetPassword.vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const sellerLayoutStore = useLSSSellerLayoutStore()


</script>

<style scoped>
@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 768px) {

    .tab_bar {
        margin-top: 40px;
    }

}

</style>
