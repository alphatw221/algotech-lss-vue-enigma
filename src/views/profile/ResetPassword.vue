<template> 
    <div  class="intro-y box py-10 px-5 sm:p-12 text-[16px] sm:text-[1.2rem]">
        
        <div class="grid grid-cols-12 gap-5 w-[100%]">
            <div class="form-inline col-span-10 grid grid-cols-12">
                <label for="horizontal-form-1" class="form-label col-span-3">Password</label>
                <input 
                    id="horizontal-form-1" 
                    class="form-control col-start-4 col-span-9 input_text" 
                    type="text" 
                    v-model="passwordData.password"
                />
            </div>
            <div class="form-inline col-span-10 grid grid-cols-12">
                <label for="horizontal-form-1" class="form-label col-span-3">New Password</label>
                <input 
                    id="horizontal-form-1" 
                    class="form-control col-start-4 col-span-9" 
                    type="text"
                    v-model="passwordData.new_password"
                />
            </div>
            <div class="form-inline col-span-10 grid grid-cols-12">
                <label for="horizontal-form-1" class="form-label col-span-3">Confirm Password</label>
                <input 
                    id="horizontal-form-1" 
                    class="form-control col-start-4 col-span-9" 
                    type="text" 
                    v-model="passwordData.confirm_password"
                />
            </div>
        </div>

        <div class="flex justify-end my-10">
            <button class="btn w-32 dark:border-darkmode-400" @click="resetForm()"> Reset </button>
            <button class="btn btn-primary w-32 shadow-md ml-5" @click="submitPassword()"> Submit </button>
        </div>
    </div>  
</template>

<script setup>
import { ref } from 'vue';
import { seller_change_password } from '@/api_v2/user.js';

const passwordData = ref({
    password: '',
    new_password: '',
    confirm_password: ''
})

const resetForm = () => {
    passwordData.value = { password: '', new_password: '', confirm_password: '' }
}

const submitPassword = () => {
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