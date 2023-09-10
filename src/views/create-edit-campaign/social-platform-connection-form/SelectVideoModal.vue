<template>
    <Modal
      size="modal-md"
      backdrop="static"
      :show="props?.show"
      @hidden="props?.hide()"
      @show="getSocialPlatformData()"

    >
        <ModalHeader>
    
            <h2 class="mr-auto text-base font-medium">{{$t('campaign_list.enter_post_id_modal.your_current_video_posts')}}</h2>

          
          <a
            @click="props?.hide()"
            class="absolute top-0 right-0 mt-3 mr-3"
          >
            <XIcon class="w-8 h-8 text-slate-400" />
          </a>
        </ModalHeader>

        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-3 my-0">
            <template v-for="post,index in items" :key="index">
              <div class="col-span-12 post_frame">
                <button type="button" href="javascript:;" class="btn btn-primary mr-3" @click="props.select(post)">{{$t('campaign_list.enter_post_id_modal.select_this_live')}}</button>
                <div class="select_live flex-none rounded-md overflow-hidden">
                  <span class="col-span-6 text-lg content-center">
                    {{ post.title }}
                  </span>
                  <p class="col-span-6 text-sm content-center">
                    {{ datetimeReformat(post?.created_time) }}
                  </p>
                 
                  <template v-if="post?.embeddable && urlPattern.exec(post.embed_html)" >
                    <iframe 
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                      allowfullscreen="true" 
                      frameborder="0" 
                      height="200" 
                      scrolling="no" 
                      :src="urlPattern.exec(post.embed_html)[1]"
                      style="border:none;overflow:hidden" 
                      width="200">
                    </iframe>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </ModalBody>
      </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance} from 'vue'
import { get_social_platform_account_videos} from '@/api_v3/social_platform_account'

const props = defineProps({
  show:Boolean,
  hide:Function,
  socialPlatformAccount:Object,
  select:Function
})



const items = ref([])

const getSocialPlatformData = ()=>{
  get_social_platform_account_videos(props.socialPlatformAccount?.uuid).then((res)=>{
    console.log(res.data)
    items.value = res?.data||[]

  })
}




const datetimeReformat = (datetime_string) => {
  return new Date(datetime_string).toLocaleTimeString('en-us', {
    year: "numeric", month: "short", hour12: false,
    day: "numeric", hour: '2-digit', minute: '2-digit'
  })
}

var urlPattern = /src="([^"]+)"/;

</script>
<style scoped>
.post_frame {
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid rgb(109, 109, 182);
  border-radius: 16px;
}

</style>