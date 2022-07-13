<template>
    <div class="flex flex-col gap-5 text-[16px]">
		<span class="mt-3 ml-5 text-xl sm:ml-0 sm:mt-5"> Create Campaign </span>
		<div class="grid grid-cols-12 gap-1 px-5 py-5 sm:p-8 intro-y box sm:gap-5 -z-50">
			<div class="col-span-12 col-start-1 sm:col-span-6">
				<div class="flex flex-col">
					<label class="w-20 my-auto text-base form-label">Title</label>
					<input 
						class="w-full form-control" 
						type="text" 
						:class="{ 'border-danger': title_validate.title.$error }"
						v-model.trim="title_validate.title.$model"
						@blur="title_validate.title.$touch" 
						/>
				</div>
				<template v-if="title_validate.title.$error">
					<label class="text-danger text-[14px] ml-2">
						Field is required
					</label>
				</template>
			</div>
			<div class="col-span-12 sm:col-span-6">
				<div class="flex flex-col">
					<label for="regular-form-2" class="w-16 my-auto text-base form-label">Period</label>
					<v-date-picker class="z-49" 
						v-model="dateTimePicker" 
						:timezone="timezone" 
						:columns="$screens({ default: 1, sm: 2 })" 
						mode="dateTime" is-range is-required
						:min-date='new Date()'
						>
						<template v-slot="{ inputValue, inputEvents }">
							<div class="flex items-center justify-center">
							<input :value="inputValue.start" v-on="inputEvents.start"
								class="form-control border h-[42px] px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
							<ChevronsRightIcon class="w-8 h-8 m-1" />
							<input :value="inputValue.end" v-on="inputEvents.end" disabled
								class="form-control border h-[42px] px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
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

		<div class="z-50 col-span-12 mr-8 -mt-20">
			<div class="col-span-12 flex justify-end mt-5 text-[#060607]">
				<button class="w-32 bg-white btn dark:border-darkmode-400" @click="$router.push({ name: 'campaign-list' })">
					Cancel
				</button>
				<button class="w-32 ml-5 shadow-md btn btn-primary" @click="createCampaign()">
					Next
				</button>
			</div>
		</div>
	</div>
</template>  

<script setup>
import { ref, watch, onMounted, computed, watchEffect } from 'vue';

import PaymentForm from './payment-form/Main.vue'
import DeliveryForm from './DeliveryForm.vue';
import NotesForm from './NotesForm.vue';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useRoute, useRouter } from "vue-router";
import { create_campaign, retrieve_campaign, update_campaign } from '@/api_v2/campaign';

import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";


const route = useRoute()
const router = useRouter()
const directPaymentImages = ref([])
const dateTimePicker = ref({
	start:new Date(),
	end:new Date()
})
const campaignData = ref({
	title:'',
	start_at:new Date(),
	end_at:new Date(),
	meta_logistic:{
		delivery_charge : 9999,
		is_free_delivery_for_order_above_price : false,
		free_delivery_for_order_above_price : 9999,
		is_free_delivery_for_how_many_order_minimum : false,
		free_delivery_for_how_many_order_minimum : 99,
		is_additional_delivery_charge : true,
		additional_delivery_options: [],
		pickup_options: [],
		delivery_note : 'example...'
	},
	meta_payment:{}
})

watch(computed(()=>dateTimePicker.value),()=>{
	campaignData.value.start_at = dateTimePicker.value.start
	campaignData.value.end_at = dateTimePicker.value.end
},{deep:true})

const sellerStore = useLSSSellerLayoutStore()
onMounted(() => {
	if(!sellerStore.userInfo.user_subscription)return
	campaignData.value.meta_logistic = sellerStore.userInfo.user_subscription.meta_logistic
	campaignData.value.meta_payment = sellerStore.userInfo.user_subscription.meta_payment
    
})

const title_rules = computed(() => {
	return { title: { required, minLength: minLength(1), maxLength: maxLength(255) } }
})
const title_validate = useVuelidate(title_rules, campaignData);

const createCampaign = ()=>{
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


	create_campaign(formData).then(response => {
		// console.log(response.data)
		router.push({name:'assign-product', params:{'campaign_id': response.data.id}})
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
