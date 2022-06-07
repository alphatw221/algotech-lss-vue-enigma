<template>
    <!-- BEGIN: Comments -->
    <TabGroup class="col-span-12 col-start-1 row-start-1 row-span-4 lg:col-span-5 2xl:col-span-4">
        <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-2 p-5">
            <div class="col-start-1 col-span-5 -mt-4">
                <h2 class="text-lg font-medium">
                    Comments
                    <button class="p-3" @click="this.tagBox = !this.tagBox; this.tags = ''; ">
                        <FolderIcon />
                    </button>
                </h2>
            </div>
            <div class="col-end-11 -mt-3">
            <TabList class="nav-pills">
                <Tab class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button">
                <FacebookIcon class="m-1 -mt-1" />
                </Tab>
                <Tab class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button">
                <InstagramIcon class="m-1 -mt-1" />
                </Tab>
                <Tab class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button">
                <YoutubeIcon class="m-1 -mt-1" />
                </Tab>
            </TabList>
            </div>
            <div class="col-start-1 col-span-12 -mt-2">
                <video width="600" controls>
                    <source src="mov_bbb.mp4" type="video/mp4" />
                    <source src="mov_bbb.ogg" type="video/ogg" />
                    Your browser does not support HTML video.
                </video>
            </div>
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
            <!-- FB -->
            <TabPanel>
                <div class="chat__chat-list box overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4">
                    <!-- <CampaignLiveTable/> -->
                    <CampaignLiveTable
                        :requestUrl="'/api/campaign-comment/:campaign_id'"
                        :columns="tableColumns"
                        :routerParam="comment_status"
                    >
                    </CampaignLiveTable>

                </div>

            </TabPanel>
            <!-- IG -->
            <TabPanel>
                <div class="chat__chat-list box overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4 max-h-[26rem]">
                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-2.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Jenn Jennifer</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                G5M+1
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-6.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Mandy Huynh</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                G5M+2
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/kuai.mai.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Kuai.mai</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                Live Show Seller: "G5M" Qty: 1 is added. Shopping cart link is sent via
                                FB Messenger, please contact page admin if not received any
                                notification.
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/kuai.mai.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Kuai.mai</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                Live Show Seller: "G5M" Qty: 2 is added. Shopping cart link is sent via
                                FB Messenger, please contact page admin if not received any
                                notification.
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-11.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Carlyn Tan</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                B5S+1
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/kuai.mai.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Kuai.mai</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                Live Show Seller: "B5S" Qty: 1 is added. Shopping cart link is sent via
                                FB Messenger, please contact page admin if not received any
                                notification.
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-3.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Daisies Salt</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                U10+1
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-2.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Vi Vian</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                U10+1
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/kuai.mai.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Kuai.mai</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                Live Show Seller: "U10" Qty: 1 is added. Shopping cart link is sent via
                                FB Messenger, please contact page admin if not received any
                                notification.
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-12.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <Tippy>
                            <div class="ml-2 overflow-hidden">
                                <div class="flex items-center">
                                    <a href="javascript:;" class="font-medium">Nina</a>
                                    <div class="text-xs text-slate-400 ml-auto">

                                    </div>
                                </div>
                                <div class="w-full truncate text-slate-500 mt-0.5">
                                    B6L+1
                                </div>
                            </div>
                        </Tippy>
                    </div>
                </div>

                <div class="ml-2 overflow-hidden">
                    <div class="flex items-center">
                        <a href="javascript:;" class="font-medium">
                            <!-- {{faker.users[1].name}} -->
                        </a>
                        <div class="text-xs text-slate-400 ml-auto">
                            <!-- {{ faker.times[1] }} -->
                        </div>
                    </div>
                </div>
            </TabPanel>
            <!-- YT -->
            <TabPanel>
                <div class="chat__chat-list box overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4 max-h-[26rem]">
                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-3.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Mei Ying</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                B10+1
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/kuai.mai.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Kuai.mai</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                Live Show Seller: "B10" Qty: 1 is added. Shopping cart link is sent via
                                FB Messenger, please contact page admin if not received any
                                notification.
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-4.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Michelle Ng</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                B10+2
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/kuai.mai.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Kuai.mai</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                Live Show Seller: "B10" Qty: 2 is added. Shopping cart link is sent via
                                FB Messenger, please contact page admin if not received any
                                notification.
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-11.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Carlyn Tan</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                B5S+1
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/kuai.mai.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Kuai.mai</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                Live Show Seller: "B5S" Qty: 1 is added. Shopping cart link is sent via
                                FB Messenger, please contact page admin if not received any
                                notification.
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-3.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Daisies Salt</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                U10+1
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-2.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Vi Vian</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                U10+1
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/kuai.mai.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Kuai.mai</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                Live Show Seller: "U10" Qty: 1 is added. Shopping cart link is sent via
                                FB Messenger, please contact page admin if not received any
                                notification.
                            </div>
                        </div>
                    </div>

                    <div :key="fakerKey" class="intro-x cursor-pointer relative flex items-center p-3"
                        @click="showReplyBar">
                        <Tippy class="rounded-full" content="Reply" theme='light'>
                            <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img alt="" class="rounded-full zoom-in" :src="'src/assets/images/profile-12.jpg'" />
                                <div
                                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                </div>
                            </div>
                        </Tippy>
                        <div class="ml-2 overflow-hidden">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">Nina</a>
                                <div class="text-xs text-slate-400 ml-auto">

                                </div>
                            </div>
                            <div class="w-full truncate text-slate-500 mt-0.5">
                                B6L+1
                            </div>
                        </div>
                    </div>

                </div>
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
            </TabPanel>
        </TabPanels>
    </TabGroup>
    <!-- END: comments -->
</template>