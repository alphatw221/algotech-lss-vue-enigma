<template>
    <select v-model="props.discountCode.limitations[props.limitationIndex].key" placeholder="choose_limitation_type" class="w-full form-select rounded-lg mt-2 h-[42px]">
        <option :value="key" v-for="(data, key, index) in discountCodeMeta.limitations" :key="index">{{$t(`discount.modal.limit_options.`+data.name)}}</option>
    </select>

    <label class="text-danger text-[12px]" 
        v-for="error,index in props.v.limitations.$each.$response.$errors[props.limitationIndex].key"
        :key="index"
        >
        {{$t(`discount.modal.`+error.$validator)}}
    </label>
    
    <template  v-if="props.discountCode.limitations[props.limitationIndex].key!=undefined">
        <div 
            class="flex flex-col intro-y"
            v-for="(field, field_index) in discountCodeMeta.limitations[props.discountCode.limitations[props.limitationIndex].key]?.fields" :key="field_index"
        >

            <template v-if="field.type === 'input'">
                <label class="mt-2 text-base">{{$t(`discount.modal.`+field.name)}}</label>
                <input class="rounded-lg" :type="field.dataType" v-model="props.discountCode.limitations[props.limitationIndex][field.key]">
            </template>

            <template v-if="field.type === 'api_select' && handleApiSelect(field)" >

                <label class="mt-2 text-base">{{$t(`discount.modal.`+field.name)}}</label>
                <TomSelect
					v-model="props.discountCode.limitations[props.limitationIndex][field.key]"
					class="w-full"
                    
				>
					<option v-for="option, index in options" :key="index" :value="option[field.optionValue]">{{ option[field.optionName] }}</option>
				</TomSelect>
            </template>
        </div>
    </template>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, provide, defineProps, watch, computed} from "vue";

import { useRoute, useRouter } from "vue-router";
import { useLSSDiscountCodeMetaStore } from "@/stores/lss-discount-code-meta"
import { discountCodeEndPoints } from "@/api_v2/discount_code"

const discountCodeMeta = useLSSDiscountCodeMetaStore()
const props = defineProps({
  discountCode: Object,
  limitationIndex: Number,
  v:Object
});

const handleApiSelect = field=>{
    if(field.type!='api_select')return false
    const request = discountCodeEndPoints[field.endpoint]
    request().then(res=>
        {
            options.value = res.data
            consolg.loe(res.data)
        })
        
    return true
}

const options = ref([])
</script>
