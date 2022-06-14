<template>
	<Modal
		size="modal-xl"
		:show="store.showAddItemModal"
		@hidden="store.showAddItemModal=false"
		:slideOver="true"
	>
		<ModalBody class="p-5 relative" >
			<a @click="store.showAddItemModal = !store.showAddItemModal" class="absolute right-0 top-0 mt-3 mr-3">
                <XIcon class="w-8 h-8 text-slate-400" />
            	</a>
			<ModalHeader>
				<h2 class="font-medium text-base mr-auto">
					Select add-ons
				</h2>
			</ModalHeader>

			<div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5" >
				<div 
					class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-3 " 
					v-for="(product, index) in addOnProducts" :key="index"
				>
					<div class="file box rounded-md pt-3 pb-5 px-3 sm:px-5 flex flex-wrap flex-col relative zoom-in items-center justify-center" >

						<a class="w-4/5 file__icon file__icon--image">
							<div class="file__icon--image__preview image-fit" >
								<img :src="publicPath + product.image"
								/>
							</div>
						</a>
						<div class="block font-medium text-center truncate">	
							{{ product.name }}
						</div>
						<div class="text-slate-500 text-xs text-center">
							$ {{ product.price }}
						</div>
						<div class="flex">
							<button type="button" @click="changeQuantity(null, index, 'minus')">
								<MinusSquareIcon class="w-5 h-5 mt-2 mr-2" />
							</button>
							<input 
								type="text"
								class="form-control" 
								placeholder="Input inline 1" 
								aria-label="default input"
								:value="product.qty"
								@change="changeQuantity($event, index, 'input')"
								style="width: 2.7rem; height: 2rem; margin-top: 5px;"
							/>
							<button type="button" @click="changeQuantity(null, index, 'add')">
								<PlusSquareIcon class="w-5 h-5 mt-2 ml-2" />
							</button>
						</div>
						<div>
							<button 
								class="btn btn-sm btn-primary w-24 mt-3"
								@click="buyer_add_item(product.id, index)"
							>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
		</ModalBody>
	</Modal>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
// import { buyer_list_campapign_product } from "@/api_v2/campaign_product";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { buyer_cart_add } from "@/api_v2/pre_order";
import { useRoute } from "vue-router";


const layoutStore = useLSSBuyerLayoutStore();

const route = useRoute();
const store = useShoppingCartStore(); 	

const publicPath =  import.meta.env.VITE_APP_IMG_URL;

const addOnProducts = ref([])

onMounted(()=> {
	if (route.query.tag && route.query.tag == 'openAddOn') store.showAddItemModal = true
	
})

watch(computed(()=>store.campaignProducts),()=>{
	if (!(store.order.products||false))return
	updateAddOnProducts()
})

watch(computed(()=>store.order),()=>{
	if (!(store.order.products||false))return
	updateAddOnProducts()
})

const updateAddOnProducts = ()=>{
	let temp = []
	store.campaignProducts.forEach(product => {
		if(!(product.id.toString() in store.order.products)){
			product.qty=1
			temp.push(product)
		}
	});
	addOnProducts.value = temp
}

const changeQuantity = (event, index, operation) => {
	if (operation == 'add' && addOnProducts.value[index].qty < 99) {
		addOnProducts.value[index].qty += 1
	} else if (operation == 'minus' && addOnProducts.value[index].qty > 1) {
		addOnProducts.value[index].qty -= 1
	} else if (operation=='input' && event.target.value >= 1 && event.target.value <= 99){
		addOnProducts.value[index].qty = event.target.value
	} 
	else{
		if(event)event.target.value=1
		addOnProducts.value[index].qty = 1
		layoutStore.alert.showMessageToast("Invalid amount")
	}
}   // minus after input works, plus after input not works


const buyer_add_item = (campaing_product_id, index) => {
	buyer_cart_add(route.params.pre_order_id, campaing_product_id, addOnProducts.value[index].qty)
	.then(
		res => {
			store.order = res.data
			layoutStore.notification.showMessageToast("Add Item Success")
		}
	)
}
</script>
