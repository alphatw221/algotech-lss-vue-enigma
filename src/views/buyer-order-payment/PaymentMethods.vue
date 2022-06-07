<template>
    <AccordionGroup class="accordion-boxed" v-for="(payment, key) in paymentMeta" :key="key"> 

        <AccordionItem v-if="payment.handle.type=='upload'">
            <Accordion class="bg-primary rounded-t-lg ">
                <div class="text-white mx-3"> Direct Payment </div>
            </Accordion>

            <!-- BEGIN Direct Payment -->
            <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">

                <!-- BEGIN Direct Payment Select -->
                <div >

                    <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                        <li class="-mb-px last:mr-0 flex-auto text-center ml-14">
                            <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                                <button @click="toggleTabs(count)" :class="{
                                    'text-neutral-600 bg-white': this.openTab !== count,
                                    'text-white bg-primary': this.openTab === count,
                                }" class="w-8 h-8 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
                                    1
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

                </div>
                <!-- END Direct Payment Select -->
                
                <!-- acceptedFiles: 'image/jpeg|image/png|image/jpg', -->

                <Dropzone ref-key="receiptUploadDropzoneRef" :options="{
                    method:'put',
                    url: 'url',
                    uploadMultiple:false,
                    thumbnailWidth: 150,
                    maxFilesize: 256,
                    addRemoveLinks:true,
                    autoProcessQueue:false,
                    clickable:true,
                    acceptedFiles: 'image/*',
                }" class="dropzone">

                    <div class="text-lg font-medium">
                        Drop files here or click to upload.
                    </div>
                    <div class="text-gray-600">
                        <!-- This is just a demo dropzone. Selected files are
                        <span class="font-medium">not</span> actually uploaded. -->
                        <br>accepted File types: jpeg, png, jpg
                    </div>
                </Dropzone>
                <div class="m-3">
                    <label for="regular-form-2" class="form-label">Last Five Digits</label>
                    <input id="regular-form-2" type="text" class="form-control form-control" />
                    <button type="button" @click="uploadReceipt()" >Upload</button>
                </div>
            </AccordionPanel>
        </AccordionItem>
        <!-- END Direct Payment -->

        <AccordionItem v-if="payment.handle.type=='gateway'">
            <Accordion class="bg-primary rounded-t-lg ">
                <div class="text-white mx-3"> {{ payment.name }} </div>
            </Accordion>
            <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
                When you place an order, you will be taken to PayPal to complete your service.
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
    </AccordionItem> -->


    


    </AccordionGroup>
</template>


<script setup>

import { computed, onMounted, ref, watch, provide } from "vue";
import { useLSSPaymentMetaStore } from "@/stores/lss-payment-meta";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { buyer_upload_receipt } from "@/api_v2/order";

import { useRoute, useRouter } from "vue-router";


const route = useRoute();
const paymentMetaStore = useLSSPaymentMetaStore();
const shoppingCartStore = useShoppingCartStore();


const paymentMeta = computed(()=>{

    const campaign = shoppingCartStore.order.campaign||null
    if(!campaign)return{}
    const user_subscription = campaign.user_subscription||null
    if(!user_subscription)return{}
    let paymentMeta = {}
    user_subscription.meta_country.activated_country.forEach(country => {
        paymentMetaStore[country].forEach(payment=>{
            paymentMeta[payment] = paymentMetaStore[payment]
        })
    });

    return paymentMeta
})





const receiptUploadDropzoneRef = ref();

provide("bind[receiptUploadDropzoneRef]", (el) => {
    receiptUploadDropzoneRef.value = el;

    //a way to restrict user only upload one file at a time
    el.dropzone.on('addedfile',file=>{
        const files = el.dropzone.getAcceptedFiles()
        if(files.length>0) el.dropzone.removeFile(files[0])
        
    })
});

const uploadReceipt = ()=>{

    let formData = new FormData()
    formData.append('last_five_digits','12345' )
    formData.append('image',receiptUploadDropzoneRef.value.dropzone.getAcceptedFiles()[0]||null)
    buyer_upload_receipt(route.params.order_id, formData)
    .then(
        res => {
            console.log(res)
        }
    )
}


</script>
