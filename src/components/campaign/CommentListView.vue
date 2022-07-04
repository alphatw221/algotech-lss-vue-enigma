<template>
    <div class="h-96 w-96 mt-1 overflow-y-scroll" :id="props.platformName+'-comment-listview'" @scroll="handleScroll($event)">
        <button @click="testing()">testing</button>
        <div v-for="(comment, index) in comments" :key="index"
            class="intro-x cursor-pointer relative flex items-center m-1 p-2 box rounded-l-full"
            @click="showReplyModal(comment)">
            <Tippy class="rounded-full " content="Reply" theme='light'>
                <div class="relative flex items-center w-full">
                    <div class="w-14 h-14 flex-none image-fit mr-1">
                    <img alt="" class="rounded-full zoom-in" :src="comment.image" />
                    </div>
                
                    <div class="ml-2 overflow-hidden w-full">
                        <div class="flex items-center">
                            <a class="font-medium">{{ comment.customer_name }}</a>
                            <div class="text-xs text-slate-400 ml-auto"></div>
                        </div>
                        <div class="text-slate-500 mt-0.5">
                            {{ comment.message }}
                        </div>
                    </div>
                </div>
            </Tippy>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance, watch, computed} from 'vue'
import { createCommentPaginator } from '@/api_v2/campaign_comment'
import { useRoute, useRouter } from "vue-router"

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
    commentPaginator.getData().then(res=>{
        comments.value = res.data.results
    })
})

onUnmounted(()=>{
})

const handleScroll = event=>{
    if(!fetchingData && event.target.scrollTop > ((event.target.scrollHeight*3)/4) && commentPaginator.gotNext){
        fetchingData = true
        commentPaginator.nextPage().then(res=>{
            comments.value = comments.value.concat(res.data.results)
            fetchingData = false
        })

    }
}

const showReplyModal = comment=>{

}

</script>
