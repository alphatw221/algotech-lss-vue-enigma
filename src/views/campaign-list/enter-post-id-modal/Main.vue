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

          <div class="col-span-12 mr-5 sm:col-span-4">
            <div class="items-end h-10" style="display: inline-flex">
              <label for="modal-form-1" class="text-lg font-medium mr-5"
                >{{$t('campaign_list.enter_post_id_modal.facebook')}}</label
              >
              <div
                v-if="campaign.facebook_page"
                class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
              >
                <img alt="Midone Tailwind HTML Admin Template" :src="campaign.facebook_page.image" />
              </div>
            </div>
            <button
              type="button"
              href="javascript:;"
              @click="selectPlatformPage('facebook')"
              class="btn w-full btn-primary mt-3 mr-3 sm:w-40"
            >
              {{$t('campaign_list.enter_post_id_modal.select_page')}}
            </button>
            <div>
              {{$t('campaign_list.enter_post_id_modal.post_id')}}: <br>
              <input class="post_id" v-if="campaign.facebook_page" v-model="campaign.facebook_campaign.post_id" @focusout="autoUpdatePostId('facebook', campaign.facebook_page.id, campaign.facebook_campaign.post_id)">
            </div>
          </div>
          <div class="col-span-12 sm:col-span-4 mr-5">
            <div class="items-end h-10" style="display: inline-flex">
              <label for="modal-form-1" class="text-lg font-medium mr-5"
                >{{$t('campaign_list.enter_post_id_modal.instagram')}}</label
              >
              <div
                v-if="campaign.instagram_profile"
                class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
              >
                <img alt="Midone Tailwind HTML Admin Template" :src="campaign.instagram_profile.image" />
              </div>
            </div>
            <button
              type="button"
              href="javascript:;"
              @click="selectPlatformPage('instagram')"
              class="btn w-full btn-primary mt-3 mr-3 sm:w-40"
            >
              <!-- Select Profile -->
              {{$t('campaign_list.enter_post_id_modal.select_media')}}
            </button>
            <!-- <input
              id="modal-form-1"
              type="text"
              class="form-control"
              placeholder=""
              v-model="ig_live_media_id"
              @click="instagramSelectCurrentLive()"
            /> -->
            <div>
              {{$t('campaign_list.enter_post_id_modal.media_id')}}:<br>
              <input class="post_id" v-if="campaign.instagram_profile" v-model="campaign.instagram_campaign.live_media_id" @focusout="autoUpdatePostId('instagram', campaign.instagram_profile.id, campaign.instagram_campaign.live_media_id)">
            </div>
          </div>
          <div class="col-span-12 sm:col-span-4 mr-5">
            <div class="items-end h-10" style="display: inline-flex">
              <label for="modal-form-1" class="text-lg font-medium mr-5"
                >{{$t('campaign_list.enter_post_id_modal.youtube')}}</label
              >
              <div
                v-if="campaign.youtube_channel"
                class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
              >
                <img alt="Midone Tailwind HTML Admin Template" :src="campaign.youtube_channel.image" />
              </div>
            </div>
            <button
              type="button"
              href="javascript:;"
              @click="selectPlatformPage('youtube')"
              class="btn w-full btn-primary mt-3 mr-3 sm:w-40"
            >
              {{$t('campaign_list.enter_post_id_modal.select_live_chat')}}
            </button>
            <!-- <input
              id="modal-form-1"
              type="text"
              class="form-control"
              placeholder=""
              v-model="yt_live_video_id"
              @click="youtubeSelectCurrentLive()"
            /> -->
            <div>
              {{$t('campaign_list.enter_post_id_modal.live_chat_id')}}:<br>
              <input class="post_id" v-if="campaign.youtube_channel" v-model="campaign.youtube_campaign.live_video_id" @focusout="autoUpdatePostId('youtube', campaign.youtube_channel.id, campaign.youtube_campaign.live_video_id)">
            </div>
          </div>

        </template>
        <div class="col-span-12 items-end" style="display: inline-flex">
          
        </div>
        
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


import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue'

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const ready = ref(false)
const campaign = ref(null)
onMounted(()=>{
    eventBus.on('showEnterPostIDModal', (payload) => {
      console.log("-------------")
      showModal.value = true
      campaign.value = payload.campaign
      console.log(campaign.value)
      ready.value=true
    })
})

onUnmounted(()=>{
  eventBus.off('showEnterPostIDModal')
})

const router = useRouter()
const route = useRoute()


const showModal = ref(false)


const enterLive = ()=>{
  router.push({name:'campaign-live',params:{'campaign_id':campaign.value.id}})
  hideModal()
}

const hideModal = ()=>{
  ready.value = false
  campaign.value = null
  showModal.value = false
}


const selectPlatformPage = (platform)=>{
  eventBus.emit('showSelectPlatformModal',{'platform':platform, 'campaign':campaign.value})
}

const autoUpdatePostId = (platform, page_id, live_id) => {
  update_platform_live_id(campaign.value.id, platform, page_id, live_id).then(res=>{
    console.log(res)
    // campaign.value.data=res.data    //test 
    
  })
}

</script>
<style scoped>
.post_id {
  border:0;
  outline: 0;
  padding: 4px;
  height: auto;
  border-bottom: 1px solid black;
}
.post_id:focus {
  background-color: aliceblue;
  transition: 0.5s ease;
}
</style>
