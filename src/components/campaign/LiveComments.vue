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
                    <!-- <button class="p-3" @click="this.tagBox = !this.tagBox; this.tags = '';">
                        <FolderIcon />
                    </button> -->
                </h2>
                <div class="my-4 mr-5">
                    <TabList class="nav-pills">
                        <Tab v-show="allTab" class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button"
                            @click="allVideo(); this.tagBox = true;">
                            <font-awesome-icon icon="fa-regular fa-comments" class="m-1 -mt-1 h-5" />
                        </Tab>
                        <Tab v-show="fbTab" class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button"
                            @click="this.open_fb_video = true; this.open_ig_video = false; this.open_yt_video = false;this.tagBox = false;">
                            <FacebookIcon class="m-1 -mt-1" />
                        </Tab>
                        <Tab v-show="igTab" class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button"
                            @click="this.open_fb_video = false; this.open_ig_video = true; this.open_yt_video = false;this.tagBox = false;">
                            <InstagramIcon class="m-1 -mt-1" />
                        </Tab>
                        <Tab v-show="ytTab" class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button"
                            @click="this.open_fb_video = false; this.open_ig_video = false; this.open_yt_video = true;this.tagBox = false;">
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
                        <div v-html="fb_video" class="-mt-2 -mb-20 sm:-mb-10 2xl:mb-0" v-show="open_fb_video" />
                        <div v-html="ig_video" class="-mt-2" v-show="open_ig_video" />
                        <div v-html="yt_video" class="-mt-2" v-show="open_yt_video" />
                    </AccordionPanel>
                </AccordionItem>
            </AccordionGroup>
            <div v-show="trigger" class="flex-none"></div>
            <div v-show="tagBox" class="col-start-1 col-span-12 -mt-3 -mb-6 flex-wrap">
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
                <button class="btn btn-outline-none w-18" style="border: 0px; box-shadow: 0px"
                    @click="getbackNormalComments()">
                    <XIcon class="w-4 h-4 mr-2" /> Clear 
                </button>
                <h2 class="p-2">{{ tags }}</h2>
            </div>
            <div class="grow h-fit m-3 overflow-y-auto scrollbar-hidden">
                <TabPanels>
                    <template v-for="(type, index) in platform" :key="index">
                        <TabPanel :class="type">
                            <div class="h-fit mt-1" >
                                <CommentListView :platformName="type"/>
                            </div>
                        </TabPanel>
                        <!-- <TabPanel>
                            <div class="h-fit mt-1" :class="index">
                                <template v-if="platform_data.comments">
                                    <div v-for="(reply, key) in platform_data.comments" :key="key"
                                        class="intro-x cursor-pointer relative flex items-center m-1 p-2 box rounded-l-full"
                                        @click="showReplyBar(reply)">
                                        <Tippy class="rounded-full " content="Reply" theme='light'>
                                            <div class="relative flex items-center w-full">
                                                <div class="w-14 h-14 flex-none image-fit mr-1">
                                                <img alt="" class="rounded-full zoom-in" :src="reply.image" />
                                                </div>
                                            
                                                <div class="ml-2 overflow-hidden w-full">
                                                    <div class="flex items-center">
                                                        <a class="font-medium">{{ reply.customer_name }}</a>
                                                        <div class="text-xs text-slate-400 ml-auto"></div>
                                                    </div>
                                                    <div class="text-slate-500 mt-0.5">
                                                        {{ reply.message }}
                                                    </div>
                                                </div>
                                            </div>
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                        </TabPanel> -->
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
            fbTab: false,
            igTab: false,
            ytTab: false,
            allTab: false,
            imagePath: import.meta.env.VITE_APP_IMG_URL,
            tags: "",
            trigger: true,
            tagBox: false,
            currentTab: '',
            product_columns: [
                { name: "Image", key: "image" },
                { name: "Name", key: "name" },
                { name: "Order Code", key: "order_code" },
                { name: "Sold/Left", key: "Sold_Left" },
                { name: "Price", key: "price" },
                { name: "Activate", key: "activate" },
            ],
            comment_results: {},
            campaign_id: this.$route.params.campaign_id,
            comments: [
                { name: "Image", key: "image" },
                { name: "Name", key: "name" },
                { name: "Comment id", key: "_id" },
                { name: "message", key: "message" }
            ],
            accessToken: this.$cookies.get('access_token'),
            webSocket: null,
            fb_video: '<video width="600" controls></video>',
            ig_video: '<video width="600" controls></video>',
            yt_video: '<video width="600" controls></video>',
            open_fb_video: false,
            open_ig_video: false,
            open_yt_video: false,
            page_id: '',
        };
    },
    mounted() {
        this.get_all_comments()
        this.eventBus.on("changeCommentData", (payload) => {
            this.get_all_comments()
            // this.comment_results[payload.platform]['comments'].unshift(payload)
        });
    },
    methods: {
        commentSummurizer(status) {
            this.eventBus.emit("all_commentSummurizerTrigger", { status: status })
        },
        get_all_comments() {
            console.log("get_all_comments")
            if (!this.campaignId) {
                return false
            }
            get_comments(this.campaign_id).then(res => {
                this.comment_results = res.data
                return res.data
            }).then(res => {
                Object.keys(res).forEach(v => {
                    if ((v === 'facebook' && res[v]['fully_setup'] === true)) {
                        this.fbTab = true
                        this.fb_video = this.generate_fb_embed_url(res[v]['page_id'], res[v]['post_id'], '100%', 260)
                        this.platform.push('facebook')
                        this.page_id = res[v]['page_id']
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
                        this.tagBox = true
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
                    this.open_fb_video = true; this.open_ig_video = false; this.open_yt_video = false;
                    return
                }else if(tab === 'instagram'){
                    this.open_fb_video = false; this.open_ig_video = true; this.open_yt_video = false;
                    return
                }
                else if(tab === 'youtube'){
                    this.open_fb_video = false; this.open_ig_video = false; this.open_yt_video = true;
                    return
                }
            }
        },
        getbackNormalComments() {
             this.eventBus.emit("getbackNormalComments")
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