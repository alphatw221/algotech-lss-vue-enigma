<template>

    <!--Modal Enter Post ID -->
    <Modal
      size="modal-lg"
      :show="show"
      @hidden="hide()"
      v-if="ready"
    >
      <ModalHeader>
        <h2 class="font-medium text-base mr-auto">Select Live Stream</h2>
        <a
          @click="hide()"
          class="absolute right-0 top-0 mt-3 mr-3"
          href="javascript:;"
        >
          <XIcon class="w-8 h-8 text-slate-400" />
        </a>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12 items-end" style="display: inline-flex">
          
        </div>
        <div class="col-span-12 mr-5 sm:col-span-4">
          <div class="items-end h-10" style="display: inline-flex">
            <label for="modal-form-1" class="text-lg font-medium mr-5"
              >Facebook</label
            >
            <div
              v-if="campaignsRef.value[campaign_index].facebook_page"
              class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
            >
              <img alt="Midone Tailwind HTML Admin Template" :src="campaignsRef.value[campaign_index].facebook_page.image" />
            </div>
          </div>
          <button
            type="button"
            href="javascript:;"
            @click="selectPlatformPage('facebook')"
            class="btn w-full btn-primary mt-3 mr-3 sm:w-40"
          >
            Select Page
          </button>
          <div>
            Post ID: <br>
            <p v-if="campaignsRef.value[campaign_index].facebook_page">{{ campaignsRef.value[campaign_index].facebook_campaign.post_id }}</p>
          </div>
        </div>
        <div class="col-span-12 sm:col-span-4 mr-5">
          <div class="items-end h-10" style="display: inline-flex">
            <label for="modal-form-1" class="text-lg font-medium mr-5"
              >Instagram</label
            >
            <div
              v-if="campaignsRef.value[campaign_index].instagram_profile"
              class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
            >
              <img alt="Midone Tailwind HTML Admin Template" :src="campaignsRef.value[campaign_index].instagram_profile.image" />
            </div>
          </div>
          <button
            type="button"
            href="javascript:;"
            @click="selectPlatformPage('instagram')"
            class="btn w-full btn-primary mt-3 mr-3 sm:w-40"
          >
            Select Page
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
            Post ID:<br>
             <p v-if="campaignsRef.value[campaign_index].instagram_campaign">{{ campaignsRef.value[campaign_index].instagram_campaign.live_media_id }}</p>
          </div>
        </div>
        <div class="col-span-12 sm:col-span-4 mr-5">
          <div class="items-end h-10" style="display: inline-flex">
            <label for="modal-form-1" class="text-lg font-medium mr-5"
              >YouTube</label
            >
            <div
              v-if="campaignsRef.value[campaign_index].youtube_channel"
              class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
            >
              <img alt="Midone Tailwind HTML Admin Template" :src="campaignsRef.value[campaign_index].youtube_channel.image" />
            </div>
          </div>
          <button
            type="button"
            href="javascript:;"
            @click="selectPlatformPage('youtube')"
            class="btn w-full btn-primary mt-3 mr-3 sm:w-40"
          >
            Select Page
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
            Post ID:<br>
            <p v-if="campaignsRef.value[campaign_index].youtube_campaign">{{ campaignsRef.value[campaign_index].youtube_campaign.live_video_id }}</p>
          </div>
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
          class="btn btn-outline-secondary w-20 mr-1"
          @click="hide()"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-primary w-20" @click="enterLive()" 
          v-show="campaignsRef.value[campaign_index].facebook_page || campaignsRef.value[campaign_index].youtube_channel || campaignsRef.value[campaign_index].instagram_profile">

          Continue
        </button>
      </ModalFooter>
    </Modal>

</template>



<script setup>
import SelectPlatformPageModal from "./SelectPlatformPageModal.vue"
import SelectCurrentLiveModal from "./SelectCurrentLiveModal.vue"

import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue'

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const ready = ref(false)
const campaign_index = ref(null)
const campaignsRef = ref(null)

onMounted(()=>{
    eventBus.on('showEnterPostIDModal', (payload) => {
      show.value = true
      campaign_index.value = payload.campaign_index
      campaignsRef.value = payload.campaignsRef
      ready.value=true
    })
})

onUnmounted(()=>{
  eventBus.off('showEnterPostIDModal')
})

const router = useRouter()
const route = useRoute()


const show = ref(false)


const enterLive = ()=>{
  router.push({name:'campaign-live',params:{'campaign_id':campaignsRef.value.value[campaign_index.value].id}})
  hide()
}

const hide = ()=>{
  show.value = false
  ready.value = false
  campaign_index.value = null
  campaignsRef.value = null
}


const selectPlatformPage = (platform)=>{
  eventBus.emit('showSelectPlatformModal',{'platform':platform, 'campaignsRef':campaignsRef.value, 'campaign_index':campaign_index.value})
}

</script>
