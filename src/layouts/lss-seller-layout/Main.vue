<template>
  <div>
    <!-- <DarkModeSwitcher /> -->
    <!-- <MainColorSwitcher /> -->
    <ThemeModeSwitcher />
    <LSSSellerMobileMenu />
    <LSSSellerTopBar />
    <Notification refKey="sellerMessageNotification" :options="{duration: 3000,}" class="flex flex-col sm:flex-row text-green-600">
      <ThumbsUpIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <Notification refKey="sellerMessageAlert" :options="{duration: 3000,}" class="flex flex-col sm:flex-row text-red-600">
      <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <LSSSellerMenu /> 
  </div>
</template>

<script setup>
import LSSSellerTopBar from "@/components/lss-seller-top-bar/Main.vue";
import LSSSellerMobileMenu from "@/components/lss-seller-mobile-menu/Main.vue";
import LSSSellerMenu from "@/components/lss-seller-menu/Main.vue";
import ThemeModeSwitcher from "@/components/theme-mode-switcher/Main.vue";

import { provide } from "vue"

import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
const store = useLSSSellerLayoutStore();

provide("bind[sellerMessageNotification]", (el) => {
  store.notification = el;

  // el.showMessageToast('test notification')
});
provide("bind[sellerMessageAlert]", (el) => {
  store.alert = el;

  // el.showMessageToast('test alert')
});

</script>
