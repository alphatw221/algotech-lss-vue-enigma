<template>
    <!-- BEGIN: Comments -->
    <TabGroup class="col-span-12 col-start-1 row-start-1 row-span-4 lg:col-span-5 2xl:col-span-4" :selectedIndex="0">
        <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-2 p-5">
            <div class="col-start-1 col-span-5 -mt-4">
                <h2 class="text-lg font-medium">
                    Comments
                    <button class="p-3" @click="this.tagBox = !this.tagBox; this.tags = '';">
                        <FolderIcon />
                    </button>
                </h2>
            </div>
            <div class="col-end-11 -mt-3">
            <TabList class="nav-pills">
                <Tab v-show="fbTab" class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button">
                <FacebookIcon class="m-1 -mt-1" />
                </Tab>
                <Tab v-show="igTab" class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button">
                <InstagramIcon class="m-1 -mt-1" />
                </Tab>
                <Tab v-show="ytTab" class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button">
                <YoutubeIcon class="m-1 -mt-1" />
                </Tab>
            </TabList>
            </div>
            <div class="col-start-1 col-span-12 -mt-2">
                <video width="600" controls>
                    <!-- <source src="mov_bbb.mp4" type="video/mp4" />
                    <source src="mov_bbb.ogg" type="video/ogg" /> -->
                    Your browser does not support HTML video.
                </video>
            </div>
            <div v-show="trigger"></div>
            <div v-show="tagBox" class="col-start-1 col-span-12 -mt-2 -mb-6">
                <button class="btn btn-rounded-danger w-fit m-1" @click="status_change('Shipping')">
                    <HashIcon class="w-4 h-4 mr-2" /> Shipping
                </button>
                <button class="btn btn-rounded-pending w-fit m-1" @click="status_change('Return')">
                    <HashIcon class="w-4 h-4 mr-2" /> Return
                </button>
                <button class="btn btn-rounded-warning w-fit m-1" @click="status_change('Size')">
                    <HashIcon class="w-4 h-4 mr-2" /> Size
                </button>
                <button class="btn btn-rounded-dark w-fit h-10 m-1" @click="status_change('Undefined')">
                    <HashIcon class="w-4 h-4 mr-2" /> Undefined
                </button>
                <button class="btn btn-outline-none w-18" style="border: 0px; box-shadow: 0px"
                    @click="this.tagBox = !this.tagBox">
                    <XIcon class="w-4 h-4 mr-2" /> Close
                </button>
                <h2 class="p-2">{{ tags }}</h2>
            </div>
        </div>

        <TabPanels>
            <template v-for="(platform_data, index) in comment_results">
                <TabPanel>
                    <div class="chat__chat-list box overflow-y-auto scrollbar-hidden mt-1 max-h-[26rem]" :class="index">
                        <template v-if="platform_data">
                            <div v-for="(data, key) in platform_data" class="intro-x cursor-pointer relative flex items-center p-3" @click="showReplyBar">
                                <Tippy class="rounded-full" content="Reply" theme='light'>
                                    <div class="w-12 h-12 flex-none image-fit mr-1">
                                        <img alt="" class="rounded-full zoom-in" :src="data.image" />
                                        <div
                                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                        </div>
                                    </div>
                                </Tippy>
                                <div class="ml-2 overflow-hidden">
                                    <div class="flex items-center">
                                        <a href="javascript:;" class="font-medium">{{ data.customer_name }}</a>
                                        <div class="text-xs text-slate-400 ml-auto"></div>
                                    </div>
                                    <div class="w-full truncate text-slate-500 mt-0.5">
                                        {{ data.message }}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </TabPanel>
            </template>
            
            <!-- <TabPanel>
                <div class="chat__chat-list box overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4">
                    <CampaignLiveTable
                        :requestUrl="'/api/campaign-comment/' + campaignId"
                        :columns="tableColumns"
                        :routerParam="comment_status"
                    >
                    </CampaignLiveTable>
                </div>
            </TabPanel> -->
            <div v-show="replyBar"
                class="pt-4 pb-10 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400">
                <textarea
                    class="chat__box__input form-control dark:bg-darkmode-600 h-16 resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
                    rows="1" placeholder="Type your message..."></textarea>
                <div class="flex absolute sm:static left-0 bottom-0 ml-5 sm:ml-0 mb-5 sm:mb-0">
                    <a href="javascript:;"
                        class="w-8 h-8 sm:w-10 sm:h-10 block bg-primary text-white rounded-full flex-none flex items-center justify-center mx-2">
                        <SendIcon class="w-4 h-4" />
                    </a>
                </div>
            </div>
        </TabPanels>
    </TabGroup>
    <!-- END: comments -->
</template>

<script>
import { get_comments, get_summerize_comments } from "@/api/campaign_comment"

export default {
    props: {
        campaignId: Number
    },
    
    data() {
        return {
            fbTab:false,
            igTab:false,
            ytTab:false,
            imagePath: import.meta.env.VITE_APP_IMG_URL,
            tags: "",
            trigger:true,
            replyBar: false,
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
            comment_status: "Shipping",
            accessToken: this.$cookies.get('access_token'),
            websocket_connect: false
            
        };
    },
    mounted() {
        this.get_all_comments()
    },
    watch: {
        websocket_connect: function(val) {
            if (!val) {
                this.websocketConnect(this.comment_results)
            }
        }
    },
    methods: {
        status_change(status){
            this.comment_status = status;
            // console.log(this.comment_status);
            this.eventBus.emit("commentStatus", {status: this.comment_status})
        },
        toEnterID() {
            this.idPopupModalPreview = false;
            this.enterIDModalPreview = true;
        },

        facebookAccountClick(img) {
            this.facebookOverlappingModalPreview = false;
            this.facebookPageSelected = true;
            this.fbAvatar = img;
        },

        youtubeAccountClick(img) {
            this.youtubeOverlappingModalPreview = false;
            this.youtubePageSelected = true;
            this.ytAvatar = img;
        },

        instagramAccountClick(img) {
            this.instagramOverlappingModalPreview = false;
            this.instagramPageSelected = true;
            this.igAvatar = img;
        },

        cancelClean() {
            this.enterIDModalPreview = false;
            this.facebookPageSelected = false;
            this.youtubePageSelected = false;
            this.instagramPageSelected = false;
        },
        closeJump() {
            this.enterIDModalPreview = false;
            this.$router.push("campaign-live");
        },
        showReplyBar() {
            this.replyBar = !this.replyBar;
        },
        get_all_comments() {
            console.log("get_all_comments")
            get_comments(this.campaign_id).then(res=> {
                console.log(res.data)
                this.comment_results = res.data
                return res.data
            }).then(res=> {
                Object.keys(res).forEach(v=> {
                    if (v === 'facebook' && res[v].length != 0) {
                        this.fbTab = true
                    } else if (v === 'instagram' && res[v].length != 0) {
                        this.igTab = true
                    } else if (v === 'youtube' && res[v].length != 0) {
                        this.ytTab = true
                    }
                })
                this.trigger = false
            }).then(res=>{
                this.websocketConnect(this.comment_results)
            })
        },
        websocketConnect(comment_results) {
            const chatSocket = new WebSocket(
                `wss://gipassl.algotech.app/ws/campaign/${this.campaignId}/?token=${this.accessToken}`
            );
            chatSocket.onmessage = function(e) {
                const data = JSON.parse(e.data);
                console.log(data)
                if (data.type != "comment_data") {
                    return
                }
                comment_results[data.data.platform].unshift(data.data)
                
            };
            chatSocket.onopen = ()=>{
                console.log('connected')
                this.websocket_connect = true;
                console.log(this.websocket_connect)
            };
            chatSocket.onclose = function(e) {
                console.error('Chat socket closed unexpectedly');
                this.websocketClosed = false;
            };
            chatSocket.onerror = function(err) {
                console.error('Socket encountered error: ', err.message, 'Closing socket');
                chatSocket.close();
            };
        }
    }
}
</script>
<style scoped>
.demo-breadcrumb-separator {
    color: #ff5500;
    padding: 0 5px;
}

.form-check-input {
    border-color: black !important;
}

.table th {
    /*padding-left: 0 !important;*/
    padding-right: 0 !important;
}

.table td {
    /*padding-left: 0 !important;*/
    padding-right: 0 !important;
}
</style>