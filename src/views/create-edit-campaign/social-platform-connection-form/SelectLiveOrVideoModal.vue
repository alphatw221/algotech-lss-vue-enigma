<template>
  <Modal   
      :show="props?.show"
      @hidden="props?.hide()"
      size="modal-sm"
      backdrop="static"
  >
      <XIcon class="w-8 h-8 text-slate-400 cursor-pointer absolute right-2 top-2" @click="props?.hide()" />
      <ModalBody class="text-left content-center">

            <button
              type="button"
              style="display:block"
              @click="props?.selectLive()"
              class="btn  btn-primary w-3/4 p-5 mx-auto my-4"
            >
              {{$t('campaign_list.enter_post_id_modal.select_live_video')}}
            </button>

            <button
              type="button"
              style="display:block"
              @click="props?.selectVideo()"
              class="btn  btn-primary w-3/4 p-5 mx-auto my-4"
            >
              {{$t('campaign_list.enter_post_id_modal.select_video_post')}}
            </button>
      </ModalBody>
    </Modal>
</template>

<script setup>

import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue';



const props = defineProps({
  show:Boolean,
  hide:Function,
  selectLive:Function,
  selectVideo:Function,
})





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
