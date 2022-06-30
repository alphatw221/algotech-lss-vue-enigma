<template>
	<div class="grid grid-cols-12 gap-5 w-full" v-if="ready">
		<span class="col-span-12 text-lg my-4 ml-5">
			<strong>Payment Details</strong> 
		</span>
		<div id="paymentDetails" class="col-span-12">
			<AccordionGroup class="accordion-boxed">
				<div v-for="(payment,key,index) in props.campaign.meta_payment" :key="index">



					<AccordionItem v-if="paymentStore[key] && key=='direct_payment'">
						<Accordion class="bg-primary rounded-t-lg ">
							<div class="text-white mx-3"> {{ paymentStore[key].name }} </div>
						</Accordion>
						<AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">
							<DirectPayment :campaign="props.campaign" :payment="paymentStore[key]" :directPaymentImages="props.directPaymentImages"/>
						</AccordionPanel>
					</AccordionItem>



					<AccordionItem v-else-if="paymentStore[key] && key!='direct_payment'">
						<Accordion class="bg-primary rounded-t-lg ">
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