<template>
    <table class="table table-report mt-5">
		<thead>
			<tr>
				<th
					class="whitespace-nowrap text-center"
					v-for="column in tableColumns"
					:key="column.key"
				>
				{{ $t(`order_detail.table.`+column.name) }}
				</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(order_product, index) in store.order.order_products" :key="index" class="intro-x">
        		<td class="imgtd">
					<div class="w-full flex">
						<img
							tag="img"
							data-action="zoom"
							class="rounded-lg w-14 h-14 zoom-in mx-auto mt-3 sm:mt-0 "
							:src="order_product.image || `${staticDir}no_image.jpeg`"
						/>
					</div>
				</td>
				<td class="text-left w-fit"> 
					<div v-if="order_product.type == 'lucky_draw'" class="font-medium text-primary" > *{{$t('lucky_draw.winner_modal.prize')}}*</div>
					{{ order_product.name }}  
				</td>
				<td class="text-center" :data-content="$t(`shopping_cart.table.order_code`)">
						{{ order_product?.order_code }} 
				</td>
				<td class="text-right" :data-content="$t('order_detail.table.qty')">
					{{ order_product.qty }}
				</td>
				<td class="text-right" :data-content="$t('order_detail.table.price')" >
					{{store.order.currency}} 
					{{(Math.floor(order_product.price * (10 ** store.order.decimal_places)) / 10 ** store.order.decimal_places).toLocaleString('en-GB')}}
					{{store.order.price_unit?$t(`global.price_unit.${store.order.price_unit}`):''}}
				</td>
				<td class="text-right" :data-content="$t('order_detail.table.sub_total')" >
					{{store.order.currency}}
					{{(Math.floor(order_product.subtotal * (10 ** store.order.decimal_places)) / 10 ** store.order.decimal_places).toLocaleString('en-GB')}}
					{{store.order.price_unit?$t(`global.price_unit.${store.order.price_unit}`):''}}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const store = useLSSBuyerOrderStore(); 
const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR

const tableColumns = ref([
	{ key: "image", name: "null",  },
	{ key: "product", name: "product",  },
	{ key: "order_code", name: "order_code",  },
	{ key: "qty", name: "qty",  },
	{ key: "price", name: "price",  },
	{ key: "subtotal", name: "sub_total",  }
])
</script>

<style scoped>
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


@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {

	table,
	thead,
	tbody,
	th,
	td,
	tr {
		display: block;
		font-size: 16px;
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
	position: relative;
	padding-left: 50%;
    padding-right: 20px !important;
	text-align: right;
	box-shadow: none !important;
	padding-top: 0px !important;
    padding-bottom: 0px !important;
    min-height: 30px !important;
    font-size: 14px;
	}

	td:before {
	position: absolute;
	left: 20px;
    text-align: left;
	width: 45%;
	padding-right: 10px;
	box-shadow: none !important;
	background-color: white !important;
	padding-top: 0px !important;
	}
  .imgtd:before {
    display: none;
  }

  .imgtd {
    display: inline-block;
    padding-left: 0% !important;
    min-height: 80px !important;
    width: 100%;
  }

	td:nth-of-type(2):before {
		display: none;
	}
   td:nth-of-type(2){
		width:100%;
    display: inline-block;
    font-weight:500;
    color:theme("colors.primary");
    padding-left: 0px !important;
    text-align: center;
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
}
</style>