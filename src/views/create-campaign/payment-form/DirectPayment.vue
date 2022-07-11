<template>
    <div v-if="ready" class="flex-col flex text-[16px] p-5 sm:p-10">

        <div class="flex justify-between mt-5 sm:mx-5 sm:mt-0">
            <div class="flex"> 
                <input 
                class="form-control form-check-input w-[1.2rem] h-[1.2rem]" 
                type="checkbox" 
                v-model=" props.campaign.meta_payment.direct_payment.enabled"
                />
                <label class="ml-3 form-label">Enabled</label>
            </div>
            <a 
                class="whitespace-nowrap"
                @click="addDirectPayment()"
            > <u> + Add more option  </u> 
            </a>
        </div>

        <div 
            class="sm:mx-5"
            v-for="(account, index_i) in props.campaign.meta_payment.direct_payment.v2_accounts" :key="index_i"
        >
            <div 
                class="flex flex-col intro-y"
                v-for="(field, index_j) in payment.fields" 
                :key="index_j"
            >
                <template v-if="field.type === 'text'">
                    <label class="mt-2 text-base">{{ field.name }}</label>
                    <input 
                        class="w-full form-control"
                        type="text" 
                        v-model="account[field.key]"
                    />
                </template>

                <template v-else-if="field.type === 'textarea'">
                    <label class="mt-2 text-base">{{ field.name }}</label>
                    <textarea 
                        class="p-2 form-control"
                        v-model="account[field.key]"
                    />
                </template>

                <template v-else-if="field.type === 'checkbox'">
                    <label class="mt-2 text-base form-label">{{ field.name }}
                    <input 
                        class="form-control form-check-input w-[1.2rem] h-[1.2rem] my-auto ml-2"
                        type="checkbox" 
                        v-model="account[field.key]"
                    />
                    </label>
                </template>

                <template v-else-if="field.type === 'file'">
                    <label>Upload Image</label>
                    <div class="relative border-2 border-dashed dark:border-darkmode-400">
                        <div class="flex items-center justify-center px-4">
                            <img :src="previewImages[index_i]" class="object-cover uploading-image h-60" />
                        </div>
                        <div class="px-4 text-[1rem] sm:text-[16px] absolute top-20 text-center w-full flex flex-col items-center justify-center"
                            v-if="previewImages[index_i] === null">
                            <div class="flex flex-col items-center justify-center sm:flex-row"> 
                                <ImageIcon class="w-8 h-8 mr-2 -mt-2 text-slate-600" /> 
                                <strong class="text-slate-600">Upload a file or drag and drop</strong> 
                            </div>
                            <div class="mt-2 text-slate-500">accepted File types: jpeg, png, jpg</div>
                            <div class="text-slate-500">Max file size : 2MB</div>  
                        </div>
                            <input
                                type="file"
                                class="absolute top-0 left-0 w-full h-full opacity-0"
                                accept="image/jpeg" 
                                @change="uploadImage($event, index_i)"
                            />
                    </div>
                </template>

            </div>

            <div class="flex w-full"> 
                <button 
                class="inline-block w-24 my-5 ml-auto text-base btn btn-danger" 
                @click="deleteDirectPayment(index_i)"
                > 
                    Delete 
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>

import { computed, onMounted, ref, watch, provide, reactive, toRefs ,defineProps} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { seller_update_payment } from '@/api_v2/user_subscription'

const ready = ref(false)
const sellerStore = useLSSSellerLayoutStore();
const props = defineProps({
    payment: Object,
    campaign: Object,
    directPaymentImages: Array,
});

const route = useRoute();
const router = useRouter();


const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL.slice(0, -1);
const previewImages = ref([])

onMounted(() => {
    if(!sellerStore.userInfo.user_subscription)return
    if(typeof props.campaign.meta_payment.direct_payment['enabled'] != 'boolean')props.campaign.meta_payment.direct_payment['enabled']=false
    if(!Array.isArray(props.campaign.meta_payment.direct_payment['v2_accounts']))props.campaign.meta_payment.direct_payment['v2_accounts']=[]

    props.campaign.meta_payment.direct_payment.v2_accounts.forEach(account => {
        previewImages.value.push(storageUrl+account.image)
        props.directPaymentImages.push(null)
    });
    ready.value = true
})

const uploadImage = (event, index) =>{
	let image = event.target.files[0];
    props.directPaymentImages[index]=image
	let reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onload = event =>{ previewImages.value[index] = event.target.result };
}

const deleteDirectPayment = index=>{
    props.campaign.meta_payment.direct_payment.v2_accounts.splice(index,1)
    previewImages.value.splice(index,1)
    props.directPaymentImages.splice(index,1)
}

const addDirectPayment = ()=>{
    props.campaign.meta_payment.direct_payment.v2_accounts.unshift({mode:'',name:'',number:'',note:'',require_customer_return:true})
    props.directPaymentImages.unshift(null)
    previewImages.value.unshift(null)
}


</script>
