<template>
    <TabGroup>
        <TabList class="nav-link-tabs w-96 intro-y flex items-center mt-8">
            <Tab class="w-36 lg:w-48 2xl:w-48 py-2 text-lg font-medium m-0" tag="button">Profile</Tab>
            <Tab class="w-36 lg:w-48 2xl:w-48 py-2 text-lg font-medium" tag="button">Subscription</Tab>
        </TabList>
        <TabPanels>
            <TabPanel class="leading-relaxed">
                <ProfileTab />
            </TabPanel>
            <TabPanel class="box leading-relaxed">
                <SubscriptionTab />
            </TabPanel>
        </TabPanels>
    </TabGroup>
</template>

<script setup>
import ProfileTab from './ProfileTab.vue';
import SubscriptionTab from './SubscriptionTab.vue';

</script>