<template>
    <AccordionGroup class="accordion-boxed">

        <AccordionItem>
            <Accordion class="bg-primary rounded-t-lg ">
                <div class="text-white mx-3"> Direct Payment </div>
            </Accordion>
            <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">
                <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                    <li class="-mb-px last:mr-0 flex-auto text-center ml-14">
                        <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                            <button @click="toggleTabs(count)" :class="{
                                'text-neutral-600 bg-white': this.openTab !== count,
                                'text-white bg-primary': this.openTab === count,
                            }" class="w-8 h-8 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
                                {{this.count}}
                            </button>
                        </div>
                    </li>
                </ul>
                <div class="gird grid-cols-2 gap-5 mx-5 px-10" 
                    :class="{ hidden: this.openTab !== count, block: this.openTab === count }">
                    <table>
                        <tr>
                            <td>Country</td><td></td>
                        </tr>
                        <tr>
                            <td>Account Number</td><td></td>
                        </tr>
                        <tr>
                            <td>Account Name</td><td></td>
                        </tr>
                        <tr>
                            <td>Other Note ( Press enter to add new line )</td><td></td>
                        </tr>
                    </table>
                </div>
                <Dropzone ref-key="dropzoneValidationRef" :options="{
                    url: 'https://httpbin.org/post',
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    acceptedFiles: 'image/jpeg|image/png|image/jpg',
                    headers: { 'My-Awesome-Header': 'header value' },
                }" class="dropzone">
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
                </div>
            </AccordionPanel>
        </AccordionItem>

        <!--     
    <AccordionItem>
        <Accordion class="bg-primary rounded-t-lg">
            <div class="text-white mx-3"> HitPay </div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining
            essentially unchanged.
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <Accordion class="bg-primary rounded-t-lg ">
            <div class="text-white mx-3"> First Data IPG </div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
            When you place an order, you will be taken to PayPal to complete your service. 
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <Accordion class="bg-primary rounded-t-lg ">
            <div class="text-white mx-3"> PayPal </div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
            When you place an order, you will be taken to PayPal to complete your service.
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <Accordion class="bg-primary rounded-t-lg ">
            <div class="text-white mx-3"> Stripe </div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
            When you place an order, you will be taken to PayPal to complete your service.
        </AccordionPanel>
    </AccordionItem> -->
    </AccordionGroup>
</template>


<script setup>

import { computed, onMounted, ref, watch } from "vue";
import { useLSSPaymentMetaStore } from "@/stores/lss-payment-meta";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { buyer_upload_receipt } from "@/api_v2/order"

import { useRoute, useRouter } from "vue-router";
const openTab = ref(1);
const route = useRoute();
const count = ref(1);
const paymentMetaStore = useLSSPaymentMetaStore();
const shoppingCartStore = useShoppingCartStore();

function toggleTabs(tabNumber) {
    this.openTab = tabNumber
}
function increment() {
  count.value++
}
</script>
