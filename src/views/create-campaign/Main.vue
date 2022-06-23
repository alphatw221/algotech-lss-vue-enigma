<template>
    <div class="box py-5 lg:p-10 2xl:p-10">
		<div class="box intro-y grid grid-cols-12 gap-1 lg:gap-5 2xl:gap-5 -z-50 ml-3">
			<span class="col-start-1 col-span-12 text-2xl font-medium leading-none mb-2 mt-3">
				Create Campaign
			</span>
			<div class="col-start-1 col-span-12 2xl:col-span-6 xl:col-span-6 2xl:-mb-5 xl:-mb-5">
				<div class="flex">
					<label class="form-label -mb-3 w-32 mt-2 text-base">Title</label>
					<input 
						class="form-control form-control-rounded" 
						type="text" 
						:class="{ 'border-danger': title_validate.campaignTitle.$error }"
						v-model.trim="title_validate.campaignTitle.$model"
						@blur="title_validate.campaignTitle.$touch" 
					/>
					
				</div>
			</div>
			<div class="col-span-12 -mb-5 2xl:col-span-6 xl:col-span-6">
				<div class="flex">
					<label for="regular-form-2" class="form-label -mb-2 w-16 mt-2 text-base">Period</label>
					<v-date-picker class=" z-49" v-model="campaignPeriod" :timezone="timezone" mode="dateTime"
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
			<template v-if="title_validate.campaignTitle.$error">
				<label class="text-danger 2xl:col-start-2 xl:col-start-2 col-span-12 2xl:col-span-6 xl:col-span-6 mt-2 mb-3">
					Please enter Campaign title
				</label>
			</template>
		</div>

		<DeliveryForm class="col-span-12" />
		
		<div class="col-start-1 col-span-12 2xl:col-span-6 xl:col-span-6  2xl:-mb-5 xl:-mb-5">
			<div class="flex">
				<label for="form-2" class="form-label -mb-3 mr-5 w-32 mt-2">Campaign Title</label>
				<input id="form-2" type="text" class="form-control form-control-rounded" v-model="campaignTitle" />
			</div>
		</div>

		<div class="col-span-12 -mb-5 2xl:col-span-6 xl:col-span-6">
			<div class="flex">
				<label for="regular-form-2" class="form-label -mb-2 w-16 mt-2">Period</label>
				<v-date-picker class=" z-49" v-model="campaignPeriod" :timezone="timezone" mode="dateTime"
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

		<div class="mt-5 p-0 col-span-12 z-0">
		<PaymentForm class="col-span-12" />
		<!-- <div class="mt-5 p-0 col-span-12 z-0 lg:pl-5 2xl:pl-5">
			<span class="text-2xl font-medium leading-none mb-3">{{ productPageTitle }}</span>
			<div>
				<div class="intro-y col-span-12" >
					<div v-show="selectProduct">
						<SearchBar class="-mb-3" />
						<AssignProductTable />
					</div>
					<div v-show="comfirmProduct">
						<ComfirmProductTable />
					</div>
				</div>
			</div> -->

		<div class="box px-5 lg:p-5 2xl:p-5 intro-y grid grid-cols-12 gap-1 lg:gap-5 2xl:gap-5 -z-50 mt-3">
			<label class="col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2 text-base">Delivery note</label>
			<textarea 
				class="col-span-9 p-1" 
				v-model="campaignStore.notes.delivery_note"
			/>
			<label class="col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2 text-base">Special note</label>
			<textarea 
				class="col-span-9 p-1" 
				v-model="campaignStore.notes.special_note"
			/>
			<label class="col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2 text-base">Confirmation note</label>
			<textarea 
				class="col-span-9 p-1" 
				v-model="campaignStore.notes.confirmation_note"
			/>
		</div>

		<div class="col-span-12 flex justify-end mt-5 text-[#060607]">
			<button class="btn btn-rounded-secondary w-24 mr-2 mb-2">
				Cancel
			</button>
			<button class="btn btn-rounded-primary w-24 mr-1 mb-2" @click="saveCampaign">
				Next
			</button>
		</div>
		</div>
	</div>
</template>  

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import PaymentForm from './PaymentForm.vue';
import DeliveryForm from './DeliveryForm.vue';
import { useCreateCampaignStore } from '@/stores/lss-create-campaign';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { create_campaign } from '@/api_v2/campaign';
import { get_notes } from '@/api_v2/user_subscription';

import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";


const layoutStore = useLSSSellerLayoutStore();
const campaignStore = useCreateCampaignStore()
const campaignTitle = ref('')
const campaignPeriod = ref({
	start: new Date(),
	end: new Date(),
})
const deliveryNote = ref('')
const specialNote = ref('')
const confirmationNote = ref('')

onMounted(() => {
	list()
})

watch(campaignTitle, () => { campaignStore.campaignTitle = campaignTitle.value })
watch(campaignPeriod, () => { campaignStore.campaignPeriod = campaignPeriod.value }, { deep: true})

const list = () => {
    get_notes().then(response => {
		campaignStore.notes.delivery_note = response.data.delivery_note
		campaignStore.notes.special_note = response.data.special_note
		campaignStore.notes.confirmation_note = response.data.confirmation_note
    })
}

const title_rules = computed(() => {
	return { campaignTitle: { required, minLength: minLength(1), maxLength: maxLength(255) } }
})
const title_validate = useVuelidate(title_rules, campaignTitle);

const saveCampaign = () => {
	title_validate.value.$touch()
	if (title_validate.value.$invalid) {
		layoutStore.alert.showMessageToast("Invild campaign title input")
		return
	}

	let formData = new FormData()
	formData.append('campaignTitle', JSON.stringify(campaignStore.campaignTitle))
	formData.append('campaignPeriod', JSON.stringify(campaignStore.campaignPeriod))
	formData.append('deliverySettings', JSON.stringify(campaignStore.deliverySettings))
	formData.append('paymentSettings', JSON.stringify(campaignStore.paymentSettings))
	formData.append('notes', JSON.stringify(campaignStore.notes))

	for (let [key, value] of Object.entries(campaignStore.imageDirectPayment)) {
		formData.append(key, value)
	}

	create_campaign(formData).then(response => {
        console.log(response.data)
    })
}

</script>

