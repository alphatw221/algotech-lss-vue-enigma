<template>
  <Modal :show="show"
      size="modal-sm"
      backdrop="static"
      @hidden="hide()">
      <XIcon class="w-8 h-8 text-slate-400 cursor-pointer absolute right-2 top-2" @click="hide()" />
      <ModalBody class="text-left content-center">
          <!--select live post-->
            <button
              type="button"
              style="display:block"
              @click="selectLivePost()"
              class="btn  btn-primary w-3/4 p-5 mx-auto my-4"
            >
              {{$t('campaign_list.enter_post_id_modal.select_live_post')}}
            </button>
            <!--select video post-->
            <button
              type="button"
              style="display:block"
              @click="selectVideoPost()"
              class="btn  btn-primary w-3/4 p-5 mx-auto my-4"
            >
              {{$t('campaign_list.enter_post_id_modal.select_video_post')}}
            </button>
      </ModalBody>
    </Modal>
</template>

<script setup>

import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue';
import i18n from '@/locales/i18n';
import { useRoute, useRouter } from "vue-router";
import { check_facebook_page_token_valid } from "@/api_v2/facebook"
import { check_instagram_profile_token_valid } from "@/api_v2/instagram"
import { check_youtube_channel_token_valid } from "@/api_v2/youtube"
import { check_twitch_channel_token_valid } from "@/api_v2/twitch"
import { update_platform_live_id } from "@/api_v2/campaign"
import { get_user_subscription_facebook_pages, get_user_subscription_instagram_profiles, get_user_subscription_youtube_channels, get_user_subscription_twitch_channels } from "@/api/user_subscription"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const router = useRouter();
const internalInstance = getCurrentInstance()
const sellerLayoutStore = useLSSSellerLayoutStore();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const pages = ref([])
const show = ref(false)
const payloadBuffer = ref({})
const postType = ref('')
onMounted(()=>{
  eventBus.on('popSelectLivePostOrVideoPostModal', (payload)=>{
    payloadBuffer.value = payload
    show.value = true
  })
})

onUnmounted(()=>{
  eventBus.off('popSelectLivePostOrVideoPostModal')
})

const selectLivePost = () => {
  postType.value = "live"
  payloadBuffer.value['post_type'] = postType.value
  eventBus.emit("showSelectPostsModal", payloadBuffer.value)
  show.value = false
}

const selectVideoPost = () => {
  postType.value = "video"
  payloadBuffer.value['post_type'] = postType.value
  eventBus.emit("showSelectPostsModal", payloadBuffer.value)
  show.value = false
}

const hide = () => {
  show.value = false
  postType.value = ''
  payloadBuffer.value = {}
}
</script>
<style scoped>
.selectPage {
cursor: pointer;
}
.selectPage:hover {
background-color: whitesmoke;
}
.modal.show > .modal-dialog {
  margin-top: 10rem;
}

</style>
