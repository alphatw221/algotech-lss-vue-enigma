<template>
    <div class="z-0 col-span-12 p-0" v-if="ready">
        <div class="grid grid-cols-12 gap-1 px-5 mt-3 sm:p-5 sm:px-10 intro-y lg:gap-3 -z-50">
            <label class="col-span-12 col-start-1 mt-2 text-base">Delivery note</label>
            <textarea 
                class="col-span-12 sm:col-span-12 p-2 rounded-lg sm:min-h-[10rem]" 
                v-model="props.campaign.meta_logistic.delivery_note"
            />
            <label class="col-span-12 col-start-1 mt-2 text-base">Special note</label>
            <textarea 
                class="col-span-12 sm:col-span-12 p-2 rounded-lg sm:min-h-[10rem]" 
                v-model="props.campaign.meta_payment.special_note"
            />
            <label class="col-span-12 col-start-1 mt-2 text-base">Confirmation note</label>
            <textarea 
                class="col-span-12 sm:col-span-12 rounded-lg p-2 sm:min-h-[10rem]" 
                v-model="props.campaign.meta_payment.confirmation_note"
            /> 
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