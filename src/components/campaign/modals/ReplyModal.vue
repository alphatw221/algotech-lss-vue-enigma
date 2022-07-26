<template>

    <Modal :show="show" @hidden="hide()" backdrop="static">
        <ModalHeader>
            <img alt="" class="w-8 h-8 rounded-full zoom-in" :src="comment.image" />
            <h2 class="ml-5 mr-auto text-base font-medium">{{$t('campaign_live.reply.reply_to')}} {{ comment.customer_name }} </h2>
            <a @click="show = false" class="absolute top-0 right-0 mt-3 mr-3" href="javascript:;">
                <XIcon class="w-12 h-12 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="flex flex-col w-full h-full">
            <div class="overflow-y-auto max-h-[500px]"> 
                <div class="flex w-fit h-fit">
                    <div class="flex-none w-12 h-12 mr-1 image-fit">
                        <img alt="" class="rounded-full zoom-in" :src="comment.image" />
                    </div>
                    <div class="flex flex-col p-2 m-3 box bg-secondary w-fit">
                        <div class="flex items-center">
                            <span class="font-medium text-sky-900">{{ comment.customer_name }}</span>
                            <div class="ml-auto text-xs text-slate-400"></div>
                        </div>
                        <div class="w-fit items-left text-slate-700 mt-0.5 p-0.5 space-wrap">
                            {{ comment.message }}
                        </div>
                    </div>
                </div>
                <template v-for="(comment,index) in nestComments" :key="index">
                <div v-if="comment.from.id === pageId"
                    class="flex justify-end w-full h-fit">
                    <div class="flex flex-col p-2 m-3 box bg-secondary w-fit">
                        <span class="font-medium text-right text-violet-900">{{ comment.from.name }}</span>
                        <div class="w-fit items-right text-slate-700 mt-0.5 p-0.5 space-wrap text-right">
                            {{ comment.message }}
                        </div>
                    </div>
                    <div class="flex-none w-12 h-12 mr-1 image-fit">
                        <img alt="" class="rounded-full zoom-in" :src="comment.from.picture.data.url" />
                    </div>
                </div>
                <div v-else
                    class="flex w-fit h-fit">
                    <div class="flex-none w-12 h-12 mr-1 image-fit">
                        <img alt="" class="rounded-full zoom-in" :src="comment.from.picture.data.url" />
                    </div>
                    <div class="flex flex-col p-2 m-3 box bg-secondary w-fit">
                        <span class="font-medium text-sky-900">{{ comment.from.name }}</span>
                        <div class="w-fit items-left text-slate-700 mt-0.5 p-0.5 space-wrap">
                            {{ comment.message }}
                        </div>
                    </div>
                </div>
                </template>
            </div>
            <div class="flex items-center pt-4 pb-10 border-t sm:py-4 border-slate-200/60 dark:border-darkmode-400">
                <textarea v-model="message"
                    class="px-5 py-3 shadow-none resize-none chat__box__input form-control dark:bg-darkmode-600 h-14 border-inherit focus:border-inherit focus:ring-0"
                    rows="1" :placeholder="$t('campaign_live.reply.type_your_message')+'...'"></textarea>
                <a @click="send()"
                    class="flex items-center justify-center flex-none w-10 h-10 mx-3 text-white rounded-full bg-primary">
                    <SendIcon class="w-6 h-6" />
                </a>
            </div>
        </ModalBody>
        <!-- <ModalFooter class="flex">
            <button type="button" @click="show = false" class="w-20 mr-auto btn btn-outline-secondary">
                Cancel
            </button>
        </ModalFooter> -->
    </Modal>

</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance, watch, computed} from 'vue';
import { comment_on_comment, nest_comment } from '@/api_v2/campaign';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useRoute, useRouter } from "vue-router";

const campaignDetailStore = useCampaignDetailStore()
const layoutStore = useLSSSellerLayoutStore();

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const router = useRouter()
const route = useRoute()


const show=ref(false)
const message = ref('')
const nestComments=ref([])
const comment = ref({})
const pageId = ref(null)
let pollingInterval = null

onMounted(()=>{
     eventBus.on("showReplyModal", (payload) => {
        console.log(payload)
        if(payload.comment.platform=='facebook'){
            
            show.value = true
            comment.value = payload.comment
            pageId.value = campaignDetailStore.campaign.facebook_page.page_id
            loopNestComment()
        }else{
            layoutStore.alert.showMessageToast("This function is under developing...");
        }
        
    });
})

onUnmounted(()=>{
    eventBus.off("showReplyModal")
})
    
    

const getNestComment = ()=>{
    nest_comment(route.params.campaign_id, comment.value.id).then((response)=>{
        nestComments.value = response.data[1].data   //facebook_api
        console.log(response.data)
    })
}

const loopNestComment = ()=>{
    clearInterval(pollingInterval)
    getNestComment()
    pollingInterval = setInterval(getNestComment, 5000)
}

const send = ()=>{
    comment_on_comment(route.params.campaign_id, comment.value.id, message.value).then((res) => {
        message.value=''
        loopNestComment()
    })
}

const hide = ()=>{
    clearInterval(pollingInterval)
    show.value=false
    message.value = ''
    nestComments.value=[]
    comment.value = {}
    pollingInterval = null
}

</script>