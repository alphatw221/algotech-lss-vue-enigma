<template>
    <div class="box p-5 flex flex-col gap-5 text-[16px]" v-if="ready">
		<span class="text-xl mt-5"> Edit Campaign </span>

		<div class="intro-y grid grid-cols-12 gap-1 sm:gap-5 -z-50 ml-3">
		<div class="col-start-1 col-span-12 2xl:col-span-6 xl:col-span-6">
			<div class="flex flex-col">
				<div class="flex">
					<label class="form-label w-20 text-base my-auto">Title</label>
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
					<label for="regular-form-2" class="form-label w-16 text-base my-auto">Period</label>
					<v-date-picker class=" z-49" v-model="dateTimePicker" :timezone="''" mode="dateTime" is-range is-required>
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
		</div>

		<div class="border-2 border-slate-200 rounded-md mt-5  leading-5 flex justify-between items-center py-3
			mx-1 
			md:mx-3 
		">
			<h3 class="inline-flex my-auto align-middle
				ml-2
				md:ml-3
				leading-5
			"
			
			>
				Platform Connected</h3>
			

			<div class="inline-flex w-20 justify-around align-middle  mr-3 md:mr-5 ml-auto ">
              <div class="flex-0 w-8 h-8 md:w-10 md:h-10  zoom-in border-0" v-if="campaignData.facebook_page !== null">
                <Tippy tag="img" class="rounded-full border-0" :src="campaignData.facebook_page.image"
                  :content="campaignData.facebook_page.name" />
                  <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                      <img class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                  </div>
              </div>
              <div class="flex-0 w-8 h-8 md:w-10 md:h-10 zoom-in" v-if="campaignData.instagram_profile !== null">
                <Tippy tag="img" class="rounded-full " :src="campaignData.instagram_profile.image"
                  :content="campaignData.instagram_profile.name" />
                <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                      <img class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                  </div>
              </div>
              <div class="flex-0 w-8 h-8 md:w-10 md:h-10 zoom-in" v-if="campaignData.youtube_channel !== null">
                <Tippy tag="img" class="rounded-full" :src="campaignData.youtube_channel.image"
                  :content="campaignData.youtube_channel.name" />
                  <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                      <img class="rounded-full bg-[#f70000]" :src="youtube_platform" >
                  </div>
              </div>
            </div>

			<a @click="editplatform()" class="align-middle inline-flex mr-2 md:mr-5">
				Edit
			</a>
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
			<div class="col-span-12 flex justify-end mt-5 text-[#060607]">
				<button class="btn btn-rounded-secondary w-24 mr-2 mb-2" @click="$router.push({ name: 'campaigns' })">
					Cancel
				</button>
				<button class="btn btn-rounded-primary w-24 mr-1 mb-2" @click="updateCampaign()">
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

