<template>
    <Modal :show="show"
        @hidden="hide()">
        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <template v-if="pages.length == 0"> 
              <button 
                class="col-span-12 w-60 h-[35px] text-lg sm:h-[42px] text-white btn btn-rounded mx-auto mt-5"
                      style="border: 2px solid #EF4444; color:#EF4444;"
                      @click="hide(); eventBus.emit('closEnterPostIDModal'); router.push({name:'platform'})"> 
                {{$t('campaign_list.campaign_list_table.connect_platform')}}
              </button>
            </template>
            <template v-for="page,index in pages" :key="index">
              <div class="flex col-start-3 col-span-8 selectPage" @click="selectPage(index)">
                <div class="w-14 h-14 flex-none image-fit rounded-md overflow-hidden">
                  <img alt="" :src="page.image"/>
                </div>
                <div class="mx-auto my-auto">
                  <p class="text-lg">{{ page.name }}</p>
                </div>
              </div>
            </template>
          </div>
        </ModalBody>
      </Modal>
</template>

<script setup>

import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue';
import i18n from '@/locales/i18n';
import { useRoute, useRouter } from "vue-router";
import { check_facebook_page_token_valid } from "@/api_v2/facebook"
import { check_instagram_profile_token_valid } from "@/api_v2/instagram"
import { check_youtube_channel_token_valid } from "@/api_v2/youtube"
import { check_twitch_channel_token_valid } from "@/api_v2/twitch"
import { update_platform_live_id } from "@/api_v2/campaign"
import { get_user_subscription_facebook_pages, get_user_subscription_instagram_profiles, get_user_subscription_youtube_channels, get_user_subscription_twitch_channels } from "@/api/user_subscription"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const router = useRouter();
const internalInstance = getCurrentInstance()
const sellerLayoutStore = useLSSSellerLayoutStore();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const pages = ref([])
const show = ref(false)
const payloadBuffer = ref({})
onMounted(()=>{
    eventBus.on('showSelectPlatformModal', (payload) => {
      payloadBuffer.value = payload
      let apiRequest =null
      if(payload.platform=='facebook'){
        apiRequest = get_user_subscription_facebook_pages
      }else if(payload.platform=='youtube'){
        apiRequest = get_user_subscription_youtube_channels
      }else if(payload.platform=='instagram'){
        apiRequest = get_user_subscription_instagram_profiles
      } else if(payload.platform=='twitch'){
        apiRequest = get_user_subscription_twitch_channels
      }
      apiRequest().then((res)=>{
        show.value = true
        pages.value = res.data
      })

  })
})

onUnmounted(()=>{
  eventBus.off('showSelectPlatformModal')
})

const selectPage = index => {
  payloadBuffer.value.page=pages.value[index]
  let apiRequest=null
  if(payloadBuffer.value.platform=='facebook'){
    apiRequest = check_facebook_page_token_valid
  }else if(payloadBuffer.value.platform=='youtube'){
    apiRequest = check_youtube_channel_token_valid
  }else if(payloadBuffer.value.platform=='instagram'){
    apiRequest = check_instagram_profile_token_valid
  } else if (payloadBuffer.value.platform=='twitch') {
    apiRequest = check_twitch_channel_token_valid
  }
  apiRequest(pages.value[index].id).then(res=>{
    payloadBuffer.value.page = res.data
    return update_platform_live_id(payloadBuffer.value.campaign.id, {"platform": payloadBuffer.value.platform, "platform_id": res.data.id , "post_id": ''})
  }).then(res=>{
    Object.entries(res.data).forEach(([key,value]) => {
      payloadBuffer.value.campaign[key]=value                       //proxy object only got setter
    });
    return 
  }).then(res=>{
    eventBus.emit('showSelectLiveModal',payloadBuffer.value)
    hide()
  }).catch(error=> {
    if (error.response.data) {
      if (error.response.data.detail) {
        sellerLayoutStore.alert.showMessageToast(error.response.data.detail)
      } else if (error.response.data.message) {
        let messagePath = "error_messages" + error.response.config.url.split("/").splice(0,4).join(".") + "." + error.response.data.message
        if (error.response.data.message.includes("not_activated")) {
          sellerLayoutStore.alert.showMessageToast(i18n.global.t(messagePath))
        } else if (error.response.data.message.includes("token_expired")) {
          sellerLayoutStore.apiErrorAlert.buttonToast(`${i18n.global.t(messagePath)}`, `${i18n.global.t('error_messages.helper.set_up_now')}`, "", forPath)
        }
      }
    } else {
      sellerLayoutStore.alert.showMessageToast('error ! please refresh the page.')
    }
  })

}
const forPath = () =>{
  show.value = false
  eventBus.emit('closEnterPostIDModal')
  router.push({ name: 'platform'})
}
const hide=()=>{
  show.value=false
  pages.value=[]
}
</script>
<style scoped>
.selectPage {
  cursor: pointer;
}
.selectPage:hover {
  background-color: whitesmoke;
}
</style>
