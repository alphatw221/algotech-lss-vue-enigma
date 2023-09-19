<template>
    <CrudWidge
        :formSettings="settings"
        :action="actions"
        v-model="props.modelValue"
        v-if="props.modelValue.provider==='bank_transfer'"
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



const dropzoneSingleRef = ref(null)
provide("bind[dropzoneSingleRef]", (el) => {
    dropzoneSingleRef.value = el;
    el.dropzone.on('addedfile',file=>{
        const files = el.dropzone.getAcceptedFiles()
        if (files.length > 0) el.dropzone.removeFile(files[0])
        props.modelValue.upload_bank_image = file

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event =>{ props.modelValue.bank_image = event.target.result };

    })
});



const settings = [
    {key:'bank_name', name:'Bank', type:'input' ,inputType:'text', class:'w-full', unit:'', placeholder:'Bank'},
    {key:'bank_account', name:'Bank Account', type:'input' ,inputType:'text', class:'w-full', unit:'', placeholder:'Bank Account'},

    { key:'bank_image',  name:'Image',type:'image',ref:'dropzoneSingleRef', class:'mx-[20vw]', remove_action:'remove_image'},


]

const removeImage = (index)=>{

    props.modelValue.upload_bank_image = null
    props.modelValue.bank_image = null
    const files = dropzoneSingleRef.value.dropzone.getAcceptedFiles()
    if (files.length > 0) dropzoneSingleRef.value.dropzone.removeFile(files[0])
    updateModelValue()

}



const actions={'remove_image':removeImage}


</script>
