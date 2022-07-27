<template>
    <div class="flex flex-col h-[100%] text-[16px]">
		<div class="flex items-center sm:px-20 pt-2 pb-4 intro-y">
			<h2 class="text-xl sm:text-2xl font-medium mx-auto sm:mx-0">{{$t('create_campaign.create_campaign')}}</h2>
		</div>
		<div class="box grid grid-cols-12 gap-4 p-5 intro-y lg:mx-20 lg:px-40">
    <!-- <div class="flex flex-col gap-5 text-[16px] h-fit">
		<span class="mt-3 ml-5 text-xl sm:ml-0 sm:mt-5"> Create Campaign </span>
		<div class="grid grid-cols-12 gap-1 px-5 py-5 sm:p-8 intro-y box sm:gap-5 -z-50"> -->
			<div class="col-span-12 col-start-1 sm:col-span-6">
				<div class="flex flex-col">
					<label class="w-20 my-auto text-base form-label font-medium">{{$t('create_campaign.title')}}</label>
					<input 
						class="w-full form-control" 
						type="text" 
						:class="{ 'border-danger': v.title.$error }"
						v-model.trim="v.title.$model"
						@blur="v.title.$touch" 
						/>
				</div>
				<template v-if="v.title.$error">
					<label class="text-danger text-[14px] ml-2">
						{{$t('create_campaign.title_required')}}
					</label>
				</template>
			</div>
			<div class="col-span-12 sm:col-span-6">
				<div class="flex flex-col">
					<label for="regular-form-2" class="w-16 my-auto text-base form-label font-medium">{{$t('create_campaign.period')}}</label>
					<v-date-picker class="z-49" 
						v-model="dateTimePicker" 
						:timezone="timezone" 
						:columns="$screens({ default: 1, sm: 2 })" 
						mode="dateTime" is-range is-required is24hr
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
			:v="v"
		/>

		<PaymentForm 

			:campaign="campaignData"
			:directPaymentImages="directPaymentImages"
			:v="v"
		/>

		<NotesForm :campaignNotes="campaignNotes" />

		<div class="box z-50 col-span-12 flex justify-end -mt-8 lg:mx-20 lg:px-40 py-10">
			<button class="w-32 bg-white btn dark:border-darkmode-400" @click="$router.push({ name: 'campaign-list' })">
				{{$t('create_campaign.cancel')}}
			</button>
			<button class="w-32 ml-5 mr-4 shadow-md btn btn-primary" @click="createCampaign()">
				{{$t('create_campaign.create')}}
			</button>
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

import { required, minLength, maxLength, helpers, numeric, requiredIf, decimal, integer, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';

const paymentMetaStore = useLSSPaymentMetaStore()

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
		delivery_charge : 0,
		is_free_delivery_for_order_above_price : false,
		free_delivery_for_order_above_price : 0,
		is_free_delivery_for_how_many_order_minimum : false,
		free_delivery_for_how_many_order_minimum : 1,
		is_additional_delivery_charge : true,
		additional_delivery_options: [],
		pickup_options: [],
		delivery_note : ''
	},
	meta_payment:{
		special_note: '',
		confirmation_note: ''
	}
})

const campaignNotes = ref({
	meta_logistic: {
		delivery_note: ''
	},
	meta_payment: {
		special_note: '',
		confirmation_note: ''
	}
})

const campaignDataRules = computed(() => {
	return { 	
				title: { required, minLength: minLength(1), maxLength: maxLength(255) },
				meta_logistic:{
					delivery_charge:{required, decimal, minValue:minValue(0)},
					free_delivery_for_order_above_price:{required:requiredIf(()=>{ return campaignData.value.meta_logistic.is_free_delivery_for_order_above_price==true }), decimal, minValue:minValue(0.01)},
					free_delivery_for_how_many_order_minimum:{required:requiredIf(()=>{ return campaignData.value.meta_logistic.is_free_delivery_for_how_many_order_minimum==true }), integer, minValue:minValue(1)},

					additional_delivery_options: {
					$each: helpers.forEach({
						title:{required},
						type: {required},
						price:{required, numeric}
					})
				},
				pickup_options: {
					$each: helpers.forEach({
						name:{required},
						address: {required},
					})
				},
				},
				meta_payment:{
					direct_payment:{
						v2_accounts: {
							$each: helpers.forEach({
								mode:{required},
								name: {required},
								number:{required}
							})
						}
					}
				} }
})

const v = useVuelidate(campaignDataRules, campaignData);

watch(computed(()=>dateTimePicker.value),()=>{
	campaignData.value.start_at = dateTimePicker.value.start
	campaignData.value.end_at = dateTimePicker.value.end
},{deep:true})

const sellerStore = useLSSSellerLayoutStore()
onMounted(() => {
	if(!sellerStore.userInfo.user_subscription) return
	
	if (Object.entries(sellerStore.userInfo.user_subscription.meta_logistic).length) {
		Object.assign(campaignData.value.meta_logistic,JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_logistic)))
	}
	
	sellerStore.userInfo.user_subscription.meta_country.activated_country.forEach( country => { paymentMetaStore[country].forEach( key => campaignData.value.meta_payment[key]={} ) } )
	if (Object.entries(sellerStore.userInfo.user_subscription.meta_payment).length) {
		Object.assign(campaignData.value.meta_payment,JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_payment)))
	}
	
	campaignNotes.value.meta_logistic.delivery_note = JSON.parse(JSON.stringify(campaignData.value.meta_logistic.delivery_note ))
	campaignNotes.value.meta_payment.special_note = JSON.parse(JSON.stringify(campaignData.value.meta_payment.special_note  ))
	campaignNotes.value.meta_payment.confirmation_note = JSON.parse(JSON.stringify(campaignData.value.meta_payment.confirmation_note  ))
	
})



const createCampaign = ()=>{

	v.value.$touch()
	if (v.value.$invalid) {
		sellerStore.alert.showMessageToast("Invalid Data")
		return
	}

	campaignData.value.meta_logistic.delivery_note = campaignNotes.value.meta_logistic.delivery_note
	campaignData.value.meta_payment.special_note = campaignNotes.value.meta_payment.special_note
	campaignData.value.meta_payment.confirmation_note = campaignNotes.value.meta_payment.confirmation_note

	let formData = new FormData()
	formData.append('data', JSON.stringify(campaignData.value))
	
	directPaymentImages.value.forEach( (image,index) => {
		const key = campaignData.value.meta_payment.direct_payment.v2_accounts[index].name+'_'+index   
		formData.append(key,image)
	});


	create_campaign(formData).then(response => {

		router.push({name:'assign-product', params:{'campaign_id': response.data.id}})
	})

}


</script>
