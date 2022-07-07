<template>
    <LoadingIcon icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] body-middle" :class="{ hidden: showCommentLoding}"/>
    <div class="overflow-y-auto h-fit" :id="props.platformName+'-comment-listview'" @scroll="handleScroll($event)">
        
        <!-- <template> </template> -->
        <div v-for="(comment, index) in comments" :key="index"
            class="relative flex items-center p-2 m-1 rounded-l-full cursor-pointer intro-x box"
            
            :class="{
                  'border-r-8 border-[#3c599b]': comment.platform === 'facebook',
                  'border-r-8 border-[#d63376]': comment.platform === 'instagram',
                  'border-r-8 border-[#f70000]': comment.platform === 'youtube',
                }"
            
            @click="showReplyBar(comment)">
            <div v-if="comment.platform === 'instagram' || comment.platform === 'youtube' " class="relative flex items-center w-full cursor-auto">
                <div class="flex-none mr-1 w-14 h-14 image-fit">
                <img v-if="comment.platform !== 'instagram'" class="rounded-full" :src="comment.image" />
                <img v-else class="rounded-full" :src="igAvatar" />
                </div>
                <div class="w-full ml-2 overflow-hidden">
                    <div class="flex items-center">
                        <a class="font-medium text-sky-900">{{ comment.customer_name }}</a>
                        <div class="ml-auto text-xs text-slate-400"></div>
                    </div>
                    <div class="text-slate-900 mt-0.5">
                        {{ comment.message }}
                    </div>
                </div>
            </div>
            <Tippy v-else class="rounded-full " content="Reply" theme='light'>
                <div class="relative flex items-center w-full ">
                    <div class="flex-none mr-1 w-14 h-14 image-fit">
                        <img class="rounded-full zoom-in" :src="comment.image" />
                    </div>
                    <div class="w-full ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a class="font-medium text-sky-900">{{ comment.customer_name }}</a>
                            <div class="ml-auto text-xs text-slate-400"></div>
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
        <ReplyModal :replyTo="reply" :openChat="showModal" v-on:hide="showModal = false" :pageId="props.pageId"/>
    </template>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance, watch, computed} from 'vue'
import { createCommentPaginator } from '@/api_v2/campaign_comment'
import { get_summerize_comments } from "@/api/campaign_comment"
import { useRoute, useRouter } from "vue-router"
import ReplyModal from './modals/ReplyModal.vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import igAvatar from '@/assets/images/lss-icon/icon-user-ig.svg'

const router = useRouter()
const route = useRoute()

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const props = defineProps({
    platformName: Object,
    pageId: String,
});

const commentPaginator = createCommentPaginator(route.params.campaign_id, props.platformName)
const comments = ref([])
const showCommentLoding = ref(true)

let fetchingData = false
onMounted(()=>{
    updateComments()
    eventBus.on("changeCommentData", (payload) => {
        updateComments()
    });
    eventBus.on("getbackNormalComments", (payload) => {
        updateComments()
    });
    eventBus.on(`${props.platformName}_commentSummurizerTrigger`, (payload) => {
        get_campaign_summerize_comments(payload.status);
    });
})

onUnmounted(()=>{
    eventBus.off(`${props.platformName}_commentSummurizerTrigger`)
})

const updateComments= () =>{
    showCommentLoding.value = false
    commentPaginator.getData().then(res=>{
        comments.value = res.data.results
        showCommentLoding.value = true
    }).catch(err=>{
        showCommentLoding.value = true
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

const get_campaign_summerize_comments = (status) => {
    showCommentLoding.value = false
    get_summerize_comments(route.params.campaign_id, status)
    .then((response) => {
        console.log(response);
        comments.value = response.data
        showCommentLoding.value = true
    })
    .catch((error) => {
        console.log(error);
        showCommentLoding.value = true
    });
}

</script>
<style scoped>
.body-middle {
    left: calc(50% - 30px);
    top:60%;
    z-index: 999;
}
</style>
 