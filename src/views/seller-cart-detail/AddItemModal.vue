<template>
	<Modal
	backdrop="static"
		size="modal-xl"
		:show="sellerCartStore.showAddItemModal"
		@hidden="sellerCartStore.showAddItemModal = false"
		:slideOver="true"
	>
		<ModalBody class="p-5 relative" >
			<a @click="sellerCartStore.showAddItemModal = !sellerCartStore.showAddItemModal" class="absolute right-0 top-0 mt-3 mr-3">
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
							{{campaignDetailStore.campaign?.currency}} 
							{{Math.floor(parseFloat(product.price) * (10 ** campaignDetailStore.campaign?.decimal_places)) / 10 ** campaignDetailStore.campaign?.decimal_places}}
							{{campaignDetailStore.campaign?.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign?.price_unit}`):''}}
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
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail"
// import { seller_cart_add } from "@/api_v2/pre_order";
import { seller_edit_cart_product } from "@/api_v2/cart"
import { useRoute } from "vue-router";
import { useCookies } from 'vue3-cookies'
import i18n from "@/locales/i18n"
import { useSellerCartStore } from "@/stores/lss-seller-cart";
const sellerCartStore = useSellerCartStore()
const campaignDetailStore = useCampaignDetailStore()
const { cookies } = useCookies()
const layoutStore = useLSSSellerLayoutStore();
const route = useRoute();

const staticDir =  import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR;

const addOnProducts = ref([])
const addOnTitle = ref('select_add_ons')

onMounted(()=> {
	updateAddOnProducts()
	
})

watch(computed(()=>campaignDetailStore.campaignProducts),()=>{
	if (!(sellerCartStore.cart.products||false))return
	updateAddOnProducts()
})

watch(computed(()=>sellerCartStore.cart),()=>{
	if (!(sellerCartStore.cart.products||false))return
	updateAddOnProducts()
})

const updateAddOnProducts = ()=>{
	addOnProducts.value = []
	campaignDetailStore.campaignProducts.forEach(product => {
		if(sellerCartStore.cart?.products && 
			!(product.id.toString() in sellerCartStore.cart.products) &&
			(product.qty_for_sale - product.qty_sold - product.qty_pending_payment  > 0 || product.oversell == true)
			
			){
			const _product = JSON.parse(JSON.stringify(product))
			_product.qty=1
			addOnProducts.value.push(_product)
		}
	});
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
	seller_edit_cart_product(route.params.cart_id, campaing_product_id, addOnProducts.value[index].qty, layoutStore.alert)
	.then(
		res => {
			sellerCartStore.cart = res.data
			layoutStore.notification.showMessageToast(i18n.global.t('shopping_cart.add_item_success'))
		}
	)
}
</script>
