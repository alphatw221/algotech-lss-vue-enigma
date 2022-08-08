<template>
    <Modal
		size="modal-xl"
		:show="store.orderProductModal"
		@hidden="store.orderProductModal = false"
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
                    <XIcon class="w-8 h-8 text-slate-400 ml-auto" @click="store.orderProductModal = false"/>
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
                                    <Tippy
                                        tag="img"
                                        class="rounded-lg w-10 h-10 sm:w-14 sm:h-14 zoom-in"
                                        :src="storageUrl + product.image"
                                        :content="product.name"
                                    />
                                </div>
                                <div class="w-14 sm:w-fit flex" v-else>
                                    <Tippy
                                        tag="img"
                                        class="rounded-lg w-10 h-10 sm:w-14 sm:h-14 zoom-in"
                                        :src="storageUrl + 'no_image.jpeg'"
                                        :content="product.name"
                                    />
                                </div>
                            </td>
                            <td class="text-left" :data-content="$t('manage_order.product_modal.product')">
                                <span class="break-words whitespace-normal"> {{product.name}} </span>
                            </td>
                            <td class="text-right w-fit" :data-content="$t('manage_order.product_modal.qty')" >
                                <span class="w-fit"> {{product.qty}} </span> 
                            </td>
                            <td class="text-right whitespace-nowrap" :data-content="$t('manage_order.product_modal.price')">
                            {{store.orderProductData.campaign.currency}}
                            {{store.orderProductData.campaign.decimal_places=='0'?Math.trunc(parseFloat(product.price)):parseFloat(product.price).toFixed(store.orderProductData.campaign.decimal_places)}}
                            {{store.orderProductData.campaign.price_unit?$t(`global.price_unit.${store.orderProductData.campaign.price_unit}`):''}}
                            </td>
                            <td class="text-right whitespace-nowrap" :data-content="$t('manage_order.product_modal.sub_total')">
                            {{store.orderProductData.campaign.currency}}
                            {{store.orderProductData.campaign.decimal_places=='0'?Math.trunc(parseFloat(product.qty * product.price)):parseFloat(product.qty * product.price).toFixed(store.orderProductData.campaign.decimal_places)}}
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
                                {{store.orderProductData.campaign.decimal_places=='0'?Math.trunc(parseFloat(store.orderProductData.subtotal)):parseFloat(store.orderProductData.subtotal).toFixed(store.orderProductData.campaign.decimal_places)}}
                                {{store.orderProductData.campaign.price_unit?$t(`global.price_unit.${store.orderProductData.campaign.price_unit}`):''}}
                            </div>
                        </div>
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('manage_order.product_modal.delivery_charge')}}</div>
                            <div class="lg:mr-0" v-if="store.orderProductData.campaign">
                                {{store.orderProductData.campaign.currency}} 
                                {{store.orderProductData.campaign.decimal_places=='0'?Math.trunc(parseFloat(store.orderProductData.shipping_cost)):parseFloat(store.orderProductData.shipping_cost).toFixed(store.orderProductData.campaign.decimal_places)}}
                                {{store.orderProductData.campaign.price_unit?$t(`global.price_unit.${store.orderProductData.campaign.price_unit}`):''}}
                            </div>
                        </div>
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{store.orderProductData.adjust_title ?? $t('manage_order.product_modal.discount')}}</div>
                            <div class="lg:mr-0" v-if="store.orderProductData.campaign">
                                {{store.orderProductData.campaign.currency}} 
                                {{store.orderProductData.campaign.decimal_places=='0'?Math.trunc(parseFloat(store.orderProductData.adjust_price)):parseFloat(store.orderProductData.adjust_price).toFixed(store.orderProductData.campaign.decimal_places)}}
                                {{store.orderProductData.campaign.price_unit?$t(`global.price_unit.${store.orderProductData.campaign.price_unit}`):''}}
                            </div>
                        </div>
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('manage_order.product_modal.total')}}</div>
                            <div class="lg:mr-0" v-if="store.orderProductData.campaign">
                                {{store.orderProductData.campaign.currency}} 
                                {{store.orderProductData.campaign.decimal_places=='0'?Math.trunc(parseFloat(store.orderProductData.total)):parseFloat(store.orderProductData.total).toFixed(store.orderProductData.campaign.decimal_places)}}
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
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
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
    eventBus.on("getProductData", (payload) => {
        get_data(payload.id,payload.type)
	})
})

function get_data(id,type){
    if (type === 'pre_order'){
        seller_retrieve_pre_order(id)
        .then(
            res => { store.orderProductData = res.data
            console.log(store.orderProductData)}
        )
    }else{
        seller_retrieve_order(id)
        .then(
            res => { store.orderProductData = res.data}
        )
    }
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
