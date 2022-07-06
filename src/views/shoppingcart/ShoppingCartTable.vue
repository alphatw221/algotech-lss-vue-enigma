<template>

	


	<table class="table">


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

			
			<template v-for="(product, index) in store.order.products" :key="index" >
				
				<tr class="intro-x mt-5 relative">
					<td class="imgtd">
						<div class="flex flex-col items-center">
							<div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in" v-if="product.image">
							<Tippy
								tag="img"
								class="rounded-lg"
								:src="storageUrl + product.image"
								:content="product.name"
							/>
							</div>
							<div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in" v-else>
							<Tippy
								tag="img"
								class="rounded-lg"
								:src="storageUrl + `no_image.jpeg`"
								:content="product.name"
							/>
							</div>
							<div class="productName">{{ product.name }} </div>
							
							
						</div>
					</td>
					<td class="text-center h-20">
						<template v-if="store.cartProducts[index].customer_editable && product.type ==='product'">
						<div class="flex w-full justify-center">
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
						<template v-else>
							<div class="flex ml-8 2xl:ml-20 qty">
								{{ product.qty }}
							</div>
						</template>
						<div class="absolute hidden md:block" v-show="store.cartProducts[index].qty_add_to_cart >= store.cartProducts[index].qty_for_sale" style="color:#FF4500"> Many people are reviewing this item, you might be missing it.</div>
					</td>
					<td class="sm:hidden" >
						<div style="color:#FF4500"> Many people are reviewing this item, you might be missing it.</div>
					</td>
					<td class="text-center h-20 ">
						<div class="price whitespace-nowrap"> $ {{ product.price }} </div>
					</td>
					<td class="text-center h-20">
						<div class="price whitespace-nowrap"> $ {{ product.qty * product.price }} </div>
					</td>
					<td class="table-report__action w-30 h-20">
					<div class="flex justify-center items-center" v-show="store.cartProducts[index].customer_removable && product.type === 'product'">
						<a class="flex items-center text-danger" @click="deleteOrderProduct(product.order_product_id, index)">
						<Trash2Icon class="w-4 h-4 mr-1" /> Delete
						</a>
					</div>
					</td>
				</tr>
				
			</template>

		</tbody>
	</table>

	<!-- BEGIN Empty Cart Text -->
			<div class=" text-center mt-5 md:mt-10" v-if="numOfItems==0">
				<h1 class="text-slate-500 text-sm md:text-lg">
					Your Shopping Cart Is Empty
				</h1>
			</div>
	<!-- END Empty Cart Text -->
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { buyer_delete_order_product, buyer_update_order_product, guest_delete_order_product, guest_update_order_product } from "@/api_v2/order_product"

import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies"
const route = useRoute();
const store = useShoppingCartStore(); 
const layoutStore = useLSSBuyerLayoutStore();
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const { cookies } = useCookies()
const isAnonymousUser=cookies.get("login_with")=='anonymousUser'

const tableColumns = ref([
	{ key: "product", name: "Product",  },
	{ key: "qty", name: "Q'ty",  },
	{ key: "price", name: "Price",  },
	{ key: "subtotal", name: "Subtotal",  },
	{ key: "remove", name: " ",  },
])
const numOfItems = computed(()=>{
	if(store.order.products)return Object.keys(store.order.products).length
	return 0
})
const deleteOrderProduct = (order_product_id, index) =>{
	const delete_order_product = isAnonymousUser?guest_delete_order_product:buyer_delete_order_product
	delete_order_product(order_product_id, route.params.pre_order_oid).then(res=>{
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

	const update_order_product = isAnonymousUser?guest_update_order_product:buyer_update_order_product
	update_order_product(order_product_id, route.params.pre_order_oid, qty).then(
		res => {
			store.order = res.data
			layoutStore.notification.showMessageToast("Update Successfully")
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
  table, thead, tbody, th, td, tr {
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
    text-align: center !important;
	height: auto !important;
  }
  .productName{
	min-height: 42px !important;
	padding-top:5px;

  }
  .qty{
	min-height: 42px !important;
	padding-top: 10px;
	text-align: center;
  }
  .price{
	padding-left: 20px;
	padding-right: 20px;
	height:40px;
	padding-top:10px;
  }
  td:before {
    position: absolute;
    left: 6px;
    width: 45%;
    padding-right: 10px;
	padding-top:10px;
    white-space: nowrap;
    font-weight: bold;
	text-align: left !important;
  }

  td:nth-of-type(1):before {
    content: "";
    /* color: #0e9893; */
  }
  td:nth-of-type(2):before {
    content: "Q'ty";
	display: flex;
	align-self: flex-end !important;
    /* color: #0e9893; */
  }
  td:nth-of-type(3) {
    display:block;
	width: 100%;
	padding-left: 0% !important;
	height: auto;
    /* color: #0e9893; */
  }
  td:nth-of-type(3):before {
    display:none;
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
    display:none; 
    /* color: #0e9893; */
  }
  td:nth-of-type(6) {
    display:inline-block; 
	width: 50%;
	padding-left: 50% !important;
	margin-bottom: 15px;
	margin-top:10px;
    /* color: #0e9893; */
  }
}
</style>