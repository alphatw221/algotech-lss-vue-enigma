<template>

<div class="text-left w-fit">
    <p>{{ (props.modelValue?.properties||[]).find((p) => p?.name=='Number of gears and type of gearbox')?.value||''}} </p>
    <!-- <button @click="enterCampaign()"><a class="font-medium sm:font-normal text-[16px] sm:text-[14px]">{{ props.modelValue?.title||'' }}</a></button> -->
</div>
</template>
 
<script setup>
import {ref, defineProps, defineEmits} from "vue"

 
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
 

 
 </script>