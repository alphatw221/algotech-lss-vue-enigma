<template>
    <!-- OUTTER BOX -->
    <div class="intro-y grid grid-cols-12 gap-5">
        <!-- BEGIN: campaign Info -->
        <div class="flex flex-col col-span-12 h-fit lg:pt-5 mt-3 pb-4">
            <h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">{{$t('manage_order.title')}}</h2>
            <!-- BEGIN: campaign Status -->
            <CampaignStatus/>
            <!-- END: campaign Status -->

            <div class="w-full mt-8 flex flex-col">
                <div class="flex -mb-5 text-base align-baseline justify-end lg:text-xl">
                    <div class="relative ml-2 mr-3">
                            <a class="mr-0.5" style="color:#1e40af;" @click="show_order('all')">{{$t('manage_order.all')}} (<span style="font-weight:bold;">{{store.data_count['all']}}</span>)</a>
                    </div>
                    <div class="relative ml-2 mr-3">
                            <a class="mr-0.5" style="color:#1e40af;" @click="show_order('review')">{{$t('manage_order.review')}} (<span style="font-weight:bold;">{{store.data_count['review']}}</span>)</a>
                    </div>
                    <div class="relative ml-2 mr-3">
                            <a class="mr-0.5" style="color:#1e40af;" @click="show_order('complete')">{{$t('manage_order.complete')}} (<span style="font-weight:bold;">{{store.data_count['complete']}}</span>) </a>
                    </div>
                </div>
                <!--分隔線-->
                <div class="w-full mt-5 border-t border-slate-800/60 dark:border-darkmode-400"></div>
                <div class="flex flex-col sm:flex-row">
                    <div class="relative right-0 flex-auto m-1 sm:mt-1">
                        <SearchBar 
                            v-show="tableType === 'all'"
                            :tableStatus="'all'"
                            :tableSearch="'searchAll'"
                            :tableFilter="'filterAll'"/>
                        <SearchBar 
                            v-show="tableType === 'review'"
                            :tableStatus="'review'"
                            :tableSearch="'searchReview'"
                            :tableFilter="'filterReview'"/>
                        <SearchBar 
                            v-show="tableType === 'complete'"
                            :tableStatus="'complete'"
                            :tableSearch="'searchComplete'"
                            :tableFilter="'filterComplete'"/>
                    </div>
                
                    <div class="form-check form-switch justify-end mt-2">
                        <label class="ml-0 form-check-label" for="show-example-3"> {{$t('manage_order.stop_checkout')}}</label>
                        <Tippy 
                            class="rounded-full w-fit whitespace-wrap ml-1 my-auto" 
                            data-tippy-allowHTML="true" 
                            data-tippy-placement="right" 
                            :content="$t('tooltips.campaign_list.stop_checkout')" 
                            > 
                            <HelpCircleIcon class="w-5 tippy-icon" />
                        </Tippy> 
                        <input @click="stop_checkout($event.target.checked)" class="ml-3 mr-0 form-check-input" type="checkbox" v-model="store.campaign.meta.allow_checkout"/> 
                    </div>
                </div>
            </div>

            <!-- Table -->
            
            <div v-show="tableType === 'all'">
                <ManageOrderTable
                    :tableStatus="'all'"
                    :tableSearch="'searchAll'"
                    :tableFilter="'filterAll'"
                />
            </div>
            <div v-show="tableType === 'review'">
                <ManageOrderTable
                    :tableStatus="'review'"
                    :tableSearch="'searchReview'"
                    :tableFilter="'filterReview'"
                />
            </div>
            <div v-show="tableType === 'complete'">
                <ManageOrderTable
                    :tableStatus="'complete'"
                    :tableSearch="'searchComplete'"
                    :tableFilter="'filterComplete'"
                />
            </div>
            <OrderProductModal />
        </div>
        <!-- <button class="btn z-50 btn-primary rounded-full" @click.native="scrollToTop()"> Back to Top </button> -->
    </div>
</template>

<script setup>
// import {campaign_comment_summarize} from '@/api/user';
import ManageOrderTable  from "./ManageOrderTable.vue";
import CampaignStatus from "./CampaignStatus.vue";
import SearchBar from "./SearchBar.vue";
import OrderProductModal from "./OrderProductModal.vue"
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
// import xlsx from "xlsx";
import { allow_checkout, retrieve_campaign } from "@/api_v2/campaign"
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import i18n from "@/locales/i18n"

const route = useRoute();
const store = useManageOrderStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const layout = useLSSSellerLayoutStore()

const deliveryStatus = ref(false);
const checkout_status = ref(false)
const tableType = ref('all')
const show_order = status=>{
  tableType.value=status
}

onMounted(()=>{
    getCampaignInfo()
})



function stop_checkout(status){
    allow_checkout(route.params.campaign_id,status).then(res=>{
        store.campaign = res.data
        layout.notification.showMessageToast(`${i18n.global.t('manage_order.update_successed')}`);
    }) 
}

function getCampaignInfo(){
    retrieve_campaign(route.params.campaign_id).then(res=>{
        store.campaign = res.data
        checkout_status.value = res.data.meta.allow_checkout == 1 ? false : true 
    })
}
</script>

<style scoped>
    .modal-content{
        background-color: theme('colors.secondary');
    }
    .dark .modal-content{
        --color-secondary: theme("colors.rgb.blueGray.800");
    }
    .export :hover{
        background-color: #131C34;
        color: #fff;
    }
</style>
