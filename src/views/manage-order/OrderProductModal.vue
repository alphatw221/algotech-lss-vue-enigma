<template>
    <Modal
    backdrop="static"
		size="modal-xl"
		:show="store.showOrderProductModal"
		@hidden="store.showOrderProductModal = false"
		:slideOver="true"
	>
        <ModalBody>
            <ModalHeader>
                    <h2 class="font-medium text-base">
                        {{$t('manage_order.product_modal.order_no')}} {{store.orderProductData.id}}
                        <span class="btn btn-rounded-pending cursor-auto h-8 ml-3">
                            {{$t(`manage_order.${store.orderProductData.status}`) }}
                        </span>
                    </h2>
                    <XIcon class="w-8 h-8 text-slate-400 ml-auto" @click="store.showOrderProductModal = false"/>
            </ModalHeader>
            <div class="w-full overflow-auto"> 
                <table id="orderTable" class="table table-report mt-3 text-[13px] sm:text-[16px]">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap text-center" v-for="column in columns" :key="column.key">
                                {{ $t(`manage_order.product_modal.${column.name}`) }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in store.orderProductData.products" :key="index" class="intro-x text-[13px] sm:text-[16px]">
                            <td class="imgtd flex justify-center">
                                <div class="w-14 sm:w-fit" v-if="product.image">
                                    <img
                                        class="rounded-lg w-10 h-10 sm:w-14 sm:h-14 zoom-in"
                                        :src="product.image"
                                    />
                                </div>
                                <div class="w-14 sm:w-fit flex" v-else>
                                    <img
                                        class="rounded-lg w-10 h-10 sm:w-14 sm:h-14 zoom-in"
                                        :src="`${staticDir}no_image.jpeg`"
                                    />
                                </div>
                            </td>
                            <td class="text-left" :data-content="$t('manage_order.product_modal.product')">
                                <span v-if="product.type == 'lucky_draw'" class="mr-1"> *{{$t('manage_order.product_modal.prize')}}* </span>
                                <span class="break-words whitespace-normal"> {{product.name}} </span>
                            </td>
                            <td class="text-center" :data-content="$t('manage_order.product_modal.qty')" >
                                <span > {{product.qty}} </span> 
                            </td>
                            <td class="text-center whitespace-nowrap" :data-content="$t('manage_order.product_modal.price')">
                            {{store.orderProductData.campaign.currency}}
                            {{(Math.floor(parseFloat(product.price) * (10 ** store.orderProductData.campaign.decimal_places)) / 10 ** store.orderProductData.campaign.decimal_places).toLocaleString('en-GB')}}
                            {{store.orderProductData.campaign.price_unit?$t(`global.price_unit.${store.orderProductData.campaign.price_unit}`):''}}
                            </td>
                            <td class="text-center whitespace-nowrap" :data-content="$t('manage_order.product_modal.sub_total')">
                            {{store.orderProductData.campaign.currency}}
                            {{(Math.floor(parseFloat(product.price)* product.qty * (10 ** store.orderProductData.campaign.decimal_places)) / 10 ** store.orderProductData.campaign.decimal_places).toLocaleString('en-GB')}}
                            {{store.orderProductData.campaign.price_unit?$t(`global.price_unit.${store.orderProductData.campaign.price_unit}`):''}}
                            </td>                        
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="grid grid-cols-12 gap-2 text-[16px]">
                <div class="box col-start-1 col-span-12 lg:col-start-9">
                    <div class="grid grid-cols-3 gap-2">
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('manage_order.product_modal.sub_total')}}</div>
                            <div class="lg:mr-0" v-if="store.orderProductData.campaign">
                                {{store.orderProductData.campaign.currency}} 
                                {{(Math.floor(parseFloat(store.orderProductData.subtotal) * (10 ** store.orderProductData.campaign.decimal_places)) / 10 ** store.orderProductData.campaign.decimal_places).toLocaleString('en-GB')}}
                                {{store.orderProductData.campaign.price_unit?$t(`global.price_unit.${store.orderProductData.campaign.price_unit}`):''}}
                            </div>
                        </div>
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('manage_order.product_modal.delivery_charge')}}</div>
                            <div class="lg:mr-0" v-if="store.orderProductData.campaign">
                                {{store.orderProductData.campaign.currency}} 
                                {{(Math.floor(parseFloat(store.orderProductData.shipping_cost) * (10 ** store.orderProductData.campaign.decimal_places)) / 10 ** store.orderProductData.campaign.decimal_places).toLocaleString('en-GB')}}
                                {{store.orderProductData.campaign.price_unit?$t(`global.price_unit.${store.orderProductData.campaign.price_unit}`):''}}
                            </div>
                        </div>
                        <div
                            v-if="store.orderProductData.discount" 
                            class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('manage_order.product_modal.discount')}} <span class="text-danger">{{store.orderProductData.applied_discount.code ? (store.orderProductData.applied_discount.code) : ''}}</span></div>
                            <div class="lg:mr-0" v-if="store.orderProductData.campaign">
                                {{store.orderProductData.campaign.currency}} 
                                {{(Math.floor((parseFloat(store.orderProductData.adjust_price) - parseFloat(store.orderProductData.discount)) * (10 ** store.orderProductData.campaign.decimal_places)) / 10 ** store.orderProductData.campaign.decimal_places).toLocaleString('en-GB')}}
                                {{store.orderProductData.campaign.price_unit?$t(`global.price_unit.${store.orderProductData.campaign.price_unit}`):''}}
                            </div>
                        </div>
                        <div v-if="store.orderProductData.tax" class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('order_detail.price_summary.tax')}}</div>
                            <div class="lg:mr-0"> 
                                {{store.orderProductData.campaign.currency}}
                                {{(Math.floor(parseFloat(store.orderProductData.tax) * (10 ** store.orderProductData.campaign.decimal_places)) / 10 ** store.orderProductData.campaign.decimal_places).toLocaleString('en-GB')}}
                                {{store.orderProductData.campaign.price_unit?$t(`global.price_unit.${store.orderProductData.campaign.price_unit}`):''}}
                            </div>
                        </div>
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('manage_order.product_modal.total')}}</div>
                            <div class="lg:mr-0" v-if="store.orderProductData.campaign">
                                {{store.orderProductData.campaign.currency}} 
                                {{(Math.floor(parseFloat(store.orderProductData.total) * (10 ** store.orderProductData.campaign.decimal_places)) / 10 ** store.orderProductData.campaign.decimal_places).toLocaleString('en-GB')}}
                                {{store.orderProductData.campaign.price_unit?$t(`global.price_unit.${store.orderProductData.campaign.price_unit}`):''}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalBody>
    </Modal>
</template>
<script setup>
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { seller_retrieve_pre_order } from "@/api_v2/pre_order";
import { seller_retrieve_order } from "@/api_v2/order";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
const route = useRoute();
const store = useManageOrderStore()
const layoutStore = useLSSSellerLayoutStore()
const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const columns = ref([
    { key: "image", name: "null",  },
	{ key: "product", name: "product",  },
	{ key: "qty", name: "qty",  },
	{ key: "price", name: "price",  },
	{ key: "subtotal", name: "sub_total",  },
]);

onMounted(()=>{
    eventBus.on("getSlideOverOrderData", (payload) => {
        getOrderData(payload.id)
        console.log('event bus')
	})
})

onUnmounted(()=>{
    eventBus.off("getSlideOverOrderData")
})

function getOrderData(id){
    seller_retrieve_order(id, layoutStore.alert)
    .then(
        res => { store.orderProductData = res.data
            console.log('getOrderData')
        }
        
    )
    
}

</script>

<style scoped>
.click-icon:hover {
	cursor: pointer;
}

td {
  border-collapse: collapse;
  padding-right: 5px; 
  padding-left: 5px; 
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  padding-right: 5px; 
  padding-left: 5px; 
  background-color: theme("colors.secondary");
}

.longMessage{
	overflow-wrap: break-word;
}	

/* @media only screen and (max-width: 760px),
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
		height: auto !important;
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
		text-align: right !important;
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
		padding-top: 0px !important;
	}

	td:nth-of-type(1):before {
		content: "";
	}

	td:nth-of-type(2):before {
		content: attr(data-content);
		overflow-wrap: break-word;
        text-align: left;
	}

	td:nth-of-type(3):before {
		content: attr(data-content);
		overflow-wrap: break-word !important;
        text-align: left;
	}

	td:nth-of-type(4):before {
		content: attr(data-content);
        text-align: left;
	}

	td:nth-of-type(5):before {
		content: attr(data-content);
        text-align: left;
	}
} */
</style>
