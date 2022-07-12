<template>
   	<div class="flex flex-col text-[16px]" v-if="ready">
 		<h2 class="text-xl font-medium mt-5 mb-3 sm:text-center">Edit Campaign</h2>

		<div class="box px-10 py-5 grid grid-cols-12 gap-1 intro-y sm:gap-5 -z-50">
			<div class="col-span-12 col-start-1 2xl:col-span-6 xl:col-span-6">
				<div class="flex flex-col">
					<div class="flex flex-col">
						<label class="w-20 my-auto text-base form-label">Title</label>
							<input 
							class="form-control h-10 w-full sm:w-[90%]"
							type="text" 
							:class="{ 'border-danger': title_validate.title.$error}"
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
			<div class="flex flex-col col-span-12 -mb-5 2xl:col-span-6 xl:col-span-6">
				<div class="">
					<label for="regular-form-2" class="w-16 my-auto text-base form-label flex flex-col">Period</label>
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

			<div class="col-span-12 flex items-center justify-between py-3 mx-1 mt-5 leading-5 border-2 rounded-md border-slate-200">
				<h3 class="inline-flex my-auto ml-2 leading-5 align-middle md:ml-3 text-lg font-medium">
					Platform Connected
				</h3>


				<div class="inline-flex justify-around w-20 ml-auto mr-3 align-middle md:mr-5 ">
					<div class="w-8 h-8 border-0 flex-0 md:w-10 md:h-10 zoom-in" v-if="campaignData.facebook_page !== null">
						<Tippy tag="img" class="border-0 rounded-full" :src="campaignData.facebook_page.image"
						:content="campaignData.facebook_page.name" />
						<div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
							<img class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
						</div>
					</div>
					<div class="w-8 h-8 flex-0 md:w-10 md:h-10 zoom-in" v-if="campaignData.instagram_profile !== null">
						<Tippy tag="img" class="rounded-full " :src="campaignData.instagram_profile.image"
						:content="campaignData.instagram_profile.name" />
						<div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
							<img class="rounded-full bg-[#d63376]" :src="instagram_platform" >
						</div>
					</div>
					<div class="w-8 h-8 flex-0 md:w-10 md:h-10 zoom-in" v-if="campaignData.youtube_channel !== null">
						<Tippy tag="img" class="rounded-full" :src="campaignData.youtube_channel.image"
						:content="campaignData.youtube_channel.name" />
						<div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
							<img class="rounded-full bg-[#f70000]" :src="youtube_platform" >
						</div>
					</div>
				</div>

				<a @click="editplatform()" class="inline-flex mr-2 align-middle md:mr-5">
				<EditIcon class="w-4 h-4 mr-2" />Edit
				</a>
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

		<div class="mt-5 p-0 col-span-12 z-0">
			<div class="col-span-12 flex justify-end mt-5">
				<button class="btn w-32 dark:border-darkmode-400 bg-white" @click="$router.push({ name: 'campaigns' })">
					Cancel
				</button>
				<button class="btn btn-primary w-32 shadow-md ml-5" @click="updateCampaign()">
					Update
				</button>
			</div>
		</div>

		<!-- BEGIN Enter Post ID Modal -->
			<EnterPostIDModal />
		<!-- END Enter Post ID Modal -->
	</div>
</template>  

<script setup>
import { ref, watch, onMounted, computed, watchEffect, getCurrentInstance } from 'vue';

import PaymentForm from '@/views/create-campaign/payment-form/Main.vue'
import DeliveryForm from '@/views/create-campaign/DeliveryForm.vue';
import NotesForm from '@/views/create-campaign/NotesForm.vue';

import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useRoute, useRouter } from "vue-router";
import { retrieve_campaign, update_campaign } from '@/api_v2/campaign';

import EnterPostIDModal from "@/views/campaignlist/enter-post-id-modal/Main.vue"
import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import youtube_platform from "/src/assets/images/lss-img/youtube.png"
import facebook_platform from "/src/assets/images/lss-img/facebook.png"
import instagram_platform from "/src/assets/images/lss-img/instagram.png"
import unbound from "/src/assets/images/lss-img/noname.png"

const internalInstance = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const directPaymentImages = ref([])
const campaignData = ref({})
const dateTimePicker = ref({
	start:new Date(),
	end:new Date()
})

const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
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

const editplatform = ()=>{
	eventBus.emit('showEnterPostIDModal',{'campaign':campaignData.value})
}

</script>

