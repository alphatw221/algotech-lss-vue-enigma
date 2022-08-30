<template>
    <div>

    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, onUnmounted, defineProps } from "vue";
import { init_twitch_websocket, upload_twitch_comments } from '@/api_v2/twitch';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const sellerStore = useLSSSellerLayoutStore();

const twitchCommentList = ref([])

const BUFFER_SIZE = 20
const UPLOAD_INTERVAL = 5000

const intervalId = ref(null)


const uploadComments = () => {
    const commentsLength = twitchCommentList.value.length

    const data = JSON.parse(JSON.stringify(twitchCommentList.value.slice(0, commentsLength)))
    upload_twitch_comments(sellerStore.commentCapturingCampaignData.id, data).then(res => {
        twitchCommentList.value.splice(0, commentsLength)
    })
}

const checkBuffer = ()=>{
    console.log('check buffer')
    if (twitchCommentList.value.length==0) return
    uploadComments()
}

const onMessageHandler = (target, context, msg, self) => {
    if (self) { return; } // Ignore messages from the bot

    let data = {
        platform: 'twitch',
        id: context['id'],
        message: msg.trim(),
        customer_id: context['user-id'],
        customer_name: context['username'],
        image: ''
    }
    twitchCommentList.value.push(data)
}

const onConnectedHandler = (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
}

onMounted(() => {
    init_twitch_websocket(sellerStore.commentCapturingCampaignData.twitch_campaign.channel_name, `oauth:${sellerStore.commentCapturingCampaignData.twitch_campaign.token}`, sellerStore.commentCapturingCampaignData.twitch_campaign.channel_name, onMessageHandler, onConnectedHandler)
    intervalId.value = setInterval(checkBuffer, UPLOAD_INTERVAL)

    watch(computed(()=>{twitchCommentList.value}), () => {
        if (twitchCommentList.value.length > BUFFER_SIZE) {
            uploadComments()
        }
    })
})

onUnmounted(()=>{
    closeConnection()
})

const closeConnection = ()=>{
    // if(tiktok_connector.value)tiktok_connector.value.disconnect()  
    if (intervalId.value) clearInterval(intervalId.value)
}

</script>