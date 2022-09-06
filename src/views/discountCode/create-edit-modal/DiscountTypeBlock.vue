<template>
    <div>
        <div>
            <select v-model="props.discountCode.discount_type" :options="{
                    placeholder: 'choose_discount_type',
                    }" class="w-full form-select rounded-lg mt-2 h-[42px]">
                <option :value="key" v-for="(data, key, index) in discountCodeMeta.discount_types" :key="index">{{$t(`discount.modal.discount_type_options.`+data.name)}}</option>
            </select>
            <label class="text-danger text-[12px]" 
                v-for="error,index in props.v.type.$errors"
                :key="index"
                >
                {{$t(`discount.modal.`+error.$uid)}}
            </label>
        </div>
        
        <template v-if="props.discountCode.discount_types!=''">
            <div 
                class="flex flex-col intro-y"
                v-for="(field, field_index) in discountCodeMeta.discount_types[props.discountCode.discount_type]?.fields" :key="field_index"
            >
                <template v-if="field.type === 'input'">
                    <label class="mt-2 text-base">{{$t(`discount.modal.`+ field.name)}}</label>
                    <div class="flex"> 
                        <div v-if="field.name == 'Deduct Amount'" class="flex w-[60px] z-10 text-slate-500 my-auto h-[35px] sm:h-[42px] rounded-l-lg border p-1"> <font-awesome-icon icon="fa-solid fa-minus" class="w-full h-full" /> </div>
                        <input :type="field.dataType" v-model="props.discountCode.meta[field.key]" class="w-full" :class="{ 'rounded-r-lg rounded-l-none': field.name == 'Deduct Amount', 'rounded-l-lg rounded-r-none': field.name == 'Discount Rate'}" />
                        <div v-if="field.name == 'Discount Rate'" class="flex w-[80px] z-10 text-slate-500 my-auto h-[35px] sm:h-[42px] rounded-r-lg border p-1"> <PercentIcon class="my-auto"/> <span class="text-[21px] ml-1 my-auto"> off </span>  
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, provide, defineProps } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useLSSDiscountCodeMetaStore } from "@/stores/lss-discount-code-meta"


const discountCodeMeta = useLSSDiscountCodeMetaStore()

const props = defineProps({
  discountCode: Object,
  v:Object
});

onMounted(()=>{


})

// const testing = ()=>{
//     console.log(props.discountCode)
//     console.log(props.discountCode.meta[field.key])
// }
</script>
