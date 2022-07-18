<template>
    <Modal :show="show"
        @hidden="hide()">
        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <template v-for="page,index in pages" :key="index">
              <div
                @click="selectPage(index)"
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
                @click="selectPage(index)"
                class="col-start-4 col-span-8 text-lg content-center"
              >
                {{ page.name }}
              </span>
            </template>
          </div>
        </ModalBody>
      </Modal>
</template>

<script setup>

import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue'
import { check_facebook_page_token_valid } from "@/api/facebook"
import { check_instagram_profile_token_valid } from "@/api/instagram"
import { check_youtube_channel_token_valid } from "@/api/youtube"
import { get_user_subscription_facebook_pages, get_user_subscription_instagram_profiles, get_user_subscription_youtube_channels } from "@/api/user_subscription"

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const pages = ref([])
const show = ref(false)

const payloadBuffer = ref({})
onMounted(()=>{
    eventBus.on('showSelectPlatformModal', (payload) => {
      payloadBuffer.value = payload
      let apiRequest =null
      if(payload.platform=='facebook'){
        apiRequest = get_user_subscription_facebook_pages
      }else if(payload.platform=='youtube'){
        apiRequest = get_user_subscription_youtube_channels
      }else if(payload.platform=='instagram'){
        apiRequest = get_user_subscription_instagram_profiles
      }
      apiRequest().then((res)=>{
        show.value = true
        pages.value = res.data
      })

  })
})

onUnmounted(()=>{
  eventBus.off('showSelectPlatformModal')
})

const selectPage = index => {
  payloadBuffer.value.page=pages.value[index]
  let apiRequest=null
  if(payloadBuffer.value.platform=='facebook'){
    apiRequest = check_facebook_page_token_valid
  }else if(payloadBuffer.value.platform=='youtube'){
    apiRequest = check_youtube_channel_token_valid
  }else if(payloadBuffer.value.platform=='instagram'){
    apiRequest = check_instagram_profile_token_valid
  }
  apiRequest(pages.value[index].id).then(res=>{
    payloadBuffer.value.platformInstance = res.data
    eventBus.emit('showSelectLiveModal',payloadBuffer.value)
    hide()
  })

}

const hide=()=>{
  show.value=false
  pages.value=[]
}
</script>
