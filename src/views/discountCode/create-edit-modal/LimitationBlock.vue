<template>
     <div>
        <div>
            <TomSelect v-model="props.discountCode.limitations[props.limitationIndex].key" :options="{
                        placeholder: 'choose_limitation_type',
                        }" class="w-full">
                <option :value="''">{{'empty'}}</option>
                <option :value="key" v-for="(data, key, index) in discountCodeMeta.limitations" :key="index">{{data.name}}</option>
            </TomSelect>


            <label class="text-danger text-[12px]" 
                v-for="error,index in props.v.limitations.$each.$response.$errors[props.limitationIndex].key"
                :key="index"
                >
                {{error.$validator}}
            </label>

        </div>
        
        <div class="border-2 rounded-md border-slate"  v-if="props.discountCode.limitations[props.limitationIndex].key!=undefined">


            <div 
                class="flex flex-col intro-y"
                v-for="(field, field_index) in discountCodeMeta.limitations[props.discountCode.limitations[props.limitationIndex].key]?.fields" :key="field_index"
            >

                <template v-if="field.type === 'input'">
                    <label class="mt-2 text-base">{{ field.name }}</label>
                    <input :type="field.dataType" v-model="props.discountCode.limitations[props.limitationIndex][field.key]">
                </template>

                <template v-if="field.type === 'api_select'">
                    <label class="mt-2 text-base">{{ field.name }}</label>
                    <div>{{field.endpoint}}</div>
                    <div>{{field.optionName}}</div>
                    <div>{{field.optionValue}}</div>

                </template>

            </div>

        </div>

    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, provide, defineProps, watch, computed} from "vue";

import { useRoute, useRouter } from "vue-router";
import { useLSSDiscountCodeMetaStore } from "@/stores/lss-discount-code-meta"

const discountCodeMeta = useLSSDiscountCodeMetaStore()
const props = defineProps({
  discountCode: Object,
  limitationIndex: Number,
  v:Object
});







</script>
