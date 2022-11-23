<template>
    <Modal
      size="modal-md"
      backdrop="static"
      :show="show"
      @hidden="show=false"
    >
        <ModalHeader>
          <template v-if="postType === 'live'">
            <h2 class="mr-auto text-base font-medium">{{$t('campaign_list.enter_post_id_modal.your_current_live_posts')}}</h2>
          </template>
          <template v-else>
            <h2 class="mr-auto text-base font-medium">{{$t('campaign_list.enter_post_id_modal.your_current_video_posts')}}</h2>
          </template>
          
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
              <div style="height: 100%;width:100%;" class="select_live flex-none rounded-md overflow-hidden col-start-1 col-span-12">
                <span class="col-span-6 text-lg content-center">
                  {{ live.title }}
                </span>
                <p class="col-span-6 text-lg content-center">
                  {{ live.time }}
                </p>
                <template v-if="live.embed_html">
                  <div v-html="live.embed_html" style="z-index: 0; overflow:hidden; height:300px; width:500px;"></div>
                </template>
                <template v-else-if="live.image">
                  <img
                    alt=""
                    :src="live.image"
                    class="w-1/2"
                    style="z-index: 0"
                  />
                </template>
                <template v-else-if="live.video_url">
                  <iframe
                   :src="live.video_url" scrolling="no" frameborder="0" allow="accelerometer;
                    autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                  </iframe>
                </template>
              </div>
            </template>
          </div>
        </ModalBody>
      </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue'
import { get_fb_page_live_videos, get_fb_page_videos } from "@/api_v2/facebook"
import { get_ig_live_media, get_ig_media } from "@/api_v2/instagram"
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
const postType = ref('')
onMounted(()=>{
    eventBus.on('showSelectPostsModal', (payload) => {
      campaign.value = payload.campaign
      payloadBuffer = payload
      postType.value = payload.post_type
      if(payload.platform=='facebook'){
        getFbPostsData()
      }else if(payload.platform=='youtube'){
        getYtPOstsData()
      }else if(payload.platform=='instagram'){
        getIgPostsData()
      }
  })
})

onUnmounted(()=>{
  eventBus.off('showSelectPostsModal')
})


const getFbPostsData = () => {
  if (postType.value === 'live') {
    get_fb_page_live_videos(payloadBuffer.platform_id, layoutStore.alert)
    .then((response) => {
      const live_campaign = response.data.data
      if (!live_campaign.length) {
          layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.no_facebook_post'))
          return
      } 

      let currentLiveItems = []
      live_campaign.forEach(v => {
        currentLiveItems.push({
          id: v.video.id,
          title: v.title?v.title:v.description?v.description:"",
          time: v.broadcast_start_time,
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
  }
  if (postType.value === 'video') {
    get_fb_page_videos(payloadBuffer.platform_id, layoutStore.alert)
    .then((response) => {
      console.log(response.data.data)
      const live_campaign = response.data.data.filter(element=>element.live_status !== "LIVE")
      if (!live_campaign.length) {
          layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.no_facebook_post'))
          return
      } 

      let currentLiveItems = []
      live_campaign.forEach(v => {
        currentLiveItems.push({
          id: v.id,
          title: v.title?v.title:v.description?v.description:"",
          time: v.created_time,
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
  }
}
const getIgPostsData = () => {
  if (postType.value === 'live') {
    get_ig_live_media(payloadBuffer.platform_id, 5, layoutStore.alert)
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
            title: "",
            time: v.timestamp,
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
  if (postType.value === 'video') {
    get_ig_media(payloadBuffer.platform_id, 5, layoutStore.alert)
    .then((response) => {
      console.log("get_ig_media")
        const live_campaign = response.data.data
        if (!live_campaign.length) {
            layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.no_instagram_post'))
            return
        }
        let currentLiveItems = []
        live_campaign.forEach(v => {
          currentLiveItems.push({
            id: v.id,
            title: v.caption?v.caption:"",
            time: v.timestamp,
            image: null,
            video_url: v.media_url,
            embed_html: null,
          })
        });
        liveItems.value = currentLiveItems
        show.value = true
    }).catch(err=>{
      console.log("err get_ig_media")
      layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.enter_post_id_modal.rebind_profile')) //temp
    })
  }
}
const getYtPOstsData = () => {
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
}
const selectLive = live_id => {
  let apiRequest = null
  apiRequest = update_platform_live_id(campaign.value.id, {"platform":payloadBuffer.platform, "platform_id":payloadBuffer.platform_id , "post_id":live_id}, layoutStore.alert)
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