<template>
    <!-- OUTTER BOX -->
        <!-- BEGIN: campaign Info -->
        <div class="flex flex-col h-fit sm:mt-0">
            <h1 class="mt-3 lg:mt-1 w-full text-center">{{$t('manage_order.title')}}</h1>
            <!-- BEGIN: campaign Status -->
            <CampaignStatus/>
            <!-- END: campaign Status -->

            <div class="w-full mt-8 flex flex-col">
                <div class="flex -mb-5 text-base align-baseline justify-end lg:text-xl">
                    <div class="relative ml-2 mr-3">
                            <a class="mr-0.5" style="color:#1e40af;" @click="show_order('All')">{{$t('manage_order.all')}} (<span style="font-weight:bold;">{{store.data_count['All']}}</span>)</a>
                    </div>
                    <div class="relative ml-2 mr-3">
                            <a class="mr-0.5" style="color:#1e40af;" @click="show_order('Review')">{{$t('manage_order.review')}} (<span style="font-weight:bold;">{{store.data_count['Review']}}</span>)</a>
                    </div>
                    <div class="relative ml-2 mr-3">
                            <a class="mr-0.5" style="color:#1e40af;" @click="show_order('Complete')">{{$t('manage_order.complete')}} (<span style="font-weight:bold;">{{store.data_count['Complete']}}</span>) </a>
                    </div>
                </div>
                <!--分隔線-->
                <div class="w-full mt-5 border-t border-slate-800/60 dark:border-darkmode-400"></div>
                <div class="flex flex-col sm:flex-row">
                    <div class="relative right-0 flex-auto m-1 sm:mt-1">
                        <SearchBar 
                            v-show="tableType === 'All'"
                            :tableStatus="'All'"
                            :tableSearch="'searchAll'"
                            :tableFilter="'filterAll'"/>
                        <SearchBar 
                            v-show="tableType === 'Review'"
                            :tableStatus="'Review'"
                            :tableSearch="'searchReview'"
                            :tableFilter="'filterReview'"/>
                        <SearchBar 
                            v-show="tableType === 'Complete'"
                            :tableStatus="'Complete'"
                            :tableSearch="'searchComplete'"
                            :tableFilter="'filterComplete'"/>
                    </div>
                
                    <div class="form-check form-switch justify-end mt-2">
                        <label class="ml-0 form-check-label" for="show-example-3"> {{$t('manage_order.stop_checkout')}}</label>
                        <input @click="stop_checkout($event.target.checked)" class="ml-3 mr-0 form-check-input" type="checkbox" v-model="checkout_status"/>
                    </div>
                </div>
            </div>

            <!-- Table -->
            
            <div v-show="tableType === 'All'">
                <ManageOrderTable
                    :tableStatus="'All'"
                    :tableSearch="'searchAll'"
                    :tableFilter="'filterAll'"
                />
            </div>
            <div v-show="tableType === 'Review'">
                <ManageOrderTable
                    :tableStatus="'Review'"
                    :tableSearch="'searchReview'"
                    :tableFilter="'filterReview'"
                />
            </div>
            <div v-show="tableType === 'Complete'">
                <ManageOrderTable
                    :tableStatus="'Complete'"
                    :tableSearch="'searchComplete'"
                    :tableFilter="'filterComplete'"
                />
            </div>
            <OrderProductModal />
        </div>
        <!-- <button class="btn z-50 btn-primary rounded-full" @click.native="scrollToTop()"> Back to Top </button> -->
</template>

<script setup>
// import {campaign_comment_summarize} from '@/api/user';
import ManageOrderTable  from "./ManageOrderTable.vue";
import CampaignStatus from "./CampaignStatus.vue";
import SearchBar from "./SearchBar.vue";
import OrderProductModal from "./OrderProductModal.vue"
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
// import xlsx from "xlsx";
import { campaign_manage_order } from "@/api/manage_order";
import { allow_checkout } from "@/api_v2/campaign"
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const route = useRoute();
const store = useManageOrderStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const layout = useLSSSellerLayoutStore()

const deliveryStatus = ref(false);
const checkout_status = route.query.checkout == 1 ? false : true ;
const tableType = ref('All')
const show_order = status=>{
  tableType.value=status
}

function stop_checkout(status){
    allow_checkout(route.params.campaign_id,status)
    layout.notification.showMessageToast('Update Successed');
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
