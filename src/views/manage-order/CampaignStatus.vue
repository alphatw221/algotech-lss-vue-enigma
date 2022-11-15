<template>
    <div class="mx-6 my-1">
        <template v-if="!ready">
            <StatusSkeleton /> 
        </template>
        
        <TinySlider v-else :options="{
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
            <div class="h-40 px-2">
                <div class="report-box">
                    <div class="p-5 box">
                        <div class="flex">
                            <!-- <ShoppingCartIcon class=" text-primary" /> -->
                            <ManageOrderIcon icon="close_rate" color="#131C34" class="report-box__icon"/>
                            <template v-if="!campaignDetailStore.campaignStatistics.close_rate_raise"/>
                            <template v-else-if="campaignDetailStore.campaignStatistics.close_rate_raise >= 0">
                                <div class="ml-auto">
                                    <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                        :content="$t('manage_order.campaign_status.closed_rate_message',{status : $t('manage_order.campaign_status.increased') })">
                                        {{parseInt(campaignDetailStore.campaignStatistics.close_rate_raise).toFixed(2)}}%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </template>
                            <template v-else>
                                <div class="ml-auto">
                                    <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                        :content="$t('manage_order.campaign_status.closed_rate_message',{status:$t('manage_order.campaign_status.decreased') })">
                                        {{parseInt(campaignDetailStore.campaignStatistics.close_rate_raise).toFixed(2)}}%
                                        <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </template>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{parseInt(campaignDetailStore.campaignStatistics.close_rate).toFixed(2)}}%
                            <!-- <span class="text-base">{{campaignDetailStore.campaignStatistics.order_qty}} / {{campaignDetailStore.campaignStatistics.order_qty + campaignDetailStore.campaignStatistics.cart_qty}}</span> -->
                        </div>
                        <div class="mt-1 text-base text-slate-500">{{$t('manage_order.campaign_status.closed_rate')}}</div>
                    </div>
                </div>
            </div>
            <div class="h-40 px-2">
                <div class="report-box">
                    <div class="p-5 box">
                        <div class="flex">
                            <ManageOrderIcon icon="unCheckout_rate" color="#b91c1c" class="report-box__icon"/>
                            <template v-if="!campaignDetailStore.campaignStatistics.uncheckout_rate_raise"/>
                            <template v-else-if="campaignDetailStore.campaignStatistics.uncheckout_rate_raise >= 0">
                                <div class="ml-auto">
                                    <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                        :content="$t('manage_order.campaign_status.uncheckout_message',{status : $t('manage_order.campaign_status.increased') })">
                                        {{parseFloat(campaignDetailStore.campaignStatistics.uncheckout_rate_raise).toFixed(2)}}%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </template>
                            <template v-else>
                                <div class="ml-auto">
                                    <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                        :content="$t('manage_order.campaign_status.uncheckout_message',{status:$t('manage_order.campaign_status.decreased') })">
                                        {{parseFloat(campaignDetailStore.campaignStatistics.uncheckout_rate_raise).toFixed(2)}}%
                                        <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </template>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{parseFloat(campaignDetailStore.campaignStatistics.uncheckout_rate).toFixed(2)}}%
                            <!-- <span class="text-base">{{campaignDetailStore.campaignStatistics.cart_qty}} / {{campaignDetailStore.campaignStatistics.order_qty + campaignDetailStore.campaignStatistics.cart_qty}}</span> -->
                        </div>
                        <div class="mt-1 text-base text-slate-500">{{$t('manage_order.campaign_status.uncheckout')}}</div>
                    </div>
                </div>
            </div>
            <div class="h-40 px-2">
                <div class="report-box">
                    <div class="p-5 box">
                        <div class="flex">
                            <ManageOrderIcon icon="sales_rate3" color="#006A2B" class="report-box__icon"/>
                            <template v-if="!campaignDetailStore.campaignStatistics.campaign_sales_raise"/>
                            <template v-else-if="campaignDetailStore.campaignStatistics.campaign_sales_raise >= 0">                                
                                <div class="ml-auto">
                                    <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                        :content="$t('manage_order.campaign_status.sales_message',{status : $t('manage_order.campaign_status.increased') })">
                                        {{parseFloat(campaignDetailStore.campaignStatistics.campaign_sales_raise*100).toFixed(2)}}%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </template>
                            <template v-else>                                
                                <div class="ml-auto">
                                    <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                        :content="$t('manage_order.campaign_status.sales_message',{status:$t('manage_order.campaign_status.decreased') })">
                                        {{parseFloat(campaignDetailStore.campaignStatistics.campaign_sales_raise*100).toFixed(2)}}%
                                        <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </template>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8" v-if="campaignDetailStore.campaign">$
                            {{ (Math.floor(parseFloat(campaignDetailStore.campaignStatistics.complete_sales) * (10 ** campaignDetailStore.campaign.decimal_places)) / 10 ** campaignDetailStore.campaign.decimal_places).toLocaleString('en-GB')}}
                        </div>
                        <div class="mt-1 text-base text-slate-500">{{$t('manage_order.campaign_status.sales')}}</div>
                    </div>
                </div>
            </div>
            <div class="h-40 px-2">
                <div class="report-box">
                    <div class="p-5 box">
                        <div class="flex">
                            <ManageOrderIcon icon="comments_rate" color="#A96400" class="report-box__icon"/>
                            <template v-if="!campaignDetailStore.campaignStatistics.comment_count_raise"/>
                            <template v-else-if="campaignDetailStore.campaignStatistics.comment_count_raise >= 0">
                                <div class="ml-auto">
                                    <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                        :content="$t('manage_order.campaign_status.comments_message',{status : $t('manage_order.campaign_status.increased') })">
                                        {{parseFloat(campaignDetailStore.campaignStatistics.comment_count_raise*100).toFixed(2)}}%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </template>
                            <template v-else>
                                <div class="ml-auto">
                                    <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                        :content="$t('manage_order.campaign_status.comments_message',{status:$t('manage_order.campaign_status.decreased') })">
                                        {{parseFloat(campaignDetailStore.campaignStatistics.comment_count_raise*100).toFixed(2)}}%
                                        <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </template>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{campaignDetailStore.campaignStatistics.comment_count}}</div>
                        <div class="mt-1 text-base text-slate-500">{{$t('manage_order.campaign_status.comments')}}</div>
                    </div>
                </div>
            </div>
        </TinySlider>
    </div>
</template>
<script setup>
import { ref, provide, onMounted, getCurrentInstance  } from "vue";
import { useRoute, useRouter } from "vue-router";

import { get_campaign_statistics } from "@/api_v2/campaign"
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail"
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import StatusSkeleton from "./StatusSkeleton.vue";

const campaignDetailStore = useCampaignDetailStore();
const layoutStore = useLSSSellerLayoutStore()
const route = useRoute();
const ready = ref(false)


onMounted(()=>{

    console.log('campaign statistic')
    if(campaignDetailStore.campaignStatisticsCampaignID!==parseInt(route.params.campaign_id)){
        campaignDetailStore.campaignStatistics = {
			'campaign_sales_raise': 0,
			'cart_qty': 0,
			'close_rate': 0,
			'close_rate_raise': 0,
			'comment_count': 0,
			'comment_count_raise': 0,
			'complete_sales': 0,
			'order_qty': 0,
			'uncheckout_rate': 0,
			'uncheckout_rate_raise':0,
			}
        get_campaign_statistics(route.params.campaign_id, layoutStore.alert).then(
            res =>{
                console.log(res.data)
                campaignDetailStore.campaignStatisticsCampaignID = parseInt(route.params.campaign_id)
                campaignDetailStore.campaignStatistics = res.data
                ready.value = true
            }
        )
    }
})
</script>
