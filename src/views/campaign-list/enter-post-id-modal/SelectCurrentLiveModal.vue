<template>
    <Modal
        :show="show"
        @hidden="show=false"
      >
        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <template v-for="live,index in liveItems" :key="index">
              <div
                class="
                  flex-none
                  rounded-md
                  overflow-hidden
                  col-start-1 col-span-12
                "
                @click="selectLive(live.id)"  style="cursor: pointer"
              >
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
              <span
                class="col-span-6 text-lg content-center"
                @click="selectLive(live.id)"  style="cursor: pointer"
              >
                {{ live.title }}
              </span>
            </template>
          </div>
        </ModalBody>
      </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue'
import { get_fb_page_live_media } from "@/api/facebook"
import { get_ig_live_media } from "@/api/instagram"
import { get_yt_live_media } from "@/api/youtube"
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
              title: v.title?v.title:"Current Live",
              image: null,
              video_url: null,
              embed_html: v.embed_html,
            })
          });
          liveItems.value = currentLiveItems
          show.value = true
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
        })
      }
  })
})

onUnmounted(()=>{
  eventBus.off('showSelectLiveModal')
})



const selectLive = live_id => {
  let apiRequest = null
  apiRequest = update_platform_live_id(campaign.value.id, payloadBuffer.platform, payloadBuffer.page.id ,live_id)
  apiRequest.then(res=>{
    Object.entries(res.data).forEach(([key,value]) => {
      campaign.value[key]=value                       //proxy object only got setter
    });
    show.value=false
  })
    
}

</script>