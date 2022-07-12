<template>
    <div class="py-5 box lg:p-10 2xl:p-10">
		<div class="grid grid-cols-12 gap-1 ml-3 box intro-y lg:gap-5 2xl:gap-5 -z-50">
			<span class="col-span-12 col-start-1 mt-3 mb-2 text-2xl font-medium leading-none">
				Create Campaign
			</span>
			<div class="col-span-12 col-start-1 2xl:col-span-6 xl:col-span-6 2xl:-mb-5 xl:-mb-5">
				<div class="flex">
					<label class="w-32 mt-2 -mb-3 text-base form-label">Title</label>
					<input 
						class="form-control " 
						type="text" 
						:class="{ 'border-danger': title_validate.title.$error }"
						v-model.trim="title_validate.title.$model"
						@blur="title_validate.title.$touch" 
					/>
					
				</div>
			</div>
			<div class="col-span-12 -mb-5 2xl:col-span-6 xl:col-span-6">
				<div class="flex">
					<label for="regular-form-2" class="w-16 mt-2 -mb-2 text-base form-label">Period</label>
					<v-date-picker class=" z-49" v-model="campaignStore.campaignPeriod" :timezone="timezone" mode="dateTime" is-range is-required>
						<template v-slot="{ inputValue, inputEvents }">
							<div class="flex items-center justify-center">
							<input :value="inputValue.start" v-on="inputEvents.start"
								class="h-10 px-2 py-1 border rounded form-control w-42 focus:outline-none focus:border-indigo-300" />
							<ChevronsRightIcon class="w-8 h-8 m-1" />
							<input :value="inputValue.end" v-on="inputEvents.end" disabled
								class="h-10 px-2 py-1 border rounded form-control w-42 focus:outline-none focus:border-indigo-300" />
							</div>
						</template>
					</v-date-picker>
				</div>
			</div>
			<template v-if="title_validate.title.$error">
				<label class="col-span-12 mt-2 mb-3 text-danger 2xl:col-start-2 xl:col-start-2 2xl:col-span-6 xl:col-span-6">
					Please enter Campaign title
				</label>
			</template>
		</div>

		<DeliveryForm class="col-span-12" />

		<PaymentForm class="col-span-12" />

		<NotesForm />

		<div class="z-0 col-span-12 p-0 mt-5">
			<div class="col-span-12 flex justify-end mt-5 text-[#060607]">
				<button class="w-24 mb-2 mr-2 btn btn-rounded-secondary" @click="this.$router.push({ name: 'campaign-list' })">
					Cancel
				</button>
				<button class="w-24 mb-2 mr-1 btn btn-rounded-primary" @click="saveCampaign">
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
import NotesForm from './NotesForm.vue';
import { useCreateCampaignStore } from '@/stores/lss-create-campaign';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useRoute, useRouter } from "vue-router";
import { create_campaign } from '@/api_v2/campaign';

import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";


const router = useRouter()
const layoutStore = useLSSSellerLayoutStore()
const campaignStore = useCreateCampaignStore()
const campaignTitle = ref({ title: '' })
const campaignPeriod = ref({
	start: new Date(),
	end: new Date(),
})

// watch(campaignTitle, () => { campaignStore.campaignTitle = campaignTitle.value.title }, { deep: true})
// watch(campaignPeriod, () => { campaignStore.campaignPeriod = campaignPeriod.value }, { deep: true})

const title_rules = computed(() => {
	return { title: { required, minLength: minLength(1), maxLength: maxLength(255) } }
})
const title_validate = useVuelidate(title_rules, campaignStore.campaignTitle);

const saveCampaign = () => {
	title_validate.value.$touch()
	if (title_validate.value.$invalid) {
		layoutStore.alert.showMessageToast("Invalid campaign title input")
		return
	}

	let formData = new FormData()
	campaignStore.deliverySettings.delivery_note = campaignStore.notes.delivery_note
	campaignStore.paymentSettings.confirmation_note = campaignStore.notes.confirmation_note
	campaignStore.paymentSettings.special_note = campaignStore.notes.special_note
	formData.append('campaignTitle', JSON.stringify(campaignStore.campaignTitle.title))
	formData.append('campaignPeriod', JSON.stringify(campaignStore.campaignPeriod))
	formData.append('deliverySettings', JSON.stringify(campaignStore.deliverySettings))
	formData.append('paymentSettings', JSON.stringify(campaignStore.paymentSettings))

	for (let [key, value] of Object.entries(campaignStore.imageDirectPayment)) {
		formData.append(key, value)
	}

	create_campaign(formData).then(response => {
        let campaign_id = response.data
		router.push({name:'assign-product',params:{'campaign_id':campaign_id}})
    }).catch(err => {
		console.log('api error')
	})
}

</script>

