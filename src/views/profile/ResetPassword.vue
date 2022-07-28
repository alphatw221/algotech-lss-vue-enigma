<template> 
    <div  class="intro-y py-5 text-[16px] sm:text-[1.2rem] flex flex-col"
        :class="{ hidden: sellerStore.profileTab !== 3, block: sellerStore.profileTab === 3 }" >
        
        <div class="flex flex-col gap-3 sm:gap-5">
            <div class="flex-col w-full">
                <label for="horizontal-form-1" class="w-48"> {{$t('profile.reset_password.current_password')}} </label>
                <div class="input-group"> 
                <input 
                    id="horizontal-form-1" 
                    class="form-control input_text" 
                    :class="{ 'border-danger': v.password.$error }"
                    :type="inputSwitch.current ? 'text' : 'password'" 
                    v-model.trim="v.password.$model"
                />
                <button v-if="inputSwitch.current" 
                    @click="inputSwitch.current = !inputSwitch.current"
                    class="btn btn-secondary-soft rounded-l-none h-[35px] sm:h-[42px]"> <EyeOffIcon /> </button> 
                <button v-else
                    @click="inputSwitch.current = !inputSwitch.current"
                    class="btn btn-secondary-soft rounded-l-none h-[35px] sm:h-[42px]"> <EyeIcon /> </button> 
                </div>
                <template v-if="v.password.$error">
                    <label class="text-danger text-[14px]">
                        {{$t('profile.input_required')}}
                    </label>
                </template>
            </div>
            
            
            <div class="flex-col w-full">
                <label for="horizontal-form-1" class="w-48">{{$t('profile.reset_password.new_password')}}</label>
                <div class="input-group"> 
                    <input 
                        id="horizontal-form-1" 
                        class="form-control input_text"  
                        :class=" { 'border-danger': v.new_password.$error } "
                        :type="inputSwitch.new ? 'text' : 'password'"
                        v-model.trim="v.new_password.$model"
                    />
                    <button v-if="inputSwitch.new" 
                        @click="inputSwitch.new = !inputSwitch.new"
                        class="btn btn-secondary-soft rounded-l-none h-[35px] sm:h-[42px]"> <EyeOffIcon /> </button> 
                    <button v-else
                        @click="inputSwitch.new = !inputSwitch.new"
                        class="btn btn-secondary-soft rounded-l-none h-[35px] sm:h-[42px]"> <EyeIcon /> </button> 
                </div>
                <template v-if="v.new_password.$error">
                    <label class="text-danger text-[14px]">
                        {{$t('profile.password_length')}}
                    </label>
                </template>
            </div>
            

            <div class="flex-col w-[100%]">
                <label for="horizontal-form-1" class="w-48">{{$t('profile.reset_password.confirm_password')}}</label>
                <div class="input-group"> 
                    <input 
                        class="form-control input_text" 
                        :class=" { 'border-danger': v.confirm_password.$error } "
                        :type="inputSwitch.confirm ? 'text' : 'password'" 
                        v-model.trim="v.confirm_password.$model"
                    />
                    <button v-if="inputSwitch.confirm" 
                        @click="inputSwitch.confirm = !inputSwitch.confirm" 
                        class="btn btn-secondary-soft rounded-l-none h-[35px] sm:h-[42px]"> <EyeOffIcon /> </button> 
                    <button v-else 
                        @click="inputSwitch.confirm = !inputSwitch.confirm" 
                        class="btn btn-secondary-soft rounded-l-none h-[35px] sm:h-[42px]"> <EyeIcon /> </button> 
                </div>
                <template v-if="v.confirm_password.$error">
                <label class="text-danger text-[14px]">
                    {{$t('profile.input_err')}}
                </label>
                </template>
            </div>
            
        </div>

        <div class="flex justify-end mt-10">
            <button class="btn btn-primary w-32 shadow-md ml-5" @click="submitPassword()"> {{$t('profile.reset_password.submit')}} </button>
        </div> 
    </div>  
</template>

<script setup>
import { ref } from 'vue';
import { seller_change_password } from '@/api_v2/user.js';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, sameAs } from "@vuelidate/validators";
import { computed } from '@vue/runtime-core';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import i18n from "@/locales/i18n";


const sellerStore = useLSSSellerLayoutStore()

const inputSwitch = ref({
    current: false, 
    new: false, 
    confirm: false, 
})

const passwordData = ref({
    password: '',
    new_password: '',
    confirm_password: ''
})
const passwordRules = computed(() => {
    return {
        password: { required },
        new_password: { minLength: minLength(8), maxLength: maxLength(20) },
        confirm_password: { sameAs: sameAs(passwordData.value.new_password) }
    }
})
const v = useVuelidate(passwordRules, passwordData)

const resetForm = () => {
    passwordData.value = { password: '', new_password: '', confirm_password: '' }
}

const submitPassword = () => {
    v.value.$touch()
	if (v.value.$invalid) {
        sellerStore.alert.showMessageToast(i18n.global.t('profile.input_err'))
		return
	}

    if (!Object.values(passwordData.value).includes(''))
    seller_change_password(passwordData.value).then(res => {
        sellerStore.notification.showMessageToast(i18n.global.t('profile.update_successed'))
        passwordData.value.password=''
        passwordData.value.new_password=''
        passwordData.value.confirm_password=''
    }).catch(err=>{
        alert(err.response.data)
	})
}

const toggle=(v)=>{
    v = !v
    console.log(v.value)
}

</script>