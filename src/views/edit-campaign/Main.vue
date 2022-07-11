<template>
    <div class="box p-5 flex flex-col gap-5 text-[16px]" v-if="ready">
		<span class="mt-5 text-xl"> Edit Campaign </span>
		<div class="grid grid-cols-12 gap-1 ml-3 intro-y sm:gap-5 -z-50">
		<div class="col-span-12 col-start-1 2xl:col-span-6 xl:col-span-6">
			<div class="flex flex-col">
				<div class="flex">
					<label class="w-20 my-auto text-base form-label">Title</label>
					<input 
						class="form-control h-10 w-full sm:w-[50%]"
						type="text" 
						:class="{ 'border-danger': title_validate.title.$error }"
						v-model.trim="title_validate.title.$model"
						@blur="title_validate.title.$touch" 
						/> 
				</div> 
				<template v-if="title_validate.title.$error">
					<label class="text-danger text-[14px] ml-20">
						Field is required
					</label>
				</template> 
			</div>
		</div>
			<div class="col-span-12 -mb-5 2xl:col-span-6 xl:col-span-6">
				<div class="flex flex-col sm:flex-row">
					<label for="regular-form-2" class="w-16 my-auto text-base form-label">Period</label>
					<v-date-picker class=" z-49" v-model="dateTimePicker" :timezone="''" mode="dateTime" :columns="$screens({ default: 1, sm: 2 })" is-range is-required :min-date='new Date()'>
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
		</div>

		<DeliveryForm 
			:campaign="campaignData"
		/>

		<PaymentForm 
			:campaign="campaignData"
			:directPaymentImages="directPaymentImages"
		/>

		<NotesForm :campaign="campaignData"/>

		<div class="z-0 col-span-12 p-0 mt-5">
			<div class="col-span-12 flex justify-end mt-5 text-[#060607]">
				<button class="w-24 mb-2 mr-2 btn btn-rounded-secondary" @click="$router.push({ name: 'campaign-list' })">
					Cancel
				</button>
				<button class="w-24 mb-2 mr-1 btn btn-rounded-primary" @click="updateCampaign()">
					Update
				</button>
			</div>
		</div>
	</div>
</template>  

<script setup>
import { ref, watch, onMounted, computed, watchEffect } from 'vue';

import PaymentForm from '@/views/create-campaign/payment-form/Main.vue'
import DeliveryForm from '@/views/create-campaign/DeliveryForm.vue';
import NotesForm from '@/views/create-campaign/NotesForm.vue';

import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useRoute, useRouter } from "vue-router";
import { retrieve_campaign, update_campaign } from '@/api_v2/campaign';

import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";


const route = useRoute()
const router = useRouter()
const directPaymentImages = ref([])
const campaignData = ref({})
const dateTimePicker = ref({
	start:new Date(),
	end:new Date()
})


const sellerStore = useLSSSellerLayoutStore()
const ready = ref(false)
onMounted(() => {
	retrieve_campaign(route.params.campaign_id).then(res=>{
		console.log(res.data)
		campaignData.value = res.data

		dateTimePicker.value.start=res.data.start_at
		dateTimePicker.value.end=res.data.end_at

		ready.value=true
	})
})
watch(computed(()=>{return dateTimePicker.value}),()=>{
	campaignData.value.start_at = dateTimePicker.value.start
	campaignData.value.end_at = dateTimePicker.value.end
},{deep:true})

// new Date(campaign.end_at).toLocaleTimeString('en-us', {
//                 year: "numeric", month: "short",
//                 day: "numeric", hour: '2-digit', minute: '2-digit'
//               }

const title_rules = computed(() => {
	return { title: { required, minLength: minLength(1), maxLength: maxLength(255) } }
})
const title_validate = useVuelidate(title_rules, campaignData);

const updateCampaign = ()=>{


	title_validate.value.$touch()
	if (title_validate.value.$invalid) {
		sellerStore.alert.showMessageToast("Invalid campaign title input")
		return
	}


	let formData = new FormData()
	formData.append('data', JSON.stringify(campaignData.value))
	
	directPaymentImages.value.forEach( (image,index) => {
		const key = campaignData.value.meta_payment.direct_payment.v2_accounts[index].name+'_'+index   
		formData.append(key,image)
	});


	update_campaign(route.params.campaign_id,formData).then(response => {

		router.push({name:'edit-campaign-product', params:{'campaign_id': response.data.id}})
	})

}


// const saveCampaign = () => {
// 	title_validate.value.$touch()
// 	if (title_validate.value.$invalid) {
// 		sellerStore.alert.showMessageToast("Invalid campaign title input")
// 		return
// 	}

// 	let formData = new FormData()
// 	formData.append('campaignTitle', JSON.stringify(campaignStore.campaignTitle.title))
// 	formData.append('campaignPeriod', JSON.stringify(campaignStore.campaignPeriod))
// 	formData.append('deliverySettings', JSON.stringify(campaignStore.deliverySettings))
// 	formData.append('paymentSettings', JSON.stringify(campaignStore.paymentSettings))
// 	for (let [key, value] of Object.entries(campaignStore.imageDirectPayment)) {
// 		formData.append(key, value)
// 	}

// 	if (route.name === 'create-campaign') {
// 		create_campaign(formData).then(response => {
// 			let campaign_id = response.data
// 			router.push({name:'assign-product', params:{'campaign_id': response.data.id}})
// 		}).catch(err => {
// 			console.log('api error')
// 		})
// 	} else if (route.name === 'edit-campaign') {
// 		update_campaign(route.params.campaign_id, formData).then(response => {
// 			router.push({name:'edit-campaign-product', params: {'campaign_id': route.params.campaign_id}})
// 			// router.push(`/seller/campaign/assign/product?campaign_id=${route.params.campaign_id}&type=edit`)
// 		})
// 	}
	
// }

</script>
