<template>
    <Modal :show="props.show" @hidden="emits('hide')">
      <a
        @click="emits('hide')"
        class="absolute right-0 top-0 mt-3 mr-3"
        href="javascript:;"
      >
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
      <ModalBody class="p-0">
        <div class="p-5 text-center">
          <div class="text-xl mt-5">
            Please enter post ID to start live selling.
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button type="button" @click="emits('comfirm')" class="btn btn-primary w-24">
            Comfirm
          </button>
        </div>
      </ModalBody>
    </Modal>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"


import { ref, onMounted, onUnmounted, defineProps, defineEmits} from 'vue'

const props = defineProps({
    show:Boolean,
});
const emits = defineEmits(['hide','comfirm'])


import { useLSSCampaignListStore } from "@/stores/lss-campaign-list"
const store = useLSSCampaignListStore()


</script>
