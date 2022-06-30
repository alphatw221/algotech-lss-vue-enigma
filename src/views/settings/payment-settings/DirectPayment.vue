<template>
    <div >
        <div >
            <input 
                class="form-check-input ml-3 " 
                style="width: 1.5rem; height:1.5rem;"
                type="checkbox" 
                v-model="paymentData.enabled"
            />
            <label class="form-label ml-3">Enabled</label>
        </div>
        

        <div v-for="(account, index_i) in paymentData.v2_accounts" :key="index_i">

            <div 
                class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-3 lg:gap-5 2xl:my-3 2xl:gap-5" 
                v-for="(field, index_j) in payment.fields" 
                :key="index_j"
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
                                <img :src="previewImages[index_i]" class="uploading-image h-16 lg:h-48 2xl:h-64 object-cover" />
                            </div>
                            <div class="px-4 pb-4 flex items-center cursor-pointer relative">
                                <ImageIcon class="w-4 h-4 mr-2" />
                                <span class="text-primary mr-1">Upload a file</span> or drag and drop
                                <input
                                    type="file"
                                    class="w-full h-full top-0 left-0 absolute opacity-0"
                                    accept="image/jpeg" 
                                    @change="uploadImage($event, index_i)"
                                />
                            </div>
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
            class="btn btn-primary col-start-5 w-24 inline-block text-base mb-5 mt-3"
            @click="addDirectPayment()"
        > 
            Add 
        </button>

        <div class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5" >
            <button 
                class="btn btn-elevated-rounded-success text-base w-48 col-start-5 mt-2"
                @click="updateDirectPayment"
            > 
                Update 
            </button>
        </div>
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
        sellerStore.notification.showMessageToast("Update Success")
    })
}


</script>
