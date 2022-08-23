<template>
    <div>
        aaaaa
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { init_twitch_websocket, bulk_create_comment } from '@/api_v2/twitch';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const twitchCommentList = ref([])
const BUFFER_SIZE = 30
const UPLOAD_INTERVAL = 5000
const intervalId = ref(null)

watch(computed(()=>{twitchCommentList.value}),()=>{
	if (twitchCommentList.value.length > 10) {
        uploadComments()
    }
})

onMounted(() => {
    let username = 'niveachen'
    let password = 'oauth:snpfan5ajf3fshiezazwy759w8a7wl'
    let channel = 'niveachen'
    
    init_twitch_websocket(username, password, channel, onMessageHandler, onConnectedHandler)

    intervalId.value = setInterval(checkBuffer, UPLOAD_INTERVAL)
})

const uploadComments = () => {
    bulk_create_comment(route.params.campaign_id, twitchCommentList.value ).then(res => {
        console.log(res.data)            
    })
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
        created_time: Date.now(),
        customer_id: context['user-id'],
        customer_name: context['username'],
        image: ''
    }
    twitchCommentList.value.push(commentObj)
}

</script>