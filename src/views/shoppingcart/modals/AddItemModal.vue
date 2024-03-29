<template>
	<Modal
		size="modal-xl"
		:show="shoppingCartStore.showAddItemModal"
		@hidden="shoppingCartStore.showAddItemModal = false"
		:slideOver="true"
	>
		<ModalBody class="p-5 relative min-h-[100vh]" >
			<a @click="shoppingCartStore.showAddItemModal = !shoppingCartStore.showAddItemModal" class="absolute right-0 top-0 mt-3 mr-3">
                <XIcon class="w-8 h-8 text-slate-400" />
            	</a>
			<ModalHeader>
				<h2 class="font-medium text-base mr-auto">
					{{ $t(`shopping_cart.add_item.`+addOnTitle) }}
				</h2>
			</ModalHeader>
			<template v-if="addOnProducts.length ==0" >
				<p class="top-1/2 right-1/2 absolute translate-x-1/2 text-[16px] text-slate-500"> {{ $t(`shopping_cart.add_item.out_of_stock`) }}  </p>
			</template>
			<div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5 relative" >
				<template v-for="(product, index) in addOnProducts" :key="index"> 
					<div 
						class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-3" 
						v-if="product.product != null || (product.qty_for_sale - product.qty_sold> 0) || product.oversell == true " 
					>
						<div
							class="file h-full flex flex-col box rounded-md pt-3 pb-5 px-3 sm:px-5 flex-wrap relative zoom-in items-center justify-center" >

							<!-- <template v-if="!['',null,undefined,' '].includes(product.description)">  -->
								<EyeIcon class="bg-primary opacity-30 rounded-full text-white w-7 h-7 font-bold absolute top-2 right-2 p-1 z-50 hover:opacity-80" @click="openDescription(product)" />
								<a class="w-4/5 file__icon file__icon--image absolute">
									<div class="file__icon--image__preview image-fit" v-if="product.image">
										<img :src="product.image"
										/>
									</div>
									<div class="file__icon--image__preview image-fit" v-else>
										<img :src="staticDir + `no_image.jpeg`"
										/>
									</div>
									<!-- <div class="absolute z-50 bottom-0 bg-primary left-[50%] -translate-x-1/2 border-[1.5px] rounded-b-[5px] border-primary text-center tracking-wide font-medium w-full text-white">	
									{{product.order_code}}
								</div> -->
								</a>
								<div class="block font-medium mt-2 text-center whitespace-normal break-normal w-full truncate">	
									{{ product.name }}   
								</div>
								<div class="border-[1.5px] rounded-[5px] mx-auto h-fit border-orange-400 text-center font-medium w-fit px-3 text-orange-600 mt-[2px] mb-[3px]">	
									{{product.order_code}}
								</div>
								
								<div class="text-slate-500 text-sm text-center">
									{{shoppingCartStore.cart.campaign.currency}} 
									{{(Math.floor(parseFloat(product.price) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
									{{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
								</div>
							<div v-if="product.qty_for_sale - product.qty_sold - product.qty_pending_payment  > 0 || product.oversell == true" class="flex mb-2"> 
								<button type="button" @click="changeQuantity(null, index, 'minus')">
									<MinusSquareIcon class="w-5 h-5 mt-2 mr-2" />
								</button>
								<input 
									type="text"
									class="form-control" 
									placeholder="Input inline 1" 
									aria-label="default input"
									v-model="product.qty"
									style="width: 2.7rem; height: 2rem; margin-top: 5px;"
								/>
								<button type="button" @click="changeQuantity(null, index, 'add')">
									<PlusSquareIcon class="w-5 h-5 mt-2 ml-2" />
								</button>
							</div>
							<template v-if="product.qty_for_sale - product.qty_sold - product.qty_pending_payment  > 0 || product.oversell == true">
								<button 
									class="btn btn-sm btn-primary w-24 mt-auto"
									@click="buyerAddItem(product, index)"
								>
									{{$t('shopping_cart.add_item.add')}}
								</button>
							</template>
							<template v-else> 
								<button 
									class="btn btn-sm bg-green-700 w-24 mt-auto text-white"
									@click="add_to_wishlist(product)"
								>
									{{$t('shopping_cart.add_item.wishlist')}}
								</button>
							</template>
						</div>
					</div>
				</template>
			</div>
			<div class="invisible h-20"> ... </div>
		</ModalBody>
	</Modal>
</template>

<script setup>
import { computed, onMounted, ref, watch, getCurrentInstance } from "vue";

import { buyer_edit_cart_product } from "@/api_v2/cart"
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";

import { useRoute } from "vue-router";
import { useCookies } from 'vue3-cookies'
import i18n from "@/locales/i18n"

const { cookies } = useCookies()
const layoutStore = useLSSBuyerLayoutStore();
const route = useRoute();
const shoppingCartStore = useShoppingCartStore(); 	
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const staticDir =  import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR;

const addOnProducts = ref([])
const addOnTitle = ref('select_add_ons')

const isAnonymousUser=cookies.get("login_with")=='anonymousUser'

onMounted(()=> {
	if (route.query.tag && route.query.tag == 'openAddOn') {
		shoppingCartStore.showAddItemModal = true
		addOnTitle.value = 'select_products'
	}
})

watch(computed(()=>shoppingCartStore.campaignProducts),()=>{
	// console.log(shoppingCartStore.campaignProducts)
	if (!(shoppingCartStore.cart.products||false))return
	updateAddOnProducts()
})

watch(computed(()=>shoppingCartStore.cart),()=>{
	if (!(shoppingCartStore.cart.products||false))return
	updateAddOnProducts()
})

const updateAddOnProducts = ()=>{
	let temp = []
	shoppingCartStore.campaignProducts.forEach(product => {
		if(!(product.id.toString() in shoppingCartStore.cart.products) && product.type!='lucky_draw'  && product.active){
			product.qty=1
			temp.push(product)
		}
	});
	addOnProducts.value = temp
	if(addOnProducts.value.length == 0) shoppingCartStore.showAddItemModal = false
}

const changeQuantity = (event, index, operation) => {
	if (operation == 'add' && addOnProducts.value[index].qty < 99) {
		addOnProducts.value[index].qty += 1
	} 
	else if (operation == 'minus' && addOnProducts.value[index].qty > 1) {
		addOnProducts.value[index].qty -= 1
	} 
	else{
		layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_qty'))
	}
}   

const checkQuantityValid = (index) => {
	if (1 <= addOnProducts.value[index].qty && addOnProducts.value[index].qty <= 99) return true 
	return false
}   

const buyerAddItem = (product, index) => {

	if(!checkQuantityValid(index)){
		addOnProducts.value[index].qty = 1
		layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_qty'))
		return
	}

	buyer_edit_cart_product(route.params.cart_oid, product.id, addOnProducts.value[index].qty, layoutStore.alert)
	.then(
		res => {
			shoppingCartStore.cart = res.data
			layoutStore.notification.showMessageToast(i18n.global.t('shopping_cart.add_item_success'))
		}
	)
}

const add_to_wishlist = (product)=>{eventBus.emit('showWishlistModal',product)}
const openDescription = (product)=>{eventBus.emit('showDescriptionModal',product)}
</script>
