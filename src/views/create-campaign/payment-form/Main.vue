<template>
	<div class="box flex flex-col p-5 sm:p-8 gap-4 lg:mx-20 lg:px-40 px-2 py-10 mt-3" v-if="ready">
		<span class="col-span-12 text-xl font-medium leading-none lg:-mx-6">{{$t('create_campaign.payment_form.payment_details')}}</span>
		<hr class="-mx-6 mb-3"/>
		<div id="paymentDetails">
			<AccordionGroup :selectedIndex="null">
				<div v-for="(payment,key,index) in props.campaign.meta_payment" :key="index">

					<AccordionItem v-if="paymentStore[key] && key=='direct_payment'" class="items">
						<Accordion class="rounded-t-lg bg-primary">
							<span class="mx-3 text-white w-fit"> {{$t(`create_campaign.payment_form.payment_titles.${key}`)}}</span>  
							<div class="float-right">
								<input 
									class="form-control form-check-input w-[1.2rem] h-[1.2rem]" 
									type="checkbox" 
									v-model=" props.campaign.meta_payment.direct_payment.enabled"
								/>
								<label class="ml-3 form-label text-base font-medium text-white mr-2">{{$t('create_campaign.payment_form.enabled')}}</label>
								<font-awesome-icon icon="fa-solid fa-angle-down" class="inline-block float-right h-6 mr-3 text-white" />
							</div>
						</Accordion>
						<AccordionPanel class="leading-relaxed border-2 text-slate-600 dark:text-slate-500 border-secondary">
							<DirectPayment :campaign="props.campaign" :payment="paymentStore[key]" :directPaymentImages="props.directPaymentImages" :v="props.v"/>
						</AccordionPanel>
					</AccordionItem>

					<AccordionItem v-else-if="paymentStore[key] && key!='direct_payment'" class="items">
						<Accordion class="rounded-t-lg bg-primary">
							<span class="mx-3 text-white w-fit"> {{$t(`create_campaign.payment_form.payment_titles.${key}`)}}</span> 
							<div class="float-right">
								<input 
									class="form-control form-check-input w-[1.2rem] h-[1.2rem]" 
									type="checkbox" 
									v-model="props.campaign.meta_payment[paymentStore[key].key].enabled"
								/>
								<label class="ml-3 form-label text-base font-medium text-white mr-2">{{$t(`create_campaign.payment_form.enabled`)}}</label>	
								<font-awesome-icon icon="fa-solid fa-angle-down" class="inline-block float-right h-6 mr-3 text-white" />
							</div>
						</Accordion>
						<AccordionPanel class="leading-relaxed border-2 text-slate-600 dark:text-slate-500 border-secondary">

							<PaymentMethod :campaign="props.campaign" :payment="paymentStore[key]"/>

						</AccordionPanel>
					</AccordionItem>
				</div>
			</AccordionGroup>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

import DirectPayment from './DirectPayment.vue'
import PaymentMethod from './PaymentMethod.vue'


const paymentStore = useLSSPaymentMetaStore()
const sellerStore = useLSSSellerLayoutStore()

const props = defineProps({
    campaign: Object,
	directPaymentImages:Array,
	v:Object
})
// const activePayment = ref([])
const ready = ref(false)

onMounted(() => {
	ready.value=true
	
    // const activated_country = sellerStore.userInfo.user_subscription.meta_country.activated_country[0]
    // activePayment.value = paymentStore[activated_country]
})

const out = () => {
	props.campaign.meta_payment.direct_payment.enabled = !props.campaign.meta_payment.direct_payment.enabled
}
</script>


<style scoped>

.items{
	margin-top: 10px !important;
	margin-bottom: 10px !important;
}

</style>