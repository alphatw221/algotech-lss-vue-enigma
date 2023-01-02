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
			<template v-if="props.cartLoading"> 
				<tr v-for="index in 2 " :key="index" class="intro-x mt-5 relative">
					<td class="imgtd">
						<div class="flex flex-col items-center">
							<div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in">
								<img
									class="rounded-lg"
									:src="staticDir + `no_image.jpeg`"
								/>
							</div>
							<div class="h-4 w-20 bg-slate-200 rounded mt-2"></div>
						</div>
					</td>
					<!-- ordercode -->
					<td class="text-center" :data-content="$t(`shopping_cart.table.order_code`)">
						<div class="flex items-center"> 
							<div class="h-4 w-14 mx-auto bg-slate-200 rounded"></div>
						</div>
					</td>
					<!-- qty-->
					<td class="text-center h-20" :data-content="$t(`shopping_cart.table.Qty`)">
						<div class="flex w-full justify-center">
							<button type="button" disabled>
								<MinusSquareIcon class="w-5 h-5 mt-2 mr-2 text-slate-400" />
							</button>
							<input 
								type="text" 
								class="form-control" 
								aria-label="default input" 
								style="width: 2.7rem;"
								value="1"
							/>
							<button type="button" disabled>
								<PlusSquareIcon class="w-5 h-5 mt-2 ml-2 text-slate-400" />
							</button>
						</div>
					</td>
					<td class="sm:hidden">
						<div style="color:#FF4500" v-show="false"></div>
					</td>
					<!-- price -->
					<td class="text-center h-20" :data-content="$t(`shopping_cart.table.price`)">
						<div class="h-4 w-14 ml-auto sm:mx-auto bg-slate-200 rounded"></div>
					</td>

					<!-- subtotal-->
					<td class="text-center h-20" :data-content="$t(`shopping_cart.table.subtotal`)">
						<div class="h-4 w-14 ml-auto sm:mx-auto bg-slate-200 rounded"></div>
					</td>
				</tr>
			</template>
			<template v-for="(qty, campaign_product_id, index) in shoppingCartStore.cart.products" :key="index" >
				<tr class="intro-x mt-5 relative">
					<td class="imgtd">
						<div class="flex flex-col items-center">
							<div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in" v-if="shoppingCartStore.campaignProductDict[campaign_product_id]?.image">
								<img
									class="rounded-lg"
									data-action="zoom"
									:src="shoppingCartStore.campaignProductDict[campaign_product_id]?.image"
								/>
							</div>
							<div class="w-24 h-24 lg:w-12 lg:h-12  2xl:x-12 2xl:h-12 image-fit zoom-in" v-else>
								<img
									class="rounded-lg"
									:src="staticDir + `no_image.jpeg`"
								/>
							</div>
							<div v-if="shoppingCartStore.campaignProductDict[campaign_product_id]?.type == 'lucky_draw'" class="text-primary font-medium"> *{{$t('lucky_draw.winner_modal.prize')}}* </div>
							<div class="productName">{{ shoppingCartStore.campaignProductDict[campaign_product_id]?.name }} </div>
						</div>
					</td>
					<td class="text-center" :data-content="$t(`shopping_cart.table.order_code`)">
						<div class="flex items-center"> 
							<span class="ordercode mx-auto"> {{ shoppingCartStore.campaignProductDict[campaign_product_id]?.order_code }}</span>
						</div>
					</td>
					<td class="text-center h-20" :data-content="$t(`shopping_cart.table.Qty`)">
						<template v-if="shoppingCartStore.campaignProductDict[campaign_product_id]?.customer_editable && shoppingCartStore.campaignProductDict[campaign_product_id]?.type ==='product'">
							<div class="flex w-full justify-center">
								<!-- <div class="absolute -bottom-8 border-slate border-2 rounded-bl-md rounded-r-md p-3 bg-white">
									<input type="text" class="w-10" :value="product.qty">
									<button class="btn btn-primary">
										Update
									</button>
								</div> -->
								<button type="button" @click="changeQuantity( index, 'minus', campaign_product_id, qty)" v-show="hideUpdateSignIndex!=index">
									<MinusSquareIcon class="w-5 h-5 mt-2 mr-2" />
								</button>
								<input 
									type="text" 
									class="form-control" 
									placeholder="Input inline 1" 
									aria-label="default input" 
									:value="qty"
									style="width: 2.7rem;"

									@focus="focusQtyInput(index, qty)"
									v-show="hideQtyInputIndex!=index"
								/>
								<button type="button" @click="changeQuantity( index, 'add', campaign_product_id, qty)" v-show="hideUpdateSignIndex!=index">
									<PlusSquareIcon class="w-5 h-5 mt-2 ml-2" />
								</button>
								<div class="flex inline-flex leading-5 items-center">
									<input type="text" class="form-control mr-1 leading-5 align-middle" style="width: 2.7rem;" v-model="cacheQty" v-show="showUpdateButtonIndex==index" >
									<div class="leading-5 allign-middle">
										<button class="btn btn-primary w-15" v-show="showUpdateButtonIndex==index" @click="changeQuantity(index, 'input', campaign_product_id, qty)">
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
								{{ qty }}
							</div>
						</template>
						<template v-if="shoppingCartStore.campaignProductDict[campaign_product_id]?.qty_add_to_cart > (shoppingCartStore.campaignProductDict[campaign_product_id]?.qty_for_sale - shoppingCartStore.campaignProductDict[campaign_product_id]?.qty_sold - shoppingCartStore.campaignProductDict[campaign_product_id]?.qty_pending_payment) 
							&& !(shoppingCartStore.campaignProductDict[campaign_product_id]?.oversell)
							&& shoppingCartStore.campaignProductDict[campaign_product_id]?.type === 'product'"> 
							<p class="absolute hidden sm:block" style="color:#FF4500">
								{{$t('shopping_cart.table.missing_message')}}
							</p>
						</template>
					</td>
					<template 
						v-if="shoppingCartStore.campaignProductDict[campaign_product_id]?.qty_add_to_cart > (shoppingCartStore.campaignProductDict[campaign_product_id]?.qty_for_sale - shoppingCartStore.campaignProductDict[campaign_product_id]?.qty_sold - shoppingCartStore.campaignProductDict[campaign_product_id]?.qty_pending_payment) 
						 && !(shoppingCartStore.campaignProductDict[campaign_product_id]?.oversell) 
						 && shoppingCartStore.campaignProductDict[campaign_product_id]?.type === 'product'"> 
						<td class="sm:hidden" style="color:#FF4500">
							<h4 class="text-[14px] text-center my-1">{{$t('shopping_cart.table.missing_message')}}</h4>
						</td>
					</template>
					<td class="text-center h-20 tdPrice" :data-content="$t(`shopping_cart.table.price`)">
						<div class="price whitespace-nowrap"> 
							{{shoppingCartStore.cart.campaign.currency}} 
							{{(Math.floor(parseFloat(shoppingCartStore.campaignProductDict[campaign_product_id]?.price) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
							{{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
						</div>
					</td>
					<td class="text-center h-20 tdSubtotal" :data-content="$t(`shopping_cart.table.subtotal`)">
						<div class="price whitespace-nowrap"> 
							{{shoppingCartStore.cart.campaign.currency}} 
							{{(Math.floor(parseFloat(qty * shoppingCartStore.campaignProductDict[campaign_product_id]?.price) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
							{{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
						</div>
					</td>
					<td class="table-report__action w-30 h-20">
					<div class="flex justify-center items-center" v-show="shoppingCartStore.campaignProductDict[campaign_product_id]?.customer_removable && shoppingCartStore.campaignProductDict[campaign_product_id]?.type === 'product'">
						<a class="flex items-center text-danger" @click="deleteOrderProduct( index, campaign_product_id)">
						<Trash2Icon class="w-4 h-4 mr-1" /> {{$t('shopping_cart.table.delete')}}
						</a>
					</div>
					</td>
				</tr>
				
			</template>

		</tbody>
	</table>

	<!-- BEGIN Empty Cart Text -->
		<div class=" text-center mt-5 md:mt-10" v-if="numOfItems==0 && !props.cartLoading">
			<h1 class="text-slate-500 text-sm md:text-lg">
				{{$t('shopping_cart.table.empty_message')}}
			</h1>
		</div>
	<!-- END Empty Cart Text -->

</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
// import { buyer_delete_order_product, buyer_update_order_product } from "@/api_v2/order_product"
import { buyer_edit_cart_product } from '@/api_v2/cart'


import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies"
import i18n from "@/locales/i18n"

const route = useRoute();
const shoppingCartStore = useShoppingCartStore(); 
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
	{ key: "order_code", name: "order_code",  },
	{ key: "qty", name: "qty",  },
	{ key: "price", name: "price",  },
	{ key: "subtotal", name: "subtotal",  },
	{ key: "remove", name: "null",  },
])

const props = defineProps({
    cartLoading: {
        type: Boolean,
        default: true,
  },
})


const numOfItems = computed(()=>{
	if(shoppingCartStore.cart.products)return Object.keys(shoppingCartStore.cart.products).length
	return 0
})

const deleteOrderProduct = (index, campaign_product_id) =>{
	buyer_edit_cart_product(route.params.cart_oid, campaign_product_id, 0, layoutStore.alert).then(res=>{
		shoppingCartStore.cart = res.data
		layoutStore.notification.showMessageToast(i18n.global.t('shopping_cart.delete_success'))
	})
}

const showUpdateButton = index =>{showUpdateButtonIndex.value = index}
const hideUpdateButton = () =>{showUpdateButtonIndex.value = null}

const showUpdateSign = ()=>{hideUpdateSignIndex.value = null}
const hideUpdateSign = index=>{hideUpdateSignIndex.value = index}

const showQtyInput = ()=>{hideQtyInputIndex.value = null}
const hideQtyInput = index=>{hideQtyInputIndex.value = index}

const focusQtyInput = (index,qty)=>{
	cacheQty.value = qty
	hideQtyInput(index)
	hideUpdateSign(index)
	showUpdateButton(index)

}
const changeQuantity = ( index, operation, campaign_product_id, qty) => {
	let _qty=1
	if (operation == 'add' ) {
		_qty = qty+1
	} else if (operation == 'minus' ) {
		_qty = qty-1
	} else if (operation == 'input' && parseInt(cacheQty.value) >= 1 ) {
		_qty = parseInt(cacheQty.value)
	} else {
		layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_qty'))
		cacheQty.value = qty
		return
	}
	hideUpdateSign(index)
	hideUpdateButton()
	showQtyInput()

	buyer_edit_cart_product(route.params.cart_oid, campaign_product_id, _qty, layoutStore.alert).then(
		res => {
			shoppingCartStore.cart = res.data
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
    min-height: 42px;
  }

  @media only screen and (max-width: 760px),
  (min-device-width: 769px) and (max-device-width: 769px) {
  table, thead, tbody, th, td, tr {
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
    border-bottom: 2px solid #dddddd; 
  }

  td {
    border: none;
    padding-left: 50% !important;
    text-align: right !important;
	min-height: 32px !important;
	padding-right: 10px !important;
	height: auto;
  }

  td:before {
    position: absolute;
    left: 10px;
    width: 45%;
    white-space: nowrap;
    font-weight: bold;
	text-align: left !important;
	min-height: 32px !important;
  }

  .imgtd{
    min-height: 125px !important;
	padding-left: 0% !important;
  }
  .imgtd:before{
	display:none;
  }

  td:nth-of-type(2):before {
	display:none;
  }
  td:nth-of-type(2) {
	padding-left: 0 !important;
	text-align: center;
  }
  .ordercode{
	border: 1.5px solid #f6ad55;  
	border-radius: 5px;
	font-weight: 600;
	color: #dd6b20; 
	width: fit-content;
	padding-right: 5px;
	padding-left: 5px;
  }
  td:nth-of-type(3) {
	padding-left: 0 !important;
  }
  td:nth-of-type(3):before {
    display:none;
  }
  td:nth-of-type(4) {
	padding-left: 0 !important;
	text-align: center;
  }
  td:nth-of-type(4):before {
    display:none;
  }
 
  td:nth-of-type(5):before {
    content: attr(data-content);
  }

  td:nth-of-type(6):before {
    content: attr(data-content);
  }

  td:nth-of-type(7):before {
    display:none; 
  }
  td:nth-of-type(7){
    padding-left: 0% !important;
	padding-bottom: 10px !important;
	min-height: 0 !important;
  }
}
</style>