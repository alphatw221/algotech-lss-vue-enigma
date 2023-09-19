<template>
    <CrudWidge
        :formSettings="settings"
        v-model="props.modelValue"
        v-if="props.modelValue.provider==='rapyd'"
        :error="props.error"

    >
        
    </CrudWidge>
</template>

<script setup>
import CrudWidge from '@/views/crud-form-lss/CrudWidge.vue'
import { ref, onMounted, reactive, computed, defineProps, defineEmits } from 'vue';


const props = defineProps({
  modelValue:Object,
  error:Object

})

const emits = defineEmits()

const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}



const settings = [
    {key:'rapyd_access_key', name:'Secret Key', type:'input' ,inputType:'text', class:'w-[150px] ', unit:'', placeholder:'Access Key'},
    {key:'rapyd_secret_key', name:'Secret Key', type:'input' ,inputType:'text', class:'w-[150px] ', unit:'', placeholder:'Secret Key'},

    {key:'rapyd_country', name:'Country', type:'select', class:'w-[150px]', placeholder:'Country', multiple:false, value_key:'value', name_key:'value', options:[
                {value:'SG', name:'SG'},
             
            ]},
    
    {key:'rapyd_currency', name:'Currency', type:'select', class:'w-[150px]',placeholder:'Currency', multiple:false, value_key:'value', name_key:'value', options:[
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

]



</script>
