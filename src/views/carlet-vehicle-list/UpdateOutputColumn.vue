<template>
    <div class="flex flex-row justify-between gap-2">

        <input type="text"
                class="form-control w-[80px] "
                :placeholder="'輸出'"
                v-model="props.data.hp"

                />

        <button class="btn btn-primary no-wrap whitespace-nowrap" @click="updateOutput()">更新</button>
    </div>
</template>

<script setup>
import {ref, defineProps} from "vue"

import {update_carlet_vehicle} from '../../api_carlet/carlet.js'
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


const updateOutput = ()=>{
  update_carlet_vehicle(props.data?.id, {'hp':props.data?.hp}).then(res=>{
    console.log(res)
  })
}
// const emits = defineEmits(['update:modelValue'])

// const updateModelValue = ()=>{
//   emits('update:modelValue', props.modelValue)
// }



</script>