<template>
    <!-- OUTTER BOX -->
    <div class="intro-y grid grid-cols-12 gap-5" style="height: 725px">
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
                                    <DropdownItem> XLSM </DropdownItem>
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
                <table class="table table-report mt-3 text-lg">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap" v-for="column in add_product_columns" :key="column.key">
                                <template v-if="column.key == 'select'">
                                    <div class="form-check mt-2">
                                        <input id="checkbox-switch-1" class="form-check-input" type="checkbox"
                                            value="" />
                                    </div>
                                </template>
                                <template v-if="column.key === 'qty_for_campaign' || column.key === 'max_qty'"
                                    style="width:80px;">
                                    {{ column.name }}
                                </template>
                                <template v-else>
                                    {{ column.name }}
                                </template>
                            </th>
                            <!--<th class="text-center whitespace-nowrap">Edit</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, key) in add_product_results" :key="key" class="intro-x">
                            <td v-for="column in add_product_columns" :key="column.key">
                                <template
                                    v-if="column.key === 'select' || column.key == 'editable' || column.key == 'deletable'">
                                    <div class="form-check mt-2">
                                        <input id="checkbox-switch-1" class="form-check-input" type="checkbox"
                                            value="" />
                                    </div>
                                </template>
                                <template v-else-if="column.key === 'platform'" class="w-40">
                                    <div class="flex place-content-center">
                                        <div v-if="product[column.key] === 'facebook'"
                                            class="w-10 h-10 image-fit">
                                            <div class="w-10 h-10 image-fit">
                                                <img src='/src/assets/images/lss-img/facebook.png' />
                                            </div>
                                        </div>
                                        <div v-else-if="product[column.key] === 'instagram'"
                                            class="w-10 h-10 image-fit">
                                            <div class="w-10 h-10 image-fit">
                                                <img src='/src/assets/images/lss-img/instagram.png' />
                                            </div>
                                        </div>
                                        <div v-else-if="product[column.key] === 'youtube'"
                                            class="w-10 h-10 image-fit">
                                            <div class="w-10 h-10 image-fit">
                                                <img src='/src/assets/images/lss-img/youtube.png' />
                                            </div>
                                        </div>
                                        <div v-else class="w-10 h-10 image-fit">
                                            <ShoppingBagIcon />
                                        </div>
                                    </div>
                                </template>

                                <template v-else-if="column.key === 'view'" class="w-40">
                                    <div class="flex place-content-center">
                                        <div class="w-10 h-10 image-fit">
                                            <EyeIcon />
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="column.key === 'delivery'" class="w-40">
                                    <div class="flex place-content-center">
                                        <div class="w-10 h-10 image-fit">
                                            <TruckIcon @click="this.deliveryStatus = !this.deliveryStatus" />
                                        </div>
                                    </div>
                                </template>
                                <template v-else class="w-30">
                                    {{ product[column.key] }}
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <Modal size="modal-xl" class="text-center" :slideOver="true" :show="deliveryStatus"
        @hidden="deliveryStatus = false">
        <ModalHeader class="text-center p-5 ">
            <h2 class="font-medium text-base text-center mr-5">
                Order No. #15861
            </h2>
            <h3 class="btn btn-rounded-pending"> Complete</h3>
        </ModalHeader>
        <ModalBody >
            <div class="intro-y grid grid-cols-12 gap-5">
                <div class="intro-y col-span-12 overflow-auto lg:overflow-visible xl:col-span-7 2xl:col-span-7">
                    <h2 class="text-left text-lg"> Shopping Cart</h2>

                    <table class="table table-report mt-3 text-lg">
                        <thead>
                            <tr>
                                <th class="whitespace-nowrap" v-for="column in shoppingCart_columns" :key="column.key">
                                    {{ column.name }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, key) in shoppingCart_results" :key="key" class="intro-x">
                                <td v-for="column in shoppingCart_columns" :key="column.key">
                                    <template v-if="column.key === 'image'" class="w-40">
                                        <div class="flex">
                                            <div class="w-10 h-10 image-fit zoom-in">
                                                <Tippy tag="img" class="rounded-full" :src="product.image" />
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else class="w-30">
                                        {{ product[column.key] }}
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="intro-y col-span-12 overflow-auto lg:overflow-visible 2xl:col-span-5 xl:col-span-5">
                    <div class="box w-full h-64 p-4 my-1 rounded-xl"> 
                        <h2 class="text-left text-lg">Delivery Info</h2>
                    </div>
                    <div class="box w-full h-64 p-4 my-2 rounded-xl"> 
                        <h2 class="text-left text-lg">Payment Info</h2>
                    </div>
                </div>
            </div>

        </ModalBody>
    </Modal>
</template>

<script setup>
// import {campaign_comment_summarize} from '@/api/user';
import { ref, provide } from "vue";

const deliveryStatus = ref(false);

const add_product_columns = ref([
    { name: 'order Number', key: 'order_number' },
    { name: 'Platform', key: 'platform' },
    { name: 'Name', key: 'name' },
    { name: 'Amount', key: 'price' },
    { name: 'Payment', key: 'payment' },
    { name: 'Status', key: 'status' },
    { name: 'Date', key: 'date' },
    { name: 'View', key: 'view' },
    { name: 'Delivery Status', key: 'delivery' },
]);

const add_product_results = ref([
    {
        order_number: '#15861',
        platform: 'facebook',
        name: 'Andy',
        price: '$ 513',
        status: 'Complete',
        date: '25 April 2022 16:24',
        delivery: '',
        payment: 'Stripe',
    },
    {
        order_number: '#15862',
        platform: 'instagram',
        name: 'Malesa',
        price: '$ 125',
        status: 'Pending',
        date: '25 April 2022 16:31',
        delivery: '',
        payment: 'Stripe',
    },
    {
        order_number: '#15863',
        platform: 'youtube',
        name: 'Johny',
        price: '$ 996',
        status: 'In-Cart',
        date: '25 April 2022 16:33',
        delivery: '',
        payment: 'Stripe',
    },
    {
        order_number: '#15864',
        platform: 'youtube',
        name: 'Anna',
        price: '$ 254',
        status: 'Complete',
        date: '25 April 2022 16:54',
        delivery: '',
        payment: 'Stripe',
    },
]);

const shoppingCart_columns = ref([
    { name: 'Product', key: 'image' },
    { name: '', key: 'name' },
    { name: 'Q \'\ ty', key: 'qty' },
    { name: 'Price', key: 'price' },
    { name: 'Subtotal', key: 'subtotal' },
]);

const shoppingCart_results = ref([
    { image: '/src/assets/images/lss-product/shirt.jpg', name: 'T-shirt', price: '$64', qty: '3', subtotal: '$192', },
    { image: '/src/assets/images/lss-product/sweatshirt.jpg', name: 'Turtleneck Sweatshirt', price: '$88', qty: '2', subtotal: '$176', },
    { image: '/src/assets/images/lss-product/sweatpants.jpg', name: 'Vintage Sweatpants', price: '$59', qty: '4', subtotal: '$236', },
    { image: '/src/assets/images/lss-product/socks.jpg', name: 'Christmas Socks', price: '$45', qty: '1', subtotal: '$45', },
]);
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
