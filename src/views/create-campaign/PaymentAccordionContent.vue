<template>
    <div>
        <template v-if="props.paymentName === 'directPayment'">
            <div class="ml-3 mt-3 ">
                <input 
                    class="form-check-input col-span-1" 
                    style="width: 1.5rem; height:1.5rem;"
                    type="checkbox" 
                    v-model="campaignStore.paymentSettings['directPayment'].enabled"
                />
                <label class="form-label ml-3 text-base mt-1 mr-3">Enable direct payment  /  Button name</label>
                <input 
                    class="form-control-rounded col-span-5"
                    type="text" 
                    v-model="campaignStore.paymentSettings['directPayment'].button_title"
                />
            </div>
            
            <div v-for="(account, index) in directPaymentSettings" :key="index">
                <div 
                    class="mt-3 ml-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-3 lg:gap-5 2xl:my-3 2xl:gap-5" 
                    v-for="(field, key) in paymentInfo.fields" 
                    :key="key"
                >
                    <template v-if="field.type === 'text'">
                        <label class="form-label col-start-1 col-span-12 lg:col-span-3 2xl:col-span-3">{{ field.name }}</label>
                        <input 
                            class="form-control-rounded col-span-7"
                            type="text" 
                            v-model="account[field.key]"
                        />
                    </template>
                    <template v-else-if="field.type === 'textarea'">
                        <label class="form-label col-start-1 col-span-12 lg:col-span-3 2xl:col-span-3">{{ field.name }}</label>
                        <textarea 
                            class="col-span-7" 
                            v-model="account[field.key]"
                        />
                    </template>
                    <template v-else-if="field.type === 'checkbox'">
                        <label class="form-label col-start-1 col-span-12 lg:col-span-3 2xl:col-span-3">{{ field.name }}</label>
                        <input 
                            class="form-check-input col-span-7" 
                            style="width: 1.5rem; height:1.5rem;"
                            type="checkbox" 
                            v-model="account[field.key]"
                        />
                    </template>
                    <template v-else-if="field.type === 'file'">
                        <div class="col-span-12 col-start-1 mr-3">
                            <label class="form-label">Upload Image</label>
                            <div class="border-2 border-dashed rounded-md">
                                <div class="flex flex-wrap px-4 mt-3">
                                    <img :src="account.previewImage" class="uploading-image h-16 lg:h-48 2xl:h-64 object-cover m-auto" />
                                </div>
                                <div class="px-4 pb-4 flex items-center cursor-pointer relative">
                                    <ImageIcon class="w-4 h-4 mr-2" />
                                    <span class="text-primary mr-1">Upload a file</span> or drag and drop
                                    <input
                                        type="file"
                                        class="w-full h-full top-0 left-0 absolute opacity-0"
                                        accept="image/jpeg" 
                                        @change="uploadImage($event, index)"
                                    />
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <button 
                    class="btn btn-danger w-24 inline-block text-base ml-3 mb-3" 
                    @click="modifyDirectPayment('delete', index)"
                > Delete </button>
                <hr class="solid">
            </div>
            
            <button 
                class="btn btn-primary col-start-5 w-24 inline-block text-base mb-5 mt-3 ml-3"
                @click="modifyDirectPayment('add', index)"
            > Add </button>
        </template>

        <template v-else-if="props.paymentName != 'directPayment' && paymentInfo.multiple === false">
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
                        <label class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">{{ field.name }}</label>
                        <input 
                            class="form-control-rounded col-span-9 "
                            type="text" 
                            v-model="account[field.key]"
                        />
                    </template>
                    <template v-else-if="field.type === 'select'">
                        <label class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">{{ field.name }}</label>
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
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const props = defineProps({
    paymentName: String,
})
const directPaymentSettings = ref([])
const singleAccountSettings = ref([])
const paymentInfo = ref({})
const paymentObj = ref({})
const imageDirectPayment = ref({})

watchEffect(() => {
    paymentInfo.value = paymentStore[props.paymentName]
});

watch(directPaymentSettings, () => {
    campaignStore.paymentSettings['directPayment'].accounts = directPaymentSettings.value
}, { deep: true })

watch(singleAccountSettings, () => {
    campaignStore.paymentSettings['stripe'] = singleAccountSettings.value[0]
}, { deep: true })

onMounted(() => {
    if (props.paymentName === 'directPayment') {
        createAxiosWithBearer().get(paymentInfo.value.request_url)
        .then(response => {
            if (response.data.accounts) {
                directPaymentSettings.value = response.data.accounts
                if (directPaymentSettings.value.length > 0) {
                    for (let i = 0; i < directPaymentSettings.value.length; i ++) {
                        directPaymentSettings.value[i]['previewImage'] = storageUrl + directPaymentSettings.value[i].image.substring(1)
                    }
                }
            }
        })

        // 創建樣板 directPayment Object 
        for (let [key, field] of Object.entries(paymentInfo.value.fields)) {
            if (field.key === 'require_customer_return') paymentObj.value[field.key] = true
            else paymentObj.value[field.key] = null
        }
        paymentObj.value['previewImage'] = null
        paymentObj.value['formData'] = new FormData()
    } else if (props.paymentName != 'directPayment' && paymentInfo.value.multiple === false) {
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
})

const uploadImage = (event, index) =>{
	let image = event.target.files[0]
    imageDirectPayment.value[directPaymentSettings.value[index].number] = image
    campaignStore.imageDirectPayment = imageDirectPayment.value
    
	let reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onload = event =>{ directPaymentSettings.value[index].previewImage = event.target.result };
}

const modifyDirectPayment = (type, index) => {
    if (type == 'add') {
        let accountObj = {}
        let copyObj = Object.assign(accountObj, paymentObj.value)
        if (Object.entries(directPaymentSettings.value).length > 0) {
            directPaymentSettings.value[parseInt(Object.keys(directPaymentSettings.value).at(-1)) + 1] = accountObj
        } else {
            directPaymentSettings.value[Object.entries(directPaymentSettings.value).length] = accountObj
        }
    } else if (type == 'delete') {
        directPaymentSettings.value = directPaymentSettings.value.filter(value => value != directPaymentSettings.value[index])
    }
}

</script>

<style scoped>
hr.solid {
  border-top: 2px solid #bbb;
}
</style>