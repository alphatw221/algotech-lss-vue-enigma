<template>

<div class="text-left w-fit">
    <p>{{ (props.modelValue?.properties||[]).find((p) => p?.name=='Number of gears and type of gearbox')?.value||''}} </p>
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