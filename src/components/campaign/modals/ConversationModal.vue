<template>

    <Modal :show="show" @hidden="hide()" backdrop="static">
        <ModalHeader>
            <img alt="" class="w-8 h-8 rounded-full zoom-in" :src="comment.image" />
            <h2 class="ml-5 mr-auto text-base font-medium">{{$t('campaign_live.conversation.conversation_with')}} {{ comment.customer_name }} </h2>
            <a @click="show = false" class="absolute top-0 right-0 mt-3 mr-3" href="javascript:;">
                <XIcon class="w-12 h-12 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="flex flex-col w-full h-full">
            <div class="overflow-y-auto max-h-[500px]">
                <template v-for="(item,index) in messageItems" :key="index">
                <div v-if="item.from.id === pageId"
                    class="flex justify-end w-full h-fit">
                    <div class="flex flex-col p-2 m-3 box bg-secondary w-fit">
                        <span class="font-medium text-right text-violet-900">{{ item.from.username }}</span>
                        <div class="w-fit items-right text-slate-700 mt-0.5 p-0.5 whitespace-wrap text-right">
                            {{ item.message }}
                        </div>
                    </div>
                    <div class="flex-none w-12 h-12 mr-1 image-fit">
                        <img alt="" class="rounded-full zoom-in" :src="campaignDetailStore.campaign.instagram_profile.image" />
                    </div>
                </div>
                <div v-else
                    class="flex w-fit h-fit">
                    <div class="flex-none w-12 h-12 mr-1 image-fit">
                        <img alt="" class="rounded-full zoom-in" :src="comment.image" />
                    </div>
                    <div class="flex flex-col p-2 m-3 box bg-secondary w-fit">
                        <span class="font-medium text-sky-900">{{ item.from.username }}</span>
                        <div class="w-fit items-left text-slate-700 mt-0.5 p-0.5 whitespace-wrap">
                            {{ item.message }}
                        </div>
                    </div>
                </div>
                </template>
            </div>
            <div class="flex items-center pt-4 pb-10 border-t sm:py-4 border-slate-200/60 dark:border-darkmode-400">
                <textarea v-model="message"
                    class="px-5 py-3 shadow-none resize-none chat__box__input form-control dark:bg-darkmode-600 h-14 border-inherit focus:border-inherit focus:ring-0"
                    rows="1" :placeholder="$t('campaign_live.conversation.type_your_message')+'...'"></textarea>
                <a @click="send()"
                    class="flex items-center justify-center flex-none w-10 h-10 mx-3 text-white rounded-full bg-primary">
                    <SendIcon class="w-6 h-6" />
                </a>
            </div>
        </ModalBody>
        
    </Modal>

</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, getCurrentInstance, watch, computed} from 'vue';
import { comment_on_comment, nest_comment } from '@/api_v2/campaign';
import { get_ig_conversation_messages, retrieve_instagram_profile, reply_to_direct_message } from '@/api/instagram';
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
const messageItems=ref([])
const comment = ref({})
const pageId = ref(null)
let pollingInterval = null
let pageToken = null

onMounted(()=>{
    eventBus.on("showConversationModal", (payload) => {
        comment.value = payload.comment
        pageId.value = campaignDetailStore.campaign.instagram_profile.business_id
        retrieve_instagram_profile(campaignDetailStore.campaign.instagram_profile.id).then(res=>{
            pageToken = res.data.token
            return getDirectMessageConversation(campaignDetailStore.campaign.instagram_profile.connected_facebook_page_id, comment.value.customer_id, pageToken)
        }).then(res=>{
            show.value = true
            return loopGetDirectMessageConversation(campaignDetailStore.campaign.instagram_profile.connected_facebook_page_id, comment.value.customer_id, pageToken, 3000)
        }).catch(err=>{
            console.log(err)
        })
        
    });
})

onUnmounted(()=>{
    eventBus.off("showConversationModal")
})
    


const send = ()=>{
    reply_to_direct_message(campaignDetailStore.campaign.instagram_profile.connected_facebook_page_id, comment.value.customer_id, message.value, pageToken).then(res=>{
        message.value=''
        layoutStore.notification.showMessageToast("Send successfully")
    }).catch(err=>{
        layoutStore.alert.showMessageToast("You are not allowed to respond on messages after 24 hours since the latest user's message.")
    })
}

const hide = ()=>{
    clearInterval(pollingInterval)
    show.value=false
    message.value = ''
    messageItems.value=[]
    comment.value = {}
    pollingInterval = null
}
const getDirectMessageConversation = (page_id, ig_user_id, pageToken) => {
    return get_ig_conversation_messages(page_id, ig_user_id, pageToken).then(res=>{
        console.log("getDirectMessageConversation")
        messageItems.value = res.data.data[0].messages.data
    })

}

const loopGetDirectMessageConversation = (page_id, ig_user_id, pageToken, interval) => {
    if (!show.value) return
    clearInterval(pollingInterval)
    pollingInterval = setInterval(()=> { return getDirectMessageConversation(page_id, ig_user_id, pageToken) }, interval)
}


</script>