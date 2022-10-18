<template>
	<!-- BEGIN title -->
	<div
		class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
		<h2 class="font-medium text-base mr-auto">
		{{$t('shopping_cart.table.cart')}} ({{computedNumOfItems}} {{$t('shopping_cart.table.items')}})  <span class="ml-1"> #{{shoppingCartStore.cart.id}}</span>
		</h2>
		<button class="border-none sm:flex underline" @click="switchToMyCartTab()">
		{{$t('shopping_cart.table.edit')}}
		</button>
	</div>
	<!-- END title -->

	<!-- BEGIN table -->
	<div v-if="shoppingCartStore.cart.products">
		<div class="p-5" v-for="(qty, campaign_product_id, index) in shoppingCartStore.cart.products" :key="index">

			<div class="relative flex items-center">
			<div class="w-12 h-12 flex-none image-fit" v-if="shoppingCartStore.campaignProductDict[campaign_product_id]?.image">
				<img alt="" class="rounded-md" :src="shoppingCartStore.campaignProductDict[campaign_product_id]?.image" />
			</div>
			<div class="w-12 h-12 flex-none image-fit" v-else>
				<img alt="" class="rounded-md" :src="staticDir+`no_image.jpeg`" />
			</div>
			<div class="ml-4 mr-auto w-[50%]">
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
