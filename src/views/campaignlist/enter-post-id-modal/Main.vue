<template>
     <Modal
        size="modal-lg"
        :show="props.show"
        @hidden="cancel()"
      >

      <ModalHeader>
        <h2 class="font-medium text-base mr-auto">Enter Post ID</h2>
        <a
          @click="cancel()"
          class="absolute right-0 top-0 mt-3 mr-3"
          href="javascript:;"
        >
          <XIcon class="w-8 h-8 text-slate-400" />
        </a>
      </ModalHeader>

      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">

        <div class="col-span-12 items-end" style="display: inline-flex">
          <label for="modal-form-1" class="text-lg font-medium mr-5"
            >Facebook</label
          >
          <div
            v-show="campaignPlatformData.facebook.isPageSelected"
            class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
          >
            <img alt="Midone Tailwind HTML Admin Template" :src="campaignPlatformData.facebook.avatar" />
          </div>
        </div>
        <div class="col-span-12" style="display: inline-flex">
          <button
            type="button"
            href="javascript:;"
            @click="selectPlatformPage('facebook')"
            class="btn w-48 btn-primary mr-3"
          >
            Select Page
          </button>
          <input
            id="modal-form-1"
            type="text"
            class="form-control"
            placeholder=""
            v-model="campaignPlatformData.facebook.post_id"
            @click="selectCurrentLive('facebook')"
          />
        </div>


        <div class="col-span-12 items-end" style="display: inline-flex">
          <label for="modal-form-1" class="text-lg font-medium mr-5"
            >Instagram</label
          >
          <div
            v-show="campaignPlatformData.instagram.isPageSelected"
            class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
          >
            <img alt="Midone Tailwind HTML Admin Template" :src="campaignPlatformData.instagram.avatar" />
          </div>
        </div>
        <div class="col-span-12" style="display: inline-flex">
          <button
            type="button"
            href="javascript:;"
            @click="selectPlatformPage('instagram')"
            class="btn w-48 btn-primary mr-3"
          >
            Select Page
          </button>
          <input
            id="modal-form-1"
            type="text"
            class="form-control"
            placeholder=""
            v-model="campaignPlatformData.instagram.live_media_id"
            @click="selectCurrentLive('instagram')"
          />
        </div>


        <div class="col-span-12 items-end" style="display: inline-flex">
          <label for="modal-form-1" class="text-lg font-medium mr-5"
            >YouTube</label
          >
          <div
            v-show="campaignPlatformData.youtube.isPageSelected"
            class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
          >
            <img alt="Midone Tailwind HTML Admin Template" :src="campaignPlatformData.youtube.avatar" />
          </div>
        </div>
        <div class="col-span-12" style="display: inline-flex">
          <button
            type="button"
            href="javascript:;"
            @click="selectPlatformPage('youtube')"
            class="btn w-48 btn-primary mr-3"
          >
            Select Page
          </button>
          <input
            id="modal-form-1"
            type="text"
            class="form-control"
            placeholder=""
            v-model="campaignPlatformData.youtube.channel_id"
            @click="selectCurrentLive('youtube')"
          />
        </div>
      </ModalBody>





      <!-- BEGIN: Select Facebook Fan Page -->
      <SelectPlatformPageModal 
        :show="showSelectPlatformPageModal" 
        :pages="campaignPlatformData.pages"
        :currentPlatform="currentPlatform"
        @hide="showSelectPlatformPageModal=false"
        @selectPage="handleSelectPage"
        />
      <!-- END: Select Facebook Fan Page -->




    

      <!-- BEGIN: Select Current Live -->
        <SelectCurrentLiveModal
        :show="showSelectCurrentLiveModal" 
        :lives="campaignPlatformData.currentLiveItems"
        :currentPlatform="currentPlatform"
        @hide="showSelectCurrentLiveModal=false"
        @selectLive="handleSelectLive"
        />
      <!-- END: Select Current Live -->

      <ModalFooter>
        <button
          type="button"
          class="btn btn-outline-secondary w-20 mr-1"
          @click="cancel()"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-primary w-20" @click="closeJump">
          Save
        </button>
      </ModalFooter>
    </Modal>
</template>



<script setup>
import SelectPlatformPageModal from "./SelectPlatformPageModal.vue"
import SelectCurrentLiveModal from "./SelectCurrentLiveModal.vue"

import { get_user_subscription_facebook_pages, get_user_subscription_instagram_profiles, get_user_subscription_youtube_channels } from "@/api/user_subscription"

import { bind_facebook_page_to_campaign, bind_youtube_channel_to_campaign, bind_instagram_profile_to_campaign } from "@/api/campaign"
import { update_platform_live_id } from "@/api_v2/campaign"

import { get_fb_page_live_media } from "@/api/facebook"
import { get_ig_live_media } from "@/api/instagram"
import { get_yt_live_media } from "@/api/youtube"


import { useRoute, useRouter } from "vue-router"

import { useLSSCampaignListStore } from "@/stores/lss-campaign-list"


import { ref, onMounted, onUnmounted, defineProps, defineEmits} from 'vue'

const props = defineProps({
    show:Boolean,
    targetCampaign:Object
});

const emits = defineEmits(['hide','selectPlatform','selectLive'])


const store = useLSSCampaignListStore()

const showSelectPlatformPageModal = ref(false)
const showSelectCurrentLiveModal = ref(false)
const currentPlatform = ref('')
const campaignPlatformData =ref( {
  pages:[],
  currentLiveItems:[],
  facebook:{
      isPageSelected:false,
      avatar:'',
      pageID: '',
      token:'',
      post_id: ''
  },
  instagram:{
      isPageSelected:false,
      avatar:'',
      pageID: '',
      token:'',
      live_media_id: '',
  },
  youtube:{
      isPageSelected:false,
      avatar:'',
      pageID:'',
      token:'',
      live_video_id: '',
  },
})

const cancel = ()=>{
  emits('hide')
  campaignPlatformData.value = {
    pages:[],
    currentLiveItems:[],
    facebook:{
        isPageSelected:false,
        avatar:'',
        pageID: '',
        token:'',
        post_id: ''
    },
    instagram:{
        isPageSelected:false,
        avatar:'',
        pageID: '',
        token:'',
        live_media_id: '',
    },
    youtube:{
        isPageSelected:false,
        avatar:'',
        pageID:'',
        token:'',
        live_video_id: '',
    },
  }
}


const selectPlatformPage = (platform)=>{
  currentPlatform.value=platform

  if(platform=='facebook'){
    get_user_subscription_facebook_pages()
    .then((response) => {
        campaignPlatformData.value.pages = response.data
        showSelectPlatformPageModal.value = true
    })
  }else if(platform=='youtube'){
    get_user_subscription_youtube_channels()
    .then((response) => {
        campaignPlatformData.value.pages = response.data
        showSelectPlatformPageModal.value = true
    })
  }else if(platform=='instagram'){
    get_user_subscription_instagram_profiles()
    .then((response) => {
        campaignPlatformData.value.pages = response.data
        showSelectPlatformPageModal.value = true
    })
  }
}

const handleSelectPage = payload=>{
  console.log(payload.page)
  showSelectPlatformPageModal.value=false

  if(payload.platform=='facebook'){

    

    bind_facebook_page_to_campaign(props.targetCampaign.campaign.id, payload.page.id).then(res=>{
      store[props.targetCampaign.tableName].campaigns[props.targetCampaign.index] = res.data

      campaignPlatformData.value.facebook.isPageSelected = true
      campaignPlatformData.value.facebook.avatar = payload.page.image
      campaignPlatformData.value.facebook.pageID = payload.page.page_id
      campaignPlatformData.value.facebook.token =payload.page.token

    })
    

  }else if(payload.platform=='youtube'){
    

    bind_youtube_channel_to_campaign(props.targetCampaign.campaign.id, payload.page.id).then(res=>{
      store[props.targetCampaign.tableName].campaigns[props.targetCampaign.index] = res.data

      campaignPlatformData.value.youtube.isPageSelected = true
      campaignPlatformData.value.youtube.avatar = payload.page.image
      campaignPlatformData.value.youtube.pageID = payload.page.channel_id
      campaignPlatformData.value.youtube.token =payload.page.token

    })

  }else if(payload.platform=='instagram'){
    bind_instagram_profile_to_campaign(props.targetCampaign.campaign.id, payload.page.id).then(res=>{
      store[props.targetCampaign.tableName].campaigns[props.targetCampaign.index] = res.data

      campaignPlatformData.value.instagram.isPageSelected = true
      campaignPlatformData.value.instagram.avatar = payload.page.image
      campaignPlatformData.value.instagram.pageID = payload.page.business_id
      campaignPlatformData.value.instagram.token =payload.page.token

    })

    
  }
}





const selectCurrentLive = (platform)=>{
  currentPlatform.value=platform

  if(platform=='facebook'){
    get_fb_page_live_media(campaignPlatformData.value.facebook.pageID,campaignPlatformData.value.facebook.token)
    .then((response) => {

      const live_campaign = response.data.data.filter(v => v.status === "LIVE")
      if (!live_campaign.length) {
          alert('You have no Facebook live posts now.') //use tostify alert
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
      campaignPlatformData.value.currentLiveItems = currentLiveItems
      showSelectCurrentLiveModal.value = true
    })
  }else if(platform=='youtube'){
    get_yt_live_media(campaignPlatformData.value.youtube.token)
    .then((response) => {

        console.log(response);
        console.log(response.data);
        // const sort = response.data.data.filter(v => v.status === "LIVE")
        const live_campaign = response.data.items
        if (!live_campaign.length) {
            alert('You have no YouTube live stream now.')
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
        campaignPlatformData.value.currentLiveItems = currentLiveItems
        showSelectCurrentLiveModal.value = true
    })
  }else if(platform=='instagram'){
    get_ig_live_media(campaignPlatformData.value.instagram.pageID,campaignPlatformData.value.instagram.token)
    .then((response) => {

        const live_campaign = response.data.data
        if (!live_campaign.length) {
            alert('You have no Instagram live posts now.')
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
        campaignPlatformData.value.currentLiveItems = currentLiveItems
        showSelectCurrentLiveModal.value = true

    })
  }
}

const handleSelectLive = payload=>{
  console.log(payload)
  showSelectCurrentLiveModal.value=false

  if(payload.platform=='facebook'){
    update_platform_live_id(props.targetCampaign.campaign.id,payload.platform, payload.live_id).then(res=>{
      store[props.targetCampaign.tableName].campaigns[props.targetCampaign.index] = res.data
      campaignPlatformData.value.facebook.post_id =payload.live_id
    })
    
  }else if(payload.platform=='youtube'){
    update_platform_live_id(props.targetCampaign.campaign.id,payload.platform, payload.live_id).then(res=>{
      store[props.targetCampaign.tableName].campaigns[props.targetCampaign.index] = res.data
      campaignPlatformData.value.youtube.live_video_id =payload.live_id
    })
    
  }else if(payload.platform=='instagram'){
    update_platform_live_id(props.targetCampaign.campaign.id,payload.platform, payload.live_id).then(res=>{
      store[props.targetCampaign.tableName].campaigns[props.targetCampaign.index] = res.data
      campaignPlatformData.value.instagram.live_media_id =payload.live_id
    })
    
  }
}





</script>
