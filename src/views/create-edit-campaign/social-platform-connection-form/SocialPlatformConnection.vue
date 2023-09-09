<template>
	<div class="p-5 border-slate-200">
    Social Platform Connection
	</div>
   
</template>  

<script setup>
import CrudForm from '@/views/crud-form-lss/Main.vue'
import CrudWidge from '@/views/crud-form-lss/CrudWidge.vue'



import { ref, watch, onMounted, computed, watchEffect, defineProps } from 'vue';
import { required, minLength, maxLength, helpers, numeric, requiredIf, decimal, integer, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import i18n from "@/locales/i18n"

import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  modelValue:Object,
  type:String,

//   paginator:{
//     type:Boolean,
//     default:true
//   }
})


const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}


const route = useRoute()
const router = useRouter()



</script>

<style scoped>


</style>