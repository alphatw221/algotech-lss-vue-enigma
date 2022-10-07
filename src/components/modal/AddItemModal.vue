<template>
	<Modal
	backdrop="static"
		size="modal-lg"
		:show="store.showAddItemModal"
		@hidden="store.showAddItemModal=false"
		:slideOver="true"
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
					v-for="(product, index) in store.addOnProducts"
					:key="index"
				>
					<div 
						class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in"
						
					>
						<a class="w-4/5 file__icon file__icon--image mx-auto">
							<div class="file__icon--image__preview image-fit" style="width: 80px; height:80px">
								<img :src="product.image"/>
							</div>
						</a>
						<div class="block font-medium mt-4 text-center truncate">	
							{{ product.name }}
						</div>
						<div class="text-slate-500 text-xs text-center mt-0.5">
							$ {{ product.price }}
						</div>
						<div class="flex">
							<button type="button" @click="changeQuantity($event, index, 'minus')">
								<MinusSquareIcon class="w-5 h-5 mt-2 mr-2" />
							</button>
							<input 
								type="text" 
								class="form-control" 
								placeholder="Input inline 1" 
								aria-label="default input"
								:value="product.qty"
								@input="changeQuantity($event, index, 'input')"
								style="width: 2.7rem; height: 2rem; margin-top: 5px;"
							/>
							<button type="button" @click="changeQuantity($event, index, 'add')">
								<PlusSquareIcon class="w-5 h-5 mt-2 ml-2" />
							</button>
						</div>
						<div>
							<button 
								class="btn btn-sm btn-primary w-24 mr-1 mb-2 mt-3"
								@click="buyer_add_item(product.id, index)"
							>
								Add
							</button>
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
import { buyer_retrieve_pre_order } from "@/api_v2/pre_order";

import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute } from "vue-router";

import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"

const layoutStore = useLSSBuyerLayoutStore();

const route = useRoute();
const store = useShoppingCartStore(); 	



onMounted(() => {
	list(route.params.pre_order_id)
})

const changeQuantity = (event, index, type) => {
	if (type == 'add' && store.addOnProducts[index].qty <= 99) {
		store.addOnProducts[index].qty += 1
	} else if (type == 'minus' && store.addOnProducts[index].qty >= 1) {
		store.addOnProducts[index].qty -= 1
	} else if (type == 'input' && event.target.value <= 99 && event.target.value >= 1) {
		store.addOnProducts[index].qty == event.target.value
	} 
}

const list = (pre_order_id) => {
	list_campapign_product(pre_order_id, layoutStore.alert)
	.then(
		response => {
			store.addOnProducts = response.data
			for (let i = 0; i < store.addOnProducts.length; i ++) {
				store.addOnProducts[i].qty = 1
			}
			console.log(store.addOnProducts)
		}
	)
}

const buyer_add_item = (campaing_product_id, index) => {
	buyer_cart_add(route.params.pre_order_id, campaing_product_id, store.addOnProducts[index].qty, layoutStore.alert)
	.then(
		response => {
			list(route.params.pre_order_id)
		}
	).catch(error => {
		console.log(error)
	})

	buyer_retrieve_pre_order(route.params.pre_order_id)
    .then(
        res => { store.order = res.data }
    )
}
</script>
