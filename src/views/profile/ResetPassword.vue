<template> 
    <div  class="intro-y py-5 text-[16px] sm:text-[1.2rem] flex flex-col"
        :class="{ hidden: sellerStore.profileTab !== 3, block: sellerStore.profileTab === 3 }" >
        
        <div class="flex flex-col form-inline gap-5">
            <div class="flex-col w-full">
                <label for="horizontal-form-1" class="w-48">Current Password</label>
                <input 
                    id="horizontal-form-1" 
                    class="form-control input_text" 
                    :class="{ 'border-danger': v.password.$error }"
                    type="text" 
                    v-model.trim="v.password.$model"
                />
            </div>
            <template v-if="v.password.$error">
                <label class="text-danger text-[14px] m-auto">
                    required input
                </label>
            </template>
            
            <div class="flex-col w-full">
                <label for="horizontal-form-1" class="w-48">New Password</label>
                <input 
                    id="horizontal-form-1" 
                    class="form-control input_text" 
                    :class=" { 'border-danger': v.new_password.$error } "
                    type="text"
                    v-model.trim="v.new_password.$model"
                />
            </div>
            <template v-if="v.new_password.$error">
                <label class="text-danger text-[14px] m-auto">
                    required input
                </label>
            </template>

            <div class="flex-col w-[100%]">
                <label for="horizontal-form-1" class="w-48">Confirm Password</label>
                <input 
                    id="horizontal-form-1" 
                    class="form-control input_text" 
                    :class=" { 'border-danger': v.confirm_password.$error } "
                    type="text" 
                    v-model.trim="v.confirm_password.$model"
                />
                
            </div>
            <template v-if="v.confirm_password.$error">
                <label class="text-danger text-[14px] m-auto">
                    required input
                </label>
            </template>
        </div>

        <div class="flex justify-end mt-10">
            <button class="btn btn-primary w-32 shadow-md ml-5" @click="submitPassword()"> Submit </button>
        </div> 
    </div>  
</template>

<script setup>
import { ref } from 'vue';
import { seller_change_password } from '@/api_v2/user.js';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from "@vuelidate/validators";
import { computed } from '@vue/runtime-core';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';


const sellerStore = useLSSSellerLayoutStore()
const passwordData = ref({
    password: '',
    new_password: '',
    confirm_password: ''
})
const passwordRules = computed(() => {
    return {
        password: { required },
        new_password: { required, minLength: minLength(8), maxLength: maxLength(20) },
        confirm_password: { required, minLength: minLength(8), maxLength: maxLength(20) }
    }
})
const v = useVuelidate(passwordRules, passwordData)

const resetForm = () => {
    passwordData.value = { password: '', new_password: '', confirm_password: '' }
}

const submitPassword = () => {
    v.value.$touch()
	if (v.value.$invalid) {
		sellerStore.alert.showMessageToast("Invalid Data")
		return
	}

    if (!Object.values(passwordData.value).includes(''))
    seller_change_password(passwordData.value).then(res => {
        console.log(res.data)
    })
}

</script>

<style>

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 768px) {

    .input_text {
        width: 100%;
    }

}

</style>