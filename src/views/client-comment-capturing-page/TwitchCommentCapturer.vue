<template>
    <div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { init_twitch_websocket, bulk_create_comment } from '@/api_v2/twitch';
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
    campaign: Object
})
const route = useRoute();
const twitchCommentList = ref([])
const BUFFER_SIZE = 30
const UPLOAD_INTERVAL = 5000
const intervalId = ref(null)

watch(computed(()=>{twitchCommentList.value}),()=>{
	if (twitchCommentList.value.length > BUFFER_SIZE) {
        uploadComments()
    }
})

onMounted(() => {
    init_twitch_websocket(props.campaign.twitch_channel.name, `oauth:${props.campaign.twitch_channel.token}`, props.campaign.twitch_channel.name, onMessageHandler, onConnectedHandler)
    intervalId.value = setInterval(checkBuffer, UPLOAD_INTERVAL)
})

const uploadComments = () => {
    bulk_create_comment(props.campaign.id, twitchCommentList.value).then(res => {})
    twitchCommentList.value = []
}

const checkBuffer = () => {
    if (twitchCommentList.value.length == 0) return
    uploadComments()
}

const onConnectedHandler = (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
}

const onMessageHandler = (target, context, msg, self) => {
    if (self) { return; } // Ignore messages from the bot

    let commentObj = {
        platform: 'twitch',
        id: context['id'],
        message: msg.trim(),
        created_time: Math.floor(Date.now() / 1000),
        customer_id: context['user-id'],
        customer_name: context['username'],
        image: ''
    }
    twitchCommentList.value.push(commentObj)
}

</script>