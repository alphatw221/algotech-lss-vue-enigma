<template>
    <div class="flex flex-row justify-between">

        <input type="number"
                class="form-control w-[100px] "
                :placeholder="'TireRack ID'"
                v-model="props.data.tire_rack_id"

                />

        <button class="btn btn-primary" @click="updateTireRackID()">更新</button>
    </div>
</template>

<script setup>
import {ref, defineProps} from "vue"

import {update_tire_rack_vehicle_id} from '../../api_carlet/carlet.js'
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


const updateTireRackID = ()=>{
  update_tire_rack_vehicle_id(props.data?.id, props.data?.tire_rack_id).then(res=>{
    console.log(res)
  })
}
// const emits = defineEmits(['update:modelValue'])

// const updateModelValue = ()=>{
//   emits('update:modelValue', props.modelValue)
// }



</script>