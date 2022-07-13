<template>
    <Modal
		size="modal-xl"
		:show="store.orderProductModal"
		@hidden="store.orderProductModal = false"
		:slideOver="true"
	>
        <ModalBody>
            <ModalHeader>
                    <h2 class="font-medium text-base mr-auto">
                        {{$t('manage_order.order')}} No. {{store.orderProductData.id}}
                        <span class="btn btn-rounded-pending cursor-auto h-8 ml-3">
                            {{$t(`manage_order.${store.orderProductData.status}`) }}
                        </span>
                    </h2>
            </ModalHeader>
            <table id="orderTable" class="table table-report mt-3 text-[16px]">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap text-center" v-for="column in columns" :key="column.key">
                            {{ $t(`order_detail.${column.name}`) }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in store.orderProductData.products" :key="index" class="intro-x text-[16px]">
                        <td class="imgtd">
                            <div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in flex" v-if="product.image">
                                <Tippy
                                    tag="img"
                                    class="rounded-lg"
                                    :src="storageUrl + product.image"
                                    :content="product.name"
                                />
                            </div>
                            <div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in flex" v-else>
                                <Tippy
                                    tag="img"
                                    class="rounded-lg"
                                    :src="storageUrl + 'no_image.jpeg'"
                                    :content="product.name"
                                />
                            </div>
                        </td>
                        <td class="text-center">
                            {{product.name}}
                        </td>
				        <td class="text-center">
                            {{product.qty}}
                        </td>
                        <td class="text-center">
                           $ {{(product.price).toFixed(2)}}
                        </td>
                        <td class="text-center">
                           $ {{(product.qty * product.price).toFixed(2)}}
                        </td>                        
                    </tr>
                </tbody>
            </table>
            <div class="grid grid-cols-12 gap-2 text-[16px]">
                <div class="box col-start-1 col-span-12 lg:col-start-8 2xl:col-start-8">
                    <div class="grid grid-cols-3 gap-2">
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('order_detail.total')}}</div>
                            <div class="mr-10">$ {{parseFloat(store.orderProductData.subtotal).toFixed(2)}}</div>
                        </div>
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('order_detail.delivery_charge')}}</div>
                            <div class="mr-10">$ {{parseFloat(store.orderProductData.shipping_cost).toFixed(2)}}</div>
                        </div>
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{store.orderProductData.adjust_title ?? $t('order_detail.discount')}}</div>
                            <div class="mr-10">$ {{parseFloat(store.orderProductData.adjust_price).toFixed(2)}}</div>
                        </div>
                        <div class="flex col-start-1 col-span-3 p-2">
                            <div class="mr-auto font-bold">{{$t('order_detail.total')}}</div>
                            <div class="mr-10">$ {{parseFloat(store.orderProductData.total).toFixed(2)}}</div>
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
const route = useRoute();
const store = useManageOrderStore()
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
  min-height: 40px;
  border-collapse: collapse;
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  
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
		padding-top: 0px !important;
	}

	td:nth-of-type(1):before {
		content: "";
		/* color: #0e9893; */
	}

	td:nth-of-type(2):before {
		content: "Product";
		overflow-wrap: break-word;
		/* color: #0e9893; */
	}

	td:nth-of-type(3):before {
		content: "Quantity";
		overflow-wrap: break-word !important;
		/* color: #0e9893; */
	}

	td:nth-of-type(4):before {
		content: "Price";
		/* color: #0e9893; */
	}

	td:nth-of-type(5):before {
		content: "Subtotal";
		/* color: #0e9893; */
	}
}
</style>
