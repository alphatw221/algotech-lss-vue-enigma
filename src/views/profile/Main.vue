
<template>
    <div class="flex-col">
        <!-- BEGIN Tab List-->
        <ul class="flex-none flex flex-wrap ml-14 sm:ml-0 py-2 flex-row justify-around w-full">
            <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button
                        @click="layout.profileTab = 1"
                        :class="{
                            'text-neutral-600 bg-white': layout.profileTab !== 1,
                            'text-white bg-primary': layout.profileTab === 1 
                            }" 
                        class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 ">
                        <UserIcon />
                    </button>
                    <div class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': layout.profileTab !== 1,
                            'font-bold': layout.profileTab === 1,
                        }">
                        {{$t('profile.tab.profile')}}
                    </div>
                </div>
            </li>
            <!-- <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button
                        @click="layout.profileTab = 2"
                        :class="{
                        'text-neutral-600 bg-white': layout.profileTab !== 2,
                        'text-white bg-primary': layout.profileTab === 2,
                    }" class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 ">
                        <StarIcon />
                    </button>
                    <div class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': layout.profileTab !== 2,
                            'font-bold': layout.profileTab === 2,
                        }">
                        {{$t('profile.tab.plan')}}
                    </div>
                </div>
            </li> -->
            <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button
                        @click="layout.profileTab = 3" 
                        :class="{
                        'text-neutral-600 bg-white': layout.profileTab !== 3,
                        'text-white bg-primary': layout.profileTab === 3,
                        }"
                        class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 ">
                        <UnlockIcon class="h-6" />
                    </button>
                    <div class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': layout.profileTab !== 3,
                            'font-bold': layout.profileTab === 3,
                        }">
                        {{$t('profile.tab.reset_password')}}
                    </div>
                </div>
            </li>
        </ul>
        <!-- END Tab List-->

        <div class="box p-8 sm:px-20 lg:py-10 shadow-sm rounded-lg sm:mx-20 text-sm sm:text-lg">
            <div class="tab-content tab-space">
                <ProfileTab />
                <ResetPasswordTab />
            </div>
        </div>
    </div>
</template>

<script setup>
import ProfileTab from './ProfileTab.vue';
import SubscriptionTab from './SubscriptionTab.vue';
import ResetPasswordTab from './ResetPassword.vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const layout = useLSSSellerLayoutStore()

const toggleTabs = tabNumber => {
    layout.profileTab = tabNumber
}

</script>