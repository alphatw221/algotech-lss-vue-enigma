<template>
    <div v-if="ready" class="gap-5 flex-col flex p-5">
        <!-- <a 
			class="col-end text-right w-full inline-block text-base whitespace-nowrap"
            @click="addDirectPayment()"
        > 
           <u> + Add More Option </u>
        </a> -->

        <div class="flex mt-5 sm:mx-5 sm:mt-0">
            <!-- <div class="flex"> 
                <input 
                class="form-control form-check-input w-[1.2rem] h-[1.2rem]" 
                type="checkbox" 
                v-model=" props.campaign.meta_payment.direct_payment.enabled"
                />
                <label class="ml-3 form-label text-base font-medium">{{$t('create_campaign.payment_form.enabled')}}</label>
            </div> -->
            <button 
				class="inline-block rounded-lg btn btn-primary sm:ml-auto sm:w-24 lg:w-60 2xl:w-60 h-[42px] sm:mt-auto mx-auto" 
				@click="addDirectPayment()"
			>
				{{$t('create_campaign.payment_form.add_more_direct_payment')}}
			</button>
            <!-- <a 
                class="whitespace-nowrap font-medium"
                @click="addDirectPayment()"
            > <u> + {{$t('create_campaign.payment_form.add_more_direct_payment')}} </u> 
            </a> -->
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
                    <label class="form-label text-base font-medium mt-2">{{$t(`create_campaign.payment_form.direct_payment.${field.key}`)}}</label>
                    <input 
                        class="form-control form-label w-full"
                        type="text" 
                        v-model="account[field.key]"
                    />
                    <label class="text-danger font-[8px] font-light" 
                        v-for="error,index in props.v.meta_payment.direct_payment.v2_accounts.$each.$response.$errors[index_i][field.key]"
                        :key="index"
                        >{{error.$message}}
                    </label>
                </template>

                <template v-else-if="field.type === 'textarea'">
                    <label class="form-label text-base font-medium mt-2">{{$t(`create_campaign.payment_form.direct_payment.${field.key}`)}}</label>
                    <textarea 
                        class="form-control form-label p-2"
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
                        <label class="form-label text-base font-medium mt-2">{{$t(`create_campaign.payment_form.direct_payment.${field.key}`)}}
                        </label>
                    </div>
                </template>

                <template v-else-if="field.type === 'file'">
                    <label class="form-label text-base font-medium mt-2">{{$t('create_campaign.payment_form.upload_image')}}</label>
                    <div class="relative border-2 border-dashed dark:border-darkmode-400">
                        <div class="flex items-center justify-center px-4">
                            <!-- temp -->
                            <img :src="previewImages[index_i]" class="object-cover uploading-image h-60" />
                            <Tippy tag="a" href="javascript:;" class="absolute right-3 top-3 tooltip" content="Remove Image" :options="{theme: 'light',}">
                                <XCircleIcon class="absolute right-3 top-3 z-10 click-icon text-danger" @click="removeImage(index_i)"/>
                            </Tippy>
                        </div>
                        <div class="px-4 text-[1rem] sm:text-[16px] absolute top-20 text-center w-full flex flex-col items-center justify-center"
                            v-if="previewImages[index_i] === null">
                            <div class="flex flex-col sm:flex-row items-center justify-center"> 
                                <ImageIcon class="w-8 h-8 mr-2 text-slate-600" /> 
                                <strong class="text-slate-600">{{$t('create_campaign.payment_form.upload_a_file_or_drag_and_drop')}}</strong> 
                            </div>
                            <div class="mt-2 text-slate-500">{{$t('create_campaign.payment_form.accepted_file_types')}}: jpeg, png, jpg</div>
                            <div class="text-slate-500">{{$t('create_campaign.payment_form.max_file_size')}}: 2MB</div>  
                        </div>
                            <input
                                type="file"
                                class="absolute top-0 left-0 w-full h-full opacity-0"
                                accept="image/jpeg,image/pen,image/jpg" 
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
                    {{$t('create_campaign.payment_form.delete')}}
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
    v:Object
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
    if(image.size/1024/1024>2){
        sellerStore.alert.showMessageToast('image size exceed 2 MB')
        return
    }
    props.directPaymentImages[index]=image
	let reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onload = event =>{ previewImages.value[index] = event.target.result };
}

const removeImage = (index) =>{
    previewImages.value[index] = null
    props.directPaymentImages[index] = '._no_image'
}

const deleteDirectPayment = index=>{
    props.campaign.meta_payment.direct_payment.v2_accounts.splice(index,1)
    previewImages.value.splice(index,1)
    props.directPaymentImages.splice(index,1)
}

const addDirectPayment = ()=>{
    props.campaign.meta_payment.direct_payment.v2_accounts.unshift({mode:'',name:'',number:'',note:'',require_customer_return:true})
    props.directPaymentImages.unshift('._no_image')
    previewImages.value.unshift(null)
}


</script>
