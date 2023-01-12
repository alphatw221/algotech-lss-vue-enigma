<template>
    <div class="flex flex-col h-[100%] text-[16px]">
		<div class="flex items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y">
			<h2 class="text-xl sm:text-2xl font-medium mx-auto sm:mx-0">{{$t('create_campaign.create_campaign')}}</h2>
		</div>
		<template v-for="(category, index) in computedCategory" :key="index">
			<template v-if="category == 'date'">
				<div :class="category" class="box grid grid-cols-12 gap-4 p-5 intro-y lg:mx-20 lg:px-40">
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
			</template>
			<template v-else-if="category == 'general'">
				<div :class="category" class="box p-5 lg:mx-20 lg:px-40 mt-3 sm:p-8 text-sm sm:text-lg flex flex-col gap-3">

					<span class="text-xl font-medium leading-none lg:-mx-6">{{$t('create_campaign.general_settings')}}</span>
					<hr class="-mx-6 my-4" />

					<div v-show="sellerStore.userInfo.user_subscription.meta_store?.support_stock_user_subscriptions" class="flex flex-col"> 
						<span>{{$t('create_campaign.selling_type')}}</span>
						<select 
						class="form-select h-[35px] sm:h-[42px] w-full"
						v-model="v.supplier.$model"
						>
							<option :value="null">{{$t('create_campaign.my_stock')}}</option>
							<option v-for="subscription,index in sellerStore.userInfo.user_subscription.meta_store?.support_stock_user_subscriptions" :key="index" :value="subscription.user_subscription_id">{{ subscription.name }}</option>
						</select>
					</div>

					<div class="flex flex-col w-full">
						<span> {{$t("settings.localization.currency_symbol")}} </span>
						<TomSelect v-model="campaignData.currency" :options="{
									placeholder: $t('settings.localization.choose_currency_symbol'),
									}" class="w-full">
							<option :value="option.value" v-for="(option,index) in currencySymbols" :key="index">{{option.text}}</option>
						</TomSelect>
					</div>

					<div class="flex flex-col">
						<div class="flex flex-row gap-3">
							<span class=""> {{$t("settings.localization.buyer_language")}}</span>
							<Tippy 
								class="rounded-full whitespace-wrap" 
								data-tippy-allowHTML="true" 
								data-tippy-placement="right" 
								:content="$t('tooltips.settings.local.buyer_lang')" 
							> 
								<HelpCircleIcon class="h-5 ml-1 mt-0.5 tippy-icon" />
							</Tippy> 
						</div>
						<TomSelect v-model="campaignData.lang" :options="{
									placeholder: $t('settings.localization.choose_language'),
									}" class="w-full">
							<option :value="option.value" v-for="(option,index) in languages" :key="index">{{$t(`settings.localization.languages.${option.value}`)}}</option>
						</TomSelect>
					</div>

					<div class="flex flex-col">
						<div class="flex flex-row gap-3">
							<span> {{$t("settings.localization.price_unit")}}</span>
							<Tippy 
								class="rounded-full whitespace-wrap" 
								data-tippy-allowHTML="true" 
								data-tippy-placement="right" 
								:content="$t('tooltips.settings.local.price_unit')" 
							> 
								<HelpCircleIcon class="h-5 ml-1 mt-0.5 tippy-icon" />
							</Tippy> 
						</div>
						<TomSelect v-model="campaignData.price_unit" :options="{placeholder: $t('settings.localization.choose_price_unit')}" class="w-full">
							<option :value="option.value" v-for="(option,index) in priceUnitOptions" :key="index">{{$t(`settings.localization.priceOptions.${option.key}`)}}</option>
						</TomSelect>
					</div>
					<div class="flex flex-col">
						<div class="mr-5"> {{$t("settings.localization.decimal_places")}}</div>

						<TomSelect v-model="campaignData.decimal_places" :options="{placeholder: $t('settings.localization.choose_decimal_places')}" class="w-full">
							<option :value="option.value" v-for="(option,index) in decimalOptions" :key="index">{{option.text}}</option>
						</TomSelect>
					</div>
				</div>
			</template>
			<template v-else-if="category == 'logistics'">
				<DeliveryForm 
					:campaign="campaignData"
					:v="v"
					:class="category"
				/>
			</template>
			<template v-else-if="category == 'payments'">
				<PaymentForm 
					:campaign="campaignData"
					:directPaymentImages="directPaymentImages"
					:v="v"
					:class="category"
				/>
			</template>
			<template v-else-if="category == 'points'"> 
				<div :class="category" 
					class="box p-5 lg:mx-20 lg:px-40 mt-3 sm:p-8 text-sm sm:text-lg">
					<PointsSettings 
						:meta_point="campaignData.meta_point"
						:v="v"
					/>
				</div>
			</template>
			<template v-else-if="category == 'messages'">
				<div
				:class="category" 
					class="box p-5 lg:mx-20 lg:px-40 mt-3 sm:p-8 text-sm sm:text-lg">
					<MessageSettings 
						:meta_reply="campaignData.meta_reply"
						:v="v"
					/>
				</div>
			</template>
		
			<template v-else-if="category == 'notes'"> 
				<NotesForm :campaignNotes="campaignNotes" :class="category" />
			</template>
		</template>
	<div class="box shadow-none col-span-12 flex justify-end lg:mx-20 lg:px-40 py-10 mt-3">
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
import { required, minLength, maxLength, helpers, numeric, requiredIf, decimal, integer, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import PaymentForm from './payment-form/Main.vue'
import DeliveryForm from './DeliveryForm.vue';
import NotesForm from './NotesForm.vue';
import PointsSettings from '@//views/settings/general-settings/PointsSettings.vue'
import MessageSettings from '@//views/settings/general-settings/MessageSettings.vue'


import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useCampaignDetailStore } from '@/stores/lss-campaign-detail';
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useRoute, useRouter } from "vue-router";
import { create_campaign, retrieve_campaign, update_campaign } from '@/api_v2/campaign';


const sellerStore = useLSSSellerLayoutStore()
const campaignDetailStore = useCampaignDetailStore();
const paymentMetaStore = useLSSPaymentMetaStore()

const route = useRoute()
const router = useRouter()

const stockSubscriptionId = ref('')

const directPaymentImages = ref([])
const dateTimePicker = ref({
	start:new Date(),
	end:new Date()
})
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

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
	supplier: null,
	meta_logistic:{
		delivery_charge : 0,
		is_free_delivery_for_order_above_price : false,
		free_delivery_for_order_above_price : 1,
		is_free_delivery_for_how_many_order_minimum : false,
		free_delivery_for_how_many_order_minimum : 1,
		is_additional_delivery_charge : true,
		additional_delivery_options: [],
		pickup_options: [],
		delivery_note : ''
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
	meta_point:{},
	meta:{}
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
const computedCategory = computed(()=>{
	var categorys = ['date','general','logistics','payments','points','messages','notes']

	if(sellerStore.userInfo.user_subscription.type=='kol'){
		categorys = categorys.filter(category=>category !='points')
		categorys = categorys.filter(category=>category != 'payments')
	}
	if(campaignData.value.supplier){
		categorys = categorys.filter(category=>category!='logistics')
		categorys = categorys.filter(category=>category!='messages')
		categorys = categorys.filter(category=>category!='notes')
	}
	return categorys
})
const campaignDataRules = computed(() => {
	let rules = { 	
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
		supplier: {}
	}
	if (computedCategory.value.includes("payments")) {
		rules["meta_payment"] = {
			direct_payment:{
				v2_accounts: {
					$each: helpers.forEach({
						mode:{required},
						name: {required},
						number:{required}
					})
				}
			}
		}
	}
	return rules
})

const v = useVuelidate(campaignDataRules, campaignData);



watch(computed(()=>dateTimePicker.value),()=>{
	campaignData.value.start_at = dateTimePicker.value.start
	campaignData.value.end_at = dateTimePicker.value.end
},{deep:true})


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
		campaignData.value.meta_logistic.delivery_date = sellerStore.userInfo.user_subscription.meta_logistic?.delivery_date ? sellerStore.userInfo.user_subscription.meta_logistic.delivery_date : {start_at:null,end_at:null}
	}else campaignData.value.meta_logistic.delivery_date = {start_at:null,end_at:null}
	
	console.log(campaignData.value)

	campaignNotes.value.meta_logistic.delivery_note = sellerStore.userInfo.user_subscription.meta_logistic.delivery_note ? JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_logistic.delivery_note )) : ''
	campaignNotes.value.meta_payment.special_note = sellerStore.userInfo.user_subscription.meta_payment.special_note ? JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_payment.special_note  )) : ''
	campaignNotes.value.meta_payment.confirmation_note = sellerStore.userInfo.user_subscription.meta_payment.confirmation_note ? JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_payment.confirmation_note  )) : ''
	
	//reply
	if(sellerStore.userInfo.user_subscription.meta_reply)campaignData.value.meta_reply = JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_reply))
})



const createCampaign = ()=>{

	v.value.$touch()
	if (v.value.$invalid) {
		sellerStore.alert.showMessageToast('Invalid Data')

		//back to top when err
		document.querySelector('#lss-content').scrollTo(0, -70)
		// var err
		// v.value.$errors.forEach( err=>{
		// 	console.log(err)
		// 	sellerStore.alert.showMessageToast(err.$uid)
		// })
		return
	}

	campaignData.value.meta_logistic.delivery_note = campaignNotes.value.meta_logistic.delivery_note
	campaignData.value.meta_payment.special_note = campaignNotes.value.meta_payment.special_note
	campaignData.value.meta_payment.confirmation_note = campaignNotes.value.meta_payment.confirmation_note

	if(stockSubscriptionId.value) {
		campaignData.value.meta={stock_subscription_id:stockSubscriptionId.value}
	}
	else if(!stockSubscriptionId.value && ['stock_subscription_id'].includes(campaignData.value.meta)){
		const _index = campaignData.value.meta.indexOf('stock_subscription_id')
		campaignData.value.meta.splice(_index,-1)
	}

	campaignData.value.meta = stockSubscriptionId.value? {stock_subscription_id:stockSubscriptionId.value}: {}

	let formData = new FormData()
	formData.append('data', JSON.stringify(campaignData.value))
	directPaymentImages.value.forEach( (image,index) => {
		const key = campaignData.value.meta_payment.direct_payment.v2_accounts[index].name+'_'+index   
		formData.append(key,image)
	});


	create_campaign(formData, sellerStore.alert).then(response => {
		console.log("create campaign", response.data)
		campaignDetailStore.campaign = response.data
		router.push({name:'assign-product', params:{'campaign_id': response.data.id}})
	})

}


</script>

<style scoped>

.date{
	z-index: 50;
}

.general{
	z-index: 49;
}

.logistics{
	z-index: 48;
}
</style>