<template>
    <div>
        <template v-if="props.paymentName === 'directPayment'">
            <div v-for="(account, index) in directPaymentSettings" :key="index">
                <div 
                    class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5" 
                    v-for="(field, key) in paymentInfo.fields" 
                    :key="key"
                >
                    <template v-if="field.type === 'text'">
                        <label class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">{{ field.name }}</label>
                        <input 
                            class="form-control-rounded col-span-9 "
                            type="text" 
                            v-model="account[field.key]"
                        />
                    </template>
                    <template v-else-if="field.type === 'textarea'">
                        <label class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">{{ field.name }}</label>
                        <textarea 
                            class="col-span-9" 
                            v-model="account[field.key]"
                        />
                    </template>
                    <template v-else-if="field.type === 'checkbox'">
                        <label class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">{{ field.name }}</label>
                        <input 
                            class="form-check-input col-span-9 " 
                            style="width: 1.5rem; height:1.5rem;"
                            type="checkbox" 
                            v-model="account[field.key]"
                        />
                    </template>
                    <template v-else-if="field.type === 'file'">
                        <div class="col-span-12 col-start-1">
                            <label class="form-label">Upload Image</label>
                            <div class="border-2 border-dashed rounded-md">
                                <div class="flex flex-wrap px-4">
                                    <img :src="account.previewImage" class="uploading-image h-16 lg:h-48 2xl:h-64 object-cover" />
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
                    class="btn btn-danger w-24 inline-block text-base" 
                    @click="modifyDirectPayment('delete', index)"
                > Delete </button>
            </div>
            <button 
                class="btn btn-primary col-start-5 w-24 inline-block text-base mb-5 mt-3"
                @click="modifyDirectPayment('add', index)"
            > Add </button>
            <div class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5" >
                <button 
                    class="btn btn-elevated-rounded-success text-base w-48 col-start-5 mt-2"
                    @click="updateDirectPayment"
                > Update </button>
            </div>
        </template>

        <template v-else-if="props.paymentName != 'directPayment' && paymentInfo.multiple === false">
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
            <div class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5" >
                <button 
                    class="btn btn-elevated-rounded-success text-base w-48 col-start-5 mt-2"
                    @click="updateSinglePayment"
                > Update </button>
            </div>
        </template>

    </div>
</template>

<script setup>
import { onMounted, ref, defineProps, onUpdated, watchEffect } from 'vue';
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { createAxiosWithBearer } from '@/libs/axiosClient'

const layoutStore = useLSSSellerLayoutStore();
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const props = defineProps({
    paymentName: String,
})
const paymentStore = useLSSPaymentMetaStore()
const paymentInfo = ref({})
const directPaymentSettings = ref([])
const singleAccountSettings = ref([])
const paymentObj = ref({})


watchEffect(() => {
    paymentInfo.value = paymentStore[props.paymentName]
    // console.log(paymentInfo.value)
});

onMounted(() => {
    if (props.paymentName === 'directPayment') {
        createAxiosWithBearer().get(paymentInfo.value.request_url)
        .then(response => {
            directPaymentSettings.value = response.data.accounts
            for (let i = 0; i < directPaymentSettings.value.length; i ++) {
                directPaymentSettings.value[i]['previewImage'] = storageUrl + directPaymentSettings.value[i].image.substring(1)
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
                let accountObj = {}
                let copyObj = Object.assign(accountObj, paymentObj.value)
                singleAccountSettings.value.push(accountObj)
            }
        })
    }
})

const uploadImage = (event, index) =>{
	let image = event.target.files[0];
    directPaymentSettings.value[index].formData = image
    
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

const updateDirectPayment = () => {
    console.log(directPaymentSettings);

    createAxiosWithBearer().delete(paymentInfo.value.request_url)
    for (let i = 0; i < directPaymentSettings.value.length; i ++) {
        let formData = new FormData()
        let data = {}
        for (let [key, value] of Object.entries(directPaymentSettings.value[i])) {
            if (key != 'previewImage') {
                if (key === 'formData') formData.append('image', value)
                else data[key] = value
            }
        }
        formData.append('data', JSON.stringify(data))
        createAxiosWithBearer().post(paymentInfo.value.request_url, formData)
        .then(response => {
            layoutStore.notification.showMessageToast("Update Success")
        })
    }
}

const updateSinglePayment = () => {
    let data = { 'activated': true }
    for (let [key, value] of Object.entries(singleAccountSettings.value[0])) {
        data[key] = value
    }
    createAxiosWithBearer().post(paymentInfo.value.request_url, data)
    .then(response => {
        layoutStore.notification.showMessageToast("Update Success")
    })
}
</script>