<template>
	<div class="grid grid-cols-12 gap-5 w-full">
		<span class="col-span-12 text-lg my-4 ml-5">
			<strong>Payment Details</strong> 
		</span>
		<div id="paymentDetails" class="col-span-12">
			<AccordionGroup class="accordion-boxed">
				
				<AccordionItem  v-if="activePayment.includes('directPayment')">
					<Accordion class="bg-primary rounded-t-lg ">
						<div class="text-white mx-3"> Direct Payment </div>
					</Accordion>
					<AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">
						<PaymentAccordionContent :paymentName="'directPayment'" />
						<!-- <Dropzone ref-key="dropzoneValidationRef" :options="{
							url: 'https://httpbin.org/post',
							thumbnailWidth: 150,
							maxFilesize: 0.5,
							acceptedFiles: 'image/jpeg|image/png|image/jpg',
							headers: { 'My-Awesome-Header': 'header value' },
						}" 
							class="dropzone"
						>
						<div class="text-lg font-medium">
							Drop files here or click to upload.
						</div>
						<div class="text-gray-600">
							This is just a demo dropzone. Selected files are
							<span class="font-medium">not</span> actually uploaded.
							<br>accepted File types: jpeg, png, jpg
						</div>
						</Dropzone>
						<div class="m-3">
						<label for="regular-form-2" class="form-label">Last Five Digits</label>
						<input id="regular-form-2" type="text" class="form-control form-control" />
						</div> -->
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem v-if="activePayment.includes('hitpay')">
					<Accordion class="bg-primary rounded-t-lg">
						<div class="text-white mx-3"> HitPay </div>
					</Accordion>
					<AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
						Lorem Ipsum is simply dummy text of the printing and
						typesetting indus
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem v-if="activePayment.includes('firstData')">
					<Accordion class="bg-primary rounded-t-lg ">
						<div class="text-white mx-3"> First Data IPG </div>
					</Accordion>
					<AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
						When you place an order, you will be taken to PayPal to complete your service.
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem v-if="activePayment.includes('paypal')">
					<Accordion class="bg-primary rounded-t-lg ">
						<div class="text-white mx-3"> PayPal </div>
					</Accordion>
					<AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
						When you place an order, you will be taken to PayPal to complete your service.
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem v-if="activePayment.includes('stripe')">
					<Accordion class="bg-primary rounded-t-lg ">
						<div class="text-white mx-3"> Stripe </div>
					</Accordion>
					<AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
						<PaymentAccordionContent :paymentName="'stripe'" />
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
import PaymentAccordionContent from './PaymentAccordionContent.vue';


const paymentStore = useLSSPaymentMetaStore()
const sellerStore = useLSSSellerLayoutStore()
const activePayment = ref([])

onMounted(() => {
    const activated_country = sellerStore.userInfo.user_subscription.meta_country.activated_country[0]
	console.log(activated_country)
    activePayment.value = paymentStore[activated_country]
})

</script>