<template>
    <div class="mt-3 w-full overflow-auto h-fit sm:h-[50vh]"> 
        <table id="orderTable" class="table -mt-3 text-[13px] table-report">
            <thead>
                <tr>
                    <th class="whitespace-nowrap" v-for="column in columns" :key="column.key">
                        {{ $t(`manage_order.table.`+column.name) }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, key) in store[tableStatus]" :key="key" class="intro-x">
                    <td v-for="column in columns" :key="column.key" :data-content="$t(`manage_order.table.`+column.name)">
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
                                        <img class="rounded-full" :src="'/src/assets/images/lss-img/noname.png'"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="bg-cover rounded-full" src='/src/assets/images/lss-img/facebook.png' >
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
                                        <img class="rounded-full" :src="'/src/assets/images/lss-img/noname.png'"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="rounded-full bg-cover bg-[#f70000]" src='/src/assets/images/lss-img/instagram.png' >
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="order[column.key] === 'youtube'"
                                    class="w-fit h-fit image-fit">
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-if="order.customer_img">
                                        <img class="rounded-full" :src="order.customer_img"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="bg-cover rounded-full" src='/src/assets/images/lss-img/youtube.png' >
                                        </div>
                                    </div>
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-else>
                                        <img class="rounded-full" :src="'/src/assets/images/lss-img/noname.png'"/>
                                        <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                            <img class="bg-cover rounded-full" src='/src/assets/images/lss-img/youtube.png' >
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="w-fit h-fit image-fit">
                                    <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit">
                                        <img class="rounded-full" :src="'/src/assets/images/lss-img/noname.png'"/>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else-if="column.key === 'view'">
                            <div class="flex flex-col sm:flex-row place-content-center">
                                <a class="flex sm:mr-auto image-fit">
                                    <span class="text-[13px] mr-3 sm:hidden"> Order Details  </span>
                                    <EyeIcon @click="to_order_detail(order.id,order.type)"/>
                                </a>
                                
                                <a class="flex image-fit">
                                    <span class="text-[13px] mr-1 sm:hidden"> Copy Cart Link </span>
                                    <Share2Icon class="block sm:mx-auto"  @click="copyURL(order.id,order.type)" />
                                </a>
                            </div>
                        </template>
                        <template v-else-if="column.key === 'delivery'">
                            <div class="flex place-content-center">
                                <a class=" w-fit h-fit image-fit" v-show="order.status === 'complete' && order.shipping_method === 'delivery'" @click="shipping_out(order.id,key)">
                                    <TruckIcon />
                                </a>
                                <a class="w-10 h-10 image-fit" v-show="order.status === 'shipping out'">
                                    <TruckIcon style="color:#BABABA" class="cursor-not-allowed"/>
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
                                <a class="text-black w-fit h-fit image-fit">
                                    <ChevronRightIcon @click="orderProductModal(order.id,order.type)"/>
                                </a>
                            </div>
                        </template>
                        <template v-else-if="column.key === 'subtotal'">
                            ${{ (order.total).toFixed(layoutStore.userInfo.user_subscription.decimal_places) }}
                        </template>
                        <template v-else-if="column.key === 'payment_method'">
                            {{ order[column.key] == 'Direct Payment' ? `Direct Payment - ${order.meta.account_mode}` : order[column.key] }}
                        </template>
                        <template v-else-if="column.key === 'id'">
                            <span class="sm:hidden"> #</span> {{ order.id }}
                        </template>
                        <template v-else class="w-30"> 
                            {{ $t(`manage_order.${order[column.key]}`) }}
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="flex flex-wrap items-center intro-y sm:flex-row sm:flex-nowrap">
        <Page class="mx-auto my-3" :total="store.data_count[tableStatus]" @on-change="changePage" @on-page-size-change="changePageSize" />
    </div>
</template>
<script setup>
import { manage_order_list, seller_shipping_out, get_order_oid } from "@/api_v2/order"
import { get_pre_order_oid } from "@/api_v2/pre_order"
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
const route = useRoute();
const router = useRouter();
const store = useManageOrderStore()
const internalInstance = getCurrentInstance()
const layoutStore = useLSSSellerLayoutStore()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const baseURL = import.meta.env.VITE_APP_ROOT_API
const columns = ref([
    { name: 'order_number', key: 'id' },
    { name: 'null', key: 'platform' },
    { name: 'customer', key: 'customer_name' },
    { name: 'amount', key: 'subtotal' },
    { name: 'payment', key: 'payment_method' },
    { name: 'status', key: 'status' },
    { name: 'delivery_notification', key: 'delivery' },
    { name: 'action', key: 'view' },
    { name: 'null', key: 'order_product'}
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
  z-index: 50 !important;
  
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
        padding-top: 125px !important;
        background: white;
	}

	td {
		border: none;
		position: relative;
		padding-left: 50% !important;
        padding-right: 10px !important;
		text-align: right !important;
		box-shadow: none !important;
        min-height: 30px !important;
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
        min-height: 28px !important;
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
		border-top: 1px solid #E2E2E2;
        padding-top: 5px !important;
        z-index: 1;
	}

	td:nth-of-type(5):before {
		content: attr(data-content);
	}
	
	td:nth-of-type(6):before{
		content: attr(data-content);
	}

    td:nth-of-type(7):before {
		content: attr(data-content); 
	}
     td:nth-of-type(7){
		place-content: right !important;
        min-height: 28px !important;
	}

    td:nth-of-type(8):before {
		content: attr(data-content);
	}
    td:nth-of-type(8){
        padding-bottom: 10px !important;
    }

    td:nth-of-type(9){
		display: inline-block;
        position:absolute;
        top: 122px;
        right:0;
		width: auto;
		padding-left: 0% !important;
	}

    td:nth-of-type(9):before {
		display: none;
	}
}
</style>
