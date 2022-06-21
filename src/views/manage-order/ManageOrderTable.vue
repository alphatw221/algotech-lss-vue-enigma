<template>
                <table id="orderTable" class="table table-report mt-3 text-lg">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap" v-for="column in columns" :key="column.key">
                                {{ column.name }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order, key) in store[tableStatus]" :key="key" class="intro-x">
                            <td v-for="column in columns" :key="column.key">
                                <template v-if="column.key === 'platform'">
                                    <div class="flex items-left">
                                        <div v-if="order[column.key] === 'facebook'"
                                            class="w-10 h-10 image-fit">
                                            <div class="w-10 h-10 image-fit">
                                                <img src='/src/assets/images/lss-img/facebook.png' >
                                            </div>
                                        </div>
                                        <div v-else-if="order[column.key] === 'instagram'"
                                            class="w-10 h-10 image-fit">
                                            <div class="w-10 h-10 image-fit">
                                                <img src='/src/assets/images/lss-img/instagram.png' />
                                            </div>
                                        </div>
                                        <div v-else-if="order[column.key] === 'youtube'"
                                            class="w-10 h-10 image-fit">
                                            <div class="w-10 h-10 image-fit">
                                                <img src='/src/assets/images/lss-img/youtube.png' />
                                            </div>
                                        </div>
                                        <div v-else class="w-10 h-10 image-fit">
                                            <img src='/src/assets/images/lss-img/noname.png' />
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="column.key === 'view'">
                                    <div class="flex place-content-center">
                                        <div class="w-10 h-10 image-fit">
                                            <EyeIcon @click="to_order_detail(order.id,order.type)"/>
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="column.key === 'delivery'">
                                    <div class="flex place-content-center">
                                        <div class="w-10 h-10 image-fit">
                                            <TruckIcon/>
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="column.key === 'name'">
                                        <div class="flex flex-col items-left">
                                            <div class="w-10 h-10 image-fit zoom-in">
                                                <Tippy tag="img" class="rounded-full" 
                                                    :src="order.customer_img" 
                                                    :content="order.customer_name" 
                                                    />
                                            </div>
                                        </div>
                                </template>
                                <template v-else-if="column.key === 'order_product'">
                                    <div class="flex place-content-center">
                                        <div class="w-10 h-10 image-fit">
                                            <ChevronDownIcon @click="orderProductModal(order.id,order.type)"/>
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="column.key === 'subtotal'">
                                    ${{ (order.subtotal).toFixed(2) }}
                                </template>
                                <template v-else class="w-30">
                                    {{ order[column.key] }}
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                    <Page :total="dataCount" show-sizer @on-change="changePage" @on-page-size-change="changePageSize" />
                </div>
</template>
<script setup>
import { ref, provide, onMounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
const route = useRoute();
const router = useRouter();
const store = useManageOrderStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const columns = ref([
    { name: 'Order Number', key: 'id' },
    { name: 'Platform', key: 'platform' },
    { name: 'Customer', key: 'name' },
    { name: 'Amount', key: 'subtotal' },
    { name: 'Payment', key: 'payment_method' },
    { name: 'Status', key: 'status' },
    { name: 'View', key: 'view' },
    { name: 'Delivery Status', key: 'delivery' },
    { name: '', key: 'order_product'}
]);

let page = 1;
let page_size = 10;

const props = defineProps({
    tableStatus: String,
    dataCount: Number,
});

function to_order_detail(order_id,type){
    store.order_type = type
    router.push(`/seller/order/${order_id}?type=${type}`)
}
function changePage(page) {
    eventBus.emit('changePage',{'page':page})
    }
function changePageSize(pageSize) {
    eventBus.emit('changePageSize',{'page_size':page_size})
    }
function orderProductModal(id,type){
    eventBus.emit('getProductData',{'id':id,'type':type})
    store.orderProductModal = !store.orderProductModal
}
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
  z-index: 99;
  background-color: theme("colors.secondary");
}

.longMessage{
	overflow-wrap: break-word;
}	

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 768px) {

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
		border-bottom: 1px solid black;
	}

	td {
		border: none;
		position: relative;
		padding-left: 50% !important;
		text-align: left !important;
		box-shadow: none !important;
		padding-top: 10px !important;
	}

	.productName {
		padding-left: 15px;
	}

	td:before {
		position: absolute;
		left: 6px;
		width: 45%;
		padding-right: 10px;
		font-weight: bold;
		box-shadow: none !important;
		background-color: white !important;
		padding-top: 5px !important;
	}

	td:nth-of-type(1):before {
		content: "Order Number";
		/* color: #0e9893; */
	}

	td:nth-of-type(2):before {
		content: "Platform";
		overflow-wrap: break-word;
		/* color: #0e9893; */
	}

	td:nth-of-type(3):before {
		content: "Customer";
		overflow-wrap: break-word !important;
		/* color: #0e9893; */
	}

	td:nth-of-type(4):before {
		content: "Amount";
		/* color: #0e9893; */
	}

	td:nth-of-type(5):before {
		content: "Payment";
		/* color: #0e9893; */
	}
	
	td:nth-of-type(6):before{
		content: "Status";
	}
	td:nth-of-type(7){
		display: inline-block;
		width: 33%;
		padding-left: 0% !important;
		/* color: #0e9893; */
	}
    td:nth-of-type(8){
		display: inline-block;
		width: 33%;
		padding-left: 0% !important;
		/* color: #0e9893; */
	}
	td:nth-of-type(9){
		display: inline-block;
		width: 34%;
		padding-left: 0% !important;
		/* color: #0e9893; */
	}

	td:nth-of-type(7):before {
		display: none;
	}
	td:nth-of-type(8):before {
		display: none;
	}
    td:nth-of-type(9):before {
		display: none;
	}
}
</style>
