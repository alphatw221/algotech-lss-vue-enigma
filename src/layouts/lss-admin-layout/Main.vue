<template>
  <div>
    <LSSAdminTopBar />

    <Notification refKey="adminMessageNotification" :options="{duration: 3000,}" class="flex flex-col sm:flex-row">
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <Notification refKey="adminMessageAlert" :options="{duration: 3000,}" class="flex flex-col sm:flex-row text-red-600">
      <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <div class="flex overflow-hidden">
      
      <LSSAdminMenu />
      <!-- BEGIN: Content -->
      <div class="lss-content">
        <router-view />
      </div>
      
      <div class="z-30 w-full"> 
        123
        <!-- <div class="flex justify-between font-medium flex-wrap mx-5 sm:mx-10 text-[12px] sm:text-[16px] bg-transparent"> 
            <span>
                    © {{new Date().getFullYear()}} Algotech Pte Ltd. All rights reserved
            </span>
            <div class="flex flex-row gap-3 ml-auto"> 
                <a href="https://liveshowseller.com/" target="_blank">  {{$t("global.footer.home")}}  </a>

                <a href="https://liveshowseller.com/terms-of-service/" target="_blank">  {{$t("global.footer.terms")}} </a>

                <a href="https://liveshowseller.com/privacy-policy/" target="_blank"> {{$t("global.footer.private_policy")}} </a>
            </div> 
        </div>  -->
      </div>

      <!-- END: Content -->
    </div>
  </div>
</template>

<script setup>

import LSSAdminTopBar from "@/components/lss-admin-top-bar/Main.vue";
import LSSAdminMenu from "@/components/lss-admin-menu/Main.vue";

import { provide } from "vue"

import { useLSSAdminLayoutStore } from "@/stores/lss-admin-layout"
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies()

const layoutStore = useLSSAdminLayoutStore();

provide("bind[adminMessageNotification]", (el) => {
  layoutStore.notification = el;

  // el.showMessageToast('test notification')
});
provide("bind[adminMessageAlert]", (el) => {
  layoutStore.alert = el;

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
}
}
</style>