<template>
  <div>
    <ThemeModeSwitcher />
    <LSSDealerMobileMenu />
    <LSSDealerTopBar/>

    <Notification refKey="dealerMessageNotification" :options="{duration: 3000,}" class="flex text-green-600 sm:flex-row">
      <CheckCircleIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>

    <Notification refKey="dealerMessageAlert" :options="{duration: 5000,}" class="flex text-red-600 sm:flex-row">
      <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
      <div id="message" class="font-medium">Message</div>
    </Notification>
    
<!-- BEGIN: Notification Toggle -->
      <LSSDealerMenu /> 
<!-- <button class="text-lg w-30 h-14" @click="toast">Test campaign schedule</button> -->
  <ChevronUpIcon class="h-10 w-10 fixed text-white bottom-2 bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50 md:hidden" @click="toTop()"/>
  </div>
</template>

<script setup>
import LSSDealerTopBar from "@/components/lss-dealer-top-bar/Main.vue";
import LSSDealerMobileMenu from "@/components/lss-dealer-mobile-menu/Main.vue";
import LSSDealerMenu from "@/components/lss-dealer-menu/Main.vue";
import ThemeModeSwitcher from "@/components/theme-mode-switcher/Main.vue";
import { useCookies } from "vue3-cookies";
import { provide, onMounted,ref, computed, watch, getCurrentInstance } from "vue"
import { useRouter ,useRoute} from "vue-router";

import { useLSSDealerLayoutStore } from "@/stores/lss-dealer-layout"
import i18n from "@/locales/i18n"

const route = useRoute();
const router = useRouter();
const store = useLSSDealerLayoutStore();
const { cookies } = useCookies()
const accessToken = cookies.get('access_token')
const app_i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
const campaign_id = ref('')

const setLanguage = ()=>{
  if(store.userInfo.user_subscription){
    console.log('setlang')
    app_i18n.locale=store.userInfo.lang

  }
}

watch(
  computed(()=>store.userInfo),
  ()=>{setLanguage()}
  ,{deep:true}
)
  
onMounted(() => {
  setLanguage();
})

const toTop=()=>{
  document.getElementById('topPoint').scrollIntoView({behavior: "smooth"});
}

provide("bind[dealerMessageNotification]", (el) => {
  store.notification = el;
  // el.showMessageToast('test notification')
});
provide("bind[dealerMessageAlert]", (el) => {
  store.alert = el;
  // el.showMessageToast('test alert')
});
</script>
