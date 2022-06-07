<template>
	<table class="table table-report mt-5 overflow-y-scroll overflow-x-auto">
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
			<tr v-for="(product, index) in store.order.products" :key="index" class="intro-x">
				<td class=" h-20">
					<div class="flex">
						<div class="w-10 h-10 image-fit zoom-in">
						<Tippy
							tag="img"
							class="rounded-full"
							:src="storageUrl + product.image"
							:content="product.name"
						/>
						</div>
					</div>
				</td>
				<td class="text-center h-20">
					{{ product.name }}
				</td>
				<td class="text-center h-20">
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
				</td>
				<td class="text-center h-20">
					{{ product.price }}
				</td>
				<td class="text-center h-20">
					{{ product.qty * product.price }}
				</td>
				<td class="table-report__action w-30 h-20">
				<div class="flex justify-center items-center">
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
import { list_campapign_product } from "@/api_v2/pre_order";

import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useShoppingCartStore(); 
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
		// store.order.products.splice(index, 1);
		store.order = res.data
		list_campapign_product(route.params.pre_order_id)
		.then(
			response => { store.addOnProducts = response.data }
		)
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
		alert('Invalid Quantity')
		event.target.value = store.order.products[index].qty
		return
	}

	buyer_update_order_product(order_product_id, qty)
	.then(
		res => {
			store.order = res.data
		}
	).catch(
		event.target.value = store.order.products[index].qty
	)
}
</script>

<style scoped>
  td{
    height: 60px !important;
  }
</style>