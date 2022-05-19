<template>
<!-- OUTTER BOX --> 
  <div class="intro-y chat grid grid-cols-12 gap-5" style="height: 100%; overflow: auto;">
    <!-- BEGIN: commit box -->
        <TabGroup class=" col-span-12 lg:col-span-5 2xl:col-span-4 ">
            <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-6 w-150">
                <div class="col-start-1 col-span-5 -mt-4">
                    <h2 class="text-lg font-medium">Comments 
                        <button class="p-3" @click="showTags"> 
                            <FolderIcon /> </button> </h2>
                </div>
                <div class="col-end-11 -mt-3">
                    <TabList class="nav-pills">
                    <Tab class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button"> <FacebookIcon class="m-1 -mt-1"/></Tab>
                    <Tab class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button"> <InstagramIcon class="m-1 -mt-1"/></Tab>
                    <Tab class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button"> <YoutubeIcon class="m-1 -mt-1"/></Tab>
                    </TabList>
                </div>
                <div class=" col-start-1 col-span-12 -mt-2">
                    <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4">
                        <source src="mov_bbb.ogg" type="video/ogg">
                        Your browser does not support HTML video.
                    </video>
                </div>
                <div v-show="tagBox" class="col-start-1 col-span-12" >
                    <button class="btn btn-rounded-danger w-fit col-start-2 mr-2 " @click="this.tags = 'Tag : # Shipping'" >
                        <HashIcon class="w-4 h-4 mr-2" /> Shipping
                    </button>
                    <button class="btn btn-rounded-pending w-fit  col-start-1 mr-2 "  @click="this.tags = 'Tag : # Return'" >
                        <HashIcon class="w-4 h-4 mr-2" /> Return
                    </button>
                    <button class="btn btn-rounded-warning w-fit  col-start-1 mr-2 " @click="this.tags = 'Tag : # Size'">
                        <HashIcon class="w-4 h-4 mr-2" /> Size
                    </button>
                    <button class="btn btn-rounded-dark w-fit h-10  col-start-1 mr-2 " @click="this.tags = 'Tag : Undefined'" >
                        <HashIcon class="w-4 h-4 mr-2" /> Undefined
                    </button>
                    <h2 class="p-2" >{{tags}}</h2>
                </div>
            </div>
      
            <TabPanels>
                <TabPanel>
                <div
                    class="chat__lss__chat-list box overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4"
                >
                    <div
                    v-for="(faker, fakerKey) in $_.take($f(), 10)"
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt="Midone Tailwind HTML Admin Template"
                                class="rounded-full"
                                :src="faker.photos[0]"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                        <a href="javascript:;" class="font-medium">{{
                            faker.users[0].name
                        }}</a>
                        <div class="text-xs text-slate-400 ml-auto">
                            {{ faker.times[0] }}
                        </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                        {{ faker.news[0].shortContent }}
                        </div>
                    </div>
                    </div>
                </div>
                <div
                    v-show="replyBar"
                    class="pt-4 pb-10 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400"
                >
                    <textarea
                    class="chat__box__input form-control dark:bg-darkmode-600 h-16 resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
                    rows="1"
                    placeholder="Type your message..."
                    ></textarea>
                    <div
                    class="flex absolute sm:static left-0 bottom-0 ml-5 sm:ml-0 mb-5 sm:mb-0"
                    >
                    <a
                        href="javascript:;"
                        class="w-8 h-8 sm:w-10 sm:h-10 block bg-primary text-white rounded-full flex-none flex items-center justify-center mx-2"
                    >
                        <SendIcon class="w-4 h-4" />
                    </a>
                    </div>
                </div>
                </TabPanel>
                <TabPanel> second </TabPanel>
                <TabPanel> thrid </TabPanel>
            </TabPanels>
        </TabGroup>

        <div class="col-span-12 lg:col-span-4 2xl:col-span-4" height="750px" >  
            <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-6 w-150">
                <div class="col-start-1 col-span-5 -mt-4">
                    <h2 class="text-lg font-medium">Product</h2>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-4 2xl:col-span-4" height="750px" >  
            <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-6 w-150">
                <div class="col-start-1 col-span-5 -mt-4">
                    <h2 class="text-lg font-medium">Incoming Order</h2>
                </div>
            </div>
        </div>

    </div>
    <!-- END: Chat Side Menu -->
</template>

<script>
// import {campaign_comment_summarize} from '@/api/user';
export default{

    data(){
        return{
            tags: '', 
            replyBar: false,
            tagBox: false, 
        }
    },
    methods:{
        showReplyBar(){
            this.replyBar = !this.replyBar;
        },
        showTags(){
            this.tagBox = !this.tagBox;
        }
    }
}
</script>

<style scoped>

</style>