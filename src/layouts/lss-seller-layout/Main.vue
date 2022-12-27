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

    <Notification refKey="sellerApiErrorAlert" :options="{duration: 5000,}" class="flex text-red-600 sm:flex-row">
      
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
<!-- sellerLayoutStore.campaignAlert.buttonToast("Message1","Message2 with Function","Message3",Function) -->
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
      <LSSSellerMenu /> 
<!-- <button class="text-lg w-30 h-14" @click="toast">Test campaign schedule</button> -->
  <ChevronUpIcon class="h-10 w-10 fixed text-white bottom-14 bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50 md:hidden" @click="toTop()"/>


  <CommentCaptureWindow />
  </div>
</template>

<script setup>
import LSSSellerTopBar from "@/components/lss-seller-top-bar/Main.vue";
import LSSSellerMobileMenu from "@/components/lss-seller-mobile-menu/Main.vue";
import LSSSellerMenu from "@/components/lss-seller-menu/Main.vue";
import ThemeModeSwitcher from "@/components/theme-mode-switcher/Main.vue";
import CommentCaptureWindow from "@/views/comment-capture-window/Main.vue"
import { useCookies } from "vue3-cookies";
import { provide, onMounted, onBeforeMount, ref, computed, watch, getCurrentInstance } from "vue"
import { useRouter ,useRoute} from "vue-router";
import { unbind_platform_all } from "@/api_v2/user_subscription"

import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import i18n from "@/locales/i18n"

const route = useRoute();
const router = useRouter();
const sellerLayoutStore = useLSSSellerLayoutStore();
const { cookies } = useCookies()
const accessToken = cookies.get('access_token')
const app_i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
const campaign_id = ref('')
const showCaptureWindow = ref(true)
const subscriptionPlatformField = ref({
    "facebook": "facebook_pages",
    "instagram": "instagram_profiles",
    "youtube": "youtube_channels",
    "twitch": "twitch_channels",
    "tiktok": "tiktok_accounts"
})

const checkCampaignTime = (message) =>{
  if(message.remind_time === '15 mins'){ 
    sellerLayoutStore.campaignAlert.buttonToast(`${i18n.global.t('layout.upcoming_campaign.notification_text1')} ${message.title} ${i18n.global.t('layout.upcoming_campaign.notification_text2')} ${i18n.global.t('layout.upcoming_campaign.time_15min')}${i18n.global.t('layout.upcoming_campaign.notification_text3')}`,`${i18n.global.t('layout.upcoming_campaign.join_now')}!!`,`${i18n.global.t('layout.upcoming_campaign.dismiss')}`,forPath)
  } else { 
    sellerLayoutStore.campaignAlert.buttonToast(`${i18n.global.t('layout.upcoming_campaign.notification_text1')} ${message.title} ${i18n.global.t('layout.upcoming_campaign.notification_text2')} ${i18n.global.t('layout.upcoming_campaign.time_1hour')}${i18n.global.t('layout.upcoming_campaign.notification_text3')}`,`${i18n.global.t('layout.upcoming_campaign.join_now')}!!`,`${i18n.global.t('layout.upcoming_campaign.dismiss')}`,forPath)
  }
}

const forPath = () =>{
  router.push({ name: 'campaign-list', query: { type: 'startCampaign', campaign: campaign_id.value }})
}
// const toast = () =>{
//   sellerLayoutStore.campaignAlert.buttonToast("I have a upcoming Campaign in 1 hour","Join now!!","Remind me Later",forPath)
// }

const initWebSocketConnection =()=> {
  const websocket = new WebSocket(
      `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/login/?token=${accessToken}`
  );
  websocket.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.type === "notification_message") {
        campaign_id.value = data.data.message.id
        checkCampaignTime(data.data.message)
        setTimeout(() => {}, 2000);
      }
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
  if(sellerLayoutStore.userInfo.user_subscription){
    app_i18n.locale=sellerLayoutStore.userInfo.lang
    // i18n.global.locale = sellerLayoutStore.userInfo.user_subscription.lang

  }
}

watch(
  computed(()=>sellerLayoutStore.userInfo),
  ()=>{setLanguage()}
  ,{deep:true}
)

const addBindedPlatformToStore = () => {
    let platforms = []
    Object.entries(subscriptionPlatformField.value).forEach(([Key, value]) => {
        if (sellerLayoutStore.userInfo.user_subscription[value].length) {
            platforms.push(Key)
        }
    })
    sellerLayoutStore.bindedPlatform = platforms
}

const removeNotActivatedPlatform = () => {
  const notActivatedPlatform = sellerLayoutStore.bindedPlatform.filter(value => !sellerLayoutStore.userInfo.user_subscription.user_plan?.activated_platform.includes(value))
  console.log(notActivatedPlatform)
  if (notActivatedPlatform.length) {
    unbind_platform_all({"unbind_platforms": notActivatedPlatform}, sellerLayoutStore.alert)
    .then(response=> {
      console.log(response.data)
      sellerLayoutStore.bindedPlatform = sellerLayoutStore.bindedPlatform.filter(value => !response.data.data.includes(value))
    })
  }
}
watch(computed(() => sellerLayoutStore.userInfo.user_subscription), () => {
  // console.log("watch")

  addBindedPlatformToStore()
  removeNotActivatedPlatform()
}, {deep:true})

onBeforeMount(()=>{
    if (!sellerLayoutStore.userInfo.user_subscription.user_plan?.activated_platform) {
      sellerLayoutStore.userInfo.user_subscription.user_plan['activated_platform'] = []
    }
    addBindedPlatformToStore()
    removeNotActivatedPlatform()
})

onMounted(() => {
  setLanguage();
  initWebSocketConnection();
})

const toTop=()=>{
  document.getElementById('topPoint').scrollIntoView({behavior: "smooth"}); 
}

provide("bind[sellerMessageNotification]", (el) => {
  sellerLayoutStore.notification = el;
  // el.showMessageToast('test notification')
});
provide("bind[sellerMessageAlert]", (el) => {
  sellerLayoutStore.alert = el;
  // el.showMessageToast('test alert')
});
provide("bind[sellerApiErrorAlert]", (el) => {
  sellerLayoutStore.apiErrorAlert = el;

  // el.showMessageToast('test alert')
});
provide("bind[sellerCampaignAlert]", (el) => {
  sellerLayoutStore.campaignAlert = el;

  // el.showMessageToast('test alert')
});
provide("bind[floatingVideoToast]", (el) => {
  sellerLayoutStore.floatingVideo = el;

  // el.showMessageToast('test alert')
});
</script>
