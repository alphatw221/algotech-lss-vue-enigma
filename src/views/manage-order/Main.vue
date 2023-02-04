<template>
    <!-- OUTTER BOX -->
        <!-- BEGIN: campaign Info -->
    <div class="flex flex-col lg:pt-5 mt-3 h-fit gap-5 sm:mx-20">
        <div class="flex flex-row gap-4 mt-3 mx-auto sm:mx-0 font-medium">
            <div @click="show_table('manageOrder')" :class="[{ 'menu' : tableType === 'manageOrder'},{'statusBtn': route.params.campaign_id}]" >
                <h2 :data-content="$t('manage_order.title')" class="text-xl sm:text-2xl allp" >{{$t('manage_order.title')}}({{ manageOrderStore?.data_count?.all||0 }})</h2>
            </div>
            <div v-if="route.params.campaign_id" class="bar"></div>
            <div v-if="route.params.campaign_id" @click="show_table('incomingOrder')" class="statusBtn" :class="{ 'menu' : tableType === 'incomingOrder'}">
                <h2 :data-content="$t('manage_order.incoming_order')" class="text-xl sm:text-2xl allp">{{$t('manage_order.incoming_order')}}({{ manageOrderStore?.carts?.length||0 }})</h2>
            </div>
        </div> 
        <!-- BEGIN: campaign Status -->
        <CampaignStatus v-if="route.params.campaign_id"/>
        <!-- END: campaign Status -->

        <div class="w-full flex flex-col -mb-5 sm:mb-0 mt-3 lg:mt-0">
            <div v-show="tableType !=='incomingOrder'" class="flex -mb-5 text-base align-baseline justify-end lg:text-xl">
                <button @click="show_order('all')" class="statusBtn"  :class="{ 'all' : orderType === 'all'}" >
                    <p class="allp" :data-content="$t('manage_order.all')">{{$t('manage_order.all')}}</p><span class="mr-2">(<span style="font-weight:500;">{{manageOrderStore.data_count['all']}}</span>)</span>
                </button>

                <button @click="show_order('proceed')" class="statusBtn" :class="{ 'all' : orderType === 'proceed'}">
                    <p class="allp" :data-content="$t('manage_order.review')">{{$t('manage_order.review')}}</p><span class=" mr-2">(<span style="font-weight:500;">{{manageOrderStore.data_count['proceed']}}</span>)</span>
                </button>

                <button @click="show_order('complete')" class="statusBtn" :class="{ 'all' : orderType === 'complete'}">
                    <p class="allp" :data-content="$t('manage_order.complete')">{{$t('manage_order.complete')}}</p><span class="mr-2">(<span style="font-weight:500;">{{manageOrderStore.data_count['complete']}}</span>)</span>
                </button>
            </div>

            
            <!--分隔線-->
            <div v-show="tableType !=='incomingOrder'" class="w-full my-5 border-t border-slate-800/60 dark:border-darkmode-400"></div>
            <div class="flex flex-col sm:flex-row">
                <div class="flex flex-row relative right-0 flex-auto sm:my-auto">
                    <SearchBar 
                        v-show="orderType == 'all' && tableType !=='incomingOrder'"
                        :tableStatus="'all'"
                        :tableSearch="'searchAll'"
                        :tableFilter="'filterAll'"
                        :searchEventBusName="'searchAll'"
                        />

                    <SearchBar 
                        v-show="orderType == 'proceed' && tableType !== 'incomingOrder'"
                        :tableStatus="'proceed'"
                        :tableSearch="'searchProceed'"
                        :tableFilter="'filterProceed'"
                        :searchEventBusName="'searchProceed'"
                        />
                    
                    <SearchBar 
                        v-show="orderType == 'complete' && tableType !== 'incomingOrder'"
                        :tableStatus="'complete'"
                        :tableSearch="'searchComplete'"
                        :tableFilter="'filterComplete'"
                        :searchEventBusName="'searchComplete'"
                        />
                    <CartSearchBar v-show="tableType === 'incomingOrder'" /> 
                    <ExportOrderButton :tableStatus="orderType" v-show="tableType !== 'incomingOrder'"/>
                </div>
                <template  v-if="tableType !== 'incomingOrder'">
                    <ExportEasyStoreOrderButton/>
                    <ExportShopifyOrderButton/>
                </template>  
            </div>
            
            
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


        <div v-show="orderType === 'all' && tableType !=='incomingOrder'" class="w-full overflow-hidden h-full">
            <ManageOrderTable
                :tableStatus="'all'"
                :tableSearch="'searchAll'"
                :tableFilter="'filterAll'"
                :searchEventBusName="'searchAll'"
                :filterEventBusName="'filterAll'"
            />
        </div>
        
        <div v-show="orderType === 'proceed' && tableType !=='incomingOrder'" class="w-full overflow-hidden h-full">
            <ManageOrderTable
                :tableStatus="'proceed'"
                :tableSearch="'searchProceed'"
                :tableFilter="'filterProceed'"
                :searchEventBusName="'searchProceed'"
                :filterEventBusName="'filterProceed'"
            />
        </div>
        <div v-show="orderType === 'complete' && tableType !=='incomingOrder'" class="w-full overflow-hidden h-full">
            <ManageOrderTable
                :tableStatus="'complete'"
                :tableSearch="'searchComplete'"
                :tableFilter="'filterComplete'"
                :searchEventBusName="'searchComplete'"
                :filterEventBusName="'filterComplete'"
            />
        </div>
        <div v-if="tableType === 'incomingOrder'" class="w-full overflow-hidden h-full">
            <ManageCartTable
                :tableSearch="'searchComplete'"
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
const orderType = ref('all')
const tableType = ref('manageOrder')

const show_table = status=>{
    tableType.value=status
//   console.log(tableType.value)
}

const show_order = status=>{
  orderType.value=status
//   console.log(orderType.value)
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


/* statusBtn*/
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
    cursor: pointer;
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

    .statusBtn h2 {
    margin: 0;
    position: relative;
    color: var(--primary-color)
    }

    .all p{
    color: theme('colors.primary');
    font-weight: 800;
    }
    .menu h2{
    color: theme('colors.primary');
    }
    .all{
        border-bottom: solid 2px #131C34;
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

    .statusBtn .allp::before{
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
    .statusBtn:hover h2::before {
    width: 100%;
    }

    .bar{
        background-color: #4E4E4ECE;
        width: 3px;
    }
</style>
