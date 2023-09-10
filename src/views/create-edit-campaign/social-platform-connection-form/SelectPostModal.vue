<template>
    <Modal
      size="modal-md"
      backdrop="static"
      :show="props?.show"
      @hidden="props?.hide()"
      @show="getSocialPlatformData()"

    >
        <ModalHeader>
    
            <h2 class="mr-auto text-base font-medium">{{$t('campaign_list.enter_post_id_modal.your_current_video_posts')}}</h2>

          
          <a
            @click="props?.hide()"
            class="absolute top-0 right-0 mt-3 mr-3"
          >
            <XIcon class="w-8 h-8 text-slate-400" />
          </a>
        </ModalHeader>

        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-3 my-0">
            <template v-for="post,index in items" :key="index">
              <div class="col-span-12 post_frame">
                <button type="button" href="javascript:;" class="btn btn-primary mr-3" @click="props.select(post)">{{$t('campaign_list.enter_post_id_modal.select_this_live')}}</button>
                <div class="select_live flex-none rounded-md overflow-hidden">
                  <span class="col-span-6 text-lg content-center">
                    {{ post.title }}
                  </span>
                  <p class="col-span-6 text-sm content-center">
                    {{ datetimeReformat(post.time) }}
                  </p>
                 
                  <template v-if="post?.video_url">
                    <iframe
                     :src="post?.video_url" scrolling="no" frameborder="0" allow="accelerometer;
                      autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
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
import { get_fb_page_live_videos, get_fb_page_videos } from "@/api_v2/facebook"
import { get_ig_live_media, get_ig_media } from "@/api_v2/instagram"
import { get_yt_live_media } from "@/api_v2/youtube"


const props = defineProps({
  show:Boolean,
  hide:Function,
  socialPlatformAccount:Object,
  select:Function
})




const getSocialPlatformData = ()=>{

}



const getFbData = () => {
 
    get_fb_page_videos(payloadBuffer.platform_id, 10, layoutStore.alert)
    .then((response) => {
      // const live_campaign = response.data.data.filter(element=>element.live_status !== "LIVE")
      // if (!live_campaign.length) {
      //     layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.no_facebook_post'))
      //     return
      // } 

      // let currentLiveItems = []
      // live_campaign.forEach(v => {
      //   currentLiveItems.push({
      //     id: v.id,
      //     title: v.title?v.title:v.description?v.description:"",
      //     time: v.created_time,
      //     image: null,
      //     video_url: `https://www.facebook.com/plugins/video.php?allowfullscreen=true&autoplay=true&href=https%3A%2F%2Fwww.facebook.com%2F${v.from.id}%2Fvideos%2F${v.id}%2F&width=auto`,
      //   })
      // });
      // liveItems.value = currentLiveItems
      // show.value = true
    })
}
const getIgData = () => {
  
    get_ig_media(payloadBuffer.platform_id, 10, layoutStore.alert)
    .then((response) => {
      // console.log("get_ig_media")
      //   const live_campaign = response.data.data
      //   if (!live_campaign.length) {
      //       layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.no_instagram_post'))
      //       return
      //   }
      //   let currentLiveItems = []
      //   live_campaign.forEach(v => {
      //     currentLiveItems.push({
      //       id: v.id,
      //       title: v.caption?v.caption:"",
      //       time: v.timestamp,
      //       image: null,
      //       video_url: v.media_url,
      //     })
      //   });
      //   liveItems.value = currentLiveItems
      //   show.value = true
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