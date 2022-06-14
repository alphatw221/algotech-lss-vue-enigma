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
			<tr v-for="(product, index) in store.orderDetail.products" :key="index" class="intro-x">
				<td class=" h-20">
					<div class="flex">
						<div class="w-10 h-10 image-fit zoom-in">
						<Tippy
							tag="img"
							class="rounded-full"
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
                            <input type="text" class="form-control" aria-label="default input" :value="product.qty"
                                style="width: 4rem; height: 2rem; margin-top: 5px;" @change="update_qty(index)"/>
                        </div>
					</template>
				</td>
				<td class="text-center h-20">
					{{ product.price }}
				</td>
				<td class="text-center h-20">
					{{ product.qty * product.price }}
				</td>
                <td class="h-20" v-show="props.order_type !== 'order'">
					<Trash2Icon />
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const store = useManageOrderStore();
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL

const tableColumns = ref([
	{ key: "image", name: " ",  },
	{ key: "product", name: "Product",  },
	{ key: "qty", name: "Quantity",  },
	{ key: "price", name: "Price",  },
	{ key: "subtotal", name: "Subtotal",  },
    { key: "remove", name: " ",  }
])

function update_qty(product_id){
	console.log(`store.orderDetail.products.`+product_id+`.qty`)
}
const props = defineProps({
  order_type: String
})
</script>