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
          ...
        </div>
      </ModalBody>
    </Modal>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, onUnmounted, getCurrentInstance} from 'vue'
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const show = ref(false)
onMounted(()=>{
    eventBus.on('showDiscriptionModal', (payload) => {
      show.value = true
  })
})

onUnmounted(()=>{
  eventBus.off('showDiscriptionModal')
})


</script>
