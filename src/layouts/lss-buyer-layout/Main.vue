<template>
  <div>
    <ThemeModeSwitcher />
    <LSSBuyerTopBar />
    <LSSBuyerMobileMenu />
    <Notification refKey="buyerMessageNotification" :options="{duration: 3000,}" class="flex flex-col sm:flex-row">
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <Notification refKey="buyerMessageAlert" :options="{duration: 3000,}" class="flex flex-col sm:flex-row text-red-600">
      <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <LSSBuyerLoginModal/>


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
import LSSBuyerLoginModal from "@/components/lss-buyer-login-modal/Main.vue";
import { provide } from "vue"

import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
const store = useLSSBuyerLayoutStore();

provide("bind[buyerMessageNotification]", (el) => {
  store.notification = el;

  // el.showMessageToast('test notification')
});
provide("bind[buyerMessageAlert]", (el) => {
  store.alert = el;

  // el.showMessageToast('test alert')
});

</script>
