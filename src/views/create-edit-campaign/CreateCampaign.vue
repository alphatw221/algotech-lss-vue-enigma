<template>
	<div class="p-5 box my-5 intro-y">
		<CrudForm
			:title="'General Settings'"    
			:formSettings="generalSettings"
			:action="actions"
			v-model="data"
			class="intro-y"
		>
			<template v-slot:social_platform_connection_form>
				<SocialPlatformConnectionForm v-model="data.social_platform_connections"/>
			</template>

		</CrudForm>
			

		<!-- Payment Settings -->
		<CrudForm
			:title="'Payment Settings'"    
			:formSettings="paymentSettings"
			:action="actions"
			class="intro-y"
		>
			<template v-slot:payment_services >
				<div v-if="(paymentServices||[]).filter(_paymentService=>!_paymentService?.remove).length<=0" class="text-center my-5">
					<h3>No Payment Service Added</h3>
				</div>
				<template v-for="paymentService, i in (paymentServices||[])" :key="i">
					<CrudWidge
						:formSettings="paymentServiceSettings"
						:action="actions"
						v-model="paymentServices[i]"
						class="intro-y border-slate border-[1px] rounded p-3 my-2"
						@change="()=>{paymentSettingsChanged=true}"
						:error="paymentServicesVuelidate?.$each?.$response?.$errors?.[i]"
						v-if="!paymentService.remove"
					>
						<template v-slot:remove_button>
							<XIcon class="w-6 h-6 right-1 top-1 cursor-pointer absolute text-slate-500" @click="()=>{paymentServices[i].provider='';paymentServices[i].remove=true; paymentSettingsChanged=true;}"/>
						</template>
						<template v-slot:bank_transfer_form>
							<BankTransferForm v-model="paymentServices[i]" @change="()=>{paymentSettingsChanged=true}" :error="paymentServicesVuelidate?.$each?.$response?.$errors?.[i]"/>
						</template>
						<template v-slot:ecpay_form>
							<ECPayForm v-model="paymentServices[i]" @change="()=>{paymentSettingsChanged=true}" :error="paymentServicesVuelidate?.$each?.$response?.$errors?.[i]"/>
						</template>
						<template v-slot:stripe_form>
							<StripeForm v-model="paymentServices[i]" @change="()=>{paymentSettingsChanged=true}" :error="paymentServicesVuelidate?.$each?.$response?.$errors?.[i]"/>
						</template>
						<template v-slot:rapyd_form>
							<RapydForm v-model="paymentServices[i]" @change="()=>{paymentSettingsChanged=true}" :error="paymentServicesVuelidate?.$each?.$response?.$errors?.[i]"/>
						</template>
					</CrudWidge>
				</template>
			</template>
			<template v-slot:add_service_button >
				<div class="text-center my-2">
					<button class="btn btn-primary rounded-[50%]" @click="()=>{ (paymentServices||[]).push(getPaymentServiceTemplate());paymentSettingsChanged=true}">
						<PlusIcon/>
					</button>
				</div>
			</template>
		</CrudForm>

		
		<!-- Logistic Settings -->
		<CrudForm
			:title="'Logistic Settings'"    
			:formSettings="logisticSettings"
			:action="actions"
			class="intro-y"
		>
			<template v-slot:self_pickup_form>
				<SelfPickupForm v-model="logisticServices" @update:modelValue="()=>{logisticSettingsChanged=true}" @change="()=>{logisticSettingsChanged=true}" :getLogisticServiceTemplate="()=>{return {provider:'self_pickup'}}"/>
			</template>
			<template v-slot:seller_deliver_form>
				<SellerDeliverForm v-model="logisticServices" @update:modelValue="()=>{logisticSettingsChanged=true}" @change="()=>{logisticSettingsChanged=true}" :getLogisticServiceTemplate="()=>{return {provider:'seller_deliver'}}"/>
			</template>
			<template v-slot:logistic_services >
				<h3 class="text-base">Logistic Services</h3>
				<div v-if="(logisticServices||[]).filter(_logisticService=>_logisticService?.provider!='self_pickup'&&_logisticService?.provider!='seller_deliver'&&!_logisticService?.remove)?.length<=0" class="text-center my-5">
					<h3>No Logistic Service Added</h3>
				</div>
				<template v-for="logisticService, i in (logisticServices||[])" :key="i">
					<CrudWidge
						v-if="logisticService?.provider!='self_pickup' && logisticService?.provider!='seller_deliver' && !logisticService?.remove"
						:formSettings="logisticServiceSettings"
						:action="actions"
						v-model="logisticServices[i]"
						class="intro-y border-slate border-[1px] rounded p-3 my-2"
						@change="()=>{logisticSettingsChanged=true}"
					>
						<template v-slot:ecpay>
							<ECPayLogisticForm v-model="logisticServices[i]" @change="()=>{logisticSettingsChanged=true}" />
						</template>
						<template v-slot:remove_button>
							<XIcon class="w-6 h-6 right-1 top-1 cursor-pointer absolute text-slate-500" @click="()=>{logisticServices[i].provider='';logisticServices[i].remove=true; logisticSettingsChanged=true }"/>
						</template>
					</CrudWidge>
				</template>
			</template>
			<template v-slot:add_service_button >
				<div class="text-center my-2">
					<button class="btn btn-primary rounded-[50%]" @click="()=>{ (logisticServices||[]).push({provider:''});logisticSettingsChanged=true}">
						<PlusIcon/>
					</button>
				</div>
			</template>
		</CrudForm>

		<!-- Point Settings -->
		<CrudForm
			:title="'Point Settings'"    
			:formSettings="pointSettings"
			:action="actions"
			v-model="pointSettingsData"
			@change="()=>{pointSettingsChanged=true}"
		>
			<template v-slot:reward_table>
				<RewardPointTableForm :currency="'SGD'" v-model="pointSettingsData" class="mt-2" @update:modelValue="()=>{pointSettingsChanged=true}" />
			</template>
			
		</CrudForm>

		<!-- Reply Settings -->
		<CrudForm
			:title="'Message(DM) Settings'"    
			:formSettings="replySettings"
			:action="actions"
			v-model="replySettingsData"
			@change="()=>{replySettingsChanged=true}"
		>
		
		</CrudForm>

		<!-- Note Settings -->
		<CrudForm
			:title="'Note Settings'"    
			:formSettings="notesSettings"
			:action="actions"
			v-model="noteSettingsData"
			@change="()=>{noteSettingsChanged=true}"
			class="mb-10"
		>
		
		</CrudForm>

		<div class="mt-5 flex flex-row justify-end px-5">
			<button class="btn btn-primary w-fit float-right mt-2" @click="create()" :disabled="campaignCreating">
                <div role="status" v-if="campaignCreating">
                    <svg aria-hidden="true" class="inline w-6 h-6 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Creating...</span>
                </div>
                <template v-else>{{ 'Create' }}</template>
            </button>
		</div>
	</div>
   
</template>  

<script setup>
import CrudForm from '@/views/crud-form-lss/Main.vue'
import CrudWidge from '@/views/crud-form-lss/CrudWidge.vue'

import {generalSettings} from './settings'
import {getDefaultData} from './settings'
import { ref, watch, onMounted, computed, watchEffect } from 'vue';
import { required, minLength, maxLength, helpers, numeric, requiredIf, decimal, integer, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import i18n from "@/locales/i18n"


import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useCampaignDetailStore } from '@/stores/lss-campaign-detail';
import { useRoute, useRouter } from "vue-router";
import { create_campaign } from '@/api_v3/campaign';
import SocialPlatformConnectionForm from './social-platform-connection-form/SocialPlatformConnectionForm.vue'




import BankTransferForm from '../settings//payment-settings/BankTransferForm.vue';
import ECPayForm from '../settings//payment-settings/ECPayForm.vue'
import RapydForm from '../settings//payment-settings/RapydForm.vue'
import StripeForm from '../settings//payment-settings/StripeForm.vue'

import SelfPickupForm from '../settings//delivery-settings/SelfPickupForm.vue'
import SellerDeliverForm from '../settings//delivery-settings/SellerDeliverForm.vue'
import ECPayLogisticForm from '../settings//delivery-settings/ECPayLogisticForm.vue';

import RewardPointTableForm from '../settings//general-settings/RewardPointTableForm.vue';


const LSSSellerLayoutStore = useLSSSellerLayoutStore()
const campaignDetailStore = useCampaignDetailStore();

const route = useRoute()
const router = useRouter()

const data = ref(getDefaultData(LSSSellerLayoutStore.user))
const actions = {}





const paymentServices = ref([])
const paymentSettingsChanged = ref(false)
const paymentSettingsUpdating = ref(false)
const paymentSettings = [
    {type:'slot', slot_name:'payment_services'},
    {type:'slot', slot_name:'add_service_button'},
    {type:'slot', slot_name:'save'},
]
const paymentServiceSettings = [
    {type:'inline', class:'intro-y', inline_items:[
        {key:'enable', name:'Enable', type:'toggle', class:'mr-2'},
        {key:'provider', name:'Payment Service', class:'w-full', type:'select', placeholder:'Choose a Payment Service', multiple:false, value_key:'value', name_key:'name', options:[
            {value:'bank_transfer', name:'Bank Transfer'},
            {value:'ecpay', name:'ECPay(Credit Card)'},
            {value:'stripe', name:'Stripe(Credit Card)'},
            {value:'rapyd', name:'Rapyd(Credit Card)'},
        ]},
    ]},
    {type:'slot', slot_name:'bank_transfer_form'},
    {type:'slot', slot_name:'ecpay_form'},
    {type:'slot', slot_name:'stripe_form'},
    {type:'slot', slot_name:'rapyd_form'},
    {type:'slot', slot_name:'remove_button'},
]
const getPaymentServiceTemplate = ()=>{
    return {
        provider:'',
        bank_account:'', 
        bank_name:'', 
        ecpay_merchant_id:'',
        ecpay_hash_key:'',
        ecpay_hash_iv:'',
        rapyd_access_key:'',
        rapyd_secret_key:'',
        rapyd_country:'',
        rapyd_currency:'',
        stripe_secret_key:'',
        stripe_currency:'',
    }
}
const paymentServicesRule = computed(()=> {
    return {
        $each: helpers.forEach({
                provider:{required:requiredIf((_,b)=>{return !b?.remove})},
                bank_name:{required:requiredIf((_,b)=>{return b?.provider=='bank_transfer' && !b?.remove})},
                bank_account:{required:requiredIf((_,b)=>{return b?.provider=='bank_transfer' && !b?.remove})},
                ecpay_merchant_id:{required:requiredIf((_,b)=>{return b?.provider=='ecpay' && !b?.remove})},
                ecpay_hash_key:{required:requiredIf((_,b)=>{return b?.provider=='ecpay' && !b?.remove})},
                ecpay_hash_iv:{required:requiredIf((_,b)=>{return b?.provider=='ecpay' && !b?.remove})},
                rapyd_access_key:{required:requiredIf((_,b)=>{return b?.provider=='rapyd' && !b?.remove})},
                rapyd_secret_key:{required:requiredIf((_,b)=>{return b?.provider=='rapyd' && !b?.remove})},
                rapyd_country:{required:requiredIf((_,b)=>{return b?.provider=='rapyd' && !b?.remove})},
                rapyd_currency:{required:requiredIf((_,b)=>{return b?.provider=='rapyd' && !b?.remove})},
                stripe_secret_key:{required:requiredIf((_,b)=>{return b?.provider=='stripe' && !b?.remove})},
                stripe_currency:{required:requiredIf((_,b)=>{return b?.provider=='stripe' && !b?.remove})},
            })
    }
})
const paymentServicesVuelidate = useVuelidate(paymentServicesRule, paymentServices);


const logisticServices = ref([])
const logisticSettingsChanged = ref(false)
const logisticSettingsUpdating = ref(false)
const logisticSettings = [
    {type:'slot', slot_name:'self_pickup_form'},
    {type:'slot', slot_name:'seller_deliver_form'},
    {type:'slot', slot_name:'logistic_services'},
    {type:'slot', slot_name:'add_service_button'},
    {type:'slot', slot_name:'save'},
]
const logisticServiceSettings = [
    {key:'provider', name:'Logistic Service', class:'w-full intro-y', type:'select', placeholder:'Choose a Logistic Service', multiple:false, value_key:'value', name_key:'name', options:[
            {value:'ecpay', name:'ECPay(T-Cat, 7-11, FamilyMart)'},
        ]},
    {type:'slot', slot_name:'ecpay'},
    {type:'slot', slot_name:'remove_button'},
]

const pointSettingsChanged = ref(false)
const pointSettingsUpdating = ref(false)
const pointSettingsData = ref({
    point_reward_tiers:[],
    default_point_redemption_rate:1,
    cash_redemption_rate_cash:1,
    cash_redemption_rate_points:1,
})
const pointSettings = [
    {key:'enable', name:'Enable', type:'toggle'},
    {key:'point_validity', name:'Point Validity', type:'select', placeholder:'選擇電子發票服務', multiple:false, value_key:'value', name_key:'name', options:[
                {value:0, name:'Unlimited'},
                {value:1, name:'1 Month'},
                {value:2, name:'2 Month'},
                {value:3, name:'3 Month'},
                {value:4, name:'4 Month'},
                {value:5, name:'5 Month'},
                {value:6, name:'6 Month'},
                {value:7, name:'7 Month'},
                {value:8, name:'8 Month'},
                {value:9, name:'9 Month'},
                {value:10, name:'10 Month'},
                {value:11, name:'11 Month'},
                {value:12, name:'12 Month'},
            ]},
    {type:'slot', slot_name:'reward_table'},
    {key:'point_description', name:'Point Descriptions', type:'textarea',},
    {type:'slot', slot_name:'save'},
]

const replySettingsChanged = ref(false)
const replySettingsUpdating = ref(false)
const replySettingsData = ref({})
const replySettings = [
    {key:'add', name:'Successfully Add Product', type:'accordion_textarea',placeholder:'', class:''},
    {key:'update', name:'Customer Change Quantity', type:'accordion_textarea',placeholder:'', class:'mt-5'},
    {key:'delete', name:'Product Delete From Shopping Cart', type:'accordion_textarea',placeholder:'', class:'mt-5'},
    {key:'oos', name:'Out Of Stock', type:'accordion_textarea', placeholder:'', class:'mt-5'},
    {type:'slot', slot_name:'save'},
]

const noteSettingsChanged = ref(false)
const noteSettingsUpdating = ref(false)
const noteSettingsData = ref({})
const notesSettings = [
    {key:'delivery_note', name:'Delivery Note', type:'accordion_textarea',placeholder:'', class:''},
    {key:'special_note', name:'Special Note', type:'accordion_textarea',placeholder:'', class:'mt-5'},
    {key:'confirmation_note', name:'Confirmation Note', type:'accordion_textarea',placeholder:'', class:'mt-5'},
    {type:'slot', slot_name:'save'},
]


onMounted(() => {
    console.log(LSSSellerLayoutStore.user)
    data.value = {
		...getDefaultData(LSSSellerLayoutStore?.user), 
		currency:LSSSellerLayoutStore?.user?.currency||'USD' , currency_symbol:LSSSellerLayoutStore?.user?.currency_symbol||'$',
		payment_services:JSON.parse(JSON.stringify(LSSSellerLayoutStore?.user?.payment_services||[])),
		logistic_services:JSON.parse(JSON.stringify(LSSSellerLayoutStore?.user?.logistic_services||[])),
		reply_settings:{...replySettingsData.value, ...JSON.parse(JSON.stringify(LSSSellerLayoutStore?.user?.reply_settings||{}))},
		point_settings:{...pointSettingsData.value, ...JSON.parse(JSON.stringify(LSSSellerLayoutStore?.user?.point_settings||{}))},
		note_settings:{...noteSettingsData.value, ...JSON.parse(JSON.stringify(LSSSellerLayoutStore?.user?.note_settings||{}))},
	
	}
	console.log(data.value)
    paymentServices.value = data.value.payment_services
    logisticServices.value = data.value.logistic_services
    replySettingsData.value = data.value.reply_settings
    pointSettingsData.value = data.value.point_settings
    noteSettingsData.value = data.value.note_settings
})


const campaignCreating = ref(false)
const create  =()=>{
	console.log(data.value)
	campaignCreating.value = true;
	create_campaign(data.value).then(res=>{
		console.log(res.data);
		campaignCreating.value=false

		// router.push({name:'seller-cart-detail',params:{'campaign_id':route.params.campaign_id,'cart_id':cart.id}})

	}).catch(err=>{
		campaignCreating.value=false
	})
}
</script>

<style scoped>


</style>