<template>
	<div class="grid grid-cols-12 gap-5 w-full">
		<span class="col-span-12 text-lg my-4 ml-5">
			<strong>Payment Details</strong> 
		</span>
		<div id="paymentDetails" class="col-span-12">
			<AccordionGroup class="accordion-boxed">
				
				<AccordionItem v-for="payment in activePayment" :key="payment">
					<Accordion class="bg-primary rounded-t-lg ">
						<div class="text-white mx-3"> {{ paymentStore.paymentMap[payment] }} </div>
					</Accordion>
					<AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">
						<template v-if="payment === 'direct_payment'">
							<DirectPaymentContent />
						</template>
						<template v-else>
							<PaymentContent :paymentName="payment" />
						</template>
					</AccordionPanel>
				</AccordionItem>

			</AccordionGroup>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import PaymentContent from './PaymentContent.vue';
import DirectPaymentContent from './DirectPaymentContent.vue';

const paymentStore = useLSSPaymentMetaStore()
const sellerStore = useLSSSellerLayoutStore()
const activePayment = ref([])


onMounted(() => {
    const activated_country = sellerStore.userInfo.user_subscription.meta_country.activated_country[0]
    activePayment.value = paymentStore[activated_country]
})

</script>