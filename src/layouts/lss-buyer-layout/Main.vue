<template>
  <div>
    <ThemeModeSwitcher />
    <LSSBuyerTopBar />
    <LSSBuyerMobileMenu />
    <Notification refKey="buyerMessageNotification" :options="{duration: 3000,}" class="flex flex-col sm:flex-row">
      <div class="font-medium">Message</div>
    </Notification>
    <div class="flex overflow-hidden">
      
      <LSSBuyerMenu />
      <!-- BEGIN: Content -->
      <div class="lss-content">
        <router-view />
      </div>
      <!-- END: Content -->
    </div>
  </div>
</template>

<script setup>
import ThemeModeSwitcher from "@/components/theme-mode-switcher/Main.vue"
import LSSBuyerTopBar from "@/components/lss-buyer-top-bar/Main.vue";
import LSSBuyerMobileMenu from "@/components/lss-buyer-mobile-menu2/Main.vue";
import LSSBuyerMenu from "@/components/lss-buyer-menu/Main.vue";

import { provide } from "vue"

import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
const store = useLSSBuyerLayoutStore();

provide("bind[buyerMessageNotification]", (el) => {
  store.notification = el;
});

</script>
