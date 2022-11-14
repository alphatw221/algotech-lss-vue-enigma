<template>
    <TinySlider :options="{
        autoplay: true,
        items: 1,
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
                <div class="report-box animate-pulse">
                    <div class="p-5 box">
                        <div class="flex">
                            <ManageOrderIcon icon="close_rate" color="#969696" class="report-box__icon"/>
                                <div class="ml-auto">
                                    <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                        :content="$t('manage_order.campaign_status.closed_rate_message',{status : $t('manage_order.campaign_status.increased') })">
                                        ...%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">
                            <div class="h-4 w-24 bg-slate-300 rounded"></div>
                            <div class="mt-2 h-6 w-24 bg-slate-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-40 px-2">
                <div class="report-box animate-pulse">
                    <div class="p-5 box">
                        <div class="flex">
                            <ManageOrderIcon icon="unCheckout_rate" color="#969696" class="report-box__icon"/>
                            <div class="ml-auto">
                                    <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                        :content="$t('manage_order.campaign_status.closed_rate_message',{status : $t('manage_order.campaign_status.increased') })">
                                        ...%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">
                            <div class="h-4 w-24 bg-slate-300 rounded"></div>
                            <div class="mt-2 h-6 w-24 bg-slate-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-40 px-2">
                <div class="report-box animate-pulse">
                    <div class="p-5 box">
                        <div class="flex">
                            <ManageOrderIcon icon="sales_rate3" color="#969696" class="report-box__icon"/>                           
                            <div class="ml-auto">
                                <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                    :content="$t('manage_order.campaign_status.closed_rate_message',{status : $t('manage_order.campaign_status.increased') })">
                                    ...%
                                    <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                </Tippy>
                            </div>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">
                            <div class="h-4 w-24 bg-slate-300 rounded"></div>
                            <div class="mt-2 h-6 w-24 bg-slate-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-40 px-2">
                <div class="report-box animate-pulse">
                    <div class="p-5 box">
                        <div class="flex">
                            <ManageOrderIcon icon="comments_rate" color="#969696" class="report-box__icon"/>
                            <div class="ml-auto">
                                <Tippy tag="div" class="cursor-pointer report-box__indicator bg-success"
                                    :content="$t('manage_order.campaign_status.closed_rate_message',{status : $t('manage_order.campaign_status.increased') })">
                                    ...%
                                    <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                </Tippy>
                            </div>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">
                            <div class="h-4 w-24 bg-slate-300 rounded"></div>
                            <div class="mt-2 h-6 w-24 bg-slate-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
    </TinySlider>



</template>
<script setup>


</script>

<style scoped>


</style>