<template>
    <div v-if="ready" class="flex-col flex text-[16px] p-5 sm:p-10">

        <div class="flex mt-5 sm:mt-0 ml-2">
            <input 
                class="form-control form-check-input ml-3 w-[1.2rem] h-[1.2rem]" 
                type="checkbox" 
                v-model=" props.campaign.meta_payment.direct_payment.enabled"
            />
            <label class="form-label ml-3">Enabled</label>
        </div>

        <div 
            class="sm:mx-5"
            v-for="(account, index_i) in props.campaign.meta_payment.direct_payment.v2_accounts" :key="index_i"
        >
            <div 
                class="intro-y flex flex-col"
                v-for="(field, index_j) in payment.fields" 
                :key="index_j"
            >
                <template v-if="field.type === 'text'">
                    <label class="mt-2 text-base">{{ field.name }}</label>
                    <input 
                        class="form-control w-full"
                        type="text" 
                        v-model="account[field.key]"
                    />
                </template>

                <template v-else-if="field.type === 'textarea'">
                    <label class="mt-2 text-base">{{ field.name }}</label>
                    <textarea 
                        class="form-control p-2"
                        v-model="account[field.key]"
                    />
                </template>

                <template v-else-if="field.type === 'checkbox'">
                    <label class="form-label mt-2 text-base">{{ field.name }}
                    <input 
                        class="form-control form-check-input w-[1.2rem] h-[1.2rem] my-auto ml-2"
                        type="checkbox" 
                        v-model="account[field.key]"
                    />
                    </label>
                </template>

                <template v-else-if="field.type === 'file'">
                    <label>Upload Image</label>
                    <div class="border-2 border-dashed dark:border-darkmode-400 relative">
                        <div class="px-4 items-center justify-center flex">
                            <img :src="previewImages[index_i]" class="uploading-image h-60 object-cover" />
                        </div>
                        <div class="px-4 text-[1rem] sm:text-[16px] absolute top-20 text-center w-full flex flex-col items-center justify-center"
                            v-if="previewImages[index_i] === null">
                            <div class="flex flex-col sm:flex-row items-center justify-center"> 
                                <ImageIcon class="w-8 h-8 mr-2 -mt-2 text-slate-600" /> 
                                <strong class="text-slate-600">Upload a file or drag and drop</strong> 
                            </div>
                            <div class="mt-2 text-slate-500">accepted File types: jpeg, png, jpg</div>
                            <div class="text-slate-500">Max file size : 2MB</div>  
                        </div>
                            <input
                                type="file"
                                class="w-full h-full top-0 left-0 absolute opacity-0"
                                accept="image/jpeg" 
                                @change="uploadImage($event, index_i)"
                            />
                    </div>
                </template>

            </div>

            <button 
                class="btn btn-danger w-24 inline-block text-base my-5" 
                @click="deleteDirectPayment(index_i)"
            > 
                Delete 
            </button>

        </div>

        <button 
            class="btn btn-primary w-32 inline-block text-base mb-5  sm:mt-3  sm:mr-32 self-end"
            @click="addDirectPayment()"
        > 
            + add more
        </button>

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
    props.campaign.meta_payment.direct_payment.v2_accounts.push({mode:'',name:'',number:'',note:'',require_customer_return:true})
    props.directPaymentImages.push(null)
    previewImages.value.push(null)
}


</script>
