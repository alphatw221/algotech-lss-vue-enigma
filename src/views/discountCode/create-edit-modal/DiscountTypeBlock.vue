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
                    <label class="mt-2 text-base">{{$t(`discount.modal.`+ field.name)}}</label>
                    <input :type="field.dataType" v-model="props.discountCode.meta[field.key]" class="rounded-lg">
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

const testing = ()=>{
    console.log(props.discountCode)
    console.log(mod.value)
}
</script>
