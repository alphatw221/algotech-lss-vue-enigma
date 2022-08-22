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
    let password = 'oauth:hc7dgjfy8c826ih40gvxif9k26g8gg'
    let channel = 'niveachen'
    
    init_twitch_websocket(username, password, channel, onMessageHandler, onConnectedHandler)
})

const onConnectedHandler = (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
}

const onMessageHandler = (target, context, msg, self) => {
    if (self) { return; } // Ignore messages from the bot

    console.log(context)

    let commentObj = {
        context: context,
        message: msg.trim()
    }
    twitchCommentList.value.push(commentObj)
    console.log(twitchCommentList.value.length)
    
    if (twitchCommentList.value.length > 3) {
        bulk_create_comment(646, { comments: twitchCommentList.value }).then(res => {
            console.log(res.data)            
        })
        twitchCommentList.value = []
    }

}

</script>