<template>
    <!-- BEGIN: Comments -->
    <div
        class="box mt-2 max-h-screen w-full 
            md:w-1/2 
            2xl:w-1/3
            flex flex-col h-full gap-2">
            <div class="flex flex-0 h-10 w-full">
                <h2 class="my-auto ml-5 mr-auto text-lg font-medium">
                    {{campaignDetailStore.campaign.title}}
                </h2>
                <div class="my-auto mr-5">
                    <div class="nav-pills flex">
                        <Dropdown class="btn w-8 h-8 pl-0 pr-1 mt-1">
                            <DropdownToggle class="">
                                <SimpleIcon icon="games" class="ml-[3px]"/>
                            </DropdownToggle>
                            <DropdownMenu class="w-fit">
                                <DropdownContent>
                                    <DropdownItem @click="toDrawList()" class="whitespace-nowrap">
                                        <SimpleIcon icon="lucky_draw" color="#2d8cf0" class="mr-1"/> {{$t('campaign_live.comment.lucky_draw')}}
                                    </DropdownItem>
                                    <DropdownItem @click="toQuizList()" class="whitespace-nowrap">
                                        <SimpleIcon icon="quiz" color="#2d8cf0" class="mr-1"/> {{$t('campaign_live.comment.quiz_game')}}
                                    </DropdownItem>
                                </DropdownContent>
                            </DropdownMenu>
                        </Dropdown>
                        <button  class="btn w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button"
                            @click="selectVideoTabs('facebook')" 
                        >
                            <PlatformIcon icon="fb" class="fill-primary pl-1" />
                            <!-- <img src="/src/assets/images/lss-icon/fb_comment.svg" class="absolute right-0 h-8 w-8" /> -->
                        </button>
                        <button  class="btn w-8 h-8 pl-0 pr-1 mt-1 " tag="button"
                            @click="selectVideoTabs('instagram')"
                        >
                            <PlatformIcon icon="ig" class="fill-primary pl-1" />
                        </button>
                        <button  class="btn w-8 h-8 pl-0 pr-1 mt-1 " tag="button"
                            @click="selectVideoTabs('youtube')"
                        >
                            <PlatformIcon icon="yt" class="fill-primary pl-1" />
                        </button>
                        <!-- <PlatformIcon icon="twitch" class="fill-primary pl-1" />
                            <PlatformIcon icon="tiktok" class="fill-primary pl-1" />
                        </button> -->
                    </div>
                </div>
            </div>
            <AccordionGroup class="flex-0 accordion-boxed h-fit w-full" >
                <AccordionItem class="h-auto">
                    <Accordion class="rounded-lg bg-primary">
                        <div class="flex justify-end w-full"> <PlusIcon class="mx-5 -mt-2 text-white" /> </div>
                    </Accordion>
                    <AccordionPanel
                        class="w-full leading-relaxed text-slate-600 dark:text-slate-500">
                        <div v-if="(!platformData.fb.ready && openVideoTab=='facebook')" class="relative"> 
                            <video width="600" class="-mt-1" controls />
                            <img :src="facebook_platform" class="z-10 absolute top-[10%] right-[50%] w-[30%] translate-x-1/2"/>
                        </div>
                        <div v-else-if="(!platformData.yt.ready && openVideoTab=='youtube')" class="relative"> 
                            <video width="600" class="-mt-1" controls />
                            <img :src="youtube_platform" class="z-10 absolute top-0 right-[50%] w-[40%] translate-x-1/2"/>
                        </div>
                        <div v-else-if="(!platformData.ig.ready && openVideoTab=='instagram')" class="relative"> 
                            <video width="600" class="-mt-1" controls />
                            <img :src="instagram_platform" class="z-10 absolute top-[10%] right-[50%] w-[30%] translate-x-1/2"/>
                        </div>


                        <!-- BEGIN FACEBOOK IFRAME -->
                        <iframe
                            v-else-if="platformData.fb.ready && openVideoTab=='facebook'"
                            :src="`https://www.facebook.com/plugins/video.php?allowfullscreen=true&autoplay=true&href=https%3A%2F%2Fwww.facebook.com%2F${platformData.fb.page_id}%2Fvideos%2F${platformData.fb.post_id}%2F&width=auto`" 
                                scrolling="no" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                        </iframe> 
                        <!-- BEGIN INSTAGRAM IFRAME -->
                        <iframe 
                            v-else-if="platformData.ig.ready && openVideoTab=='instagram'"
                            data-platform="yt" :src="platformData.ig.igMedia" scrolling="no" frameborder="0" allow="accelerometer;
                            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <!-- BEGIN YOUTUBE IFRAME -->
                        <iframe 
                            v-else-if="platformData.yt.ready && openVideoTab=='youtube'"
                            data-platform="yt" :src="`https://www.youtube.com/embed/${platformData.yt.yt_live}`"
                            width="auto" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allow="accelerometer;
                            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </AccordionPanel>
                </AccordionItem>
            </AccordionGroup>
            <TabGroup  class="flex-1 flex flex-col h-[55%] w-full gap-2" :selectedIndex="1" v-if="ready">
                <div class="flex flex-0">
                    <h2 class="my-auto ml-5 mr-auto text-lg font-medium leading-4">
                        {{$t(`campaign_live.comment.${listViewTitle}`)}}
                    </h2>
                    <div class="my-auto mr-5">
                        <TabList class="nav-pills">
                            <Tab class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" @click="setListViewTitle('comments_summarizer')"
                            >   
                                <Comments icon="bot" />
                            </Tab>

                            <Tab class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" @click="setListViewTitle('all_comments')" 
                            >
                                <Comments icon="all" />
                            </Tab>

                            <Tab  class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" v-if="route.query.status=='history'"  @click="setListViewTitle('facebook_comments')"
                            >
                                <Comments icon="fb" />
                            </Tab>
                            <Tab  class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" v-if="route.query.status=='history'"  @click="setListViewTitle('instagram_comments')"
                            >
                                <Comments icon="ig" /> 
                            </Tab>
                            <Tab  class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" v-if="route.query.status=='history'"  @click="setListViewTitle('youtube_comments')"
                            >
                                <Comments icon="yt" />
                            </Tab>
                            <Tab  class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" v-if="route.query.status=='history'"  @click="setListViewTitle('twitch_comments')"
                            >
                                <Comments icon="twitch" />
                            </Tab>
                            <Tab  class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" v-if="route.query.status=='history'"  @click="setListViewTitle('tiktok_comments')"
                            >
                                <Comments icon="tiktok" />
                            </Tab>
                        </TabList>
                    </div>
                </div>
                <div class="mx-3 mb-3 overflow-y-auto bg-white grow scrollbar-hidden">
                    <TabPanels>

                        <TabPanel  :class="'all'" class="relative bg-white">
                            <div class="mt-1 h-fit" >
                                <CommentListView :platformName="'commentSummarize'"  />
                            </div>
                        </TabPanel>

                        <TabPanel  :class="'all'" class="relative bg-white">
                            <div class="mt-1 h-fit" >
                                <CommentListView :platformName="'all'"  />
                            </div>
                        </TabPanel>

                        <TabPanel :class="'facebook'" v-if="route.query.status=='history'">
                            <div class="mt-1 h-fit" >
                                <CommentListView :platformName="'facebook'"/>
                            </div>
                        </TabPanel>
                        
                        <TabPanel :class="'instagram'" v-if="route.query.status=='history'">
                            <div class="mt-1 h-fit" >
                                <CommentListView :platformName="'instagram'"/>
                            </div>
                        </TabPanel>

                        <TabPanel :class="'youtube'" v-if="route.query.status=='history'">
                            <div class="mt-1 h-fit" >
                                <CommentListView :platformName="'youtube'"/>
                            </div>
                        </TabPanel>

                        <TabPanel :class="'twitch'" v-if="route.query.status=='history'">
                            <div class="mt-1 h-fit" >
                                <CommentListView :platformName="'twitch'"/>
                            </div>
                        </TabPanel>

                        <TabPanel :class="'tiktok'" v-if="route.query.status=='history'">
                            <div class="mt-1 h-fit" >
                                <CommentListView :platformName="'tiktok'"/>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </div>
            </TabGroup>
    </div>
    <!-- END: comments -->
</template>

<script setup>

import youtube_platform from "/src/assets/images/lss-img/youtube.png"
import facebook_platform from "/src/assets/images/lss-img/facebook.png"
import instagram_platform from "/src/assets/images/lss-img/instagram.png"

import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { get_campaign_setup_status } from "@/api_v2/campaign"
import CommentListView from './CommentListView.vue';
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useRoute, useRouter } from "vue-router";


const router = useRouter();
const route = useRoute()

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const campaignDetailStore = useCampaignDetailStore()

const platform= ref([])


const tags=ref("")
const ready=ref(false)

const platformData = ref({
    fb:{
        page_id:'',
        post_id:'',
        ready:false
    },
    yt:{
        yt_live:'',
        ready:false
    },
    ig:{
        igMedia:'',
        ready:false
    }
})
const product_columns= [
    { name: "Image", key: "image" },
    { name: "Name", key: "name" },
    { name: "Order Code", key: "order_code" },
    { name: "Sold/Left", key: "Sold_Left" },
    { name: "Price", key: "price" },
    { name: "Activate", key: "activate" },
]
const comments= [
    { name: "Image", key: "image" },
    { name: "Name", key: "name" },
    { name: "Comment id", key: "_id" },
    { name: "message", key: "message" }
]



const openVideoTab =ref('facebook')

const listViewTitle = ref('all_comments')
onMounted(()=>{
    get_campaign_setup_status(route.params.campaign_id).then(res => {
        return res.data
    }).then(data => {
        // console.log(data)
        Object.keys(data).forEach(key => { 
            if ((key === 'facebook' && data[key]['fully_setup'] === true)) {
                platformData.value.fb.page_id = data[key]['page_id']
                platformData.value.fb.post_id = data[key]['post_id']
                platformData.value.fb.ready = true
            } else if ((key === 'instagram' && data[key]['fully_setup'] === true)) {
                platformData.value.ig.igMedia = data[key]['media_url']
                platformData.value.ig.ready=true
            } else if ((key === 'youtube' && data[key]['fully_setup'] === true)) {
                platformData.value.yt.yt_live = data[key]['live_video_id']
                platformData.value.yt.ready=true
            } 
        })
        // console.log(platformData)
        ready.value=true
    })

})



const setListViewTitle = title=>{
    listViewTitle.value = title
}
const selectVideoTabs = tabName => openVideoTab.value=tabName
// const commentSummurizer = status => {
//         tags = status
//         if(status === ''){
//             this.eventBus.emit("getbackNormalComments")
//         }else{
//             this.eventBus.emit("all_commentSummurizerTrigger", { status: status })
//         }
//     }
const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

const toDrawList = ()=>{
    router.push({ name: 'lucky-draw-list', params: { campaign_id: route.params.campaign_id} })
    hideDropDown()
}
const toQuizList = ()=>{
    router.push({ name: 'quiz-game', params: { campaign_id: route.params.campaign_id} })
    hideDropDown()
}

// const openCapturePage=()=>{
//     let routeData = router.resolve({ name: 'comment-capture-page', params: {campaign_id: route.params.campaign_id} })
//     window.open(routeData.href, '_blank')
// }
</script>
<style scoped>

iframe {
    margin-top: -7px;
    width: 100% !important;
    height: 200px !important;
    border: none;
    overflow: hidden;
}

.accordion-item{
    border: none;
    padding-bottom: 0px !important ;
}

.tags{
    border-radius: 35px 10px 10px 35px;
    padding-left: 8px !important;
    height: 35px !important;
}

button[aria-selected="true"] svg{
  fill:white;
}
button[aria-selected="true"] svg .opposite{
  fill: theme('colors.primary');
} 
</style>