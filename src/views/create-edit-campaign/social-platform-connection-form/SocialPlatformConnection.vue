<template>
	<div class="p-5  rounded border-[1px] relative border-[#6d6db6] bg-slate-100">




        
      <XIcon class="w-6 h-6 right-1 top-1 cursor-pointer absolute text-slate-500" @click="()=>{}"/>
      
      <div class="flex flex-row justify-center my-5">
        <div class="border-0 w-14 h-14 flex-0 relative" >
          <Tippy tag="img" class="border-0 rounded-full" :src="props.modelValue?.social_platform_account?.image?.url||''"
            :content="props.modelValue?.social_platform_account?.name||''" />
          <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
              <img class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
          </div>
        </div>
      </div>
     

      <div class="flex flex-row items-center">

        <input class="border-[2px] border-slate-200 rounded px-2 bg-transparent"  @blur="()=>{}"
          :placeholder="$t('campaign_list.enter_post_id_modal.enter_post_id')"
          :class="{ 'border-danger text-danger border-2': false }" />

        <Tippy tag="a" href="javascript:;" class="ml-1" :content="$t('campaign_list.enter_post_id_modal.search_recent_posts')" :options="{
          theme: 'light',
        }">
          <SearchIcon class="" @click="()=>{showSelectLiveOrVideoModal=true}"/>
        </Tippy>
      </div>
      
      <!-- <template v-if="validate.facebook.post_id.error">
        <label class="text-danger ml-2" >
          invalid post id 
        </label>
      </template> -->
          


      <SelectLiveOrVideoModal 
        :show="showSelectLiveOrVideoModal" 
        :hide="hideSelectLiveOrVideoModal" 
        :selectLive="()=>{hideSelectLiveOrVideoModal()}" 
        :selectPost="()=>{hideSelectLiveOrVideoModal()}"
      />
      <SelectLiveModal  
        :show="showSelectLiveModal"
        :hide="hideSelectLiveModal"
        :socialPlatformAccount="props.modelValue?.social_platform_account"
        :select="(live)=>{}"
      />
      <SelectPostModal
        :show="showSelectPostModal"
        :hide="hideSelectPostModal"
        :socialPlatformAccount="props.modelValue?.social_platform_account"
        :select="(post)=>{}"
      />

   

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


import facebook_platform from "/src/assets/images/lss-img/facebook.png"
import instagram_platform from "/src/assets/images/lss-img/instagram.png"


import SelectLiveOrVideoModal from './SelectLiveOrVideoModal.vue'
import SelectPostModal from './SelectPostModal.vue'
import SelectLiveModal from './SelectLiveModal.vue';
const props = defineProps({
  modelValue:Object,
  type:String,
  remove:Function,
  update:Function
//   paginator:{
//     type:Boolean,
//     default:true
//   }
})


const showSelectLiveOrVideoModal =ref(false)
const hideSelectLiveOrVideoModal = ()=>{showSelectLiveOrVideoModal.value=false}

const showSelectPostModal =ref(false)
const hideSelectPostModal = ()=>{showSelectPostModal.value=false}

const showSelectLiveModal =ref(false)
const hideSelectLiveModal = ()=>{showSelectLiveModal.value=false}

const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}


const route = useRoute()
const router = useRouter()



</script>

<style scoped>


</style>