<template>
    <div class="flex-col flex text-[16px]">
        <div class="flex justify-between mt-5 sm:mt-2">
            <div class="flex"> 
                <input 
                class="form-control form-check-input w-[1.2rem] h-[1.2rem] my-auto" 
                type="checkbox" 
                v-model="paymentData.enabled"
                />
                <label class="ml-3 form-label my-auto">{{ $t('settings.payment_form.enabled') }}</label>
            </div>
            <!-- <button 
				class="inline-block rounded-lg btn btn-primary sm:ml-auto sm:w-24 lg:w-60 2xl:w-60 h-[42px] sm:mt-auto" 
				@click="addDirectPayment()"
			>
				{{ $t('settings.payment_form.add_more_direct_payment') }}
			</button> -->
            <!-- <a 
                class="whitespace-nowrap"
                @click="addDirectPayment()"
            > <u> + {{ $t('settings.payment_form.add_more_direct_payment') }}  </u> 
            </a> -->
        </div>

        <div class="flex justify-between mt-5 sm:mt-0">
            <!-- <div class="flex"> 
                <input 
                class="form-control form-check-input w-[1.2rem] h-[1.2rem] my-auto" 
                type="checkbox" 
                v-model="paymentData.enabled"
                />
                <label class="ml-3 form-label my-auto">{{ $t('settings.payment_form.enabled') }}</label>
            </div> -->
            <button 
				class="inline-block rounded-lg btn btn-primary sm:ml-auto sm:w-24 lg:w-60 2xl:w-60 h-[42px] sm:mt-auto" 
				@click="addDirectPayment()"
			>
				{{ $t('settings.payment_form.add_more_direct_payment') }}
			</button>
        </div>

        <div v-for="(account, index_i) in paymentData.v2_accounts" :key="index_i" class="border-slate rounded-md border-2 p-3 my-3">
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
                    <label class="text-danger font-[8px] font-light" v-if="v.v2_accounts.$each.$response.$errors[index_i][field.key].length">required</label>

                </template>

                <template v-else-if="field.type === 'textarea'">
                    <label class="mt-2 text-base">{{ $t(`settings.payment_form.direct_payment.${field.key}`)  }}</label>
                    <textarea 
                        class="p-2 form-control"
                        v-model="account[field.key]"
                    />
                </template>

                <template v-else-if="field.type === 'checkbox'">
                <div class="flex flex-wrap my-3">
                    <input 
                            class="form-control form-label form-check-input w-[1.2rem] h-[1.2rem] my-auto mr-2"
                            type="checkbox" 
                            v-model="account[field.key]"
                        />
                    <label class="mt-2 text-base form-label">{{ $t(`settings.payment_form.direct_payment.${field.key}`)  }}
                    </label>
                </div>
                    
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

        <div class="self-end text-[14px] ">
            <button 
                    class="w-32 ml-5 shadow-md btn btn-primary"
                    @click="updateDirectPayment"
                > 
                {{ $t('settings.payment_form.update') }} 
            </button>
        </div>
        
    </div>
</template>

<script setup>

import { computed, onMounted, ref, watch, provide, reactive, toRefs ,defineProps} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { seller_update_payment } from '@/api_v2/user_subscription'

import { helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'



const sellerStore = useLSSSellerLayoutStore();
const props = defineProps({
    payment: Object,
});

const route = useRoute();
const router = useRouter();

const paymentData = reactive(
    {
        enabled:false,
        title:'',
        v2_accounts:[]
    }
)
const previewImages = ref([])
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL.slice(0, -1);
const formData = new FormData()

 const paymentDataRules = {
      v2_accounts: {
        $each: helpers.forEach({
            mode:{required},
            name: {required},
            number:{required}
        })
      }
    }

const v = useVuelidate(paymentDataRules, paymentData)

onMounted(() => {
    if(!sellerStore.userInfo.user_subscription)return
    console.log(sellerStore.userInfo.user_subscription.meta_payment)

    if(sellerStore.userInfo.user_subscription.meta_payment[props.payment.key]){
        Object.assign(paymentData,JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_payment[props.payment.key])))
        // paymentData = JSON.parse(JSON.stringify(sellerStore.userInfo.user_subscription.meta_payment[props.payment.key]))  
    }


    if(typeof paymentData['enabled'] != 'boolean')paymentData['enabled']=false
    if(!Array.isArray(paymentData['v2_accounts']))paymentData['v2_accounts']=[]

    paymentData.v2_accounts.forEach(account => {
        previewImages.value.push(storageUrl+account.image)
    });
})

const uploadImage = (event, index) =>{
	let image = event.target.files[0];
    if(image.size/1024/1024>2){
        sellerStore.alert.showMessageToast('image size exceed 2 MB')
        return
    }
    formData.append('_'+paymentData.v2_accounts[index].name,image)
	let reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onload = event =>{ previewImages.value[index] = event.target.result };
}


const deleteDirectPayment = index=>{
    paymentData.v2_accounts.splice(index,1)
    previewImages.value.splice(index,1)

}
const addDirectPayment = ()=>{
    paymentData.v2_accounts.unshift({mode:'',name:'',number:'',note:'',require_customer_return:true})
    previewImages.value.unshift('')
}

const updateDirectPayment = () => {

    if(v.value.$invalid){
        sellerStore.alert.showMessageToast("Invalid data")
        return
    }
    formData.append('data', JSON.stringify(paymentData))

    seller_update_payment(props.payment.key,formData).then(res=>{
        sellerStore.userInfo = res.data
        sellerStore.notification.showMessageToast("Update Successfully")
    })
}


</script>
