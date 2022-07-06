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
					<label for="regular-form-2" class="form-label -mb-2 w-16 mt-2 text-base">Period</label>
					<v-date-picker class=" z-49" v-model="campaignStore.campaignPeriod" :timezone="timezone" mode="dateTime" is-range is-required>
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
			<template v-if="title_validate.title.$error">
				<label class="text-danger 2xl:col-start-2 xl:col-start-2 col-span-12 2xl:col-span-6 xl:col-span-6 mt-2 mb-3">
					Please enter Campaign title
				</label>
			</template>
		</div>

		<DeliveryForm class="col-span-12" />

		<PaymentForm class="col-span-12" />

		<NotesForm />

		<div class="mt-5 p-0 col-span-12 z-0">
			<div class="col-span-12 flex justify-end mt-5 text-[#060607]">
				<button class="btn btn-rounded-secondary w-24 mr-2 mb-2" @click="this.$router.push({ name: 'campaigns' })">
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

