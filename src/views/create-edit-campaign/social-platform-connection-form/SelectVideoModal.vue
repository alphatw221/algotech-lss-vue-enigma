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

          <div v-if="items.length<=0" class="h-[200px] flex flex-col justify-center items-center text-base ">
              <h3>No Video Post Found</h3>
          </div>

          <div class="intro-y grid grid-cols-12 gap-3 my-0" v-else>

          

            <template v-for="post,index in items" :key="index">
              <div class="col-span-12 post_frame">
                <div class="select_live flex-none rounded-md overflow-hidden">

                  <div class="flex flex-row justify-between items-center">
                    <span class="text-lg ">
                      {{ post.title }}
                    </span>
                    <span class="text-sm ">
                      {{ datetimeReformat(post?.created_time) }}
                    </span>
                  </div>
                 
                  <template v-if="post?.url" >
                    <iframe 
                      allow="clipboard-write; encrypted-media; picture-in-picture; web-share" 
                      allowfullscreen="true" 
                      frameborder="0" 

                      scrolling="no" 
                      :src="post?.url"
                      style="border:none;overflow:hidden" 
                      class="w-full h-[250px]"
                    >
                    </iframe>
                  </template>

                 
                 
                  <div class="text-center mt-2">
                    <button type="button" href="javascript:;" class="btn btn-primary mr-3" @click="props.select(post)">{{$t('campaign_list.enter_post_id_modal.select_this_live')}}</button>
                  </div>

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