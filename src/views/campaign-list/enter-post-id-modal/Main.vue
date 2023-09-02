<template>

    <!--Modal Enter Post ID -->
    <Modal
    backdrop="static"
      size="modal-xl"
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

          <div v-if="activatedPlatformList.includes('facebook')" class="col-span-12 sm:col-span-4 p-3 lg:mx-0 sm:mx-1">
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
                <XIcon class="w-6 h-6 right-16 top-20 cursor-pointer absolute text-slate-500" @click="remove_platform_data('facebook')"/>
                <p class="my-auto text-center">{{$t('campaign_list.enter_post_id_modal.page')}}</p>
                <div class="w-14 h-14 flex-none image-fit rounded-full overflow-hidden mx-auto mt-2">
                  <a href="javascript:;" @click="selectPlatformPage('facebook')"><img alt="Midone Tailwind HTML Admin Template" :src="campaign.facebook_page.image"/></a>
                </div>
              </div>
              
              <div class="mt-3" v-if="campaign.facebook_page">
                <!-- <p class="text-center">{{$t('campaign_list.enter_post_id_modal.enter_post_id')}}</p> -->
                
                <div style="display:flex;">
                  <input class="post_id" v-model="campaign.facebook_campaign.post_id"
                  :placeholder="$t('campaign_list.enter_post_id_modal.enter_post_id')"
                  :class="{ 'border-danger text-danger border-2': validate.facebook.post_id.error }" @keyup="autoUpdatePostId('facebook')"/>
                  <Tippy tag="a" href="javascript:;" class="absolute right-[40px] tooltip" :content="$t('campaign_list.enter_post_id_modal.search_recent_posts')" :options="{
                    theme: 'light',
                  }">
                  <SearchIcon class="absolute right-[-12px] z-10 click-icon" @click="popSelectLivePostOrVideoPostModal('facebook', campaign.facebook_page.id)"/></Tippy>
                </div>
                
                <template v-if="validate.facebook.post_id.error">
                  <label class="text-danger ml-2" >
                    invalid post id 
                  </label>
                </template>
              </div>
            </div>
          </div>

          <!-- SUB FACEBOOK -->
          <div v-if="activatedPlatformList.includes('sub_facebook')" class="col-span-12 sm:col-span-4 p-3 lg:mx-0 sm:mx-1">
            <div class="content">
              <div>
                <h5 class="text-lg font-medium text-center">{{$t('campaign_list.enter_post_id_modal.facebook')}}2</h5>
              </div>
              <button
                type="button"
                v-if="!campaign.sub_facebook_page"
                @click="selectPlatformPage('sub_facebook')"
                class="select_page btn rounded-full btn-primary lg:mt-10"
              >
                {{$t('campaign_list.enter_post_id_modal.select_live_post')}}
              </button>
              <div class="mt-3" v-if="campaign.sub_facebook_page">
                <XIcon class="w-6 h-6 right-16 top-20 cursor-pointer absolute text-slate-500" @click="remove_platform_data('sub_facebook')"/>
                <p class="my-auto text-center">{{$t('campaign_list.enter_post_id_modal.page')}}</p>
                <div class="w-14 h-14 flex-none image-fit rounded-full overflow-hidden mx-auto mt-2">
                  <a href="javascript:;" @click="selectPlatformPage('sub_facebook')"><img alt="Midone Tailwind HTML Admin Template" :src="campaign.sub_facebook_page.image"/></a>
                </div>
              </div>
              
              <div class="mt-3" v-if="campaign.sub_facebook_page">
                <!-- <p class="text-center">{{$t('campaign_list.enter_post_id_modal.enter_post_id')}}</p> -->
                
                <div style="display:flex;">
                  <input class="post_id" v-model="campaign.sub_facebook_campaign.post_id"
                  :placeholder="$t('campaign_list.enter_post_id_modal.enter_post_id')"
                  :class="{ 'border-danger text-danger border-2': validate.sub_facebook.post_id.error }" @keyup="autoUpdatePostId('sub_facebook')"/>
                  <Tippy tag="a" href="javascript:;" class="absolute right-[40px] tooltip" :content="$t('campaign_list.enter_post_id_modal.search_recent_posts')" :options="{
                    theme: 'light',
                  }">
                  <SearchIcon class="absolute right-[-12px] z-10 click-icon" @click="popSelectLivePostOrVideoPostModal('sub_facebook', campaign.sub_facebook_page.id)"/></Tippy>
                </div>
                
                <template v-if="validate.sub_facebook.post_id.error">
                  <label class="text-danger ml-2" >
                    invalid post id 
                  </label>
                </template>
              </div>
            </div>
          </div>
          


          <!-- SUB FACEBOOK_N -->
          <template v-for="postfix, postfixIndex in ['_3', '_4', '_5', '_6']" :key="postfixIndex">

            
            <div v-if="activatedPlatformList.includes('sub_facebook')" class="col-span-12 sm:col-span-4 p-3 lg:mx-0 sm:mx-1">
              <div class="content" >
                <div>
                  <h5 class="text-lg font-medium text-center">{{$t('campaign_list.enter_post_id_modal.facebook')}}{{ postfix }}</h5>
                </div>
                <button
                  type="button"
                  v-if="!campaign?.[`sub_facebook_page${postfix}`]"
                  @click="selectPlatformPage(`sub_facebook${postfix}`)"
                  class="select_page btn rounded-full btn-primary lg:mt-10"
                >
                  {{$t('campaign_list.enter_post_id_modal.select_live_post')}}
                </button>
                <div class="mt-3" v-if="campaign?.[`sub_facebook_page${postfix}`]">
                  <XIcon class="w-6 h-6 right-16 top-20 cursor-pointer absolute text-slate-500" @click="remove_platform_data(`sub_facebook${postfix}`)"/>
                  <p class="my-auto text-center">{{$t('campaign_list.enter_post_id_modal.page')}}</p>
                  <div class="w-14 h-14 flex-none image-fit rounded-full overflow-hidden mx-auto mt-2">
                    <a href="javascript:;" @click="selectPlatformPage(`sub_facebook${postfix}`)"><img alt="Midone Tailwind HTML Admin Template" :src="campaign?.[`sub_facebook_page${postfix}`].image"/></a>
                  </div>
                </div>
                
                <div class="mt-3" v-if="campaign?.[`sub_facebook_page${postfix}`]">
                  <!-- <p class="text-center">{{$t('campaign_list.enter_post_id_modal.enter_post_id')}}</p> -->
                  
                  <div style="display:flex;">
                    <input class="post_id" v-model="campaign[`sub_facebook_campaign${postfix}`].post_id"
                    :placeholder="$t('campaign_list.enter_post_id_modal.enter_post_id')"
                    :class="{ 'border-danger text-danger border-2': validate.sub_facebook.post_id.error }" @keyup="autoUpdatePostId('sub_facebook', postfix)"/>
                    <Tippy tag="a" href="javascript:;" class="absolute right-[40px] tooltip" :content="$t('campaign_list.enter_post_id_modal.search_recent_posts')" :options="{
                      theme: 'light',
                    }">
                    <SearchIcon class="absolute right-[-12px] z-10 click-icon" @click="popSelectLivePostOrVideoPostModal(`sub_facebook${postfix}`, campaign?.[`sub_facebook_page${postfix}`].id)"/></Tippy>
                  </div>
                  
                  <template v-if="validate.sub_facebook.post_id.error">
                    <label class="text-danger ml-2" >
                      invalid post id 
                    </label>
                  </template>
                </div>
              </div>
            </div>
          </template>
          <!--END SUB FACEBOOK_N -->



          <div v-if="activatedPlatformList.includes('instagram')" class="col-span-12 sm:col-span-4 p-3 lg:mx-0 sm:mx-1">
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
              <div class="mt-3" v-if="campaign.instagram_profile" @click="remove_platform_data('instagram')">
                <XIcon class="w-6 h-6 right-16 top-20 cursor-pointer absolute text-slate-500" />
                <p class="my-auto text-center">{{$t('campaign_list.enter_post_id_modal.profile')}}</p>
                <div class="w-14 h-14 flex-none image-fit rounded-full overflow-hidden mx-auto mt-2">
                  <a href="javascript:;" @click="selectPlatformPage('instagram')"><img alt="Midone Tailwind HTML Admin Template" :src="campaign.instagram_profile.image" /></a>
                </div>
              </div>
              <div class="mt-3" v-if="campaign.instagram_profile">
                <!-- <p class="text-center">{{$t('campaign_list.enter_post_id_modal.enter_post_id')}}</p> -->
                
                <div style="display:flex;">
                  <input class="post_id" v-model="campaign.instagram_campaign.live_media_id" :placeholder="$t('campaign_list.enter_post_id_modal.enter_post_id')"
                  :class="{ 'border-danger text-danger border-2': validate.instagram.post_id.error }" @keyup="autoUpdatePostId('instagram','instagram_campaign')" />
                  <Tippy tag="a" href="javascript:;" class="absolute right-[40px] tooltip" :content="$t('campaign_list.enter_post_id_modal.search_recent_posts')" :options="{
                    theme: 'light',
                  }">
                  <SearchIcon class="absolute right-[-12px] z-10 click-icon" @click="popSelectLivePostOrVideoPostModal('instagram', campaign.instagram_profile.id)"/></Tippy>
                </div>
                
                <template v-if="validate.instagram.post_id.error">
                  <label class="text-danger ml-2" >
                    invalid post id 
                  </label>
                </template>
              </div>
            </div>
          </div>

          <div v-if="activatedPlatformList.includes('youtube')" class="col-span-12 sm:col-span-4 p-3 lg:mx-0 sm:mx-1">
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
                {{$t('campaign_list.enter_post_id_modal.select_live_video')}}
              </button>
              <div class="mt-3" v-if="campaign.youtube_channel">
                <XIcon class="w-6 h-6 right-16 top-20 cursor-pointer absolute text-slate-500" @click="remove_platform_data('youtube')"/>
                <p class="my-auto text-center">{{$t('campaign_list.enter_post_id_modal.channel')}}</p>
                <div class="w-14 h-14 flex-none image-fit rounded-full overflow-hidden mx-auto mt-2">
                  <a href="javascript:;" @click="selectPlatformPage('youtube')"><img alt="Midone Tailwind HTML Admin Template" :src="campaign.youtube_channel.image" /></a>
                </div>
              </div>
              <div class="mt-3" v-if="campaign.youtube_channel">
                <div style="display:flex;">
                  <input class="post_id" v-model="campaign.youtube_campaign.live_video_id" 
                  :placeholder="$t('campaign_list.enter_post_id_modal.enter_post_id')"
                  :class="{ 'border-danger text-danger border-2': validate.youtube.post_id.error }" @keyup="autoUpdatePostId('youtube')"/>
                  <Tippy tag="a" href="javascript:;" class="absolute right-[40px] tooltip" :content="$t('campaign_list.enter_post_id_modal.search_recent_posts')" :options="{
                    theme: 'light',
                  }">
                  <SearchIcon class="absolute right-[-12px] z-10 click-icon" @click="popSelectLivePostOrVideoPostModal('youtube', campaign.youtube_channel.id)"/></Tippy>
                </div>
                
                <template v-if="validate.youtube.post_id.error">
                  <label class="text-danger ml-2" >
                    invalid post id 
                  </label>
                </template>
              </div>
            </div>
          </div>

          <div v-if="activatedPlatformList.includes('twitch')" class="col-span-12 sm:col-span-4 p-3 lg:mx-0 sm:mx-1">
            <div class="content">
              <div>
                <h5 class="text-lg font-medium text-center">{{$t('campaign_list.enter_post_id_modal.twitch')}}</h5>
              </div>
              <button
                type="button"
                v-if="!campaign.twitch_channel"
                @click="selectPlatformPage('twitch')"
                class="select_page btn rounded-full btn-primary lg:mt-10"
              >
                {{$t('campaign_list.enter_post_id_modal.select_live_video')}}
              </button>
              <div class="mt-3" v-if="campaign.twitch_channel">
                <XIcon class="w-6 h-6 right-16 top-20 cursor-pointer absolute text-slate-500" @click="remove_platform_data('twitch')"/>
                <p class="my-auto text-center">{{$t('campaign_list.enter_post_id_modal.channel')}}</p>
                <div class="w-14 h-14 flex-none image-fit rounded-full overflow-hidden mx-auto mt-2">
                  <a href="javascript:;" @click="selectPlatformPage('twitch')"><img alt="Midone Tailwind HTML Admin Template" :src="campaign.twitch_channel.image" /></a>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activatedPlatformList.includes('tiktok')" class="col-span-12 sm:col-span-4 p-3 lg:mx-0 sm:mx-1">
            <div class="content">
              <div>
                <h5 class="text-lg font-medium text-center">{{$t('campaign_list.enter_post_id_modal.tiktok')}}</h5>
              </div>
              <div class="mt-3">
                <p class="text-center">{{$t('campaign_list.enter_post_id_modal.enter_username')}}</p>
                <input class="post_id" v-model="campaign.tiktok_campaign.username" 
                :class="{ 'border-danger text-danger border-2': validate.tiktok.post_id.error }" @keyup="autoUpdatePostId('tiktok')"/>
                <template v-if="validate.tiktok.post_id.error">
                  <label class="text-danger ml-2" >
                    invalid username 
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

      <!-- BEGIN: Select Live Post or Video Post -->
        <SelectLivePostOrVideoPostModal/>
      <!-- END: Select Current Live -->

      <!-- BEGIN: Select Current Live -->
      <SelectPostModal/>
      <!-- END: Select Current Live -->
      
      <ModalFooter>
        <button
          type="button"
          class="w-32 bg-white btn dark:border-darkmode-400"
          @click="hideModal()"
        >
          {{$t('campaign_list.enter_post_id_modal.cancel')}}
        </button>
        <button type="button" class="w-32 ml-5 shadow-md btn btn-primary" @click="enterLive()" v-if="ready" :disabled="checking"
          v-show="campaign.facebook_page || campaign.youtube_channel || campaign.instagram_profile || campaign.twitch_channel || ![undefined,''].includes(campaign.tiktok_campaign.username)">

          {{$t('campaign_list.enter_post_id_modal.save')}}
        </button>
      </ModalFooter>
    </Modal>

</template>



<script setup>
import SelectPlatformPageModal from "./SelectPlatformPageModal.vue"
import SelectPostModal from "./SelectPostModal.vue"
import SelectLivePostOrVideoPostModal from "./SelectLivePostOrVideoPostModal.vue"
import { update_platform_live_id, delete_platform_live_id } from "@/api_v2/campaign"
import { check_facebook_page_post_exist } from "@/api_v2/facebook"
import { check_instagram_profile_post_exist } from "@/api_v2/instagram"
import { check_youtube_channel_post_exist } from "@/api_v2/youtube"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail"
import i18n from "@/locales/i18n"


import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance, watch, computed} from 'vue'

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const layoutStore = useLSSSellerLayoutStore();
const campaignDetailStore = useCampaignDetailStore();
const activatedPlatformList = ref(['facebook', 'youtube', 'instagram'])
const ready = ref(false)
const checking = ref(false)
const campaign = ref(null)
const validate = ref({
  "facebook": {
    "post_id": {
      "error": false
    },
  },
  "sub_facebook": {
    "post_id": {
      "error": false
    },
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
  },
  "twitch": {
    "post_id": {
      "error": false
    }
  },
  "tiktok": {
    "post_id": {
      "error": false
    }
  }
})
onMounted(()=>{
  if (layoutStore.userInfo?.user_subscription?.user_plan?.activated_platform) {
      activatedPlatformList.value = layoutStore.userInfo.user_subscription.user_plan.activated_platform
  }
  console.log(activatedPlatformList.value)
  eventBus.on('showEnterPostIDModal', (payload) => {
    showModal.value = true
    campaign.value = payload.campaign
    ready.value=true
  })
  eventBus.on('changeValidatStatus', (payload) => {
    validate.value[payload.platform]["post_id"]["error"] = false
  })
  eventBus.on('closEnterPostIDModal', (payload) => {
    hideModal()
  })
})

onUnmounted(()=>{
  eventBus.off('showEnterPostIDModal')
  eventBus.off('changeValidatStatus')
  eventBus.off('closEnterPostIDModal')
})

const router = useRouter()
const route = useRoute()


const showModal = ref(false)


const enterLive = ()=>{
  let valid = true;
  Object.entries(validate.value).forEach(([key, value]) => {
    if (value["post_id"]["error"]) {
      valid = false
    }
  });
  
  if (valid) {
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

let autosave_timer = null
const autoUpdatePostId = (platform, postFix) => {
  
  if (autosave_timer) {
    clearTimeout(autosave_timer);
  }
  autosave_timer = setTimeout(() => {updatePostId(platform, postFix)}, 500); 
}
const updatePostId = (platform, postFix) => {
  checking.value = true;
  let page_id = null
  let live_id = null
  let username = null
  let apiRequest = null
  let data = {}
  if (platform === "facebook") {
    page_id = campaign.value.facebook_page.id
    live_id = campaign.value.facebook_campaign.post_id
    data = {"platform": platform, "platform_id": page_id, "post_id": live_id}
    apiRequest = check_facebook_page_post_exist(page_id, live_id, layoutStore.alert)
  } else if (platform === "sub_facebook") {
    page_id = campaign.value?.[`sub_facebook_page${postFix||''}`].id
    live_id = campaign.value?.[`sub_facebook_campaign${postFix||''}`].post_id
    data = {"platform": platform, "platform_id": page_id, "post_id": live_id}
    apiRequest = check_facebook_page_post_exist(page_id, live_id, layoutStore.alert)
  } else if (platform === "instagram") {
    page_id = campaign.value.instagram_profile.id
    live_id = campaign.value.instagram_campaign.live_media_id
    data = {"platform": platform, "platform_id": page_id, "post_id": live_id}
    apiRequest = check_instagram_profile_post_exist(page_id, live_id, layoutStore.alert)
  } else if (platform === "youtube") {
    page_id = campaign.value.youtube_channel.id
    live_id = campaign.value.youtube_campaign.live_video_id
    data = {"platform": platform, "platform_id": page_id, "post_id": live_id}
    apiRequest = check_youtube_channel_post_exist(page_id, live_id, layoutStore.alert)
  } else if (platform === "tiktok") {
    username = campaign.value.tiktok_campaign.username
    data = {"platform": platform, "username": username}
    apiRequest = false
    if (((![undefined, ""].includes(username)) && (username.charAt(0) != "@")) || (username === "@")) {
      validate.value[platform]["post_id"]["error"] = true
      return
    } else {
      validate.value[platform]["post_id"]["error"] = false
    }
  }

  if ([undefined, ""].includes(live_id)) {
    checking.value = false
    validate.value[platform]["post_id"]["error"] = false
    return
  }

  if (!apiRequest) {
    checking.value = false
    return update_platform_live_id(campaign.value.id, data, layoutStore.alert)
  }
  apiRequest.then(res=>{
    checking.value = false
    return res.data
  }).then(res=>{
    if (res.success_response) {
      validate.value[platform]["post_id"]["error"] = false
      return update_platform_live_id(campaign.value.id, data, layoutStore.alert)
    } else {
      validate.value[platform]["post_id"]["error"] = true
    }
  })
}

const remove_platform_data =  (platform)=>{ 
  delete_platform_live_id(campaign.value.id, platform, layoutStore.alert).then( res=>{
    Object.entries(res.data).forEach(([key,value]) => {
      campaign.value[key]=value                       //proxy object only got setter
    });
    layoutStore.notification.showMessageToast(i18n.global.t('campaign_list.enter_post_id_modal.disconnected'))
  })
}

const listIgPosts = () => {
  console.log(campaign.value)
  eventBus.emit("showSelectPostsModal", {'platform': 'instagram', 'page': campaign.value['instagram_profile'], 'campaign': campaign.value})
}

const popSelectLivePostOrVideoPostModal = (platform, platform_id) => {
  eventBus.emit("popSelectLivePostOrVideoPostModal", {'platform': platform, 'platform_id': platform_id, 'campaign': campaign.value})
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
