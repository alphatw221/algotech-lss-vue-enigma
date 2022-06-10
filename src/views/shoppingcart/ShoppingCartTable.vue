<template>
	<table class="table overflow-x-auto">
		<thead>
			<tr>
				<th
					class="whitespace-nowrap text-center"
					v-for="column in tableColumns"
					:key="column.key"
				>
				{{ column.name }}
				</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(product, index) in store.order.products" :key="index" class="intro-x mt-5">
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
				<td class="text-center h-20 font-bold">
					<div class="productName">{{ product.name }} </div>
				</td>
				<td class="text-center h-20">
					<template v-if="`store.cartProducts.${index}.customer_editable` && product.type ==='product'">
					<div class="flex">
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
					</div>
					</template>
					<template>
						<div class="flex">
							{{ product.qty }}
						</div>
					</template>
				</td>
				<td class="text-center h-20 ">
					<div class="price"> $ {{ product.price }} </div>
				</td>
				<td class="text-center h-20">
					<div class="price"> $ {{ product.qty * product.price }} </div>
				</td>
				<td class="table-report__action w-30 h-20">
				<div class="flex justify-center items-center" v-show="`store.cartProducts.${index}.customer_removable` && product.type === 'product'">
					<a class="flex items-center text-danger" @click="deleteOrderProduct(product.order_product_id, index)">
					<Trash2Icon class="w-4 h-4 mr-1" /> Delete
					</a>
				</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { buyer_delete_order_product, buyer_update_order_product } from "@/api_v2/order_product"

import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import { useRoute } from "vue-router";

const route = useRoute();
const store = useShoppingCartStore(); 
const layoutStore = useLSSBuyerLayoutStore();
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL

const tableColumns = ref([
	{ key: "image", name: " ",  },
	{ key: "product", name: "Product",  },
	{ key: "qty", name: "Quantity",  },
	{ key: "price", name: "Price",  },
	{ key: "subtotal", name: "Subtotal",  },
	{ key: "remove", name: " ",  },
])

const deleteOrderProduct = (order_product_id, index) =>{
	buyer_delete_order_product(order_product_id).then(res=>{
		store.order = res.data
		layoutStore.notification.showMessageToast("Delete Success")
	})
} 

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
		layoutStore.alert.showMessageToast("Invalid Quantity")
		// alert('Invalid Quantity')
		event.target.value = store.order.products[index].qty
		return
	}

	buyer_update_order_product(order_product_id, qty)
	.then(
		res => {
			store.order = res.data
			layoutStore.notification.showMessageToast("Update Success")
		}
	)
}
</script>

<style scoped>
  td{
    height: 42px;
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
  .imgtd{
    height: 100px;
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
    padding-left: 50% !important;
    text-align: left !important;
  }
  .productName{
	padding-left: 20px;
	height:40px;
	padding-top:5px;
  }
  .price{
	padding-left: 20px;
	height:40px;
	padding-top:10px;
  }
  td:before {
    position: absolute;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
  }

  td:nth-of-type(1):before {
    content: "";
    /* color: #0e9893; */
  }
  td:nth-of-type(2):before {
    content: "";
    /* color: #0e9893; */
  }
  td:nth-of-type(3):before {
    content: "Qty";
	display: flex;
	align-self: flex-end !important;
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