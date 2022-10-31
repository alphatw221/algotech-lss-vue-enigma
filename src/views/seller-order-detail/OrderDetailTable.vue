<template>
<div class="flex-auto overflow-auto w-full h-fit max-h-full">
	    <table class="table table-report -mt-3">
		<thead>
			<tr>
				<th
					class="text-center whitespace-nowrap"
					v-for="column in tableColumns"
					:key="column.key"
				>
				{{ $t(`order_detail.table.${column.name}`) }}
				</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(order_product, index) in sellerOrderDetail.order.order_products" :key="index" class="intro-x">
				<td class=" " :data-content="$t('order_detail.table.null')">
					<div class="w-14 sm:w-20 flex" v-if="order_product.image">
					<img
						tag="img"
						data-action="zoom"
						class="rounded-lg w-10 h-10 sm:w-14 sm:h-14 zoom-in"
						:src="order_product.image"
					/>
					</div>
					<div class="w-14 sm:w-20 flex" v-else>
					<img
						tag="img"
						data-action="zoom"
						class="rounded-lg w-10 h-10 sm:w-14 sm:h-14 zoom-in"
						:src="staticDir+`no_image.jpeg`"
					/>
					</div>
				</td>
				<td class="text-left" :data-content="$t('order_detail.table.product')">
					<span class="font-bold"  v-if="order_product.type === 'lucky_draw'"> *{{$t('lucky_draw.winner_modal.prize')}}*</span>
					<div class="break-words whitespace-normal">{{ order_product.name }} </div>
				</td>
				<td class="text-center w-fit" :data-content="$t('order_detail.table.qty')">
					{{ order_product.qty }}
				</td>
				<td class="text-right whitespace-nowrap" :data-content="$t('order_detail.table.price')" v-if="campaignDetailStore.campaign">
					{{campaignDetailStore.campaign.currency}}
					{{ (Math.floor(parseFloat(order_product.price) * (10 ** campaignDetailStore.campaign.decimal_places)) / 10 ** campaignDetailStore.campaign.decimal_places).toLocaleString('en-GB')}}
					{{campaignDetailStore.campaign.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign.price_unit}`):''}}
				</td>
				<td class="text-right whitespace-nowrap" :data-content="$t('order_detail.table.sub_total')" v-if="campaignDetailStore.campaign">
					{{campaignDetailStore.campaign.currency}}
					{{ (Math.floor(parseFloat(order_product.subtotal) * (10 ** campaignDetailStore.campaign.decimal_places)) / 10 ** campaignDetailStore.campaign.decimal_places).toLocaleString('en-GB')}}
					{{campaignDetailStore.campaign.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign.price_unit}`):''}}
				</td>
				<!-- <td>
					<a  class="flex items-center justify-center text-danger" 
						v-show="props.order_type !== 'order'"
						@click="delete_product(order_product)" >
						<Trash2Icon class="w-4 h-4 mr-1" />
					</a>
				</td> -->
			</tr>
		</tbody>
	</table>
</div>
</template>

<script setup>
import { computed, onMounted, ref, watch,getCurrentInstance } from "vue";

import { useSellerOrderStore } from "@/stores/lss-seller-order";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail"
import { useRoute, useRouter } from "vue-router";
import { seller_delete_product, seller_update_product } from "@/api_v2/order_product"
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import i18n from "@/locales/i18n"

const route = useRoute();
const router = useRouter();
const sellerOrderDetail = useSellerOrderStore();
const campaignDetailStore = useCampaignDetailStore();
const sellerStore = useLSSSellerLayoutStore()
const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const hideUpdateSignIndex = ref(null)
const hideQtyInputIndex = ref(null)
const showUpdateButtonIndex = ref(null)
const cacheQty = ref(0)

const tableColumns = ref([
	{ key: "image", name: "null",  },
	{ key: "product", name: "product",  },
	{ key: "qty", name: "qty",  },
	{ key: "price", name: "price",  },
	{ key: "subtotal", name: "sub_total",  },

])

// const showUpdateButton = index =>{showUpdateButtonIndex.value = index}
// const hideUpdateButton = () =>{showUpdateButtonIndex.value = null}

// const showUpdateSign = ()=>{hideUpdateSignIndex.value = null}
// const hideUpdateSign = index=>{hideUpdateSignIndex.value = index}

// const showQtyInput = ()=>{hideQtyInputIndex.value = null}
// const hideQtyInput = index=>{hideQtyInputIndex.value = index}

// const focusQtyInput = (index,product)=>{
// 	cacheQty.value = product.qty
// 	hideQtyInput(index)
// 	hideUpdateSign(index)
// 	showUpdateButton(index)

// }
// const changeQuantity = (index, operation, product) => {
// 	let qty=1
// 	if (operation == 'add' ) {
// 		qty = product.qty+1
// 	} else if (operation == 'minus' ) {
// 		qty = product.qty-1
// 	} else if (operation == 'input' && cacheQty.value >= 1 ) {
// 		qty = cacheQty.value
// 	} else {
// 		sellerStore.alert.showMessageToast(i18n.global.t('order_detail.invalid_qty'))
// 		cacheQty.value = product.qty
// 		return
// 	}
// 	hideUpdateSign(index)
// 	// hideUpdateButton()
// 	// showQtyInput()
// 	seller_update_product(route.params.order_id, product.order_product_id, qty, sellerStore.alert).then(
// 		res =>{
// 			sellerOrderDetail.order = res.data
// 			sellerStore.notification.showMessageToast(i18n.global.t('order_detail.update_successfully'))
// 			showUpdateSign()
// 			showQtyInput()
// 			hideUpdateButton()
// 		}
// 	)
// }


// function update_qty(id,order_product_id,qty){
// 	// sellerOrderDetail.order.products[id].qty = qty
// 	seller_update_product(route.params.order_id,order_product_id,qty).then(
// 		res =>{
// 			sellerOrderDetail.order = res.data
// 			sellerStore.notification.showMessageToast("Update Successfully")
// 		}
// 	)
// }
// function delete_product(order_product_id){
// 	seller_delete_product(route.params.order_id,order_product_id, sellerStore.alert).then(
// 		res=>{
// 			sellerOrderDetail.order = res.data
// 			sellerStore.notification.showMessageToast(i18n.global.t('order_detail.delete_successfully'))
// 		}
// 	)
// }
// const props = defineProps({
//   order_type: String
// })


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
  z-index: 50;
  background-color: theme("colors.secondary");
  padding-right: 10px !important;
  padding-left: 10px !important;
}

.longMessage{
	overflow-wrap: break-word;
}	

.luckyDraw{
	border: 2px solid black !important; 
	background-color: black;
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
		border-bottom: 1px solid black;
	}

	thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
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
	}

	td:nth-of-type(2):before {
		content: attr(data-content);
	}

	td:nth-of-type(3):before {
		content: attr(data-content);
	}

	td:nth-of-type(4):before {
		content: attr(data-content);
	}

	td:nth-of-type(5):before {
		content: attr(data-content);
	}
	td:nth-of-type(6):before {
		display: none;
	}
	td:nth-of-type(6){
		min-height: 10px;
	}
} */
</style>
