<template>
    <AccordionItem  class="mx-5 " >
        <Accordion class="bg-primary rounded-t-lg" >
            <div class="text-white mx-5" > <span class="text-2xl">{{payment.name}}</span> {{ payment.key == "ecpay" ? "(線上匯款/信用卡/超商代碼繳費/超商條碼繳費)" : "" }}</div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary" >


            <div v-if="props.payment.handle.type=='gateway'" class="text-center">
                <img :src="props.payment.icon" alt="" class="w-48 mx-auto mt-5">
                <button class="btn btn-primary mt-1 mb-5" @click="handlePayment()">{{$t('shopping_cart.payment.pay_with')}} {{props.payment.name}} </button>
            </div>

            <div v-else-if="props.payment.handle.type=='submitForm'" class="text-center">
                <img :src="props.payment.icon" alt="" class="w-48 mx-auto mt-5">
                <!-- <template v-if="props.payment.invoice">
                    <div class="flex px-10 py-6 my-4 border-2 rounded-lg form-check">
                        <input :id="'phone-invoice'" class="form-check-input" type="radio"
                            name="vertical_radio_button" />
                        <label class="mr-auto form-check-label" :for="'phone-invoice'">手機條碼載具</label>
                        <input type="text"> 
                    </div>
                    <div class="flex px-10 py-6 my-4 border-2 rounded-lg form-check">
                        <input :id="'phone-invoice'" class="form-check-input" type="radio"
                            name="vertical_radio_button" />
                        <label class="mr-auto form-check-label" :for="'phone-invoice'">自然人憑證條碼載具</label>
                        <input type="text"> 
                    </div>
                    <div class="flex px-10 py-6 my-4 border-2 rounded-lg form-check">
                        <input :id="'phone-invoice'" class="form-check-input" type="radio"
                            name="vertical_radio_button" />
                        <label class="mr-auto form-check-label" :for="'phone-invoice'">捐贈發票</label>
                        <input type="text"> 
                    </div>
                    <div class="flex px-10 py-6 my-4 border-2 rounded-lg form-check">
                        <input :id="'phone-invoice'" class="form-check-input" type="radio"
                            name="vertical_radio_button" />
                        <label class="mr-auto form-check-label" :for="'phone-invoice'">索取紙本</label>
                        <input type="text"> 
                    </div>
                </template> -->
                <button class="btn btn-primary mt-2 mb-5" @click="handlePayment()">{{$t('shopping_cart.payment.go_pay')}}</button>
                <form method="post" action="https://test.ipg-online.com/connect/gateway/processing" :id="props.payment.key" class="hidden">
                    <input type="submit" value="" class="hidden">
                </form>
            </div>

            <div v-else-if="props.payment.handle.type=='embed'">
                <div :id="props.payment.key">

                </div>
            </div>

        </AccordionPanel>

    </AccordionItem>
</template>

<script setup>

import { computed, onMounted, ref, watch, provide, reactive, toRefs ,defineProps} from "vue";
import { useRoute, useRouter } from "vue-router";
import {paymentEndPoints} from "@/api_v2/payment";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"

const layoutStore = useLSSBuyerLayoutStore();
const props = defineProps({
    payment: Object,
});

const route = useRoute();
const router = useRouter();


const handlePayment=()=>{
    if(props.payment.handle.type=='gateway'){
        const getUrl = paymentEndPoints[props.payment.handle.endpoint]
        getUrl(route.params.order_oid, layoutStore.alert).then(res=>{
            window.location.href = res.data
            // window.open(res.data)
            // console.log(res.data)
        })
    }else if(props.payment.handle.type=='submitForm'){
        const getCredential = paymentEndPoints[props.payment.handle.endpoint]
        getCredential(route.params.order_oid, layoutStore.alert).then(res=>{
            console.log(res.data)
            // const params = res.data.data
            
            // document.body.innerHTML = params
            // document.getElementById("data_set").submit();

            const form = document.createElement('form');
            form.setAttribute("id", "data_set");
            form.method = 'post';
            form.action = res.data.action;
            const params = res.data.data
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    const hiddenField = document.createElement('input');
                    hiddenField.type = 'hidden';
                    hiddenField.name = key;
                    hiddenField.value = params[key];

                form.appendChild(hiddenField);
                }
            }

            document.body.appendChild(form);
            form.submit();

            // for (const [key, value] of Object.entries(res.credential)) {
            //     $('<input>').attr({
            //         type: 'hidden',
            //         name: key,
            //         value: value
            //     }).appendTo(this.first_data_hidden_form);
            // }
            // this.first_data_hidden_form.find('input[type=submit]').click();

        })
        

    }else{

    }
}


</script>
