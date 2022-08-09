<template>
	<!-- BEGIN title -->
	<div
		class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
		<h2 class="font-medium text-base mr-auto">
		{{$t('shopping_cart.table.cart')}} ({{numOfItems}} {{$t('shopping_cart.table.items')}})  <span class="ml-1"> #{{store.order.id}}</span>
		</h2>
		<button class="border-none sm:flex underline" @click="switchToMyCartTab()">
		{{$t('shopping_cart.table.edit')}}
		</button>
	</div>
	<!-- END title -->

	<!-- BEGIN table -->
	<div v-if="store.order.products">
		<div class="p-5" v-for="(product, key) in store.order.products" :key="key">

			<div class="relative flex items-center">
			<div class="w-12 h-12 flex-none image-fit" v-if="product.image">
				<img alt="" class="rounded-md" :src="storageUrl+product.image" />
			</div>
			<div class="w-12 h-12 flex-none image-fit" v-else>
				<img alt="" class="rounded-md" :src="storageUrl+`no_image.jpeg`" />
			</div>
			<div class="ml-4 mr-auto w-[50%]">
				<div class="font-medium text-cyan-900 whitespace-normal break-normal">{{product.name}}</div>
				<div class="text-slate-500 mr-5 sm:mr-5">
				{{$t('shopping_cart.table.qty')}} : {{product.qty}}
				</div>
			</div>
			<div class="font-medium text-slate-600 dark:text-slate-500 whitespace-nowrap w-fit ml-5">
				{{store.order.campaign.currency}} 
				{{Math.floor(parseFloat(product.qty * product.price) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
				{{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}
			</div>
			</div> 

		</div>
	</div>
	<!-- END table -->
</template>

<script setup>

import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";


const store = useShoppingCartStore(); 
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL


const numOfItems = computed(()=>{
	if(store.order.products)return Object.keys(store.order.products).length
	return 0
})

const switchToMyCartTab = ()=>{
	store.openTab=1
}

</script>
