<template>
  <div>
    <!-- <DarkModeSwitcher /> -->
    <!-- <MainColorSwitcher /> -->
    <ThemeModeSwitcher />
    <LSSSellerMobileMenu />
    <LSSSellerTopBar />

    <Notification refKey="sellerMessageNotification" :options="{duration: 3000,}" class="flex text-green-600 sm:flex-row">
      <CheckCircleIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <Notification refKey="sellerMessageAlert" :options="{duration: 3000,}" class="flex text-red-600 sm:flex-row">
      <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

<!-- store.campaignAlert.buttonToast("Message1","Message2 with Function","Message3",Function) -->
    <Notification refKey="sellerCampaignAlert">
      <div  class="flex pl-5 border-l-4 border-primary">
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
                <a id="rightBTN" class="text-primary dark:text-slate-400" data-dismiss="notification">Message3</a>
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
<!-- <button class="text-lg w-30 h-14" @click="toast">Here</button> -->
  
  </div>
</template>

<script setup>
import LSSSellerTopBar from "@/components/lss-seller-top-bar/Main.vue";
import LSSSellerMobileMenu from "@/components/lss-seller-mobile-menu/Main.vue";
import LSSSellerMenu from "@/components/lss-seller-menu/Main.vue";
import ThemeModeSwitcher from "@/components/theme-mode-switcher/Main.vue";
import { useCookies } from "vue3-cookies";
import { provide, onMounted,ref, computed,watch } from "vue"
import { useRouter ,useRoute} from "vue-router";

import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
const route = useRoute();
const router = useRouter();
const store = useLSSSellerLayoutStore();
const { cookies } = useCookies()
const accessToken = cookies.get('access_token')

const checkCampaignTime = (data) =>{
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
  router.push({ name: 'campaigns', query: { type: 'startCampaign' }})
}
const toast = () =>{
  // store.floatingVideo.videoToast("Faceebook video streaming!!")
  store.campaignAlert.buttonToast("I have an upcoming Campaign in 1 hour","Join now!!","Remind me Later",forPath)
}

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

watch(computed(()=>route.path),
()=>{
  const element = document.getElementsByClassName('modal')
  for (let i=0; i<element.length; i++){
    if(element[i])element[i].remove()
  }
  console.log(document.getElementsByClassName('modal'))
  // const dropdownElement = document.getElementsByClassName('dropdown-menu')[0]
  // if(dropdownElement)dropdownElement.style.visibility = 'hidden'
  ,{deep:true}}
) 

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
.Notification{
  border-left: solid 5px black !important;
}
</style>