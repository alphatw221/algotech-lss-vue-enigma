<template>
	<div class="p-5 box my-5 relative">
		<h3>Connected Platforms</h3>
        <div class="flex flex-row">
            <template v-if="[].length<=0">
                <h3 class="w-full text-center">No platform connected</h3>
            </template>

            <template v-for="socialPlatformConnection, i in (props?.modelValue||[])" :key="i">
                <SocialPlatformConnection v-model="props.modelValue[i]"/>
            </template>
        </div>

		<div class="absolute top-1/2 right-[20px] translate-y-[-50%] ">
			<button class="btn btn-primary rounded-[50%]" @click="()=>{showSocialPlatformList=true}">
                <PlusIcon/>
            </button>
		</div>



    <Modal :show="showSocialPlatformList" @hidden="()=>{showSocialPlatformList=false}" >
        <ModalHeader>
            <h3>My Socail Platform Connections</h3>
        </ModalHeader>
        <ModalBody >
            <SocialPlatformList :addSocialPlatformConnection="addSocialPlatformConnection"/>
        </ModalBody>
    </Modal>

    

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
import SocialPlatformConnection from './SocialPlatformConnection.vue'
import SocialPlatformList from './SocialPlatformList.vue'

const props = defineProps({
  modelValue:Object,
  type:{
    type:String,
    default:'create'
  },

//   paginator:{
//     type:Boolean,
//     default:true
//   }
})


const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}
const showSocialPlatformList = ref(false)
const addSocialPlatformConnection = (socialPlatformAccount)=>{
    console.log(socialPlatformAccount)
    if(props.type=='edit'){
        //capp api
    }else{
        props.modelValue.push({social_platform_account:socialPlatformAccount, post_id:''})
        showSocialPlatformList.value = false
    }

}
const route = useRoute()
const router = useRouter()



</script>

<style scoped>


</style>