<template>
    <div class="flex flex-col h-full" v-if="ready">
		<div class="flex items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y">
			<h2 class="text-xl sm:text-2xl font-medium mx-auto sm:mx-0">{{$t('edit_campaign.edit_campaign')}}</h2>
		</div>
		<div class="dateSetting box grid grid-cols-12 gap-4 p-5 intro-y lg:mx-20 lg:px-40">
			<div class="col-span-12 col-start-1 sm:col-span-6">
				<div class="flex flex-col"> 
					<label class="w-20 my-auto text-base form-label font-medium">{{$t('edit_campaign.title')}}</label>
					<input 
						class="w-full form-control" 
						type="text" 
						:class="{ 'border-danger': v.title.$error }"
						v-model.trim="v.title.$model"
						@blur="v.title.$touch" 
						/> 
				</div> 
				<template v-if="v.title.$error">
					<label class="text-danger text-[14px] ml-20">
						{{$t('edit_campaign.title_required')}}
					</label>
				</template> 
			</div>
			<div class="col-span-12 sm:col-span-6">
				<div class="flex flex-col">
					<div class="flex whitespace-nowrap align-middle"> 
						<label for="regular-form-2" class="w-16 my-auto text-base form-label font-medium">{{$t('edit_campaign.period')}}</label>
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
								class="form-control border h-[35px] sm:h-[42px] px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
							<ChevronsRightIcon class="w-8 h-8 m-1" />
							<input :value="inputValue.end" v-on="inputEvents.end" disabled
								class="form-control border h-[35px] sm:h-[42px] px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
							</div>
						</template>
					</v-date-picker>
				</div>
			</div>

			<div class="col-span-12 flex items-center justify-between py-3 mt-5 leading-5 border-2 rounded-md border-slate-200">
				<h3 class="inline-flex my-auto ml-2 leading-5 align-middle md:ml-3 text-lg font-medium">
					{{$t('edit_campaign.connected_platform')}}
				</h3>


				<div class="inline-flex justify-around w-20 ml-auto mr-3 align-middle md:mr-5 ">
					<div class="w-8 h-8 border-0 flex-0 md:w-10 md:h-10 zoom-in" v-if="campaignData.facebook_page">
						<Tippy tag="img" class="border-0 rounded-full" :src="campaignData.facebook_page.image"
						:content="campaignData.facebook_page.name" />
						<div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
							<img class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
						</div>
					</div>
					<div class="w-8 h-8 flex-0 md:w-10 md:h-10 zoom-in" v-if="campaignData.instagram_profile">
						<Tippy tag="img" class="rounded-full " :src="campaignData.instagram_profile.image"
						:content="campaignData.instagram_profile.name" />
						<div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
							<img class="rounded-full bg-[#d63376]" :src="instagram_platform" >
						</div>
					</div>
					<div class="w-8 h-8 flex-0 md:w-10 md:h-10 zoom-in" v-if="campaignData.youtube_channel">
						<Tippy tag="img" class="rounded-full" :src="campaignData.youtube_channel.image"
						:content="campaignData.youtube_channel.name" />
						<div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
							<img class="rounded-full bg-[#f70000]" :src="youtube_platform" >
						</div>
					</div>
					<div class="w-8 h-8 flex-0 md:w-10 md:h-10 zoom-in" v-if="campaignData.twitch_channel">
						<Tippy tag="img" class="rounded-full" :src="campaignData.twitch_channel.image"
						:content="campaignData.twitch_channel.name" />
						<div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
							<img class="rounded-full bg-[#f70000]" :src="twitch_platform" >
						</div>
					</div>
					<div class="w-8 h-8 flex-0 md:w-10 md:h-10 zoom-in" v-if="campaignData.tiktok_campaign.username">
						<Tippy tag="img" class="rounded-full" :src="anonymous_profile"
						:content="campaignData.tiktok_campaign.username" />
						<div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
							<img class="rounded-full bg-[#0f0f0f]" :src="tiktok_platform" >
						</div>
					</div>
				</div>

				<a @click="editplatform()" class="inline-flex mr-2 align-middle md:mr-5">
				<SimpleIcon icon="edit" color="#2d8cf0" class="mr-1"/> {{$t('edit_campaign.edit_connected_platform')}}
				</a>
			</div>
		</div>

		<div v-show="sellerStore.userInfo.user_subscription.type !== 'kol'">

			<div class="langSetting box p-5 lg:mx-20 lg:px-40 mt-3 sm:p-8 text-sm sm:text-lg">

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
					<div class="mr-5"> {{$t("settings.localization.buyer_language")}}</div>
				</div>
				<div class="flex my-1">
					<TomSelect v-model="campaignData.lang" :options="{
								placeholder: $t('settings.localization.choose_language'),
								}" class="w-full">
						<option :value="option.value" v-for="(option,index) in languages" :key="index">{{$t(`settings.localization.languages.${option.value}`)}}</option>
					</TomSelect>
				</div>

				<div class="flex my-3 mt-5 form-label text-base font-medium">
					<div class="mr-5"> {{$t("settings.localization.price_unit")}}</div>
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
			<div class="box p-5 lg:mx-20 lg:px-40 mt-3 sm:p-8 text-sm sm:text-lg">
				<PointsSettings 
					:meta_point="campaignData.meta_point"
					:v="v"
				/>
			</div>

			<div class="box p-5 lg:mx-20 lg:px-40 mt-3 sm:p-8 text-sm sm:text-lg">
				<MessageSettings 
					:meta_reply="campaignData.meta_reply"
					:v="v"
				/>
			</div>
			
			
			<NotesForm :campaignNotes="campaignNotes"/>

		</div>

		<div class="box col-span-12 flex justify-end shadow-none -mt-5 lg:mx-20 lg:px-40 px-10 py-10">
			<button class=" w-32 bg-white btn dark:border-darkmode-400 " @click="$router.push({ name: 'campaign-list' })">
				{{$t('edit_campaign.cancel')}}
			</button>
			<button class="w-32 ml-5 mr-4 shadow-md btn btn-primary" @click="updateCampaign()">
				{{$t('edit_campaign.update')}}
			</button>
		</div>
	</div>
	<EnterPostIDModal />
</template>  

<script setup>
import { ref, watch, onMounted, computed, watchEffect, getCurrentInstance } from 'vue';

import PaymentForm from '@/views/create-campaign/payment-form/Main.vue'
import DeliveryForm from '@/views/create-campaign/DeliveryForm.vue';
import NotesForm from '@/views/create-campaign/NotesForm.vue';
import PointsSettings from '@//views/settings/PointsSettings.vue'
import MessageSettings from '@//views/settings/MessageSettings.vue'

import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useRoute, useRouter } from "vue-router";
import { retrieve_campaign, update_campaign } from '@/api_v2/campaign';
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail"

import EnterPostIDModal from "@/views/campaign-list/enter-post-id-modal/Main.vue"
import { required, minLength, maxLength, helpers, numeric , decimal, minValue, requiredIf, integer} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import youtube_platform from "/src/assets/images/lss-img/youtube.png"
import facebook_platform from "/src/assets/images/lss-img/facebook.png"
import instagram_platform from "/src/assets/images/lss-img/instagram.png"
import twitch_platform from "/src/assets/images/lss-img/twitch.png"
import tiktok_platform from "/src/assets/images/lss-img/tiktok_black_bg.png"
import anonymous_profile from "/src/assets/images/lss-img/noname.png"
import unbound from "/src/assets/images/lss-img/noname.png"
import i18n from "@/locales/i18n"



const campaignDetailStore = useCampaignDetailStore()
const sellerStore = useLSSSellerLayoutStore()

const paymentMetaStore = useLSSPaymentMetaStore()

const internalInstance = getCurrentInstance()
const route = useRoute()
const router = useRouter()
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
    {value:'zh_hant',text:'Chinese-tranditional'},
	{value:'zh_hans',text:'Chinese-simplify'},
    {value:'vi',text:'Vietnamese'}
])

const decimalOptions = ref([
    {value:'2',text:'0.01'},
    {value:'0',text:'1'},
])

const allowedPaymentMethods = ref([])
const directPaymentImages = ref([])
const campaignData = ref({})
const dateTimePicker = ref({
	start:new Date(),
	end:new Date()
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

const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const ready = ref(false)

onMounted(() => {

	retrieve_campaign(route.params.campaign_id, sellerStore.alert).then(res=>{
		campaignData.value = JSON.parse(JSON.stringify(res.data))
		campaignData.value.decimal_places = res.data.decimal_places.toString()  //temp   TomSelect only work with string value

		dateTimePicker.value.start=res.data.start_at
		dateTimePicker.value.end=res.data.end_at

		campaignNotes.value.meta_logistic.delivery_note = JSON.parse(JSON.stringify(campaignData.value.meta_logistic.delivery_note ))
		campaignData.value.meta_logistic.delivery_date = campaignData.value.meta_logistic.delivery_date?campaignData.value.meta_logistic.delivery_date:{start_at:null,end_at:null}
		if(sellerStore.userInfo.user_subscription.country)campaignData.value.country = sellerStore.userInfo.user_subscription.country

		//if support payment is in meta_payment -> do nothing
		//else -> build one with all default value
		const paymentKeySet = new Set()
		sellerStore.userInfo.user_subscription.meta_country.activated_country.forEach( country => { paymentMetaStore[country].forEach( key => paymentKeySet.add(key) ) } )
		paymentKeySet.forEach(key => {
			if(key in campaignData.value.meta_payment){
				//do nothing
			}else{
				campaignData.value.meta_payment[key]={}
				paymentMetaStore[key].fields.forEach(field=>{
					campaignData.value.meta_payment[key][field.key] = field.default
				});
				campaignData.value.meta_payment[key]['enabled'] = false
			}
		});


		campaignNotes.value.meta_payment.special_note = JSON.parse(JSON.stringify(res.data.meta_payment.special_note))
		campaignNotes.value.meta_payment.confirmation_note = JSON.parse(JSON.stringify(res.data.meta_payment.confirmation_note))

		ready.value=true
	})
})
watch(computed(()=>{return dateTimePicker.value}),()=>{
	campaignData.value.start_at = dateTimePicker.value.start
	campaignData.value.end_at = dateTimePicker.value.end
},{deep:true})



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

const updateCampaign = ()=>{


	v.value.$touch()
	if (v.value.$invalid) {
		sellerStore.alert.showMessageToast(i18n.global.t('edit_campaign.invalid_data'))
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

	update_campaign(route.params.campaign_id,formData, sellerStore.alert).then(res => {
		campaignDetailStore.campaign = res.data
		router.push({name:'campaign-list'})
	})

}

const editplatform = ()=>{
	eventBus.emit('showEnterPostIDModal',{'campaign':campaignData.value})
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
