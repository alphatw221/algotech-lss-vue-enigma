<template>
    <Modal
      size="modal-md"
      backdrop="static"
      :show="props?.show"
      @hidden="props?.hide()"
      @show="getSocialPlatformData()"
    >
        <ModalHeader>
          <h2 class="mr-auto text-base font-medium">{{$t('campaign_list.enter_post_id_modal.your_current_live_posts')}}</h2>
          
          <a
            @click="props?.hide()"
            class="absolute top-0 right-0 mt-3 mr-3"
          >
            <XIcon class="w-8 h-8 text-slate-400" />
          </a>
        </ModalHeader>

        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-3 my-0">
            <template v-for="live,index in items" :key="index">
              <div class="col-span-12 post_frame">

                <button type="button" href="javascript:;" class="btn btn-primary mr-3" @click="props.select(live)">{{$t('campaign_list.enter_post_id_modal.select_this_live')}}</button>
                
                <div class="select_live flex-none rounded-md overflow-hidden">
                  <span class="col-span-6 text-lg content-center">
                    {{ live.title }}
                  </span>
                  <p class="col-span-6 text-sm content-center">
                    {{ datetimeReformat(live.time) }}
                  </p>
                  <template v-if="live?.image">
                    <img
                      alt=""
                      :src="live?.image"
                      class="w-1/2"
                      style="z-index: 0"
                    />
                  </template>
               
                </div>

              </div>
            </template>
          </div>
        </ModalBody>
      </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue'
// import { get_fb_page_live_videos, get_fb_page_videos } from "@/api_v2/facebook"
// import { get_ig_live_media, get_ig_media } from "@/api_v2/instagram"
// import { get_yt_live_media } from "@/api_v2/youtube"


const props = defineProps({
  show:Boolean,
  hide:Function,
  socialPlatformAccount:Object,
  select:Function
})




const items = ref([])


const getSocialPlatformData = ()=>{

}


const getFbData = () => {
    get_fb_page_live_videos(payloadBuffer.platform_id, 10, layoutStore.alert)
    .then((response) => {
      // const live_campaign = response.data.data
      // if (!live_campaign.length) {
      //     layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.no_facebook_post'))
      //     return
      // } 

      // let currentLiveItems = []
      // live_campaign.forEach(v => {
      //   currentLiveItems.push({
      //     id: v.video.id,
      //     title: v.title?v.title:v.description?v.description:"",
      //     time: v.broadcast_start_time,
      //     image: null,
      //     video_url: `https://www.facebook.com/plugins/video.php?allowfullscreen=true&autoplay=true&href=https%3A%2F%2Fwww.facebook.com%2F${v.from.id}%2Fvideos%2F${v.video.id}%2F&width=auto`,
      //   })
      // });
      // liveItems.value = currentLiveItems
      // show.value = true
    })
  
}

const getIgData = () => {
  
    get_ig_live_media(payloadBuffer.platform_id, 10, layoutStore.alert)
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
          })
        });
        liveItems.value = currentLiveItems
        show.value = true
    })
  
}

// const getYtPOstsData = () => {
//   if (postType.value === 'live') {
//     get_yt_live_media(payloadBuffer.platform_id, 10, layoutStore.alert)
//     .then((response) => {
//       const live_campaign = response.data.items
//       if (!live_campaign.length) {
//           layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.no_youtube_post'))
//           return
//       }

//       let currentLiveItems = []
//       live_campaign.forEach(v => {

//         currentLiveItems.push({
//           id: v.id,
//           title: v.snippet.title,
//           time: v.snippet.publishedAt,
//           image: null,
//           video_url: `https://www.youtube.com/embed/${v.id}`,
//         })
//       });
//       liveItems.value = currentLiveItems
//       show.value = true
//     })
//   }
// }

// const selectLive = (live_id) => {
//   let apiRequest = null
//   apiRequest = update_platform_live_id(campaign.value.id, {"platform":payloadBuffer.platform, "platform_id":payloadBuffer.platform_id , "post_id":live_id}, layoutStore.alert)
//   apiRequest.then(res=>{
//     Object.entries(res.data).forEach(([key,value]) => {
//       campaign.value[key]=value                       //proxy object only got setter
//     });
//     show.value=false
//     eventBus.emit("changeValidatStatus", {"platform": payloadBuffer.platform})
//   })
    
// }


const datetimeReformat = (datetime_string) => {
  return new Date(datetime_string).toLocaleTimeString('en-us', {
    year: "numeric", month: "short", hour12: false,
    day: "numeric", hour: '2-digit', minute: '2-digit'
  })
}
</script>
<style scoped>
.post_frame {
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid rgb(109, 109, 182);
  border-radius: 16px;
}
</style>