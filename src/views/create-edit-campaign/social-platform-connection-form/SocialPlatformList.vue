<template>
	<div class="p-5 border-slate-200 flex flex-col ">

    <template v-for="socialPlatformAccount, i in (LSSSellerLayoutStore?.user?.social_platform_accounts||[])" :key="i">
      <template v-if="!(props.socialPlatformConnections||[]).map(_socialPlatformConnection=>_socialPlatformConnection?.social_platform_account).includes(socialPlatformAccount)">
        <div class="hover:bg-slate-200 cursor-pointer flex flex-row p-5 items-center rounded" @click="()=>{props.addSocialPlatformConnection(socialPlatformAccount)}">
          <img :src="socialPlatformAccount?.image?.url" class="h-[80px] w-[80px] rounded"/>
          <h3 class="text-lg ml-3">{{socialPlatformAccount?.name}}</h3>
        </div>
      </template>
    
    </template>
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
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const LSSSellerLayoutStore = useLSSSellerLayoutStore()

const props = defineProps({
  modelValue:Object,
  addSocialPlatformConnection:Function,
  socialPlatformConnections:Array,
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