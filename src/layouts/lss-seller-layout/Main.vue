<template>
  <div>
    <!-- <DarkModeSwitcher /> -->
    <!-- <MainColorSwitcher /> -->
    <ThemeModeSwitcher />
    <LSSSellerMobileMenu />
    <LSSSellerTopBar />

    <Notification refKey="sellerMessageNotification" :options="{duration: 3000,}" class="flex flex-col sm:flex-row text-green-600">
      <CheckCircleIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <Notification refKey="sellerMessageAlert" :options="{duration: 3000,}" class="flex flex-col sm:flex-row text-red-600">
      <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <Notification refKey="sellerCampaignAlert" class="flex">
        <AlertCircleIcon />
        <div class="ml-4 mr-4">
            <div class="font-medium">Upcoming Campaign!!</div>
            <div id="message" class="text-slate-500 mt-1">
                Message
            </div>
            <div class="font-medium flex mt-2">
                <button id="leftBTN" class="text-primary dark:text-slate-400 mr-3" data-dismiss="function">Message</button>
                <a id="rightBTN" class="text-primary dark:text-slate-400" data-dismiss="notification">Message</a>
            </div>
        </div>
    </Notification>
<!-- END: Notification Content  -->
<!-- BEGIN: Notification Toggle -->
    <LSSSellerMenu /> 
<!-- <button class="text-lg w-30 h-14" @click="toast">Here</button> -->
  
  </div>
</template>

<script setup>
import LSSSellerTopBar from "@/components/lss-seller-top-bar/Main.vue";
import LSSSellerMobileMenu from "@/components/lss-seller-mobile-menu/Main.vue";
import LSSSellerMenu from "@/components/lss-seller-menu/Main.vue";
import ThemeModeSwitcher from "@/components/theme-mode-switcher/Main.vue";
import { useCookies } from "vue3-cookies";
import { provide, watch, onMounted,ref } from "vue"
import { useRouter } from "vue-router";

import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const router = useRouter();
const store = useLSSSellerLayoutStore();
const { cookies } = useCookies()
const accessToken = cookies.get('access_token')

const checkCampaignTime = (data) =>{
  console.log('Run')
  for (let i =0; i < data.data.length; i++){
    if(data.data[i].campaignTime === true){
      store.campaignAlert.buttonToast("You have a upcoming Campaign starts in an hour","Join now!!","Remind me Later",forPath)
    }
    else{
      console.log(data.data[i].campaignTime)
    }
  } 
}

const forPath = () =>{
  router.push({ path: '/seller/campaign-list', query: { type: 'startCampaign' }})
}
// const toast = () =>{
//   store.campaignAlert.buttonToast("You have a upcoming Campaign starts in an hour","Join now!!","Remind me Later",fun)
// }

const websocketInit =()=> {
  const campaignSocket = new WebSocket(
      `wss://gipassl.algotech.app/ws/login/?token=${accessToken}`
  );
  campaignSocket.onmessage = e => {
      const data = JSON.parse(e.data);
      checkCampaignTime(data)
  };
  campaignSocket.onopen = e => {
      console.log('connected')
  };
  campaignSocket.onclose = e => {
      console.error('Campaign socket closed unexpectedly');
      websocketInit()
  };
  campaignSocket.onerror = function(err) {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
      campaignSocket.close();
  };
}

onMounted(() => {
  websocketInit()
 })


provide("bind[sellerMessageNotification]", (el) => {
  store.notification = el;

  // el.showMessageToast('test notification')
});
provide("bind[sellerMessageAlert]", (el) => {
  store.alert = el;
  // el.showMessageToast('test alert')
});

provide("bind[sellerCampaignAlert]", (el) => {
  store.campaignAlert = el;

  // el.showMessageToast('test alert')
});
</script>
