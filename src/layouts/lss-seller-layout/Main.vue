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

    <Notification refKey="sellerMessageAlert" :options="{duration: 3000,}" class="flex text-red-600 sm:flex-row">
      <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

<!-- store.campaignAlert.buttonToast("Message1","Message2 with Function","Message3",Function) -->
      <Notification refKey="sellerCampaignAlert" class="notifyCamp-test">
      <div  class="flex pl-5">
        <div class="border-[1px] border-primary w-8 h-8 rounded-full relative top-5">
          <font-awesome-icon icon="fa-regular fa-bell" class="h-6 absolute top-0.5 left-1"/>
        </div>
        <div class="ml-4 mr-4">
            <div class="font-medium">Upcoming Campaign!!</div>
            <div id="message" class="mt-1 text-slate-500">
                Message1
            </div>
            <div class="flex justify-between mt-2 font-medium">
                <button id="leftBTN" class="mr-3 text-primary dark:text-slate-400" data-dismiss="function">Message2 and Function</button>
                <a id="rightBTN" class="text-primary dark:text-slate-400 underline " data-dismiss="notification">Message3</a>
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
<button class="text-lg w-30 h-14" @click="toast">Here</button>
<ChevronUpIcon class="h-10 w-10 fixed bottom-2 right-[5%] z-50" @click="toTop()"/>
  
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

const route = useRoute();
const router = useRouter();
const store = useLSSSellerLayoutStore();
const { cookies } = useCookies()
const accessToken = cookies.get('access_token')
const i18n = getCurrentInstance().appContext.config.globalProperties.$i18n

const checkCampaignTime = (message) =>{
  store.campaignAlert.buttonToast(`You have a upcoming Campaign: ${message.title} starts in ${message.remind_time}`,"Join now!!","Remind me Later",forPath)
}

const forPath = () =>{
  router.push({ name: 'campaign-list', query: { type: 'startCampaign' }})
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
        checkCampaignTime(data.data.message)
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
  if(store.userInfo.user_subscription){
    i18n.locale=store.userInfo.user_subscription.lang
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
provide("bind[sellerCampaignAlert]", (el) => {
  store.campaignAlert = el;

  // el.showMessageToast('test alert')
});
provide("bind[floatingVideoToast]", (el) => {
  store.floatingVideo = el;

  // el.showMessageToast('test alert')
});
</script>


<style scoped>

/* .notifyCamp {
  border-left: 10px solid theme("colors.primary");
} */

.notifyCamp-test {
  border-left: 10px solid theme("colors.primary") !important;
}
/* .toastify */
</style>

