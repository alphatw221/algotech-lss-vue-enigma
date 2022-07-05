<template>
    <div v-if="ready" class="flex-col flex text-[16px] p-5 lg:p-10">

        <div class="flex mt-5 lg:mt-0">
            <input 
                class="form-control form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
                type="checkbox" 
                v-model=" props.campaign.meta_payment.direct_payment.enabled"
            />
            <label class="form-label ml-3">Enabled</label>
        </div>

        <div v-for="(account, index_i) in props.campaign.meta_payment.direct_payment.v2_accounts" :key="index_i" class="my-10 lg:my-0 lg:mx-5">

            <div 
                class="intro-y grid grid-cols-12 gap-2 lg:gap-5"
                v-for="(field, index_j) in payment.fields" 
                :key="index_j"
            >
                <template v-if="field.type === 'text'">
                    <label class="form-label col-start-1 col-span-12 lg:col-span-2 mt-5 lg:my-5">{{ field.name }}</label>
                    <input 
                        class="form-control form-control-rounded col-span-12 lg:col-span-9 lg:w-5/6 -mt-3 lg:my-5 lg:h-12"
                        type="text" 
                        v-model="account[field.key]"
                    />
                </template>

                <template v-else-if="field.type === 'textarea'">
                    <label class="form-label col-start-1 col-span-12 lg:col-span-2 mt-5 lg:my-5">{{ field.name }}</label>
                    <textarea 
                        class="form-control rounded-lg col-span-12 lg:col-span-9 lg:w-5/6 lg:my-5 p-2 -mt-3"
                        v-model="account[field.key]"
                    />
                </template>

                <template v-else-if="field.type === 'checkbox'">
                    <label class="form-label col-start-1 col-span-12 my-auto">{{ field.name }}
                    <input 
                        class="form-control form-check-input col-span-1 w-[1.5rem] h-[1.5rem]  my-auto ml-2"
                        type="checkbox" 
                        v-model="account[field.key]"
                    />
                    </label>
                </template>

                <template v-else-if="field.type === 'file'">
                    <div class="lg:my-5 col-span-12 lg:w-5/6 col-start-1">
                        <label class="form-label">Upload Image</label>
                        <div class="border-2 border-dashed dark:border-darkmode-400 rounded-lg relative">
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
                    </div>
                </template>

            </div>

            <button 
                class="btn btn-danger w-24 inline-block text-base" 
                @click="deleteDirectPayment(index_i)"
            > 
                Delete 
            </button>

        </div>

        <button 
            class="btn btn-primary w-32 inline-block text-base mb-5 lg:mt-3 lg:mr-32 self-end"
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
