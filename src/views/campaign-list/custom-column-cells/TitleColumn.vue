<template>

    <div class="text-left w-fit">
        <button @click="enterCampaign()"><a class="font-medium sm:font-normal text-[16px] sm:text-[14px]">{{ props.modelValue?.title||'' }}</a></button>
    </div>
 </template>
 
 <script setup>
 import {ref, defineProps, defineEmits} from "vue"
 import { useRoute, useRouter } from "vue-router";

 const route = useRoute()
const router = useRouter()
 
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
 
 const enterCampaign = ()=>{
    router.push({name:'campaign-live',params:{'campaign_uuid':props?.modelValue?.uuid}})
 }
 
 
 </script>