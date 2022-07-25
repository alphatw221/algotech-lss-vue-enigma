<template>
    <div class="flex flex-col gap-4 p-5 box sm:p-8  lg:mx-20 lg:px-40 px-10 py-10 mt-3"> 
        <span class="col-span-12 text-xl font-medium leading-none sm:-mx-6">{{$t('create_campaign.notes_form.notes_form')}}</span>
        <hr class="-mx-6"/>
        <div class="z-0 col-span-12 p-0" v-if="ready">
            <div class="grid grid-cols-12 gap-1 intro-y -z-50">
                <label class="col-span-12 col-start-1 mt-2 text-base form-label font-medium">{{$t('create_campaign.notes_form.delivery_note')}}</label>
                <textarea 
                    class="col-span-12 sm:col-span-12 p-2 rounded-lg sm:min-h-[10rem]" 
                    v-model="props.campaignNotes.meta_logistic.delivery_note"
                />
                <label class="col-span-12 col-start-1 mt-2 text-base form-label font-medium">{{$t('create_campaign.notes_form.special_note')}}</label>
                <textarea 
                    class="col-span-12 sm:col-span-12 p-2 rounded-lg sm:min-h-[10rem]" 
                    v-model="props.campaignNotes.meta_payment.special_note"
                />
                <label class="col-span-12 col-start-1 mt-2 text-base form-label font-medium">{{$t('create_campaign.notes_form.confirmation_note')}}</label>
                <textarea 
                    class="col-span-12 sm:col-span-12 rounded-lg p-2 sm:min-h-[10rem]" 
                    v-model="props.campaignNotes.meta_payment.confirmation_note"
                /> 
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted , ref, defineProps} from 'vue';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const props = defineProps({
    campaignNotes:Object,
})

const ready = ref(false)
onMounted(() => {
    ready.value=true

    console.log(props)
})


</script>