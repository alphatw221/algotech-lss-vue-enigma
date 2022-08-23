<template>
  <div>
    <!-- <DarkModeSwitcher /> -->
    <!-- <MainColorSwitcher /> -->
    <ThemeModeSwitcher />
    <LSSSellerMobileMenu />
    <LSSSellerTopBar/>

    <Notification refKey="sellerMessageNotification" :options="{duration: 3000,}" class="flex text-green-600 sm:flex-row">
      <CheckCircleIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <Notification refKey="sellerMessageAlert" :options="{duration: 5000,}" class="flex text-red-600 sm:flex-row">
      <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <Notification refKey="sellerApiErrorAlert" class="flex text-red-600 sm:flex-row">
      
      <div class="flex">
        <div class="relative top-2 w-12">
          <AlertOctagonIcon class="w-10 h-10" />
        </div>
        <div class="ml-1 mr-1">
            <!-- temp: translate language and pass in -->
            <div id="message" class="mt-1 text-slate-500">
                Message1
            </div>
            <div class="flex justify-between mt-2 font-medium">
                <button id="leftBTN" class="mr-3 text-primary text-red-500 dark:text-slate-400 font-medium" data-dismiss="function">Message2 and Function</button>
                <a id="rightBTN" class="text-primary dark:text-slate-400 text-blue-500" data-dismiss="notification">Message3</a>
            </div>
        </div>
      </div>
    </Notification>
<!-- store.campaignAlert.buttonToast("Message1","Message2 with Function","Message3",Function) -->
    <Notification refKey="sellerCampaignAlert" borderColor="notifyCamp" >
      <div  class="flex notifyCamp">
        <div class="relative px-3 top-5 w-12">
          <font-awesome-icon icon="fa-regular fa-bell" class="w-6 h-6 border-[2px] p-0.5 border-slate-500 rounded-full absolute"/>
        </div>
        <div class="ml-1 mr-1">
            <!-- <div class="font-medium">{{$t('layout.upcoming_campaign.title')}}!!</div> -->
            <div class="font-medium">Title:</div>
            <!-- temp: translate language and pass in -->
            <div id="message" class="mt-1 text-slate-500">
                Message1
            </div>
            <div class="flex justify-between mt-2 font-medium">
                <button id="leftBTN" class="mr-3 text-primary text-red-500 dark:text-slate-400 font-medium" data-dismiss="function">Message2 and Function</button>
                <a id="rightBTN" class="text-primary dark:text-slate-400 text-blue-500" data-dismiss="notification">Message3</a>
            </div>
        </div>
      </div>
    </Notification>
    <!-- <Notification refKey="floatingVideoToast" class="flex flex-col">
        <div class="ml-4 mr-4">
            <div class="font-medium">Video Streaming...</div>
            <div class="mt-1 text-slate-500">
                <video class="w-[450px]" controls>
                  <source src="movie.mp4" type="video/mp4"> npm can't build with this line
                  <source src="" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
            </div>
            <span id="message"> Message</span>
        </div>
    </Notification> -->
<!-- END: Notification Content  -->
<!-- BEGIN: Notification Toggle -->
      <LSSSellerMenu /> 
<!-- <button class="text-lg w-30 h-14" @click="toast">Test campaign schedule</button> -->
  <ChevronUpIcon class="h-10 w-10 fixed text-white bottom-2 bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50 md:hidden" @click="toTop()"/>
  </div>
</template>

<script setup>
import LSSSellerTopBar from "@/components/lss-seller-top-bar/Main.vue";
import LSSSellerMobileMenu from "@/components/lss-seller-mobile-menu/Main.vue";
import LSSSellerMenu from "@/components/lss-seller-menu/Main.vue";
import ThemeModeSwitcher from "@/components/theme-mode-switcher/Main.vue";
import { useCookies } from "vue3-cookies";
import { provide, onMounted,ref, computed, watch, getCurrentInstance } from "vue"
import { useRouter ,useRoute} from "vue-router";

import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import i18n from "@/locales/i18n"

const route = useRoute();
const router = useRouter();
const store = useLSSSellerLayoutStore();
const { cookies } = useCookies()
const accessToken = cookies.get('access_token')
const app_i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
const campaign_id = ref('')

const checkCampaignTime = (message) =>{
  if(message.remind_time === '15 mins'){ 
    store.campaignAlert.buttonToast(`${i18n.global.t('layout.upcoming_campaign.notification_text1')} ${message.title} ${i18n.global.t('layout.upcoming_campaign.notification_text2')} ${i18n.global.t('layout.upcoming_campaign.time_15min')}${i18n.global.t('layout.upcoming_campaign.notification_text3')}`,`${i18n.global.t('layout.upcoming_campaign.join_now')}!!`,`${i18n.global.t('layout.upcoming_campaign.dismiss')}`,forPath)
  } else { 
    store.campaignAlert.buttonToast(`${i18n.global.t('layout.upcoming_campaign.notification_text1')} ${message.title} ${i18n.global.t('layout.upcoming_campaign.notification_text2')} ${i18n.global.t('layout.upcoming_campaign.time_1hour')}${i18n.global.t('layout.upcoming_campaign.notification_text3')}`,`${i18n.global.t('layout.upcoming_campaign.join_now')}!!`,`${i18n.global.t('layout.upcoming_campaign.dismiss')}`,forPath)
  }
}

const forPath = () =>{
  router.push({ name: 'campaign-list', query: { type: 'startCampaign', campaign: campaign_id.value }})
}
const toast = () =>{
  // store.floatingVideo.videoToast("Faceebook video streaming!!")
  store.campaignAlert.buttonToast("I have a upcoming Campaign in 1 hour","Join now!!","Remind me Later",forPath)
}

const initWebSocketConnection =()=> {
  const websocket = new WebSocket(
      `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/login/?token=${accessToken}`
  );
  websocket.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.type === "notification_message") {
        campaign_id.value = data.data.message.id
        checkCampaignTime(data.data.message)
      }
      setTimeout(() => {}, 2000);
  };
  websocket.onopen = e => {
      console.log('connected')
  };
  websocket.onclose = e => {
      if(e.code!=1000){
            initWebSocketConnection()
        }
        console.error('Chat socket closed unexpectedly');
  };
  websocket.onerror = function(err) {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
      websocket.close(1000);
  };
}



const setLanguage = ()=>{
  if(store.userInfo.user_subscription){
    console.log('setlang')
    app_i18n.locale=store.userInfo.lang
    // i18n.global.locale = store.userInfo.user_subscription.lang

  }
}

watch(
  computed(()=>store.userInfo),
  ()=>{setLanguage()}
  ,{deep:true}
)
  
onMounted(() => {
  setLanguage();
  initWebSocketConnection();
})

const toTop=()=>{
  document.getElementById('topPoint').scrollIntoView({behavior: "smooth"});
}



// watch(computed(()=>route.path),
// ()=>{
//   const element = document.getElementsByClassName('modal')
//   for (let i=0; i<element.length; i++){
//     if(element[i])element[i].remove()
//   }
//   console.log(document.getElementsByClassName('modal'))
//   // const dropdownElement = document.getElementsByClassName('dropdown-menu')[0]
//   // if(dropdownElement)dropdownElement.style.visibility = 'hidden'
//   ,{deep:true}}
// ) 

provide("bind[sellerMessageNotification]", (el) => {
  store.notification = el;
  // el.showMessageToast('test notification')
});
provide("bind[sellerMessageAlert]", (el) => {
  store.alert = el;
  // el.showMessageToast('test alert')
});
provide("bind[sellerApiErrorAlert]", (el) => {
  store.apiErrorAlert = el;

  // el.showMessageToast('test alert')
});
provide("bind[sellerCampaignAlert]", (el) => {
  store.campaignAlert = el;

  // el.showMessageToast('test alert')
});
provide("bind[floatingVideoToast]", (el) => {
  store.floatingVideo = el;

  // el.showMessageToast('test alert')
});
</script>
