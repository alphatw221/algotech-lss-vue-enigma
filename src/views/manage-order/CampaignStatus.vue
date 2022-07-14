<template>
    <div class="grid grid-cols-12 gap-6 mt-5">
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="p-5 box">
                            <div class="flex">
                                <ShoppingCartIcon class="report-box__icon text-primary" />
                                <template v-if="store.manageOrderStatus.close_rate_raise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            content="Closed rate is increased compare to previous campaign">
                                            {{parseInt(store.manageOrderStatus.close_rate_raise).toFixed(2)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            content="Closed rate is decreased compare to previous campaign">
                                            {{parseInt(store.manageOrderStatus.close_rate_raise).toFixed(2)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="mt-6 text-3xl font-medium leading-8">{{parseInt(store.manageOrderStatus.close_rate).toFixed(2)}}%</div>
                            <div class="mt-1 text-base text-slate-500">{{$t('manage_order.closed_rate')}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="p-5 box">
                            <div class="flex">
                                <CreditCardIcon class="report-box__icon text-pending" />
                                <template v-if="store.manageOrderStatus.campaign_sales_raise >= 0">                                
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            content="Sales is increased compare to previous campaign">
                                            {{parseFloat(store.manageOrderStatus.campaign_sales_raise*100).toFixed(2)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>                                
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            content="Sales is decreased compare to previous campaign">
                                            {{parseFloat(store.manageOrderStatus.campaign_sales_raise*100).toFixed(2)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="mt-6 text-3xl font-medium leading-8">$ {{parseFloat(store.manageOrderStatus.complete_sales).toFixed(2) ?? 0}}</div>
                            <div class="mt-1 text-base text-slate-500">{{$t('manage_order.sales')}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="p-5 box">
                            <div class="flex">
                                <MonitorIcon class="report-box__icon text-warning" />
                                <template v-if="store.manageOrderStatus.uncheckout_rate_raise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            content="Uncheckout rate is increased compare to previous campaign">
                                            {{parseFloat(store.manageOrderStatus.uncheckout_rate_raise).toFixed(2)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            content="Uncheckout rate is decreased compare to previous campaign">
                                            {{parseFloat(store.manageOrderStatus.uncheckout_rate_raise).toFixed(2)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="mt-6 text-3xl font-medium leading-8">{{parseFloat(store.manageOrderStatus.uncheckout_rate).toFixed(2)}}%</div>
                            <div class="mt-1 text-base text-slate-500">{{$t('manage_order.uncheckout')}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="p-5 box">
                            <div class="flex">
                                <UserIcon class="report-box__icon text-success" />
                                <template v-if="store.manageOrderStatus.comment_count_raise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            content="Comments number is increased compare to previous campaign">
                                            {{parseFloat(store.manageOrderStatus.comment_count_raise*100).toFixed(2)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            content="Comments number is decreased compare to previous campaign">
                                            {{parseFloat(store.manageOrderStatus.comment_count_raise*100).toFixed(2)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="mt-6 text-3xl font-medium leading-8">{{store.manageOrderStatus.comment_count}}</div>
                            <div class="mt-1 text-base text-slate-500">{{$t('manage_order.comments')}}</div>
                        </div>
                    </div>
                </div>
            </div>
</template>
<script setup>
import { ref, provide, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { campaign_manage_order } from "@/api/manage_order";
const route = useRoute();
const store = useManageOrderStore()

onMounted(()=>{
    campaign_manage_order(route.params.campaign_id).then(
        res =>{
            store.manageOrderStatus = res.data
            // console.log(res.data)
        }
    )
})
</script>
