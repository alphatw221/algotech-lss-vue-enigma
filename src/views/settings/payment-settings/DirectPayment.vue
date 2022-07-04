<template>
    <div class="flex-col flex text-[16px]">
        <div class="flex mt-5 lg:mb-5 lg:mt-0">
            <input 
                class="form-control form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
                type="checkbox" 
                v-model="paymentData.enable"
            />
            <label class="form-label ml-3">Enabled</label>
        </div>
        
        <div v-for="(account, index_i) in paymentData.v2_accounts" :key="index_i" class="my-10 lg:my-0 lg:mx-5 lg:p-5">

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
                <label class="form-label col-start-1 col-span-9 lg:col-span-3 my-5">{{ field.name }}</label>
                <input 
                    class="form-control form-check-input col-span-1 lg:col-span-9 w-5/6 w-[1.5rem] h-[1.5rem]  my-5"
                    type="checkbox" 
                    v-model="account[field.key]"
                />
                </template>
                <template v-else-if="field.type === 'file'">
                    <div class="lg:my-5 col-span-12 lg:w-5/6 col-start-1">
                        <label class="form-label">Upload Image</label>
                        <div class="border-2 border-dashed dark:border-darkmode-400 rounded-lg relative">
                            <div class="px-4 items-center justify-center flex">
                                <img :src="previewImages[index_i]" class="uploading-image h-60 object-cover" />
                            </div>
                            <div class="px-4 pb-4 text-[16px] absolute top-16 text-center w-full flex flex-col items-center justify-center"
                                v-if="previewImages[index_i] === ''">
                                <div class="flex"> <ImageIcon class="w-8 h-8 mr-2 -mt-2 text-slate-600" /> <strong class="text-slate-600">Upload a file or drag and drop</strong> </div>
                                <div class="mt-2 text-slate-500">accepted File types: jpeg, png, jpg</div>
                                <div class="text-slate-500">Max file size : 2MB</div>  
                            </div>
                            <input
                                    type="file"
                                    class="w-full h-full top-0 left-0 absolute opacity-0 border-6 cursor-pointer"
                                    accept="image/jpeg" 
                                    @change="uploadImage($event, index_i)"
                                />
                        </div>
                    </div>
                </template>
            </div>

            <button 
                class="btn btn-danger w-24 inline-block text-base mt-5 " 
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

        <button 
                class="btn btn-elevated-rounded-primary text-base w-48 mt-2"
                @click="updateDirectPayment"
            > 
            Update 
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
        enable:false,
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
        paymentData.value = sellerStore.userInfo.user_subscription.meta_payment[props.payment.key]
    }


    if(typeof paymentData.value['enabled'] != 'boolean')paymentData.value['enabled']=false
    if(!Array.isArray(paymentData.value['v2_accounts']))paymentData.value['v2_accounts']=[]

    paymentData.value.v2_accounts.forEach(account => {
        previewImages.value.push(storageUrl+account.image)
    });
})

const uploadImage = (event, index) =>{
	let image = event.target.files[0];
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
    paymentData.value.v2_accounts.push({mode:'',name:'',number:'',note:'',require_customer_return:true})
    previewImages.value.push('')
}

const updateDirectPayment = () => {
    formData.append('data', JSON.stringify(paymentData.value))

    seller_update_payment(props.payment.key,formData).then(res=>{
        sellerStore.userInfo = res.data
        sellerStore.notification.showMessageToast("Update Successfully")
    })
}


</script>
