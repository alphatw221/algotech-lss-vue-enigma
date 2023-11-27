<template>

    <Tippy 
        class="rounded-full w-fit whitespace-wrap ml-1 my-auto md:hidden tippy-mobile" 
        data-tippy-allowHTML="true" 
        data-tippy-placement="right" 
        :content="$t('tooltips.campaign_list.stop_checkout')" 
    > <HelpCircleIcon class="w-5 tippy-icon md:hidden tippy-mobile" />
    </Tippy> 
    <div 
        class="flex flex-col justify-center form-check form-switch">
        <input class="mr-0 form-check-input" type="checkbox" v-model="cacheData.stop_checkout" @change="updateCampaign()"/>
    </div>


 </template>
 
<script setup>

import {ref, defineProps, defineEmits} from "vue"

const emits = defineEmits(['update:modelValue'])

const updateModelValue = ()=>{
    emits('update:modelValue', props.modelValue)
}


const cacheData = ref(JSON.parse(JSON.stringify(props.modelValue)))

const props = defineProps({
    modelValue:Object,
    data:{
        type:Object,
        default:{}
    },
    dataIndex:{
        type:Number,
        default:null
    }
})


const updateCampaign = ()=>{
    console.log(cacheData.value)
    props.modelValue.stop_checkout = JSON.parse(JSON.stringify(cacheData?.value?.stop_checkout||[]));
    console.log(props.modelValue)
    // console.log(props.modelValue.social_platform_connections)
    // updateModelValue()
    // showModal.value=false
    
}


</script>