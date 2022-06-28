<template>
    <div class="mt-5 p-0 col-span-12 z-0">
        <div class="box px-5 lg:p-5 2xl:p-5 intro-y grid grid-cols-12 gap-1 lg:gap-5 2xl:gap-5 -z-50 mt-3">
            <label class="col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2 text-base">Delivery note</label>
            <textarea 
                class="col-span-9 p-1" 
                v-model="campaignStore.notes.delivery_note"
            />
            <label class="col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2 text-base">Special note</label>
            <textarea 
                class="col-span-9 p-1" 
                v-model="campaignStore.notes.special_note"
            />
            <label class="col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2 text-base">Confirmation note</label>
            <textarea 
                class="col-span-9 p-1" 
                v-model="campaignStore.notes.confirmation_note"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCreateCampaignStore } from '@/stores/lss-create-campaign';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { get_notes } from '@/api_v2/user_subscription';

const campaignStore = useCreateCampaignStore()

onMounted(() => {
	list()
})

const list = () => {
    get_notes().then(response => {
		campaignStore.notes.delivery_note = response.data.delivery_note
		campaignStore.notes.special_note = response.data.special_note
		campaignStore.notes.confirmation_note = response.data.confirmation_note
    })
}

</script>