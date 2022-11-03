<template>
    <Dropdown 
        show="true"
        id='comment-capturing-window' 
        @mousedown="startDrag($event)"
        @mouseup="endDrag()"
        class="fixed bg-[#141414]/95 w-fit block top-20 left-10 z-[51] w-[200px] h-[35px]"
        v-if="sellerStore.commentCapturingCampaignData.twitch_campaign?.channel_name || sellerStore.commentCapturingCampaignData.tiktok_campaign?.username">
        <DropdownToggle class="flex justify-between w-full h-full px-2 text-white">
                <label class="font-medium my-auto" > Capture Status</label>
                <div class="flex my-auto">
                    <MoveIcon class="w-6 h-6 rotate-45"/> 
                    <XIcon class="my-auto w-6 h-6" @click="stopCapturing('all')"/>
                </div> 
        </DropdownToggle>
        <DropdownMenu class="w-[200px] bg-[#141414]">
            <DropdownContent
            class="bg-[#141414] text-white"
          >
            <DropdownHeader tag="div" class="!font-normal text-white flex font-medium truncate">
                {{sellerStore.commentCapturingCampaignData.title}}
            </DropdownHeader>
            <div class="w-full border-t border-slate-500/60 dark:border-darkmode-400 border-dashed"></div>

                <DropdownItem class="w-full hover:bg-[#141414] cursor-auto">
                    <div class="m-1 text-center text-white flex flex-col gap-3">
                        <div v-if="sellerStore.commentCapturingCampaignData?.tiktok_campaign?.username"
                            class="flex w-full">
                            <template  v-if="sellerStore.commentCapturingCampaignData?.tiktok_campaign?.status==='error'">
                                <SimpleIcon icon="alert_full" class="my-auto w-5"/>
                                <label class="text-[#ff0000] flex-initial text-white my-auto w-32 ml-1">Syncing TikTok Err</label>
                                <SimpleIcon icon="reset" color="#fff" class="w-6 my-auto ml-auto cursor-pointer" @click="refresh('tiktok')"/>
                            </template>
                            <template v-else-if="sellerStore.commentCapturingCampaignData?.tiktok_campaign?.status==='capturing'">
                                <div class="my-auto flex-none"> 
                                    <LoadingIcon width="24" height="24" icon="capturing" class="my-auto flex-none"/>
                                </div>
                                <label class="flex-initial text-white my-auto w-32">Syncing TikTok</label>
                                <SimpleIcon icon="stop_live2" width="24" height="20" class="flex-none my-auto ml-auto cursor-pointer" @click="stopCapturing('tiktok')" />  
                            </template>
                        </div>
                        <div
                            v-if="sellerStore.commentCapturingCampaignData?.twitch_campaign?.channel_name"
                            class="flex w-full"
                        >
                            <template  v-if="sellerStore.commentCapturingCampaignData?.twitch_campaign?.status==='error'" class="flex">
                                <SimpleIcon icon="alert_full" class="my-auto w-5"/>
                                <label class="text-[#ff0000] flex-initial text-white my-auto w-32 ml-2">Syncing Twitch Err</label>
                            </template>
                            
                            <template v-else-if="sellerStore.commentCapturingCampaignData?.twitch_campaign?.status==='capturing'">
                                <div class="my-auto flex-none"> 
                                    <LoadingIcon width="24" height="24" icon="capturing" class="my-auto flex-none"/>
                                </div>
                                
                                <label class="flex-initial text-white my-auto w-32 ml-1">Syncing Twitch</label>
                                <SimpleIcon icon="stop_live2" width="24" height="20" class="flex-none my-auto ml-auto cursor-pointer" @click="stopCapturing('twitch')" /> 
                            </template>
                        </div>
                    </div>
                </DropdownItem>
            </DropdownContent>
        </DropdownMenu>
        <TiktokCommentCapturer /> 
        <TwitchCommentCapturer />
    </Dropdown>
</template>

<script setup>
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { retrieve_campaign } from "@/api_v2/campaign";
import loadScript from '@/libs/loadScript.js';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import TiktokCommentCapturer from "./TiktokCommentCapturer.vue";
import TwitchCommentCapturer from "./TwitchCommentCapturer.vue";

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const sellerStore = useLSSSellerLayoutStore();

const leftOffset = ref(0)
const topOffset = ref(0)

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
    hideDropDown()
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

// onMounted(()=>{
//     console.log('sellerStore.commentCapturingCampaignData')
//     console.log(sellerStore.commentCapturingCampaignData)
// })

const refresh=(platform) =>{

    if(platform == 'tiktok') eventBus.emit('refreshTiktok')
}
 

const stopCapturing = (platform)=>{
    console.log('stop capturing')
    // console.log(sellerStore.commentCapturingCampaignData)
    if(platform=='tiktok') sellerStore.commentCapturingCampaignData.tiktok_campaign={}
    if(platform=='twitch') sellerStore.commentCapturingCampaignData.twitch_campaign={}
    if(platform=='all') sellerStore.commentCapturingCampaignData={}
    hideDropDown()
}

const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

</script>

<style scoped>
.dropdown-content{
    padding: 0px ;
}
.dropdown-item.cursor-pointer.w-full{
    padding: 0px !important;
    border-radius: 0 !important;
}
</style>
