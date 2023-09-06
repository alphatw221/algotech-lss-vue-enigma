<template>


    <VueDatePicker v-model="props.modelValue"  @update:model-value="onChangeHandler($event)"></VueDatePicker>
</template>

<script setup>


import { defineEmits, defineProps, ref } from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// const timezones = [
//   'Pacific/Midway', // -11
//   'America/Adak', // -10,
//   'Pacific/Gambier', // -9
//   'America/Los_Angeles', // -8
//   'America/Denver', // -7
//   'America/Chicago', // -6
//   'America/New_York', // -5
//   'America/Santiago', // -4
//   'America/Sao_Paulo', // -3
//   'America/Noronha', // -2
//   'Atlantic/Cape_Verde', // -1
//   'UTC', // utc
//   'Europe/Brussels', //+1
//   'Africa/Cairo', // +2
//   'Europe/Minsk', // +3
//   'Europe/Moscow', // +4
//   'Asia/Tashkent', // +5
//   'Asia/Dhaka', // +6
//   'Asia/Novosibirsk', // +7
//   'Australia/Perth', // +8
//   'Asia/Tokyo', // +9
//   'Australia/Hobart', // +10
//   'Asia/Vladivostok', // +11
//   'Pacific/Auckland', // +12
// ];


// const timezone = ref('UTC');


const props = defineProps({
  modelValue: {
    type: String||Date,
    default: "",
  },
});


const emits = defineEmits(['update:modelValue'])

const onChangeHandler = (event)=>{

  // console.log('on change')
  // console.log(event)
  // // props.modelValue = event

  // console.log(event.toISOString())
  updateModelValue(event.toISOString())
}

const updateModelValue = (value)=>{
  emits('update:modelValue', value)
}
</script>

<style >
.dp__action_select{
  background-color:var(--dp-primary-color) !important;
}

</style>
