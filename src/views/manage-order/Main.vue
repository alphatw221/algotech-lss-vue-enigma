<template>
    <!-- OUTTER BOX -->
    <div class="intro-y chat grid grid-cols-12 gap-5" style="height: 725px">
        <!-- BEGIN: campaign Info -->
        <div class="col-span-12">
            <!-- BEGIN: campaign Status -->
            <div class="grid grid-cols-12 gap-6 mt-5">
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <ShoppingCartIcon class="report-box__icon text-primary" />
                                <div class="ml-auto">
                                    <Tippy tag="div" class="report-box__indicator bg-success cursor-pointer"
                                        content="33% Higher than last month">
                                        33%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </div>
                            <div class="text-3xl font-medium leading-8 mt-6">98.05%</div>
                            <div class="text-base text-slate-500 mt-1">Colsed Rate</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <CreditCardIcon class="report-box__icon text-pending" />
                                <div class="ml-auto">
                                    <Tippy tag="div" class="report-box__indicator bg-danger cursor-pointer"
                                        content="2% Lower than last month">
                                        2%
                                        <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </div> 
                            <div class="text-3xl font-medium leading-8 mt-6">$ 1352,000</div>
                            <div class="text-base text-slate-500 mt-1">Sales</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <MonitorIcon class="report-box__icon text-warning" />
                                <div class="ml-auto">
                                    <Tippy tag="div" class="report-box__indicator bg-success cursor-pointer"
                                        content="12% Higher than last month">
                                        12%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </div>
                            <div class="text-3xl font-medium leading-8 mt-6">11.95%</div>
                            <div class="text-base text-slate-500 mt-1">Uncheckout Rate</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <UserIcon class="report-box__icon text-success" />
                                <div class="ml-auto">
                                    <Tippy tag="div" class="report-box__indicator bg-success cursor-pointer"
                                        content="22% Higher than last month">
                                        22%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </div>
                            <div class="text-3xl font-medium leading-8 mt-6">152,040</div>
                            <div class="text-base text-slate-500 mt-1">Comments</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END: campaign Status -->

            <div class="box grid grid-cols-12 gap-6 mt-5">
                <div class="flex">
                    <div class="z-30 rounded-full w-10 flex items-center w-120 justify-right bg-gray-100 border text-gray-600 dark:bg-dark-1 dark:border-dark-4 -mr-1">
                        @
                    </div>
                    <TomSelect v-model="select" class="w-full">
                        <option value="1">Leonardo DiCaprio</option>
                        <option value="2">Johnny Deep</option>
                        <option value="3">Robert Downey, Jr</option>
                        <option value="4">Samuel L. Jackson</option>
                        <option value="5">Morgan Freeman</option>
                    </TomSelect>
                </div>


            </div>


            <div class="box overflow-x-auto mt-10">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap">#</th>
                            <th class="whitespace-nowrap">First Name</th>
                            <th class="whitespace-nowrap">Last Name</th>
                            <th class="whitespace-nowrap">Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Angelina</td>
                            <td>Jolie</td>
                            <td>@angelinajolie</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Brad</td>
                            <td>Pitt</td>
                            <td>@bradpitt</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Charlie</td>
                            <td>Hunnam</td>
                            <td>@charliehunnam</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
// import {campaign_comment_summarize} from '@/api/user';
import { ref, provide } from "vue";

// Basic sticky notification
const basicStickyNotification = ref();
provide("bind[basicStickyNotification]", (el) => {
    // Binding
    basicStickyNotification.value = el;
});
const basicStickyNotificationToggle = () => {
    // Show notification
    basicStickyNotification.value.showToast();
};

// Basic sticky notification
const videoStickyNotification = ref();
provide("bind[videoStickyNotification]", (el) => {
    // Binding
    videoStickyNotification.value = el;
});
const videoStickyNotificationToggle = () => {
    // Show notification
    videoStickyNotification.value.showToast();
};
</script>

<style scoped>
.switch-toggle {
    float: left;
    height: 42px;
    width: 300px;
    background: #363636ce;
    border-radius: 42px 42px;
}

.switch-toggle input {
    position: absolute;
    opacity: 0;
}

.switch-toggle input+label {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 15px;
    padding-right: 15px;
    float: left;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
}

.switch-toggle input:checked+label {
    background: #064e3b;
    height: 42px;
    width: 100px;
    border-radius: 42px 42px;
}
</style>
