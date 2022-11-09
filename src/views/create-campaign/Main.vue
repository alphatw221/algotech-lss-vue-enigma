<template>
    <div class="flex flex-col h-[100%] text-[16px]">
		<div class="flex items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y">
			<h2 class="text-xl sm:text-2xl font-medium mx-auto sm:mx-0">{{$t('create_campaign.create_campaign')}}</h2>
		</div>
		<div class="dateSetting box grid grid-cols-12 gap-4 p-5 intro-y lg:mx-20 lg:px-40">
    <!-- <div class="flex flex-col gap-5 text-[16px] h-fit">
		<span class="mt-3 ml-5 text-xl sm:ml-0 sm:mt-5"> Create Campaign </span>
		<div class="grid grid-cols-12 gap-1 px-5 py-5 sm:p-8 intro-y box sm:gap-5 -z-50"> -->
			<div class="col-span-12 col-start-1 sm:col-span-6">
				<div class="flex flex-col">
					<div class="flex">
						<label class="w-fit my-auto text-base form-label font-medium">{{$t('create_campaign.title')}}</label>
						<Tippy 
							class="rounded-full w-fit whitespace-wrap ml-1 my-auto" 
							data-tippy-allowHTML="true" 
							data-tippy-placement="right" 
							:content="$t('tooltips.create_campaign.title')" 
						> 
							<HelpCircleIcon class="w-5 tippy-icon" />
						</Tippy> 
					</div>
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
					<div class="flex whitespace-nowrap align-middle"> 
						<label for="regular-form-2" class="w-fit my-auto text-base form-label font-medium">{{$t('create_campaign.period')}}</label>
						<Tippy 
							class="rounded-full w-fit whitespace-wrap ml-1 my-auto" 
							data-tippy-allowHTML="true" 
							data-tippy-placement="right" 
							:content="$t('tooltips.create_campaign.campaign_period')" 
						> 
							<HelpCircleIcon class="w-5 tippy-icon" />
						</Tippy> 
					</div>
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
		
		<div class="box p-5 lg:mx-20 lg:px-40 mt-3 sm:p-8 text-sm sm:text-lg langSetting">

			<div class="flex mb-3 form-label text-base font-medium">
				<div> {{$t("settings.localization.currency_symbol")}} </div>
			</div>
			<div class="flex my-1 ">
				<TomSelect v-model="campaignData.currency" :options="{
							placeholder: $t('settings.localization.choose_currency_symbol'),
							}" class="w-full">
					<option :value="option.value" v-for="(option,index) in currencySymbols" :key="index">{{option.text}}</option>
				</TomSelect>
			</div>
			<div class="flex my-3 mt-5 form-label text-base font-medium">
				<div class=""> {{$t("settings.localization.buyer_language")}}</div>
				<Tippy 
					class="rounded-full whitespace-wrap" 
					data-tippy-allowHTML="true" 
					data-tippy-placement="right" 
					:content="$t('tooltips.settings.local.buyer_lang')" 
				> 
					<HelpCircleIcon class="h-5 ml-1 mt-0.5 tippy-icon" />
				</Tippy> 
			</div>
			<div class="flex my-1">
				<TomSelect v-model="campaignData.lang" :options="{
							placeholder: $t('settings.localization.choose_language'),
							}" class="w-full">
					<option :value="option.value" v-for="(option,index) in languages" :key="index">{{$t(`settings.localization.languages.${option.value}`)}}</option>
				</TomSelect>
			</div>

			<div class="flex my-3 mt-5 form-label text-base font-medium">
				<div class=""> {{$t("settings.localization.price_unit")}}</div>
				<Tippy 
					class="rounded-full whitespace-wrap" 
					data-tippy-allowHTML="true" 
					data-tippy-placement="right" 
					:content="$t('tooltips.settings.local.price_unit')" 
				> 
					<HelpCircleIcon class="h-5 ml-1 mt-0.5 tippy-icon" />
				</Tippy> 
			</div>

			<div class="flex my-1">
				<TomSelect v-model="campaignData.price_unit" :options="{placeholder: $t('settings.localization.choose_price_unit')}" class="w-full">
					<option :value="option.value" v-for="(option,index) in priceUnitOptions" :key="index">{{$t(`settings.localization.priceOptions.${option.key}`)}}</option>
				</TomSelect>
			</div>

			<div class="flex my-3 mt-5 form-label text-base font-medium">
				<div class="mr-5"> {{$t("settings.localization.decimal_places")}}</div>
			</div>
			<div class="flex my-1">
				<TomSelect v-model="campaignData.decimal_places" :options="{placeholder: $t('settings.localization.choose_decimal_places')}" class="w-full">
					<option :value="option.value" v-for="(option,index) in decimalOptions" :key="index">{{option.text}}</option>
				</TomSelect>
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

		<PointsSettings 
			:meta_point="campaignData.meta_point"
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
import PointsSettings from '@//views/settings/PointsSettings.vue'

import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useRoute, useRouter } from "vue-router";
import { create_campaign, retrieve_campaign, update_campaign } from '@/api_v2/campaign';

import { required, minLength, maxLength, helpers, numeric, requiredIf, decimal, integer, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';


const layoutStore = useLSSSellerLayoutStore()
const paymentMetaStore = useLSSPaymentMetaStore()

const route = useRoute()
const router = useRouter()
const directPaymentImages = ref([])
const dateTimePicker = ref({
	start:new Date(),
	end:new Date()
})

const currencySymbols = ref([
    {value:'USD',text:'USD'},
    {value:'NTD',text:'NTD'},
    {value:'SGD',text:'SGD'},
    {value:'IDR',text:'IDR'},
    {value:'PHP',text:'PHP'},
    {value:'MYR',text:'MYR'},
    {value:'VND',text:'VND'},
    {value:'RMB',text:'RMB'},
    {value:'KHR',text:'KHR'},
    {value:'AUD',text:'AUD'},
    {value:'HKD',text:'HKD'}])

const priceUnitOptions = ref([
    {key:'1',value:'1'},
    {key:'1000',value:'1000'},
    {key:'1000000',value:'1000000'},
])

const languages = ref([
    {value:'en',text:'English'},
	{value:'zh_hans',text:'Chinese-simplify'},
    {value:'zh_hant',text:'Chinese-tranditional'},
	{value:'vi',text:'Vietnamese'},
])

const decimalOptions = ref([
    {value:'2',text:'0.01'},
    {value:'0',text:'1'},
])

const campaignData = ref({
	title:'',
	start_at:new Date(),
	end_at:new Date(),
	meta_logistic:{
		delivery_charge : 0,
		is_free_delivery_for_order_above_price : false,
		free_delivery_for_order_above_price : 1,
		is_free_delivery_for_how_many_order_minimum : false,
		free_delivery_for_how_many_order_minimum : 1,
		is_additional_delivery_charge : true,
		additional_delivery_options: [],
		pickup_options: [],
		delivery_note : '',
		ecpay_delivery_enable : false,
		ecpay_delivery_hash_key : '',
		ecpay_delivery_hash_iv : ''
	},
	country:'SG',
	currency:'USD', 
	lang:'en', 
	lang:'en', 
	decimal_places:2, 
	price_unit:'1',
	meta_payment:{
		special_note: '',
		confirmation_note: ''
	},
	meta_reply:{},  //add for shc
	meta_point:{}
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
	
	if(sellerStore.userInfo.user_subscription.currency)campaignData.value.currency=sellerStore.userInfo.user_subscription.currency
	if(sellerStore.userInfo.user_subscription.buyer_lang)campaignData.value.lang=sellerStore.userInfo.user_subscription.buyer_lang
	if(sellerStore.userInfo.user_subscription.country)campaignData.value.country=sellerStore.userInfo.user_subscription.country
	if(!([undefined,null,''].includes(sellerStore.userInfo.user_subscription.decimal_places)))campaignData.value.decimal_places=sellerStore.userInfo.user_subscription.decimal_places.toString()  //temp   TomSelect only work with string value
	if(sellerStore.userInfo.user_subscription.price_unit)campaignData.value.price_unit=sellerStore.userInfo.user_subscription.price_unit
	if(sellerStore.userInfo.user_subscription.meta_point)campaignData.value.meta_point=JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_point ))


	//payment
	//if specific payment is set in user subscription -> clone it
	//if not -> build one with all default value
	const paymentKeySet = new Set()
    sellerStore.userInfo.user_subscription.meta_country.activated_country.forEach( country => { paymentMetaStore[country].forEach( key => paymentKeySet.add(key) ) } )
    paymentKeySet.forEach(key => {
		if(key in sellerStore.userInfo.user_subscription.meta_payment){
			campaignData.value.meta_payment[key] = JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_payment[key]))
		}else{
			campaignData.value.meta_payment[key]={}
			paymentMetaStore[key].fields.forEach(field=>{
				campaignData.value.meta_payment[key][field.key] = field.default
			});
			campaignData.value.meta_payment[key]['enabled'] = false
		}
    });




	//Logistic
	if (Object.entries(sellerStore.userInfo.user_subscription.meta_logistic).length) {
		Object.assign(campaignData.value.meta_logistic,JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_logistic)))
	}
	

	campaignNotes.value.meta_logistic.delivery_note = sellerStore.userInfo.user_subscription.meta_logistic.delivery_note ? JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_logistic.delivery_note )) : ''
	campaignNotes.value.meta_payment.special_note = sellerStore.userInfo.user_subscription.meta_payment.special_note ? JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_payment.special_note  )) : ''
	campaignNotes.value.meta_payment.confirmation_note = sellerStore.userInfo.user_subscription.meta_payment.confirmation_note ? JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_payment.confirmation_note  )) : ''
	
	//reply
	if(sellerStore.userInfo.user_subscription.meta_reply)campaignData.value.meta_reply = JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_reply))
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


	create_campaign(formData, layoutStore.alert).then(response => {

		router.push({name:'assign-product', params:{'campaign_id': response.data.id}})
	})

}


</script>

<style scoped>

.langSetting{
	z-index: 49;
}

.dateSetting{
	z-index: 50;
}
</style>