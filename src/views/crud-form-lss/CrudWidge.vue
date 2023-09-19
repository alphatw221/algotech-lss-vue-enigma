<template>
  <!-- <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">{{ props.title }}</h2>
  </div> -->

  <div class="intro-y ">
          <!-- BEGIN: Form  -->
          <template v-for="setting, settingIndex in props.formSettings" :key="settingIndex">
            <slot v-if="setting.type==='slot'" :name="setting.slot_name"></slot>
            <FormItem :setting="setting" :action="props.action" v-model="props.modelValue" :error="props?.error" v-else></FormItem>
          </template> 
          <!-- END: Form  -->
  </div>


  <!-- <div class="grid grid-cols-12 gap-6">
    <div class="intro-y col-span-12 ">
      <div class="intro-y ">
          <template v-for="setting, settingIndex in props.formSettings" :key="settingIndex">
            <slot v-if="setting.type==='slot'" :name="setting.slot_name"></slot>
            <FormItem :setting="setting" :action="props.action" v-model="props.modelValue" v-else></FormItem>
          </template> 
      </div>
    </div>
  </div> -->
  
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import FormItem from './FormItem.vue'
const props = defineProps({
  modelValue:{
    type:Object,
    default:{}
  },
  title:String,
  formSettings:Object,
  action:Object,
  error:Object
})

const emits = defineEmits(['update:modelValue'])

const updateModelValue = ()=>{
  // console.log('form widget update')
  // console.log(props.modelValue)
  emits('update:modelValue', props.modelValue)
}


</script>
