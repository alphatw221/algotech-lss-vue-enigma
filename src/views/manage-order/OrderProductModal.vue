<template>
    <Modal
    backdrop="static"
		size="modal-xl"
		:show="manageOrderStore.showOrderProductModal"
		@hidden="manageOrderStore.showOrderProductModal = false; clearOrderData();"
		:slideOver="true"
	>
        <ModalBody>
            <ModalHeader>
                    <h2 class="font-medium text-base">
                        {{$t('manage_order.product_modal.order_no')}} {{manageOrderStore.order.id}}
                        <span class="btn btn-rounded-pending cursor-auto h-8 ml-3">
                            {{$t(`manage_order.${manageOrderStore.order.status}`) }}
                        </span>
                    </h2>
                    <XIcon class="w-8 h-8 text-slate-400 ml-auto" @click="manageOrderStore.showOrderProductModal = false"/>
            </ModalHeader>
            <div class="w-full overflow-auto"> 



                <!-- ORDER_PRODUCT_TABLE -->
                <table id="orderTable" class="table table-report mt-3 text-[13px] sm:text-[16px]">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap text-center" v-for="column in columns" :key="column.key">
                                {{ $t(`manage_order.product_modal.${column.name}`) }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order_product, index) in manageOrderStore.order.order_products" :key="index" class="intro-x text-[13px] sm:text-[16px]">
                            <td class="imgtd flex justify-center">
                                <div class="w-14 sm:w-fit" v-if="order_product.image">
                                    <img
                                        class="rounded-lg w-10 h-10 sm:w-14 sm:h-14 zoom-in"
                                        :src="order_product.image"
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
                                <span v-if="order_product.type == 'lucky_draw'" class="mr-1"> *{{$t('manage_order.product_modal.prize')}}* </span>
                                <span class="break-words whitespace-normal"> {{order_product.name}} </span>
                            </td>
                            <td class="text-center" :data-content="$t('manage_order.product_modal.qty')" >
                                <span > {{order_product.qty}} </span> 
                            </td>
                            <td class="text-center whitespace-nowrap" :data-content="$t('manage_order.product_modal.price')">
                            {{manageOrderStore.order?.campaign?.currency}}
                            {{(Math.floor(parseFloat(order_product.price) * (10 ** manageOrderStore.order?.campaign?.decimal_places)) / 10 ** manageOrderStore.order?.campaign?.decimal_places).toLocaleString('en-GB')}}
                            {{manageOrderStore.order?.campaign?.price_unit?$t(`global.price_unit.${manageOrderStore.order?.campaign?.price_unit}`):''}}
                            </td>
                            <td class="text-center whitespace-nowrap" :data-content="$t('manage_order.product_modal.sub_total')">
                            {{manageOrderStore.order?.campaign?.currency}}
                            {{(Math.floor(order_product.subtotal * (10 ** manageOrderStore.order?.campaign?.decimal_places)) / 10 ** manageOrderStore.order?.campaign?.decimal_places).toLocaleString('en-GB')}}
                            {{manageOrderStore.order?.campaign?.price_unit?$t(`global.price_unit.${manageOrderStore.order?.campaign?.price_unit}`):''}}
                            </td>                        
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- ORDER_SUMMARY_CARD -->
            <div class="grid grid-cols-12 gap-2 text-[16px]">
                <div class="box col-start-1 col-span-12 lg:col-start-9">
                    <div class="grid grid-cols-3 gap-2">


                        <!-- SUBTOTAL -->
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('manage_order.product_modal.sub_total')}}</div>
                            <div class="lg:mr-0" v-if="manageOrderStore.order?.campaign">
                                {{manageOrderStore.order?.campaign?.currency}} 
                                {{(Math.floor(parseFloat(manageOrderStore.order.subtotal) * (10 ** manageOrderStore.order?.campaign?.decimal_places)) / 10 ** manageOrderStore.order?.campaign?.decimal_places).toLocaleString('en-GB')}}
                                {{manageOrderStore.order?.campaign?.price_unit?$t(`global.price_unit.${manageOrderStore.order?.campaign?.price_unit}`):''}}
                            </div>
                        </div>

                        <!-- DISCOUNT -->
                        <div
                            v-if="manageOrderStore.order.discount" 
                            class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('manage_order.product_modal.discount')}} <span class="text-danger">{{manageOrderStore.order.applied_discount.code ? (manageOrderStore.order.applied_discount.code) : ''}}</span></div>
                            <div class="lg:mr-0" v-if="manageOrderStore.order?.campaign">
                                {{manageOrderStore.order?.campaign?.currency}} 
                                {{(Math.floor((parseFloat(manageOrderStore.order.discount)) * (10 ** manageOrderStore.order?.campaign?.decimal_places)) / 10 ** manageOrderStore.order?.campaign?.decimal_places).toLocaleString('en-GB')}}
                                {{manageOrderStore.order?.campaign?.price_unit?$t(`global.price_unit.${manageOrderStore.order?.campaign?.price_unit}`):''}}
                            </div>
                        </div>

                        <!-- SUBTOTAL_AFTER_DISCOUNT -->
                        <div
                            v-if="manageOrderStore.order.discount" 
                            class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('cart.subtotal_after_discount')}}</div>
                            <div class="lg:mr-0" v-if="manageOrderStore.order?.campaign">
                                {{manageOrderStore.order?.campaign?.currency}} 
                                {{ (Math.floor(parseFloat(Math.max(manageOrderStore.order.subtotal-manageOrderStore.order.discount,0)) * (10 ** manageOrderStore.order?.campaign?.decimal_places)) / 10 ** manageOrderStore.order?.campaign?.decimal_places).toLocaleString('en-GB')}}
                                {{manageOrderStore.order?.campaign?.price_unit?$t(`global.price_unit.${manageOrderStore.order?.campaign?.price_unit}`):''}}
                            </div>
                        </div>

                        <!-- SHIPPING_COST -->
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('manage_order.product_modal.delivery_charge')}}</div>
                            <template class="lg:mr-0" v-if="manageOrderStore.order?.campaign">
                                <div v-if="manageOrderStore.order.free_delivery || manageOrderStore.order?.meta?.subtotal_over_free_delivery_threshold || manageOrderStore.order?.meta?.items_over_free_delivery_threshold">
                                    {{manageOrderStore.order?.campaign?.currency}} 
                                    {{(Math.floor(0 * (10 ** manageOrderStore.order?.campaign?.decimal_places)) / 10 ** manageOrderStore.order?.campaign?.decimal_places).toLocaleString('en-GB')}}
                                    {{manageOrderStore.order?.campaign?.price_unit?$t(`global.price_unit.${manageOrderStore.order?.campaign?.price_unit}`):''}}
                                </div>

                                <div v-else>
                                    {{manageOrderStore.order?.campaign?.currency}} 
                                    {{(Math.floor(parseFloat(manageOrderStore.order.shipping_cost) * (10 ** manageOrderStore.order?.campaign?.decimal_places)) / 10 ** manageOrderStore.order?.campaign?.decimal_places).toLocaleString('en-GB')}}
                                    {{manageOrderStore.order?.campaign?.price_unit?$t(`global.price_unit.${manageOrderStore.order?.campaign?.price_unit}`):''}}
                                </div>
                            </template>
                        </div>
                        
                        <!-- ADJUST_PRICE -->
                        <div class="flex col-start-1 col-span-3 p-2" v-if="manageOrderStore.order.adjust_price">
                            <div class="mr-auto font-bold">{{manageOrderStore.order.adjust_title}}</div>
                            <div class="lg:mr-0" v-if="manageOrderStore.order?.campaign">
                                {{manageOrderStore.order?.campaign?.currency}} 
                                {{(Math.floor(parseFloat(manageOrderStore.order.adjust_price) * (10 ** manageOrderStore.order?.campaign?.decimal_places)) / 10 ** manageOrderStore.order?.campaign?.decimal_places).toLocaleString('en-GB')}}
                                {{manageOrderStore.order?.campaign?.price_unit?$t(`global.price_unit.${manageOrderStore.order?.campaign?.price_unit}`):''}}
                            </div>
                        </div>

                        

                        <!-- TAX -->
                        <div v-if="manageOrderStore.order.tax" class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('order_detail.price_summary.tax')}}</div>
                            <div class="lg:mr-0"> 
                                {{manageOrderStore.order?.campaign?.currency}}
                                {{(Math.floor(parseFloat(manageOrderStore.order.tax) * (10 ** manageOrderStore.order?.campaign?.decimal_places)) / 10 ** manageOrderStore.order?.campaign?.decimal_places).toLocaleString('en-GB')}}
                                {{manageOrderStore.order?.campaign?.price_unit?$t(`global.price_unit.${manageOrderStore.order?.campaign?.price_unit}`):''}}
                            </div>
                        </div>

                        <!-- TOTAL -->
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('manage_order.product_modal.total')}}</div>
                            <div class="lg:mr-0" v-if="manageOrderStore.order?.campaign">
                                {{manageOrderStore.order?.campaign?.currency}} 
                                {{(Math.floor(parseFloat(manageOrderStore.order.total) * (10 ** manageOrderStore.order?.campaign?.decimal_places)) / 10 ** manageOrderStore.order?.campaign?.decimal_places).toLocaleString('en-GB')}}
                                {{manageOrderStore.order?.campaign?.price_unit?$t(`global.price_unit.${manageOrderStore.order?.campaign?.price_unit}`):''}}
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
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail"

const campaignDetailStore = useCampaignDetailStore();
const route = useRoute();
const manageOrderStore = useManageOrderStore()
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
	})
})

onUnmounted(()=>{
    eventBus.off("getSlideOverOrderData")
})

const getOrderData = id => {
    seller_retrieve_order(id, layoutStore.alert)
    .then(
        res => { manageOrderStore.order = res.data}
    )
    
}

const clearOrderData = ()=>{
    manageOrderStore.order = {}
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
