<template>
    <div class="flex flex-col gap-4 p-5 box sm:p-8  lg:mx-20 lg:px-40 px-10 py-10 mt-3"> 
        <span class="col-span-12 text-xl font-medium leading-none">Customer Note Settings</span>
        <hr class="w-full"/>
        <div class="z-0 col-span-12 p-0" v-if="ready">
            <div class="grid grid-cols-12 gap-1 intro-y -z-50 px-6">
                <label class="col-span-12 col-start-1 mt-2 text-base form-label font-medium">Delivery Note</label>
                <textarea 
                    class="col-span-12 sm:col-span-12 p-2 rounded-lg sm:min-h-[10rem]" 
                    v-model="props.campaign.meta_logistic.delivery_note"
                />
                <label class="col-span-12 col-start-1 mt-2 text-base form-label font-medium">Special Note</label>
                <textarea 
                    class="col-span-12 sm:col-span-12 p-2 rounded-lg sm:min-h-[10rem]" 
                    v-model="props.campaign.meta_payment.special_note"
                />
                <label class="col-span-12 col-start-1 mt-2 text-base form-label font-medium">Confirmation Note</label>
                <textarea 
                    class="col-span-12 sm:col-span-12 rounded-lg p-2 sm:min-h-[10rem]" 
                    v-model="props.campaign.meta_payment.confirmation_note"
                /> 
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted , ref} from 'vue';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const props = defineProps({
    campaign:Object
})

const ready = ref(false)
onMounted(() => {
    ready.value=true
})


</script>