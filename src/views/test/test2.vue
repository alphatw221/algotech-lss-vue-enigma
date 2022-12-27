<template>
    <div>
        <select v-model="props.discountCode.limitations[props.limitationIndex].key" placeholder="choose_limitation_type" class="w-full form-select rounded-lg mt-2 h-[42px]">
            <option :value="key" v-for="(data, key, index) in discountCodeMeta.limitations" :key="index">{{$t(`discount_code.limitation_options.${data.name}`)}}</option>
        </select>
        <label class="text-danger text-[12px]"
            v-for="error,index in props.v.limitations.$each.$response.$errors[props.limitationIndex].key"
            :key="index"
            >
            {{$t(`discount.modal.`+error.$validator)}}
        </label>
        <label class="text-danger" v-if="props.limitationErr">
            {{$t(`discount.modal.duplicate`)}}
        </label>
        
        <template  v-if="props.discountCode.limitations[props.limitationIndex].key!=undefined">
            <div 
                class="flex flex-col intro-y"
                v-for="(field, field_index) in discountCodeMeta.limitations[props.discountCode.limitations[props.limitationIndex].key]?.fields" :key="field_index"
            >

                <template v-if="field.type === 'input'">
                    <label class="mt-2 text-base">{{$t(`discount_code.limitation_fields.${props.discountCode.limitations[props.limitationIndex].key}.${field.key}`)}}</label>
                    <input class="rounded-lg" :type="field.inputType" v-model="props.discountCode.limitations[props.limitationIndex][field.key]">
                </template>

                <template v-if="field.type === 'api_select' && handleApiSelect(field)" >

                    <label class="mt-2 text-base">{{$t(`discount_code.limitation_fields.${props.discountCode.limitations[props.limitationIndex].key}.${field.key}`)}}</label>
                    <TomSelect
                        v-model="props.discountCode.limitations[props.limitationIndex][field.key]"
                        class="w-full"
                    >
                        <option :key="index"></option>
                        <option v-for="option, index in options" :key="index" :value="option[field.optionValue]">{{ option[field.optionName] }}</option>
                    </TomSelect>
                </template>
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
// import { get_convinience_store_map } from "@/api_v2/ecpay.js"
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
const rules = computed(()=> {
    return {
        email: { required, email },
        name: { required},
    }
})
const v = useVuelidate(rules, info);
const responseData = ref("")
onMounted(()=>{
    const form = document.createElement('form');
    form.setAttribute("id", "data_set");
    form.method = 'post';
    form.action = "https://logistics.ecpay.com.tw/Express/map";
    const params = {
        "MerchantID": "3344643",
        "MerchantTradeNo": "anyno",
        "LogisticsType": "CVS",
        "LogisticsSubType": "UNIMARTC2C",
        "IsCollection": "N",
        "ServerReplyURL": "https://b675-220-136-84-226.jp.ngrok.io/api/v2/ecpay/test/webhook/",
    }
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

        form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
})


</script>

<style scoped>

</style>