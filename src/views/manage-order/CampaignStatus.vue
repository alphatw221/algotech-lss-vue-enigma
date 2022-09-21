<template>
    <div class="grid grid-cols-12 gap-6 mt-3">
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="p-5 box">
                            <div class="flex">
                                <!-- <ShoppingCartIcon class=" text-primary" /> -->
                                <ManageOrderIcon icon="close_rate" color="#131C34" class="report-box__icon"/>
                                <template v-if="!manageOrderStatus.close_rate_raise"/>
                                <template v-else-if="manageOrderStatus.close_rate_raise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            :content="$t('manage_order.campaign_status.closed_rate_message',{status : $t('manage_order.campaign_status.increased') })">
                                            {{parseInt(manageOrderStatus.close_rate_raise).toFixed(2)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            :content="$t('manage_order.campaign_status.closed_rate_message',{status:$t('manage_order.campaign_status.decreased') })">
                                            {{parseInt(manageOrderStatus.close_rate_raise).toFixed(2)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="mt-6 text-3xl font-medium leading-8">{{parseInt(manageOrderStatus.close_rate).toFixed(2)}}%
                                <!-- <span class="text-base">{{manageOrderStatus.order_qty}} / {{manageOrderStatus.order_qty + manageOrderStatus.cart_qty}}</span> -->
                            </div>
                            <div class="mt-1 text-base text-slate-500">{{$t('manage_order.campaign_status.closed_rate')}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="p-5 box">
                            <div class="flex">
                                <ManageOrderIcon icon="unCheckout_rate" color="#b91c1c" class="report-box__icon"/>
                                <template v-if="!manageOrderStatus.uncheckout_rate_raise"/>
                                <template v-else-if="manageOrderStatus.uncheckout_rate_raise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            :content="$t('manage_order.campaign_status.uncheckout_message',{status : $t('manage_order.campaign_status.increased') })">
                                            {{parseFloat(manageOrderStatus.uncheckout_rate_raise).toFixed(2)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            :content="$t('manage_order.campaign_status.uncheckout_message',{status:$t('manage_order.campaign_status.decreased') })">
                                            {{parseFloat(manageOrderStatus.uncheckout_rate_raise).toFixed(2)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="mt-6 text-3xl font-medium leading-8">{{parseFloat(manageOrderStatus.uncheckout_rate).toFixed(2)}}%
                                <!-- <span class="text-base">{{manageOrderStatus.cart_qty}} / {{manageOrderStatus.order_qty + manageOrderStatus.cart_qty}}</span> -->
                            </div>
                            <div class="mt-1 text-base text-slate-500">{{$t('manage_order.campaign_status.uncheckout')}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="p-5 box">
                            <div class="flex">
                                <ManageOrderIcon icon="sales_rate3" color="#006A2B" class="report-box__icon"/>
                                <template v-if="!manageOrderStatus.campaign_sales_raise"/>
                                <template v-else-if="manageOrderStatus.campaign_sales_raise >= 0">                                
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            :content="$t('manage_order.campaign_status.sales_message',{status : $t('manage_order.campaign_status.increased') })">
                                            {{parseFloat(manageOrderStatus.campaign_sales_raise*100).toFixed(2)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>                                
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            :content="$t('manage_order.campaign_status.sales_message',{status:$t('manage_order.campaign_status.decreased') })">
                                            {{parseFloat(manageOrderStatus.campaign_sales_raise*100).toFixed(2)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="mt-6 text-3xl font-medium leading-8" v-if="store.campaign">$
                                {{ Math.floor(parseFloat(manageOrderStatus.complete_sales) * (10 ** store.campaign.decimal_places)) / 10 ** store.campaign.decimal_places}}
                            </div>
                            <div class="mt-1 text-base text-slate-500">{{$t('manage_order.campaign_status.sales')}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="p-5 box">
                            <div class="flex">
                                <ManageOrderIcon icon="comments_rate" color="#A96400" class="report-box__icon"/>
                                <template v-if="!manageOrderStatus.comment_count_raise"/>
                                <template v-else-if="manageOrderStatus.comment_count_raise >= 0">
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                            :content="$t('manage_order.campaign_status.comments_message',{status : $t('manage_order.campaign_status.increased') })">
                                            {{parseFloat(manageOrderStatus.comment_count_raise*100).toFixed(2)}}%
                                            <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="ml-auto">
                                        <Tippy tag="div" class="cursor-pointer report-box__indicator bg-danger"
                                            :content="$t('manage_order.campaign_status.comments_message',{status:$t('manage_order.campaign_status.decreased') })">
                                            {{parseFloat(manageOrderStatus.comment_count_raise*100).toFixed(2)}}%
                                            <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                        </Tippy>
                                    </div>
                                </template>
                            </div>
                            <div class="mt-6 text-3xl font-medium leading-8">{{manageOrderStatus.comment_count}}</div>
                            <div class="mt-1 text-base text-slate-500">{{$t('manage_order.campaign_status.comments')}}</div>
                        </div>
                    </div>
                </div>
            </div>
</template>
<script setup>
import { ref, provide, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { campaign_manage_order } from "@/api/manage_order";
import { useManageOrderStore } from "@/stores/lss-manage-order";
const route = useRoute();
const store = useManageOrderStore()

const manageOrderStatus = ref({
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
        })

onMounted(()=>{
    campaign_manage_order(route.params.campaign_id).then(
        res =>{
            manageOrderStatus.value = res.data
            // console.log(manageOrderStatus.value)
        }
    )
})
</script>
