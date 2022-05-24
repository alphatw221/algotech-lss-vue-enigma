<template>
<!-- OUTTER BOX --> 
  <div class="intro-y chat grid grid-cols-12 gap-5" style="height: 100%; overflow: auto;">
    <!-- BEGIN: Comments -->
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
                <div v-show="tagBox" class="col-start-1 col-span-12 -mt-2 -mb-6" >
                    <button class="btn btn-rounded-danger w-fit m-1" @click="this.tags = 'Tag : # Shipping'" >
                        <HashIcon class="w-4 h-4 mr-2" /> Shipping
                    </button>
                    <button class="btn btn-rounded-pending w-fit m-1"  @click="this.tags = 'Tag : # Return'" >
                        <HashIcon class="w-4 h-4 mr-2" /> Return
                    </button>
                    <button class="btn btn-rounded-warning w-fit m-1" @click="this.tags = 'Tag : # Size'">
                        <HashIcon class="w-4 h-4 mr-2" /> Size
                    </button>
                    <button class="btn btn-rounded-dark w-fit h-10 m-1" @click="this.tags = 'Tag : Undefined'" >
                        <HashIcon class="w-4 h-4 mr-2" /> Undefined
                    </button> 
                    <button class="btn btn-outline-none w-18" style="border:0px; box-shadow:0px;" @click="this.tags = 'Tag : '">
                        <XIcon class="w-4 h-4 mr-2" /> Clean
                    </button>
                    <h2 class="p-2" >{{tags}}</h2>
                </div>
            </div>
      
            <TabPanels>
                <!-- FB -->
                <TabPanel>
                <div
                    class="chat__chat-list box overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4"
                >
                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-1.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Sinyee Woon</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                        U9+1
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            Live Show Seller: "U9" Qty: 1 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-7.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Lih Wen</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            U9+3
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            Live Show Seller: "U9" Qty: 3 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-3.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-2.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            Live Show Seller: "U10" Qty: 1 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            Live Show Seller: "U10" Qty: 1 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
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
                <!-- IG -->
                <TabPanel>
                <div
                    class="chat__chat-list box overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4"
                >
                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-2.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-6.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            Live Show Seller: "G5M" Qty: 1 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            Live Show Seller: "G5M" Qty: 2 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-11.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            Live Show Seller: "B5S" Qty: 1 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-3.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-2.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            Live Show Seller: "U10" Qty: 1 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-12.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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
                <!-- YT -->
                <TabPanel>
                <div
                    class="chat__chat-list box overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4"
                >
                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-3.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                        Live Show Seller: "B10" Qty: 1 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-4.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            Live Show Seller: "B10" Qty: 2 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-11.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            Live Show Seller: "B5S" Qty: 1 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-3.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-2.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/kuai.mai.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
                        </div>
                    </Tippy>
                    <div class="ml-2 overflow-hidden">
                        <div class="flex items-center">
                            <a href="javascript:;" class="font-medium">Kuai.mai</a>
                            <div class="text-xs text-slate-400 ml-auto">
                                
                            </div>
                        </div>
                        <div class="w-full truncate text-slate-500 mt-0.5">
                            Live Show Seller: "U10" Qty: 1 is added. Shopping cart link is sent via FB Messenger, please contact page admin if not received any notification.
                        </div>
                    </div>
                    </div>

                    <div
                    :key="fakerKey"
                    class="intro-x cursor-pointer relative flex items-center p-3"
                    @click="showReplyBar"
                    >
                    <Tippy class="rounded-full" content="Reply" theme='light'>
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                                <img
                                alt=""
                                class="rounded-full"
                                :src="'src/assets/images/profile-12.jpg'"
                                />
                            <div
                            class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                            ></div>
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
                
            </TabPanels>
        </TabGroup>
    <!-- END: comments -->

    <!-- BEGIN: Product -->
        <div class="col-span-12 lg:col-span-5 2xl:col-span-4" height="750px" >  
            <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-6">
                <row class="col-span-12"> 
                        <h2 class="text-lg font-medium w-48">Product</h2> 
                         <a href="javascript:;" @click="this.largeSlideOverSizePreview = !this.largeSlideOverSizePreview" 
                        class="btn btn-primary right-0">Add Product From Stock</a>
                </row>
                
            </div>
        </div>
    <!-- END: Product -->

    <!-- BEGIN: Incoming Order -->
        <div class="col-span-12 lg:col-span-4 2xl:col-span-4" height="750px" >  
            <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-6 w-150">
                <div class="col-start-1 col-span-5 -mt-4">
                    <h2 class="text-lg font-medium">Incoming Order</h2>
                </div>
            </div>
        </div>
    <!-- END: Incoming Order -->

    <!-- BEGIN: Add Product From Stock -->
        <Modal size="modal-xl" class="text-center" :slideOver="true" :show="largeSlideOverSizePreview" @hidden="largeSlideOverSizePreview = false">
            <ModalHeader class="text-center p-5">
                <h2 class="font-medium text-base text-center">
                    Add Product From Stock
                </h2>
            </ModalHeader>
            <ModalBody>
                <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
                    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
                        <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto sm:flex items-center">
                            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
                                >Category</label
                            >
                            <select
                                id="tabulator-html-filter-field"
                                class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
                            >
                                <option value="name">Name</option>
                                <option value="category">Category</option>
                                <option value="remaining_stock">Remaining Stock</option>
                            </select>
                        </form>
                    </div>

                    <table class="table table-report mt-5">
                        <thead>
                            <tr >
                                <th class="whitespace-nowrap" v-for="column in add_product_columns" :key="column.key">
                                    {{ column.name }}
                                </th>
                                <!--<th class="text-center whitespace-nowrap">Edit</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(product, key) in add_product_results"
                                :key="key"
                                class="intro-x"
                            >
                                <td v-for="column in add_product_columns" :key="column.key">
                                    <template v-if="column.key === 'image'" class="w-40">
                                        <div class="flex">
                                            <div class="w-10 h-10 image-fit zoom-in">
                                                <Tippy
                                                    tag="img"
                                                    class="rounded-full"
                                                    :src="product.image"
                                                    :content="`Uploaded at`"
                                                />
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        {{ product[column.key] }}
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ModalBody>
        </Modal>
    <!-- END: Add Product From Stock -->
    </div>
    
</template>

<script>
// import {campaign_comment_summarize} from '@/api/user';
export default{

    data(){
        return{
            tags: '', 
            replyBar: false,
            tagBox: false, 
            largeSlideOverSizePreview:false,
            add_product_columns: [
                {name: 'Select', key: 'select'},
				{name: 'Image', key: 'image'},
                {name: 'Name', key: 'name'}, 
                {name: 'Order Code', key: 'order_code'}, 
				{name: 'OTY for Campaign', key: 'qty_for_campaign'},
				{name: 'Max OTYOrder', key: 'max_qty'},
                {name: 'Price', key: 'price'},
				{name: 'Editable', key: 'editable'},
                {name: 'Deletable', key: 'deletable'},
                {name: 'Type', key: 'type'},
            ],
            add_product_results: [
                {
                    image: '',
                    name: '',
                    order_code: '',
                    qty_for_campaign: '',
                    max_qty: 20,
                    price: 20,
                    type: 'Product'
                },
            ],
            columns: [
                {name: 'Select', key:''},
				{name: 'Product', key: 'image'},
				{name: 'Name', key: 'name'},
                {name: 'Order Code', key: 'order_code'}, 
				{name: 'OTY for Campaign', key: 'qty'},
				{name: 'OTYOrder', key: 'qty'},
                {name: 'Price', key: 'price'},
				{name: 'Category', key: 'category'},
			],
			results: [
				{
					id: 123,
					created_by: null,
					meta: {},
					meta_logistic: {},
					tag: [],
					qty: 15,
					name: "2362",
					category: null,
					excerpt: null,
					description: "",
					content: null,
					remark: null,
					price: 12.0,
					price_ori: 0.0,
					tax: 0.0,
					currency: null,
					currency_sign: "$",
					points: 0,
					model: null,
					sku: null,
					upc: null,
					image: "",
					sort_order: 0,
					order_code: "A2S",
					max_order_amount: null,
					customer_removable: false,
					customer_editable: false,
					type: "product",
					status: "enabled",
					created_at: "2022-02-25T09:24:09.840000Z",
					updated_at: "2022-02-25T09:24:09.840000Z",
					user_subscription: 1
				},
				{
					id: 124,
					created_by: null,
					meta: {},
					meta_logistic: {},
					tag: [],
					qty: 24,
					name: "2363",
					category: null,
					excerpt: null,
					description: "",
					content: null,
					remark: null,
					price: 8.0,
					price_ori: 0.0,
					tax: 0.0,
					currency: null,
					currency_sign: "$",
					points: 0,
					model: null,
					sku: null,
					upc: null,
					image: "",
					sort_order: 0,
					order_code: "A2M",
					max_order_amount: null,
					customer_removable: false,
					customer_editable: false,
					type: "product",
					status: "enabled",
					created_at: "2022-02-25T09:24:54.512000Z",
					updated_at: "2022-02-25T09:24:54.512000Z",
					user_subscription: 1
				},
				{
					id: 125,
					created_by: null,
					meta: {},
					meta_logistic: {},
					tag: [],
					qty: 25,
					name: "2364",
					category: null,
					excerpt: null,
					description: "",
					content: null,
					remark: null,
					price: 7.0,
					price_ori: 0.0,
					tax: 0.0,
					currency: null,
					currency_sign: "$",
					points: 0,
					model: null,
					sku: null,
					upc: null,
					image: "",
					sort_order: 0,
					order_code: "A2L",
					max_order_amount: null,
					customer_removable: false,
					customer_editable: false,
					type: "product",
					status: "enabled",
					created_at: "2022-02-25T09:25:39.884000Z",
					updated_at: "2022-02-25T09:25:39.884000Z",
					user_subscription: 1
				},
				{
					id: 126,
					created_by: null,
					meta: {},
					meta_logistic: {},
					tag: [],
					qty: 68,
					name: "2365",
					category: null,
					excerpt: null,
					description: "",
					content: null,
					remark: null,
					price: 35.0,
					price_ori: 0.0,
					tax: 0.0,
					currency: null,
					currency_sign: "$",
					points: 0,
					model: null,
					sku: null,
					upc: null,
					image: "",
					sort_order: 0,
					order_code: "A3",
					max_order_amount: null,
					customer_removable: false,
					customer_editable: false,
					type: "product",
					status: "enabled",
					created_at: "2022-02-25T09:26:12.655000Z",
					updated_at: "2022-02-25T09:26:12.655000Z",
					user_subscription: 1
				},
				{
					id: 127,
					created_by: null,
					meta: {},
					meta_logistic: {},
					tag: [],
					qty: 110,
					name: "2366",
					category: null,
					excerpt: null,
					description: "",
					content: null,
					remark: null,
					price: 4.0,
					price_ori: 0.0,
					tax: 0.0,
					currency: null,
					currency_sign: "$",
					points: 0,
					model: null,
					sku: null,
					upc: null,
					image: "",
					sort_order: 0,
					order_code: "DB",
					max_order_amount: null,
					customer_removable: false,
					customer_editable: false,
					type: "product",
					status: "enabled",
					created_at: "2022-02-25T09:26:41.585000Z",
					updated_at: "2022-02-25T09:26:41.585000Z",
					user_subscription: 1
				},
            ]
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
.demo-breadcrumb-separator{
        color: #ff5500;
        padding: 0 5px;
    }
</style>