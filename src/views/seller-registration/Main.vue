 <template>
    <div class="flex-col bg-white">
        <!-- BEGIN Tab List-->
        <ul class="flex-none flex flex-wrap ml-14 sm:ml-0 py-5 flex-row justify-around w-full ">
            <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button
                        :class="{
                            'text-neutral-600 bg-white': registerationStore.registerTab !== 1,
                            'text-white bg-primary': registerationStore.registerTab === 1 
                            }" 
                        class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto">
                        <UserIcon />
                    </button>
                    <div class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': registerationStore.registerTab !== 1,
                            'font-bold': registerationStore.registerTab === 1,
                        }">
                        {{$t('register.tab.basic_info')}}  
                    </div>
                </div>
            </li>
            <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button
                        @click="toggleTabs(2)"
                        :class="{
                        'text-neutral-600 bg-white': registerationStore.registerTab !== 2,
                        'text-white bg-primary': registerationStore.registerTab === 2,
                    }" class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto">
                        <CreditCardIcon :paymentInfo="paymentInfo"/>
                    </button>
                    <div class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': registerationStore.registerTab !== 2,
                            'font-bold': registerationStore.registerTab === 2,
                        }">
                        {{$t('register.tab.payment')}}
                    </div>
                </div>
            </li>
            <li class="flex-1 text-center">
                <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                    <button 
                        :class="{
                        'text-neutral-600 bg-white': registerationStore.registerTab !== 3,
                        'text-white bg-primary': registerationStore.registerTab === 3,
                    }" class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto">
                        <CheckIcon />
                    </button>
                    <div class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
                        :class="{
                            'text-neutral-600': registerationStore.registerTab !== 3,
                            'font-bold': registerationStore.registerTab === 3,
                        }">
                        {{$t('register.tab.confirm')}}
                    </div>
                </div>
            </li>
        </ul>
        <!-- END Tab List-->

        <div class="box p-8 sm:px-20 lg:py-10 shadow-sm rounded-lg sm:mx-20 text-sm sm:text-lg">
            <div class="tab-content tab-space">
                <GetInfo />
                <Payment />
                <Confirm />
            </div>
        </div>
    </div>


</template>

<script setup>
import { onBeforeMount, onMounted, ref, provide } from "vue";

import loadScript from '@/libs/loadScript.js';
import { useRoute, useRouter } from "vue-router";
import GetInfo from "./GetInfo.vue";
import Payment from "./Payment.vue";
import Confirm from "./Confirm.vue";
import useI18n from "@/locales/i18n"

import { useSellerRegistrationStore } from "@/stores/lss-seller-registration"
// import { usePublicLayoutStore } from "@/stores/lss-public-layout"

// const layoutStore = usePublicLayoutStore()
const registerationStore = useSellerRegistrationStore()

const route = useRoute();
const router = useRouter();

onBeforeMount (()=>{document.querySelector('body').setAttribute('style', 'padding-left: 0;')} ) 
onBeforeMount (()=>{useI18n.global.locale.value = route.query.language || 'en'} )     
onMounted(()=>{
    loadScript("https://js.stripe.com/v3/",()=>{console.log("stripe SDK loaded") })
    // registerationStore.country = route.query.language
})

// onMounted(()=>{        //到時候在sotres 裏面 設定
//     if(registerationStore.country === 'zh_hant'){
//         registerationStore.home = 'https://liveshowseller.com.tw/'
//         registerationStore.terms = 'https://liveshowseller.com.tw/terms-of-service/'
//         registerationStore.policy = 'https://liveshowseller.com.tw/privacy-policy/'
//     }
// })

const toggleTabs = tabNumber => {registerationStore.registerTab = tabNumber}


</script>