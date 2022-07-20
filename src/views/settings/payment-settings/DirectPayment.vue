<template>
    <div class="flex-col flex text-[16px]">
        <div class="flex justify-between mt-5 sm:mt-0">
            <div class="flex"> 
                <input 
                class="form-control form-check-input w-[1.2rem] h-[1.2rem]" 
                type="checkbox" 
                v-model="paymentData.enabled"
                />
                <label class="ml-3 form-label">{{ $t('settings.payment_form.enabled') }}</label>
            </div>
            <a 
                class="whitespace-nowrap"
                @click="addDirectPayment()"
            > <u> + {{ $t('settings.payment_form.add_more_direct_payment') }}  </u> 
            </a>
        </div>

        <div v-for="(account, index_i) in paymentData.v2_accounts" :key="index_i">
            <div 
                class="flex flex-col intro-y"
                v-for="(field, index_j) in payment.fields" 
                :key="index_j"
            >
                <template v-if="field.type === 'text'">
                    <label class="mt-2 text-base">{{ $t(`settings.payment_form.direct_payment.${field.key}`)  }}</label>
                    <input 
                        class="w-full form-control"
                        type="text" 
                        v-model="account[field.key]"
                    />
                </template>

                <template v-else-if="field.type === 'textarea'">
                    <label class="mt-2 text-base">{{ $t(`settings.payment_form.direct_payment.${field.key}`)  }}</label>
                    <textarea 
                        class="p-2 form-control"
                        v-model="account[field.key]"
                    />
                </template>

                <template v-else-if="field.type === 'checkbox'">
                    <label class="mt-2 text-base form-label">{{ $t(`settings.payment_form.direct_payment.${field.key}`)  }}
                    <input 
                        class="form-control form-check-input w-[1.2rem] h-[1.2rem] my-auto ml-2"
                        type="checkbox" 
                        v-model="account[field.key]"
                    />
                    </label>
                </template>

                <template v-else-if="field.type === 'file'">
                    <label>{{ $t('settings.payment_form.upload_image') }}</label>
                    <div class="relative border-2 border-dashed dark:border-darkmode-400">
                        <div class="flex items-center justify-center px-4">
                            <img :src="previewImages[index_i]" class="object-cover uploading-image h-60" />
                        </div>
                        <div class="px-4 text-[1rem] sm:text-[16px] absolute top-20 text-center w-full flex flex-col items-center justify-center"
                            v-if="[undefined, null, ''].includes(previewImages[index_i])">
                            <div class="flex flex-col items-center justify-center sm:flex-row"> 
                                <ImageIcon class="w-8 h-8 mr-2 -mt-2 text-slate-600" /> 
                                <strong class="text-slate-600">{{ $t('settings.payment_form.upload_a_file_or_drag_and_drop') }}</strong> 
                            </div>
                            <div class="mt-2 text-slate-500">{{ $t('settings.payment_form.accepted_file_types') }}</div>
                            <div class="text-slate-500">{{ $t('settings.payment_form.max_file_size') }} : 2MB</div>  
                        </div>
                            <input
                                type="file"
                                class="absolute top-0 left-0 w-full h-full opacity-0"
                                accept="image/jpeg,image/png,image/jpg" 
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
                    {{ $t('settings.payment_form.delete') }} 
                </button>
            </div>
        </div>

        <button 
                class="w-48 mt-2 text-base btn btn-elevated-rounded-primary"
                @click="updateDirectPayment"
            > 
            {{ $t('settings.payment_form.update') }} 
        </button>
    </div>
</template>

<script setup>

import { computed, onMounted, ref, watch, provide, reactive, toRefs ,defineProps} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { seller_update_payment } from '@/api_v2/user_subscription'
const sellerStore = useLSSSellerLayoutStore();
const props = defineProps({
    payment: Object,
});

const route = useRoute();
const router = useRouter();

const paymentData = ref(
    {
        enabled:false,
        title:'',
        v2_accounts:[]
    }
)
const previewImages = ref([])
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL.slice(0, -1);
const formData = new FormData()

onMounted(() => {
    if(!sellerStore.userInfo.user_subscription)return
    console.log(sellerStore.userInfo.user_subscription.meta_payment)

    if(sellerStore.userInfo.user_subscription.meta_payment[props.payment.key]){
        paymentData.value = JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_payment[props.payment.key]))  
    }


    if(typeof paymentData.value['enabled'] != 'boolean')paymentData.value['enabled']=false
    if(!Array.isArray(paymentData.value['v2_accounts']))paymentData.value['v2_accounts']=[]

    paymentData.value.v2_accounts.forEach(account => {
        previewImages.value.push(storageUrl+account.image)
    });
})

const uploadImage = (event, index) =>{
	let image = event.target.files[0];
    if(image.size/1024/1024>2){
        sellerStore.alert.showMessageToast('image size exceed 2 MB')
        return
    }
    formData.append('_'+paymentData.value.v2_accounts[index].name,image)
	let reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onload = event =>{ previewImages.value[index] = event.target.result };
}


const deleteDirectPayment = index=>{
    paymentData.value.v2_accounts.splice(index,1)
    previewImages.value.splice(index,1)

}
const addDirectPayment = ()=>{
    paymentData.value.v2_accounts.unshift({mode:'',name:'',number:'',note:'',require_customer_return:true})
    previewImages.value.unshift('')
}

const updateDirectPayment = () => {
    formData.append('data', JSON.stringify(paymentData.value))

    seller_update_payment(props.payment.key,formData).then(res=>{
        sellerStore.userInfo = res.data
        sellerStore.notification.showMessageToast("Update Successfully")
    })
}


</script>
