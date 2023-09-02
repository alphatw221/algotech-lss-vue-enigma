<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">{{ props.title }}</h2>
  </div>


  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 ">
      <!-- BEGIN: Form Layout -->
      <div class="intro-y box p-5 sm:p-10 md:p-15 lg:p-20 ">
          <!-- BEGIN: Form  -->
          <template v-for="setting, settingIndex in props.formSettings" :key="settingIndex">
            <slot v-if="setting.type==='slot'" :name="setting.slot_name"></slot>
            <FormItem :setting="setting" :action="props.action" v-model="props.modelValue" v-else></FormItem>
          </template> 
          <!-- END: Form  -->
      </div>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import FormItem from './FormItem.vue'
const props = defineProps({
  modelValue:Object,
  title:String,
  formSettings:Object,
  action:Object
})

const emits = defineEmits(['update:modelValue'])

const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}


</script>
