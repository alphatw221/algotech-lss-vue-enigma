<template>
<div class="flex-auto overflow-auto w-full h-[390px]">
	    <table class="table table-report">
		<thead>
			<tr>
				<th
					class="whitespace-nowrap text-center"
					v-for="column in tableColumns"
					:key="column.key"
				>
				{{ $t(`order_detail.${column.name}`) }}
				</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(product, index) in store.orderDetail.products" :key="index" class="intro-x">
				<td class=" ">
					<div class="flex">
						<div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in flex" v-if="product.image">
						<img
							tag="img"
							data-action="zoom"
							class="rounded-lg"
							:src="storageUrl+product.image"
						/>
						</div>
						<div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in flex" v-else>
						<img
							tag="img"
							data-action="zoom"
							class="rounded-lg"
							:src="storageUrl+`no_image.jpeg`"
						/>
						</div>
					</div>
				</td>
				<td class="text-center">
					<div class="whitespace-normal break-words">{{ product.name }} </div>
				</td>
				<td class="text-center">
					<template v-if="props.order_type === 'order'">
						{{ product.qty }}
					</template>
					<template v-else>
						<div class="form-check self-center place-content-left">

							<button type="button" @click="changeQuantity($event, index, product.qty, 'minus', product.order_product_id)">
								<MinusSquareIcon class="w-5 h-5 mt-2 mr-2" />
							</button>
							
							<input 
								type="text" 
								class="form-control" 
								placeholder="Input inline 1" 
								aria-label="default input" 
								:value="product.qty"
								style="width: 2.7rem;"
								@input="changeQuantity($event, index, product.qty, 'input', product.order_product_id)"
							/>
							<button type="button" @click="changeQuantity($event, index, product.qty, 'add', product.order_product_id)" >
								<PlusSquareIcon class="w-5 h-5 mt-2 ml-2" />
							</button>






                            <!-- <input id="qty" type="number" class="form-control w-16" aria-label="default input" :value="store.orderDetail.products[index].qty"
                                 @input="update_qty(index,product.order_product_id,$event.target.value)"/> -->
                        </div>
					</template>
				</td>
				<td class="text-center ">
					$ {{ product.price }}
				</td>
				<td class="text-center">
					$ {{ product.qty * product.price }}
				</td>
                <td class="">
					<a  class="text-danger" v-show="props.order_type !== 'order'">
						<Trash2Icon @click="delete_product(product.order_product_id)"/>
					</a>
				</td>
			</tr>
		</tbody>
	</table>
</div>
</template>

<script setup>
import { computed, onMounted, ref, watch,getCurrentInstance } from "vue";

import { useSellerOrderStore } from "@/stores/lss-seller-order";
import { useRoute, useRouter } from "vue-router";
import { seller_delete_product, seller_update_product } from "@/api_v2/order_product"
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';


const route = useRoute();
const router = useRouter();
const store = useSellerOrderStore();
const sellerStore = useLSSSellerLayoutStore()
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const tableColumns = ref([
	{ key: "image", name: "null",  },
	{ key: "product", name: "product",  },
	{ key: "qty", name: "qty",  },
	{ key: "price", name: "price",  },
	{ key: "subtotal", name: "sub_total",  },
    { key: "remove", name: "null",  }
])


const changeQuantity = (event, index, qty, operation, order_product_id) => {
	if (operation == 'add' && qty < 99) {
		qty += 1
	} else if (operation == 'minus' && qty > 1) {
		qty -= 1
	} else if (operation == 'input' && event.target.value >= 1 && event.target.value <= 99) {
		qty = event.target.value
	} else if (event.target.value == '') {
		event.target.value = 1
		return
	} else {
		sellerStore.alert.showMessageToast("Invalid Quantity")
		event.target.value = store.order.products[index].qty
		return
	}

	seller_update_product(route.params.order_id,order_product_id,qty).then(
		res =>{
			store.orderDetail = res.data
			sellerStore.notification.showMessageToast("Update Successfully")
		}
	)
}


// function update_qty(id,order_product_id,qty){
// 	// store.orderDetail.products[id].qty = qty
// 	seller_update_product(route.params.order_id,order_product_id,qty).then(
// 		res =>{
// 			store.orderDetail = res.data
// 			sellerStore.notification.showMessageToast("Update Successfully")
// 		}
// 	)
// }
function delete_product(order_product_id){
	seller_delete_product(route.params.order_id,order_product_id).then(
		res=>{
			store.orderDetail = res.data
			sellerStore.notification.showMessageToast("Delete Successfully")
		}
	)
}
const props = defineProps({
  order_type: String
})


</script>

<style scoped>
.click-icon:hover {
	cursor: pointer;
}

td {
  min-height: 40px;
  border-collapse: collapse;
  padding-right: 10px !important;
  padding-left: 10px !important;
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  
  background-color: theme("colors.secondary");
  padding-right: 10px !important;
  padding-left: 10px !important;
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
		/* color: #0e9893; */
	}

	td:nth-of-type(3):before {
		content: "Quantity";
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
	td:nth-of-type(6):before {
		display: none;
		/* color: #0e9893; */
	}
}
</style>
