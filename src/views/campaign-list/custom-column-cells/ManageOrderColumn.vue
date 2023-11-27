<template>


    <a class="flex items-center justify-center" @click="routeToManageOrder(campaign)">
        <span class="mr-3 sm:hidden"> {{$t('campaign_list.campaign_list_table.manage_order')}}</span>
        <Tippy  :content="$t('campaign_list.campaign_list_table.manage_order')" :options="{ theme: 'light' }">
        <SimpleIcon icon="manage_order" color="#2d8cf0" width="30" height="32" />
        </Tippy> 
    </a>


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
 

 const routeToManageOrder = ()=>{ router.push({name:'manage-campaign-order',params:{'campaign_uuid':props.modelValue?.uuid}})}

 
 </script>