<template>
    <!-- OUTTER BOX -->
    <div class="intro-y grid grid-cols-12 gap-5 h-[100%]">
        <!-- BEGIN: campaign Info -->
        <div class="col-span-12 flex flex-col h-fit">
            <!-- BEGIN: campaign Status -->
            <CampaignStatus/>
            <!-- END: campaign Status -->

            <div class="w-full mt-8">
                <div class="flex align-baseline text-xl -mb-5">
                    <div class="relative mr-3 ml-2">
                            <a class="mr-0.5" @click="show_order('All')">{{$t('manage_order.all')}} </a>
                    </div>
                    <div class="w-5 h-5 report-box__indicator rounded-full bg-danger text-white text-center text-xs p-0.5 px-1.5" v-show="store.data_count['All'] > 0"> 
                            <span>{{store.data_count['All']}}</span>
                    </div>

                    <div class="relative mr-3 ml-2">
                            <a class="mr-0.5" @click="show_order('Review')">{{$t('manage_order.review')}} </a>
                    </div>
                    <div class="w-5 h-5 report-box__indicator rounded-full bg-danger text-white text-center text-xs p-0.5 px-1.5" v-show="store.data_count['Review'] > 0"> 
                            <span>{{store.data_count['Review']}}</span>
                    </div>

                    <div class="relative mr-3 ml-2">
                            <a class="mr-0.5" @click="show_order('Complete')">{{$t('manage_order.complete')}} </a>
                    </div>
                    <div class="w-5 h-5 report-box__indicator rounded-full bg-danger text-white text-center text-xs p-0.5 px-1.5" v-show="store.data_count['Complete'] > 0"> 
                            <span>{{store.data_count['Complete']}}</span>
                    </div>
                </div>
                <!--分隔線-->
                <div class="w-full border-t border-slate-800/60 dark:border-darkmode-400 mt-5"></div>
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

            <!-- Table -->
            <div class="form-check form-switch w-full">
                <label class="form-check-label ml-0" for="show-example-3"> {{$t('manage_order.stop_checkout')}}</label>
                <input @click="stop_checkout($event.target.checked)" class="form-check-input mr-0 ml-3" type="checkbox" v-model="checkout_status"/>
            </div>

            <div class=" mt-3 w-full overflow-auto h-fit xl:h-[450px]" v-show="tableType === 'All'">
                <ManageOrderTable
                    :tableStatus="'All'"
                    :tableSearch="'searchAll'"
                    :tableFilter="'filterAll'"
                />
            </div>
            <div class=" mt-3 w-full overflow-auto h-fit xl:h-[450px]" v-show="tableType === 'Review'">
                <ManageOrderTable
                    :tableStatus="'Review'"
                    :tableSearch="'searchReview'"
                    :tableFilter="'filterReview'"
                />
            </div>
            <div class=" mt-3 w-full overflow-auto h-fit xl:h-[450px]" v-show="tableType === 'Complete'">
                <ManageOrderTable
                    :tableStatus="'Complete'"
                    :tableSearch="'searchComplete'"
                    :tableFilter="'filterComplete'"
                />
            </div>
            <OrderProductModal />
        </div>
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
