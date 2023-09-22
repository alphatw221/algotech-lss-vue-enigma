<template>
    <CrudWidge
        v-if="props?.modelValue?.provider=='ecpay'"
        :formSettings="settings"
        :action="actions"
        v-model="props.modelValue"
        class="intro-y"
        @change="()=>{updateModelValue();}"
        :error="props.error"
    >

    </CrudWidge>
      

</template>

<script setup>
import CrudWidge from '@/views/crud-form-lss/CrudWidge.vue'
import { ref, onMounted, reactive, computed, defineProps, defineEmits, provide } from 'vue';
// import { get_general_info, update_general_info } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const SSSellerLayoutStore = useLSSSellerLayoutStore();

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




const actions={}


</script>
