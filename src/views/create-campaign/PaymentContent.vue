<template>
    <div>
        <template v-if="paymentInfo.multiple === false">
            <div class="ml-3 mt-3 ">
                <input 
                    class="form-check-input col-span-1" 
                    style="width: 1.5rem; height:1.5rem;"
                    type="checkbox" 
                    v-model="campaignStore.paymentSettings[props.paymentName].enabled"
                />
                <label class="form-label ml-3 text-base mt-1 mr-3">Enable stripe</label>
            </div>
            <div v-for="(account, index) in singleAccountSettings" :key="index">
                <div 
                    class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5" 
                    v-for="(field, key) in paymentInfo.fields" 
                    :key="key"
                >
                    <template v-if="field.type === 'text' || field.type === 'password'">
                        <label class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2 ml-3">{{ field.name }}</label>
                        <input 
                            class="form-control-rounded col-span-9 "
                            type="text" 
                            v-model="account[field.key]"
                        />
                    </template>
                    <template v-else-if="field.type === 'select'">
                        <label class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2 ml-3">{{ field.name }}</label>
                        <select 
                            id="tabulator-html-filter-field"
                            class="form-select"
                            style="width: 100px;" 
                            v-model="account[field.key]"
                        >
                            <option v-for="option in field.options" :key="option">{{ option }}</option>
                        </select>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, watch } from 'vue';
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useCreateCampaignStore } from '@/stores/lss-create-campaign';
import { createAxiosWithBearer } from '@/libs/axiosClient';


const paymentStore = useLSSPaymentMetaStore()
const campaignStore = useCreateCampaignStore()
const props = defineProps({
    paymentName: String,
    pageType: String
})
const singleAccountSettings = ref([])
const paymentInfo = ref({})
const paymentObj = ref({})

watchEffect(() => {
    paymentInfo.value = paymentStore[props.paymentName]
    if (props.pageType === 'edit') singleAccountSettings.value[0] = campaignStore.paymentSettings[props.paymentName]
});

watch(singleAccountSettings, () => {
    campaignStore.paymentSettings[props.paymentName] = singleAccountSettings.value[0]
}, { deep: true })

onMounted(() => {
    if (props.pageType === 'create') {
        if (paymentInfo.value.multiple === false) {
            createAxiosWithBearer().get(paymentInfo.value.request_url)
            .then(response => {
                if (Object.keys(response.data).length > 0) {
                    singleAccountSettings.value.push(response.data)
                } else {
                    for (let [key, field] of Object.entries(paymentInfo.value.fields)) {
                        paymentObj.value[field.key] = null
                    }
                    paymentObj.value['enabled'] = true
                    let accountObj = {}
                    let copyObj = Object.assign(accountObj, paymentObj.value)
                    singleAccountSettings.value.push(accountObj)
                }
            })
        }
    } else if (props.pageType === 'edit' && singleAccountSettings.value.length === 0) {
        for (let [key, field] of Object.entries(paymentInfo.value.fields)) {
            paymentObj.value[field.key] = null
        }
        paymentObj.value['enabled'] = true
        let accountObj = {}
        let copyObj = Object.assign(accountObj, paymentObj.value)
        singleAccountSettings.value.push(accountObj)
    }
})

</script>

<style scoped>
hr.solid {
  border-top: 2px solid #bbb;
}
</style>