<template>
<div class="mt-3 w-full overflow-auto max-h-[88%]" > 
    <table id="orderTable" class="table -mt-3 text-[13px] sm:text-[16px] table-report">
            <thead>
                <tr>
                    <th class="whitespace-nowrap text-center" v-for="column in computedColumns" :key="column.key">
                        <template v-if="column.name == 'action'"> </template>
                        <template v-else>
                            <div class="flex justify-center"> 
                                {{ $t(`manage_order.table.`+column.name) }}
                                <template v-if="column.sortable === true">
                                    <template v-if="sortBy[column.key] === -1" > 
                                        <ChevronsUpIcon class="ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis(column.key, 1)" />
                                        <XIcon class="w-5 h-5 text-slate-400 cursor-pointer" @click="cancelSortBy(column.key)"/>
                                    </template> 
                                    <template v-else-if="sortBy[column.key] === 1" > 
                                        <ChevronsDownIcon class="ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis(column.key, -1)" />
                                        <XIcon class="w-5 h-5 text-slate-400 cursor-pointer" @click="cancelSortBy(column.key)"/>
                                    </template> 
                                    <template v-else> 
                                        <ChevronDownIcon class="ml-3 h-5 w-5 text-black bg-null opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis(column.key, -1)" />
                                    </template>
                                </template>
                            </div>
                        </template>
                        
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in orders" :key="index" class="relative">
                    <td v-for="column in computedColumns" :key="column.key" :data-content="$t(`manage_order.table.`+column.name)">
                        <template v-if="column.key === 'platform'">
                            <div class="flex justify-center">
                                <div v-if="order[column.key] === 'facebook'"
                                    class="w-fit h-fit image-fit">
                                    <div class="flex-none w-20 h-20 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-if="order.customer_img">
                                        <img class="rounded-full" :src="order.customer_img"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="rounded-full bg-cover bg-[#3c599b]" src='/src/assets/images/lss-img/facebook.png' >
                                        </div>
                                    </div>
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-else>
                                        <img class="rounded-full" :src="unbound"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="rounded-full bg-cover bg-[#3c599b]" src='/src/assets/images/lss-img/facebook.png' >
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="order[column.key] === 'instagram'"
                                    class="w-fit h-fit image-fit">
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-if="order.customer_img">
                                        <img class="rounded-full" :src="order.customer_img"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="rounded-full bg-cover bg-[#d63376]" src='/src/assets/images/lss-img/instagram.png' >
                                        </div>
                                    </div>
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-else>
                                        <img class="rounded-full" :src="unbound"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="rounded-full bg-cover bg-[#d63376]" src='/src/assets/images/lss-img/instagram.png' />
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="order[column.key] === 'youtube'"
                                    class="w-fit h-fit image-fit">
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-if="order.customer_img">
                                        <img class="rounded-full" :src="order.customer_img"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="bg-cover rounded-full bg-[#f70000]" src='/src/assets/images/lss-img/youtube.png' >
                                        </div>
                                    </div>
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-else>
                                        <img class="rounded-full" :src="unbound"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="bg-cover rounded-full bg-[#f70000]" src='/src/assets/images/lss-img/youtube.png' >
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="order[column.key] === 'twitch'"
                                    class="w-fit h-fit image-fit">
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-if="order.customer_img">
                                        <img class="rounded-full" :src="order.customer_img"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="bg-cover rounded-full bg-[#6441a5]" src='/src/assets/images/lss-img/twitch.png' >
                                        </div>
                                    </div>
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-else>
                                        <img class="rounded-full" :src="unbound"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="bg-cover rounded-full bg-[#6441a5]" src='/src/assets/images/lss-img/twitch.png' >
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="order[column.key] === 'tiktok'"
                                    class="w-fit h-fit image-fit">
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-if="order.customer_img">
                                        <img class="rounded-full" :src="order.customer_img"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="bg-cover rounded-full bg-black" src='/src/assets/images/lss-img/tiktok.png' >
                                        </div>
                                    </div>
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-else>
                                        <img class="rounded-full" :src="unbound"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="bg-cover rounded-full bg-black" src='/src/assets/images/lss-img/tiktok.png' >
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="!order[column.key] && !order.customer_img" class="w-fit h-fit image-fit">
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit">
                                        <img class="rounded-full" :src="unbound"/> 
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="bg-cover rounded-full bg-[#F2502D]" src='/src/assets/images/lss-icon/express_Icon.svg' >
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="w-fit h-fit image-fit">
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit">
                                        <img class="rounded-full" :src="order.customer_img"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="bg-cover rounded-full bg-[#F2502D]" src='/src/assets/images/lss-icon/express_Icon.svg' >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else-if="column.key === 'view'">
                            <div class="flex flex-col sm:flex-row place-content-center">
                                <a class="flex image-fit sm:mr-3" @click="copyOrderLink(order)">
                                    <span class="text-[13px] sm:text-[16px] mr-1 sm:hidden"> {{$t('manage_order.table.copy_link')}} </span>
                                    <Tippy  :content="$t('tooltips.manage_order.link_icon')" :options="{ theme: 'light' }"> 
                                        <SimpleIcon icon="share" color="#2d8cf0" class="sm:mx-auto w-6 sm:w-auto" width="24" height="23" />
                                    </Tippy>
                                </a>
                                <a class="flex sm:ml-auto image-fit mt-2 sm:mt-0" @click="routeToOrderDetail(order)">
                                    <span class="text-[13px] sm:text-[16px] mr-3 sm:hidden min-h-[4vh]"> {{$t('manage_order.table.details')}}  </span>
                                    <Tippy  :content="$t('tooltips.manage_order.view_icon')" :options="{ theme: 'light' }"> 
                                        <SimpleIcon icon="order_details" color="#2d8cf0" class="sm:mx-auto w-6 sm:w-auto" width="26" height="24" />
                                    </Tippy>
                                </a>
                            </div>
                        </template>
                        <!-- <template v-else-if="column.key === 'delivery'">
                            <div class="flex place-content-center">
                                <a class=" w-fit h-fit image-fit" v-show="order.status === 'complete' && order.shipping_method === 'delivery'" @click="shippingOut(order,index)">
                                  <Tippy  :content="$t('tooltips.manage_order.delivery_noti')" :options="{ theme: 'light' }"> 
                                    <SimpleIcon icon="truck" color="#2d8cf0" class="sm:mx-auto" width="26" height="33" />
                                    </Tippy>  
                                </a>
                                <a class="w-fit h-fit image-fit" v-show="order.status === 'shipping out'">
                                   <Tippy  :content="$t('manage_order.complete')" :options="{ theme: 'light' }">
                                        <SimpleIcon icon="truck" color="#BABABA" class="sm:mx-auto cursor-auto" width="26" height="33"/>
                                    </Tippy> 
                                </a>
                            </div>
                        </template> -->
                        <template v-else-if="column.key === 'customer_name'">
                            <div class="flex gap-2 justify-center"> 
                                <template v-if="order.customer_name">
                                    {{order.customer_name}}
                                </template>
                                <template v-else>
                                    {{ $t('manage_order.table.guest') }}
                                </template>   

                                <SimpleIcon icon="new_user" v-if="order.remark == 'new customer'" />
                            </div>
                                 
                        </template>
                        <template v-else-if="column.key === 'order_product'">
                            <div class="flex place-content-center">
                                <a class="text-black w-fit h-fit image-fit">
                                    <Tippy  :content="$t('tooltips.manage_order.product_details')" :options="{ theme: 'light' }">
                                        <ChevronRightIcon @click="showOrderProductModal(order)"/>
                                    </Tippy>
                                </a>
                            </div>
                        </template>
                        <template v-else-if="column.key === 'subtotal' " class="text-right">
                                {{order?.currency}}
                                {{(Math.floor(parseFloat(order.total) * (10 ** order?.decimal_places)) / 10 ** order?.decimal_places).toLocaleString('en-GB')}}
                                {{order?.price_unit?$t(`global.price_unit.${order?.price_unit}`):''}}
                        </template>
                        <template v-else-if="column.key === 'payment_method'">
                            <template v-if="order[column.key] == 'direct_payment'">
                                {{ `${$t('order.payment_method_options.direct_payment')} - ${order.meta.account_mode}` }}
                            </template>
                            <template v-else-if="order[column.key] != ''">
                                {{ $t(`order.${column.key}_options.${order[column.key]}`) }}
                            </template>
                            <!-- {{ order[column.key] == 'direct_payment' ? `${$t('manage_order.table.direct_payment')} - ${order.meta.account_mode}` : $t(`manage_order.table.${order[column.key]}`) }} -->
                        </template>
                        <template v-else-if="column.key === 'id'">
                            <span class="sm:hidden"> #</span> {{ order.id }}
                        </template>

                        <template v-else-if="column.key === 'payment_status'">
                            <OrderPaymentStatusSelect :order="order"/>
                        </template>
                        
                        <template v-else-if="column.key === 'delivery_status' && (!layoutStore.userInfo?.user_subscription?.user_plan?.hide?.order_delivery_status)">
                            <OrderDeliveryStatusSelect :order="order" class="w-full"/>
                        </template>

                        <template v-else-if="column.key === 'category'"> </template>

                        <template v-else class="w-30"> 
                            {{ $t(`order.${column.key}.${order[column.key]}`) }}
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
</div>

    <div class="flex flex-wrap items-center intro-y sm:flex-row sm:flex-nowrap">
        <Page class="mx-auto my-3" 
            show-sizer :page-size-opts="[10,20,50,100]" 
            :total="manageOrderStore.data_count[props.tableStatus]" 
            :page-size="page_size" 
            @on-change="changePage"
            @on-page-size-change="changePageSize"/>
    </div>
</template>
<script setup>
import { seller_search_order, seller_update_deliver_status, seller_update_payment_status, get_order_oid, get_order_report } from "@/api_v2/order"

import { ref, provide, onMounted, onUnmounted, getCurrentInstance, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import unbound from '/src/assets/images/lss-img/noname.png';
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail"

import OrderDeliveryStatusSelect from "@/components/order/OrderDeliveryStatusSelect.vue"
import OrderPaymentStatusSelect from "@/components/order/OrderPaymentStatusSelect.vue"
import { utils, writeFile } from 'xlsx'
import SimpleIcon from "../../global-components/lss-svg-icons/SimpleIcon.vue";

const campaignDetailStore = useCampaignDetailStore();
const route = useRoute();
const router = useRouter();
const manageOrderStore = useManageOrderStore()
const internalInstance = getCurrentInstance()
const layoutStore = useLSSSellerLayoutStore()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const baseURL = import.meta.env.VITE_APP_WEB



// const payment_status_options = ref([
//     { key: 'awaiting_payment', value: 'awaiting_payment'},
//     { key: 'awaiting_confirm', value: 'awaiting_confirm'},
//     { key: 'failed', value: 'failed'},
//     { key: 'expired', value: 'expired', },
//     { key: 'paid', value: 'paid', },
//     { key: 'awaiting_refund', value: 'awaiting_refund', },
//     { key: 'refunded', value: 'refunded', },
// ]);

// const delivery_status_options = ref([
//     { key: 'awaiting_fulfillment', value: 'awaiting_fulfillment'},
//     { key: 'awaiting_shipment', value: 'awaiting_shipment'},
//     { key: 'awaiting_pickup', value: 'awaiting_pickup'},
//     { key: 'partially_shipped', value: 'partially_shipped', },
//     { key: 'shipped', value: 'shipped', },
//     { key: 'collected', value: 'collected', },
//     { key: 'awaiting_return', value: 'awaiting_return', },
//     { key: 'returned', value: 'returned', },
// ]);

const computedColumns = computed(()=>{

    var columns = [
        { name: 'order_number', key: 'id', sortable: true},
        { name: 'null', key: 'platform', sortable: false},
        { name: 'customer', key: 'customer_name', sortable: true},
        { name: 'amount', key: 'subtotal', sortable: true},
        { name: 'payment', key: 'payment_method', sortable: true},
        { name: 'payment_status', key: 'payment_status', sortable: true},
        { name: 'delivery_status', key: 'delivery_status', sortable: true},
        { name: 'action', key: 'view', sortable: false},
        { name: 'null', key: 'order_product', sortable: false}
    ]
    if(layoutStore.userInfo?.user_subscription?.user_plan?.hide?.order_delivery_status){
        columns = columns.filter(column=>column.key!='delivery_status')
    }

    return columns
})
// const columns = ref([
//     { name: 'order_number', key: 'id', sortable: true},
//     { name: 'null', key: 'platform', sortable: false},
//     { name: 'customer', key: 'customer_name', sortable: true},
//     { name: 'amount', key: 'subtotal', sortable: true},
//     { name: 'payment', key: 'payment_method', sortable: true},
//     { name: 'payment_status', key: 'payment_status', sortable: true},
//     { name: 'delivery_status', key: 'delivery_status', sortable: true},
//     // { name: 'delivery_notification', key: 'delivery', sortable: false},
//     { name: 'action', key: 'view', sortable: false},
//     { name: 'null', key: 'order_product', sortable: false}
// ]);

const props = defineProps({
    tableStatus: String,
    searchEventBusName:String,
    filterEventBusName:String,
});
const page = ref(1);
const page_size = ref(10);
const sortBy = ref({})

const keyword = ref('')
const filterData = ref({})

const TYPE_ORDER = 'order'
const TYPE_CART = 'cart'

const orders = ref([])

onMounted(()=>{
    search()
    eventBus.on(props.searchEventBusName, (payload) => {
        keyword.value = payload.keyword
        search()
	})
    eventBus.on(props.filterEventBusName, (payload) => {
        filterData.value = payload
        search()
	})
    eventBus.on(`exportTable-${props.tableStatus}`,()=>{
        export_order()
    })
})

onUnmounted(()=>{
    eventBus.off(props.searchEventBusName)
    eventBus.off(props.filterEventBusName)
    eventBus.off(`exportTable-${props.tableStatus}`)
})

const search = () => {
    filterData.value['sort_by'] = sortBy.value
    var _campaign_id, _search_value, _page, _page_size, _status, _filter_data, _toastify
    seller_search_order(
        _campaign_id=route.params.campaign_id, 
        _search_value=keyword.value, 
        _page=page.value, 
        _page_size=page_size.value, 
        _status=props.tableStatus, 
        _filter_data=filterData.value, 
        _toastify=layoutStore.alert)
    .then(
        res => {
			orders.value = res.data.results
            manageOrderStore.data_count[props.tableStatus] = res.data.count;
            console.log(orders.value)
        }
    )
}

const export_order = ()=>{

    filterData.value['sort_by'] = sortBy.value
    var _campaign_id, _search_value, _status, _filter_data, _toastify
    get_order_report(
        _campaign_id=route.params.campaign_id, 
        _search_value=keyword.value, 
        _status=props.tableStatus, 
        _filter_data=filterData.value, 
        _toastify=layoutStore.alert)
    .then(
        res => {

            const data = res.data.data
            const header = res.data.header
            const displayHeader = res.data.display_header
            const columnSettings = res.data.column_settings
            const displayData = [displayHeader, ...data]


            const workSheet = utils.json_to_sheet(displayData, {header:header, skipHeader:true})
            workSheet['!cols'] = columnSettings
            const wb = utils.book_new()
            utils.book_append_sheet(wb, workSheet, 'sheets')
            writeFile(wb, 'sheets.xlsx')

        }
    )

}


const routeToOrderDetail = (order) => {
    if(route.params.campaign_id){
        router.push({name:'seller-campaign-order-detail',params:{'order_id':order.id, 'campaign_id':route.params.campaign_id}})
    }else{
        router.push({name:'seller-order-detail',params:{'order_id':order.id}})
    }
    
}
const changePage = (p) => {
    page.value = p
    search()
    }
const changePageSize = (p) => {
    page_size.value = p
    search()
    }
const showOrderProductModal = (order) => {
    console.log('show')
    eventBus.emit('getSlideOverOrderData',{'id':order.id})
    manageOrderStore.showOrderProductModal = !manageOrderStore.showOrderProductModal
    console.log(manageOrderStore.showOrderProductModal)
}
// const shippingOut = (order,index) => {
//     seller_deliver(order.id, layoutStore.alert).then(
//         res=>{
//             orders[index]= res.data
//         }
    
//     )
// }
const copyOrderLink = (order) => {
    get_order_oid(order.id, layoutStore.alert).then(
        res =>{
        navigator.clipboard.writeText(`${baseURL}/buyer/order/${res.data}`).then(()=>{
            layoutStore.notification.showMessageToast("copied!")
        })
    })
}
const sortByThis = (field, value) =>{
    sortBy.value[field] = value
	search();
}

const cancelSortBy = (field) => {
    delete sortBy.value[field]
	search();
}

// const updateOrderPaymentStatus = (order, index, event)=>{
//     seller_update_payment_status(order.id, event.target.value, layoutStore.alert).then(
//         res=>{
//             orders[index]= res.data
//             layoutStore.notification.showMessageToast("updated!")
//         }
    
//     )
// }

// const updateOrderDeliveryStatus = (order, index, event)=>{
//     seller_update_deliver_status(order.id, event.target.value, layoutStore.alert).then(
//         res=>{
//             orders[index]= res.data
//             layoutStore.notification.showMessageToast("updated!")
//         }
    
//     )
// }
</script>

<style scoped>
.click-icon:hover {
	cursor: pointer;
}

td {
  min-height: 50px;
  border-collapse: collapse;
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  z-index: 50 !important;
  
  background-color: theme("colors.secondary");
}

.longMessage{
	overflow-wrap: break-word;
}	

@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {

	table,
	thead,
	tbody,
	th,
	td,
	tr {
		display: block;
		font-size: 16px;
		padding: 0px !important;
	}

	.imgtd {
		height: 80px !important;
	}

	thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	tr {
        padding-top: 110px !important;
        background: white;
        margin-top: 20px;
        border-radius: 40px 40px;
	}

	td {
		border: none;
		position: relative;
		padding-left: 50% !important;
        padding-right: 10px !important;
        padding-top: 5px !important;
		text-align: right !important;
		box-shadow: none !important;
        min-height: 25px !important;
        margin-top: 5px;
        display: flex;
        text-align: center;
        align-items: flex-start;
        justify-content:flex-end;
	}

	.productName {
		padding-left: 15px;
	}

	td:before {
		position: absolute;
		left: 6px;
		width: 45%;
		padding-right: 10px;
        padding-left: 10px;
		font-weight: bold;
        text-align: left !important;
		box-shadow: none !important;
		background-color: white !important;
	}

	td:nth-of-type(1):before {
		display:none;
		
	}
    td:nth-of-type(1){
        width: 100%;
        min-height: 20px !important;
        padding-left: 14px !important;
		font-weight: bold;
        justify-content:flex-start;
	}

	td:nth-of-type(2):before {
		display:none;
	}
    td:nth-of-type(2){
        display:inline-block; 
        position:absolute !important;
        top:8px;
        left:50%;
        width: 0%;
        padding-left: 0 !important;
        padding-right: 0 !important;
	}

	td:nth-of-type(3):before {
		display:none;
	}
    td:nth-of-type(3){
        display:inline-block; 
        position:absolute !important;
        top:108px;
        left: 50%;
        transform: translate(-50%, -50%);
        width: auto;
        padding-left: 0 !important;
        background: none !important;
        padding-right: 0 !important;
	}

	td:nth-of-type(4):before {
		content: attr(data-content);
		
	}
    td:nth-of-type(4){
		border-top: 3px solid #e2e2e25b;
        padding-top: 8px !important;
        z-index: 1;
	}

	td:nth-of-type(5):before {
		content: attr(data-content);
	}
    td:nth-of-type(5) {
		padding-top: 5px !important;
	}

	
	td:nth-of-type(6):before{
		content: attr(data-content);
	}

    td:nth-of-type(7):before {
		content: attr(data-content); 
	}
     td:nth-of-type(7){
		place-content: right !important;
	}

    td:nth-of-type(8):before {
		content: attr(data-content);
	}
    td:nth-of-type(8){
        padding-bottom: 10px !important;
        border-radius: 40px 40px;
    }

    td:nth-of-type(9){
		display: inline-block;
        position:absolute;
        top: 106px;
        right:0;
		width: auto;
		padding-left: 0% !important;
	}

    td:nth-of-type(9):before {
		display: none;
	}
}
</style>
