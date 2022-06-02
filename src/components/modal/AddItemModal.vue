<template>
	<Modal
		size="modal-lg"
		:show="store.showAddItemModal"
	>
		<ModalBody class="p-0">
			<ModalHeader>
				<h2 class="font-medium text-base mr-auto">
					Select add-ons
				</h2>
			</ModalHeader>
			<div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5" >
				<div 
					class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2" 
					v-for="item in store.addOnProducts"
					:key="item"
				>
					<div 
						class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in"
						@click="buyer_add_item(item.id)"
					>
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
			<Row>
				<button 
					class="btn btn-rounded btn-primary-soft w-35 mb-5 mt-5"
					@click="store.showAddItemModal = !store.showAddItemModal"
					style="margin-left: auto; margin-right: auto;"
				>
					Back to Cart
				</button>
			</Row>
			
		</ModalBody>
	</Modal>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { list_campapign_product, buyer_cart_add } from "@/api_v2/pre_order";
import { retrieve_pre_order } from "@/api_v2/pre_order";

import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useShoppingCartStore(); 	

const publicPath =  import.meta.env.VITE_APP_IMG_URL;

onMounted(() => {
	list(route.params.pre_order_id)
})

const list = (pre_order_id) => {
	list_campapign_product(pre_order_id)
	.then(
		response => {
			store.addOnProducts = response.data
		}
	)
}

const buyer_add_item = (campaing_product_id) => {
	buyer_cart_add(route.params.pre_order_id, campaing_product_id)
	.then(
		response => {
			list(route.params.pre_order_id)
		}
	).catch(error => {
		console.log(error)
	})

	retrieve_pre_order(route.params.pre_order_id)
    .then(
        res => { store.order = res.data }
    )
}
</script>
