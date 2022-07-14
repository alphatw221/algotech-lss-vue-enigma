<template>
<<<<<<< HEAD
	<div class="grid h-full grid-cols-12 gap-5 mt-5">
		
		<!-- <div class="col-span-12 col-start-1 2xl:col-span-6 xl:col-span-6 2xl:-mb-5 xl:-mb-5">
			<div class="flex">
				<label for="form-2" class="w-32 mt-2 mr-5 -mb-3 form-label">Campaign Title</label>
				<input id="form-2" type="text" class="form-control " v-model="campaignStore.campaignTitle.title" disabled/>
			</div>
		</div>

		<div class="col-span-12 -mb-5 2xl:col-span-6 xl:col-span-6">
			<div class="flex">
				<label for="regular-form-2" class="w-16 mt-2 -mb-2 form-label">Period</label>
				<v-date-picker class=" z-49" v-model="campaignStore.campaignPeriod" :timezone="timezone" mode="dateTime"
					:model-config="campaignConfig" is-range is-required
				>
					<template v-slot="{ inputValue, inputEvents }">
						<div class="flex items-center justify-center">
						<input :value="inputValue.start" v-on="inputEvents.start" disabled
							class="h-10 px-2 py-1 border rounded form-control w-42 focus:outline-none focus:border-indigo-300" />
						<ChevronsRightIcon class="w-8 h-8 m-1" />
						<input :value="inputValue.end" v-on="inputEvents.end" disabled
							class="h-10 px-2 py-1 border rounded form-control w-42 focus:outline-none focus:border-indigo-300" />
						</div>
					</template>
				</v-date-picker>
			</div>
		</div> -->
=======
	<div class="grid h-full grid-cols-12 gap-5 p-2 box lg:p-5">
>>>>>>> d053747c732e66b4b8612b6b39c49c1ff14c61a6

		<div class="col-span-12 p-0">
			<span class="z-0 text-2xl font-medium leading-none">{{ productPageTitle }}</span>
			<div>
				<div class="z-0 col-span-12 intro-y" >
					<div v-show="selectProduct">
						<SearchBar class="-mb-2" />
						<AssignProductTable />
					</div>
					<div v-show="comfirmProduct" class="mt-3">
						<ComfirmProductTable />
					</div>
				</div>
			</div>

			<template v-if="route.name === 'assign-product'">
				<div v-show="selectProduct" class="z-10 flex justify-end -mt-3">
					<button class="z-50 w-32 bg-white btn dark:border-darkmode-400" @click="router.push({ name: 'edit-campaign', params: {campaign_id: route.params.campaign_id} })">
						Previous
					</button>
					<button class="z-50 w-32 mx-5 shadow-md btn btn-primary" @click="toConfirmPage"> 
						Next
					</button>
				</div>
				<div v-show="comfirmProduct" class="z-10 flex justify-end -mt-3">
					<button class="z-50 w-32 bg-white btn dark:border-darkmode-400" @click="comfirmProduct=false, selectProduct=true">
						Edit
					</button>
<<<<<<< HEAD
					<button class="z-50 w-32 mx-5 shadow-md btn btn-primary" @click="assignProduct">
=======
					<button class="w-32 ml-5 shadow-md btn btn-primary" @click="eventBus.emit('confirmProducts')">
>>>>>>> d053747c732e66b4b8612b6b39c49c1ff14c61a6
						Assign
					</button>
				</div>
			</template>
			<template v-if="route.name === 'edit-campaign-product'">
				<div class="z-10 flex justify-end -mt-3">
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