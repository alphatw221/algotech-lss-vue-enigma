<template>
	<Modal
		size="modal-lg"
		:show="store.showAddItemModal"
	>
		<ModalBody class="p-0">
			<div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5" >
				<div 
					class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2" 
					v-for="item in store.addOnProducts"
					:key="item"
				>
					<div class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in">
						<a class="w-4/5 file__icon file__icon--image mx-auto">
							<div class="file__icon--image__preview image-fit" style="width: 80px; height:80px">
								<img :src="publicPath + item.image"/>
							</div>
						</a>
						<div class="block font-medium mt-4 text-center truncate">	
							{{ item.name }}
						</div>
						<div class="text-slate-500 text-xs text-center mt-0.5">
							$ {{ item.price }}
						</div>
					</div>
				</div>
			</div>
		</ModalBody>
	</Modal>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { list_buyer_campapign_product } from "@/api_v2/pre_order";

import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useShoppingCartStore(); 	

const publicPath =  import.meta.env.VITE_APP_IMG_URL;

onMounted(() => {
	list_buyer_campapign_product(route.params.pre_order_id)
	.then(
		response => {
			store.addOnProducts = response.data
			console.log(response.data)
		}
	)
})

	// export default {
	// props: {
	// 	product: Array,
	// },
	// data() {
	// 	return {
	// 	listItems: this.product,
	// 	addItemPopupModalPreview: false,
	// 	};
	// },
	// mounted() {
	// 	this.eventBus.on("addPoint", (payload) => {
	// 	this.addItemPopupModalPreview = true;
	// 	console.log(payload.pre_order_id)
	// 	});
	// },
	// unmounted() {
	// 	this.eventBus.off("addPoint");
	// },
	// };
</script>
