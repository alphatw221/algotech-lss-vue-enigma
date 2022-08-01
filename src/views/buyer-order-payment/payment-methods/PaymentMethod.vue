<template>
    <AccordionItem  class="mx-5 " >
        <Accordion class="bg-primary rounded-t-lg" >
            <div class="text-white mx-5" > {{payment.name}} </div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary" >


            <div v-if="props.payment.handle.type=='gateway'" class="text-center">
                <img :src="imageUrl+props.payment.icon" alt="" class="w-20 mx-auto mt-5">
                <button class="btn btn-primary mt-1 mb-5" @click="handlePayment()">{{$t('shopping_cart.payment.pay_with')}} {{props.payment.name}} </button>
            </div>

            <div v-else-if="props.payment.handle.type=='submitForm'" class="text-center">
                <img :src="imageUrl+props.payment.icon" alt="" class="w-20 mx-auto mt-5">
                <button class="btn btn-primary mt-2 mb-5" @click="handlePayment()">{{$t('shopping_cart.payment.pay_with')}} {{props.payment.name}} </button>
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

const props = defineProps({
    payment: Object,
});

const route = useRoute();
const router = useRouter();

const imageUrl = import.meta.env.VITE_APP_IMG_URL
const handlePayment=()=>{
    if(props.payment.handle.type=='gateway'){
        const getUrl = paymentEndPoints[props.payment.handle.endpoint]
        getUrl(route.params.order_oid).then(res=>{
            window.location.href = res.data
            // window.open(res.data)
            // console.log(res.data)
        })
    }else if(props.payment.handle.type=='submitForm'){
        const getCredential = paymentEndPoints[props.payment.handle.endpoint]
        getCredential(route.params.order_oid).then(res=>{
            console.log(res.data)
        })
        // for (const [key, value] of Object.entries(res.credential)) {
        //     $('<input>').attr({
        //         type: 'hidden',
        //         name: key,
        //         value: value
        //     }).appendTo(this.first_data_hidden_form);
        // }
        // this.first_data_hidden_form.find('input[type=submit]').click();

    }else{

    }
}


</script>
