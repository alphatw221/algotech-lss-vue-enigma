<template  >
    <AccordionItem v-if="store.order.campaign" class="mx-5">
        <Accordion class="bg-primary rounded-t-lg">
            <div class="text-white mx-5">
                {{ store.order.campaign.meta_payment.direct_payment.direct_payment_button_title }} </div>
        </Accordion>

        <!-- BEGIN Direct Payment -->
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">

            <!-- BEGIN Direct Payment Select -->
            <ul class="flex list-none flex-wrap pt-3 pb-4 flex-row items-center justify-around self-center">
                <li class="last:mr-0 flex"
                    v-for="(account, key, index) in store.order.campaign.meta_payment.direct_payment.accounts"
                    :key="index">
                    <div
                        class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10 self-center w-fit">
                        <button @click="select_account(index)" :class="{
                            'text-neutral-600 bg-white': openTab !== index,
                            'text-white bg-primary': openTab === index,
                        }"
                            class="w-18 h-8 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
                            <div v-if="account.direct_payment_mode === ''"> Account {{ index + 1 }} </div>
                            <div v-else> {{ account.direct_payment_mode }} </div>
                        </button>
                    </div>
                </li>
            </ul>

            <div class="flex flex-col place-content-center items-center"
                v-for="(account, key, index) in store.order.campaign.meta_payment.direct_payment.accounts" :key="index"
                :class="{ hidden: openTab !== index, block: openTab === index }">
                <table>
                    <tr>
                        <td class="w-36">Account Number: </td>
                        <td>{{ account.direct_payment_number }}</td>
                    </tr>
                    <tr>
                        <td>Account Name: </td>
                        <td>{{ account.direct_payment_name }}</td>
                    </tr>
                    <tr>
                        <td>Note: </td>
                        <td>{{ account.direct_payment_note }}</td>
                    </tr>
                    <!-- <tr>
                        <td>Other Note ( Press enter to add new line )</td><td></td>
                    </tr> -->
                </table>
                <img class="w-36 h-36 mt-5 " :src="storageUrl + account.image" alt="" />
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
                maxFilesize: 256,
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
                    <br>accepted File types: jpeg, png, jpg
                </div>
            </Dropzone>
            <div class="m-3 flex flex-col">
                <label for="regular-form-2" class="form-label">Last Five Digits</label>
                <input id="regular-form-2" type="text" class="form-control"
                    :class="{ 'border-danger': validate.fiveDigits.$error }"
                    v-model.trim="validate.fiveDigits.$model" />
                <template v-if="validate.fiveDigits.$error">
                    <div class="form-help" :class="{ 'text-danger': validate.fiveDigits.$error }">
                        Please Enter Exactly 5 Digits
                    </div>
                </template>
                <button type="button"
                    class="mt-5 mx-3 w-fit btn btn-rounded-primary self-center lg:self-end 2xl:self-end"
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

const store = useLSSBuyerOrderStore();

const route = useRoute();
const router = useRouter();

const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL.slice(0, -1);
const receiptUploadDropzoneRef = ref();
const openTab = ref(0);

const select_account = index => openTab.value = index


const newData = reactive({ fiveDigits: "" });
const rules = {
    fiveDigits: {
        required,
        integer,
        minLength: minLength(5),
        maxLength: maxLength(5),
    },
};
const validate = useVuelidate(rules, toRefs(newData));

provide("bind[receiptUploadDropzoneRef]", (el) => {
    receiptUploadDropzoneRef.value = el;

    //a way to restrict user only upload one file at a time
    el.dropzone.on('addedfile', file => {
        const files = el.dropzone.getAcceptedFiles()
        if (files.length > 0) el.dropzone.removeFile(files[0])

    })
});

const uploadReceipt = () => {
    let formData = new FormData()
    formData.append('last_five_digit', newData.fiveDigits)
    formData.append('image', receiptUploadDropzoneRef.value.dropzone.getAcceptedFiles()[0] || '')


    buyer_upload_receipt(route.params.order_id, formData)
        .then(
            res => {
                store.order = res.data
                router.push(`/buyer/orders`)
            }
        )
}

</script>
