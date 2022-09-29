<template>
    <Modal backdrop="static" :show="show" @hidden="show=false">
      <a
        @click="show=false"
        class="absolute right-0 top-0 mt-3 mr-3"
        href="javascript:;"
      >
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
      <ModalBody class="p-0">
        <div class="p-5 text-center">
          <div class="text-xl mt-5">
            {{$t('campaign_list.remind_enter_post_id_modal.message')}}
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button type="button" @click="confirm()" class="btn btn-primary w-24">
            {{$t('campaign_list.remind_enter_post_id_modal.confirm')}}
          </button>
        </div>
      </ModalBody>
    </Modal>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"


import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue'
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

let payloadBuffer = null
const show = ref(false)
onMounted(()=>{
    eventBus.on('showRemindEnterPostIDModal', (payload) => {
      show.value = true
      payloadBuffer = payload
  })
})

onUnmounted(()=>{
  eventBus.off('showRemindEnterPostIDModal')
})

const confirm =()=>{
  eventBus.emit('showEnterPostIDModal',payloadBuffer)
  show.value = false
}
// import { useLSSCampaignListStore } from "@/stores/lss-campaign-list"
// const store = useLSSCampaignListStore()


</script>
