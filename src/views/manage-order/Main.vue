<template>
    <!-- OUTTER BOX -->
        <!-- BEGIN: campaign Info -->
    <div class="flex flex-col lg:pt-5 mt-3 pb-1 h-fit sm:h-[95%]">
        <h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">{{$t('manage_order.title')}}</h2>
        <!-- BEGIN: campaign Status -->
        <CampaignStatus v-if="route.params.campaign_id"/>
        <!-- END: campaign Status -->

        <div class="w-full mt-8 flex flex-col">
            <div class="flex -mb-5 text-base align-baseline justify-end lg:text-xl">
                <button @click="show_order('all')" class="statusBtn"  :class="{ 'all' : tableType === 'all'}" >
                    <p class="all" :data-content="$t('manage_order.all')">{{$t('manage_order.all')}}</p><span class="mr-2">(<span style="font-weight:bold;">{{manageOrderStore.data_count['all']}}</span>)</span>
                </button>

                <button @click="show_order('proceed')" class="statusBtn" :class="{ 'all' : tableType === 'proceed'}">
                    <p class="all" :data-content="$t('manage_order.review')">{{$t('manage_order.review')}}</p><span class=" mr-2">(<span style="font-weight:bold;">{{manageOrderStore.data_count['proceed']}}</span>)</span>
                </button>

                <button @click="show_order('complete')" class="statusBtn" :class="{ 'all' : tableType === 'complete'}">
                    <p class="all" :data-content="$t('manage_order.complete')">{{$t('manage_order.complete')}}</p><span class="mr-2">(<span style="font-weight:bold;">{{manageOrderStore.data_count['complete']}}</span>)</span>
                </button>
            </div>

            
            <!--分隔線-->
            <div class="w-full mt-5 border-t border-slate-800/60 dark:border-darkmode-400"></div>
            <div class="flex flex-col sm:flex-row -mb-5">
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

                        
                        <ExportOrderButton :tableStatus="tableType"/>
                    </div>
                    
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


        <div v-show="tableType === 'all'" class="w-full overflow-hidden h-fit">
            <ManageOrderTable
                :tableStatus="'all'"
                :tableSearch="'searchAll'"
                :tableFilter="'filterAll'"
                :searchEventBusName="'searchAll'"
                :filterEventBusName="'filterAll'"
            />
        </div>
        
        <div v-show="tableType === 'proceed'" class="w-full overflow-hidden h-fit">
            <ManageOrderTable
                :tableStatus="'proceed'"
                :tableSearch="'searchProceed'"
                :tableFilter="'filterProceed'"
                :searchEventBusName="'searchProceed'"
                :filterEventBusName="'filterProceed'"
            />
        </div>
        <div v-show="tableType === 'complete'" class="w-full overflow-hidden h-fit">
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
    
    .statusBtn {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    }

    .statusBtn {
    --primary-color: rgba(78, 78, 78, 0.808);
    --hovered-color: #474747;
    position: relative;
    display: flex;
    font-weight: 500;
    font-size: 16px;
    align-items: center;
    }

    .statusBtn p {
    margin: 0;
    position: relative;
    font-size: 20px;
    color: var(--primary-color)
    }

    .all p{
    color: theme('colors.primary');
    font-weight: 800;
    }

    .statusBtn::after {
    position: absolute;
    content: "";
    width: 0;
    left: 0;
    bottom: -2px;
    font-weight: 800;
    background: var(--hovered-color);
    height: 2px;
    transition: 0.3s ease-out;
    }

    .statusBtn .all::before{
    position: absolute;
    /*   box-sizing: border-box; */
    content: attr(data-content);
    width: 0%;
    inset: 0;
    color: theme('colors.primary');
    overflow: hidden;
    transition: 0.3s ease-out;
    }
    .statusBtn:hover::after {
    width: 100%;
    }
    .statusBtn:hover p::before {
    width: 100%;
    }
</style>
