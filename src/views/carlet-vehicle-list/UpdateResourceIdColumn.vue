<template>
    <div>

        <input/>
        <button>test</button>
    </div>
</template>

<script setup>
import {ref, onMounted, watch, computed, defineProps} from "vue"
import { useRoute, useRouter } from "vue-router";

import {search_carlet_vehicles} from '../../api_carlet/carlet.js'
const props = defineProps({
//   modelValue:Object,

  item:{
    type:Object,
    default:{}
  }

})

// const emits = defineEmits(['update:modelValue'])

// const updateModelValue = ()=>{
//   emits('update:modelValue', props.modelValue)
// }

const route = useRoute()
const router = useRouter()


</script>