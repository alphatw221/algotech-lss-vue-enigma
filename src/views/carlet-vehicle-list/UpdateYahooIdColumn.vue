<template>
    <div class="flex flex-row justify-between gap-2">

        <input type="number"
                class="form-control w-[80px] "
                :placeholder="'YahooID'"
                v-model="props.data.yahoo_id"

                />

        <button class="btn btn-primary whitespace-nowrap" @click="updateYahooID()">更新</button>
    </div>
</template>

<script setup>
import {ref, defineProps} from "vue"

import {update_yahoo_vehicle_id} from '../../api_carlet/carlet.js'
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


const updateYahooID = ()=>{
  update_yahoo_vehicle_id(props.data?.id, props.data?.yahoo_id).then(res=>{
    console.log(res)
  })
}
// const emits = defineEmits(['update:modelValue'])

// const updateModelValue = ()=>{
//   emits('update:modelValue', props.modelValue)
// }



</script>