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
                        Order No.#{{store.orderProductData.id}}
                        <span class="btn btn-rounded-pending cursor-auto h-8 ml-3">
                            {{store.orderProductData.status }}
                        </span>
                    </h2>
            </ModalHeader>
            <table id="orderTable" class="table table-report mt-3 text-lg">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap" v-for="column in columns" :key="column.key">
                            {{ column.name }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in store.orderProductData.products" :key="index" class="intro-x mt-5">
                        <td class="imgtd">
                            <div class="flex">
						        <div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in">
						            <Tippy
							            tag="img"
							            class="rounded-lg"
							            :src="storageUrl + product.image"
							            :content="product.name"
						            />
						        </div>
					        </div>
                        </td>
                        <td class="text-center h-20">
                            {{product.name}}
                        </td>
				        <td class="text-center h-20">
                            {{product.qty}}
                        </td>
                        <td class="text-center h-20">
                            {{(product.price).toFixed(2)}}
                        </td>
                        <td class="text-center h-20">
                            {{(product.qty * product.price).toFixed(2)}}
                        </td>                        
                    </tr>
                </tbody>
            </table>
            <div class="grid grid-cols-12 gap-2 text-lg">
            <div class="box col-start-1 col-span-12 lg:col-start-8 2xl:col-start-8">
                <div class="grid grid-cols-3 gap-2">
                    <div class="flex col-start-1 col-span-3 p-2">
                        <div class="mr-auto">Total</div>
                        <div class="mr-20">$ {{parseFloat(store.orderProductData.subtotal).toFixed(2)}}</div>
                    </div>
                    <div class="flex col-start-1 col-span-3 p-2">
                        <div class="mr-auto">Delivery Charge</div>
                        <div class="mr-20">{{parseFloat(store.orderProductData.shipping_cost).toFixed(2)}}</div>
                    </div>
                    <div class="flex col-start-1 col-span-3 p-2">
                        <div class="mr-auto">Discount {{store.orderProductData.adjust_title ?? ''}}</div>
                        <div class="mr-20">$ {{parseFloat(store.orderProductData.adjust_price).toFixed(2)}}</div>
                    </div>
                    <div class="flex col-start-1 col-span-3 p-2">
                        <div class="mr-auto">Grand Total</div>
                        <div class="mr-20">$ {{parseFloat(store.orderProductData.total).toFixed(2)}}</div>
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
    { key: "image", name: " ",  },
	{ key: "product", name: "Product",  },
	{ key: "qty", name: "Qty",  },
	{ key: "price", name: "Price",  },
	{ key: "subtotal", name: "Subtotal",  },
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
