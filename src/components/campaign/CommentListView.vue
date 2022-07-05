<template>
    <div class="overflow-y-auto" :id="props.platformName+'-comment-listview'" @scroll="handleScroll($event)">
        
        <!-- <template> </template> -->
        <div v-for="(comment, index) in comments" :key="index"
            class="intro-x cursor-pointer relative flex items-center m-1 p-2 box rounded-l-full"
            
            :class="{
                  'border-r-8 border-[#3c599b]': comment.platform === 'facebook',
                  'border-r-8 border-[#d63376]': comment.platform === 'instagram',
                  'border-r-8 border-[#f70000]': comment.platform === 'youtube',
                }"
            
            @click="showReplyBar(comment)">
            <Tippy class="rounded-full " content="Reply" theme='light'>
                <div class="relative flex items-center w-full ">
                    <div class="w-14 h-14 flex-none image-fit mr-1">
                    <img alt="" class="rounded-full zoom-in" :src="comment.image" />
                    </div>
                
                    <div class="ml-2 overflow-hidden w-full">
                        <div class="flex items-center">
                            <a class="font-medium text-sky-900 font-bold">{{ comment.customer_name }}</a>
                            <div class="text-xs text-slate-400 ml-auto"></div>
                        </div>
                        <div class="text-slate-900 mt-0.5">
                            {{ comment.message }}
                        </div>
                    </div>
                </div>
            </Tippy>
        </div>
    </div>
    <template v-if="showModal">
        <ReplyModal :replyTo="reply" :openChat="showModal" v-on:hide="showModal = false" :pageId="page_id"/>
    </template>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance, watch, computed} from 'vue'
import { createCommentPaginator } from '@/api_v2/campaign_comment'
import { useRoute, useRouter } from "vue-router"
import ReplyModal from './modals/ReplyModal.vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const router = useRouter()
const route = useRoute()

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const props = defineProps({
    platformName: Object,
});

const commentPaginator = createCommentPaginator(route.params.campaign_id, props.platformName)
const comments = ref([])

let fetchingData = false
onMounted(()=>{
    updateComments()
    eventBus.on("changeCommentData", (payload) => {
        updateComments()
    });
})

onUnmounted(()=>{
})

const updateComments= () =>{
    commentPaginator.getData().then(res=>{
        comments.value = res.data.results
    })
}

const handleScroll = event=>{
    if(!fetchingData && event.target.scrollTop > ((event.target.scrollHeight*3)/4) && commentPaginator.gotNext){
        fetchingData = true
        commentPaginator.nextPage().then(res=>{
            comments.value = comments.value.concat(res.data.results)
            fetchingData = false
        })

    }
}

const reply= ref([])
const showModal= ref(false)
const layoutStore = useLSSSellerLayoutStore();
const showReplyBar =(e)=> {
    reply.value = e;
    if(reply.value.platform === 'facebook'){
        showModal.value = true;
    }else{
        layoutStore.alert.showMessageToast("This function is under developing...");
    }
}

</script>
 