<template>
    <div class="m-3 sm:m-5">
        <div class="flex justify-between flex-col lg:flex-row gap-5 mb-10">
            <div class="flex justify-start">
                <label class="form-label mr-10">{{ $t('lucky_draw.draw_list.campaign_title') }}</label>
                <h2 class="w-42"> {{ props.campaignTitle }} </h2>
            </div>
        </div>
    </div>
   
</template>

<script setup>


const props = defineProps({
    campaignTitle: String
})

</script>