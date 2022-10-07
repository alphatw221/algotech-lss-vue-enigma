<template>
	<Modal
	backdrop="static"
		size="modal-xl"
		:show="store.showAddItemModal"
		@hidden="store.showAddItemModal = false"
		:slideOver="true"
	>
		<ModalBody class="p-5 relative" >
			<a @click="store.showAddItemModal = !store.showAddItemModal" class="absolute right-0 top-0 mt-3 mr-3">
                <XIcon class="w-8 h-8 text-slate-400" />
            	</a>
			<ModalHeader>
				<h2 class="font-medium text-base mr-auto">
					{{ $t(`shopping_cart.add_item.`+addOnTitle) }}
				</h2>
			</ModalHeader>

			<div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5" >
				<div 
					class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-3 " 
					v-for="(product, index) in addOnProducts" :key="index"
				>
					<div class="file box rounded-md pt-3 pb-5 px-3 sm:px-5 flex flex-wrap flex-col relative zoom-in items-center justify-center" >

						<a class="w-4/5 file__icon file__icon--image">
							<div class="file__icon--image__preview image-fit" v-if="product.image">
								<img :src="product.image"
								/>
							</div>
							<div class="file__icon--image__preview image-fit" v-else>
								<img :src="staticDir + `no_image.jpeg`"
								/>
							</div>
						</a>
						<div class="block font-medium text-center whitespace-normal break-normal w-full truncate">	
							{{ product.name }}
						</div>
						<div class="text-slate-500 text-sm text-center">
							{{store.orderDetail.campaign.currency}} 
							{{Math.floor(parseFloat(product.price) * (10 ** store.orderDetail.campaign.decimal_places)) / 10 ** store.orderDetail.campaign.decimal_places}}
							{{store.orderDetail.campaign.price_unit?$t(`global.price_unit.${store.orderDetail.campaign.price_unit}`):''}}
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
								@click="seller_add_item(product.id, index)"
							>
								{{$t('shopping_cart.add_item.add')}}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="invisible h-20"> ... </div>
		</ModalBody>
	</Modal>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
// import { buyer_list_campapign_product } from "@/api_v2/campaign_product";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useSellerOrderStore } from "@/stores/lss-seller-order";
import { seller_cart_add } from "@/api_v2/pre_order";
import { useRoute } from "vue-router";
import { useCookies } from 'vue3-cookies'
import i18n from "@/locales/i18n"

const { cookies } = useCookies()
const layoutStore = useLSSSellerLayoutStore();
const route = useRoute();
const store = useSellerOrderStore(); 	
const staticDir =  import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR;

const addOnProducts = ref([])
const addOnTitle = ref('select_add_ons')

onMounted(()=> {
	// if (route.query.tag && route.query.tag == 'openAddOn') {
	// 	store.showAddItemModal = true
	// 	addOnTitle.value = 'select_products'
	// }
	console.log(store.orderDetail.products)
	console.log(store.campaignProducts)
	updateAddOnProducts()
	
})

watch(computed(()=>store.campaignProducts),()=>{
	if (!(store.orderDetail.products||false))return
	updateAddOnProducts()
})

watch(computed(()=>store.orderDetail),()=>{
	if (!(store.orderDetail.products||false))return
	updateAddOnProducts()
})

const updateAddOnProducts = ()=>{
	let temp = []
	store.campaignProducts.forEach(product => {
		if(!(product.id.toString() in store.orderDetail.products)){
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
		layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_qty'))
	}
}   // minus after input works, plus after input not works


const seller_add_item = (campaing_product_id, index) => {
	seller_cart_add(route.params.order_id, campaing_product_id, addOnProducts.value[index].qty, layoutStore.alert)
	.then(
		res => {
			store.orderDetail = res.data
			layoutStore.notification.showMessageToast(i18n.global.t('shopping_cart.add_item_success'))
		}
	)
}
</script>
