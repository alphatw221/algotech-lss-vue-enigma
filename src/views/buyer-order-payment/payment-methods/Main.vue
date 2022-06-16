<template>
    <AccordionGroup class="mb-10" :selectedIndex="selectIndex"> 


        <!-- BEGIN Direct Payment -->
                <DirectPayment />
        <!-- END Direct Payment -->
<!-- 
        <AccordionItem v-if="payment.handle.type=='gateway'">
            <Accordion class="bg-primary rounded-t-lg ">
                <div class="text-white mx-3"> {{ payment.name }} </div>
            </Accordion>
            <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
                When you place an order, you will be taken to PayPal to complete your service.
            </AccordionPanel>
        </AccordionItem> -->


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
    <!-- <div>123123</div> -->
</template>


<script setup>
import DirectPayment from "./DirectPayment.vue";
import {ref} from "vue"
const selectIndex = ref(0)
</script>
