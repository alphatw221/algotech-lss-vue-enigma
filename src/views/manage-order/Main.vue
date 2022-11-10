<template>
    <!-- OUTTER BOX -->
        <!-- BEGIN: campaign Info -->
    <div class="flex flex-col lg:pt-5 mt-3 pb-4 h-fit sm:h-[95%]">
        <h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">{{$t('manage_order.title')}}</h2>
        <!-- BEGIN: campaign Status -->
        <CampaignStatus v-if="route.params.campaign_id"/>
        <!-- END: campaign Status -->

        <div class="w-full mt-8 flex flex-col">
            <div class="flex -mb-5 text-base align-baseline justify-end lg:text-xl">

                <div class="relative ml-2 mr-3">
                        <a class="mr-0.5" style="color:#1e40af;" :class="{ 'tab-active' : tableType === 'all'}" @click="show_order('all')">{{$t('manage_order.all')}} (<span style="font-weight:bold;">{{manageOrderStore.data_count['all']}}</span>)</a>
                </div>
                
                <div class="relative ml-2 mr-3">
                        <a class="mr-0.5" style="color:#1e40af;" :class="{ 'tab-active' : tableType === 'proceed'}" @click="show_order('proceed')">{{$t('manage_order.review')}} (<span style="font-weight:bold;">{{manageOrderStore.data_count['proceed']}}</span>)</a>
                </div>
                <div class="relative ml-2 mr-3">
                        <a class="mr-0.5" style="color:#1e40af;" :class="{ 'tab-active' : tableType === 'complete'}" @click="show_order('complete')">{{$t('manage_order.complete')}} (<span style="font-weight:bold;">{{manageOrderStore.data_count['complete']}}</span>) </a>
                </div>
            </div>
            <!--分隔線-->
            <div class="w-full mt-5 border-t border-slate-800/60 dark:border-darkmode-400"></div>
            <div class="flex flex-col sm:flex-row">
                <div class="relative right-0 flex-auto sm:mt-1">
                    
                    <SearchBar 
                        v-show="tableType == 'all'"
                        :tableStatus="'all'"
                        :tableSearch="'searchAll'"
                        :tableFilter="'filterAll'"
                        :searchEventBusName="'searchAll'"
                        />


                    <SearchBar 
                        v-show="tableType == 'proceed'"
                        :tableStatus="'proceed'"
                        :tableSearch="'searchProceed'"
                        :tableFilter="'filterProceed'"
                        :searchEventBusName="'searchProceed'"
                        />
                    
                    <SearchBar 
                        v-show="tableType == 'complete'"
                        :tableStatus="'complete'"
                        :tableSearch="'searchComplete'"
                        :tableFilter="'filterComplete'"
                        :searchEventBusName="'searchComplete'"
                        />

                    <ExportOrderButton />

                    
                </div>
                
                <ExportEasyStoreOrderButton/>
                <ExportShopifyOrderButton/>
                <div v-if="new Date() < new Date(manageOrderStore.campaign.end_at)" class="form-check form-switch justify-end mt-2">
                    <label class="ml-0 form-check-label" for="show-example-3"> {{$t('manage_order.stop_checkout')}}</label>
                    <Tippy 
                        class="rounded-full w-fit whitespace-wrap ml-1 my-auto" 
                        data-tippy-allowHTML="true" 
                        data-tippy-placement="right" 
                        :content="$t('tooltips.campaign_list.stop_checkout')" 
                        > 
                        <HelpCircleIcon class="w-5 tippy-icon" />
                    </Tippy> 
                    <input @click="stopCheckout()" class="ml-3 mr-0 form-check-input" type="checkbox" v-model="manageOrderStore.campaign.stop_checkout"/> 
                </div>
            </div>
        </div>


        <div v-show="tableType === 'all'" class="mt-3 w-full overflow-auto h-fit" >
            <ManageOrderTable
                :tableStatus="'all'"
                :tableSearch="'searchAll'"
                :tableFilter="'filterAll'"
                :searchEventBusName="'searchAll'"
                :filterEventBusName="'filterAll'"
            />
        </div>
        
        <div v-show="tableType === 'proceed'" class="mt-3 w-full overflow-auto h-fit" >
            <ManageOrderTable
                :tableStatus="'proceed'"
                :tableSearch="'searchProceed'"
                :tableFilter="'filterProceed'"
                :searchEventBusName="'searchProceed'"
                :filterEventBusName="'filterProceed'"
            />
        </div>
        <div v-show="tableType === 'complete'" class="mt-3 w-full overflow-auto h-fit" >
            <ManageOrderTable
                :tableStatus="'complete'"
                :tableSearch="'searchComplete'"
                :tableFilter="'filterComplete'"
                :searchEventBusName="'searchComplete'"
                :filterEventBusName="'filterComplete'"
            />
        </div>
        

        <FilterModal
            :tableStatus="'all'"
            :filterEventBusName="'filterAll'"
        />

        <FilterModal
            :tableStatus="'proceed'"
            :filterEventBusName="'filterProceed'"
        />

        <FilterModal
            :tableStatus="'complete'"
            :filterEventBusName="'filterComplete'"
        />
    </div>
        <!-- <button class="btn z-50 btn-primary rounded-full" @click.native="scrollToTop()"> Back to Top </button> -->
    <!-- <CartProductModal /> -->
    <OrderProductModal />
</template>

<script setup>

import ManageOrderTable  from "./ManageOrderTable.vue";
import ManageCartTable from "./ManageCartTable.vue"
import CampaignStatus from "./CampaignStatus.vue";
import SearchBar from "./SearchBar.vue";
import CartSearchBar from "./CartSearchBar.vue"
import OrderProductModal from "./OrderProductModal.vue"
import CartProductModal from "./CartProductModal.vue"
import  FilterModal  from "./FilterModal.vue";

import { ref, provide, onMounted, onUnmounted, onBeforeMount, getCurrentInstance } from "vue";
// import xlsx from "xlsx";
import { toggle_stop_checkout, retrieve_campaign } from "@/api_v2/campaign"
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import i18n from "@/locales/i18n"
import ExportEasyStoreOrderButton from '@/plugin/easy-store/views/ExportOrderButton.vue'
import ExportShopifyOrderButton from '@/plugin/shopify/views/ExportOrderButton.vue'
import ExportOrderButton from "./ExportOrderButton.vue";

// import { watch } from "fs";


const route = useRoute()
const router = useRouter()
const manageOrderStore = useManageOrderStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const layout = useLSSSellerLayoutStore()

const deliveryStatus = ref(false);
const checkout_status = ref(false)
const tableType = ref('all')
const show_order = status=>{
  tableType.value=status
  console.log(tableType.value)
}

onBeforeMount(()=>{
    if (layout.userInfo.user_subscription.status === "test") router.push({ name: 'campaign-list'})
})



const stopCheckout = ()=>{
    toggle_stop_checkout(route.params.campaign_id, layout.alert).then(res=>{
        manageOrderStore.campaign = res.data
        layout.notification.showMessageToast(`${i18n.global.t('manage_order.update_successed')}`);
    }) 
}

// function getCampaignInfo(){
//     retrieve_campaign(route.params.campaign_id, layout.alert).then(res=>{
//         manageOrderStore.campaign = res.data
//     })
// }
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
    .tab-active{
        color: rgb(30, 64, 175);
        border: 2px solid;
        border-bottom: 0;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 3px;
    }
</style>
