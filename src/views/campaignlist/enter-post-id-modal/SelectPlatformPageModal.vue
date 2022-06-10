<template>
    <Modal :show="props.show"
        @hidden="emits('hide')">
        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <template v-for="page in props.pages" :key="page.page_id">
              <div
                @click="selectFacebookPage(page)"
                class="
                  w-14
                  h-14
                  flex-none
                  image-fit
                  rounded-md
                  overflow-hidden
                  col-start-1 col-span-2
                "
              >
                <img
                  alt=""
                  :src="page.image"
                />
              </div>
              <span
                @click="selectFacebookPage(page)"
                class="col-span-6 text-lg content-center"
              >
                {{ page.name }}
              </span>
            </template>
          </div>
        </ModalBody>
      </Modal>
</template>

<script setup>

import { ref, onMounted, onUnmounted, defineProps, defineEmits} from 'vue'

const props = defineProps({
    show:Boolean,
    pages: Array,
    currentPlatform:String
});

const emits = defineEmits(['hide','selectPage'])

const selectFacebookPage = page => {
    emits('selectPage', {'page':page,'platform':props.currentPlatform})
}

// import { get_user_subscription_facebook_pages, get_user_subscription_instagram_profiles, get_user_subscription_youtube_channels } from "@/api/user_subscription"
// import { get_fb_page_live_media } from "@/api/facebook"
// import { get_ig_live_media } from "@/api/instagram"
// import { get_yt_live_media } from "@/api/youtube"

// facebookSelectPage() {
//       get_user_subscription_facebook_pages()
//       .then((response) => {
//           console.log(response);
//           console.log(response.data);
//           this.campaignEntrydata.facebook.ownPageItems = response.data
//           this.facebookOverlappingModalPreview = true
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     },
//     facebookAccountClick(img, official_page_id, token) {
//       this.fb_page_id = official_page_id
//       this.fb_page_token = token
//       console.log(this.campaignEntrydata.facebook.chosenPageInfo)
//       this.facebookOverlappingModalPreview = false;
//       this.facebookPageSelected = true;
//       this.fbAvatar = img;
//     },
//     facebookSelectCurrentLive() {
//       get_fb_page_live_media(this.fb_page_id, this.fb_page_token)
//       .then((response) => {
//           console.log(response);
//           console.log(response.data);
//           // const sort = response.data.data.filter(v => v.status === "LIVE")
//           const live_campaign = response.data.data.filter(v => v.status === "LIVE")
//           if (!live_campaign.length) {
//               alert('You have no Facebook live posts now.')
//           } else {
//               let currentLiveItems = []
//               live_campaign.forEach(v => {

//                 currentLiveItems.push({
//                   id: v.video.id,
//                   title: v.title?v.title:"Current Live",
//                   image: null,
//                   video_url: null,
//                   embed_html: v.embed_html,
//                 })
//               });
//               this.currentLiveItems = currentLiveItems
//               this.currentLiveListPlatform = "facebook"
//               this.CurrentLiveOverlappingModalPreview = true
//           }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     },
</script>
