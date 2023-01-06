<template>
    <div>

    </div>
</template>

<script setup>

import { computed, onMounted, ref, watch, onUnmounted, defineProps, getCurrentInstance } from "vue";
import { create_tiktok_connector, upload_tiktok_comments } from '@/api_v2/tiktok';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const sellerStore = useLSSSellerLayoutStore();

const props = defineProps({
    campaign: Object,
})

const tiktok_connector = ref(null)
const tiktok_comments = ref([])

const BUFFER_SIZE = 20
const UPLOAD_INTERVAL = 10000

const uploadIntervalId = ref(null)


const uploadComments = ()=>{
    const commentsLength = tiktok_comments.value.length
    
    const data = JSON.parse(JSON.stringify( tiktok_comments.value.slice(0,commentsLength )))
    upload_tiktok_comments(sellerStore.commentCapturingCampaignData.id, data).then(res=>{
        tiktok_comments.value.splice(0,commentsLength)
    })

}



const checkBuffer = ()=>{
    // console.log('check buffer')
    if(tiktok_comments.value.length==0)return
    uploadComments()
}


const onMessageHandler = msg=>{
    const date = new Date()
    // const created_time = Math.floor((date.getTime())/1000)
    date.setSeconds(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    const created_hour = Math.floor((date.getTime())/1000)
    
    console.log(msg)
    
    const data = {
        id:msg.userId+'_'+msg.comment+'_'+created_hour,  //
        platform:'tiktok',
        message:msg.comment,
        customer_id:msg.userId, //
        customer_name:msg.uniqueId,
        customer_nickname:msg.nickname,
        image:msg.profilePictureUrl,
        // created_time:created_time
    }
    // console.log(data)
    tiktok_comments.value.push(data)
}
const onErrorHandler = err=>{
    
    
    if(sellerStore.commentCapturingCampaignData?.tiktok_campaign?.status)sellerStore.commentCapturingCampaignData.tiktok_campaign.status = 'error'
    
    closeConnection()
}

onMounted(()=>{
    eventBus.on('refreshTiktok', ()=>{
        tiktok_connector.value = create_tiktok_connector(sellerStore.commentCapturingCampaignData.tiktok_campaign?.username, onMessageHandler, onErrorHandler) 
        uploadIntervalId.value = setInterval(checkBuffer, UPLOAD_INTERVAL)

        watch(computed(()=>tiktok_comments.value),()=>{
            if(tiktok_comments.value.length>BUFFER_SIZE){
                uploadComments()
            }
        })
        sellerStore.commentCapturingCampaignData.tiktok_campaign.status = 'capturing' 
    })
    tiktok_connector.value = create_tiktok_connector(sellerStore.commentCapturingCampaignData.tiktok_campaign?.username, onMessageHandler, onErrorHandler)   
    uploadIntervalId.value = setInterval(checkBuffer, UPLOAD_INTERVAL)

    watch(computed(()=>tiktok_comments.value),()=>{
        if(tiktok_comments.value.length>BUFFER_SIZE){
            uploadComments()
        }
    })
    sellerStore.commentCapturingCampaignData.tiktok_campaign.status = 'capturing'

})

onUnmounted(()=>{
    closeConnection()
    eventBus.off('refreshTiktok')
})

const closeConnection = ()=>{
    if(tiktok_connector.value)tiktok_connector.value.disconnect()  
    if(uploadIntervalId.value)clearInterval(uploadIntervalId.value)
}










// comment: "ok行車平安"
// createTime: "1672984865498"
// followInfo: {followingCount: 640, followerCount: 45, followStatus: 2, pushStatus: 0}
// followRole: 2
// isModerator: false
// isNewGifter: false
// isSubscriber: false
// msgId: "7185414922636413723"
// nickname: "🐠𝔻ℝ💙麻吉熊"
// profilePictureUrl:"https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/7123625429285470235~c5_100x100.webp?x-expires=1673157600&x-signature=7mFfKYa5r26RFXipXIt6Qj0NLMI%3D"
// secUid : "MS4wLjABAAAAChu7ngZNhA1jwg_4ZRfnKSjWYPWI6uOfELQm_xzAkxNxYujpZYxSDHfF4CQATOW9"
// topGifterRank : 3
// uniqueId : "usermut0k52olj"
// userBadges :  [{…}]
// userDetails: {createTime: '0', bioDescription: '', profilePictureUrls: Array(3)}
// userId:  "7123624658130306074"


</script>


