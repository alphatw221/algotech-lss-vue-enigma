<template>
    <Modal
    backdrop="static"
        :show="show"
        @hidden="show=false"
      >
        <ModalHeader>
          <h2 class="mr-auto text-base font-medium">{{$t('campaign_list.enter_post_id_modal.your_current_lives')}}</h2>
          <a
            @click="hideModal()"
            class="absolute top-0 right-0 mt-3 mr-3"
          >
            <XIcon class="w-8 h-8 text-slate-400" />
          </a>
        </ModalHeader>
        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-3 my-0">
            <template v-for="live,index in liveItems" :key="index">
              <div class="col-span-12">
                <button type="button" href="javascript:;" class="btn btn-primary mr-3" @click="selectLive(live.id)">{{$t('campaign_list.enter_post_id_modal.select_this_live')}}</button>
              </div>
              <div class="select_live flex-none rounded-md overflow-hidden col-start-1 col-span-12">
                <span class="col-span-6 text-lg content-center">
                  {{ live.title }}
                </span>
                <template v-if="live.embed_html">
                  <div v-html="live.embed_html" style="z-index: 0"></div>
                </template>
                <template v-else-if="live.image">
                  <img
                    alt=""
                    :src="live.image"
                    style="z-index: 0"
                  />
                </template>
              </div>
            </template>
          </div>
        </ModalBody>
      </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue'
import { get_fb_page_live_media } from "@/api_v2/facebook"
import { get_ig_live_media } from "@/api_v2/instagram"
import { get_yt_live_media } from "@/api_v2/youtube"
import { update_platform_live_id } from "@/api_v2/campaign"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import i18n from "@/locales/i18n"

const layoutStore = useLSSSellerLayoutStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const show = ref(false)
let payloadBuffer = null
const liveItems = ref([])
const campaign = ref({})
onMounted(()=>{
    eventBus.on('showSelectLiveModal', (payload) => {
      campaign.value = payload.campaign
      payloadBuffer = payload
      if(payload.platform=='facebook'){
        get_fb_page_live_media(payloadBuffer.page.page_id, payloadBuffer.page.token)
        .then((response) => {
          const live_campaign = response.data.data.filter(v => v.status === "LIVE")
          if (!live_campaign.length) {
              layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.no_facebook_post'))
              return
          } 

          let currentLiveItems = []
          live_campaign.forEach(v => {
            currentLiveItems.push({
              id: v.video.id,
              title: v.title?v.title:"",
              image: null,
              video_url: null,
              embed_html: v.embed_html,
            })
          });
          liveItems.value = currentLiveItems
          show.value = true
        }).catch(err=>{
          console.log(err.response.data.error.message)
          layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.enter_post_id_modal.rebind_page'))
        })
      }else if(payload.platform=='youtube'){
        get_yt_live_media(payloadBuffer.page.token)
        .then((response) => {

            // const sort = response.data.data.filter(v => v.status === "LIVE")
            const live_campaign = response.data.items
            if (!live_campaign.length) {
                layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.no_youtube_post'))
                return
            }

            let currentLiveItems = []
            live_campaign.forEach(v => {

              currentLiveItems.push({
                id: v.id,
                title: v.snippet.title,
                image: v.snippet.thumbnails.standard.url,
                video_url: null,
                embed_html: null,
              })
            });
            liveItems.value = currentLiveItems
            show.value = true
        }).catch(err=>{
          layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.enter_post_id_modal.rebind_channel')) //temp
        })
      }else if(payload.platform=='instagram'){
        get_ig_live_media(payloadBuffer.page.business_id,payloadBuffer.page.token)
        .then((response) => {

            const live_campaign = response.data.data
            if (!live_campaign.length) {
                layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.no_instagram_post'))
                return
            }

            let currentLiveItems = []
            live_campaign.forEach(v => {

              currentLiveItems.push({
                id: v.id,
                title: v.username,
                image: v.media_url,
                video_url: null,
                embed_html: null,
              })
            });
            liveItems.value = currentLiveItems
            show.value = true
        }).catch(err=>{
          layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.enter_post_id_modal.rebind_profile')) //temp
        })
      }
  })
})

onUnmounted(()=>{
  eventBus.off('showSelectLiveModal')
})



const selectLive = live_id => {
  let apiRequest = null
  apiRequest = update_platform_live_id(campaign.value.id, {"platform":payloadBuffer.platform, "platform_id":payloadBuffer.page.id , "post_id":live_id})
  apiRequest.then(res=>{
    Object.entries(res.data).forEach(([key,value]) => {
      campaign.value[key]=value                       //proxy object only got setter
    });
    show.value=false
    eventBus.emit("changeValidatStatus", {"platform": payloadBuffer.platform})
  })
    
}

const hideModal = ()=>{
  liveItems.value = []
  show.value = false
}

</script>
<style scoped>
</style>