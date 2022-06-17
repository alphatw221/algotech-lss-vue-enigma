<template>
    <table class="table table-report mt-5 overflow-y-scroll overflow-x-auto w-full">
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
			<tr v-for="(product, index) in store.orderDetail.products" :key="index" class="intro-x">
				<td class=" h-20">
					<div class="flex">
						<div class="w-10 h-10 image-fit zoom-in">
						<Tippy
							tag="img"
							data-action="zoom"
							class="rounded-lg"
							:src="storageUrl+product.image"
							:content="product.name"
						/>
						</div>
					</div>
				</td>
				<td class="text-center h-20">
					{{ product.name }}
				</td>
				<td class="text-center h-20">
					<template v-if="props.order_type === 'order'">
						{{ product.qty }}
					</template>
					<template v-else>
						<div class="form-check self-center place-content-center">
                            <input id="qty" type="number" class="form-control" aria-label="default input" :value="product.qty"
                                style="width: 4rem; height: 2rem; margin-top: 5px;" @input="update_qty(index,product.order_product_id,$event.target.value)"/>
                        </div>
					</template>
				</td>
				<td class="text-center h-20">
					{{ product.price }}
				</td>
				<td class="text-center h-20">
					{{ product.qty * product.price }}
				</td>
                <td class="h-20">
					<div v-show="props.order_type !== 'order'">
						<Trash2Icon @click="delete_product(product.order_product_id)"/>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import { computed, onMounted, ref, watch,getCurrentInstance } from "vue";

import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useRoute, useRouter } from "vue-router";
import { seller_delete_product, seller_update_product } from "@/api_v2/pre_order"
const route = useRoute();
const router = useRouter();
const store = useManageOrderStore();
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const tableColumns = ref([
	{ key: "image", name: " ",  },
	{ key: "product", name: "Product",  },
	{ key: "qty", name: "Quantity",  },
	{ key: "price", name: "Price",  },
	{ key: "subtotal", name: "Subtotal",  },
    { key: "remove", name: " ",  }
])

function update_qty(id,order_product_id,qty){
	store.orderDetail.products[id].qty = qty
	seller_update_product(route.params.order_id,order_product_id,qty).then(
		eventBus.emit('getNewPrice')
		
	).catch(
		alert('!!')
	)
	console.log(qty)
}
function delete_product(order_product_id){
	seller_delete_product(route.params.order_id,order_product_id).then(
		res=>{
			alert(res.data.message)
		}
	)
	eventBus.emit('getNewPrice')
}
const props = defineProps({
  order_type: String
})


</script>