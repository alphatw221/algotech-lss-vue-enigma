<template>
        <h3 class="text-base">Seller Deliver</h3>
        <div v-if="(props?.modelValue||[]).filter(_logisticService=>_logisticService.provider=='seller_deliver'&&!_logisticService?.remove).length<=0" class="text-center my-5">
            <h3>No Delivery Option Added</h3>
        </div>
        <template v-for="logisticService, i in (props?.modelValue||[])" :key="i">
            <CrudWidge
                v-if="logisticService?.provider=='seller_deliver' && !logisticService?.remove"
                :formSettings="selfDeliverySettings"
                :action="actions"
                v-model="props.modelValue[i]"
                class="intro-y border-slate border-[1px] rounded p-3 my-2"
                @change="()=>{updateModelValue();}"
                :error="props.error?.$each?.$response?.$errors?.[i]"
            >
                <template v-slot:remove_button>
                    <XIcon class="w-6 h-6 right-1 top-1 cursor-pointer absolute text-slate-500" @click="()=>{props.modelValue[i].remove=true; updateModelValue(); }"/>
                </template>
            
            </CrudWidge>
        </template>

        <div class="text-center my-2">
            <button class="btn btn-primary rounded-[50%]" @click="()=>{ (props.modelValue||[]).push(props.getLogisticServiceTemplate('seller_deliver'));;updateModelValue();}">
                <PlusIcon/>
            </button>
        </div>

</template>

<script setup>
import CrudWidge from '@/views/crud-form-lss/CrudWidge.vue'
import { ref, onMounted, reactive, computed, defineProps, defineEmits, provide } from 'vue';
// import { get_general_info, update_general_info } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const SSSellerLayoutStore = useLSSSellerLayoutStore();

const props = defineProps({

    getLogisticServiceTemplate:Function,
    modelValue:Object,
    error:Object

})

const emits = defineEmits()

const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}





const selfDeliverySettings = [
   

    {type:'inline', class:'intro-y', inline_items:[
        {key:'seller_deliver_option_name', name:'Delivery Option Name', type:'input' ,inputType:'text', class:'w-[200px]', unit:'', placeholder:'Delivery Option Name'},
        {key:'seller_deliver_region', name:'Delivery Region', type:'input' ,inputType:'text', class:'w-[200px] ml-2', unit:'', placeholder:'Delivery Region'},
        {key:'seller_deliver_shipping_fee', name:'Shipping Fee', type:'input' ,inputType:'number', class:'w-[200px] ml-2', unit:'', placeholder:'Shipping Fee'},
        {key:'seller_deliver_shipping_fee_currency', name:'Currency', type:'select', class:'w-[200px] ml-2',placeholder:'Shipping Fee Currency', multiple:false, value_key:'value', name_key:'value', options:[
            {value:'SGD', name:'新加坡幣'},   
            {value:'USD', name:'美金'},
            {value:'MYR', name:'馬來西亞令吉'},
            {value:'TWD', name:'台幣'},
            {value:'AUD', name:'澳幣'},
            {value:'JPY', name:'日圓'},
            {value:'EUR', name:'歐元'},
            {value:'RMB', name:'人民幣'},
            {value:'KRW', name:'韓元'},
            {value:'PHP', name:'菲律賓披索'},
            {value:'VND', name:'越南盾'},
            {value:'THB', name:'泰銖'},
            {value:'IDR', name:'台幣'},
        ]},
    ]},



    {type:'slot', slot_name:'remove_button'},

]




const actions={}


</script>
