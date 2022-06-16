<template>
    <div class="grid grid-cols-12 gap-6 mt-5">
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <ShoppingCartIcon class="report-box__icon text-primary" />
                                <template v-if="store.manageOrder.close_rate_raise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="report-box__indicator bg-success cursor-pointer"
                                            content="33% Higher than last month">
                                            {{parseInt(store.manageOrder.close_rate_raise)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="report-box__indicator bg-danger cursor-pointer"
                                            content="33% Higher than last month">
                                            {{parseInt(store.manageOrder.close_rate_raise)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="text-3xl font-medium leading-8 mt-6">{{store.manageOrder.close_rate}}%</div>
                            <div class="text-base text-slate-500 mt-1">Colsed Rate</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <CreditCardIcon class="report-box__icon text-pending" />
                                <template v-if="store.manageOrder.campaign_sales_raise >= 0">                                
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="report-box__indicator bg-success cursor-pointer"
                                            content="2% Lower than last month">
                                            {{parseFloat(store.manageOrder.campaign_sales_raise*100).toFixed(2)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>                                
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="report-box__indicator bg-danger cursor-pointer"
                                            content="2% Lower than last month">
                                            {{parseFloat(store.manageOrder.campaign_sales_raise*100).toFixed(2)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="text-3xl font-medium leading-8 mt-6">$ {{store.manageOrder.complete_sales}}</div>
                            <div class="text-base text-slate-500 mt-1">Sales</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <MonitorIcon class="report-box__icon text-warning" />
                                <template v-if="store.manageOrder.uncheckout_rate_raise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="report-box__indicator bg-success cursor-pointer"
                                            content="12% Higher than last month">
                                            {{parseFloat(store.manageOrder.uncheckout_rate_raise).toFixed(2)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="report-box__indicator bg-danger cursor-pointer"
                                            content="12% Higher than last month">
                                            {{parseFloat(store.manageOrder.uncheckout_rate_raise).toFixed(2)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="text-3xl font-medium leading-8 mt-6">{{store.manageOrder.uncheckout_rate}}%</div>
                            <div class="text-base text-slate-500 mt-1">Uncheckout Rate</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <UserIcon class="report-box__icon text-success" />
                                <template v-if="store.manageOrder.comment_count_raise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="report-box__indicator bg-success cursor-pointer"
                                            content="22% Higher than last month">
                                            {{parseFloat(store.manageOrder.comment_count_raise*100).toFixed(2)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="report-box__indicator bg-danger cursor-pointer"
                                            content="22% Higher than last month">
                                            {{parseFloat(store.manageOrder.comment_count_raise*100).toFixed(2)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="text-3xl font-medium leading-8 mt-6">{{store.manageOrder.comment_count}}</div>
                            <div class="text-base text-slate-500 mt-1">Comments</div>
                        </div>
                    </div>
                </div>
            </div>
</template>
<script setup>
import { ref, provide, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
const route = useRoute();
const store = useManageOrderStore()
</script>
