<template>
    <AccordionItem  class="mx-5 show">
        <Accordion class="rounded-t-lg bg-primary" >
            <div class="mx-5 text-white" v-if="store.order.campaign"> {{store.order.campaign.meta_payment.direct_payment.direct_payment_button_title}} </div>
        </Accordion>

        <!-- BEGIN Direct Payment -->
        <AccordionPanel class="leading-relaxed border-2 text-slate-600 dark:text-slate-500 border-secondary" >

            <!-- BEGIN Direct Payment Select -->
            <div v-if="store.order.campaign">

            
                <ul class="flex flex-row flex-wrap items-center self-center justify-around pt-3 pb-4 list-none" >
                    <li class="flex last:mr-0" v-for="(account, key, index) in store.order.campaign.meta_payment.direct_payment.accounts" :key="index">
                        <div class="z-10 flex items-center self-center flex-1 intro-x lg:text-center lg:mt-0 lg:block w-fit">
                            <button @click="select_account(index)" :class="{
                                'text-neutral-600 bg-white': openTab !== index,
                                'text-white bg-primary': openTab === index,
                            }" class="h-8 rounded-full shadow-lg w-18 btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
                                <div v-if="account.direct_payment_mode === ''"> Account {{index+1}} </div>
                                <div v-else> {{ account.direct_payment_mode }} </div>
                            </button>
                        </div>
                    </li>
                </ul>

                <div class="flex flex-col items-center place-content-center" v-for="(account, key, index) in store.order.campaign.meta_payment.direct_payment.accounts" :key="index"
                    :class="{ hidden: openTab !== index, block: openTab === index }">
                    <table>
                        <tr>
                            <td class="w-36">Account Number: </td><td>{{account.direct_payment_number}}</td>
                        </tr>
                        <tr>
                            <td>Account Name: </td><td>{{account.direct_payment_name}}</td>
                        </tr>
                        <tr>
                            <td>Note: </td><td>{{account.direct_payment_note}}</td>
                        </tr>
                        <!-- <tr>
                            <td>Other Note ( Press enter to add new line )</td><td></td>
                        </tr> -->
                    </table>
                    <img class="mt-5 w-36 h-36 " :src="account.image" alt="" />
                </div>
            </div>
            <!-- direct_payment_mode: "22"
        direct_payment_name: "123"
        direct_payment_note: "555555555"
        direct_payment_number: "112"
        direct_payment_require_customer_return: 1
        image: "/1/payment/direct_payment/prize 2022-02-15 150845.png" -->




            <!-- END Direct Payment Select -->

            <!-- acceptedFiles: 'image/jpeg|image/png|image/jpg', -->

            <Dropzone ref-key="receiptUploadDropzoneRef" :options="{
                method: 'put',
                url: 'url',
                uploadMultiple: false,
                thumbnailWidth: 150,
                maxFilesize: 10,
                addRemoveLinks: true,
                autoProcessQueue: false,
                clickable: true,
                acceptedFiles: 'image/*',
            }" class="dropzone">

                <div class="text-lg font-medium">
                    Drop files here or click to upload.
                </div>
                <div class="text-gray-600">
                    <!-- This is just a demo dropzone. Selected files are
                <span class="font-medium">not</span> actually uploaded. -->
                    <br>File types: jpeg, png, jpg
                </div>
                <div class="text-gray-600">Max file size : 10MB</div>  
            </Dropzone>
            <div class="flex flex-col m-3">
                <label for="regular-form-2" class="form-label">Last Five Digits</label>
                <input id="regular-form-2" type="text" class="form-control"
                    :class="{ 'border-danger': uploadValidate.fiveDigits.$error }"
                    v-model.trim="uploadValidate.fiveDigits.$model" />
                <template v-if="uploadValidate.fiveDigits.$error">
                    <div class="form-help" :class="{ 'text-danger': uploadValidate.fiveDigits.$error }">
                        Please Enter Exactly 5 Digits
                    </div>
                </template>
                <button type="button"
                    class="self-center mx-3 mt-5 w-fit btn btn-rounded-primary lg:self-end 2xl:self-end"
                    @click="uploadReceipt()">Upload & Complete Order</button>
            </div>
        </AccordionPanel>

    </AccordionItem>
</template>

<script setup>

import { computed, onMounted, ref, watch, provide, reactive, toRefs } from "vue";

import { buyer_upload_receipt } from "@/api_v2/order";

import { useRoute, useRouter } from "vue-router";

import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";

import {
    minLength,
    maxLength,
    integer,
    required
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()
const store = useLSSBuyerOrderStore();
const layoutStore = useLSSBuyerLayoutStore();
const route = useRoute();
const router = useRouter();
const isAnonymousUser=cookies.get("login_with")=='anonymousUser'

const receiptUploadDropzoneRef = ref();
const openTab = ref(0);
const select_account = index => openTab.value = index


const data = reactive({ fiveDigits: "" });
const dataRules = {
    fiveDigits: {
        required,
        integer,
        minLength: minLength(5),
        maxLength: maxLength(5),
    },
};
const uploadValidate = useVuelidate(dataRules, toRefs(data));

provide("bind[receiptUploadDropzoneRef]", (el) => {
    receiptUploadDropzoneRef.value = el;

    //a way to restrict user only upload one file at a time
    el.dropzone.on('addedfile', file => {
        const files = el.dropzone.getAcceptedFiles()
        if (files.length > 0) el.dropzone.removeFile(files[0])

    })
});

const uploadReceipt = () => {
    

    const campaign = store.order.campaign
    if(!campaign) return
    const meta_payment = campaign.meta_payment
    if(!meta_payment) return
    const account = Object.values(meta_payment.direct_payment.accounts)[openTab.value]
    if(account.direct_payment_require_customer_return){
        uploadValidate.value.$touch();
        if (uploadValidate.value.$invalid) {
            layoutStore.alert.showMessageToast("Invalid data")
            return
        }
    }
    let formData = new FormData()
    formData.append('last_five_digit', data.fiveDigits)
    formData.append('image', receiptUploadDropzoneRef.value.dropzone.getAcceptedFiles()[0] || '')
    formData.append('account_name', account.direct_payment_name)
    formData.append('account_mode', account.direct_payment_mode)

    buyer_upload_receipt(route.params.order_oid, formData, layoutStore.alert)
        .then(
            res => {
                store.order = res.data
                router.push(`/buyer/order/${route.params.order_oid}/confirmation`)
            }
        )
}

</script>
