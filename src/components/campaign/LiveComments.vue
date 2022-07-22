<template>
    <!-- BEGIN: Comments -->
        <TabGroup :selectedIndex="0" v-if="ready"
            class="box col-span-12 col-start-1 row-start-1 row-span-2 mt-2 h-screen
            lg:col-span-5 lg:row-span-6 lg:mt-0 lg:h-[100%]
            2xl:col-span-4 ">
        <div class="flex flex-col h-full">
            <div class="flex flex-none h-14">
                <h2 class="my-auto ml-5 mr-auto text-lg font-medium">
                    {{$t('campaign_live.live_stream')}}
                </h2>
                <div class="my-auto mr-5">
                    <div class="nav-pills">
                        <button  class="btn w-8 h-8 pl-0 pr-1 mt-1 " tag="button"
                            @click="selectVideoTabs('facebook')" 
                        >
                            <FacebookIcon class="m-1 " />
                        </button>
                        <button  class="btn w-8 h-8 pl-0 pr-1 mt-1 " tag="button"
                            @click="selectVideoTabs('instagram')"
                        >
                            <InstagramIcon class="m-1 " />
                        </button>
                        <button  class="btn w-8 h-8 pl-0 pr-1 mt-1 " tag="button"
                            @click="selectVideoTabs('youtube')"
                        >
                            <YoutubeIcon class="m-1 " />
                        </button>
                    </div>
                </div>
            </div>
            <AccordionGroup class="flex-none accordion-boxed h-fit">
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

                        
                        <!-- END FACEBOOK IFRAME -->

                        <!-- <div :class="{ hidden: openVideoTab !== 2, block: openVideoTab === 2 }"
                            v-html="ig_video" class="-mt-2"></div> -->

                        <!-- BEGIN INSTAGRAM IFRAME -->
                        <iframe 
                            v-else-if="platformData.ig.ready && openVideoTab=='instagram'"
                            data-platform="yt" :src="platformData.ig.igMedia" scrolling="no" frameborder="0" allow="accelerometer;
                            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <!-- <video v-show="openVideoTab=='instagram'"
                            v-else width="600" class="-mt-1" controls></video> -->
                        <!-- BEGIN INSTAGRAM IFRAME -->

                        <!-- BEGIN YOUTUBE IFRAME -->
                        <iframe 
                            v-else-if="platformData.yt.ready && openVideoTab=='youtube'"
                            data-platform="yt" :src="`https://www.youtube.com/embed/${platformData.yt.yt_live}`"
                            width="auto" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allow="accelerometer;
                            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                        <!-- BEGIN YOUTUBE IFRAME -->

                    </AccordionPanel>
                </AccordionItem>
            </AccordionGroup>


            <div class="flex flex-none h-10">
                <h2 class="my-auto ml-5 mr-auto text-lg font-medium">
                    {{$t('campaign_live.comment.comments')}}
                </h2>
                <div class="my-auto mr-5">
                    <TabList class="nav-pills">
                        <Tab class="w-8 h-8 pl-0 pr-1 mt-1 " tag="button"
                        >   
                        <font-awesome-icon icon="fa-regular fa-comment-dots" class="h-6 m-1 -mt-2" />
                        </Tab>

                        <Tab class="w-8 h-8 pl-0 pr-1 mt-1 " tag="button"
                        >
                            <font-awesome-icon icon="fa-regular fa-comments" class="h-5 m-1 -mt-1" />
                        </Tab>
                        <Tab  class="w-8 h-8 pl-0 pr-1 mt-1 " tag="button" v-if="route.query.status=='history'"
                        >
                            <FacebookIcon class="m-1 -mt-1" />
                        </Tab>
                        <Tab  class="w-8 h-8 pl-0 pr-1 mt-1 " tag="button" v-if="route.query.status=='history'"
                        >
                            <InstagramIcon class="m-1 -mt-1" />
                        </Tab>
                        <Tab  class="w-8 h-8 pl-0 pr-1 mt-1 " tag="button" v-if="route.query.status=='history'"
                        >
                            <YoutubeIcon class="m-1 -mt-1" />
                        </Tab>
                    </TabList>
                </div>
            </div>
            

            <div class="mx-3 mb-3 overflow-y-auto bg-white grow h-fit scrollbar-hidden">
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

                </TabPanels>
            </div>
        </div>
            
    </TabGroup>
    <!-- END: comments -->
</template>

<script setup>

import youtube_platform from "/src/assets/images/lss-img/youtube.png"
import facebook_platform from "/src/assets/images/lss-img/facebook.png"
import instagram_platform from "/src/assets/images/lss-img/instagram.png"

import { get_comments, get_summerize_comments } from "@/api/campaign_comment";
import CommentListView from './CommentListView.vue';

import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute()

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const platform= ref([])
const imagePath= import.meta.env.VITE_APP_IMG_URL
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

onMounted(()=>{
    get_comments(route.params.campaign_id).then(res => {
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





const selectVideoTabs = tabName => openVideoTab.value=tabName
// const commentSummurizer = status => {
//         tags = status
//         if(status === ''){
//             this.eventBus.emit("getbackNormalComments")
//         }else{
//             this.eventBus.emit("all_commentSummurizerTrigger", { status: status })
//         }
//     }



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
</style>