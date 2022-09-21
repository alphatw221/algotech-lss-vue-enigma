<template>
	<table class="table">

		<thead>
			<tr>
				<th
					class="whitespace-nowrap text-center"
					v-for="column in tableColumns"
					:key="column.key"
				>
				{{ $t(`shopping_cart.table.`+column.name) }}
				</th>
			</tr>
			</thead>
			<tbody>
			<template v-for="(product, index) in store.order.products" :key="index" >
				
				<tr class="intro-x mt-5 relative">
					<td class="imgtd">
						<div class="flex flex-col items-center">
							<div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in" v-if="product.image">
								<img
									class="rounded-lg"
									data-action="zoom"
									:src="product.image"
								/>
							</div>
							<div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in" v-else>
								<img
									class="rounded-lg"
									:src="staticDir + `no_image.jpeg`"
								/>
							</div>
							<div v-if="product.type == 'lucky_draw'" class="text-primary font-medium"> *{{$t('lucky_draw.winner_modal.prize')}}* </div>
							<div class="productName">{{ product.name }} </div>
						</div>
					</td>
					<td class="text-center h-20">
						<template v-if="store.cartProducts[index].customer_editable && product.type ==='product'">
							<div class="flex w-full justify-center">
								<!-- <div class="absolute -bottom-8 border-slate border-2 rounded-bl-md rounded-r-md p-3 bg-white">
									<input type="text" class="w-10" :value="product.qty">
									<button class="btn btn-primary">
										Update
									</button>
								</div> -->
								<button type="button" @click="changeQuantity( index, 'minus', product)" v-show="hideUpdateSignIndex!=index">
									<MinusSquareIcon class="w-5 h-5 mt-2 mr-2" />
								</button>
								<input 
									type="text" 
									class="form-control" 
									placeholder="Input inline 1" 
									aria-label="default input" 
									:value="product.qty"
									style="width: 2.7rem;"

									@focus="focusQtyInput(index, product)"
									v-show="hideQtyInputIndex!=index"
								/>
								<button type="button" @click="changeQuantity( index, 'add', product)" v-show="hideUpdateSignIndex!=index">
									<PlusSquareIcon class="w-5 h-5 mt-2 ml-2" />
								</button>
								<div class="flex inline-flex leading-5 items-center">
									<input type="text" class="form-control mr-1 leading-5 align-middle" style="width: 2.7rem;" v-model="cacheQty" v-show="showUpdateButtonIndex==index" >
									<div class="leading-5 allign-middle">
										<button class="btn btn-primary w-15" v-show="showUpdateButtonIndex==index" @click="changeQuantity(index, 'input', product)">
											{{$t('shopping_cart.table.update')}}
										</button>
										<button class="btn btn-secondary w-15" v-show="showUpdateButtonIndex==index" @click="showQtyInput();showUpdateSign();hideUpdateButton()">
											{{$t('shopping_cart.table.cancel')}}
										</button>
									</div>
								</div>
							</div>
						</template>
						<template v-else>
							<div class="qty text-center">
								{{ product.qty }}
							</div>
						</template>
						<div class="absolute hidden md:block" v-show="store.cartProducts[index].qty_add_to_cart >= store.cartProducts[index].qty_for_sale && store.cartProducts[index].type === 'product'" style="color:#FF4500">
							 {{$t('shopping_cart.table.missing_message')}}
						</div>
					</td>
					<td class="sm:hidden">
						<div style="color:#FF4500" v-show="store.cartProducts[index].qty_add_to_cart >= store.cartProducts[index].qty_for_sale && store.cartProducts[index].type === 'product'"> {{$t('shopping_cart.table.missing_message')}}</div>
					</td>
					<td class="text-center h-20 ">
						<div class="price whitespace-nowrap"> 
							{{store.order.campaign.currency}} 
							{{(Math.floor(parseFloat(product.price) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places).toLocaleString('en-GB')}}
							{{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
						</div>
					</td>
					<td class="text-center h-20">
						<div class="price whitespace-nowrap"> 
							{{store.order.campaign.currency}} 
							{{(Math.floor(parseFloat(product.qty * product.price) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places).toLocaleString('en-GB')}}
							{{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
						</div>
					</td>
					<td class="table-report__action w-30 h-20">
					<div class="flex justify-center items-center" v-show="store.cartProducts[index].customer_removable && product.type === 'product'">
						<a class="flex items-center text-danger" @click="deleteOrderProduct(product.order_product_id, index)">
						<Trash2Icon class="w-4 h-4 mr-1" /> {{$t('shopping_cart.table.delete')}}
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
					{{$t('shopping_cart.table.empty_message')}}
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
import i18n from "@/locales/i18n"

const route = useRoute();
const store = useShoppingCartStore(); 
const layoutStore = useLSSBuyerLayoutStore();
const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR
const { cookies } = useCookies()
const isAnonymousUser=cookies.get("login_with")=='anonymousUser'
const hideUpdateSignIndex = ref(null)
const hideQtyInputIndex = ref(null)
const showUpdateButtonIndex = ref(null)
const cacheQty = ref(0)

const tableColumns = ref([
	{ key: "product", name: "product",  },
	{ key: "qty", name: "qty",  },
	{ key: "price", name: "price",  },
	{ key: "subtotal", name: "subtotal",  },
	{ key: "remove", name: "null",  },
])

const numOfItems = computed(()=>{
	if(store.order.products)return Object.keys(store.order.products).length
	return 0
})

const deleteOrderProduct = (order_product_id, index) =>{
	const delete_order_product = isAnonymousUser?guest_delete_order_product:buyer_delete_order_product
	delete_order_product(order_product_id, route.params.pre_order_oid).then(res=>{
		store.order = res.data
		layoutStore.notification.showMessageToast(i18n.global.t('shopping_cart.delete_success'))
	})
}

const showUpdateButton = index =>{showUpdateButtonIndex.value = index}
const hideUpdateButton = () =>{showUpdateButtonIndex.value = null}

const showUpdateSign = ()=>{hideUpdateSignIndex.value = null}
const hideUpdateSign = index=>{hideUpdateSignIndex.value = index}

const showQtyInput = ()=>{hideQtyInputIndex.value = null}
const hideQtyInput = index=>{hideQtyInputIndex.value = index}

const focusQtyInput = (index,product)=>{
	cacheQty.value = product.qty
	hideQtyInput(index)
	hideUpdateSign(index)
	showUpdateButton(index)

}
const changeQuantity = ( index, operation, product) => {
	let qty=1
	if (operation == 'add' ) {
		qty = product.qty+1
	} else if (operation == 'minus' ) {
		qty = product.qty-1
	} else if (operation == 'input' && cacheQty.value >= 1 ) {
		qty = cacheQty.value
	} else {
		layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_qty'))
		cacheQty.value = product.qty
		return
	}
	hideUpdateSign(index)
	hideUpdateButton()
	showQtyInput()
	const update_order_product = isAnonymousUser?guest_update_order_product:buyer_update_order_product
	update_order_product(product.order_product_id, route.params.pre_order_oid, qty).then(
		res => {
			store.order = res.data
			layoutStore.notification.showMessageToast(i18n.global.t('shopping_cart.update_successfully'))
			showUpdateSign()
			showQtyInput()
			hideUpdateButton()
		}
	).catch((err)=>{
		showUpdateSign()
		showQtyInput()
		hideUpdateButton()
	})
}
</script>

<style scoped>
  td{
    height: 42px;
  }

  @media only screen and (max-width: 760px),
  (min-device-width: 769px) and (max-device-width: 769px) {
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
    border-bottom: 2px solid #dddddd; 
  }

  td {
    border: none;
    padding-left: 50% !important;
    text-align: center !important;
	height: auto !important;
  }
  .productName{
	min-height: 35px !important;
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
	width: 100%;
	padding-left: 0px !important;
	margin-bottom: 15px;
	margin-top:10px;
    /* color: #0e9893; */
  }
}
</style>