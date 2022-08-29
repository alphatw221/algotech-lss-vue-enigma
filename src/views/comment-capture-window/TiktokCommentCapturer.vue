<template>
    <div>

    </div>
</template>

<script setup>

import { computed, onMounted, ref, watch, onUnmounted, defineProps } from "vue";
import { create_tiktok_connector, upload_tiktok_comments } from '@/api_v2/tiktok';

const props = defineProps({
    campaign: Object,
})

const tiktok_connector = ref(null)
const tiktok_comments = ref([])

const BUFFER_SIZE = 20
const UPLOAD_INTERVAL = 5000

const uploadIntervalId = ref(null)


const uploadComments = ()=>{
    const commentsLength = tiktok_comments.value.length
    tiktok_comments.value.splice(0,commentsLength)
    console.log('comments uploaded')

    
    // const data = JSON.parse(JSON.stringify( tiktok_comments.value.slice(0,commentsLength )))
    // upload_tiktok_comments(props.campaign_id, data).then(res=>{
    //     tiktok_comments.value.splice(0,commentsLength)
    // })

}



const checkBuffer = ()=>{
    console.log('check buffer')
    if(tiktok_comments.value.length==0)return
    uploadComments()
}


const onMessageHandler = msg=>{
    const created_time = Date.now()
    const data = {
        id:msg.userId+'_'+created_time,  //
        platform:'tiktok',
        message:msg.comment,
        customer_id:msg.userId, //
        customer_name:msg.nickname,
        image:msg.profilePictureUrl,
        created_time:Math.floor(created_time / 1000)
    }
    console.log(data)
    tiktok_comments.value.push(data)
}
onMounted(()=>{
    if(!props.campaign.tiktok_campaign?.username){
        console.log('no toktok info')
        return
    }
    tiktok_connector.value = create_tiktok_connector(props.campaign.tiktok_campaign?.username, onMessageHandler)
    uploadIntervalId.value = setInterval(checkBuffer, UPLOAD_INTERVAL)

    watch(computed(()=>tiktok_comments.value),()=>{
    if(tiktok_comments.value.length>BUFFER_SIZE){
        uploadComments()
    }
})

    // if(props.campaign.tiktik_campaign?.username){
    //     tiktok_connector.value = create_tiktok_connector(props.username, onMessageHandler)
    //     uploadIntervalId.value = setInterval(checkBuffer, UPLOAD_INTERVAL)
    // }
    // else{
    //     console.log('no tiktok username')
    // }

    // comment: "封了"
    // followRole: 1
    // isModerator: true
    // isNewGifter: false
    // isSubscriber: false
    // nickname: "軒.(՞ . .՞)"
    // profilePictureUrl: "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/d89be23d7c7142ae2149500a5b7d9a7b~c5_100x100.jpeg?x-expires=1661335200&x-signature=rI5t85c0TjKqaovCxGBDNLE3gAs%3D"
    // topGifterRank: null
    // uniqueId: "hu_0160"
    // userBadges: [{…}]
    // userId: "7086843598461060122"

})

onUnmounted(()=>{
    if(tiktok_connector.value)tiktok_connector.value.disconnect()
    if(uploadIntervalId.vlaue)clearInterval(uploadIntervalId.value)
})

</script>
