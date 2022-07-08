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
                                <div class="w-12 h-12 flex-none image-fit mr-1" v-if="order.customer_img">
                                    <img class="rounded-full" :src="order.customer_img"/>
                                    <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                        <img class="rounded-full bg-cover" src='/src/assets/images/lss-img/facebook.png' >
                                    </div>
                                </div>
                                <div class="w-12 h-12 flex-none image-fit mr-1" v-else>
                                    <img class="rounded-full" :src="'/src/assets/images/lss-img/noname.png'"/>
                                    <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                        <img class="rounded-full bg-cover" src='/src/assets/images/lss-img/facebook.png' >
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="order[column.key] === 'instagram'"
                                class="w-10 h-10 image-fit">
                                <div class="w-12 h-12 flex-none image-fit mr-1" v-if="order.customer_img">
                                    <img class="rounded-full" :src="order.customer_img"/>
                                    <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                        <img class="rounded-full bg-cover" src='/src/assets/images/lss-img/instagram.png' >
                                    </div>
                                </div>
                                <div class="w-12 h-12 flex-none image-fit mr-1" v-else>
                                    <img class="rounded-full" :src="'/src/assets/images/lss-img/noname.png'"/>
                                    <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                        <img class="rounded-full bg-cover" src='/src/assets/images/lss-img/instagram.png' >
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="order[column.key] === 'youtube'"
                                class="w-10 h-10 image-fit">
                                <div class="w-12 h-12 flex-none image-fit mr-1" v-if="order.customer_img">
                                    <img class="rounded-full" :src="order.customer_img"/>
                                    <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                        <img class="rounded-full bg-cover" src='/src/assets/images/lss-img/youtube.png' >
                                    </div>
                                </div>
                                <div class="w-12 h-12 flex-none image-fit mr-1" v-else>
                                    <img class="rounded-full" :src="'/src/assets/images/lss-img/noname.png'"/>
                                    <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                        <img class="rounded-full bg-cover" src='/src/assets/images/lss-img/youtube.png' >
                                    </div>
                                </div>
                            </div>
                            <div v-else class="w-10 h-10 image-fit">
                                <div class="w-12 h-12 flex-none image-fit mr-1">
                                    <img class="rounded-full" :src="'/src/assets/images/lss-img/noname.png'"/>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'view'">
                        <div class="flex place-content-center">
                            <a class="text-black w-10 h-10 image-fit">
                                <EyeIcon @click="to_order_detail(order.id,order.type)"/>
                            </a>
                            
                            <a class="w-10 h-10 image-fit">
                                <Share2Icon class="block mx-auto text-black"  @click="copyURL(order.id,order.type)" />
                            </a>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'delivery'">
                        <div class="flex place-content-center">
                            <a class="w-10 h-10 image-fit text-black" v-show="order.status === 'complete' && order.shipping_method === 'delivery'" @click="shipping_out(order.id,key)">
                                <TruckIcon />
                            </a>
                            <a class="w-10 h-10 image-fit" v-show="order.status === 'shipping out'">
                                <TruckIcon style="color:#BABABA"/>
                            </a>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'customer_name'">
                        <template v-if="order.customer_name">
                            {{order.customer_name}}
                        </template>
                        <template v-else>
                            Guest
                        </template>        
                    </template>
                    <template v-else-if="column.key === 'order_product'">
                        <div class="flex place-content-center">
                            <a class="w-10 h-10 image-fit text-black">
                                <ChevronDownIcon @click="orderProductModal(order.id,order.type)"/>
                            </a>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'subtotal'">
                        ${{ (order.subtotal).toFixed(2) }}
                    </template>
                    <template v-else-if="column.key === 'payment_method'">
                        {{ order[column.key] == 'Direct Payment' ? `Direct Payment - ${order.meta.account_mode}` : order[column.key] }}
                    </template>
                    <template v-else class="w-30">
                        {{ order[column.key] }}
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
        <Page class="mx-auto my-3" :total="store.data_count[tableStatus]" @on-change="changePage" @on-page-size-change="changePageSize" />
    </div>
</template>
<script setup>
import { manage_order_list, seller_shipping_out, get_order_oid } from "@/api_v2/order"
import { get_pre_order_oid } from "@/api_v2/pre_order"
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
const route = useRoute();
const router = useRouter();
const store = useManageOrderStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const baseURL = import.meta.env.VITE_APP_ROOT_API
const columns = ref([
    { name: 'Order#', key: 'id' },
    { name: '', key: 'platform' },
    { name: 'Customer', key: 'customer_name' },
    { name: 'Amount', key: 'subtotal' },
    { name: 'Payment', key: 'payment_method' },
    { name: 'Status', key: 'status' },
    { name: 'Delivery Status', key: 'delivery' },
    { name: 'Action', key: 'view' },
    { name: '', key: 'order_product'}
]);

let page = 1;
let page_size = 10;


const props = defineProps({
    tableStatus: String,
    tableSearch: String,
    tableFilter:String,
});

onMounted(()=>{
    search('','',props.tableStatus)
    eventBus.on(props.tableSearch, (payload) => {
        search(payload.keyword,payload.filter_data,props.tableStatus)
	})
})

onUnmounted(()=>{
    eventBus.off(props.tableSearch)
})

function search(searchValue,data,tableStatus){
    manage_order_list(route.params.campaign_id,searchValue,page,page_size,tableStatus,data).then(
        res => {
			store[tableStatus] = res.data.data
            console.log( res.data)
            store.data_count[tableStatus] = res.data.count;
            if (res.data.count != 0) {
                let totalPage = parseInt(res.data.count / page_size);
                totalPage = totalPage == 0 ? 1 : totalPage;
            }
		}
    )
}

function to_order_detail(order_id,type){
    store.order_type = type
    router.push({name:'sellerOrder',params:{'order_id':order_id},query:{'type':type}})
}
function changePage(p) {
    page = p
    search('','',props.tableStatus)
    }
function changePageSize(p) {
    page_size = p
    search('','',props.tableStatus)
    }
function orderProductModal(id,type){
    eventBus.emit('getProductData',{'id':id,'type':type})
    store.orderProductModal = !store.orderProductModal
}
function shipping_out(order_id,index){
    seller_shipping_out(order_id).then(
        res=>{
            console.log(res)
            store[props.tableStatus][index].status = 'shipping out'
            console.log(store[props.tableStatus][index].status)
        }
    
    )
}
function copyURL(order_id,type){
    if(type === 'order'){
        get_order_oid(order_id).then(
            res =>{
            text = `${baseURL}/buyer/order/${res.data}`;
            navigator.clipboard.writeText(text).then(()=>{
                alert('copied!')
            })
        }
        )
    }else{ 
        get_pre_order_oid(order_id).then(
            res =>{
            text = `${baseURL}/buyer/cart/${res.data}`;
            navigator.clipboard.writeText(text).then(()=>{
                alert('copied!')
            })
        })
        }
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
