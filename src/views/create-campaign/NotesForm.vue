<template>
    <div class="mt-5 p-0 col-span-12 z-0" v-if="ready">
        <div class="box px-5 lg:p-5 2xl:p-5 intro-y grid grid-cols-12 gap-1 lg:gap-5 2xl:gap-5 -z-50 mt-3">
            <label class="col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2 text-base">Delivery note</label>
            <textarea 
                class="col-span-9 p-1" 
                v-model="props.campaign.meta_logistic.delivery_note"
            />
            <label class="col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2 text-base">Special note</label>
            <textarea 
                class="col-span-9 p-1" 
                v-model="props.campaign.meta_payment.special_note"
            />
            <label class="col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2 text-base">Confirmation note</label>
            <textarea 
                class="col-span-9 p-1" 
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