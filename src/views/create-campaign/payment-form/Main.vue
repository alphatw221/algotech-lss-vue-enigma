<template>
	<div class="box mt-3 p-10 mt-3 flex flex-col p-5 gap-5 intro-y gap-1 sm:gap-5 -z-50 text-base" v-if="ready">
		<span class="text-lg font-medium leading-none col-span-12">Payment Details</span>
		<hr class="col-span-12">
		<div id="paymentDetails">
			<AccordionGroup>
				<div v-for="(payment,key,index) in props.campaign.meta_payment" :key="index" class="sm:mx-3">

					<AccordionItem v-if="paymentStore[key] && key=='direct_payment'" class="items">
						<Accordion class="bg-primary rounded-t-lg">
							<div class="justify-between flex flex-col text-white mx-3 col-span-12 sm:col-span-6"> {{ paymentStore[key].name }} </div>
							<div>
								<font-awesome-icon icon="fa-solid fa-angle-down" class="flex flex-wrap col-span-12 sm:col-span-6 h-6 text-white float-right inline-block mr-3" />
							</div>
						</Accordion>
						<AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">
							<DirectPayment :campaign="props.campaign" :payment="paymentStore[key]" :directPaymentImages="props.directPaymentImages"/>
						</AccordionPanel>
					</AccordionItem>

					<AccordionItem v-else-if="paymentStore[key] && key!='direct_payment'" class="items">
						<Accordion class="bg-primary rounded-t-lg">
							<div class="text-white mx-3"> {{ paymentStore[key].name }} </div>
						</Accordion>
						<AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">

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
	directPaymentImages:Array
})
// const activePayment = ref([])
const ready = ref(false)

onMounted(() => {
	ready.value=true

    // const activated_country = sellerStore.userInfo.user_subscription.meta_country.activated_country[0]
    // activePayment.value = paymentStore[activated_country]
})

</script>


<style scoped>

.items{
	margin-top: 10px !important;
	margin-bottom: 10px !important;
}
</style>