<template>
    <div class="box mt-3 p-0 col-span-12 z-0 p-10 flex flex-col gap-5 intro-y" v-if="ready">
        <span class="text-lg font-medium leading-none col-span-12">Customer Note Settings</span>
		<hr class="col-span-12">
        <div class="intro-y grid grid-cols-12 gap-1 lg:gap-1 -z-50">
            <label class="col-start-1 col-span-12 form-label text-base mt-3">Delivery note</label>
            <textarea 
                class="form-control col-span-12 form-label p-2" rows="4" cols="50"
                v-model="props.campaign.meta_logistic.delivery_note"
            />
            <label class="col-start-1 col-span-12 form-label text-base mt-3">Special note</label>
            <textarea 
                class="form-control col-span-12 form-label p-2" 
                v-model="props.campaign.meta_payment.special_note" rows="4" cols="50"
            />
            <label class="col-start-1 col-span-12 form-label text-base mt-3">Confirmation note</label>
            <textarea 
                class="form-control col-span-12 form-label p-2" rows="4" cols="50"
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