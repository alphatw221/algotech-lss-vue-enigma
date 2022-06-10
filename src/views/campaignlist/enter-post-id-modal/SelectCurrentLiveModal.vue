<template>
    <Modal
        :show="props.show"
        @hidden="emits('hide')"
      >
        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <template v-for="live in lives" :key="live.id">
              <div
                class="
                  flex-none
                  rounded-md
                  overflow-hidden
                  col-start-1 col-span-12
                "
                @click="selectLive(live.id)"  style="cursor: pointer"
              >
                <template v-if="live.embed_html">
                  <div v-html="live.embed_html" style="z-index: 0"></div>
                </template>
                <template v-else-if="live.image">
                  <img
                    alt=""
                    :src="live.image"
                    style="z-index: 0"
                  />
                </template>
              </div>
              <span
                class="col-span-6 text-lg content-center"
                @click="selectLive(live.id)"  style="cursor: pointer"
              >
                {{ live.title }}
              </span>
            </template>
          </div>
        </ModalBody>
      </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits} from 'vue'

const props = defineProps({
    show:Boolean,
    lives: Array,
    currentPlatform:String
});

const emits = defineEmits(['hide','selectLive'])

const selectLive = live_id => {
    emits('selectLive', {'live_id':live_id,'platform':props.currentPlatform})
}

</script>