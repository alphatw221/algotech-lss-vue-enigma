<template>
    <!-- BEGIN: Comments -->
        <TabGroup :selectedIndex="0" v-if="ready"
            class="box mt-2 max-h-screen w-full 
                md:w-1/2 
                2xl:w-1/3">
        <div class="flex flex-col h-full">
            <div class="flex flex-none h-14">
                <h2 class="my-auto ml-5 mr-auto text-lg font-medium">
                    {{campaignDetailStore.campaign.title}}
                </h2>
                <div class="my-auto mr-5">
                    <div class="nav-pills">
                        <button  class="btn w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button"
                            @click="toDrawList()" 
                        >
                            <font-awesome-icon icon="fa-solid fa-gamepad" class="mt-1 h-[20px] ml-[3px]"/>
                        </button>
                        <button  class="btn w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button"
                            @click="selectVideoTabs('facebook')" 
                        >
                            <FacebookIcon class="m-1 " />
                            <!-- <img src="/src/assets/images/lss-icon/fb_comment.svg" class="absolute right-0 h-8 w-8" /> -->
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


            <div class="flex flex-none h-fit">
                <h2 class="my-auto ml-5 mr-auto text-lg font-medium leading-4">
                    {{$t(`campaign_live.comment.${listViewTitle}`)}}
                </h2>
                <div class="my-auto mr-5">
                    <TabList class="nav-pills">
                        <Tab class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" @click="setListViewTitle('comments_summarizer')"
                        >   
                            <!-- <font-awesome-icon icon="fa-regular fa-comment-dots" class="h-6 m-1 -mt-2" @click="setListViewTitle('comments_summarizer')"/> -->
                            <svg width="30" height="23" viewBox="0 0 21 16" xmlns="http://www.w3.org/2000/svg" class="top-[12%] left-[1px] absolute fill-primary">
                                <g clip-path="url(#clip0_295_31)">
                                    <path d="M2.79677 11.3982C2.73148 12.0242 2.85813 12.6555 3.1595 13.206H17.85C17.9772 12.9796 18.0705 12.7352 18.1268 12.481C18.2665 11.7986 18.2665 11.0945 18.1268 10.4121C17.8596 8.78567 17.1183 7.27734 15.9981 6.08096H5.03992C3.65516 7.50671 2.88706 9.40034 2.79677 11.3982Z"/>
                                    <path d="M21.0001 9.94804C21.0102 9.68267 20.9467 9.41974 20.8168 9.18905C20.6869 8.95837 20.4958 8.76917 20.2651 8.64291C20.0851 8.51555 19.8735 8.44187 19.6542 8.43022C19.4321 8.42058 19.2115 8.47061 19.0146 8.57523C18.3653 6.82672 17.2762 5.28038 15.8551 4.08943C14.3185 2.90631 12.4296 2.28907 10.5001 2.33958C8.57066 2.28985 6.68202 2.907 5.1451 4.08943C3.77085 5.23483 2.70662 6.71522 2.05237 8.39155C2.05237 6.82538 2.05237 5.23022 2.05237 3.69306V2.72629C2.32838 2.57156 2.54392 2.32597 2.66328 2.03022C2.7809 1.72143 2.79763 1.38258 2.71101 1.06345C2.63889 0.765127 2.47511 0.497697 2.24328 0.299704C2.00204 0.104767 1.70235 -0.000958521 1.39374 6.54878e-06C1.08206 0.000420669 0.780786 0.113561 0.54419 0.31904C0.296653 0.516252 0.121822 0.792073 0.0478259 1.10212C-0.0325115 1.4241 -0.00566836 1.76394 0.12419 2.06889C0.240825 2.36636 0.457092 2.61277 0.735099 2.76496V8.63324C0.511488 8.75218 0.326042 8.93329 0.200553 9.15529C0.0666671 9.37929 0.000312599 9.63803 0.00964412 9.8997C0.00964412 10.8665 0.00964412 11.8912 0.00964412 13.003C0.00824721 13.3275 0.112223 13.6434 0.305553 13.9021C0.502237 14.1571 0.777956 14.3376 1.08828 14.4145C1.27677 14.458 1.47252 14.458 1.66101 14.4145C1.84794 14.3723 2.02373 14.2899 2.17646 14.1728C2.51245 14.7201 2.98066 15.1715 3.53685 15.4844C4.09304 15.7974 4.71884 15.9615 5.3551 15.9613H10.2615H15.6451C16.2291 15.9576 16.8042 15.8158 17.3245 15.5473C17.8449 15.2787 18.2961 14.8908 18.6424 14.4145L18.8237 14.1631C19.0102 14.3132 19.2353 14.4058 19.4723 14.4298C19.7092 14.4538 19.948 14.4082 20.1601 14.2985C20.4187 14.1798 20.6367 13.9859 20.7863 13.7415C20.9358 13.497 21.0103 13.2131 21.0001 12.9257V9.94804ZM20.0456 9.88037V13.0417C20.0472 13.0926 20.0377 13.1432 20.0179 13.1899C19.9982 13.2367 19.9685 13.2785 19.931 13.3124C19.8619 13.3803 19.7695 13.4184 19.6733 13.4187C19.5745 13.417 19.4796 13.3793 19.406 13.3124C19.3379 13.2384 19.2974 13.1427 19.2915 13.0417V9.88037C19.2989 9.77689 19.3391 9.67859 19.406 9.60001C19.4796 9.53312 19.5745 9.49536 19.6733 9.49366C19.7695 9.49403 19.8619 9.53215 19.931 9.60001C19.9678 9.6365 19.9969 9.68015 20.0166 9.72834C20.0362 9.77652 20.0461 9.82823 20.0456 9.88037ZM12.0369 14.5885H9.00146C7.89419 14.5885 6.75828 14.5885 5.63192 14.5885C5.23991 14.6084 4.84849 14.5391 4.48646 14.3855C4.12161 14.2364 3.79514 14.0049 3.53192 13.7088C3.25225 13.3983 3.04252 13.0301 2.91726 12.6294C2.792 12.2288 2.7542 11.8054 2.80646 11.3885C2.85452 10.2941 3.12123 9.22094 3.59046 8.2339C4.05969 7.24686 4.7217 6.36646 5.53646 5.64593C6.85859 4.42451 8.57709 3.73656 10.3665 3.71239C11.3116 3.71436 12.2477 3.89807 13.1251 4.25378C14.4274 4.73289 15.5765 5.56182 16.4492 6.65177C17.3219 7.74172 17.8853 9.05161 18.0792 10.4411C18.2189 11.1235 18.2189 11.8276 18.0792 12.51C17.9492 13.0897 17.6338 13.6097 17.1819 13.9891C16.7347 14.3679 16.1708 14.5765 15.5878 14.5789L12.0369 14.5885ZM1.40328 1.93354C1.35598 1.94269 1.3074 1.94269 1.2601 1.93354C1.21027 1.91386 1.16483 1.88427 1.12646 1.84653C1.08944 1.8112 1.06017 1.76838 1.04055 1.72085C1.02722 1.6669 1.02722 1.61045 1.04055 1.5565C1.04141 1.44581 1.08215 1.33924 1.1551 1.2568C1.18809 1.2176 1.22905 1.18608 1.27518 1.16438C1.3213 1.14269 1.37151 1.13135 1.42237 1.13112C1.47099 1.1309 1.5191 1.14112 1.56353 1.16112C1.60796 1.18112 1.64769 1.21043 1.6801 1.24714C1.72019 1.28414 1.75264 1.32882 1.77558 1.3786C1.79852 1.42839 1.81149 1.48228 1.81374 1.53717C1.8106 1.64452 1.77001 1.74727 1.69919 1.8272C1.61642 1.89759 1.51134 1.93535 1.40328 1.93354ZM0.954644 9.90937C0.969726 9.81309 1.02104 9.72647 1.09783 9.66768C1.16693 9.59982 1.2593 9.56171 1.35555 9.56134C1.45473 9.56121 1.55026 9.59921 1.62283 9.66768C1.68788 9.74365 1.72792 9.83827 1.73737 9.93838V13.1094C1.72792 13.2095 1.68788 13.3041 1.62283 13.3801C1.55026 13.4485 1.45473 13.4865 1.35555 13.4864C1.2593 13.486 1.16693 13.4479 1.09783 13.3801C1.0529 13.3445 1.01663 13.2991 0.991804 13.2471C0.96698 13.1951 0.954266 13.1381 0.954644 13.0804V9.90937Z"/>
                                    <path d="M10.0227 7.38611C10.3878 8.14068 10.6756 8.9311 10.8818 9.74502C11.1324 10.3931 11.3241 11.0629 11.4545 11.7462C11.4653 11.8365 11.4557 11.928 11.4264 12.0139C11.3971 12.0998 11.3489 12.1778 11.2855 12.2421C11.222 12.3063 11.145 12.3552 11.0602 12.3848C10.9753 12.4145 10.885 12.4242 10.7959 12.4133C10.395 12.4133 10.2327 12.1136 10.08 11.7366C10.0424 11.6024 9.96593 11.4827 9.8604 11.393C9.75487 11.3034 9.62519 11.2479 9.48816 11.2338C9.34498 11.2338 9.04907 11.2338 8.72453 11.2338C8.20907 11.2338 8.03726 11.3982 7.91317 11.6109C7.78907 11.8236 7.63635 12.452 7.13044 12.452C6.62453 12.452 6.4718 12.1813 6.4718 11.7752C6.74263 10.552 7.09991 9.35016 7.54089 8.17886C7.75089 7.51179 8.09453 6.87372 8.94407 6.87372C9.15243 6.85592 9.36175 6.89388 9.55105 6.98381C9.74036 7.07374 9.90301 7.21247 10.0227 7.38611V7.38611ZM9.43089 10.2864C9.50584 10.2725 9.57326 10.2315 9.62064 10.171C9.66803 10.1106 9.69218 10.0348 9.68862 9.95771C9.607 9.464 9.46261 8.98306 9.25907 8.5269C9.2018 8.39155 9.11589 8.2272 8.95362 8.2272C8.90603 8.22865 8.85948 8.24171 8.81793 8.26527C8.77639 8.28884 8.74107 8.3222 8.71498 8.36255C8.4873 8.85638 8.31751 9.37553 8.20907 9.90937C8.20907 10.2574 8.52407 10.3251 8.79135 10.3251C9.00526 10.333 9.21943 10.32 9.43089 10.2864V10.2864Z"  class="fill-white opposite"/>
                                    <path d="M12.6669 7.73414C12.6669 7.27976 12.8482 6.89305 13.3541 6.89305C13.8601 6.89305 14.1464 7.0574 14.1464 7.63746C14.1464 8.21752 14.0414 8.89426 14.0414 9.571C14.0414 10.2477 14.1369 10.8568 14.1369 11.5045C14.1369 12.1523 14.0701 12.4713 13.421 12.4713C12.7719 12.4713 12.6764 11.9976 12.6764 11.4562C12.6764 10.9148 12.7528 10.2574 12.7528 9.66767C12.7528 8.78792 12.6669 8.29486 12.6669 7.73414Z" class="fill-white opposite"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_295_31">
                                <rect width="21" height="16" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </Tab>

                        <Tab class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" @click="setListViewTitle('all_comments')" 
                        >
                            <!-- <font-awesome-icon icon="fa-regular fa-comments" class="h-5 m-1 -mt-1" @click="setListViewTitle('all_comments')"/> -->
                            <svg
                                width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="-top-0.5 absolute fill-primary" >
                                <path d="M6.89044 16.7846L7.46096 17.2715C7.70885 16.981 7.69888 16.5506 7.43779 16.2719L6.89044 16.7846ZM5 19L4.42949 
                                    18.5132C4.23955 18.7357 4.1964 19.0484 4.31896 19.3141C4.44152 19.5798 4.7074 19.75 5 19.75V19ZM18.25 12C18.25 15.4518 
                                    15.4518 18.25 12 18.25V19.75C16.2802 19.75 19.75 16.2802 19.75 12H18.25ZM12 5.75C15.4518 5.75 18.25 8.54822 18.25 
                                    12H19.75C19.75 7.71979 16.2802 4.25 12 4.25V5.75ZM5.75 12C5.75 8.54822 8.54822 5.75 12 5.75V4.25C7.71979 4.25 4.25 
                                    7.71979 4.25 12H5.75ZM7.43779 16.2719C6.39031 15.1537 5.75 13.6525 5.75 12H4.25C4.25 14.0482 5.04556 15.9123 6.3431 
                                    17.2974L7.43779 16.2719ZM6.31993 16.2978L4.42949 18.5132L5.57051 19.4868L7.46096 17.2715L6.31993 16.2978ZM5 
                                    19.75H12V18.25H5V19.75Z"/>
                                <circle cx="9" cy="12" r="1"/>
                                <circle cx="15" cy="12" r="1"/>
                                <circle cx="12" cy="12" r="1"/>
                            </svg>
                        </Tab>

                        <Tab  class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" v-if="route.query.status=='history'"  @click="setListViewTitle('facebook_comments')"
                        >
                            <!-- <FacebookIcon class="m-1 -mt-1" /> -->
                            <svg width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="-top-0.5 absolute fill-primary">
                                <path d="M6.89044 16.7846L7.46096 17.2715C7.70885 16.981 7.69888 16.5506 7.43779 16.2719L6.89044 16.7846ZM5 19L4.42949 18.5132C4.23955 18.7357 4.1964 19.0484 4.31896 19.3141C4.44152 19.5798 4.7074 19.75 5 19.75V19ZM18.25 12C18.25 15.4518 15.4518 18.25 12 18.25V19.75C16.2802 19.75 19.75 16.2802 19.75 12H18.25ZM12 5.75C15.4518 5.75 18.25 8.54822 18.25 12H19.75C19.75 7.71979 16.2802 4.25 12 4.25V5.75ZM5.75 12C5.75 8.54822 8.54822 5.75 12 5.75V4.25C7.71979 4.25 4.25 7.71979 4.25 12H5.75ZM7.43779 16.2719C6.39031 15.1537 5.75 13.6525 5.75 12H4.25C4.25 14.0482 5.04556 15.9123 6.3431 17.2974L7.43779 16.2719ZM6.31993 16.2978L4.42949 18.5132L5.57051 19.4868L7.46096 17.2715L6.31993 16.2978ZM5 19.75H12V18.25H5V19.75Z" />
                                <path d="M13.7868 9.51631L14 8H13.0102C12.6013 7.9999 12.2061 8.15312 11.8969 8.4316C11.5877 8.71008 11.3853 9.09517 11.3268 9.51631L11.1807 10.5546C11.1722 10.6145 11.1433 10.6692 11.0994 10.7089C11.0554 10.7486 10.9993 10.7707 10.9411 10.771H10.2119L10 12.2859H10.7397C10.7644 12.286 10.7888 12.2917 10.8112 12.3025C10.8336 12.3132 10.8535 12.3289 10.8696 12.3484C10.8857 12.3678 10.8976 12.3907 10.9045 12.4154C10.9114 12.44 10.9131 12.466 10.9095 12.4914L10.283 16.9842C10.4722 17.0129 10.6649 17.0025 10.8503 16.9537C11.0356 16.9048 11.2099 16.8185 11.3632 16.6996C11.5164 16.5806 11.6457 16.4315 11.7436 16.2605C11.8414 16.0896 11.906 15.9003 11.9335 15.7034L12.3889 12.4873C12.3965 12.4315 12.4232 12.3804 12.4641 12.3434C12.5049 12.3064 12.5572 12.286 12.6114 12.2859H13.4011L13.613 10.771H12.8233C12.7985 10.7706 12.7741 10.7648 12.7516 10.7539C12.7291 10.743 12.7091 10.7272 12.693 10.7077C12.6768 10.6881 12.6648 10.6652 12.6578 10.6405C12.6507 10.6157 12.6488 10.5897 12.6522 10.5642L12.7654 9.76423C12.7749 9.69537 12.8079 9.63239 12.8585 9.58685C12.909 9.54131 12.9736 9.51626 13.0405 9.51631H13.7868Z" />
                            </svg>
                        </Tab>
                        <Tab  class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" v-if="route.query.status=='history'"  @click="setListViewTitle('instagram_comments')"
                        >
                            <!-- <InstagramIcon class="m-1 -mt-1" /> -->
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="-top-0.5 absolute fill-primary">
                                <path d="M6.89044 16.7846L7.46096 17.2715C7.70885 16.981 7.69888 16.5506 7.43779 16.2719L6.89044 16.7846ZM5 19L4.42949 18.5132C4.23955 18.7357 4.1964 19.0484 4.31896 19.3141C4.44152 19.5798 4.7074 19.75 5 19.75V19ZM18.25 12C18.25 15.4518 15.4518 18.25 12 18.25V19.75C16.2802 19.75 19.75 16.2802 19.75 12H18.25ZM12 5.75C15.4518 5.75 18.25 8.54822 18.25 12H19.75C19.75 7.71979 16.2802 4.25 12 4.25V5.75ZM5.75 12C5.75 8.54822 8.54822 5.75 12 5.75V4.25C7.71979 4.25 4.25 7.71979 4.25 12H5.75ZM7.43779 16.2719C6.39031 15.1537 5.75 13.6525 5.75 12H4.25C4.25 14.0482 5.04556 15.9123 6.3431 17.2974L7.43779 16.2719ZM6.31993 16.2978L4.42949 18.5132L5.57051 19.4868L7.46096 17.2715L6.31993 16.2978ZM5 19.75H12V18.25H5V19.75Z"/>
                                <path d="M15.3238 14.4667C16.714 12.5891 16.2813 9.96381 14.3572 8.60308C12.4332 7.24235 9.74646 7.66141 8.35627 9.53907C6.96608 11.4167 7.39886 14.042 9.3229 15.4027C11.2469 16.7634 13.9337 16.3444 15.3238 14.4667Z"/>
                                <path d="M12.0732 14.1069C11.6269 14.1542 11.1766 14.065 10.7844 13.8516C10.3922 13.6383 10.0774 13.3112 9.88349 12.9155C9.68955 12.5199 9.62603 12.0751 9.70167 11.6427C9.77731 11.2103 9.98839 10.8114 10.3058 10.5012C10.6232 10.191 11.0313 9.98467 11.4738 9.91074C11.9162 9.83681 12.3712 9.8989 12.7761 10.0884C13.1809 10.278 13.5156 10.5856 13.7339 10.969C13.9522 11.3523 14.0435 11.7924 13.995 12.2285C13.9411 12.7086 13.7213 13.1564 13.3719 13.4979C13.0225 13.8394 12.5644 14.0542 12.0732 14.1069Z" class="opposite fill-white" />
                                <path d="M14.0512 10.0465C13.9752 10.058 13.8973 10.0455 13.8289 10.011C13.7606 9.97643 13.7052 9.92157 13.6707 9.85428C13.6363 9.78699 13.6246 9.71076 13.6373 9.63657C13.6501 9.56237 13.6866 9.49404 13.7416 9.44141C13.7966 9.38878 13.8673 9.35458 13.9434 9.34373C14.0196 9.33288 14.0973 9.34593 14.1654 9.38102C14.2335 9.4161 14.2885 9.47141 14.3223 9.53896C14.3562 9.60652 14.3673 9.68284 14.3539 9.75693C14.3408 9.83006 14.3045 9.89732 14.2502 9.94926C14.1959 10.0012 14.1263 10.0352 14.0512 10.0465Z" class="opposite fill-white" />
                            </svg>
                        </Tab>
                        <Tab  class="w-8 h-8 pl-0 pr-1 mt-1 relative" tag="button" v-if="route.query.status=='history'"  @click="setListViewTitle('youtube_comments')"
                        >
                            <!-- <YoutubeIcon class="m-1 -mt-1" /> -->
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="-top-0.5 absolute fill-primary">
                                <path d="M6.89044 16.7846L7.46096 17.2715C7.70885 16.981 7.69888 16.5506 7.43779 16.2719L6.89044 16.7846ZM5 19L4.42949 18.5132C4.23955 18.7357 4.1964 19.0484 4.31896 19.3141C4.44152 19.5798 4.7074 19.75 5 19.75V19ZM18.25 12C18.25 15.4518 15.4518 18.25 12 18.25V19.75C16.2802 19.75 19.75 16.2802 19.75 12H18.25ZM12 5.75C15.4518 5.75 18.25 8.54822 18.25 12H19.75C19.75 7.71979 16.2802 4.25 12 4.25V5.75ZM5.75 12C5.75 8.54822 8.54822 5.75 12 5.75V4.25C7.71979 4.25 4.25 7.71979 4.25 12H5.75ZM7.43779 16.2719C6.39031 15.1537 5.75 13.6525 5.75 12H4.25C4.25 14.0482 5.04556 15.9123 6.3431 17.2974L7.43779 16.2719ZM6.31993 16.2978L4.42949 18.5132L5.57051 19.4868L7.46096 17.2715L6.31993 16.2978ZM5 19.75H12V18.25H5V19.75Z"/>
                                <path d="M14.5451 11.4709L10.7862 9.34995C10.6912 9.29597 10.5832 9.26744 10.4733 9.26726C10.3634 9.26708 10.2554 9.29524 10.1602 9.34892C10.065 9.40259 9.98595 9.47987 9.93107 9.57294C9.8762 9.66602 9.84742 9.7716 9.84766 9.87902V14.121C9.84763 14.2283 9.87651 14.3338 9.93138 14.4268C9.98626 14.5199 10.0652 14.5971 10.1603 14.6509C10.2554 14.7047 10.3633 14.733 10.4731 14.7332C10.583 14.7333 10.691 14.7052 10.7862 14.6516L14.5451 12.5291C14.6402 12.4755 14.7192 12.3985 14.7742 12.3056C14.8291 12.2127 14.8581 12.1073 14.8581 12C14.8581 11.8927 14.8291 11.7873 14.7742 11.6944C14.7192 11.6015 14.6402 11.5245 14.5451 11.4709Z"/>
                            </svg>
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

import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { get_comments, get_summerize_comments } from "@/api/campaign_comment";
import CommentListView from './CommentListView.vue';
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute()

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const campaignDetailStore = useCampaignDetailStore()

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

const listViewTitle = ref('all_comments')
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
const toDrawList = ()=>{
    router.push({ name: 'lucky-draw', params: { campaign_id: route.params.campaign_id} })
    hideDropDown()
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