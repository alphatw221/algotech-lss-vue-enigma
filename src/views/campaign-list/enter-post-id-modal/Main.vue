<template>

    <!--Modal Enter Post ID -->
    <Modal
      size="modal-lg"
      :show="showModal"
      @hidden="hideModal()"
    >
      <ModalHeader>
        <h2 class="mr-auto text-base font-medium">{{$t('campaign_list.enter_post_id_modal.edit_channel')}}</h2>
        <a
          @click="hideModal()"
          class="absolute top-0 right-0 mt-3 mr-3"
        >
          <XIcon class="w-8 h-8 text-slate-400" />
        </a>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">

        <template v-if="ready">

          <div class="col-span-12 sm:col-span-4 p-3 lg:mx-0 sm:mx-1">
            <div class="content">
              <div>
                <h5 class="text-lg font-medium text-center">{{$t('campaign_list.enter_post_id_modal.facebook')}}</h5>
              </div>
              <button
                type="button"
                v-if="!campaign.facebook_page"
                @click="selectPlatformPage('facebook')"
                class="select_page btn rounded-full btn-primary lg:mt-10"
              >
                {{$t('campaign_list.enter_post_id_modal.select_live_post')}}
              </button>
              <div class="mt-3" v-if="campaign.facebook_page">
                <p class="my-auto text-center">{{$t('campaign_list.enter_post_id_modal.page')}}</p>
                <div class="w-14 h-14 flex-none image-fit rounded-full overflow-hidden mx-auto mt-2">
                  <a href="javascript:;" @click="selectPlatformPage('facebook')"><img alt="Midone Tailwind HTML Admin Template" :src="campaign.facebook_page.image"/></a>
                </div>
              </div>
              
              <div class="mt-3" v-if="campaign.facebook_page">
                <p class="text-center">{{$t('campaign_list.enter_post_id_modal.enter_post_id')}}</p>
                <input class="post_id" v-model="campaign.facebook_campaign.post_id" 
                :class="{ 'border-danger text-danger border-2': validate.facebook.post_id.error }" @focusout="autoUpdatePostId('facebook')"/>
                <template v-if="validate.facebook.post_id.error">
                  <label class="text-danger ml-2" >
                    invalid post id 
                  </label>
                </template>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-4 p-3 lg:mx-0 sm:mx-1">
            <div class="content">
              <div>
                <h5 class="text-lg font-medium text-center">{{$t('campaign_list.enter_post_id_modal.instagram')}}</h5>
              </div>
              <button
                type="button"
                v-if="!campaign.instagram_profile"
                @click="selectPlatformPage('instagram')"
                class="select_page btn rounded-full btn-primary lg:mt-10"
              >
                <!-- Select Profile -->
                {{$t('campaign_list.enter_post_id_modal.select_live_post')}}
              </button>
              <div class="mt-3" v-if="campaign.instagram_profile">
                <p class="my-auto text-center">{{$t('campaign_list.enter_post_id_modal.profile')}}</p>
                <div class="w-14 h-14 flex-none image-fit rounded-full overflow-hidden mx-auto mt-2">
                  <a href="javascript:;" @click="selectPlatformPage('instagram')"><img alt="Midone Tailwind HTML Admin Template" :src="campaign.instagram_profile.image" /></a>
                </div>
              </div>
              <div class="mt-3" v-if="campaign.instagram_profile">
                <p class="text-center">{{$t('campaign_list.enter_post_id_modal.enter_post_id')}}</p>
                <input class="post_id" v-model="campaign.instagram_campaign.live_media_id" 
                :class="{ 'border-danger text-danger border-2': validate.instagram.post_id.error }" @focusout="autoUpdatePostId('instagram')" disabled/>
                <template v-if="validate.instagram.post_id.error">
                  <label class="text-danger ml-2" >
                    invalid post id 
                  </label>
                </template>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-4 p-3 lg:mx-0 sm:mx-1">
            <div class="content">
              <div>
                <h5 class="text-lg font-medium text-center">{{$t('campaign_list.enter_post_id_modal.youtube')}}</h5>
              </div>
              <button
                type="button"
                v-if="!campaign.youtube_channel"
                @click="selectPlatformPage('youtube')"
                class="select_page btn rounded-full btn-primary lg:mt-10"
              >
                {{$t('campaign_list.enter_post_id_modal.select_live_post')}}
              </button>
              <div class="mt-3" v-if="campaign.youtube_channel">
                <p class="my-auto text-center">{{$t('campaign_list.enter_post_id_modal.channel')}}</p>
                <div class="w-14 h-14 flex-none image-fit rounded-full overflow-hidden mx-auto mt-2">
                  <a href="javascript:;" @click="selectPlatformPage('youtube')"><img alt="Midone Tailwind HTML Admin Template" :src="campaign.youtube_channel.image" /></a>
                </div>
              </div>
              <div class="mt-3" v-if="campaign.youtube_channel">
                <p class="text-center">{{$t('campaign_list.enter_post_id_modal.enter_post_id')}}</p>
                <input class="post_id" v-model="campaign.youtube_campaign.live_video_id" 
                :class="{ 'border-danger text-danger border-2': validate.youtube.post_id.error }" @focusout="autoUpdatePostId('youtube')"/>
                <template v-if="validate.youtube.post_id.error">
                  <label class="text-danger ml-2" >
                    invalid post id 
                  </label>
                </template>
              </div>
            </div>
          </div>
        </template>
      </ModalBody>


      <!-- BEGIN: Select Facebook Fan Page -->
      <SelectPlatformPageModal/>
      <!-- END: Select Facebook Fan Page -->


      <!-- BEGIN: Select Current Live -->
        <SelectCurrentLiveModal/>
      <!-- END: Select Current Live -->
      
      <ModalFooter>
        <button
          type="button"
          class="w-32 bg-white btn dark:border-darkmode-400"
          @click="hideModal()"
        >
          {{$t('campaign_list.enter_post_id_modal.cancel')}}
        </button>
        <button type="button" class="w-32 ml-5 shadow-md btn btn-primary" @click="enterLive()" v-if="ready" 
          v-show="campaign.facebook_page || campaign.youtube_channel || campaign.instagram_profile">

          {{$t('campaign_list.enter_post_id_modal.save')}}
        </button>
      </ModalFooter>
    </Modal>

</template>



<script setup>
import SelectPlatformPageModal from "./SelectPlatformPageModal.vue"
import SelectCurrentLiveModal from "./SelectCurrentLiveModal.vue"
import { update_platform_live_id } from "@/api_v2/campaign"
import { check_facebook_page_post_exist } from "@/api/facebook"
import { check_instagram_profile_post_exist } from "@/api/instagram"
import { check_youtube_channel_post_exist } from "@/api/youtube"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import i18n from "@/locales/i18n"


import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance, watch, computed} from 'vue'

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const layoutStore = useLSSSellerLayoutStore();
const ready = ref(false)
const campaign = ref(null)
const invalid = ref(false)
const validate = ref({
  "facebook": {
    "post_id": {
      "error": false
    }
  },
  "instagram": {
    "post_id": {
      "error": false
    }
  },
  "youtube": {
    "post_id": {
      "error": false
    }
  }
})
onMounted(()=>{
    eventBus.on('showEnterPostIDModal', (payload) => {
      console.log("-------------")
      showModal.value = true
      campaign.value = payload.campaign
      console.log(campaign.value)
      ready.value=true
    })
    eventBus.on('changeValidatStatus', (payload) => {
      validate.value[payload.platform]["post_id"]["error"] = false
    })
})

onUnmounted(()=>{
  eventBus.off('showEnterPostIDModal')
  eventBus.off('changeValidatStatus')
})

const router = useRouter()
const route = useRoute()


const showModal = ref(false)


const enterLive = ()=>{
  let facebook_valid = campaign.value.facebook_campaign.post_id && !validate.value["facebook"]["post_id"]["error"]
  let instagram_valid = campaign.value.instagram_campaign.live_media_id && !validate.value["instagram"]["post_id"]["error"]
  let youtube_valid = campaign.value.youtube_campaign.live_video_id && !validate.value["youtube"]["post_id"]["error"]
  console.log(youtube_valid)
  if (facebook_valid || instagram_valid || youtube_valid) {
    router.push({name:'campaign-live',params:{'campaign_id':campaign.value.id}})
    hideModal()
  } else {
    layoutStore.alert.showMessageToast(i18n.global.t('campaign_list.enter_post_id_modal.valid_post_id_notification'))
  }
  
}

const hideModal = ()=>{
  ready.value = false
  campaign.value = null
  showModal.value = false
}


const selectPlatformPage = (platform)=>{
  eventBus.emit('showSelectPlatformModal',{'platform':platform, 'campaign':campaign.value})
}
let updatePostid = null

const autoUpdatePostId = (platform) => {
  let page_id = null
  let live_id = null
  let apiRequest = null

  if (platform === "facebook") {
    page_id = campaign.value.facebook_page.id
    live_id = campaign.value.facebook_campaign.post_id
    apiRequest = check_facebook_page_post_exist(page_id, live_id)
  } else if (platform === "instagram") {
    page_id = campaign.value.instagram_profile.id
    live_id = campaign.value.instagram_campaign.live_media_id
    apiRequest = check_instagram_profile_post_exist(page_id, live_id)
  } else if (platform === "youtube") {
    page_id = campaign.value.youtube_channel.id
    live_id = campaign.value.youtube_campaign.live_video_id
    apiRequest = check_youtube_channel_post_exist(page_id, live_id)
  }
  if ([undefined, ""].includes(live_id)) {
    validate.value[platform]["post_id"]["error"] = false
    return
  }
  apiRequest.then(res=>{
    return res.data
  }).then(res=>{
    console.log(res)
    if (res.success_response) {
      validate.value[platform]["post_id"]["error"] = false
      return update_platform_live_id(campaign.value.id, platform, page_id, live_id)
    } else {
      validate.value[platform]["post_id"]["error"] = true
    }
  })
}

</script>
<style scoped>
input {
  width: 90%;
  margin: auto;
  display: block;
}
.post_id {
  border:0;
  outline: 0;
  padding: 4px;
  height: auto;
  border-bottom: 1px solid black;
  background: rgb(var(--color-slate-100) / var(--tw-bg-opacity));
}
.post_id:focus {
  transition: 0.5s ease;
  background: white;
}


img {
  cursor: pointer;
}
button.select_page {
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%, -50%);
  padding: 5px 5px;
  margin: 0;
  width: 85%;
}
.content {
  box-sizing: border-box;
  padding: 20px;
  margin:0;
  border: 2px solid rgb(109, 109, 182);
  border-radius: 16px;
  height: 230px;
}
</style>
