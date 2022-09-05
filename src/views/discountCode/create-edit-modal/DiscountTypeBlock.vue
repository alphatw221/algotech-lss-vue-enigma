<template>
    <div>
        <div>
            <select v-model="props.discountCode.type" :options="{
                    placeholder: 'choose_discount_type',
                    }" class="w-full form-select rounded-lg mt-2 h-[42px]">
                <option :value="key" v-for="(data, key, index) in discountCodeMeta.types" :key="index">{{$t(`discount.modal.type_options.`+data.name)}}</option>
            </select>
            <label class="text-danger text-[12px]" 
                v-for="error,index in props.v.type.$errors"
                :key="index"
                >
                {{$t(`discount.modal.`+error.$uid)}}
            </label>
        </div>
        
        <template v-if="props.discountCode.types!=''">
            <div 
                class="flex flex-col intro-y"
                v-for="(field, field_index) in discountCodeMeta.types[props.discountCode.type]?.fields" :key="field_index"
            >
                <template v-if="field.type === 'input'">
                    <div class="flex"> 
                        <label class="mt-2 text-base">{{$t(`discount.modal.`+ field.name)}}</label>
                        <Tippy 
                            v-if="field.name == 'Discount Rate'"
                            class="rounded-full w-50" 
                            data-tippy-allowHTML="true" 
                            data-tippy-placement="right" 
                            :content="$t('tooltips.discount_code.percent_off')" 
                            theme='light'
                        > <HelpCircleIcon class="w-5 ml-1 mt-1.5 tippy-icon" />
                        </Tippy> 
                    </div>
                     
                       
                    <div class="flex"> 
                        <div v-if="field.name == 'Deduct Amount'" class="flex w-[60px] z-10 text-slate-500 mt-2 h-[35px] sm:h-[42px] rounded-l-lg border p-1"> <MinusIcon class="my-auto w-5 "/><DollarSignIcon class="my-auto h-5"/></div>
                        <input :type="field.dataType" v-model="props.discountCode.meta[field.key]" class="w-full mt-2" :class="{ 'rounded-r-lg rounded-l-none': field.name == 'Deduct Amount', 'rounded-l-lg rounded-r-none': field.name == 'Discount Rate'}" />
                        <div v-if="field.name == 'Discount Rate'" class="flex w-[80px] z-10 text-slate-500 my-auto h-[35px] sm:h-[42px] rounded-r-lg border p-1 mt-2"> <PercentIcon class="my-auto"/> <span class="text-[21px] ml-1 my-auto"> off </span>  
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
