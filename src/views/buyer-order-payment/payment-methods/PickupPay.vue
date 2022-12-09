<template>

<AccordionItem  class="mx-5 " >
        <Accordion class="bg-primary rounded-t-lg" >
            <div class="text-white mx-5" > {{payment.name}} </div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary" >
            <div  v-for="storeInfo in props.payment" :key="storeInfo" class="flex flex-col">
                <p>
                    {{store.order.shipping_option_data[storeInfo.key]}}
                </p>
            </div>
        </AccordionPanel>

    </AccordionItem>
    <button class="w-fit btn btn-rounded-primary" @click="cash_on_delivery">
        test ecpay
    </button>
</template>

<script setup>
import {onMounted, computed, watch, ref} from "vue"
import { useRoute, useRouter } from "vue-router";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
import {buyer_cash_on_delivery} from "@/api_v2/order"

const store = useLSSBuyerOrderStore();

const props = defineProps({
    payment: Object,
});

const route = useRoute();
const router = useRouter();

const cash_on_delivery = () =>{
  const data = {
    'is_collection': 'Y', //Y or N
    'logistics_type':'CVS' //CVS or HOME
    } 
    buyer_cash_on_delivery(route.params.order_oid,data).then(
    res=>{
        console.log(res.data)
    }
  )
  
}

</script>
