<template>
    <!-- OUTTER BOX -->
    <div class="intro-y grid grid-cols-12 gap-5">
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

            <div class="col-span-12 mt-8 ">
                <div class="flex align-baseline text-xl -mb-5">
                    <a class="mr-2 ml-2 ">All </a>
                    <span class="text-xs p-1 h-5 rounded-full bg-danger text-white">32</span>
                    <a class="mr-2 ml-5">Review </a>
                    <span class="text-xs p-1 h-5 rounded-full bg-danger text-white align-top">12</span>
                    <!--  <a class="mr-2 ml-5">Pending Payment </a> -->
                    <!-- <span class="text-xs p-1 h-5 rounded-full bg-danger text-white mr- align-top">2</span> -->
                    <a class="mr-2 ml-5">Complete </a>
                    <span class="text-xs p-1 h-5 rounded-full bg-danger text-white mr-5 align-top">12</span>
                </div>
                <!--分隔線-->
                <div class="w-full border-t border-slate-800/60 dark:border-darkmode-400 mt-5"></div>

                <div class="relative w-full h-16">
                    <div class="flex w-full absolute mr-auto m-1 right-0 sm:mt-1 sm:w-auto ">
                        <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-700 " />
                        <input type="text" class="form-control rounded-full mr-2 w-full sm:w-64 box px-10"
                            placeholder="Search files" />

                        <div class="export">
                             <Dropdown class="relative p-2 mr-1 flex rounded-full items-center btn border-[#131C34] "
                            placement="bottom-start"> Export
                            <DropdownToggle role="button" class="w-5 h-5 block" href="javascript:;">
                                <ChevronDownIcon class="w-5 h-5 text-slate-700" />
                            </DropdownToggle>
                            <DropdownMenu class="pt-2">
                                <DropdownContent class="w-full text-center">
                                    <DropdownItem @click="onExportXlsx"> XLSM </DropdownItem>
                                </DropdownContent>
                            </DropdownMenu>
                        </Dropdown>
                        </div>
                       <div class="export">
                           <Dropdown class=" relative inset-y-0 p-2 flex rounded-full items-center btn border-[#131C34]"
                            placement="bottom-start">
                            <DropdownToggle role="button" class="w-5 h-5 mr-1 block" href="javascript:;">
                                <FilterIcon class="w-5 h-5 text-slate-700" />
                            </DropdownToggle>
                            Filter
                            <DropdownMenu class="pt-2">
                                <DropdownContent>
                                    <DropdownItem> Delivery </DropdownItem>
                                    <DropdownItem> Payment </DropdownItem>
                                    <DropdownItem> Platform </DropdownItem>
                                </DropdownContent>
                            </DropdownMenu>
                        </Dropdown>
                       </div>
                    </div>
                </div>
            </div>

            <!-- Table -->
            <div class="form-check form-switch w-full sm:w-auto sm:ml-auto sm:mt-0">
                <label class="form-check-label ml-0" for="show-example-3"> Stop Checkout</label>
                <input @click="toggle" class="form-check-input mr-0 ml-3" type="checkbox" />
            </div>

            <div class="overflow-x-auto mt-3">
                <ManageOrderTable />
            </div>
        </div>
    </div>
</template>

<script setup>
// import {campaign_comment_summarize} from '@/api/user';
import  ManageOrderTable  from "./ManageOrderTable.vue";
import { ref, provide, onMounted } from "vue";
import xlsx from "xlsx";
import { manage_order_list } from "@/api/manage_order";
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
const route = useRoute();
const store = useManageOrderStore()

const deliveryStatus = ref(false);

function test(){
    console.log(route.params)
}

onMounted(()=>{
    manage_order_list(route.params.campaign_id).then(
        res => {
			store.manageOrder = res.data
			console.log(res.data)
		}
    )
})
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
