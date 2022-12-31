<template>
	<!-- BEGIN title -->
	<div class="flex flex-col box p-5 border-2 border-secondary "> 

	<div
		class="flex flex-row justify-between border-b border-slate-200/60 pb-1 dark:border-darkmode-400">
		<p>
		{{$t('shopping_cart.table.cart')}} ({{computedNumOfItems}} {{$t('shopping_cart.table.items')}})  <span class="ml-1"> #{{shoppingCartStore.cart.id}}</span>
		</p>
		<button class="border-none underline" @click="switchToMyCartTab()">
		{{$t('shopping_cart.table.edit')}}
		</button>
	</div>
	<!-- END title -->

	<!-- BEGIN table -->
	<template v-if="shoppingCartStore.cart.products">
		<div class="flex flex-col gap-4 mt-4"> 
			<div class="flex items-center" v-for="(qty, campaign_product_id, index) in shoppingCartStore.cart.products" :key="index">
				<div class="w-12 h-12 flex-none image-fit">
					<template v-if="shoppingCartStore.campaignProductDict[campaign_product_id]?.image"> 
						<img class="rounded-md" :src="shoppingCartStore.campaignProductDict[campaign_product_id]?.image" />
					</template>
					<template v-else> <img class="rounded-md" :src="staticDir+`no_image.jpeg`" /></template>
				</div>
				<div class="ml-4 mr-auto w-full">
					<div v-if="shoppingCartStore.campaignProductDict[campaign_product_id]?.type == 'lucky_draw'" class="text-primary font-medium"> *{{$t('lucky_draw.winner_modal.prize')}}* </div>
					<div class="font-medium text-primary whitespace-normal break-normal">{{shoppingCartStore.campaignProductDict[campaign_product_id]?.name}}</div>
					<div class="text-slate-500 mr-5 sm:mr-5">
					{{$t('shopping_cart.table.qty')}} : {{qty}}
					</div>
				</div>
				<div class="font-medium text-slate-600 dark:text-slate-500 whitespace-nowrap w-fit ml-5">
					{{shoppingCartStore.cart.campaign.currency}} 
					{{(Math.floor(parseFloat(qty * shoppingCartStore.campaignProductDict[campaign_product_id]?.price) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
					{{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
				</div>
			</div> 
		</div>
	</template>
</div>
	<!-- END table -->
</template>

<script setup>

import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";


const shoppingCartStore = useShoppingCartStore(); 
const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR


const computedNumOfItems = computed(()=>{
	if(shoppingCartStore.cart.products)return Object.keys(shoppingCartStore.cart.products).length
	return 0
})

const switchToMyCartTab = ()=>{
	shoppingCartStore.openTab=1
}

</script>

<style scoped>
p{ font-size: 16px;
}
</style>
