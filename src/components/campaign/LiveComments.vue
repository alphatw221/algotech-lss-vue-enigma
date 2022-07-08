<template>
    <!-- BEGIN: Comments -->
        <TabGroup :selectedIndex="0"
            class="box col-span-12 col-start-1 row-start-1 row-span-2 mt-2 h-screen
            lg:col-span-5 lg:row-span-6 lg:mt-0 lg:h-[100%]
            2xl:col-span-4 ">
        <div class="flex flex-col h-full">
            <div class="flex flex-none h-18">
                <h2 class="my-auto ml-5 mr-auto text-lg font-medium">
                    Comments
                </h2>
                <div class="my-4 mr-5">
                    <TabList class="nav-pills">
                        <Tab class="w-8 h-8 pl-0 pr-1 mt-1 " tag="button"
                            @click="allVideo()">
                            <font-awesome-icon icon="fa-regular fa-comments" class="h-5 m-1 -mt-1" />
                        </Tab>
                        <Tab v-show="fbTab" class="w-8 h-8 pl-0 pr-1 mt-1 " tag="button"
                            @click="toggleTabs(1)" >
                            <FacebookIcon class="m-1 -mt-1" />
                        </Tab>
                        <Tab v-show="igTab" class="w-8 h-8 pl-0 pr-1 mt-1 " tag="button"
                            @click="toggleTabs(2)">
                            <InstagramIcon class="m-1 -mt-1" />
                        </Tab>
                        <Tab v-show="ytTab" class="w-8 h-8 pl-0 pr-1 mt-1 " tag="button"
                            @click="toggleTabs(3)">
                            <YoutubeIcon class="m-1 -mt-1" />
                        </Tab>
                    </TabList>
                </div>
            </div>
            <AccordionGroup v-if="ready" class="flex-none accordion-boxed h-fit">
                <AccordionItem class="h-auto">
                    <Accordion class="rounded-lg bg-primary">
                        <div class="flex justify-end w-full"> <PlusIcon class="mx-5 -mt-2 text-white" /> </div>
                    </Accordion>
                    <AccordionPanel
                        class="w-full leading-relaxed text-slate-600 dark:text-slate-500">
                        <iframe
                            :class="{ hidden: openTab !== 1, block: openTab === 1 }"
                            :src="`https://www.facebook.com/plugins/video.php?allowfullscreen=true&autoplay=true&href=https%3A%2F%2Fwww.facebook.com%2F${page_id}%2Fvideos%2F${post_id}%2F&width=auto`" 
                                scrolling="no" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                        </iframe> 
                        <!-- <div :class="{ hidden: openTab !== 2, block: openTab === 2 }"
                            v-html="ig_video" class="-mt-2"></div> -->
                        <iframe 
                            :class="{ hidden: openTab !== 2, block: openTab === 2 }"
                            v-if="igMedia !== '' && igMedia !== null" data-platform="yt" :src="igMedia" scrolling="no" frameborder="0" allow="accelerometer;
                            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <video :class="{ hidden: openTab !== 2, block: openTab === 2 }"
                            v-else width="600" class="-mt-1" controls></video>
                        <iframe 
                            :class="{ hidden: openTab !== 3, block: openTab === 3 }"
                            data-platform="yt" :src="`https://www.youtube.com/embed/${live_video_id}`"
                            width="auto" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allow="accelerometer;
                            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </AccordionPanel>
                </AccordionItem>
            </AccordionGroup>
            <div class="m-3 overflow-y-auto bg-white grow h-fit scrollbar-hidden">
                <TabPanels>
                    <template v-for="(type, index) in platform" :key="index">
                        <TabPanel v-if="type === 'all'" :class="type" class="relative bg-white">
                            <div class="sticky z-50 flex-wrap justify-start bg-white -top-1 h-fit">
                                <button class="m-1 shadow-sm btn btn-danger w-fit tags" @click="commentSummurizer('Shipping')">
                                    <HashIcon class="w-4 h-4 mr-2" /> Shipping
                                </button>
                                <button class="m-1 shadow-sm btn btn-pending w-fit tags" @click="commentSummurizer('Return')">
                                    <HashIcon class="w-4 h-4 mr-2" /> Return
                                </button>
                                <button class="m-1 shadow-sm btn btn-warning w-fit tags" @click="commentSummurizer('Size')">
                                    <HashIcon class="w-4 h-4 mr-2" /> Size
                                </button>
                                <button class="m-1 shadow-sm btn btn-dark w-fit tags" @click="commentSummurizer('Undefined')">
                                    <HashIcon class="w-4 h-4 mr-2" /> Undefined
                                </button>
                                <div class="flex"> 
                                    <h2 v-if="tags !== ''" class="p-1">Selected tag: {{ tags }}</h2>
                                    <button class="flex p-1 ml-auto w-18 text-slate-900"
                                        @click="commentSummurizer('')">
                                        <XIcon class="w-4 h-4" /> Clear 
                                    </button> 
                                </div>
                            </div>
                            <div class="mt-1 h-fit" >
                                <CommentListView :platformName="type" :pageId="page_id" />
                            </div>
                        </TabPanel>
                        <TabPanel v-else :class="type">
                            <div class="mt-1 h-fit" >
                                <CommentListView :platformName="type"/>
                            </div>
                        </TabPanel>
                    </template>
                </TabPanels>
            </div>
        </div>
            
    </TabGroup>
    <!-- END: comments -->
</template>

<script>
import { get_comments, get_summerize_comments } from "@/api/campaign_comment";
import CommentListView from './CommentListView.vue';


export default {
    components: {
        CommentListView,
    },
    props: {
        campaignId: Number
    },

    data() {
        return {
            platform: [],
            imagePath: import.meta.env.VITE_APP_IMG_URL,
            tags: "",
            ready:false,
            fbTab:false,
            igTab:false,
            ytTab:false,
            product_columns: [
                { name: "Image", key: "image" },
                { name: "Name", key: "name" },
                { name: "Order Code", key: "order_code" },
                { name: "Sold/Left", key: "Sold_Left" },
                { name: "Price", key: "price" },
                { name: "Activate", key: "activate" },
            ],
            comments: [
                { name: "Image", key: "image" },
                { name: "Name", key: "name" },
                { name: "Comment id", key: "_id" },
                { name: "message", key: "message" }
            ],
            campaign_id: this.$route.params.campaign_id,
            accessToken: this.$cookies.get('access_token'),
            ig_video: '<video width="600" controls></video>',
            yt_live: '',
            page_id: '',
            post_id: '',
            igMedia: '', 
            openTab: 1,
        };
    },
    mounted() {
        this.get_all_comments()
        this.eventBus.on("changeCommentData", (payload) => {
            this.get_all_comments()
        });
    },
    methods: {
        toggleTabs(tabNumber){
            this.openTab = tabNumber
        },
        commentSummurizer(status) {
            this.tags = status
            if(status === ''){
                this.eventBus.emit("getbackNormalComments")
            }else{
                this.eventBus.emit("all_commentSummurizerTrigger", { status: status })
            }
        },
        get_all_comments() {
            if (!this.campaignId) {
                return false
            }
            get_comments(this.campaign_id).then(res => {
                return res.data
            }).then(res => {
                this.platform = []
                Object.keys(res).forEach(v => { 
                    if ((v === 'facebook' && res[v]['fully_setup'] === true)) {
                        this.fbTab = true
                        this.platform.push('facebook')
                        this.page_id = res[v]['page_id']
                        this.post_id = res[v]['post_id']
                    } else if ((v === 'instagram' && res[v]['fully_setup'] === true)) {
                        this.igTab = true
                        this.igMedia = res[v]['media_url']
                        // console.log(this.igMedia)
                        // if (res[v]['media_url']) {
                        //     this.ig_video = this.generate_ig_embed_url(res[v]['media_url'], '100%', 260)
                        // }
                        this.platform.push('instagram')
                    } else if ((v === 'youtube' && res[v]['fully_setup'] === true)) {
                        this.ytTab = true
                        this.yt_live = res[v]['live_video_id']
                        // this.yt_video = this.generate_yt_embed_url(res[v]['live_video_id'], '100%', 260)
                        this.platform.push('youtube')
                    } else if ((v === 'all' && res[v]['fully_setup'] === true)){
                        this.platform.push('all')
                    }
                })
                this.allVideo()
                this.ready = true
            }).then(res => {
                this[`open_${this.platform[0]}_video`] = true
                this.eventBus.emit("startReceivingCommentData");
            }).catch(err=>{
                console.log(err)
        })
        },
        generate_ig_embed_url: function (media_url, width = 1280, height = 720) {
            return `<iframe data-platform="yt" src="${media_url}"
                width="${width}" height="${height}" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allow="accelerometer;
                autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        },
        allVideo(){
            console.log(this.platform)
            for (let tab = 0; tab < this.platform.length; tab++){
                if(this.platform[tab] === 'facebook'){
                    this.openTab = 1;
                    return
                }else if(this.platform[tab] === 'instagram'){
                    this.openTab = 2;
                    return
                }
                else if(this.platform[tab] === 'youtube'){
                    this.openTab = 3;
                    return
                }
            }
        }
    }
}
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
}

.tags{
    border-radius: 35px 10px 10px 35px;
    padding-left: 8px !important;
    height: 35px !important;
}
</style>