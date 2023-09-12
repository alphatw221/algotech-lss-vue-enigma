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
				<SocialPlatformConnectionForm v-model="data.social_platofrm_connections"/>
			</template>

		</CrudForm>
			

		<CrudForm
			:title="'Payment Settings'"    
			:formSettings="paymentSettings"
			:action="actions"
			v-model="data.payment_settings"
			class="intro-y"

		>
		
		</CrudForm>

		<CrudForm
			:title="'Logistic Settings'"    
			:formSettings="logisticSettings"
			:action="actions"
			v-model="data.logistic_settings"
			class="intro-y"

		>
		
		</CrudForm>

		<CrudForm
			:title="'Point Settings'"    
			:formSettings="pointSettings"
			:action="actions"
			v-model="data.point_settings"
		>
		
		</CrudForm>


		<CrudForm
			:title="'Message Settings'"    
			:formSettings="messageSettings"
			:action="actions"
			v-model="data.message_settings"
		>
		
		</CrudForm>


		<CrudForm
			:title="'Note Settings'"    
			:formSettings="noteSettings"
			:action="actions"
			v-model="data.note_settings"
		>
		
		</CrudForm>

		<div class="mt-5 flex flex-row justify-end px-5">
			<button class="btn btn-primary" @click="create()">Create</button>
		</div>
	</div>
   
</template>  

<script setup>
import CrudForm from '@/views/crud-form-lss/Main.vue'
import CrudWidge from '@/views/crud-form-lss/CrudWidge.vue'

import {generalSettings, logisticSettings, paymentSettings, messageSettings, pointSettings, noteSettings} from './settings'
import {getDefaultData} from './settings'
import { ref, watch, onMounted, computed, watchEffect } from 'vue';
import { required, minLength, maxLength, helpers, numeric, requiredIf, decimal, integer, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import i18n from "@/locales/i18n"


import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useCampaignDetailStore } from '@/stores/lss-campaign-detail';
import { useRoute, useRouter } from "vue-router";
// import { create_campaign, retrieve_campaign, update_campaign } from '@/api_v2/campaign';
import SocialPlatformConnectionForm from './social-platform-connection-form/SocialPlatformConnectionForm.vue'

const sellerStore = useLSSSellerLayoutStore()
const campaignDetailStore = useCampaignDetailStore();

const route = useRoute()
const router = useRouter()

const data = ref(getDefaultData())
const actions = {}

const create  =()=>{
	console.log(data.value)
}
</script>

<style scoped>


</style>