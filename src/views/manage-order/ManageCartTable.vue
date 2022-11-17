<template>
    <div class="mt-3 w-full overflow-auto max-h-[88%]" > 
        <table id="orderTable" class="table -mt-3 text-[13px] sm:text-[16px] table-report">
            <thead>
                <tr>
                    <th class="whitespace-nowrap text-center" v-for="column in columns" :key="column.key">
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
                <template v-for="(cart, key, index) in manageOrderStore.cartsDict" :key="index">
                    <template v-for="(qty, campaign_product_id, index) in cart.products" :key="index">
                        <template v-if="searchKeyword(cart, campaignDetailStore.campaignProductDict[campaign_product_id])">
                            <tr class="text-center relative">
                                <td :data-content="$t(`manage_order.table.id`)">
                                    <span class="sm:hidden"> #</span> {{ cart.id }}
                                </td>
                                <td :data-content="$t(`manage_order.table.platform`)">
                                    <div class="flex justify-center">
                                        <div v-if="cart.platform === 'facebook'"
                                            class="w-fit h-fit image-fit">
                                            <div class="flex-none w-20 h-20 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-if="cart.customer_img">
                                                <img class="rounded-full" :src="cart.customer_img"/>
                                                <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                                    <img class="rounded-full bg-cover bg-[#3c599b]" src='/src/assets/images/lss-img/facebook.png' >
                                                </div>
                                            </div>
                                            <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-else>
                                                <img class="rounded-full" :src="unbound"/>
                                                <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                                    <img class="bg-cover rounded-full" src='/src/assets/images/lss-img/facebook.png' >
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else-if="cart.platform === 'instagram'"
                                            class="w-fit h-fit image-fit">
                                            <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-if="cart.customer_img">
                                                <img class="rounded-full" :src="cart.customer_img"/>
                                                <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                                    <img class="rounded-full bg-cover bg-[#d63376]" src='/src/assets/images/lss-img/instagram.png' >
                                                </div>
                                            </div>
                                            <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-else>
                                                <img class="rounded-full" :src="unbound"/>
                                                <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                                    <img class="rounded-full bg-cover bg-[#f70000]" src='/src/assets/images/lss-img/instagram.png' />
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else-if="cart.platform === 'youtube'"
                                            class="w-fit h-fit image-fit">
                                            <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-if="cart.customer_img">
                                                <img class="rounded-full" :src="cart.customer_img"/>
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
                                        <div v-else-if="cart.platform === 'twitch'"
                                            class="w-fit h-fit image-fit">
                                            <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-if="cart.customer_img">
                                                <img class="rounded-full" :src="cart.customer_img"/>
                                                <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                                    <img class="bg-cover rounded-full bg-[#f70000]" src='/src/assets/images/lss-img/youtube.png' >
                                                </div>
                                            </div>
                                            <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-else>
                                                <img class="rounded-full" :src="unbound"/>
                                                <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                                    <img class="bg-cover rounded-full bg-[#f70000]" src='/src/assets/images/lss-img/twitch.png' >
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else-if="cart.platform === 'tiktok'"
                                            class="w-fit h-fit image-fit">
                                            <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-if="cart.customer_img">
                                                <img class="rounded-full" :src="cart.customer_img"/>
                                                <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                                    <img class="bg-cover rounded-full bg-[#f70000]" src='/src/assets/images/lss-img/tiktok.png' >
                                                </div>
                                            </div>
                                            <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit" v-else>
                                                <img class="rounded-full" :src="unbound"/>
                                                <div class="absolute bottom-0 right-0 w-8 h-8 border-2 border-white rounded-full sm:w-5 sm:h-5 dark:border-darkmode-600">
                                                    <img class="bg-cover rounded-full bg-[#f70000]" src='/src/assets/images/lss-img/youtube.png' >
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else-if="!cart.platform && !cart.customer_img" class="w-fit h-fit image-fit">
                                            <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit">
                                                <img class="rounded-full" :src="unbound"/>
                                            </div>
                                        </div>
                                        <div v-else class="w-fit h-fit image-fit">
                                            <div class="flex-none w-20 h-20 mr-1 sm:mr-1 sm:w-12 sm:h-12 image-fit">
                                                <img class="rounded-full" :src="cart.customer_img"/>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td :data-content="$t(`manage_order.table.customer_name`)">
                                    <template v-if="cart.customer_name">
                                        {{cart.customer_name}}
                                    </template>
                                    <template v-else>
                                        {{ $t('manage_order.table.guest') }}
                                    </template>        
                                </td>
                                <td :data-content="$t(`manage_order.table.updated_at`)">
                                    {{ new Date(cart.updated_at).toLocaleTimeString('en-us', {month:"short", day:"numeric",hour: '2-digit', minute: '2-digit'}) }}
                                </td>
                                <!-- <td :data-content="$t(`manage_order.table.img`)">
                                    <img :src="campaignDetailStore.campaignProductDict[campaign_product_id]?.image" class="h-8 object-cover"/>
                                </td> -->
                                <td :data-content="$t(`manage_order.table.product_name`)">
                                    {{campaignDetailStore.campaignProductDict[campaign_product_id]?.name}}
                                </td>
                                <td :data-content="$t(`manage_order.table.order_code`)">
                                    <template v-if="campaignDetailStore.campaignProductDict[campaign_product_id]?.type === 'lucky_draw'">
                                        <span class="font-medium"> *{{$t('lucky_draw.winner_modal.prize')}}*</span>
                                    </template>
                                    <template v-else> 
                                        {{campaignDetailStore.campaignProductDict[campaign_product_id]?.order_code}}
                                    </template>
                                </td>
                                <td :data-content="$t(`manage_order.table.qty`)">
                                    {{qty}}
                                </td>
                                <td v-if="campaignDetailStore.campaign" :data-content="$t(`manage_order.table.subtotal`)">
                                    {{campaignDetailStore.campaign.currency}}
                                    {{(Math.floor(parseFloat(campaignDetailStore.campaignProductDict[campaign_product_id]?.price) * qty * (10 ** campaignDetailStore.campaign.decimal_places)) / 10 ** campaignDetailStore.campaign.decimal_places).toLocaleString('en-GB')}}
                                    {{campaignDetailStore.campaign.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign.price_unit}`):''}}
                                </td>
                                <td :data-content="$t(`manage_order.table.view`)">
                                    <div class="flex flex-col sm:flex-row place-content-center">
                                        <a class="flex image-fit sm:mr-3" @click="copyCartURL(cart)">
                                            <span class="text-[13px] sm:text-[16px] mr-1 sm:hidden"> {{$t('manage_order.table.copy_link')}} </span>
                                            <Tippy  :content="$t('tooltips.manage_order.link_icon')" :options="{ theme: 'light' }"> 
                                                <SimpleIcon icon="share" color="#2d8cf0" class="sm:mx-auto w-6 sm:w-auto" width="24" height="23" />
                                            </Tippy>
                                        </a>
                                        <a class="flex sm:ml-auto image-fit mt-2 sm:mt-0" @click="to_cart_detail(cart)">
                                            <span class="text-[13px] sm:text-[16px] mr-3 sm:hidden min-h-[4vh]"> {{$t('manage_order.table.details')}}  </span>
                                            <Tippy  :content="$t('tooltips.manage_order.view_icon')" :options="{ theme: 'light' }"> 
                                                <SimpleIcon icon="order_details" color="#2d8cf0" class="sm:mx-auto w-6 sm:w-auto" width="26" height="24" />
                                            </Tippy>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
    <!-- <div class="flex flex-wrap items-center intro-y sm:flex-row sm:flex-nowrap h-fit mb-auto">
        <Page class="mx-auto my-3" 
            show-sizer :page-size-opts="[10,20,50,100]" 
            :total="manageOrderStore.data_count.carts" 
            :page-size="page_size" 
            @on-change="changePage"
            @on-page-size-change="changePageSize"/>
    </div> -->
</template>
<script setup>
// import { seller_search_order, seller_shipping_out, get_order_oid } from "@/api_v2/order"
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { get_cart_oid, seller_search_cart, seller_list_cart } from "@/api_v2/cart"
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useManageOrderStore } from "@/stores/lss-manage-order";
// import { get_pre_order_oid } from "@/api_v2/pre_order"
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useCookies } from "vue3-cookies";
import unbound from '/src/assets/images/lss-img/noname.png';

const route = useRoute();
const router = useRouter();
const { cookies } = useCookies();
const campaignDetailStore = useCampaignDetailStore();
const manageOrderStore = useManageOrderStore();
const layoutStore = useLSSSellerLayoutStore()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const baseURL = import.meta.env.VITE_APP_ROOT_API
const ready = ref(false)

const columns = ref([
    { name: 'order_number', key: 'id', sortable: true},
    { name: 'platform', key: 'platform', sortable: false},
    { name: 'customer', key: 'customer_name', sortable: true},
    { name: 'updated_at', key: 'updated_at', sortable: true},
    // { name: "product_img", key: "img" },
    { name: "product_name", key: "name" , sortable: false},
    { name: "order_code", key: "order_code" },
    { name: "qty", key: "qty" },
    { name: 'subtotal', key: 'subtotal', sortable: false},
    { name: 'action', key: 'view', sortable: false},
]);

const page = ref(1);
const page_size = ref(50);
const sortBy = ref({})
const searchString = ref('')
const filterData = ref({})
let webSocket = null

onMounted(()=>{
    initWebSocketConnection()
    search()
    eventBus.on('keywordforCart',payload =>{
        searchString.value = payload
    })
})

onUnmounted(()=>{
    eventBus.off('keywordforCart')
    webSocket.close(1000)
})

const search = () => {
    manageOrderStore.cartsDict = {}
    filterData.value['sort_by'] = sortBy.value

    seller_list_cart(route.params.campaign_id, searchString.value ,filterData.value,layoutStore.alert).then(res=>{
        res.data.forEach(cart => {
                manageOrderStore.cartsDict[cart.id]=cart
            });
            manageOrderStore.carts = res.data  //delete if no longer needed
            manageOrderStore.data_count.carts = res.data.count
    })
    // seller_search_cart(_campaign_id=route.params.campaign_id, _search_value=searchString.value, _page=page.value, _page_size=page_size.value, _toastify=layoutStore.alert).then(
    //     res => {
    //         res.data.results.forEach(cart => {
    //             if(cart.id in manageOrderStore.cartsDict === false) manageOrderStore.cartsDict[cart.id]=cart
    //         });
    //         manageOrderStore.carts = res.data.results  //delete if no longer needed
    //         manageOrderStore.data_count.carts = res.data.count
    //     }
    // )
}

const searchKeyword = (cart, product)=>{
    
    if(['', null, undefined].includes(searchString.value)) return true
    
    var _searchString =  searchString.value.toLowerCase()

    if(
        cart?.customer_name.toLowerCase().match(_searchString)||
        cart?.id.toString().match(_searchString)
    )return true

    if(
        product?.name.toLowerCase().match(_searchString)||
        product?.order_code.toLowerCase().match(_searchString)
    )return true

    return false
    
}

const to_cart_detail = (cart) => {
    router.push({name:'seller-cart-detail',params:{'cart_id':cart.id, 'campaign_id':route.params.campaign_id}})
}

const copyCartURL = (cart) => {
    get_cart_oid(cart.id, layoutStore.alert).then(
        res =>{
        text = `${baseURL}/buyer/cart/${res.data}`;
        navigator.clipboard.writeText(text).then(()=>{
            layoutStore.notification.showMessageToast('copied!')
        })
    }
    )
}

// Pagination
const changePage = (p) => {
    page.value = p
    search()
    }
const changePageSize = (p) => {
    page_size.value = p
    search()
    }

// Header Sorting
const sortByThis = (field, value) =>{
    sortBy.value[field] = value
	search();
}
const cancelSortBy = (field) => {
    delete sortBy.value[field]
	search();
}


const initWebSocketConnection=()=>{
    // console.log('ManageOrder')
    webSocket = new WebSocket(
        `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/campaign/${route.params.campaign_id}/?token=${cookies.get('access_token')}`
    );
    webSocket.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log(message)
        handleSocketMessage(message)
    };
    webSocket.onopen = e => {
        console.log('connected')
    };
    webSocket.onclose = e => {
        if(e.code!=1000){
            initWebSocketConnection()
        }
        console.error('Chat socket closed unexpectedly');
        
    };
    webSocket.onerror = err => {
        console.error(err)
        webSocket.close(1000);
    };
}

const handleSocketMessage = message=>{
    if (message.type == 'cart_data'){
        const cart_data = message.data
        manageOrderStore.cartsDict[cart_data.id]=cart_data
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

    td:nth-of-type(9):before {
		content: attr(data-content);
	}
    
    td:nth-of-type(9){
        padding-bottom: 10px !important;
        border-radius: 40px !important;
    }
}
</style>
