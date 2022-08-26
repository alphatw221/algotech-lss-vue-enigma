<template>
    <div id='comment-capturing-window' class="fixed bg-black w-20 h-20 block top-20 left-10 z-[999] rounded-lg" 
    
    
    >
        <div class="bg-primary h-10 rounded-lg"
            @mousedown="startDrag()"
            @mouseup="endDrag()"
            @mousemove="drag($event)"
        >
        </div>

    </div>
    <!-- <div v-if="ready">


        <div>{{campaign.title}}</div>
        <div>{{campaign.tiktok_campaign}}</div>
        <div>{{campaign.twitch_campaign}}</div>

        <TiktokCommentCapturer :campaign="campaign"/>
        <TwitchCommentCapturer :campaign="campaign"/>
    </div> -->
</template>

<script setup>
import { computed, onMounted, ref, watch, onUnmounted, defineProps } from "vue";
// import { useRoute, useRouter } from "vue-router";
// import { retrieve_campaign } from '@/api_v2/campaign';

import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
const sellerStore = useLSSSellerLayoutStore();

// import TiktokCommentCapturer from "./TiktokCommentCapturer.vue"
// import TwitchCommentCapturer from './TwitchCommentCapturer.vue'
// const router = useRouter()
// const route = useRoute()

// const ready = ref(false)
// const campaign = ref({})

// onMounted(()=>{
//     retrieve_campaign(route.params.campaign_id).then(res=>{
// 		campaign.value = res.data
//         ready.value = true
// 	})
// })
const isDraging = ref(false)

const endDrag = ()=>{isDraging.value = false}
const startDrag = ()=>{isDraging.value = true}


const drag = event=>{
    if(!isDraging.value)return
    const element = document.getElementById('comment-capturing-window')
    // const element_rect = element.getBoundingClientRect()
    // // console.log(element_rect.left)
    // // console.log(event.clientX)

    // // console.log(element_rect.top)
    // // console.log(event.clientY)

    // // console.log(event.clientX-element_rect.left)
    // // console.log(event.clientY-element_rect.top)
    // // element_rect.x
    // // element_rect.y

    // // console.log(event.clientX)
    // // console.log(event.clientY)
    // console.log(event.clientX-element_rect.left)
    element.style.left = event.clientX-40 + 'px'
    element.style.top = event.clientY-20 +'px'
}

</script>
