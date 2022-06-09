<template>
	<div class="grid grid-cols-12 box p-5 mt-5 gap-2">
		<span class="col-start-1 col-span-12 text-2xl font-medium leading-none mb-2 mt-3">Create Campaign</span>
		
		<div class="col-start-1 col-span-12 2xl:col-span-6 xl:col-span-6  2xl:-mb-5 xl:-mb-5">
			<div class="flex">
				<label for="form-2" class="form-label -mb-3 mr-5 w-32 mt-2">Campaign Title</label>
				<input id="form-2" type="text" class="form-control form-control-rounded" v-model="campaignTitle"/>
			</div>
		</div>

		<div class="col-span-12 -mb-5 2xl:col-span-6 xl:col-span-6">
			<div class="flex">
				<label for="regular-form-2" class="form-label -mb-2 w-16 mt-2">Period</label>
				<v-date-picker class=" z-50" v-model="campaignPeriod" :timezone="timezone" mode="dateTime"
					:model-config="campaignConfig" is-range is-required
				>
					<template v-slot="{ inputValue, inputEvents }">
						<div class="flex justify-center items-center">
						<input :value="inputValue.start" v-on="inputEvents.start"
							class="form-control border h-10 px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
						<ChevronsRightIcon class="w-8 h-8 m-1" />
						<input :value="inputValue.end" v-on="inputEvents.end" disabled
							class="form-control border h-10 px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
						</div>
					</template>
				</v-date-picker>
			</div>
		</div>

		<div class="box mt-5 p-5 col-span-12">
			<span class="text-2xl font-medium leading-none mb-3">{{ productPageTitle }}</span>
			<div>
				<div class="overflow-x-auto intro-y col-span-12" >
					<div v-show="selectProduct">
						<SearchBar class="-mb-8" />
						<AssignProductTable />
					</div>
					<div v-show="comfirmProduct">
						<ComfirmProductTable />
					</div>
				</div>
			</div>

			<div v-show="selectProduct" class="flex justify-end mt-5 -mb-5">
				<button class="btn btn-outline-primary mr-5" @click="this.$router.back()">
					Cancel
				</button>
				<button class="btn btn-outline-primary" @click="toConfirmPage"> 
					Next
				</button>
			</div>

			<div v-show="comfirmProduct" class="flex justify-end mt-5 -mb-5">
				<button class="btn btn-outline-primary mr-5" @click="comfirmProduct = false, selectProduct = true">
					Edit
				</button>
				<button class="btn btn-outline-primary" @click="this.$router.push('create-campaign/details')">
					Next
				</button>
			</div>
		</div>
		<div style="font-size:18px;">{{ test }}</div>
	</div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, computed } from "vue";
import { useCreateCampaignStore } from "@/stores/lss-create-campaign";
import SearchBar from "./SearchBar.vue";
import AssignProductTable from "./AssignProductTable.vue";
import ComfirmProductTable from "./ComfirmProductTable.vue";

const internalInstance = getCurrentInstance();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const campaignStore = useCreateCampaignStore(); 
const categorySelection = ref([])
const campaignTitle = ref('')
const selectProduct = ref(true);
const comfirmProduct = ref(false);

const campaignPeriod = ref({
	start: new Date(),
	end: new Date(),
})
const campaignConfig = ref({
	start: { timeAdjust: '' },
	end: { timeAdjust: '' }
})

onMounted(() => {
	
})

const productPageTitle = computed(() => {
	if (selectProduct.value == true) return 'Assign Products'
	else if (comfirmProduct.value == true) return 'Confirm Products'
})

const toConfirmPage = () => {
	selectProduct.value = false
	comfirmProduct.value = true
	eventBus.emit('addProducts')

	campaignStore.campaignPeriod = campaignPeriod.value
	campaignStore.campaignTitle = campaignTitle.value
	console.log(campaignStore)
}

</script>