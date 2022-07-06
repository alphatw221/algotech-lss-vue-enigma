<template>
    <!-- BEGIN: Comments -->
        <TabGroup :selectedIndex="0"
            class="box col-span-12 col-start-1 row-start-1 row-span-2 mt-2 h-screen
            lg:col-span-5 lg:row-span-6 lg:mt-0 lg:h-[100%]
            2xl:col-span-4 ">
        <div class="flex flex-col h-full">
            <div class="flex-none flex h-18">
                <h2 class="text-lg font-medium mr-auto ml-5 my-auto">
                    Comments
                </h2>
                <div class="my-4 mr-5">
                    <TabList class="nav-pills">
                        <Tab class=" w-8 h-8 pr-1 pl-0 mt-1" tag="button"
                            @click="allVideo()">
                            <font-awesome-icon icon="fa-regular fa-comments" class="m-1 -mt-1 h-5" />
                        </Tab>
                        <Tab v-show="fbTab" class=" w-8 h-8 pr-1 pl-0 mt-1" tag="button"
                            @click="toggleTabs(1)" >
                            <FacebookIcon class="m-1 -mt-1" />
                        </Tab>
                        <Tab v-show="igTab" class=" w-8 h-8 pr-1 pl-0 mt-1" tag="button"
                            @click="toggleTabs(2)">
                            <InstagramIcon class="m-1 -mt-1" />
                        </Tab>
                        <Tab v-show="ytTab" class=" w-8 h-8 pr-1 pl-0 mt-1" tag="button"
                            @click="toggleTabs(3)">
                            <YoutubeIcon class="m-1 -mt-1" />
                        </Tab>
                    </TabList>
                </div>
            </div>
            <AccordionGroup class="accordion-boxed flex-none h-fit">
                <AccordionItem class="h-auto">
                    <Accordion class="bg-primary rounded-lg">
                        <div class="w-full flex justify-end"> <PlusIcon class="text-white mx-5 -mt-2" /> </div>
                    </Accordion>
                    <AccordionPanel
                        class="text-slate-600 dark:text-slate-500 leading-relaxed">
                        <!-- <div v-show="open_fb_video" class="-mt-2 -mb-20 sm:-mb-10 2xl:mb-0 border-0 overflow-hidden" >
                            <video width="600" controls>
                                <iframe :src="`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F${page_id}%2Fvideos%2F${post_id}%2F&width=100%`" 
                                scrolling="no" frameborder="0" allowfullscreen="true" 
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                            </video>
                        </div> -->
                        <div :class="{ hidden: openTab !== 1, block: openTab === 1 }" 
                            v-html="fb_video" class="-mt-2 -mb-20 sm:-mb-10 2xl:mb-0"></div>
                        <div :class="{ hidden: openTab !== 2, block: openTab === 2 }"
                            v-html="ig_video" class="-mt-2" >
                            </div>
                        <div :class="{ hidden: openTab !== 3, block: openTab === 3 }"
                            v-html="yt_video" class="-mt-2">
                            </div>
                    </AccordionPanel>
                </AccordionItem>
            </AccordionGroup>
            <div v-show="trigger" class="flex-none"></div>
            <div class="grow h-fit m-3 overflow-y-auto scrollbar-hidden bg-white">
                <TabPanels>
                    <template v-for="(type, index) in platform" :key="index">
                        <TabPanel v-if="type === 'all'" :class="type" class="relative">
                            <div class="flex-wrap justify-start z-50 sticky top-0 bg-white h-fit">
                                <button class="btn btn-rounded-danger w-fit m-1" @click="commentSummurizer('Shipping')">
                                    <HashIcon class="w-4 h-4 mr-2" /> Shipping
                                </button>
                                <button class="btn btn-rounded-pending w-fit m-1" @click="commentSummurizer('Return')">
                                    <HashIcon class="w-4 h-4 mr-2" /> Return
                                </button>
                                <button class="btn btn-rounded-warning w-fit m-1" @click="commentSummurizer('Size')">
                                    <HashIcon class="w-4 h-4 mr-2" /> Size
                                </button>
                                <button class="btn btn-rounded-dark w-fit h-10 m-1" @click="commentSummurizer('Undefined')">
                                    <HashIcon class="w-4 h-4 mr-2" /> Undefined
                                </button>
                                <div class="flex"> 
                                    <h2 v-if="tags !== ''" class="p-1">Selected tag: {{ tags }}</h2>
                                    <button class="w-18 flex text-slate-900 p-1 ml-auto"
                                        @click="commentSummurizer('')">
                                        <XIcon class="w-4 h-4" /> Clear 
                                    </button> 
                                </div>
                            </div>
                            <div class="h-fit mt-1" >
                                <CommentListView :platformName="type"/>
                            </div>
                        </TabPanel>
                        <TabPanel v-else :class="type">
                            <div class="h-fit mt-1" >
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
            fbTab:false,
            igTab:false,
            ytTab:false,
            trigger: true,
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
            // webSocket: null,
            fb_video: '<video width="600" controls></video>',
            ig_video: '<video width="600" controls></video>',
            yt_video: '<video width="600" controls></video>',
            page_id: '',
            post_id: '', 
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
            console.log("get_all_comments")
            if (!this.campaignId) {
                return false
            }
            get_comments(this.campaign_id).then(res => {
                return res.data
            }).then(res => {
                Object.keys(res).forEach(v => {
                    if ((v === 'facebook' && res[v]['fully_setup'] === true)) {
                        this.fbTab = true

                        this.fb_video = this.generate_fb_embed_url(res[v]['page_id'], res[v]['post_id'], '100%', 260)

                        this.platform.push('facebook')
                        this.page_id = res[v]['page_id']
                        this.post_id = res[v]['post_id']
                    } else if ((v === 'instagram' && res[v]['fully_setup'] === true)) {
                        this.igTab = true
                        if (res[v]['media_url']) {
                            this.ig_video = this.generate_ig_embed_url(res[v]['media_url'], '100%', 260)
                        }
                        this.platform.push('instagram')
                    } else if ((v === 'youtube' && res[v]['fully_setup'] === true)) {
                        this.ytTab = true
                        this.yt_video = this.generate_yt_embed_url(res[v]['live_video_id'], '100%', 260)
                        this.platform.push('youtube')
                    } else {
                        this.allTab = true
                        this.platform.push('all')
                    }
                })
                this.trigger = false
            }).then(res => {
                this[`open_${this.platform[0]}_video`] = true
                this.eventBus.emit("startReceivingCommentData");
            })
        },
        generate_fb_embed_url: function (page_id, post_id, width = 1280, height = 720) {
            return `<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F${page_id}%2Fvideos%2F${post_id}%2F&width=${width}" width="${width}" height="${height}" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>`;
        },
        generate_yt_embed_url: function (live_video_id, width = 1280, height = 720) {
            return `<iframe data-platform="yt" src="https://www.youtube.com/embed/${live_video_id}"
                width="${width}" height="${height}" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allow="accelerometer;
                autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        },
        generate_ig_embed_url: function (media_url, width = 1280, height = 720) {
            return `<iframe data-platform="yt" src="${media_url}"
                width="${width}" height="${height}" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allow="accelerometer;
                autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        },
        allVideo(){
            for(const tab in this.platform){
                if(tab === 'facebook'){
                    this.openTab = 1;
                    return
                }else if(tab === 'instagram'){
                    this.openTab = 2;
                    return
                }
                else if(tab === 'youtube'){
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
    max-width: 50% !important;
}

.accordion-item{
    border: none;
}
</style>