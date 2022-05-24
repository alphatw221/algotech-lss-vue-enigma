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
                         <a href="javascript:;" @click="this.addProductFromStock = !this.addProductFromStock" 
                        class="btn btn-primary right-0">Add Product From Stock</a>
                </row>
                
            </div>
            <div class="overflow-x-auto box">
                <table class="table table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th class="whitespace-nowrap" style="padding-right: 0px;" v-for="column in product_columns" :key="column.key">
                                {{ column.name }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in product_results" :key="data.id">
                            <td><img :src="data.image"></td>
                            <td>{{ data.name }}</td>
                            <td>{{ data.order_code }}</td>
                            <td>{{ data.qty_sold }}/{{ data.qty_for_sale - data.qty_sold }}</td>
                            <td>{{ data.currency_sign}}{{ data.price }}</td>
                            <td>
                                <div v-if="data.status === 1" class="
                                    form-check form-switch
                                    w-full
                                    sm:w-auto sm:ml-auto
                                    mt-3
                                    sm:mt-0
                                    ">
                                    <input @click="toggle" class="form-check-input mr-0 ml-0" type="checkbox" checked />
                                </div>
                                <div class="
                                    form-check form-switch
                                    w-full
                                    sm:w-auto sm:ml-auto
                                    mt-3
                                    sm:mt-0
                                    " v-else>
                                    <input @click="toggle" class="form-check-input mr-0 ml-0" type="checkbox">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    <!-- END: Product -->

    <!-- BEGIN: Incoming Order -->
        <div class="col-span-12 lg:col-span-4 2xl:col-span-4" height="750px" >  
            <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-6">
                <div class="col-start-1 col-span-5 -mt-4">
                    <h2 class="text-lg font-medium">Incoming Order</h2>
                </div>
            </div>
            <div class="overflow-x-auto box">
                <table class="table table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th class="whitespace-nowrap" style="padding-right: 0px;" v-for="column in incoming_order_columns" :key="column.key">
                                {{ column.name }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in incoming_order_results" :key="data.id">
                            <td>#{{ data.id }}</td>
                            <td>{{ data.platform }}</td>
                            <td>{{ data.customer_name }}</td>
                            <td>{{ data.currency_sign}}{{ data.subtotal }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    <!-- END: Incoming Order -->

    <!-- BEGIN: Add Product From Stock -->
        <Modal size="modal-xl" class="text-center" :slideOver="true" :show="addProductFromStock" @hidden="addProductFromStock = false">
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

                    <table class="table table-report mt-3">
                        <thead>
                            <tr >
                                <th class="whitespace-nowrap" v-for="column in add_product_columns" :key="column.key">
                                    <template v-if="column.key == 'select'">
                                         <div class="form-check mt-2" >
                                            <input id="checkbox-switch-1" class="form-check-input" type="checkbox" value=""/>
                                        </div>   
                                    </template>    
                                    <template v-if="column.key === 'qty_for_campaign' || column.key === 'max_qty'" style="width:80px;">
                                        {{ column.name }}        
                                    </template>
                                    <template v-else>
                                        {{ column.name }}
                                    </template>
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
                                    <template v-if="column.key === 'select' || column.key == 'editable' || column.key == 'deletable'">
                                        <div class="form-check mt-2">
                                            <input id="checkbox-switch-1" class="form-check-input" type="checkbox" value=""/>
                                        </div>
                                    </template>
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
                                    <template v-if="column.key === 'qty_for_campaign' || column.key === 'max_qty'">
                                        <input id="regular-form-1" type="text" class="form-control" placeholder="" style="width:100px;"/>
                                    </template>
                                    <template v-else class="w-30">
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
            addProductFromStock:false,
            add_product_columns: [
                {name: '', key: 'select'},
				{name: 'Image', key: 'image'},
                {name: 'Name', key: 'name'}, 
                {name: 'Order Code', key: 'order_code'}, 
				{name: 'OTY for Campaign', key: 'qty_for_campaign'},
				{name: 'Max OTY/Order', key: 'max_qty'},
                {name: 'Price', key: 'price'},
				{name: 'Editable', key: 'editable'},
                {name: 'Deletable', key: 'deletable'},
                {name: 'Type', key: 'type'},
            ],
            add_product_results: [
                {
                    image: '',
                    name: 'Box 1',
                    order_code: 'B1',
                    qty_for_campaign: '',
                    max_qty: 20,
                    price: 20,
                    type: 'Product'
                },
                {
                    image: '',
                    name: 'Box 2',
                    order_code: 'B2',
                    qty_for_campaign: '',
                    max_qty: 20,
                    price: 20,
                    type: 'Product'
                },
                {
                    image: '',
                    name: 'Box 3',
                    order_code: 'B3',
                    qty_for_campaign: '',
                    max_qty: 20,
                    price: 20,
                    type: 'Product'
                },
                {
                    image: '',
                    name: 'Box 4',
                    order_code: 'B4',
                    qty_for_campaign: '',
                    max_qty: 20,
                    price: 20,
                    type: 'Product'
                },
            ],
            product_columns: [
                {name: 'Image', key:'image'},
				{name: 'Name', key: 'name'},
                {name: 'Order Code', key: 'order_code'}, 
				{name: 'Sold/Left', key: 'Sold_Left'},
                {name: 'Price', key: 'price'},
				{name: 'Activate', key: 'activate'},
			],
			product_results: [
				{
					"id": 407,
                    "campaign_id": 155,
                    "created_by_id": 44,
                    "product_id": 53,
                    "qty_for_sale": 50,
                    "qty_sold": 4,
                    "name": "trousers",
                    "excerpt": null,
                    "description": null,
                    "content": null,
                    "remark": null,
                    "price": 950,
                    "price_ori": 0,
                    "tax": 0,
                    "currency": null,
                    "currency_sign": "$",
                    "points": 0,
                    "model": null,
                    "sku": null,
                    "upc": null,
                    "image": "3/product/53/6ece99405ad93e0ce091b798cea2f0f5.jpg",
                    "sort_order": 0,
                    "order_code": "tro",
                    "max_order_amount": 10,
                    "customer_removable": true,
                    "customer_editable": true,
                    "type": "product",
                    "status": 0,
                    "created_at": {
                        "$date": "2022-05-05T09:06:47.734Z"
                    },
                    "updated_at": {
                        "$date": "2022-05-05T09:07:37.779Z"
                    },
                    "meta": {},
                    "meta_logistic": {},
                    "tag": {}
				},
            ],
            incoming_order_columns: [
                {name: 'Order No', key:'order_no'},
				{name: 'Platform', key: 'platform'},
                {name: 'Name', key: 'name'}, 
				{name: 'Amount', key: 'amount'},
                {name: 'Detail', key: 'detail'},
			],
			incoming_order_results: [
				{
					"id": 801,
                    "campaign_id": 440,
                    "customer_id": "4715244265240387",
                    "customer_name": "Chiangcheng Lien",
                    "customer_img": "https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=4715244265240387&height=50&width=50&ext=1655619700&hash=AeS_9qc2HVOMIfvys18",
                    "email": null,
                    "phone": null,
                    "first_name": null,
                    "last_name": null,
                    "gender": null,
                    "remark": null,
                    "subtotal": 3200,
                    "total": 3200,
                    "currency": null,
                    "currency_sign": "$",
                    "cost": 0,
                    "cost_currency": null,
                    "cost_currency_sign": "$",
                    "payment_first_name": "",
                    "payment_last_name": "",
                    "payment_gender": "",
                    "payment_company": "",
                    "payment_postcode": "",
                    "payment_region": "",
                    "payment_location": "",
                    "payment_address_1": "",
                    "payment_address_2": "",
                    "payment_method": "",
                    "payment_status": "",
                    "payment_remark": "",
                    "paid_at": null,
                    "shipping_cost": 0,
                    "shipping_first_name": "",
                    "shipping_last_name": "",
                    "shipping_email": "",
                    "shipping_phone": "",
                    "shipping_gender": "",
                    "shipping_company": "",
                    "shipping_postcode": "",
                    "shipping_region": "",
                    "shipping_location": "",
                    "shipping_address_1": "",
                    "shipping_address_2": "",
                    "shipping_method": "",
                    "shipping_status": "",
                    "shipping_details": "",
                    "shipping_remark": "",
                    "shipping_date": null,
                    "shipping_time": null,
                    "tracking": "",
                    "platform": "facebook",
                    "platform_id": 1,
                    "type": null,
                    "status": "review",
                    "created_at": {
                        "$date": "2022-05-20T06:21:45.512Z"
                    },
                    "updated_at": null,
                    "meta": {},
                    "products": {
                        "7609": {
                            "order_product_id": 252822,
                            "name": "vitamin C",
                            "image": "1/product/633/C.png",
                            "price": 1600,
                            "type": "product",
                            "currency": null,
                            "currency_sign": "$",
                            "qty": 2,
                            "subtotal": 3200
                        }
                    },
                    "checkout_details": {},
                    "history": {},
                    "lock_at": {
                        "$date": "2022-05-20T06:24:38.529Z"
                    },
                    "adjust_title": null,
                    "adjust_price": 0,
                    "free_delivery": false,
                    "buyer_id": null
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

.form-check-input {
    border-color: black !important;
}

.table th {
    padding-left: 0 !important;
}

.table td {
    padding-left: 0 !important;
}
</style>