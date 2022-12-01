<template>
  <div>
    <ThemeModeSwitcher />
    <LSSBuyerTopBar />
    <!-- <LSSBuyerMobileMenu /> -->
    <Notification refKey="buyerMessageNotification" :options="{duration: 3000,}" class="flex flex-col sm:flex-row">
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <Notification refKey="buyerMessageAlert" :options="{duration: 3000,}" class="flex flex-col sm:flex-row text-red-600">
      <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <LSSBuyerLoginModal/>

    <div class="flex overflow-hidden">
      
      <!-- <LSSBuyerMenu /> -->
      <!-- BEGIN: Content -->
      <div class="lss-content">
        <router-view />

        <div class="relative mt-2 z-30 bottom-0 w-full"> 
          <div class="flex justify-between font-medium flex-wrap mx-5 sm:mx-10 text-[12px] sm:text-[16px] bg-transparent"> 
              <span>
                      © {{new Date().getFullYear()}} Algotech Pte Ltd. All rights reserved
              </span>
              <div class="flex flex-row gap-3 ml-auto"> 
                  <a href="https://liveshowseller.com/" target="_blank">  {{$t("global.footer.home")}}  </a>

                  <a href="https://liveshowseller.com/terms-of-service/" target="_blank">  {{$t("global.footer.terms")}} </a>

                  <a href="https://liveshowseller.com/privacy-policy/" target="_blank"> {{$t("global.footer.private_policy")}} </a>
              </div> 
          </div> 
        </div>
      </div>
     
      <!-- END: Content -->
    </div>
  </div>
</template>

<script setup>
import ThemeModeSwitcher from "@/components/theme-mode-switcher/Main.vue"
import LSSBuyerTopBar from "@/components/lss-buyer-top-bar/Main.vue";
// import LSSBuyerMobileMenu from "@/components/lss-buyer-mobile-menu2/Main.vue";
// import LSSBuyerMenu from "@/components/lss-buyer-menu/Main.vue";
import LSSBuyerLoginModal from "@/components/lss-buyer-login-modal/Main.vue";
import { provide } from "vue"

import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies()

const isAnonymousUser = cookies.get('login_with')=='anonymousUser'
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

<style scoped>

.lss-content{
  padding-right: 5%;
  padding-left: 5%;
  min-height: 100vh;
}

@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {
  .lss-content{
  overflow: hidden;
  min-height: 90vh;
}
}
</style>