<template>
    <div>
        <div>
            <TomSelect v-model="props.discountCode.type" :options="{
                        placeholder: 'choose_discount_type',
                        }" class="w-full">
                <option :value="''">{{'empty'}}</option>
                <option :value="key" v-for="(data, key, index) in discountCodeMeta.types" :key="index">{{data.name}}</option>
            </TomSelect>

            <label class="text-danger text-[12px]" 
                v-for="error,index in props.v.type.$errors"
                :key="index"
                >
                {{error.$uid}}
            </label>
        </div>
        
        <div class="border-2 rounded-md border-slate"  v-if="props.discountCode.types!=''">


            <div 
                class="flex flex-col intro-y"
                v-for="(field, field_index) in discountCodeMeta.types[props.discountCode.type]?.fields" :key="field_index"
            >

                <template v-if="field.type === 'input'">
                    <label class="mt-2 text-base">{{ field.name }}</label>
                    <input :type="field.dataType" v-model="props.discountCode.meta[field.key]">
                </template>
            </div>
        </div>



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
