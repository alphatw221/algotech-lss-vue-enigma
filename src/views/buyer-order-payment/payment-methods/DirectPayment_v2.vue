<template>
    <AccordionItem  class="mx-5 show">
        <Accordion class="rounded-t-lg bg-primary" >
            <div class="mx-5 text-white text-[20px]" v-if="store.order.campaign">{{$t('shopping_cart.payment.direct.title')}}</div>
        </Accordion>

        <!-- BEGIN Direct Payment -->
        <AccordionPanel class="leading-relaxed border-2 text-slate-600 dark:text-slate-500 border-secondary" >

            <!-- BEGIN Direct Payment Select -->
            <div class="mb-5 mx-5" v-if="store.order.campaign">

            
                <ul class="flex flex-row gap-3 flex-wrap items-center self-center justify-around pt-3 pb-4 list-none" >
                    <li class="flex last:mr-0" v-for="(account, index) in store.order.campaign.meta_payment.direct_payment.v2_accounts" :key="index">
                        <div class="z-10 flex items-center self-center flex-1 intro-x lg:text-center lg:mt-0 lg:block w-fit">
                            <button @click="show_account_info(index)" :class="{
                                'text-neutral-600 bg-white shadow-lg': openTab !== index,
                                'bg-slate-300 font-semibold': openTab === index,
                            }" class="h-10 rounded-lg btn border-slate-300 text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
                                <CheckIcon v-show="openTab === index" :class="{ 'rounded-full bg-white mr-2': true}" />
                                <div v-if="account.mode === ''"> {{$t('shopping_cart.payment.direct.account')}} {{index+1}} </div>
                                <div v-else> {{ account.mode }} </div>
                            </button>
                        </div>
                    </li>
                </ul>

                <div class="flex flex-col items-center place-content-center mt-5" v-for="(account, index) in store.order.campaign.meta_payment.direct_payment.v2_accounts" :key="index"
                    :class="{ hidden: openTab !== index, block: openTab === index }"
                    v-show="openTab===index"
                    >
                    <h5 class="mx-auto font-bold text-black mb-3">{{$t('shopping_cart.payment.direct.information')}}</h5>
                    <table>
                        <tr>
                            <td class="w-36">{{$t('shopping_cart.payment.direct.account')}}：</td><td>{{account.number}}</td>
                        </tr>
                        <tr>
                            <td>{{$t('shopping_cart.payment.direct.account_name')}}：</td><td>{{account.name}}</td>
                        </tr>
                        <tr>
                            <td>{{$t('shopping_cart.payment.direct.note')}}：</td><td>{{account.note}}</td>
                        </tr>
                        <!-- <tr>
                            <td>Other Note ( Press enter to add new line )</td><td></td>
                        </tr> -->
                    </table>
                    <img class="mt-5 w-36 h-36 " :src="account.image" alt="" />
                </div>
            </div>

            <!-- BEGIN Direct Payment Radio -->
            <!-- <div class="flex flex-col m-5">
                <label for="regular-form-2" class="form-label">{{$t('shopping_cart.payment.direct.beneficiary')}}</label>
                <div class="inline-flex" >
                    <div  class="m-2" v-for="(account, index) in store.order.campaign.meta_payment.direct_payment.v2_accounts" :key="index">
                        <input type="radio" class="mx-1 hover:cursor-pointer" :value="index" v-model="selectAccountIndex"/>
                        {{account.mode}}
                    </div>
                </div>
            </div> -->
            <!-- END Direct Payment Radio -->
            <h5 class="mx-auto font-bold text-black mb-3 text-center">{{$t('shopping_cart.payment.direct.upload_record')}}</h5>
            <Dropzone ref-key="receiptUploadDropzoneRef" :options="{
                method: 'put',
                url: 'url',
                uploadMultiple: false,
                maxFilesize: 10,
                addRemoveLinks: true,
                autoProcessQueue: false,
                resizeQuality: 0.5,
                clickable: true,
                acceptedFiles: 'image/*',
            }" class="dropzone h-fit">
                
                <div class="text-lg font-medium">
                   {{$t('shopping_cart.payment.direct.upload_img')}}
                </div>
                <div class="text-gray-600">
                    <br>{{$t('shopping_cart.payment.direct.accepted_types')}}：jpeg, png, jpg
                </div>
                <div class="text-gray-600">{{$t('shopping_cart.payment.direct.max_size')}}：10MB</div>  
            </Dropzone>

            <h4 class="mx-auto my-4 font-bold text-black mb-3 text-center">{{$t('shopping_cart.payment.direct.or')}}</h4>
            <div class="flex flex-col m-3">

                <label for="regular-form-2" class="form-label text-center">{{$t('shopping_cart.payment.direct.last_five_digits')}}</label>
                <input id="regular-form-2" type="text" class="form-control"
                    :class="{ 'border-danger': uploadValidate.fiveDigits.$error }"
                    v-model.trim="uploadValidate.fiveDigits.$model" />
                <template v-if="uploadValidate.fiveDigits.$error">
                    <div class="form-help" :class="{ 'text-danger': uploadValidate.fiveDigits.$error }">
                        {{$t('shopping_cart.payment.direct.digits_message')}}
                    </div>
                </template>

                <button type="button" v-if="uploadReceiptLoading"
                    class="self-center mx-3 mt-5 w-fit btn btn-rounded-primary lg:self-end 2xl:self-end"
                    >
                    {{$t('shopping_cart.payment.direct.complete_order')}}
                    <LoadingIcon icon="three-dots" color="1a202c" class="absolute w-12 h-5"/>
                </button>
                <button type="button" v-else
                    class="self-center mx-3 mt-5 w-fit btn btn-primary rounded-lg lg:self-end 2xl:self-end"
                    @click="uploadReceipt()">{{$t('shopping_cart.payment.direct.complete_order')}}
                </button>
            </div>
        </AccordionPanel>

    </AccordionItem>
</template>

<script setup>

import { computed, onMounted, ref, watch, provide, reactive, toRefs } from "vue";

import { buyer_upload_receipt } from "@/api_v2/order";

import { useRoute, useRouter } from "vue-router";

import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";

import i18n from "@/locales/i18n"

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
const selectAccountIndex = ref(0);
const uploadReceiptLoading = ref(false);

const show_account_info = index => {
    openTab.value = index
    selectAccountIndex.value= index
}
const select_account = index =>{ selectAccountIndex.value= index}

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
onMounted(() => {})
const uploadReceipt = () => {
    

    const campaign = store.order.campaign
    if(!campaign) return
    const meta_payment = campaign.meta_payment
    if(!meta_payment) return
    
    let receiptImage = receiptUploadDropzoneRef.value.dropzone.getAcceptedFiles()[0]
    
    const account = Object.values(meta_payment.direct_payment.v2_accounts)[selectAccountIndex.value]
    if([undefined,null,''].includes(receiptImage) && account.require_customer_return) {
        uploadValidate.value.$touch();
        if (uploadValidate.value.$invalid) {
            layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_data'))
            return
        }
    }
    let formData = new FormData()
    formData.append('last_five_digit', data.fiveDigits)
    formData.append('image', receiptImage || '')
    formData.append('account_name', account.name)
    formData.append('account_mode', account.mode)

    uploadReceiptLoading.value = true
    buyer_upload_receipt(route.params.order_oid, formData, layoutStore.alert)
        .then(
            res => {
                store.order = res.data
                uploadReceiptLoading.value = false
                router.push(`/buyer/order/${route.params.order_oid}/confirmation`)
            }
        ).catch(err=>{
            layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.err'))
            uploadReceiptLoading.value = false
        })
}
 
</script>
