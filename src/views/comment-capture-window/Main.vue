<template>
    <div 
        id='comment-capturing-window' 

        class="fixed bg-white w-40 block top-20 left-10 z-[999] rounded-lg border-2 border-black" 
        v-if="sellerStore.commentCapturingCampaignData.twitch_campaign?.channel_name || sellerStore.commentCapturingCampaignData.tiktok_campaign?.username"
    
    
    >
        <div class="bg-primary h-10 rounded-top-md"
            @mousedown="startDrag($event)"
            @mouseup="endDrag()"
        >
        </div>

        <div class="m-3 text-center">

            
            <h1>
                {{ sellerStore.commentCapturingCampaignData?.title }}
            </h1>
            <!-- tiktok -->

            <div v-if="sellerStore.commentCapturingCampaignData?.tiktok_campaign?.username">
                <div>
                    <label >Platform : tiktok</label>
                </div>

                <div>
                    <label >User Name : </label>
                    <label >{{sellerStore.commentCapturingCampaignData?.tiktok_campaign?.username}}</label>
                </div>
                
                <div  v-if="sellerStore.commentCapturingCampaignData?.tiktok_campaign?.status==='error'">
                    <AlertCircleIcon class="text-danger mx-auto" />
                    <label>{{sellerStore.commentCapturingCampaignData?.tiktok_campaign?.status}}</label>
                </div>

                
                <div v-else-if="sellerStore.commentCapturingCampaignData?.tiktok_campaign?.status==='capturing'">
                    <lottie-player  class="mx-auto" v-if="showAnimate" src="https://assets10.lottiefiles.com/packages/lf20_vIyvPR.json" loop background="transparent"  speed="1"  style="width: 30px; height: 30px;"   autoplay></lottie-player>
                    <label>{{sellerStore.commentCapturingCampaignData?.tiktok_campaign?.status}}</label>
                </div>
                
            </div>

            <div 
                v-if="sellerStore.commentCapturingCampaignData?.twitch_campaign?.channel_name"
                class="mt-3"
            >
                <div>
                    <label >Platform : Twitch</label>
                </div>

                <div>
                    <label >Channel Name : </label>
                    <label >{{sellerStore.commentCapturingCampaignData?.twitch_campaign?.channel_name}}</label>
                </div>
                
                <div  v-if="sellerStore.commentCapturingCampaignData?.twitch_campaign?.status==='error'">
                    <AlertCircleIcon class="text-danger mx-auto" />
                    <label>{{sellerStore.commentCapturingCampaignData?.twitch_campaign?.status}}</label>
                </div>

                
                <div v-else-if="sellerStore.commentCapturingCampaignData?.twitch_campaign?.status==='capturing'">
                    <lottie-player  class="mx-auto" v-if="showAnimate" src="https://assets10.lottiefiles.com/packages/lf20_vIyvPR.json" loop background="transparent"  speed="1"  style="width: 30px; height: 30px;"   autoplay></lottie-player>
                    <label>{{sellerStore.commentCapturingCampaignData?.twitch_campaign?.status}}</label>
                </div>
                
            </div>



            <button class="btn" @click="stopCapturing()">
                stop
            </button>

        </div>



        


        <TiktokCommentCapturer />
        <TwitchCommentCapturer />
    </div>

</template>

<script setup>
import { computed, onMounted, ref, watch, onUnmounted, defineProps } from "vue";
import { retrieve_campaign } from "@/api_v2/campaign";
import loadScript from '@/libs/loadScript.js';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import TiktokCommentCapturer from "./TiktokCommentCapturer.vue";
import TwitchCommentCapturer from "./TwitchCommentCapturer.vue";

const sellerStore = useLSSSellerLayoutStore();

const leftOffset = ref(0)
const topOffset = ref(0)



const ready = ref(false)
const showAnimate = ref(false)
const campaignData = ref({
    tiktok_campaign:{status:null},
    twitch_campaign:{status:null}
})

const test = ref({status:null})
const isDraging = ref(false)

const endDrag = ()=>{
    isDraging.value = false;
    clearOffset()
    document.removeEventListener('mousemove',null)
}
const startDrag = (event)=>{
    isDraging.value = true;
    getOffset(event)
    document.addEventListener('mousemove',drag)
}

const drag = event=>{
    if(!isDraging.value)return
    const element = document.getElementById('comment-capturing-window')
    element.style.left = (event.clientX - leftOffset.value) + 'px'
    element.style.top = (event.clientY - topOffset.value) +'px'
}


const getOffset = (event)=>{
    const element = document.getElementById('comment-capturing-window')
    const element_rect = element.getBoundingClientRect()
    leftOffset.value = event.clientX-element_rect.left
    topOffset.value = event.clientY-element_rect.top
}
const clearOffset = () =>{
    leftOffset.value = 0
    topOffset.value = 0
}

onMounted(()=>{
    console.log('sellerStore.commentCapturingCampaignData')
    console.log(sellerStore.commentCapturingCampaignData)
    
    loadScript('https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',()=>{
        showAnimate.value=true
    })
})
 

const stopCapturing = ()=>{
    console.log('stop capturing')
    sellerStore.commentCapturingCampaignData = {}
}

</script>
