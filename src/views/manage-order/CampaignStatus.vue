<template>
    <div class="mx-6 my-1">
        <div v-if="!ready">
            <StatusSkeleton /> 
        </div>
        
        <div v-if="ready"> 
            <TinySlider  :options="{
                    autoplay: true,
                    controls: true,
                    items: 1,
                    nav: true,
                    responsive: {
                    1024:{
                        items: 4,
                    },
                    600: {
                        items: 2,
                    },
                    480: {
                        items: 1,
                    },
                    },
                }">
                <div class="h-40 px-2 mb-1">
                    <div class="report-box">
                        <div class="p-5 box h-[150px] flex flex-col justify-between">
                            <div class="flex">
                                <ManageOrderIcon icon="close_rate" color="#131C34" class="report-box__icon"/>
                                <template v-if="!computedClosedRateRaise"/>
                                <template v-else-if="computedClosedRateRaise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            :content="$t('manage_order.campaign_status.closed_rate_message',{status : $t('manage_order.campaign_status.increased') })">
                                            {{computedClosedRateRaise}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            :content="$t('manage_order.campaign_status.closed_rate_message',{status:$t('manage_order.campaign_status.decreased') })">
                                            {{computedClosedRateRaise}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="flex flex-row justify-between"> 
                                <div class="flex flex-col mt-auto"> 
                                    <div class="text-2xl font-medium leading-8" v-if="campaignDetailStore.campaign">$
                                        {{ (Math.floor(parseFloat(campaignDetailStore.campaignStatistics.complete_sales) * (10 ** campaignDetailStore.campaign.decimal_places)) / 10 ** campaignDetailStore.campaign.decimal_places).toLocaleString('en-GB')}}
                                    </div>
                                    <div class="mt-1 text-base text-slate-500">{{$t('manage_order.campaign_status.sales')}}</div>
                                </div>
                                <div class="flex flex-col gap-1 my-auto text-right"> 
                                    <div class="text-slate-500 text-sm">{{computedClosedRate}}%</div>
                                    <div class="text-base text-slate-500 text-sm">{{$t('manage_order.campaign_status.closed_rate')}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="h-40 px-2 mb-1">
                    <div class="report-box">
                        <div class="p-5 box h-[150px] flex flex-col justify-between">
                            <div class="flex">
                                <ManageOrderIcon icon="unCheckout_rate" color="#b91c1c" class="report-box__icon"/>
                                <template v-if="!computedUncheckoutRateRaise"/>
                                <template v-else-if="computedUncheckoutRateRaise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            :content="$t('manage_order.campaign_status.uncheckout_message',{status : $t('manage_order.campaign_status.increased') })">
                                            {{computedUncheckoutRateRaise}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            :content="$t('manage_order.campaign_status.uncheckout_message',{status:$t('manage_order.campaign_status.decreased') })">
                                            {{computedUncheckoutRateRaise}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="flex flex-row justify-between"> 
                                <div class="flex flex-col mt-auto"> 
                                    <div class="text-2xl font-medium leading-8" v-if="campaignDetailStore.campaign">$
                                        {{ (Math.floor(parseFloat(campaignDetailStore.campaignStatistics.proceed_sales) * (10 ** campaignDetailStore.campaign.decimal_places)) / 10 ** campaignDetailStore.campaign.decimal_places).toLocaleString('en-GB')}}
                                    </div>
                                    <div class="text-base text-slate-500">{{$t('manage_order.campaign_status.potential_sales')}}</div>
                                </div>
                                <div class="flex flex-col gap-1 my-auto text-right"> 
                                    <div class="text-slate-500 text-sm">{{computedUncheckoutRate}}%</div>
                                    <div class="text-base text-slate-500 text-sm">{{$t('manage_order.campaign_status.uncheckout')}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="h-40 px-2 mb-1">
                    <div class="report-box">
                        <div class="p-5 box h-[150px] flex flex-col justify-between">
                            <div class="flex">
                                <ManageOrderIcon icon="sales_rate3" color="#006A2B" class="report-box__icon"/>
                                <template v-if="!computedEstimatedTotalRaise"/>
                                <template v-else-if="computedEstimatedTotalRaise >= 0">                                
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            :content="$t('manage_order.campaign_status.total_sales_message',{status : $t('manage_order.campaign_status.increased') })">
                                            {{computedEstimatedTotalRaise}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>                                
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            :content="$t('manage_order.campaign_status.total_sales_message',{status:$t('manage_order.campaign_status.decreased') })">
                                            {{computedEstimatedTotalRaise}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="flex flex-col mt-auto">
                                <div class="text-2xl font-medium leading-8" v-if="campaignDetailStore.campaign">$
                                    {{ (Math.floor(parseFloat(computedEstimatedTotalSales) * (10 ** campaignDetailStore.campaign.decimal_places)) / 10 ** campaignDetailStore.campaign.decimal_places).toLocaleString('en-GB')}}
                                </div>
                                <div class="text-base text-slate-500">{{$t('manage_order.campaign_status.total_sales')}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="h-40 px-2 mb-1">
                    <div class="report-box">
                        <div class="p-5 box h-[150px] flex flex-col justify-between">
                            <div class="flex">
                                <ManageOrderIcon icon="comments_rate" color="#A96400" class="report-box__icon"/>
                                <template v-if="!computedCommentRaise"/>
                                <template v-else-if="computedCommentRaise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            :content="$t('manage_order.campaign_status.comments_message',{status : $t('manage_order.campaign_status.increased') })">
                                            {{computedCommentRaise}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            :content="$t('manage_order.campaign_status.comments_message',{status:$t('manage_order.campaign_status.decreased') })">
                                            {{computedCommentRaise}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="flex flex-col mt-auto"> 
                                <div class="text-2xl font-medium leading-8">{{campaignDetailStore.campaignStatistics.comment_count}}</div>
                                <div class="text-base text-slate-500">{{$t('manage_order.campaign_status.comments')}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </TinySlider>
        </div>
    </div>
</template>
<script setup>
import { ref, provide, onMounted, getCurrentInstance, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { get_campaign_statistics } from "@/api_v2/campaign"
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail"
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useManageOrderStore } from "../../stores/lss-manage-order"
import StatusSkeleton from "./StatusSkeleton.vue";
import useI18n from "@/locales/i18n";

const campaignDetailStore = useCampaignDetailStore();
const layoutStore = useLSSSellerLayoutStore()
const manageOrderStore = useManageOrderStore()
const route = useRoute();
const ready = ref(false)
const tinySliderKey = ref(null)

watch(computed(()=> useI18n.global.locale.value),()=>{refresh()}) //temp
const resetStatisticData = ()=>{
    campaignDetailStore.campaignStatistics = {
			"cart_count":0,
            "order_complete_count":0,
            "order_proceed_count":0,
            "comment_count":0,
            "complete_sales":0,
            "proceed_sales": 0,

            "previous_cart_count":0,
            "previous_order_complete_count":0,
            "previous_order_proceed_count":0,
            "previous_comment_count":0,
            "previous_complete_sales":0,
            "previous_proceed_sales": 0,
		}
}

onMounted(()=>{
    

    if(campaignDetailStore.campaignStatisticsCampaignID!==parseInt(route.params.campaign_id)){
        resetStatisticData()   
        get_campaign_statistics(route.params.campaign_id, layoutStore.alert).then(
            res =>{
                campaignDetailStore.campaignStatisticsCampaignID = parseInt(route.params.campaign_id)
                campaignDetailStore.campaignStatistics = res.data
                console.log(res.data)
                ready.value = false
                setTimeout(() => {
                    ready.value = true
                }, 0)
            }
        )
    }else{
        ready.value = true}
    })

const times100toFixed2 = number =>{
    return (number*100).toFixed(2)
}

const refresh = ()=>{
    if(ready.value){
        ready.value = false
        setTimeout(() => {
            ready.value = true
        }, 0)
    }
}

watch(computed(()=> campaignDetailStore.campaignStatistics),()=>{refresh()}) //temp

//closed rate
const computedClosedRate = computed(()=>{
    if((campaignDetailStore.campaignStatistics?.order_complete_count||0 + campaignDetailStore.campaignStatistics?.order_proceed_count||0 + campaignDetailStore.campaignStatistics?.cart_count||0) == 0) return 0
    const _rate = (campaignDetailStore.campaignStatistics?.order_complete_count||0) / (campaignDetailStore.campaignStatistics?.order_complete_count + campaignDetailStore.campaignStatistics?.order_proceed_count + campaignDetailStore.campaignStatistics?.cart_count)
    return times100toFixed2(_rate)
})

const computedPreviousClosedRate = computed(()=>{
    if((campaignDetailStore.campaignStatistics?.previous_order_complete_count||0 + campaignDetailStore.campaignStatistics?.previous_order_proceed_count||0 + campaignDetailStore.campaignStatistics?.previous_cart_count||0) == 0) return 0
    const _rate =  (campaignDetailStore.campaignStatistics?.previous_order_complete_count||0) / (campaignDetailStore.campaignStatistics?.previous_order_complete_count + campaignDetailStore.campaignStatistics?.previous_order_proceed_count+ campaignDetailStore.campaignStatistics?.previous_cart_count)
    return times100toFixed2(_rate)
})

const computedClosedRateRaise = computed(()=>{
    if( computedPreviousClosedRate.value == 0 ) return 0
    const _rate =  computedClosedRate.value / computedPreviousClosedRate.value
    return times100toFixed2(_rate)
})

//uncheckout rate
const computedUncheckoutRate = computed(()=>{
    if((campaignDetailStore.campaignStatistics?.order_complete_count||0 + campaignDetailStore.campaignStatistics?.order_proceed_count||0 + campaignDetailStore.campaignStatistics?.cart_count||0) == 0) return 0
    const _rate = (campaignDetailStore.campaignStatistics?.cart_count||0) / (campaignDetailStore.campaignStatistics?.order_complete_count + campaignDetailStore.campaignStatistics?.order_proceed_count+ campaignDetailStore.campaignStatistics?.cart_count)
    return times100toFixed2(_rate)
})

const computedPreviousUncheckoutRate = computed(()=>{
    if((campaignDetailStore.campaignStatistics?.previous_order_complete_count||0 + campaignDetailStore.campaignStatistics?.previous_order_proceed_count||0 + campaignDetailStore.campaignStatistics?.previous_cart_count||0) == 0) return 0
    const _rate = (campaignDetailStore.campaignStatistics?.cart_count||0) / (campaignDetailStore.campaignStatistics?.previous_order_complete_count + campaignDetailStore.campaignStatistics?.previous_order_proceed_count+ campaignDetailStore.campaignStatistics?.previous_cart_count)
    return times100toFixed2(_rate)
})

const computedUncheckoutRateRaise = computed(()=>{
    if(computedPreviousUncheckoutRate.value ==0 )return 0
    const _rate = computedUncheckoutRate.value / computedPreviousUncheckoutRate.value
    return times100toFixed2(_rate)
})

//complete sales

const computedCompleteSalesRaise = computed(()=>{
    if((campaignDetailStore.campaignStatistics?.previous_complete_sales||0)==0) return 0
    const _rate = (campaignDetailStore.campaignStatistics?.complete_sales||0) / campaignDetailStore.campaignStatistics?.previous_complete_sales
    return times100toFixed2(_rate)
})

//proceed sales
const computedProceedSalesRaise = computed(()=>{
    if((campaignDetailStore.campaignStatistics?.previous_proceed_sales||0)==0) return 0
    const _rate = (campaignDetailStore.campaignStatistics?.proceed_sales||0) / campaignDetailStore.campaignStatistics?.previous_proceed_sales
    return times100toFixed2(_rate)
})

//estimated total sales
const computedEstimatedTotalSales = computed(()=>{
    return (campaignDetailStore.campaignStatistics?.complete_sales||0) +  (campaignDetailStore.campaignStatistics?.proceed_sales||0)
})

const computedPreviousEstimatedTotalSales = computed(()=>{
    return (campaignDetailStore.campaignStatistics?.previous_complete_sales||0) +  (campaignDetailStore.campaignStatistics?.previous_proceed_sales||0)
})

const computedEstimatedTotalRaise = computed(()=>{
    if(computedPreviousEstimatedTotalSales.value==0)return 0
    const _rate = computedEstimatedTotalSales.value/computedPreviousEstimatedTotalSales.value
    return times100toFixed2(_rate)
})

//comment
const computedCommentRaise = computed(()=>{
    if((campaignDetailStore.campaignStatistics?.previous_comment_count||0)==0)return 0
    const _rate = (campaignDetailStore.campaignStatistics?.comment_count||0) /   campaignDetailStore.campaignStatistics?.previous_comment_count
    return times100toFixed2(_rate)
})
</script>
