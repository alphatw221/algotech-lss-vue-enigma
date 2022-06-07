<template>
	<!-- BEGIN title -->
	<div
		class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
		<h2 class="font-medium text-base mr-auto">
		My Cart ({{numOfItems}} Items)
		</h2>
		<button class="border-none hidden sm:flex underline" @click="switchToMyCartTab()">
		Edit
		</button>
	</div>
	<!-- END title -->

	<!-- BEGIN table -->
	<div v-if="store.order.products">
		<div class="p-5" v-for="(product, key) in store.order.products" :key="key">

			<div class="relative flex items-center">
			<div class="w-12 h-12 flex-none image-fit">
				<img alt="" class="rounded-md" :src="storageUrl+product.image" />
			</div>
			<div class="ml-4 mr-auto">
				<a class="font-medium">{{product.name}}</a>
				<div class="text-slate-500 mr-5 sm:mr-5">
				Quantity {{product.qty}}
				</div>
			</div>
			<div class="font-medium text-slate-600 dark:text-slate-500">
				USD {{ product.qty * product.price }}
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
