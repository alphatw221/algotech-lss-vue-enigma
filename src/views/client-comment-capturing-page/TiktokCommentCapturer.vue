<template>
    <div>

    </div>
</template>

<script setup>

import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { create_tiktok_connector } from '@/api_v2/tiktok';

const tiktok_connector = ref(null)
const username = ref('@asdfasdf')

const tiktok_comments = ref([])


const onMessageHandler = msg=>{
    console.log(msg.comment)
    tiktok_comments.push({
        id:'',
        






    })
}
onMounted(()=>{
    tiktok_connector.value = create_tiktok_connector(username.value, )


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
    tiktok_connector.value.close()
})

</script>
