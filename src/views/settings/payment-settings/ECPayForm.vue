<template>
    <CrudWidge
        :formSettings="settings"
        v-model="props.modelValue"
        v-if="props.modelValue.provider==='ecpay'"
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
    {key:'ecpay_merchant_id', name:'Merchant ID', type:'input' ,inputType:'text', class:'w-[150px] ', unit:'', placeholder:'Merchant ID'},
    {key:'ecpay_hash_key', name:'Hash Key', type:'input' ,inputType:'text', class:'w-[250px] ', unit:'', placeholder:'Hash Key'},
    {key:'ecpay_hash_iv', name:'Hash IV', type:'input' ,inputType:'text', class:'w-[250px] ', unit:'', placeholder:'Hash IV'},


]



</script>
