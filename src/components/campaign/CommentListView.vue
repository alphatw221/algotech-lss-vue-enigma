<template>

    <div class="sticky z-50 flex-wrap justify-start bg-white -top-1 h-fit" v-show="props.platformName=='commentSummarize'">
        <button class="m-1 shadow-sm btn btn-danger w-fit tags" @click="commentSummarizer('delivery')">
            <HashIcon class="w-4 h-4 mr-2" /> {{$t('campaign_live.comment.delivery')}}
        </button>
        <button class="m-1 shadow-sm btn btn-pending w-fit tags" @click="commentSummarizer('payment')">
            <HashIcon class="w-4 h-4 mr-2" /> {{$t('campaign_live.comment.payment')}}
        </button>
        <button class="m-1 shadow-sm btn btn-warning w-fit tags" @click="commentSummarizer('neutro')">
            <HashIcon class="w-4 h-4 mr-2" /> {{$t('campaign_live.comment.other')}}
        </button>
        <!-- <button class="m-1 shadow-sm btn btn-dark w-fit tags" @click="commentSummarizer('Undefined')">
            <HashIcon class="w-4 h-4 mr-2" /> Undefined
        </button> -->
        <div class="flex"> 
            <h2 v-if="tags !== ''" class="p-1 mb-2">{{$t('campaign_live.comment.select_tag')}}: {{ $t(`campaign_live.comment.`+tags) }}</h2>
            <button class="flex p-1 ml-auto w-18 text-slate-900"
                @click="commentSummarizer('')">
                <XIcon class="w-4 h-4" /> {{$t('campaign_live.comment.clear')}}
            </button> 
        </div>
    </div>

    <LoadingIcon icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] body-middle" v-show="fetchingData"/>
    <div class="absolute top-[50%] right-[50%] text-slate-500 text-sm md:text-lg translate-x-1/2 w-fit" v-if="props.platformName=='commentSummarize' && !fetchingData && comments.length==0">
        {{ $t('campaign_live.comment.comment_message_1',{ tag : tags!==''?$t(`campaign_live.comment.`+tags):'' }) }}
    </div>
    <div class="absolute top-[50%] right-[50%] text-slate-500 text-sm md:text-lg translate-x-1/2 w-fit" v-else-if="props.platformName=='all' && !fetchingData && comments.length==0">
        {{ $t('campaign_live.comment.comment_message_2',{ platformName : '' }) }}
    </div>
    <div class="absolute top-[50%] right-[50%] text-slate-500 text-sm md:text-lg translate-x-1/2 w-fit" v-else-if="!fetchingData && comments.length==0">
        {{ $t('campaign_live.comment.comment_message_2',{ platformName : platformName }) }}
    </div>
    <!-- <div class="overflow-y-auto h-fit" :id="props.platformName+'-comment-listview'" @scroll="handleScroll($event)"> -->
        <!-- temporary solution -->
    <div class="overflow-y-scroll h-fit scrollbar-hidden"  @scroll="handleScroll($event)">

        <div v-for="(comment, index) in comments" :key="index"
            class="relative flex items-center p-2 m-1 rounded-l-full cursor-pointer intro-x box comments"
            
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
                <div class="relative flex items-center w-full">
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
            <MoreHorizontalIcon  class="hide w-6 h-6 ml-auto z-50" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance, watch, computed} from 'vue'
import { createCommentPaginator } from '@/api_v2/campaign_comment'
import { get_summerize_comments } from "@/api/campaign_comment"
import { useRoute, useRouter } from "vue-router"
// import ReplyModal from './modals/ReplyModal.vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import igAvatar from '@/assets/images/lss-icon/icon-user-ig.svg'

const router = useRouter()
const route = useRoute()
const tags = ref('')
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const props = defineProps({
    platformName: String,
});

let commentPaginator = null 
const comments = ref([])
const fetchingData = ref(true)

onMounted(()=>{
    getHistoryComments()
})

onUnmounted(()=>{
    eventBus.off(`insert_${props.platformName}_comment`)
})

const getHistoryComments= () =>{
    commentPaginator = createCommentPaginator(route.params.campaign_id, props.platformName, '')
    fetchingData.value = true
    commentPaginator.getData().then(res=>{
        fetchingData.value = false
        comments.value = res.data.results
        if(props.platformName!='commentSummarize')readyToUpdateByWebsocket()
    }).catch(err=>{
        fetchingData.value = false
        return err
    })
}

const handleScroll = event=>{
    if(!fetchingData.value && (event.target.scrollTop+event.target.offsetHeight) >= (2*event.target.scrollHeight)/3 && commentPaginator.gotNext){
        fetchingData.value = true
        commentPaginator.nextPage().then(res=>{
            // comments.value = comments.value.concat(res.data.results)   //maybe for loop render more smoothly

            res.data.results.forEach(comment => {
                comments.value.push(comment)
            });
            fetchingData.value = false
        })
    }
}

const readyToUpdateByWebsocket = ()=>{
    eventBus.on(`insert_${props.platformName}_comment`, payload => {
        comments.value.unshift(payload)
    })
}

const commentSummarizer = category=>{
    if(category == 'neutro'){
        tags.value = 'other'
    }else tags.value = category
    commentPaginator = createCommentPaginator(route.params.campaign_id, props.platformName, category)
    commentPaginator.getData().then(res=>{
        fetchingData.value = false
        comments.value = res.data.results
    }).catch(err=>{
        fetchingData.value = false
        return err
    })
}

const showReplyBar = comment=>{
    eventBus.emit('showReplyModal',{'comment':comment})
}

const layoutStore = useLSSSellerLayoutStore();



</script>

<style scoped>
    .body-middle {
        left: calc(50% - 30px);
        top:60%;
        z-index: 999;
    }
    .hide {
        display: none;
    }
    .comments:hover .hide {
        display: block !important;
    }

</style>
 