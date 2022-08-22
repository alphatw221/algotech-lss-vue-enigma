<template>

    <div>
        <button class="btn w-32 dark:border-darkmode-400" @click="goDeath()"> 
            Click me to death
        </button>
    </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { init_twitch_websocket, bulk_create_comment } from '@/api_v2/twitch';


const twitchCommentList = ref([])

onMounted(() => {
    let username = 'niveachen'
    let password = 'oauth:klrwmvvejevwbsc89s7ul41gqb1r15'
    let channel = 'niveachen'
    
    init_twitch_websocket(username, password, channel, onMessageHandler, onConnectedHandler)
})

const onConnectedHandler = (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
}

const onMessageHandler = (target, context, msg, self) => {
    if (self) { return; } // Ignore messages from the bot

    console.log(context)
    let campaign_id = 646

    let commentObj = {
        platform: 'twitch',
        id: context['id'],
        campaign_id: campaign_id,
        message: msg.trim(),
        created_time: Date.now(),
        customer_id: context['user-id'],
        customer_name: context['username'],
        image: ''
    }
    twitchCommentList.value.push(commentObj)
    console.log(twitchCommentList.value)
    
    if (twitchCommentList.value.length > 3) {
        bulk_create_comment(campaign_id, twitchCommentList.value ).then(res => {
            console.log(res.data)            
        })
        twitchCommentList.value = []
    }

}

</script>