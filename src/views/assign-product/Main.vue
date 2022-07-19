<template>
	<div class="h-full gap-5 mt-5 flex flex-col p-0">
		<span class="z-0 text-xl sm:text-2xl mx-auto sm:mx-0 font-medium leading-none">{{ productPageTitle }}</span>
		<div class="z-0 intro-y" >
			<div v-show="selectProduct">
				<SearchBar class="-mb-2" />
				<AssignProductTable />
			</div>
			<div v-show="comfirmProduct">
				<ComfirmProductTable />
			</div>
			<template v-if="route.name === 'assign-product'">
				<div v-show="selectProduct" class="z-10 flex justify-end mt-5">
					<button class="z-50 w-32 bg-white btn dark:border-darkmode-400" @click="router.push({ name: 'edit-campaign', params: {campaign_id: route.params.campaign_id} })">
						Previous
					</button>
					<button class="z-50 w-32 mx-5 shadow-md btn btn-primary" @click="toConfirmPage"> 
						Next
					</button>
				</div>
				<div v-show="comfirmProduct" class="z-10 flex justify-end mt-5">
					<button class="z-50 w-32 bg-white btn dark:border-darkmode-400" @click="comfirmProduct=false, selectProduct=true">
						Edit
					</button>
					<button class="z-50 w-32 mx-5 shadow-md btn btn-primary" @click="eventBus.emit('confirmProducts')">
						Assign
					</button>
				</div>
			</template>
			<template v-if="route.name === 'edit-campaign-product'">
				<div class="z-10 flex justify-end mt-5">
					<button class="z-50 w-32 mx-5 shadow-md btn btn-primary" @click="router.push({ name: 'campaign-list' })">
						Save
					</button>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, computed } from "vue";
import { useCreateCampaignStore } from "@/stores/lss-create-campaign";
import { useRoute, useRouter } from "vue-router";
import SearchBar from "./SearchBar.vue";
import AssignProductTable from "./AssignProductTable.vue";
import ComfirmProductTable from "./ComfirmProductTable.vue";
import { seller_create_campaign_products } from "@/api_v2/campaign_product";

const route = useRoute();
const router = useRouter();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const campaignStore = useCreateCampaignStore(); 
const selectProduct = ref(true);
const comfirmProduct = ref(false);
const productPageTitle = computed(() => {
	if (route.name === 'edit-campaign-product') return 'Edit Products'
	else if (route.name === 'assign-product') {
		if (selectProduct.value == true) return 'Assign Products'
		if (comfirmProduct.value == true) return 'Confirm Products'
	}
})

const toConfirmPage = () => {
	selectProduct.value = false
	comfirmProduct.value = true
	eventBus.emit('addProducts')
}

</script>